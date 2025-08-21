import { db } from '../models/index.js'

export const addMarks = async (req, res) => {
    try {
        const { username, subjectId, marks } = req.body;
        const response = []
        const darja = await db.Courses.findOne({_id: subjectId})
        for (let i = 0; i < username.length; i++) {
            const data = await db.Student.findOne({ username: username[i] })
            if (!data) {
                response.push({ username: username[i], status: 'User not found' });
                continue;
            }

            else {
                const user = await db.Marks.create({
                    darja: darja.darja,
                    course: subjectId,
                    student: data._id,
                    marks: marks[i]
                })
                    response.push(user);
            }
        }

        res.json(response)

    } catch (error) {
        console.log(error)
    }

    //     const data = await db.Student.findOne({ username });
    //     const course = await db.Courses.findOne({ _id: subjectId })

    //     if (!data) {
    //         res.json("user not find with this username")
    //     }
    //     else {
    //         const student = await db.Marks.create({
    //             darja: data.darja,
    //             student: data._id,
    //             course: subjectId,
    //             marks: marks
    //         })
    //     }
    //     res.json({
    //         username: data.username,
    //         course: course.courseTitle,
    //         marks
    //     })
    // } catch (error) {
    //     console.log(error)
    //     res.json(error)
    // }
}

export const getMarks = async (req, res) => {
    try {
        const data = await db.Marks.find().populate({
            path: 'student',
            select: 'username fullName -_id'
        })
            .populate({
                path: 'darja',
                select: 'darjaID -_id',
            })
            .populate({
                path: 'course',
                select: 'courseTitle -_id',
            })
        res.json(data)
    }
    catch (error) {
        console.log(error)
    }
}

export const getMarksByDarja = async (req, res) => {
    try {
        const { course } = req.body;
        const data = await db.Student.find({ course: course }).populate({
            path: 'darja',
            select: 'darjaID -_id'
        })
            .populate({
                path: 'course',
                select: 'courseTitle -_id',
            })
            .select(
                'username fullName'
            )
        const results = [];

        for (let index = 0; index < data.length; index++) {
            const totalMarks = await db.Marks.findOne({ student: data[index]._id, course: course }).select('marks -_id')
            results.push({
                _id: data[index]._id,
                username: data[index].username,
                fullname: data[index].fullName,
                // darja: data[index].darja,
                // course: data[index].course,
                marks: totalMarks ? totalMarks.marks : null
            });
        }
        res.json(results)
    } catch (error) {
        res.json(error)
        console.log(error)
    }
}
