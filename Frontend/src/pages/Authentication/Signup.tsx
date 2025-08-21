import React, { useEffect, useState } from 'react'
import { Input, Button } from "@heroui/react";
import { useSignup } from './useSignup';
import Dropdown from './authenticationcomponents/Dropdown';
import { api } from '../../api';


const Signup = ({ isLogin, setIslogin }) => {

    const [admins, setAdmins] = useState([])
    const [inputs, setInputs] = useState({
        fullName: '',
        username: '',
        darja: '',
        password: '',
        confirmPassword: '',
        role: '',
        phoneNumber: '',
        admin: '',
        adminPassword: ''
    })

    useEffect(() => {
        api.get('/admin').then((v) => {
            setAdmins(v.data.map(admin => admin.username))
        })
    }, [])

    const { loading, signup } = useSignup();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await signup(inputs)
        // console.log(JSON.parse(document.cookie.split('; ').find(row => row.startsWith('chat-app='))?.split('=')[1] || '{}').role)
        console.log(inputs)
    }


    return (
        <form onSubmit={handleSubmit}>
            {/* <div className='w-full gap-4 flex'> */}
                <div className="h-auto w-full md:flex-nowrap mb-6 md:mb-0">
                    <div className='flex'>
                        <div className='w-1/2'>
                            <Input type="name"
                                variant='underlined'
                                label='Fullname'
                                placeholder='Enter your fullname'
                                onChange={e => setInputs(prev => ({ ...prev, fullName: e.target.value }))}
                                className='mb-2'
                                style={{ color: 'black' }} />

                            <Input type="username"
                                variant='underlined'
                                label="Username"
                                placeholder='Enter Your username'
                                onChange={e => setInputs(prev => ({ ...prev, username: e.target.value }))}
                                className='mb-2'
                                style={{ color: 'black' }} />

                            <Input type="password"
                                variant='underlined'
                                label="Password"
                                placeholder='Enter your password'
                                onChange={e => setInputs(prev => ({ ...prev, password: e.target.value }))}
                                className='mb-2 text-white'
                                style={{ color: 'black' }} />

                            <Input type="password"
                                variant='underlined'
                                label="Password"
                                placeholder='Re-enter your password'
                                onChange={e => setInputs(prev => ({ ...prev, confirmPassword: e.target.value }))}
                                className='mb-2 text-blue-100'
                                style={{ color: 'black' }} />
                        </div>
                        <div className='w-1/2 pb-10 px-10'>
                            <Dropdown
                                data={[1, 2, 3, 4, 5, 6, 7, 8]}
                                text={'Select your darja'}
                                
                                onSelect={(v) => setInputs(prev => ({ ...prev, darja: v }))} />

                            <Dropdown
                                data={['Student', 'Teacher', 'Admin']}
                                text={'Select your role'}
                                onSelect={(v) => setInputs(prev => ({ ...prev, role: v }))} />

                            <Dropdown
                                data={admins}
                                text={'Select your admin'}
                                onSelect={(v) => setInputs(prev => ({ ...prev, admin: v }))} />

                            <Input type="password"
                                variant='underlined'
                                label="Admin password"
                                placeholder='Enter admin password'
                                onChange={e => setInputs(prev => ({ ...prev, adminPassword: e.target.value }))}
                                className='text-blue-100 '
                                style={{ color: 'black' }} />
                        </div>
                    </div>



                    <div className='flex items-center justify-between mt-3'>
                        <Button color="primary" isLoading={loading} className='' type='submit' >
                            {loading ? 'Loading...' : 'Submit'}
                        </Button>
                        <p className='text-black ml-2 hover:underline cursor-pointer' onClick={() => setIslogin(!isLogin)}>Already have an account? Sign in!</p>
                    </div>
                </div>
            {/* </div> */}
        </form>
    )
}

export default Signup