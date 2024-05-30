import SectionHead from '@/components/SectionHead'
import { BERITA_ARTIKEL } from '@/constant'
import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <>
        <section className='bg-white p-6 rounded-lg'>
            <SectionHead title='Blog' placeholder='Cari Blog' addButton='visible' link=''/>

            {/* Content */}
                <div className='grid grid-cols-3 gap-5'>
                    {BERITA_ARTIKEL.map((blog) => (
                        <Link href={'/DetailBlog'}>
                            <div key={blog.id} className='bg-white h-64 border shadow-md rounded-lg duration-200 hover:shadow-xl'>
                                <img src={blog.image} alt='foto-blog' className='object-cover w-full h-[60%] rounded-t-lg' />

                                <div className='px-6 py-3'>
                                    <h1 className='font-bold text-[18px] text-center'>{blog.title}</h1>
                                    <p className='text-[14px] text-gray-50 text-center'>{blog.author}</p>
                                    <p className='text-[14px] text-gray-50 text-center'>{blog.date}</p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            {/* End Of Content */}
        </section>
    </>
  )
}

export default page
