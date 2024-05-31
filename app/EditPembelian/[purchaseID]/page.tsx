"use client";
import Link from 'next/link'
import React, {useEffect, useState} from 'react'
import {ambilPaket, ambilPemesanan, editPemesanan} from "@/db/query";
import {useParams} from "next/navigation";
import {DataPembelian} from "@/app/Pembelian/page";
import {hotelProps, paketProps} from "@/components/CardPaket";

const Page = () => {
  const params = useParams()
  const [pembelian, setPembelian] = useState<DataPembelian>()
  const [paket, setPaket] = useState<paketProps>()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [response, response2] = await ambilPemesanan(String(params.purchaseID));
        setPembelian(response as DataPembelian)
        setPaket(response2 as paketProps)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData().then()
  }, [params]);

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPembelian((prevPembelian) => {
      if (!prevPembelian) return prevPembelian;
      return { ...prevPembelian, statusPembayaran: e.target.value };
    });
  };

  const handleSubmit = async() => {
    if (!pembelian) return
    await editPemesanan(pembelian?.purchaseID, pembelian)
    alert("Update Status Pembayaran Berhasil Dilakukan")
  }

  return (
    <>
      <section className='bg-white p-6 rounded-lg'>
        <Link href={'/Pembelian'}>
          <div className='flexStart mb-8'>
            <button
                className='bg-[#f14310] px-4 py-2 rounded-lg duration-200 font-medium text-white tracking-wider flex items-center gap-2 hover:bg-black'>
              <span>&#8592;</span> {/* Tambahkan karakter panah ke kiri di sini */}
              Kembali
            </button>
          </div>
        </Link>

        <form className='flex flex-col gap-6'>

          <div className='flex flex-col gap-2'>
            <h3 className='font-bold text-[18px]'>ID Pembelian</h3>
            <input defaultValue={pembelian?.purchaseID || ""} readOnly
                   className='text-gray-50 px-2 py-4 border rounded-lg focus:outline-none'/>
          </div>

          <div className='flex flex-col gap-2'>
            <h3 className='font-bold text-[18px]'>User ID</h3>
            <input defaultValue={pembelian?.UserID || ""} readOnly
                   className='text-gray-50 px-2 py-4 border rounded-lg focus:outline-none'/>
          </div>

          <div className='flex flex-col gap-2'>
            <h3 className='font-bold text-[18px]'>Email</h3>
            <input defaultValue={pembelian?.email || ""} readOnly
                   className='text-gray-50 px-2 py-4 border rounded-lg focus:outline-none'/>
          </div>

          <div className='flex flex-col gap-2'>
            <h3 className='font-bold text-[18px]'>Tanggal Pemesanan</h3>
            <input
                defaultValue={pembelian?.tanggalPemesanan?.seconds
                    ? new Date(pembelian.tanggalPemesanan.seconds * 1000).toLocaleString('id-ID', {
                      day: '2-digit',
                      month: 'long',
                      year: 'numeric',
                      hour: 'numeric',
                      minute: 'numeric',
                      hour12: false
                    })
                    : ''}
                readOnly className='text-gray-50 px-2 py-4 border rounded-lg focus:outline-none'/>
          </div>

          <div className='flex flex-col gap-2'>
            <h3 className='font-bold text-[18px]'>Paket Dibeli</h3>
            <input defaultValue={paket?.title || ""} readOnly
                   className='text-gray-50 px-2 py-4 border rounded-lg focus:outline-none'/>
          </div>

          <div className='flex flex-col gap-3'>
            <h3 className='font-bold text-[18px]'>Detail Jamaah</h3>
            <div className='flex flex-col gap-1'>
              <h3 className='font-semibold text-[18px]'>Jamaah Dewasa</h3>
              <table className="border-collapse border border-gray-300 rounded-lg w-full">
                <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-300 p-2">Nama</th>
                  <th className="border border-gray-300 p-2">No Telp</th>
                </tr>
                </thead>
                <tbody>
                {pembelian?.detailJamaah.dewasa.map((value, index) => (
                    <tr key={index} className="border border-gray-300">
                      <td className="border border-gray-300 p-2">{value.nama}</td>
                      <td className="border border-gray-300 p-2">{value.telp}</td>
                    </tr>
                ))}
                </tbody>
              </table>
            </div>

            {pembelian?.detailJamaah.anak && pembelian.detailJamaah.anak.length > 0 && (
                <div className='flex flex-col gap-1'>
                  <h3 className='font-semibold text-[18px]'>Jamaah Anak-anak</h3>
                  <table className="border-collapse border border-gray-300 rounded-lg w-full">
                    <thead>
                    <tr className="bg-gray-200">
                      <th className="border border-gray-300 p-2">Nama</th>
                      <th className="border border-gray-300 p-2">Tanggal Lahir</th>
                    </tr>
                    </thead>
                    <tbody>
                    {pembelian?.detailJamaah.anak.map((value, index) => (
                        <tr key={index} className="border border-gray-300">
                          <td className="border border-gray-300 p-2">{value.nama}</td>
                          <td className="border border-gray-300 p-2">{value.tanggalLahir}</td>
                        </tr>
                    ))}
                    </tbody>
                  </table>
                </div>
            )}
          </div>

          <div className='flex flex-col gap-2'>
            <h3 className='font-bold text-[18px]'>Metode Pembayaran</h3>
            <input defaultValue={pembelian?.metodePembayaran || ""} readOnly
                   className='text-gray-50 px-2 py-4 border rounded-lg focus:outline-none'/>
          </div>

          <div className='flex flex-col gap-2'>
            <h3 className='font-bold text-[18px]'>Total Pembayaran</h3>
            <input
                defaultValue={pembelian?.totalPembayaran.toLocaleString('id-ID', {
                  style: 'currency',
                  currency: 'IDR'
                }) || ""}
                readOnly
                className='text-gray-50 px-2 py-4 border rounded-lg focus:outline-none'/>
          </div>

          <div className='flex flex-col gap-2'>
            <h3 className='font-bold text-[18px]'>Bukti Pembayaran</h3>
            <div className='flexCenter'>
              <img src={pembelian?.urlBuktiPembayaran || "https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg"} className='h-auto w-1/2'></img>
            </div>
          </div>

          <div className='flex flex-col justify-center items-center gap-2'>
            <h3 className='font-bold text-[24px] text-red-500'>Status Pembayaran</h3>
            <select
                className='text-gray-600 w-1/2 px-2 py-4 border border-red-500 rounded-lg focus:outline-none font-semibold'
                value={pembelian?.statusPembayaran || ""}
                onChange={handleStatusChange}
            >
              <option value='Berhasil'>Berhasil</option>
              <option value='Berkas Ditolak'>Berkas Ditolak</option>
              <option value='Menunggu Konfirmasi'>Menunggu Konfirmasi</option>
              <option value='Belum Dibayar'>Belum Dibayar</option>
            </select>
          </div>

        </form>

        <div className='flexEnd mt-8'>
        <button
              className='bg-[#f14310] px-4 py-2 flex gap-2 items-center rounded-lg duration-200 font-medium text-white tracking-wider hover:bg-black'
              onClick={handleSubmit}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" className='fill-white'>
              <path d="M14 3h2.997v5h-2.997v-5zm9 1v20h-22v-24h17.997l4.003 4zm-17 5h12v-7h-12v7zm14 4h-16v9h16v-9z"/>
            </svg>
            <p>Simpan Perubahan</p>
          </button>
        </div>
      </section>
    </>
  )
}

export default Page