import { db } from "../models/index.js";


export const allCourse = async (req, res) => {
    try {
        const { admin } = req.body;
        const data = await db.Courses.find({admin: admin})
            .populate({
                path: 'darja',
                select: 'darjaID -_id',
            })
            .populate({
                path: 'teacher',
                select: 'fullName -_id',
            });
        res.json(data);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'An error occurred' });
    }
};


export const newCourse = async (req, res) => {
    try {
        const { courseTitle, teacher, description, darja, status, image, admin } = req.body;
        const data = await db.Courses.create({
            courseTitle,
            image,
            teacher,
            description,
            darja,
            availability: status,
            admin
        })

        res.json({
            title: data.courseTitle,
            teacher: data.teacher,
            darja: data.darja,
            availability: data.status
        })
    } catch (error) {
        console.log(error)
    }
}

export const addCourse = async (req, res) => {
    try {
        const { course, username } = req.body
        const data = await db.Student.findOneAndUpdate(
            { username: username },
            { $addToSet: { course } },
            { new: true }
        )

        if (!data) {
            return res.status(404).json({ message: "Student not found" });
        }

        res.status(200).json({ message: "Course added successfully", student: data.course });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error", error });
    }
}

export const getCourse = async (req, res) => {
    try {
        const { darja, admin } = req.body
        const darjaID = await db.Darja.findOne({ darjaID: darja, admin })
        const data = await db.Courses.find({
            darja: darjaID._id,
            admin
        })
            .populate({
                path: 'darja',
                select: 'darjaID -_id',
            })
            .populate({
                path: 'teacher',
                select: 'fullName -_id',
            })
        res.status(200).json(data)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error", error });
    }
}
