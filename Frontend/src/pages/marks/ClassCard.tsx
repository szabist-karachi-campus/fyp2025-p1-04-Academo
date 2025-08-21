import React from 'react';
import { Card, CardBody, Button, Chip } from "@heroui/react";
// import { Users, BookOpen } from 'lucide-react';
import { Avatar } from "@heroui/react";
import { teacherCourse } from '../../types';

interface ClassCardProps {
  classData: teacherCourse;
  onSelect: (classId: string) => void;
}


const ClassCard: React.FC<ClassCardProps> = ({ classData, onSelect }) => {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardBody className="p-5">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-primary/10 rounded-lg">
            {/* <BookOpen className="w-6 h-6 text-primary" /> */}
            <Avatar name={classData.course} className="text-white bg-black" />
            
          </div>
          <div>
            <h3 className="text-xl font-semibold">{classData.course}</h3>
            <p className="text-sm text-gray-500">Darja: {classData.darja}</p>
          </div>
        </div>

        <div className="space-y-3 mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            {/* <Users size={16} /> */}
            <span>Total Students: {classData.totalStudents}</span>
          </div>
          
          {/* <div className="flex gap-2"> */}
            {/* <Chip size="sm" color="primary"> */}
              {/* {classData.course.courseTitle} */}
            {/* </Chip> */}
            {/* <Chip size="sm" variant="flat"> */}
              {/* {classData.course.teacher} */}
            {/* </Chip> */}
          {/* </div> */}
        </div>

        <Button 
          color="primary" 
          className="w-full"
          onClick={() => onSelect(classData._id)}
        >
          Manage Marks
        </Button>
      </CardBody>
    </Card>
  );
}

export default ClassCard