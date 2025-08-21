import React, { useState } from 'react';
import {
  Card,
  CardBody,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button
} from "@heroui/react";
// import { ArrowLeft } from 'lucide-react';
import { useStudentMarks } from './useStudentMarks';
import { useSelector } from 'react-redux';
import { RootState } from '@reduxjs/toolkit/query';
import { TiArrowLeft } from "react-icons/ti";
import { ExtractData } from '../../extractingDataFromCookies';


interface MarksUploadProps {
  classId: string;
  onBack: () => void;
}

const MarksUpload: React.FC<MarksUploadProps> = ({ classId, onBack }) => {

  ExtractData();

  const { studentMarks, role, _id } = useSelector((state: RootState) => state.user);

  const { updateMarks, isLoading } = useStudentMarks(classId);
  const [newMarks, setNewMarks] = useState<Record<string, number>>({});

  const handleMarkChange = (studentId: string, value: string) => {
    const numValue = parseInt(value) || 0;
    setNewMarks(prev => ({
      ...prev,
      [studentId]: Math.min(100, Math.max(0, numValue))
    }));
  };

  const handleSubmit = async () => {
    await updateMarks(newMarks);
    onBack();
  };

  if (isLoading) {
    return <div>Loading student data...</div>;
  }

  return (
    <Card className="p-6">
      <CardBody>
        <div className="flex items-center gap-4 mb-6">
          <Button
            isIconOnly
            variant="light"
            onClick={onBack}
          >
            {/* <ArrowLeft size={20} /> */}
            <TiArrowLeft className='h-[2em] w-[2em]' />
          </Button>
          <h2 className="text-xl font-semibold">Upload Marks</h2>
        </div>

        <Table aria-label="Student marks table">
          <TableHeader>
            <TableColumn style={{
              border: '1px solid transparent'
            }}>STUDENT NAME</TableColumn>
            <TableColumn style={{ border: '1px solid transparent' }}>username</TableColumn>
            <TableColumn style={{ border: '1px solid transparent' }}>MARKS</TableColumn>
          </TableHeader>
          <TableBody>

            {role === 'Student' ?
              (studentMarks.filter((item) => item._id === _id).map((student) => {
                return (
                  <TableRow key={student.username}>
                    <TableCell style={{ border: '1px solid transparent' }}>{student.name}</TableCell>
                    <TableCell style={{ border: '1px solid transparent' }}>{student.username}</TableCell>
                    <TableCell style={{ border: '1px solid transparent' }}>{student.marks}</TableCell>
                  </TableRow>
                )
              }))
              :
              (studentMarks.map((student) => {
                return (
                  <TableRow key={student.username}>
                    <TableCell style={{ border: '1px solid transparent' }}>{student.fullname}</TableCell>
                    <TableCell style={{ border: '1px solid transparent' }}>{student.username}</TableCell>
                    <TableCell style={{ border: '1px solid transparent' }}>
                    {student.marks !== null && student.marks !== undefined ? student.marks :

                      <Input
                        type="number"
                        min={0}
                        max={100}
                        value={newMarks[student.username]?.toString() || ''}
                        onChange={(e) => handleMarkChange(student.username, e.target.value)}
                        className="w-24"
                      />}
                      </TableCell>
                  </TableRow>
                )
              }))
            }

            {/* {studentMarks.filter((item) => item._id === _id).map((student) => (
              <TableRow key={student.username}>
                <TableCell style={{ border: '1px solid transparent' }}>{student.fullname}</TableCell>
                <TableCell style={{ border: '1px solid transparent' }}>{student.username}</TableCell>
                <TableCell style={{ border: '1px solid transparent' }}>
                  {student.marks !== null && student.marks !== undefined ? (
                    // Display the mark if it exists
                    student.marks
                  ) : (
                    (role === 'Admin' &&
                      <Input
                        type="number"
                        min={0}
                        max={100}
                        value={newMarks[student.username]?.toString() || ''}
                        onChange={(e) => handleMarkChange(student.username, e.target.value)}
                        className="w-24"
                      />)
                    // Render an input field if no marks are available

                  )}
                </TableCell>
              </TableRow>
            ))} */}
          </TableBody>
        </Table>

        <div className="flex justify-end mt-6">
          <Button
            color="primary"
            onClick={handleSubmit}
          >
            Save marks
          </Button>
        </div>
      </CardBody>
    </Card>
  );
};

export default MarksUpload;