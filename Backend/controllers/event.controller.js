import { db } from "../models/index.js";


export const allEvent = async (req, res) => {
    try {
        const data = await db.Event.find().select('-_id');
        res.json(data)
    } catch (error) {
        console.log(error)
    }
}

export const addEvent = async (req, res) => {
    try {
        const {eventName, eventDate, eventImage, eventDescription, admin} = req.body;
        const data = await db.Event.create({
            eventName,
            eventDate,
            eventImage,
            eventDescription,
            admin
        })
        res.json(data)
    } catch (error) {
        res.json(error)
    }
}