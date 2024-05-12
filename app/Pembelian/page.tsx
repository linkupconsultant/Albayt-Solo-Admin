import SectionHead from '@/components/SectionHead'
import React from 'react'
import data_pembelian from '@/constant/datapembelian.json'
import data_paket from '@/constant/datapaket.json'
import Link from 'next/link'

const page = () => {
  // Mengurutkan data riwayat pembelian berdasarkan tanggal pembelian terbaru
  const sortedDataPembelian = [...data_pembelian].sort((a, b) => new Date(b.tanggalPemesanan).getTime() - new Date(a.tanggalPemesanan).getTime());

  // Mencari paket berdasarkan ID paket
  const findPaketById = (paketId: string) => {
    return data_paket.find((paket: { paketID: string }) => paket.paketID === paketId);
  };

  return (
    <>
        <section className='bg-white p-6 rounded-lg'>
          <SectionHead title='Pembelian' placeholder='Pembelian' addButton='hidden' />

          {/* Content */}
          <div className='grid grid-cols-3 items-center gap-5'>
            {sortedDataPembelian.map((pembelian) => (
              <Link href={'/EditPembelian'} key={pembelian.purchaseID}>
                <div className='bg-white h-[21rem] shadow-md border rounded-lg duration-200 hover:shadow-xl'>
                  <div className='flex flex-col gap-2 py-4 px-6'>
                    <div className='flexEnd mb-4'>
                      <h3 className={`py-1 px-2 font-bold w-fit rounded-md ${pembelian.statusPembayaran === 'Berhasil' ? 'text-green-600 bg-green-100' : pembelian.statusPembayaran === 'Menunggu Konfirmasi' ? 'text-yellow-600 bg-yellow-100' : 'text-red-600 bg-red-100'}`}>{pembelian.statusPembayaran}</h3>
                    </div>
                    <div className='flex flex-col font-medium text-[16px]'>
                      <p className='text-gray-50'>ID Pembelian</p>
                      <p>{pembelian.purchaseID}</p>
                    </div>
                    <div className='flex flex-col font-medium text-[16px]'>
                      <p className='text-gray-50'>ID User</p>
                      <p>{pembelian.UserID.slice(0, 22)}...</p>
                    </div>
                    <div className='flex flex-col font-medium text-[16px]'>
                      <p className='text-gray-50'>Tanggal Pembelian</p>
                      <p>{new Date(pembelian.tanggalPemesanan).toISOString().slice(0, 10)}</p>
                    </div>
                    <div className='flex flex-col font-medium text-[16px]'>
                      <p className='text-gray-50'>Paket Yang Dibeli</p>
                      <p>{findPaketById(pembelian.paketID)?.title || 'Paket tidak ditemukan'}</p>
                    </div>
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

export default page;
