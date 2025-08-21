import mongoose from "mongoose";
import Teacher from "./Teacher.js";
import Admin from "./Admin.js";
import { config } from "dotenv";
import Student from "./Students.js";
import User from "./User.js";
import Darja from "./Darja.js";
import Date from "./Date.js";
import Subject from "./Subject.js";
import Courses from "./Courses.js";
import Event from "./Event.js";
import Marks from "./Marks.js";
import Timetable from "./Timetable.js";
import Chat from "./Chat.js";

config();

mongoose.connect(process.env.MONGODB_URL)
    .then(() => console.log('connected to DB'))
    .catch((e) => console.log(e))

export const db = {
    Student,
    Teacher,
    Admin,
    User,
    Darja,
    Date,
    Subject,
    Courses,
    Event,
    Marks,
    Timetable,
    Chat
}