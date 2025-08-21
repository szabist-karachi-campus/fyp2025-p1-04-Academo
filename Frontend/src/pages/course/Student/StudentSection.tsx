import Courselist from '../Courselist';
import { useSelector } from 'react-redux';
import { RootState } from '@reduxjs/toolkit/query';
import { useEffect, useState } from 'react';
import { ExtractData } from '../../../extractingDataFromCookies';
import { Courses } from '../../../types';
import { api } from '../../../api';
import { FaUserPlus } from 'react-icons/fa';
import { Button } from "@heroui/react";
import { useSubmit } from './handleCourseRegister';


export const StudentCourseSelector = () => {

  const { role, username } = useSelector((state: RootState) => state.user);


  const [course, setCourse] = useState<Courses[]>([])
  const [selectedCourse, setSelectedCourse] = useState<Courses[]>([])
  const [tab, setTab] = useState('first')

  const { loading, submit } = useSubmit();

  const handleSubmit = async (course) => {
    await submit(course, username);
  }

  ExtractData();
  useEffect(() => {
    api.post('/student', { username, role }).then((v) => {

      api.post('/courses/bydarja', { darja: v.data[0].darja.darjaID, admin: v.data[0].admin }).then((a) => {
        api.post('student/allcourse', { username }).then((p) => {
          const selectedCourseIds = p.data.map((item) => item._id);
          const unregisteredCourses = a.data.filter((course) => !selectedCourseIds.includes(course._id));
          const registeredCourses = a.data.filter((course) => selectedCourseIds.includes(course._id));
          setCourse(unregisteredCourses);
          setSelectedCourse(registeredCourses)

        })
      })
    })
  }, [loading])

  return (
    <>
      <div className="p-8 pt-1 max-w-7xl mx-auto pl-3">
        <button className='p-2 px-5 mb-4 font-medium bg-Primary rounded-md hover:bg-blue-500 flex items-center text-white bg-black'
          onClick={() => setTab(tab === 'first' ? 'second' : 'first')}>{tab === 'first' ? 'Registered Courses' : 'Course Offered'}</button>
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">{tab === 'first' ? 'Course Offered' : 'Registered Courses'}</h1>
        </div>

        {tab === 'first' ? <Courselist course={course} role={role} element={(course) => (
          <Button type='submit' isLoading={loading}
            onClick={() => handleSubmit(course)}
            className='p-1 px-5 font-medium rounded-md hover:bg-blue-500 flex items-center text-white bg-primary'>
            Register<FaUserPlus className='ml-4' />
          </Button>)} />
          :
          <Courselist course={selectedCourse} role={role} element={() => console.log('')} />}
      </div>

    </>
  );
};
