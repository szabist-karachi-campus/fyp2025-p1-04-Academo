import React, { useState } from 'react'
const Dropdown = ({data, text, onSelect}) => {

    const [darjanumber, setDarja] = useState(0)

    return (
        <div className="w-full flex flex-col gap-4">
            <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 pt-3">
                <select
                    className='w-full border border-solid border-gray-300 rounded-md p-2 text-black mb-3 bg-transparent cursor-pointer'
                    value={darjanumber}
                    onChange={(e) => {
                        setDarja(e.target.value)
                        onSelect(e.target.value)
                    }}

                >
                    <option value="" className='bg-black text-white'>{text}</option>
                    {data.map((d, i) => (
                        <option value={d} key={i} className='bg-black text-white'>{d}</option>
                    ))}
                </select>
            </div>
        </div>
    )
}

export default Dropdown