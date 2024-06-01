import Link from 'next/link'
import React from 'react'
import Seatbar from "@/components/Seatbar";
import { Timestamp } from 'firebase-admin/firestore';

export type hargaProps = {
  tipe: string,
  nominal: number,
  currency: string,
}

export type hotelProps = {
  bintang: string,
  nama_hotel: string,
  url_hotel: string[],
}

export type paketProps = {
  durasi: number,
  harga: hargaProps[],
  harga_dp: number,
  hotel: hotelProps[],
  img: string,
  jadwal: Timestamp | null,
  lokasiberangkat: string,
  maskapai: string,
  paketID: string,
  remainingseat: number,
  thumbnail: string,
  title: string,
  totalseat: number,
}

export type cardProps = {
  paketID: string,
  remainingseat: number,
  thumbnail: string,
  title: string,
  totalseat: number,
  jadwal: string
}

const CardPaket : React.FC<{paket : cardProps}> = ({paket}) => {
  return (
    <div key={paket.paketID} className='flex flex-col justify-between bg-white h-96 rounded-lg shadow-md border duration-500 hover:shadow-xl'>
      <div>
        <img src={paket.thumbnail} alt='foto-paket' className='h-40 w-full object-cover rounded-t-lg' />
        <h1 className='font-semibold text-[14px] text-center my-3 mx-6 h-16'>{paket.title}</h1>
        <div className='mx-6'>
          <Seatbar totalSeats={paket.totalseat} remainingSeats={paket.remainingseat} />
        </div>
      </div>
      <div className='flexEnd gap-2 items-center m-4'>
        <Link href={`/Paket/${paket.paketID}`}>
          <p className='bg-[#f14310] py-1 px-4 font-medium text-white duration-200 hover:bg-black rounded-md'>Detail</p>
        </Link>
      </div>
    </div>
  )
}

export default CardPaket