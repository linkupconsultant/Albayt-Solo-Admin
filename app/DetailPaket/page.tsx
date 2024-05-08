'use client'

import { useParams } from 'next/navigation'
import React from 'react'

const page = () => {
  const params = useParams();

  return (
    <>
      <section className='bg-white p-6 rounded-lg'>
        <h1 className='font-bold uppercase text-4xl text-[#f14310]'>Judul Paket</h1>
        
        <div className='my-8'>
          <div className='flexCenter'>
            <img src='/Poster/paket_1.jpeg' alt='foto-paket' className='w-96 h-auto'/>
          </div>
        </div>
      </section>
    </>
  )
}

export default page