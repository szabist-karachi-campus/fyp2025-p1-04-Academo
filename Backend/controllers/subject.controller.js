import { db } from '../models/index.js'

export const addSubject = async (req, res) => {
    try {
        const {subject, admin} = req.body;
        const data = await db.Subject.create({
            subjectName: subject,
            admin
        })
         res.json(data)
       
    } catch (error) {
        console.log(error)
    }
}