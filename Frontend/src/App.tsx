import './App.css'
import SideBar from './components/sideBar'
import Attendance from './pages/attendance/Attendance'
import { Routes, Route } from 'react-router-dom'
import { useAuthContext } from './context/AuthContext'
import Combine from './pages/Authentication/Combine'
import Marks from './pages/marks/Marks'
import About from './pages/about/About'
import Events from './pages/events/Events'
import { Toaster } from "react-hot-toast";
import Invitations from './pages/invitation/Invitations'
import { ExtractData } from './extractingDataFromCookies'
import { RootState } from './redux/store'
import { useSelector } from 'react-redux'
import Dashboard from './pages/dashboard/Dashboard'
import Course from './pages/course/Course'
import Timetable from './pages/timetable/Timetable'
import Chat from './pages/chat/Chat'
import ResumeReview from './pages/Resume/ResumeReview'

function App() {

  const { authUser } = useAuthContext();

  ExtractData();

  const { role } = useSelector((state: RootState) => state.user);

  return (

    <div className='flex h-full w-full bg-gray-100'>
      {authUser ? <SideBar /> : <Combine />}
      <Routes>
        <Route path='/' element={authUser && <Dashboard />} />
        <Route path='/timetable' element={authUser && <Timetable />} />
        <Route path='/attendance' element={authUser && <Attendance />} />
        <Route path='/marks' element={authUser && <Marks />} />
        <Route path='/about' element={authUser && <About />} />
        <Route path='/events' element={authUser && <Events />} />
        <Route path='/invitations' element={authUser && role === 'Admin' && <Invitations />} />
        <Route path='/course' element={authUser && <Course />} />
        <Route path='/chat' element={authUser && <Chat />} />
        <Route path='resume' element={authUser && <ResumeReview />} />
        
      </Routes>
      <Toaster />
    </div>
  )
}

export default App
