import React from 'react'
import { FaUserPlus } from 'react-icons/fa'
import { Avatar, Button } from "@heroui/react";

const Invitations = () => {
    const username = ['Abrar', 'Asfund', 'Ali', 'Umer', 'Kashif']
    const role = ['Admin', 'Student', 'Teacher', 'Teacher', 'Student']
    const darja = ['', '4', '', '', '5']
    const fullname = ['Muhammad Abrar', 'Asfund Ali Amjad', 'Muhammad Ali', 'Muhammad Umer', 'Muhammad Kashif']
    return (
        <div className='w-full h-screen p-1.5 pt-5'>
            <div className='max-w-full mx-auto space-y-6 bg-white rounded-lg'>
                <div className='w-full flex justify-between p-4'>
                    <p className='p-2 px-5 text-2xl font-bold'>Access request</p>
                    <button className='p-2 px-5 font-medium bg-Primary rounded-md hover:bg-blue-500 flex items-center text-white bg-black'>
                        Invite<FaUserPlus className='ml-4' />
                    </button>
                </div>
                <div className='w-full rounded-lg p-3 justify-items-start'>
                    {username.map((a, i) => {
                        return (
                            <div className='bg-gray-200 flex w-full rounded-md mb-2 p-3 cursor-pointer justify-between'>
                                <p className='flex gap-3 items-center'>
                                    <Avatar name={username[i]} className="text-white bg-black" />
                                    <span>{fullname[i]}</span><span>{role[i]}</span>class {darja[i]}
                                </p>
                                <div>
                                    <button type='submit' className='text-2xl font-medium rounded-lg mr-10 py-1 px-3 bg-Primary hover:bg-success-400'>Accept</button>
                                    <button type='submit' className='text-2xl font-medium rounded-lg mr-10 py-1 px-3 bg-Primary hover:bg-danger-500'>Reject</button>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Invitations