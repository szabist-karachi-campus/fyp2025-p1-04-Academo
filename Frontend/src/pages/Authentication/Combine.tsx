import React, { useState } from 'react'
import Login from './Login'
import Signup from './Signup'
import Academo from '../../assets/Academo Logo.png'
import Download from '../../assets/download.png'

function Combine() {

    const [isLogin, setIsLogin] = useState(true)

    return (
        <div className='flex w-full justify-center items-center absolute h-full px-36 lg:px-36 xs:px-10 bg-[#f4f4f4]'>
            <div className='h-1/2 w-full rounded-lg overflow-hidden flex min-h-96
        xs:h-3/4 lg:h-1/2'>
                <div className={`p-6 w-1/2 transition-transform duration-500 xs:w-full lg:w-1/2
                ${isLogin ? 'translate-x-0' : 'sm:-translate-x-0 lg:translate-x-full'}`}
                >
                    {isLogin ? <Login isLogin={isLogin} setIslogin={setIsLogin} /> : <Signup isLogin={isLogin} setIslogin={setIsLogin} />}
                </div>
                <div className='w-1/2 transition-transform duration-500 ease-in-out lg:w-1/2 xs:w-auto bg-no-repeat md-1/2'
                    style={{
                        backgroundImage: `url(${Academo})`,
                        backgroundPosition: 'center',
                        transform: isLogin ? 'translateX(0%)' : 'translateX(-100%)'
                    }}
                />
            </div>
        </div>
    )
}

export default Combine