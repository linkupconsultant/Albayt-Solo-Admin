"use client"
import SectionHead from '@/components/SectionHead'
import { TESTIMONI } from '@/constant'
import Link from 'next/link'
import React, {useState} from 'react'
{/* <td className='p-2 text-[14px]'>{testi.review.length > 40 ? testi.review.slice(0, 40) + '...' : testi.review}</td> */}

const Page = () => {
    const [search, setSearch] = useState("");

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
    };

  return (
    <>
        <section className='bg-white rounded-lg p-6'>
            <SectionHead title='Testimoni' placeholder='Cari Testimoni' addButton='visible' link='' onSearchChange={handleSearch} searchValue={search}/>

            <div className='grid grid-cols-3 gap-5'>
                {TESTIMONI.map((testi) => (
                    <div key={testi.key} className='bg-white h-72 border rounded-lg shadow-md'>
                        <img src={testi.img} alt='foto-testi' className='object-cover w-full h-[60%] rounded-t-lg'/>

                        <div className='px-6 py-2'>
                            <h1 className='font-bold text-center text-[18px]'>{testi.nama}</h1>
                            <p className='text-gray-50 text-justify text-[12px]'>{testi.review.length > 100 ? testi.review.slice(0, 100) + '...' : testi.review}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    </>
  )
}

export default Page