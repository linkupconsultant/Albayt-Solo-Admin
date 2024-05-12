import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <>
      <section className='bg-white p-6 rounded-lg'>
        <form className='flex flex-col gap-6'>
          
          <div className='flex flex-col gap-2'>
            <h3 className='font-bold text-[18px]'>ID Pembelian</h3>
            <input value={'ID Paket'} readOnly className='text-gray-50 px-2 py-4 border rounded-lg focus:outline-none' />
          </div>

          <div className='flex flex-col gap-2'>
            <h3 className='font-bold text-[18px]'>ID User</h3>
            <input value={'ID User'} readOnly className='text-gray-50 px-2 py-4 border rounded-lg focus:outline-none' />
          </div>

          <div className='flex flex-col gap-2'>
            <h3 className='font-bold text-[18px]'>Tanggal Pembelian</h3>
            <input value={'2024-07-08'} readOnly className='text-gray-50 px-2 py-4 border rounded-lg focus:outline-none' />
          </div>

          <div className='flex flex-col gap-2'>
            <h3 className='font-bold text-[18px]'>Paket Dibeli</h3>
            <input value={'Paket SuperSaver'} readOnly className='text-gray-50 px-2 py-4 border rounded-lg focus:outline-none' />
          </div>

          <div className='flex flex-col gap-3'>
            <h3 className='font-bold text-[18px]'>Detail Jamaah</h3>
            <div className='flex flex-col gap-1'>
              <h3 className='font-semibold text-[18px]'>Jamaah Dewasa</h3>
              <div className='flex gap-8 font-medium'>
                <p>Nama    : Fulan</p>
                <p>No Telp : 0898765432</p>
              </div>
              <div className='flex gap-8 font-medium'>
                <p>Nama    : Fulano</p>
                <p>No Telp : 0898765432</p>
              </div>
            </div>
            <div className='flex flex-col gap-1'>
              <h3 className='font-semibold text-[18px]'>Jamaah Anak-anak</h3>
              <div className='flex gap-8 font-medium'>
                <p>Nama    : Fulana</p>
                <p>Usia    : 9 Tahun</p>
              </div>
            </div>
          </div>
          
          <div className='flex flex-col gap-2'>
            <h3 className='font-bold text-[18px]'>Email</h3>
            <input value={'Example@gmail.com'} readOnly className='text-gray-50 px-2 py-4 border rounded-lg focus:outline-none' />
          </div>

          <div className='flex flex-col gap-2'>
            <h3 className='font-bold text-[18px]'>Metode Pembayaran</h3>
            <input value={'BNI'} readOnly className='text-gray-50 px-2 py-4 border rounded-lg focus:outline-none' />
          </div>

          <div className='flex flex-col gap-2'>
            <h3 className='font-bold text-[18px]'>Total Pembayaran</h3>
            <input value={'Rp 500.000,00'} readOnly className='text-gray-50 px-2 py-4 border rounded-lg focus:outline-none' />
          </div>

          <div className='flex flex-col gap-2'>
            <h3 className='font-bold text-[18px]'>Bukti Pembayaran</h3>
            <div className='flexCenter'>
              <img src='/Poster/paket_1.jpeg' className='h-[32rem] w-auto'></img>
            </div>
          </div>

          <div className='flex flex-col gap-2'>
            <h3 className='font-bold text-[18px]'>Status Pembayaran</h3>
            <select className='text-gray-50 w-1/2 px-2 py-4 border rounded-lg focus:outline-none'>
              <option value='Berhasil'>Berhasil</option>
              <option value='Menunggu Pembayaran'>Menunggu Pembayaran</option>
              <option value='Berkas Ditolak'>Berkas Ditolak</option>
            </select>
          </div>

        </form>

        <Link href={'/'}>
          <div className='flexEnd mt-8'>
            <button className='bg-[#f14310] px-4 py-2 flex gap-2 items-center rounded-lg duration-200 font-medium text-white tracking-wider hover:bg-black'>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" className='fill-white'><path d="M14 3h2.997v5h-2.997v-5zm9 1v20h-22v-24h17.997l4.003 4zm-17 5h12v-7h-12v7zm14 4h-16v9h16v-9z"/></svg>
                <p>Simpan Perubahan</p>
            </button>
          </div>
        </Link>
      </section>
    </>
  )
}

export default page