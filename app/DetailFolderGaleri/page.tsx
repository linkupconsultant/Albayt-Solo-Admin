import { GALERI_2024 } from '@/constant'
import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <>
        <section className='bg-white p-6 rounded-lg'>
            {/* Header */}
            <div className='flexBetween mb-8'>
                <div className='flex gap-4 items-center'>
                    <Link href={'/Galeri'}>
                        <button className='p-1 bg-[#f14310] rounded-lg fill-white duration-200 hover:bg-black'>
                            <svg width={28} height={28} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m9.474 5.209s-4.501 4.505-6.254 6.259c-.147.146-.22.338-.22.53s.073.384.22.53c1.752 1.754 6.252 6.257 6.252 6.257.145.145.336.217.527.217.191-.001.383-.074.53-.221.293-.293.294-.766.004-1.057l-4.976-4.976h14.692c.414 0 .75-.336.75-.75s-.336-.75-.75-.75h-14.692l4.978-4.979c.289-.289.287-.761-.006-1.054-.147-.147-.339-.221-.53-.221-.191-.001-.38.071-.525.215z"/></svg>
                        </button>
                    </Link>
                    <h1 className='font-bold text-4xl text-[#f14310]'>UMRAH BERSAMA 2024</h1>
                </div>

                <button className='flex items-center gap-2 bg-[#f14310] text-white font-medium fill-white px-4 py-2 rounded-lg duration-200 hover:bg-black'>
                    <svg viewBox="0 0 24 24" height={24} width={24} xmlns="http://www.w3.org/2000/svg" className='fill-white'><path d="m11 11h-7.25c-.414 0-.75.336-.75.75s.336.75.75.75h7.25v7.25c0 .414.336.75.75.75s.75-.336.75-.75v-7.25h7.25c.414 0 .75-.336.75-.75s-.336-.75-.75-.75h-7.25v-7.25c0-.414-.336-.75-.75-.75s-.75.336-.75.75z"/></svg>
                    <p>Tambah Foto</p>
                </button>
            </div>
            {/* End Of Header */}

            <div className='grid grid-cols-4 gap-4'>
                {GALERI_2024.map((galeri) => (
                    <div key={galeri.key} className='flexCenter'>
                        <div className='card_galery'>
                            <div className='image_box'>
                                <img src={galeri.link} alt='foto-galeri' className='The_Image' />
                                <p className='image_text'>{galeri.title}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    </>
  )
}

export default page