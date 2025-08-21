import React, { useEffect, useState } from 'react'
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Input,
    Textarea,
    Select,
    SelectItem,
} from "@heroui/react";
import { useAuthContext } from '../../../context/AuthContext';
import { useSubmit } from './handleCourseSubmit';
import { useSelector } from 'react-redux';
import { RootState } from '@reduxjs/toolkit/query';

const AdminModal = ({ isOpen, onClose }) => {

    const statuses = ['Open', 'Closed']

    const { _id } = useSelector((state: RootState) => state.user);
    const { darja, teacher } = useAuthContext();

    const [inputs, setInputs] = useState({
        title: '',
        teacher: '',
        description: '',
        darja: '',
        status: '',
        image: ''
      })

      const {loading, submit} = useSubmit(); 

    const handlesubmit = async (e) => {
        e.preventDefault();
        await submit(inputs)
        onClose();
    
      }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl">
    <ModalContent>
        <form onSubmit={handlesubmit}>
            <ModalHeader className="text-xl font-bold">Add New Course</ModalHeader>
            <ModalBody>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                        name="title"
                        label="Course Title"
                        placeholder="Enter course title"
                        required
                        onChange={e => setInputs(prev => ({ ...prev, title: e.target.value }))}
                    />
                    <Select
                        name="teacher"
                        label="teacher"
                        placeholder="Select teacher"
                        required
                        // value={select}
                        onChange={(e) => {setInputs(prev => ({ ...prev, teacher: e.target.value }))}}
                    >
                        {teacher.filter((item) => item.admin === _id).map((level) => (
                            <SelectItem key={level.fullName} value={level.fullName} textValue={level.fullName}>
                                {level.fullName}
                            </SelectItem>
                        ))}
                    </Select>
                    <Textarea
                        name="description"
                        label="Course Description"
                        placeholder="Enter course description"
                        className="md:col-span-2"
                        required
                        onChange={e => setInputs(prev => ({ ...prev, description: e.target.value }))}
                    />
                    {/* <Input
                        name="duration"
                        label="Duration"
                        placeholder="e.g., 8 weeks"
                        required
                    /> */}
                    <Select
                        name="class"
                        label="class"
                        placeholder="Select your class"
                        required
                        // value={select}
                        onChange={(e) => {setInputs(prev => ({ ...prev, darja: e.target.value }))}}
                    >
                        {darja.filter((item) => item.admin === _id).map((level) => (
                            <SelectItem key={level.darjaID} textValue={level.darjaID}>
                                {level.darjaID}
                            </SelectItem>
                        ))}
                    </Select>
                    {/* <Input
                        name="price"
                        label="Price ($)"
                        type="number"
                        placeholder="Enter price"
                        required
                    /> */}
                    <Input
                        name="image"
                        label="Image URL"
                        placeholder="Enter image URL"
                        required
                        onChange={e => setInputs(prev => ({ ...prev, image: e.target.value }))}

                    />
                    <Select
                        name="enrollmentStatus"
                        label="Enrollment Status"
                        placeholder="Select status"
                        required
                        onChange={e => setInputs(prev => ({ ...prev, status: e.target.value }))}
                    >
                        {statuses.map((status) => (
                            <SelectItem key={status} textValue={status}>
                                {status}
                            </SelectItem>
                        ))}
                    </Select>
                    {/* <Input
                        name="startDate"
                        label="Start Date"
                        type="date"
                        required
                    /> */}
                </div>
            </ModalBody>
            <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                    Cancel
                </Button>
                <Button color="primary" type="submit" isLoading={loading}>
                    Add Course
                </Button>
            </ModalFooter>
        </form>
    </ModalContent>
</Modal>
  )
}

export default AdminModal