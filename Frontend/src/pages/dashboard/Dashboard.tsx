import React, { useEffect, useState } from 'react'
import { Card, CardBody, CardHeader, Progress, Avatar } from "@heroui/react";
import { ExtractData } from '../../extractingDataFromCookies';
import { RootState } from '../../redux/store';
import { useSelector } from 'react-redux';
import { api } from '../../api';


const Dashboard = () => {
    const events = [
        {
          title: "Web Development Workshop",
          date: "March 15, 2024",
          time: "10:00 AM - 2:00 PM",
          location: "Virtual",
          image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=300",
          attendees: 45,
          status: "Upcoming"
        },
        {
          title: "AI & Machine Learning Conference",
          date: "March 20, 2024",
          time: "9:00 AM - 5:00 PM",
          location: "Tech Hub Auditorium",
          image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=300",
          attendees: 120,
          status: "Registration Open"
        },
        {
          title: "Digital Marketing Masterclass",
          date: "March 25, 2024",
          time: "2:00 PM - 6:00 PM",
          location: "Virtual",
          image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=300",
          attendees: 75,
          status: "Few Seats Left"
        }
      ];

    ExtractData();
    const { role, username } = useSelector((state: RootState) => state.user);

    const [percentage, setPercentage] = useState()
    const [student, setStudent] = useState(0)

    api.get('/student').then(e => {
        setStudent(e.data)
      })

    useEffect(() => {
        api.post('/student', { username: username, role:role }).then((v) => {
            setPercentage(v.data[0].percentage)
          })
    },[percentage])

    return (
        <div className="p-8 max-w-7xl w-[65rem] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <Card className="bg-primary/10">
                    <CardBody className="flex flex-row items-center gap-4">
                        <div className="p-3 bg-primary/20 rounded-lg">
                            {/* <TrendingUp size={24} className="text-primary" /> */}
                        </div>
                        <div>
                            <p className="text-sm">Total Courses</p>
                            <h4 className="text-2xl font-bold">24</h4>
                        </div>
                    </CardBody>
                </Card>

                <Card className="bg-success/10">
                    <CardBody className="flex flex-row items-center gap-4">
                        <div className="p-3 bg-success/20 rounded-lg">
                            {/* <Users size={24} className="text-success" /> */}
                        </div>
                        <div>
                            <p className="text-sm">{role === 'Admin' && 'Active Students'}{role === 'Student' && 'CGPA'}</p>
                            <h4 className="text-2xl font-bold">{role === 'Admin' && '2041'}{role === 'Student' && '3.9'}</h4>
                        </div>
                    </CardBody>
                </Card>

                <Card className="bg-warning/10">
                    <CardBody className="flex flex-row items-center gap-4">
                        <div className="p-3 bg-warning/20 rounded-lg">
                            {/* <Clock size={24} className="text-warning" /> */}
                        </div>
                        <div>
                            <p className="text-sm">{role === 'Admin' && 'Total Teachers'}{role === 'Student' && 'Assignment Left'}</p>
                            <h4 className="text-2xl font-bold">168</h4>
                        </div>
                    </CardBody>
                </Card>

                <Card className="bg-secondary/10">
                    <CardBody className="flex flex-row items-center gap-4">
                        <div className="p-3 bg-secondary/20 rounded-lg">
                            {/* <Award size={24} className="text-secondary" /> */}
                        </div>
                        <div>
                            <p className="text-sm">{role === 'Admin'  && 'Total Students'}{role === 'Student' && 'Attendance'}</p>
                            <h4 className="text-2xl font-bold">{role === 'Admin' && student}{role === 'Student' && percentage+'%' }</h4>
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    )
}

export default Dashboard