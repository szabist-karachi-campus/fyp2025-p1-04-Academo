import { db } from '../models/index.js'

export const attendance = async (req, res) => {
    try {

        const data = await db.Date.find();
        res.json(data)

    } catch (error) {
        res.json(error)
    }
}