import { db } from '../models/index.js'

export const getStudent = async (req, res) => {
    try {
        const { username, role, admin } = req.body;
        if (role === 'Admin') {
            const data = await db.Student.find({ admin }).populate({
                path: 'darja',
                select: 'darjaID -_id'
            })
            res.json(data);
        }

        else if (role === 'Teacher') {
            const course = await db.Courses.find({ teacher: admin }).select('_id')
            const data = await db.Student.find({ course: { $in: course } }).populate({
                path: 'darja',
                select: 'darjaID -_id'
            })
            res.json(data);
        }

        else {
            const data = await db.Student.find({
                username: username,
            }).populate({
                path: 'darja',
                select: 'darjaID -_id'
            })
            res.json(data);
        }
    } catch (error) {
        res.json(error);
    }
}

export const getAttendance = async (req, res) => {
    try {
        const students = req.body
        const response = []
        for (let i = 0; i < students.length; i++) {
            const data = await db.Student.findOne({ username: students[i].username })
            if (!data) {
                response.push({ username: students[i].username, status: 'User not found' });
                continue;
            }

            else {
                const user = data.attendance.find((d) => d.dateToday === students[i].attendance.dateToday);
                if (!user) {
                    if (students[i].attendance.attendance === 'present' || students[i].attendance.attendance === 'absent') {
                        data.attendance.push(students[i].attendance)
                        response.push({ name: students[i].name, status: 'Attendance added' });
                        await data.save();
                    }
                }
                else {
                    response.push({ name: students[i].name, status: 'Attendance already added' });
                }
            }
        }

        res.json(response)

    } catch (error) {
        console.log(error)
    }
}

export const calculateAttendance = async (req, res) => {
    try {
        const students = req.body;
        const response = []

        const calculatePercentage = (attendance) => {
            const totalDays = attendance.length;
            const presentDays = attendance.filter(att => att.attendance === 'present').length;
            const percentage = (presentDays / totalDays) * 100;
            return percentage.toFixed(2);
        };
        if (students.length === 0) {

        }
        for (let i = 0; i < students.length; i++) {
            const user = await db.Student.findOne({ username: students[i].username });
            if (user) {
                const percentage = calculatePercentage(user.attendance);
                await db.Student.updateOne({ username: students[i].username }, { percentage });
                response.push({ name: students[i].name, status: 'percentage added' });

            } else {
                response.push({ name: students[i].name, status: 'User not found' });
            }

        }
        res.json(response)

    } catch (error) {
        console.log(error)
    }
}

export const getCourse = async (req, res) => {
    try {
        const { username } = req.body
        const data = await db.Student.findOne({ username: username }).select('course -_id').populate({
            path: 'course',
            select: 'courseTitle _id',
            populate: {
                path: 'teacher', // Populate the nested teacher reference
                select: 'fullName -_id' // Replace with relevant fields in the teacher schema
            }
        }).populate({
            path: 'darja',
            select: 'darjaID -_id',
        })

        const results = []
        // results.push(data)

        for (let index = 0; index < data.course.length; index++) {
            const totalStudents = await db.Student.find({ course: data.course[index]._id })
            results.push({
                _id: data.course[index]._id,
                course: data.course[index].courseTitle,
                darja: data.darja,
                teacher: data.course[index].teacher,
                totalStudents: totalStudents.length
            })
        }
        res.json(results)
    } catch (error) {
        console.log(error)
    }
}

export const getAllStudents = async (req, res) => {
    try {
        const data = await db.Student.find();
        res.json(data.length)
    } catch (error) {
        console.log(error)
    }
}