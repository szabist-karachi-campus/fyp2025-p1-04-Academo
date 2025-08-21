import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { SlCalender } from "react-icons/sl";
import { LiaUsersSolid } from "react-icons/lia";
import { GrScorecard } from "react-icons/gr";
import { FaExclamationCircle } from "react-icons/fa";
import { IoCalendarNumberSharp } from "react-icons/io5";
import { ImSwitch } from "react-icons/im";
import { IoBookSharp } from "react-icons/io5";
import { RxDashboard } from "react-icons/rx";
import { BsChatSquareText } from "react-icons/bs";
import { PiReadCvLogoBold } from "react-icons/pi";


import Bars from "./Bars";
import { Avatar } from "@heroui/react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { ExtractData } from "../extractingDataFromCookies";
import { api } from "../api";
import { useAuthContext } from "../context/AuthContext";


const SideBar = () => {

  ExtractData();

  const { username, role } = useSelector((state: RootState) => state.user);

  const { setAuthUser } = useAuthContext();

  const [isOpen, setIsOpen] = useState(true);

  const handleLogout = async () => {
    try {
      const data = await api.post('/auth/logout')
      console.log(data)
      document.cookie = `chat-app=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
      setAuthUser(null)

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div className="h-screen flex p-4">
        <div className="h-full rounded-lg bg-Primary sm:w-full md:w-full">
          <div className="flex items-center justify-between pt-3 pl-2 pb-3">
            <span className={`cursor-pointer pr-2 overflow-hidden`}
              onClick={() => isOpen === false && setIsOpen(true)}>
              <Avatar name={username || ''} className="text-white bg-black" />
            </span>
            <span className={`hidden cursor-pointer overflow-hidden text-black whitespace-nowrap transition-all sm:hidden md:block
            ${isOpen ? 'min-w-32' : 'w-0'}`}>
              {username}</span>
            <span className={`cursor-pointer pt-1 overflow-hidden transition-all relative
          ${isOpen ? 'mr-3' : 'w-0'}
            `}
              onClick={() => setIsOpen(curr => !curr)}
            ><IoClose className="text-black" /></span>
          </div>
          <Bars element={RxDashboard} isOpen={isOpen} text={'Dashboard'} setIsOpen={setIsOpen} navigates={'/'} />
          <Bars element={LiaUsersSolid} isOpen={isOpen} text={'Attendance'} setIsOpen={setIsOpen} navigates={'/attendance'} />
          <Bars element={SlCalender} isOpen={isOpen} text={'Timetable'} setIsOpen={setIsOpen} navigates={'/timetable'} />
          <Bars element={GrScorecard} isOpen={isOpen} text={'Marks'} setIsOpen={setIsOpen} navigates={'/Marks'} />
          <Bars element={IoBookSharp} isOpen={isOpen} text={'Course'} setIsOpen={setIsOpen} navigates={'/Course'} />
          <Bars element={IoCalendarNumberSharp} isOpen={isOpen} text={'Events'} setIsOpen={setIsOpen} navigates={'/Events'} />
          {/* {role === 'Admin' && <Bars element={FaEnvelope} isOpen={isOpen} text={'Invitations'} speacialValue={''} setIsOpen={setIsOpen} navigates={'/Invitations'} />} */}
          <Bars element={FaExclamationCircle} isOpen={isOpen} text={'About'} setIsOpen={setIsOpen} navigates={'/About'} />
          <Bars element={BsChatSquareText} isOpen={isOpen} text={'Chat'} setIsOpen={setIsOpen} navigates={'/chat'} />
          <Bars element={PiReadCvLogoBold} isOpen={isOpen} text={'Resume Review'} setIsOpen={setIsOpen} navigates={'/resume'} />
          <ImSwitch className="text-4xl cursor-pointer bg-white rounded-md p-2 relative" style={{
            left: isOpen ? '6%' : '20%',
            top: `${role === 'Admin' ? '45%' : '50%'}`
          }} onClick={handleLogout} />
        </div>

      </div>
    </>
  )
}
export default SideBar


