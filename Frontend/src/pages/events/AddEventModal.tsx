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
} from "@heroui/react";
import { useAuthContext } from '../../context/AuthContext';
import { useEventSubmit } from '../events/handleEventSubmit';

const AddEventModal = ({ isOpen, onClose, admin }) => {

    const { darja, teacher } = useAuthContext();

    const [inputs, setInputs] = useState({
        eventName: '',
        eventDescription: '',
        eventImage: '',
        eventDate: '',
        admin: admin,
    })

    const { loading, submit } = useEventSubmit();


    const handlesubmit = async (e) => {
        e.preventDefault();
        await submit(inputs)
        onClose();

    }

    const handleDateChange = (e) => {
        const date = new Date(e.target.value).toLocaleDateString("en-US", { day: '2-digit', month: 'long', year: 'numeric', timeZone: 'Asia/Karachi' })

        setInputs((prev) => ({ ...prev, eventDate: date }));
      };

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="md">
            <ModalContent>
                <form onSubmit={handlesubmit}>
                    <ModalHeader className="text-xl font-bold">Add New Event</ModalHeader>
                    <ModalBody>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input
                                name="Event name"
                                label="Event title"
                                placeholder="Enter event title"
                                required
                                className='col-span-2'
                                onChange={e => setInputs(prev => ({ ...prev, eventName: e.target.value }))}
                            />
                            <Textarea
                                name="description"
                                label="Event description"
                                placeholder="Enter event description"
                                className="md:col-span-2"
                                required
                                onChange={e => setInputs(prev => ({ ...prev, eventDescription: e.target.value }))}
                            />
                            <Input
                                name="image"
                                label="Image URL"
                                placeholder="Enter image URL"
                                required
                                className='col-span-2'
                                onChange={e => setInputs(prev => ({ ...prev, eventImage: e.target.value }))}

                            />
                            <Input
                                name="startDate"
                                label="Start Date"
                                type="date"
                                required
                                onChange={(e) => handleDateChange(e)}
                            />
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

export default AddEventModal