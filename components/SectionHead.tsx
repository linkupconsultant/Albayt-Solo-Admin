import React from 'react'

type headProps = {
    title: string;
    placeholder: string;
}

const SectionHead = ({title, placeholder}: headProps) => {
  return (
    <>
        <div className='flexBetween my-6 '>
            <h1 className='font-bold text-5xl text-[#f14310] uppercase'>{title}</h1>

            <div className='flex items-center gap-1'>
                <div className='flex items-center gap-3 py-2 pl-2 pr-4 border border-gray-30 rounded-lg'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className='fill-gray-30'><path d="M21.172 24l-7.387-7.387c-1.388.874-3.024 1.387-4.785 1.387-4.971 0-9-4.029-9-9s4.029-9 9-9 9 4.029 9 9c0 1.761-.514 3.398-1.387 4.785l7.387 7.387-2.828 2.828zm-12.172-8c3.859 0 7-3.14 7-7s-3.141-7-7-7-7 3.14-7 7 3.141 7 7 7z"/></svg>
                    <input type='text' placeholder={placeholder} className='focus:outline-none'/>
                </div>
                <button className='py-2 px-4 rounded-lg bg-[#f14310] font-medium text-white tracking-wider duration-200 hover:bg-black'>
                    Cari
                </button>
            </div>
        </div>
    </>
  )
}

export default SectionHead