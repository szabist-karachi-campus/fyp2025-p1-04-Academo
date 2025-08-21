
import { useEffect, useState } from "react";
import { singleStudent, Student } from "../../types";
import type { Attendance, date } from "../../types";
import './Attendance.css'
import { api } from "../../api";


import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import { ExtractData } from "../../extractingDataFromCookies";


function Attendance() {

  ExtractData();
  const { role, username, _id } = useSelector((state: RootState) => state.user);

  const [data, setData] = useState<Student[]>([])
  const [attendanceState, setAttendanceState] = useState<{ [key: string]: string }>({});
  const [postAttendance, setPostAttendance] = useState<{ [key: string]: singleStudent }>({});
  const [dates, setDates] = useState<date[]>([])

  // const date = new Date().toLocaleDateString("en-US", { day: '2-digit', month: 'long', year: 'numeric', timeZone: 'Asia/Karachi' })
  // const day = new Date().toLocaleString("en-US", { weekday: 'long', timeZone: 'Asia/Karachi' });

  const handleAttendanceChange = (studentName: string, darja, date: string, value: string) => {
    setAttendanceState(prevState => ({
      ...prevState,
      [`${studentName}-${darja}-${date}`]: value
    }));
    const newAttendance: Attendance = { dateToday: date, attendance: value };
    const newStudent: singleStudent = { username: studentName, darja: darja, attendance: newAttendance }
    setPostAttendance(prevState => ({
      ...prevState,
      [`${studentName}-${darja}-${date}`]: newStudent
    }))
  };

  const handlePostClick = async () => {
    try {
      console.log(Object.values(postAttendance))
      await api.put('/student/attendance', Object.values(postAttendance))
      await api.post('/student/calculate', Object.values(postAttendance))
      setPostAttendance({});
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    api.post('/student', { username: username, role: role, admin: _id }).then((v) => {
      setData(v.data)
      // console.log(v.data)
    })
    api.get('/attendance').then((a) => {
      setDates(a.data)
    })
  }, [postAttendance])

  // useEffect(() => {
  //   console.log('first')
  //   // axios.get('/attendances')
  //   // axios.post('/addDate', { day, date })
  // },[day])

  return (
    <>
      <div className="w-screen">
        <div className="w-full h-full flex items-center justify-center">
          <div className="border-1 rounded-md border-black max-h-96 overflow-auto">
            <table className='w-auto'>
              <tr>
                <td className="">Name</td>
                <td className="">Darja</td>
                {dates.map((a, i) => {
                  return (
                    <>
                      {i >= dates.length - 10 ? <td>{a.dateToday}</td> : ''}
                    </>
                  )
                })}


                <td className="rounded-tr-lg">Percentage</td>
              </tr>
              {data.map(da => {
                return (
                  <>
                    <tr>
                      <td>{da.username}</td>
                      <td>{da.darja.darjaID}</td>
                      {dates.map((a, i) => {
                        const attendanceForDate = da.attendance.find(att => att.dateToday === a.dateToday);
                        return (
                          <>
                            {i >= dates.length - 10 ?
                              <>

                                {a.dayToday === 'Sunday' || a.dayToday === 'Saturday' ?
                                  <>
                                    <td style={{ backgroundColor: 'red' }}>
                                      {a.dayToday}
                                    </td>
                                  </>
                                  :
                                  <>

                                    {attendanceForDate ? (
                                      <td>
                                        {attendanceForDate.attendance}
                                      </td>
                                    ) : (
                                      <>
                                        <td style={{ backgroundColor: 'lightblue' }}>
                                          {role === 'Admin' ?
                                            <select
                                              value={attendanceState[`${da.username}-${da.darja}-${a.dateToday}`] || 'select'}
                                              onChange={(e) => handleAttendanceChange(da.username, da.darja, a.dateToday, e.target.value)}
                                            >
                                              <option value="select">Select</option>
                                              <option value="present">Present</option>
                                              <option value="absent">Absent</option>
                                            </select> 
                                            :
                                            '-'
                                          }
                                        </td>
                                      </>

                                    )}


                                  </>
                                }

                              </>
                              :
                              ''}
                          </>
                        );
                      })}
                      <td>{!da.percentage ? 0 : da.percentage}</td>
                    </tr>
                  </>
                )
              })}
              <tr><button onClick={handlePostClick} className="pl-1">submit</button></tr>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}

export default Attendance