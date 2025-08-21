import { db } from "../models/index.js";
import bcrypt from 'bcryptjs';

export const getSelectedAdmin = async (req, res) => {
    try {
        const { username, password } = req.body;
        const data = await db.Admin.findOne({
            username,
        });

        if (!data) {
            return res.json('User not found with that username'); // Use return to prevent further execution
        }

        const isPasswordcorrect = await bcrypt.compare(password, data.password)

        if (!isPasswordcorrect) {
            return res.json('Username or password are incorrect'); // Use return to prevent further execution
        }
        res.json(data._id);
    } catch (error) {
        res.json(error);
    }
}

export const getAdmin = async (req, res) => {
    try {
        const data = await db.Admin.find().select('username')
        res.json(data)
    } catch (error) {
        res.json(error)
    }
}

export const getCourse = async (req, res) => {
    try {
        const {admin} = req.body;
        const data = await db.Courses.find({
            admin: admin
        }
        ).populate({
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