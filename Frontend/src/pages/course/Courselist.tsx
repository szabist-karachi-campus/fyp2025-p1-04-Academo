import React, { useState } from 'react'
import { Card, CardBody, CardHeader, Chip } from "@heroui/react";
import AdminModal from './Admin/AdminModal';

const Courselist = ({ course, role, element }) => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [status, setStatus] = useState('')
  // course.forEach((item) => {
  //   console.log(item.courseTitle); // Output for each course
  //   console.log(item.teacher.fullName); // Nested field access
  //   console.log(item.darja.darjaID); // Nested field access
  // });

  // const {loading, sum}


  // const handleSubmit = async () => {
  //   await 
  // }


  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {course.map((c) => (
          <Card key={c.id} className="bg-content1 w-[98%]">
            <CardHeader className="p-0 cursor-pointer"
              onClick={() => {
                setIsModalOpen(true)
              }}>
              <img
                src={c.image}
                alt={c.courseTitle}
                className="w-full h-48 object-cover"
              />
            </CardHeader>
            <CardBody className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-semibold">{c.courseTitle}</h3>
                {role === 'Admin' ? (
                  <Chip color={'danger'} size="sm" className="ml-2">
                    {c.availability}
                  </Chip>
                ) : (
                  element(c._id)
                )}
              </div>

              <p className="text-default-500 text-sm mb-4 line-clamp-2">
                {c.description}
              </p>

              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-default-500">
                  <span>Teacher: {c.teacher.fullName}</span>
                </div>
                <div className="flex items-center gap-2 text-default-500">
                  <span>Class: {c.darja.darjaID}</span>
                </div>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>

      {/* <AdminModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} /> */}
    </>
  )
}

export default Courselist