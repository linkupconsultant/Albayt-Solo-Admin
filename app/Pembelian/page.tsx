"use client"
import SectionHead from '@/components/SectionHead'
import React, {useEffect, useState} from 'react'
import data_paket from '@/constant/datapaket.json'
import Link from 'next/link'
import {cardProps} from "@/components/CardPaket";
import {ambilSemuaPemesanan} from "@/db/query";

export interface DewasaData {
  nama: string;
  telp: string;
}
export interface AnakData {
  nama: string;
  tanggalLahir: string;
}

export interface DataPembelian {
  UserID: string;
  purchaseID: string;
  paketID: string;
  UID?: string;
  email?: string;
  detailJamaah: {
    dewasa: DewasaData[];
    anak: AnakData[];
  };
  metodePembayaran: string;
  totalPembayaran: number;
  tanggalPemesanan: string;
  urlBuktiPembayaran: string;
  statusPembayaran: string;
}

const Page = () => {
  const [data_pembelian, setData_pembelian] = useState<DataPembelian[] | null>(null);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ambilSemuaPemesanan();
        setData_pembelian(response);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData().then();
  }, [currentPage]);

  const findPaketById = (paketId: string) => {
    return data_paket.find((paket: { paketID: string }) => paket.paketID === paketId);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
      <>
        <section className='bg-white p-6 rounded-lg'>
          <SectionHead title='Pembelian' placeholder='Pembelian' addButton='hidden' link='' />

          {/* Content */}
          <div className='grid grid-cols-3 items-center gap-5'>
            {data_pembelian?.map((pembelian) => (
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
                        <p>{new Date(pembelian?.tanggalPemesanan).toISOString().slice(0, 10)}</p>
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

          {/* Pagination */}
          <div className='flex justify-center mt-4'>
            <button
                className='px-4 py-2 mr-2 rounded-lg bg-gray-200 text-gray-700'
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 0}
            >
              Previous
            </button>
            <button
                className='px-4 py-2 ml-2 rounded-lg bg-gray-200 text-gray-700'
                onClick={() => handlePageChange(currentPage + 1)}
            >
              Next
            </button>
          </div>
        </section>
      </>
  );
};

export default Page;