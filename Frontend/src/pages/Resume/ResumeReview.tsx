import React, { useState } from 'react'
import { api } from '../../api';
import toast from 'react-hot-toast';
import Markdown from 'react-markdown';
import { GiSparkles } from 'react-icons/gi';
import { FiFileText } from 'react-icons/fi';
import { FaFile } from "react-icons/fa6";

const ReviewResume = () => {

  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [content, setContent] = useState('')

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true)

      const formData = new FormData();
      formData.append('resume', input);

      const { data } = await api.post('/resume', formData)

      if (data.success) {
        setContent(data.text)
      }

      else {
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message)
    }
    setLoading(false)
  }

  return (
    <div className="h-full w-full overflow-y-scroll p-6 flex items-start flex-wrap gap-4 text-slate-700">

      {/* Left col */}
      <form onSubmit={onSubmitHandler}
        className='w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200'>
        <div className='flex items-center gap-3 '>
          <GiSparkles className='w-6 text-[#00da83]' />
          <h1 className='text-xl font-semibold'>Resume Review</h1>
        </div>
        <p className='mt-6 text-sm font-medium'>Upload Resume</p>

        <input type="file"
          className='w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300 text-gray-600'
          onChange={(e) => {
            if (e.target.files && e.target.files.length > 0) {
              setInput(e.target.files[0])
            }
          }}
          accept='application/pdf'
          required />

        <p className='text-xs text-gray-500 font-light mt-1'>
          Supports PDF resume only.
        </p>

        <button disabled={loading} className='w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#00da83] to-[#009bb3] text-white px-4 py-2 mt-6 text-sm rounded-lg cursor-pointer'>
          {
            loading ? <span className='w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin' />
              :
              <FiFileText className='w-5' />
          }
          Review Resume
        </button>

      </form>

      {/* Right col */}
      <div className='w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border border-gray-200 min-h-96 max-h-[600px]'>
        <div className='flex items-center gap-3'>
          <FaFile className='w-5 h-5 text-[#00da83]' />
          <h1 className='text-xl font-semibold'>Analysis Results</h1>
        </div>

        {!content ?
          (
            <div className='flex-1 flex justify-center items-center'>
              <div className='text-sm flex flex-col items-center gap-5 text-gray-400'>
                <FiFileText className='w-9 h-9' />
                <p>Upload a resume and click "Review Resume" to get started</p>
              </div>
            </div>
          )
          :
          (
            <div className='mt-3 h-full overflow-y-scroll text-sm text-slate-600'>
              <div className='reset-tw'>
                <Markdown>{content}</Markdown>
              </div>
            </div>
          )
        }
      </div>

    </div>
  )
}

export default ReviewResume