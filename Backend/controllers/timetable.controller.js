import { db } from "../models/index.js";

export const saveTimetable = async (req, res) => {
    try {
        const timetableData = req.body;

        // Validate input is an array of ClassTimetable objects
        if (!Array.isArray(timetableData)) {
            return res.status(400).json({ error: 'Request body must be an array of timetables' });
        }

        // Delete all existing timetable documents before inserting new ones
        await db.Timetable.deleteMany({});

        const response = [];

        for (let i = 0; i < timetableData.length; i++) {
            const classTimetable = timetableData[i];

            // Validate required fields
            if (!classTimetable.grade || !Array.isArray(classTimetable.timetable)) {
                return res.status(400).json({ error: `Invalid timetable format at index ${i}` });
            }

            // Map timetable entries to match your schema fields (period, subject, teacher)
            const timetableEntries = classTimetable.timetable.map(entry => ({
                period: entry.period,
                subject: entry.subject,
                teacher: entry.teacher,
            }));

            const savedTimetable = await db.Timetable.create({
                class: classTimetable.grade,
                timetable: timetableEntries,
            });

            response.push(savedTimetable);
        }

        res.status(201).json({
            message: 'Previous timetable data deleted and new timetable(s) saved successfully',
            data: response,
        });
    } catch (error) {
        console.error('Error saving timetable:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


export const getTimetable = async (req, res) => {
    try {
        const timetable = await db.Timetable.find();
        res.status(200).json(timetable);
    } catch (error) {
        console.error('Error retrieving timetable:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}