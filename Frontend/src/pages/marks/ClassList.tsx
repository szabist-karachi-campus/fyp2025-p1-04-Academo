import React from 'react';
import ClassCard from './ClassCard';
import { useClassesData } from './useClassData';
import { useSelector } from 'react-redux';
import { RootState } from '@reduxjs/toolkit/query';

interface ClassListProps {
  onSelectClass: (classId: string) => void;
}



const ClassList: React.FC<ClassListProps> = ({ onSelectClass }) => {

  const { teacherCourse, adminCourse, role, studentCourse } = useSelector((state: RootState) => state.user);

  const { isLoading } = useClassesData();


  if (isLoading) {
    return <div className='flex justify-center bg-fuchsia-600 align-middle'>Loading classes...</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {role === 'Admin' &&
        adminCourse.map((classItem) => (
          <ClassCard
            key={classItem.course.courseTitle}
            classData={classItem}
            onSelect={onSelectClass}
          />
        ))
      }

      {role === 'Teacher' &&
        teacherCourse.map((classItem) => (
          <ClassCard
            key={classItem.course.courseTitle}
            classData={classItem}
            onSelect={onSelectClass}
          />
        ))
      }

      {role === 'Student' &&
        studentCourse.map((classItem) => (
          <ClassCard
            key={classItem.course.courseTitle}
            classData={classItem}
            onSelect={onSelectClass}
          />
        ))
      }
    </div>
  );
};

export default ClassList;