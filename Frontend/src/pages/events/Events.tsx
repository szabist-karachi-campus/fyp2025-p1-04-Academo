import React, { useEffect, useState } from 'react'
import { Card, CardHeader, CardBody, Image } from "@heroui/react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@heroui/react";
// import image1 from '../../assets/ScreenShot-2022-2-10_14-59-46.png'
// import image2 from '../../assets/ScreenShot-2022-2-15_13-39-37.png'
// import image3 from '../../assets/ScreenShot-2022-2-5_12-4-56.png'
// import image4 from '../../assets/ScreenShot-2022-2-6_21-57-25.png'
// import image5 from '../../assets/ScreenShot-2022-2-10_14-59-56.png'
// import image6 from '../../assets/ScreenShot-2022-2-9_17-18-44.png'
import { ExtractData } from '../../extractingDataFromCookies';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@reduxjs/toolkit/query';
import EventModatl from './EventModal';
import AddEventModal from './AddEventModal';
import { AppDispatch } from '../../redux/store';
import { getEvent } from '../../redux/user/userSlice';




const Events = () => {

  ExtractData();
  const { role, event, _id } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();

  // const events = ['Event1', 'Event2', 'Event3', 'Event4', 'Event5', 'Event6']
  // const images = [image1, image2, image3, image4, image5, image6]
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedEvent, setSelectedEvent] = useState('');
  const [selectedImage, setSelectedImage] = useState('')
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedDescription, setSelectedDescription] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)


  const handleOpen = () => {
    onOpen();
  }

  useEffect(() => {
    dispatch(getEvent())
    console.log(event)
  }, [])

  // useEffect(() => {
  //   console.log(selectedEvent)
  // })

  return (
    <div className="w-screen min-h-screen bg-gray-100">
      <div className="p-5">
        {role === 'Admin' && <Button color="primary" className='mb-4 left-[89.4%] xs:left-[15%] md:left-[89.4%]'
          onClick={() => {
            setIsModalOpen(true)
          }}
        >
          Add New Event
        </Button>}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" >
          {event.map((e, i) => {
            return (
              <Card className="py-4">
                <CardHeader className="pb-0 pt-2 px-4 flex-col items-start" onClick={() => {
                  setSelectedEvent(e.eventName)
                  setSelectedImage(e.eventImage)
                  setSelectedDescription(e.eventDescription)
                  setSelectedDate(e.eventDate)
                }}>
                  <p className="text-tiny uppercase font-bold">{e.eventName}</p>
                  {/* <small className="text-default-500">{e.eventDescription}</small> */}
                  <h4 className="font-bold text-large">{e.eventDate}</h4>
                </CardHeader>
                <CardBody className="overflow-visible py-2" onClick={() => {
                  setSelectedEvent(e.eventName)
                  setSelectedImage(e.eventImage)
                  setSelectedDescription(e.eventDescription)
                  setSelectedDate(e.eventDate)
                }}>
                  <Image
                  alt="Card background"
                  className="object-cover rounded-xl cursor-pointer"
                  src={e.eventImage}
                  width={400}
                  height={200}
                  onClick={handleOpen}
                  />
                  </CardBody> 
              </Card>
            )
          })}

        </div>
        <EventModatl
        isOpen={isOpen}
        onClose={onClose}
        selectedEvent={selectedEvent}
        selectedImage={selectedImage}
        selectedDescription={selectedDescription} 
        selectedDate={selectedDate}/>

        <AddEventModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} admin={_id}/>
      </div>
    </div>
  )
}

export default Events