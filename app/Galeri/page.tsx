import SectionHead from '@/components/SectionHead'
import { FOLDER_GALERI } from '@/constant'
import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <>
      <section className='bg-white p-6 rounded-lg'>
        <SectionHead title='Galeri' placeholder='Cari Galeri' addButton='visible' link='' />

        <div className='grid grid-cols-3 gap-5'>
          {FOLDER_GALERI.map((folder) => (
            <Link key={folder.folder_key} href={'/DetailFolderGaleri'}>
              <div className='bg-white h-56 border rounded-lg shadow-md duration-500 hover:shadow-2xl'>
                <img src={folder.thumbnail} alt='thumbnail-folder' className='object-cover w-full h-[70%] rounded-t-lg'/>

                <div className='px-6 py-3'>
                  <h1 className='text-center font-bold text-[18px]'>{folder.title}</h1>
                </div>
              </div>
            </Link>
          ))}
        </div>

      </section>
    </>
  )
}

export default page