import { db } from '../models/index.js'

export const addDarja = async (req, res) => {
    try {
        const { username, darja, subject } = req.body;

        const teacher = await db.Teacher.findOne({ username });

        if (teacher) {
            const darjaEntry = teacher.darja.find(entry => entry.darja.equals(darja));

            if (darjaEntry) {

                if (Object.values(darjaEntry.subjects).toString() !== subject)
                    darjaEntry.subjects.push(subject);
            } else {
                teacher.darja.push({ darja, subjects: [subject] });
            }

            await teacher.save();
        }

        res.json(teacher);

    } catch (error) {
        console.error('Error updating teacher:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


export const getAllTeacher = async (req, res) => {
    try {
        const data = await db.Teacher.find().select('fullName admin -_id')
        res.json(data)
    } catch (error) {
        console.error('Error fetching teachers:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


export const selectTeacher = async (req, res) => {
    try {
        const { teacher } = req.body
        const data = await db.Teacher.findOne({
            fullName: teacher
        })
        res.json(data._id)
    } catch (error) {
        res.json(error)
    }
}

export const getCourse = async (req, res) => {
    try {
        const { teacher } = req.body
        const data = await db.Courses.find({
            teacher
        }).populate({
            path: 'darja',
            select: 'darjaID'
        }).select(
            'courseTitle _id'
        ).populate({
            path: 'teacher',
            select: 'fullName -_id'
        })

        const results = [];

        for (let index = 0; index < data.length; index++) {
            const totalStudents = await db.Student.find({ course: data[index]._id });

            results.push({
                _id: data[index]._id,
                course: data[index].courseTitle,
                darja: data[index].darja,
                // darja_id: data[index]._id,
                teacher: data[index].teacher,
                totalStudents: totalStudents.length, // Include count of students if needed
            });
        }
        res.json(results)
    } catch (error) {
        console.log(error)
    }
}

export const getCourseByTeacher = async (req, res) => {
    try {
        const { teacher } = req.body
        const data = await db.Courses.findOne({ teacher }).select('admin -_id')
        res.json(data)
    } catch (error) {
        console.log(error)
    }
}