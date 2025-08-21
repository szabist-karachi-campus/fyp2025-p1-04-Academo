import { useState, useEffect } from 'react';
import { Marks } from '../../types';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { getAdminCourse, getCourse, getStudentCourse, getTeacherCourse } from '../../redux/user/userSlice';
import { ExtractData } from '../../extractingDataFromCookies';

export const useClassesData = () => {

  ExtractData();
  const { _id, role, username } = useSelector((state: RootState) => state.user);

  const dispatch = useDispatch<AppDispatch>();


  const [classes, setClasses] = useState<Marks[]>([

  ]);
  const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   // if(_id)
  //     dispatch(getTeacherCourse('672bad349537633c558eef07'));
  // }, []);

  // In a real application, you would fetch this data from your backend
  useEffect(() => {
    const fetchClasses = async () => {
      setIsLoading(true);
      try {
        if (_id && username) {
          if (role === 'Student')
            dispatch(getStudentCourse(username))
          if (role === 'Teacher')
            dispatch(getTeacherCourse(_id));
          if (role === 'Admin')
            dispatch(getAdminCourse(_id))
        }
      } catch (error) {
        console.error('Error fetching classes:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchClasses();
  }, []);

  return { isLoading };
};