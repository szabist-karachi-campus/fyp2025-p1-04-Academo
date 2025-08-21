import { db } from "../models/index.js";


export const allDarja = async (req, res) => {
    try {
        const data = await db.Darja.find().select('darjaID admin');
        res.json(data)
    } catch (error) {
        console.log(error)
    }
}

export const selectDarja = async (req, res) => {
    try {
        const {darja} = req.body
        const data = await db.Darja.findOne({
            darjaID: darja
        })
        res.json(data._id)
    } catch (error) {
        res.json(error)
    }
}