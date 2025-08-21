import express from 'express'
import cors from 'cors';
import cookieParser from 'cookie-parser'
import authRoutes from './routes/auth.routes.js'
import attendanceRoutes from './routes/attendance.routes.js'
import studentRoutes from './routes/students.routes.js'
import subjectRoutes from './routes/subject.routes.js'
import teacherRoutes from './routes/teacher.routes.js'
import darjaRoutes from './routes/darja.routes.js'
import adminRoutes from './routes/admin.routes.js'
import courseRoutes from './routes/course.routes.js'
import eventRoutes from './routes/event.routes.js'
import markRoutes from './routes/marks.routes.js'
import timetableRoutes from './routes/timetable.routes.js'
import chatRoutes from './routes/chat.routes.js'
import resumeRoutes from './routes/resume.routes.js'

const PORT = 5000

const app = express();
app.use(express.json())
app.use(cookieParser())
// app.use(cors({
//     origin: 'https://madrass-erp.vercel.app '
//   }));
app.use(cors())

app.use('/api/auth', authRoutes)
app.use('/api/attendance', attendanceRoutes)
app.use('/api/student', studentRoutes)
app.use('/api/subject', subjectRoutes)
app.use('/api/teacher', teacherRoutes)
app.use('/api/darja', darjaRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api/courses', courseRoutes)
app.use('/api/event', eventRoutes)
app.use('/api/marks', markRoutes)
app.use('/api/timetable', timetableRoutes)
app.use('/api/chat', chatRoutes)
app.use('/api/resume', resumeRoutes)

app.listen(PORT, () => {console.log('app listening on port 5000')});