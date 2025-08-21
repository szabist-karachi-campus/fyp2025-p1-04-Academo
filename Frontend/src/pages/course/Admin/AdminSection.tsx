import React, { useEffect, useState } from 'react'
import { Button } from "@heroui/react";
import Courselist from '../Courselist';
import AdminModal from './AdminModal';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@reduxjs/toolkit/query';
import { AppDispatch } from '../../../redux/store';
import { getCourse } from '../../../redux/user/userSlice';
import { ExtractData } from '../../../extractingDataFromCookies';

const Allcourses = () => {
  ExtractData()
  const { course, role, _id } = useSelector((state: RootState) => state.user);
	const dispatch = useDispatch<AppDispatch>();
  
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(getCourse(_id));
  }, [dispatch])

  // const courses = [{
  //   title: 'Arabic Grammar',
  //   description: 'Master modern web development techniques including React, Node.js, and cloud deployment.',
  //   instructor: 'Sarah Johnson',
  //   darja: '1',
  //   image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?auto=format&fit=crop&q=80&w=300',
  //   enrollmentStatus: 'Open',
  //   startDate: '2024-04-01',
  // },
  // {
  //   title: 'Islamic jurisprudence',
  //   description: 'Learn the principles of user interface and experience design with hands-on projects.',
  //   instructor: 'Mike Chen',
  //   darja: '2',
  //   image: 'https://images.unsplash.com/photo-1559028012-481c04fa702d?auto=format&fit=crop&q=80&w=300',
  //   enrollmentStatus: 'Open',
  // },
  // {
  //   id: '3',
  //   title: 'Prophet Teachings',
  //   description: 'Explore data analysis, visualization, and machine learning fundamentals.',
  //   instructor: 'Emily White',
  //   darja: '3',
  //   image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=300',
  //   enrollmentStatus: 'Open',

  // }]



  return (
    <>
      <div className="p-8 max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Course Offerings</h1>
          <Button color="primary" 
          onClick={() => setIsModalOpen(true)}
          >
            Add New Course
          </Button>
        </div>

        <Courselist course={course} role={role} element={''}/>
      </div>

      <AdminModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}  />
  </>
  )
}

export default Allcourses