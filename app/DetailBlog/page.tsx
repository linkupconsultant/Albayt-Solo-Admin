import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <>
        <section className='bg-white p-6 rounded-lg'>

            {/* Content */}
                <div className='my-8'>

                <div className='flexStart mb-8'>
                    <Link href={'/Blog'}>
                        <button className='bg-[#f14310] px-4 py-2 rounded-lg duration-200 font-medium text-white fill-white tracking-wider flex items-center gap-2 hover:bg-black'>
                            <svg width={24} height={24} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m9.474 5.209s-4.501 4.505-6.254 6.259c-.147.146-.22.338-.22.53s.073.384.22.53c1.752 1.754 6.252 6.257 6.252 6.257.145.145.336.217.527.217.191-.001.383-.074.53-.221.293-.293.294-.766.004-1.057l-4.976-4.976h14.692c.414 0 .75-.336.75-.75s-.336-.75-.75-.75h-14.692l4.978-4.979c.289-.289.287-.761-.006-1.054-.147-.147-.339-.221-.53-.221-.191-.001-.38.071-.525.215z"/></svg>
                            <p>Kembali</p>
                        </button>
                    </Link>
                </div>

                    <div className='flexCenter mb-10'>
                        <img src='/Poster/paket_1.jpeg' alt='foto-blog' className='h-96' />
                    </div>

                    <form className='flex flex-col gap-8'>
                        <div className='flex flex-col gap-1'>
                            <label className='font-semibold text-[18px]'>ID Artikel</label>
                            <input type='text' value='ID Artikel' readOnly className='border px-4 py-3 rounded-lg font-medium focus:outline-none'/>
                        </div>

                        <div className='flex flex-col gap-1'>
                            <label className='font-semibold text-[18px]'>Judul</label>
                            <input type='text' placeholder='Judul Artikel' className='border px-4 py-3 rounded-lg font-medium focus:outline-none'/>
                        </div>

                        <div className='flex flex-col gap-1'>
                            <label className='font-semibold text-[18px]'>Tanggal</label>
                            <input type='date' className='border px-4 py-3 rounded-lg font-medium focus:outline-none'/>
                        </div>

                        <div className='flex flex-col gap-1'>
                            <label className='font-semibold text-[18px]'>Kategori</label>
                            <select className='px-4 py-3 border rounded-lg focus:outline-none'>
                                <option value='olahraga'>Olahraga</option>
                                <option value='gaya_hidup'>Gaya Hidup</option>
                                <option value='kesehatan'>Kesehatan</option>
                                <option value='umrah'>Umrah</option>
                                <option value='haji'>Haji</option>
                                <option value='Ramadhan'>Ramadhan</option>
                            </select>
                        </div>

                        <div className='flex flex-col gap-1'>
                            <label className='font-semibold text-[18px]'>Isi Artikel</label>
                            <textarea placeholder='Isi Artikel' rows={5} cols={50} className='px-4 py-3 border rounded-lg resize-none focus:outline-none'></textarea>
                        </div>

                        <div className='flexEnd'>
                            <button className='flex gap-2 items-center bg-[#f14310] px-4 py-2 rounded-lg text-white fill-white duration-200 hover:bg-black'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path d="M14 3h2.997v5h-2.997v-5zm9 1v20h-22v-24h17.997l4.003 4zm-17 5h12v-7h-12v7zm14 4h-16v9h16v-9z"/></svg>
                                <p>Simpan</p>
                            </button>
                        </div>
                    </form>
                </div>
            {/* End Of Content */}

        </section>
    </>
  )
}

export default page