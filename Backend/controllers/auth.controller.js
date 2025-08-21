import bcrypt from 'bcryptjs';
import { db } from '../models/index.js'
import generateTokenAndSetCookie from '../utils/generateToken.js'

export const signup = async (req, res) => {
    try {
        const { fullName, username, darja, password, confirmPassword, role, admin, phoneNumber} = req.body;

        if (password !== confirmPassword)
            return res.status(400).json({ error: 'Passwords do not match' });

        const userExists = await db.User.findOne({ users: username })
        if (userExists) {
            return res.status(400).json({ error: 'User already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        let userData;

        if (role === 'Student') {
            userData = await db.Student.create({
                fullName,
                username,
                darja,
                role,
                admin,
                phoneNumber,
                password: hashedPassword,
            });
        } else if (role === 'Teacher') {
            userData = await db.Teacher.create({
                fullName,
                username,
                role,
                phoneNumber,
                password: hashedPassword,
                admin,
            });
        } else if (role === 'Admin') {
            userData = await db.Admin.create({
                fullName,
                username,
                role,
                phoneNumber,
                password: hashedPassword,
            });
        }

        if (userData) {
            await db.User.create({
                users: userData.username,
                usersPassword: userData.password,
                userModel: role
            });

            generateTokenAndSetCookie(userData._id, res)

            res.status(201).json({
                _id: userData._id,
                fullName: userData.fullName,
                username: userData.username,
                role: userData.role
            });
        } else {
            res.status(400).json({ error: 'Invalid user data' });
        }


    } catch (error) {
        console.log("Error in signup controller", error)
        res.status(500).json({ error: 'Internal server error' })
    }
}

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const data = await db.User.findOne({ users: username })

        if (!data)
            return res.status(400).json({ error: 'No username found' })

        const isPasswordcorrect = await bcrypt.compare(password, data.usersPassword)

        if (!isPasswordcorrect)
            return res.status(400).json({ error: 'Username or password are incorrect' })

        generateTokenAndSetCookie(data._id, res)

        if(data.userModel == 'Admin'){
            const admin = await db.Admin.findOne({username}).select('_id')
        
            res.status(200).json({
                _id: admin._id,
                username: data.users,
                password: data.usersPassword,
                role: data.userModel,
            })
        }

        if(data.userModel == 'Teacher'){
            const admin = await db.Teacher.findOne({username}).select('_id')
        
            res.status(200).json({
                _id: admin._id,
                username: data.users,
                password: data.usersPassword,
                role: data.userModel,
            })
        }

        if(data.userModel == 'Student'){
            const admin = await db.Student.findOne({username}).select('_id')
        
            res.status(200).json({
                _id: admin._id,
                username: data.users,
                password: data.usersPassword,
                role: data.userModel,
            })
        }


    } catch (error) {
        console.log("Error in login controller",)
        res.status(500).json({ error: 'Internal server error' })
    }
}

export const logout = (req, res) => {
    try {
        res.cookie('jwt', '', { maxAge: 0 });
        res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
        console.log("Error in logout controller", error)
        res.status(500).json({ error: 'Internal server error' })
    }
}