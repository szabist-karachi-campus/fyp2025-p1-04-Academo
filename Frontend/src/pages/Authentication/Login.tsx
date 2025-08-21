import React, { useState } from 'react'
import { Button } from "@heroui/react";
import { useLogin } from './useLogin';
import { Input } from "@heroui/react";




const Login = ({ isLogin, setIslogin }) => {

  const [inputs, setInputs] = useState({
    username: '',
    password: '',
  })

  const { loading, login } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(inputs)

  }



  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className='w-full gap-4'>
          <div className="h-auto w-full md:flex-nowrap mb-6 md:mb-0 ">
            <Input type="username"
              variant='underlined'
              label='Username'
              placeholder='Enter your username'
              onChange={e => setInputs(prev => ({ ...prev, username: e.target.value }))}
              className='mb-6'
              style={{ color: 'black' }} />


            <Input type="password"
              variant='underlined'
              label="Password"
              placeholder='Enter your password'
              onChange={e => setInputs(prev => ({ ...prev, password: e.target.value }))}
              className='mb-6'
              style={{ color: 'black' }} />

            <div className='flex items-center justify-between mt-3'>
              <Button color="primary" isLoading={loading} className='mt-3' type='submit' >
                {loading ? 'Loading...' : 'Submit'}
              </Button>
              <p className='text-black ml-2 hover:underline cursor-pointer' onClick={() => setIslogin(!isLogin)}>Don't have an account? Signup</p>
            </div>
          </div>
        </div>
      </form>
    </>

  )
}

export default Login 
