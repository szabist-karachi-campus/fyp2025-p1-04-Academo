import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Image } from "@heroui/react"
import React from 'react'

const EventModal = ({ isOpen, onClose, selectedImage, selectedEvent, selectedDescription,selectedDate}) => {
  return (
    <Modal backdrop={'blur'} isOpen={isOpen} onClose={onClose}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">{selectedEvent}</ModalHeader>
                <ModalBody>
                  <p>14/07/2003</p>
                  <Image
                    alt="Card background"
                    className="object-cover rounded-xl cursor-pointer"
                    src={selectedImage}
                    width={400}
                    height={200}
                  />
                  <p>
                    {selectedDescription}
                  </p>
                  <p>
                    Date: {selectedDate}
                  </p>
                </ModalBody>
                <ModalFooter>
                  <Button onPress={onClose} className='bg-danger-500 text-white' >
                    Close
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>

  )
}

export default EventModal