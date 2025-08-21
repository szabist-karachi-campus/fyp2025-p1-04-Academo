import { useState, useEffect } from 'react';
import { studentMarks } from '../../types';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { getStudentMarks, getStudentMarksByDarja } from '../../redux/user/userSlice';
import { api } from '../../api';

export const useStudentMarks = (classId: string | undefined) => {

	const dispatch = useDispatch<AppDispatch>();

  const [students, setStudents] = useState<studentMarks[]>([
    // { username: 'abrar1', darja: 1 , marks:25},
    // { username: 'abrar2', darja: 1 , marks:25},
    // { username: 'abrar3', darja: 1 , marks:25},
    // Add more sample data as needed
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const updateMarks = async (marks: Record<string, number>) => {
    // In a real application, you would send this data to your backend
    await api.post('/marks', {username: Object.keys(marks), subjectId: classId, marks:Object.values(marks)});
    // Implement the API call here
  };

  // useEffect(() => {
  //   dispatch(getStudentMarks())
  // },[])

  // In a real application, you would fetch this data from your backend
  useEffect(() => {
    const fetchStudents = async () => {
      setIsLoading(true);
      try {
        if(classId)
        dispatch(getStudentMarksByDarja(classId))
      } catch (error) {
        console.error('Error fetching students:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchStudents();
  }, []);

  return { students, updateMarks, isLoading };
};