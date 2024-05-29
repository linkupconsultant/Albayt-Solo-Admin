'use client'
import React, {useEffect, useState} from "react";
import {useParams, useRouter} from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {cardProps, hargaProps, hotelProps, paketProps} from "@/components/CardPaket";
import {addPaket, ambilPaket, ambilSemuaPaket, deletePaket, editPaket} from "@/db/query";
import {Timestamp} from "firebase/firestore";

const Page = () => {
  const params = useParams()
  const router = useRouter()
  const [paket, setPaket] = useState<paketProps>({
    durasi: 0,
    harga: [
      { tipe: "", nominal: 0, currency: "IDR" }
    ],
    harga_dp: 0,
    hotel: [
      { bintang: "", nama_hotel: "", url_hotel: ["", "", ""] }
    ],
    jadwal: null,
    img: "",
    lokasiberangkat: "",
    maskapai: "",
    paketID: "",
    remainingseat: 0,
    thumbnail: "",
    title: "",
    totalseat: 0,
  })
  const [jadwal, setJadwal] = useState<Timestamp[]>([])

  const handleChange = (key: keyof paketProps, value: any) => {
    setPaket((prevPaket) => {
      if (!prevPaket) return prevPaket;

      let newValue: any = value;
      if (['remainingseat', 'totalseat', 'durasi'].includes(key)) {
        newValue = parseInt(value);
      } else if (key === 'jadwal') {
        newValue = Timestamp.fromDate(new Date(value));
      }

      return { ...prevPaket, [key]: newValue } as paketProps;
    });
  };

  const handleHargaChange = (index: number, key: keyof hargaProps, value: any) => {
    setPaket(prevPaket => {
      if (!prevPaket) return prevPaket;
      const hargaBaru = [...prevPaket.harga];
      hargaBaru[index] = { ...hargaBaru[index], [key]: value };
      return { ...prevPaket, harga: hargaBaru };
    });
  };

  const handleHotelChange = (index: number, key: keyof hotelProps | 'urlIndex', value: any) => {
    setPaket(prevPaket => {
      if (!prevPaket) return prevPaket;
      const hotelBaru = [...prevPaket.hotel];
      if (key === 'urlIndex') {
        hotelBaru[index].url_hotel[value.index] = value.url;
      } else {
        hotelBaru[index] = { ...hotelBaru[index], [key]: value };
      }
      return { ...prevPaket, hotel: hotelBaru };
    });
  };

  const handleAddHotel = () => {
    setPaket((prevPaket) => {
      if (!prevPaket) return prevPaket;
      const newHotel: hotelProps = {
        bintang: "",
        nama_hotel: "",
        url_hotel: ["", "", ""],
      };
      return { ...prevPaket, hotel: [...prevPaket.hotel, newHotel] };
    });
  };

  const handleAddJadwal = () => {
    setJadwal((prevJadwal) => {
      const newTimestamp = Timestamp.fromDate(new Date());
      return [...prevJadwal, newTimestamp];
    });
  };

  const handleAddHarga = () => {
    setPaket((prevPaket) => {
      if (!prevPaket) return prevPaket;
      const newHarga: hargaProps = {
        tipe: "",
        nominal: 0,
        currency: "usd",
      };
      return { ...prevPaket, harga: [...prevPaket.harga, newHarga] };
    });
  };

  const handleSimpan = async () => {
    if (!paket) return;
    if (window.confirm("Apakah Anda yakin ingin menyimpan paket ini?")) {
      await addPaket(paket, jadwal);
      router.push("/PaketPage")
    }
  };

  const handleJadwalChange = (index: any, newDate: any) => {
    const newJadwal = [...jadwal];
    newJadwal[index] = Timestamp.fromDate(new Date(newDate));
    setJadwal(newJadwal);
  };

  return (
      <>
        <section className='bg-white p-6 rounded-lg'>
          <div className='flex gap-5 items-center'>
            <Link href={'/PaketPage'}>
              <svg width={36} height={36} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
                   className='bg-[#f14310] fill-white rounded-md duration-200 hover:bg-black'>
                <path
                    d="m9.474 5.209s-4.501 4.505-6.254 6.259c-.147.146-.22.338-.22.53s.073.384.22.53c1.752 1.754 6.252 6.257 6.252 6.257.145.145.336.217.527.217.191-.001.383-.074.53-.221.293-.293.294-.766.004-1.057l-4.976-4.976h14.692c.414 0 .75-.336.75-.75s-.336-.75-.75-.75h-14.692l4.978-4.979c.289-.289.287-.761-.006-1.054-.147-.147-.339-.221-.53-.221-.191-.001-.38.071-.525.215z"/>
              </svg>
            </Link>
            <h1 className='font-bold uppercase text-4xl text-[#f14310]'>{paket?.title}</h1>
          </div>

          {/* Content */}
          <div className='my-8'>
            <form className='flex flex-col gap-5 my-8'>
              <div className='flex flex-col gap-1'>
                <label className='font-semibold text-[18px]'>ID Paket</label>
                <input onChange={(e) => handleChange('paketID', e.target.value)} value={paket?.paketID || ""}
                       className='text-gray-50 px-2 py-4 border rounded-lg focus:outline-none'/>
              </div>

              <div className='flex flex-col gap-1'>
                <label className='font-semibold text-[18px]'>Nama Paket</label>
                <input onChange={(e) => handleChange('title', e.target.value)} value={paket?.title || ""}
                       className='text-gray-50 px-2 py-4 border rounded-lg focus:outline-none'/>
              </div>

              <div className='flex flex-col gap-1'>
                <label className='font-semibold text-[18px]'>Tanggal Keberangkatan</label>
                {jadwal.map((timestamp, index) => (
                    <input
                        key={index}
                        type="date"
                        onChange={(e) => handleJadwalChange(index, e.target.value)}
                        value={new Date(timestamp.seconds * 1000).toISOString().split('T')[0]}
                        className='text-gray-50 px-2 py-4 border rounded-lg focus:outline-none'
                    />
                ))}
                <div
                    onClick={handleAddJadwal}
                    className='bg-[#f14310] w-fit px-4 py-2 rounded-lg duration-200 font-medium text-white tracking-wider hover:bg-black hover:cursor-pointer'
                >
                  Tambah Jadwal
                </div>
              </div>

              <div className='flex flex-col gap-1'>
                <label className='font-semibold text-[18px]'>Lokasi Keberangkatan</label>
                <input onChange={(e) => handleChange('lokasiberangkat', e.target.value)}
                       value={paket?.lokasiberangkat || ""}
                       className='text-gray-50 px-2 py-4 border rounded-lg focus:outline-none'/>
              </div>

              <div className='flex flex-col gap-1'>
                <label className='font-semibold text-[18px]'>Poster Paket</label>
                <input onChange={(e) => handleChange('img', e.target.value)} value={paket?.img || ""}
                       className='text-gray-50 px-2 py-4 border rounded-lg focus:outline-none'/>
                <div className='flexCenter mx-8'>
                  {paket.img.length > 0 && (
                      <img src={paket?.img} alt='foto-paket' className='w-96 h-auto'/>
                  )}
                </div>
              </div>

              <div className='flex flex-col gap-1'>
                <label className='font-semibold text-[18px]'>Thumbnail Paket</label>
                <input onChange={(e) => handleChange('thumbnail', e.target.value)} value={paket?.thumbnail || ""}
                       className='text-gray-50 px-2 py-4 border rounded-lg focus:outline-none'/>
                <div className='flexCenter mx-8'>
                  {paket.thumbnail.length > 0 && (
                      <img src={paket?.thumbnail} alt='foto-paket' className='w-96 h-auto'/>
                  )}
                </div>
              </div>

              <div className='flex flex-col gap-1'>
                <label className='font-semibold text-[18px]'>Hotel</label>
                <div className='pl-8 my-2'>
                  {paket?.hotel.map((hotel, index) => (
                      <div key={index} className='flex flex-col gap-1 mb-8'>
                        <label className='font-semibold text-[18px]'>{`Hotel ${index + 1}`}</label>
                        <input
                            value={hotel.bintang || ""}
                            onChange={(e) => handleHotelChange(index, 'bintang', e.target.value)}
                            className='text-gray-50 px-2 py-4 border rounded-lg focus:outline-none'
                        />
                        <input
                            value={hotel.nama_hotel || ""}
                            onChange={(e) => handleHotelChange(index, 'nama_hotel', e.target.value)}
                            className='text-gray-50 px-2 py-4 border rounded-lg focus:outline-none'
                        />
                        <div className='flex flex-col gap-1 mt-4'>
                          <label className='font-semibold text-[18px]'>URL Hotel</label>
                          {hotel.url_hotel.map((url, urlIndex) => (
                              <input
                                  key={urlIndex}
                                  value={url || ""}
                                  onChange={(e) => handleHotelChange(index, "urlIndex", {
                                    index: urlIndex,
                                    url: e.target.value
                                  })}
                                  className='text-gray-50 px-2 py-4 border rounded-lg focus:outline-none'
                              />
                          ))}
                        </div>
                      </div>
                  ))}
                  <div
                      onClick={handleAddHotel}
                      className='bg-[#f14310] w-fit px-4 py-2 rounded-lg duration-200 font-medium text-white tracking-wider hover:bg-black hover:cursor-pointer'
                  >
                    Tambah Hotel
                  </div>
                </div>
              </div>

              <div className='flex flex-col gap-1'>
                <label className='font-semibold text-[18px]'>Harga</label>
                <div className='pl-8 my-2'>
                  {paket?.harga.map((harga, index) => (
                      <div key={index} className='flex flex-col gap-1 mb-8'>
                        <label className='font-semibold text-[18px]'>{`Harga ${index + 1}`}</label>
                        <input
                            value={harga.tipe || ""}
                            onChange={(e) => handleHargaChange(index, 'tipe', e.target.value)}
                            className='text-gray-50 px-2 py-4 border rounded-lg focus:outline-none'
                        />
                        <input
                            value={harga.nominal || ""}
                            onChange={(e) => handleHargaChange(index, 'nominal', parseFloat(e.target.value))}
                            className='text-gray-50 px-2 py-4 border rounded-lg focus:outline-none'
                        />
                        <select
                            value={harga.currency || ""}
                            onChange={(e) => handleHargaChange(index, 'currency', e.target.value)}
                            className='text-gray-50 px-2 py-4 border rounded-lg focus:outline-none'
                        >
                          <option value="usd">USD</option>
                          <option value="idr">IDR</option>
                        </select>
                      </div>
                  ))}
                  <div
                      onClick={handleAddHarga}
                      className='bg-[#f14310] w-fit px-4 py-2 rounded-lg duration-200 font-medium text-white tracking-wider hover:bg-black hover:cursor-pointer'
                  >
                    Tambah Harga
                  </div>
                </div>
              </div>

              <div className='flex flex-col gap-1'>
                <label className='font-semibold text-[18px]'>Harga DP</label>
                <input onChange={(e) => handleChange('harga_dp', e.target.value)} value={paket?.harga_dp || ""}
                       className='text-gray-50 px-2 py-4 w-[52%] border rounded-lg focus:outline-none'/>
              </div>

              <div className='flex flex-col gap-1'>
                <label className='font-semibold text-[18px]'>Durasi Perjalanan</label>
                <input type={"number"} onChange={(e) => handleChange('durasi', e.target.value)}
                       value={paket?.durasi || ""}
                       className='text-gray-50 px-2 py-4 w-[52%] border rounded-lg focus:outline-none'/>
              </div>

              <div className='flex flex-col gap-1'>
                <label className='font-semibold text-[18px]'>Maskapai Penerbangan</label>
                <input onChange={(e) => handleChange('maskapai', e.target.value)} value={paket?.maskapai || ""}
                       className='text-gray-50 px-2 py-4 w-[52%] border rounded-lg focus:outline-none'/>
              </div>

              <div className='flex flex-col gap-1'>
                <label className='font-semibold text-[18px]'>Total Seat</label>
                <input type={"number"} onChange={(e) => handleChange('totalseat', e.target.value)}
                       value={paket?.totalseat || ""}
                       className='text-gray-50 px-2 py-4 w-[52%] border rounded-lg focus:outline-none'/>
              </div>

              <div className='flex flex-col gap-1'>
                <label className='font-semibold text-[18px]'>Seat Tersedia</label>
                <input type={"number"} onChange={(e) => handleChange('remainingseat', e.target.value)}
                       value={paket?.remainingseat || ""}
                       className='text-gray-50 px-2 py-4 w-[52%] border rounded-lg focus:outline-none'/>
              </div>

            </form>
          </div>
          {/* End Of Content */}

          <div className='flexEnd mt-5'>
            <button
                onClick={handleSimpan}
                className='bg-[#f14310] px-4 py-2 rounded-lg duration-200 font-medium text-white tracking-wider hover:bg-black'>
              Simpan
            </button>
          </div>
        </section>
      </>
  );
};

export default Page;
