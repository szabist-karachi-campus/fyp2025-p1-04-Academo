import Courselist from '../Courselist';
import { useSelector } from 'react-redux';
import { RootState } from '@reduxjs/toolkit/query';
import { useEffect, useState } from 'react';
import { ExtractData } from '../../../extractingDataFromCookies';
import { Courses } from '../../../types';
import { api } from '../../../api';


export const TeacherCourseSelector = () => {

    const { role, _id } = useSelector((state: RootState) => state.user);


    const [course, setCourse] = useState<Courses[]>([])
    const [selectedCourse, setSelectedCourse] = useState<Courses[]>([])
    const [tab, setTab] = useState('first')





    ExtractData();
    useEffect(() => {
        api.post('/teacher/getcoursebyteacher', { teacher: _id }).then((v) => {
            api.post('/courses/coursebyadmin', { admin: v.data.admin }).then((a) => {
                api.post('/teacher/getcourse', { teacher: _id }).then((p) => {
                    const selectedCourseIds = p.data.map((item) => item._id);
                    const unregisteredCourses = a.data.filter((course) => !selectedCourseIds.includes(course._id));
                    const registeredCourses = a.data.filter((course) => selectedCourseIds.includes(course._id));
                    setCourse(unregisteredCourses);
                    setSelectedCourse(registeredCourses)
                })
            })
        })
    }, [])

    return (
        <>
            <div className="p-8 pt-1 max-w-7xl mx-auto pl-3">
                {/* <button className='p-2 px-5 mb-4 font-medium bg-Primary rounded-md hover:bg-blue-500 flex items-center text-white bg-black'
                    onClick={() => setTab(tab === 'first' ? 'second' : 'first')}>{tab === 'first' ? 'Registered Courses' : 'Course Offered'}</button> */}
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold">{tab === 'first' ? 'Registered Courses' : 'Registered Courses'}</h1>
                </div>
                <Courselist course={selectedCourse} role={role} element={() => console.log('')} />
                {/* {tab === 'first' ? <Courselist course={course} role={role} element={() => console.log('')} />
                    :
                    <Courselist course={selectedCourse} role={role} element={() => console.log('')} />} */}

            </div>

        </>
    );
};
