'use client'

import Link from 'next/link';
import { useState } from 'react';

const Page = () => {
  const [hotels, setHotels] = useState([{ stars: '', name: '', urls: ['', '', ''] }]);
  const [prices, setPrices] = useState([{ type: 'Quad', amount: '', currency: 'idr' }]);

  const handleAddHotel = () => {
    setHotels([...hotels, { stars: '', name: '', urls: ['', '', ''] }]);
  };

  const handleRemoveHotel = (index: any) => {
    setHotels(hotels.filter((_, i) => i !== index));
  };

  const handleAddPrice = () => {
    setPrices([...prices, { type: 'Quad', amount: '', currency: 'idr' }]);
  };

  const handleRemovePrice = (index: any) => {
    setPrices(prices.filter((_, i) => i !== index));
  };

  return (
    <>
      <section className='bg-white p-6 rounded-lg'>
        <div className='flex gap-5 items-center'>
          <Link href={'/PaketPage'}>
            <svg width={36} height={36} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className='bg-[#f14310] fill-white rounded-md duration-200 hover:bg-black'>
              <path d="m9.474 5.209s-4.501 4.505-6.254 6.259c-.147.146-.22.338-.22.53s.073.384.22.53c1.752 1.754 6.252 6.257 6.252 6.257.145.145.336.217.527.217.191-.001.383-.074.53-.221.293-.293.294-.766.004-1.057l-4.976-4.976h14.692c.414 0 .75-.336.75-.75s-.336-.75-.75-.75h-14.692l4.978-4.979c.289-.289.287-.761-.006-1.054-.147-.147-.339-.221-.53-.221-.191-.001-.38.071-.525.215z" />
            </svg>
          </Link>
          <h1 className='font-bold uppercase text-4xl text-[#f14310]'>Judul Paket</h1>
        </div>

        {/* Content */}
        <div className='my-8'>
          <form className='flex flex-col gap-5 my-8'>
            <div className='flex flex-col gap-1'>
              <label className='font-semibold text-[18px]'>ID Paket</label>
              <input placeholder='ID Paket' className='text-gray-50 px-2 py-4 border rounded-lg focus:outline-none font-medium' />
            </div>

            <div className='flex flex-col gap-1'>
              <label className='font-semibold text-[18px]'>Nama Paket</label>
              <input type='text' placeholder='Nama Paket' className='px-2 py-4 border rounded-lg focus:outline-none' />
            </div>

            <div className='flex flex-col gap-1'>
              <label className='font-semibold text-[18px]'>Tanggal Keberangkatan</label>
              <input type='date' className='px-2 py-4 w-1/2 text-gray-50 border rounded-lg focus:outline-none' />
            </div>

            <div className='flex flex-col gap-1'>
              <label className='font-semibold text-[18px]'>Lokasi Keberangkatan</label>
              <input type='text' placeholder='Lokasi Keberangkatan' className='px-2 py-4 border rounded-lg focus:outline-none' />
            </div>

            <div className='flex flex-col gap-1'>
              <h3 className='font-semibold text-[18px]'>Poster Paket</h3>
              <label htmlFor='file_poster' className='py-2 px-4 bg-green-50 text-white font-medium duration-200 w-fit rounded-lg cursor-pointer hover:bg-black'>Pilih File</label>
              <input id='file_poster' className='hidden' type='file' />
            </div>

            <div className='flex flex-col gap-1'>
              <h3 className='font-semibold text-[18px]'>Thumbnail Paket</h3>
              <label htmlFor='file_thumbnail' className='py-2 px-4 bg-green-50 text-white font-medium duration-200 w-fit rounded-lg cursor-pointer hover:bg-black'>Pilih File</label>
              <input id='file_thumbnail' className='hidden' type='file' />
            </div>

            <div className='flex flex-col gap-1'>
              <label className='font-semibold text-[18px]'>Hotel</label>
              {hotels.map((hotel, index) => (
                <div key={index} className='pl-8 my-2'>
                  <div className='flex flex-col gap-3'>
                    <p className='font-semibold text-[16px]'>Hotel {index + 1}</p>
                    <div className='flex flex-col gap-1'>
                      <label className='font-semibold text-[16px]'>Bintang: </label>
                      <input type='text' placeholder='Bintang Hotel' className='p-2 w-[50%] border rounded-lg focus:outline-none' />
                    </div>
                    <div className='flex flex-col gap-1'>
                      <label className='font-semibold text-[16px]'>Nama Hotel: </label>
                      <input type='text' placeholder='Nama Hotel' className='p-2 w-[50%] border rounded-lg focus:outline-none' />
                    </div>
                    <div className='flex flex-col gap-1'>
                      <label className='font-semibold text-[16px]'>URL Gambar Hotel: </label>
                      {hotel.urls.map((url, urlIndex) => (
                        <input key={urlIndex} type='text' placeholder='Link URL (www.example.com)' className='text-gray-50 w-[50%] p-2 border rounded-lg focus:outline-none' />
                      ))}
                    </div>
                    <div className='flexEnd w-1/2'>
                      <button type='button' onClick={() => handleRemoveHotel(index)} className='flex gap-2 items-center py-1 px-2 w-fit mt-3 bg-red-500 text-[16px] text-white font-medium rounded-lg duration-200 hover:bg-black'>
                        <p>Hapus</p>
                        <svg viewBox="0 0 24 24" height={22} width={22} xmlns="http://www.w3.org/2000/svg" className='fill-white'>
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              <button type='button' onClick={handleAddHotel} className='flex gap-2 items-center py-1 px-2 w-fit mt-3 bg-[#f14310] text-[16px] text-white font-medium rounded-lg duration-200 hover:bg-black'>
                <p>Tambah</p>
                <svg viewBox="0 0 24 24" height={22} width={22} xmlns="http://www.w3.org/2000/svg" className='fill-white'>
                  <path d="m11 11h-7.25c-.414 0-.75.336-.75.75s.336.75.75.75h7.25v7.25c0 .414.336.75.75.75s.75-.336.75-.75v-7.25h7.25c.414 0 .75-.336.75-.75s-.336-.75-.75-.75h-7.25v-7.25c0-.414-.336-.75-.75-.75s-.75.336-.75.75z" />
                </svg>
              </button>
            </div>

            <div className='flex flex-col gap-1'>
              <label className='font-semibold text-[18px]'>Harga</label>
              {prices.map((price, index) => (
                <div key={index} className='pl-8 my-2'>
                  <div className='flex flex-col gap-3'>
                    <p className='font-semibold text-[16px]'>Harga {index + 1}</p>
                    <div className='flex flex-col gap-1'>
                      <label className='font-semibold text-[16px]'>Tipe: </label>
                      <input type='text' placeholder='Tipe Harga' className='p-2 w-[50%] border rounded-lg focus:outline-none' />
                    </div>
                    <div className='flex flex-col gap-1'>
                      <label className='font-semibold text-[16px]'>Jumlah: </label>
                      <input type='number' placeholder='Jumlah' className='p-2 w-[50%] border rounded-lg focus:outline-none' />
                    </div>
                    <div className='flex flex-col gap-1'>
                      <label className='font-semibold text-[16px]'>Mata Uang: </label>
                      <select className='p-2 w-[50%] border rounded-lg focus:outline-none'>
                        <option value='idr'>IDR</option>
                        <option value='usd'>USD</option>
                      </select>
                    </div>
                    <div className='flexEnd w-1/2'>
                      <button type='button' onClick={() => handleRemovePrice(index)} className='flex gap-2 items-center py-1 px-2 w-fit mt-3 bg-red-500 text-[16px] text-white font-medium rounded-lg duration-200 hover:bg-black'>
                        <p>Hapus</p>
                        <svg viewBox="0 0 24 24" height={22} width={22} xmlns="http://www.w3.org/2000/svg" className='fill-white'>
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              <button type='button' onClick={handleAddPrice} className='flex gap-2 items-center py-1 px-2 w-fit mt-3 bg-[#f14310] text-[16px] text-white font-medium rounded-lg duration-200 hover:bg-black'>
                <p>Tambah</p>
                <svg viewBox="0 0 24 24" height={22} width={22} xmlns="http://www.w3.org/2000/svg" className='fill-white'>
                  <path d="m11 11h-7.25c-.414 0-.75.336-.75.75s.336.75.75.75h7.25v7.25c0 .414.336.75.75.75s.75-.336.75-.75v-7.25h7.25c.414 0 .75-.336.75-.75s-.336-.75-.75-.75h-7.25v-7.25c0-.414-.336-.75-.75-.75s-.75.336-.75.75z" />
                </svg>
              </button>
            </div>

            <div className='flex flex-col gap-1'>
              <label className='font-semibold text-[18px]'>Harga DP</label>
              <input type='number' placeholder='Contoh: 500000' className='p-2 w-[50%] border rounded-lg focus:outline-none' />
            </div>

            <div className='flex flex-col gap-1'>
              <label className='font-semibold text-[18px]'>Durasi Perjalanan</label>
              <input type='number' placeholder='Durasi Perjalanan' className='px-2 py-4 w-[52%] border rounded-lg focus:outline-none' />
            </div>

            <div className='flex flex-col gap-1'>
              <label className='font-semibold text-[18px]'>Maskapai Penerbangan</label>
              <input type='text' placeholder='Maskapai Penerbangan' className='px-2 py-4 w-[52%] border rounded-lg focus:outline-none' />
            </div>

            <div className='flex flex-col gap-1'>
              <label className='font-semibold text-[18px]'>Total Seat</label>
              <input type='number' placeholder='Total Seat' className='px-2 py-4 w-[52%] border rounded-lg focus:outline-none' />
            </div>

            <div className='flex flex-col gap-1'>
              <label className='font-semibold text-[18px]'>Seat Tersedia</label>
              <input type='number' placeholder='Seat Tersedia' className='px-2 py-4 w-[52%] border rounded-lg focus:outline-none' />
            </div>
          </form>
        </div>
        {/* End Of Content */}

        <Link href={'/'}>
          <div className='flexEnd mt-5'>
            <button className='bg-[#f14310] px-4 py-2 flex gap-2 items-center rounded-lg duration-200 font-medium text-white tracking-wider hover:bg-black'>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" className='fill-white'>
                <path d="M14 3h2.997v5h-2.997v-5zm9 1v20h-22v-24h17.997l4.003 4zm-17 5h12v-7h-12v7zm14 4h-16v9h16v-9z" />
              </svg>
              <p>Simpan Perubahan</p>
            </button>
          </div>
        </Link>
      </section>
    </>
  );
}

export default Page;
