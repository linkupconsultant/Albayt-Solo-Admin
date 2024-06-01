'use client'
import React, {useEffect, useState} from "react";
import {useParams, useRouter} from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {cardProps, hargaProps, hotelProps, paketProps} from "@/components/CardPaket";
import {addPaket, ambilPaket, ambilSemuaPaket, deletePaket, editPaket} from "@/db/query";
import {Timestamp} from "firebase/firestore";
import TextEditor from "@/components/TextEditor";
import {Editor} from "react-draft-wysiwyg";

const Page = () => {
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
    thumbnail: `https://google-drive-storage.solo-albayt.workers.dev/paket_data/default.jpg`,
    title: "",
    totalseat: 0,
  })
  const [jadwal, setJadwal] = useState<Timestamp[]>([])

  const handleChange = (key: keyof paketProps, value: any) => {
    setPaket((prevPaket) => {
      let newValue: any = value;
      if (['remainingseat', 'totalseat', 'durasi'].includes(key)) {
        newValue = parseInt(value);
      } else if (key === 'jadwal') {
        newValue = Timestamp.fromDate(new Date(value));
      }
      // else if (key === 'paketID'){
      //     changeImgURL(value)
      // }
      return { ...prevPaket, [key]: newValue } as paketProps;
    });
  };

  // const changeImgURL = (value: string) => {
  //   setPaket(prevState => {
  //     return {...prevState,
  //       img: `https://google-drive-storage.solo-albayt.workers.dev/paket_data/${value}/poster.png`,
  //       thumbnail: `https://google-drive-storage.solo-albayt.workers.dev/paket_data/${value}/thumbnail.png`,
  //     }
  //   })
  // }

  const handleHargaChange = (index: number, key: keyof hargaProps, value: any) => {
    setPaket(prevPaket => {
      const hargaBaru = [...prevPaket.harga];
      hargaBaru[index] = { ...hargaBaru[index], [key]: value };
      return { ...prevPaket, harga: hargaBaru };
    });
  };

  const handleHotelChange = (index: number, key: keyof hotelProps | 'urlIndex', value: any) => {
    setPaket(prevPaket => {
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
      const newHarga: hargaProps = {
        tipe: "",
        nominal: 0,
        currency: "usd",
      };
      return { ...prevPaket, harga: [...prevPaket.harga, newHarga] };
    });
  };

  const handleSimpan = async () => {
    if (window.confirm("Apakah Anda yakin ingin menyimpan paket ini?")) {
      if (await addPaket(paket, jadwal)){
        router.push("/Paket")
      }
    }
  };

  const handleJadwalChange = (index: any, newDate: any) => {
    const newJadwal = [...jadwal];
    newJadwal[index] = Timestamp.fromDate(new Date(newDate));
    setJadwal(newJadwal);
  };

  return (
      <>
        {/*{JSON.stringify(paket)}*/}
        <section className='bg-white p-6 rounded-lg'>
          <div className='flex gap-5 items-center'>
            <Link href={'/Paket'}>
              <svg width={36} height={36} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
                   className='bg-[#f14310] fill-white rounded-md duration-200 hover:bg-black'>
                <path
                    d="m9.474 5.209s-4.501 4.505-6.254 6.259c-.147.146-.22.338-.22.53s.073.384.22.53c1.752 1.754 6.252 6.257 6.252 6.257.145.145.336.217.527.217.191-.001.383-.074.53-.221.293-.293.294-.766.004-1.057l-4.976-4.976h14.692c.414 0 .75-.336.75-.75s-.336-.75-.75-.75h-14.692l4.978-4.979c.289-.289.287-.761-.006-1.054-.147-.147-.339-.221-.53-.221-.191-.001-.38.071-.525.215z"/>
              </svg>
            </Link>
            <h1 className='font-bold uppercase text-4xl text-[#f14310]'>Tambah Paket</h1>
          </div>

          {/* Content */}
          <div className='my-8'>
            <form className='flex flex-col gap-5 my-8'>
              <div className='flex flex-col gap-1'>
                <label className='font-semibold text-[18px]'>ID Paket</label>
                <input placeholder="ID Paket" onChange={(e) => handleChange('paketID', e.target.value)} value={paket?.paketID || ""}
                       className='text-gray-50 px-2 py-4 border rounded-lg focus:outline-none'/>
              </div>

              <div className='flex flex-col gap-1'>
                <label className='font-semibold text-[18px]'>Nama Paket</label>
                <input placeholder="Nama Paket" onChange={(e) => handleChange('title', e.target.value)} value={paket?.title || ""}
                       className='text-gray-50 px-2 py-4 border rounded-lg focus:outline-none'/>
              </div>

              <div>
                <label className='font-semibold text-[18px]'>Tanggal Keberangkatan</label>
                <div className='flex flex-col mt-4'>
                  {jadwal.map((timestamp, index) => (
                      <input
                          key={index}
                          type="date"
                          onChange={(e) => handleJadwalChange(index, e.target.value)}
                          value={new Date(timestamp.seconds * 1000).toISOString().split('T')[0]}
                          className='block mb-4 text-gray-50 px-2 py-4 border rounded-lg focus:outline-none'
                      />
                  ))}
                </div>
                <div
                    onClick={handleAddJadwal}
                    className='flex gap-2 items-center bg-[#f14310] mt-2 w-fit px-4 py-2 rounded-lg duration-200 font-medium text-white fill-white tracking-wider hover:bg-black hover:cursor-pointer'
                >
                  <svg viewBox="0 0 24 24" height={24} width={24} xmlns="http://www.w3.org/2000/svg"><path d="m11 11h-7.25c-.414 0-.75.336-.75.75s.336.75.75.75h7.25v7.25c0 .414.336.75.75.75s.75-.336.75-.75v-7.25h7.25c.414 0 .75-.336.75-.75s-.336-.75-.75-.75h-7.25v-7.25c0-.414-.336-.75-.75-.75s-.75.336-.75.75z"/></svg>
                  <p>Tambah Jadwal</p>
                </div>
              </div>

              <div className='flex flex-col gap-1'>
                <label className='font-semibold text-[18px]'>Lokasi Keberangkatan</label>
                <input onChange={(e) => handleChange('lokasiberangkat', e.target.value)}
                       value={paket?.lokasiberangkat || ""}
                       placeholder="Lokasi Keberangkatan"
                       className='text-gray-50 px-2 py-4 border rounded-lg focus:outline-none'/>
              </div>

              <div className='flex flex-col gap-1'>
                <label className='font-semibold text-[18px]'>Poster Paket</label>
                <input placeholder="Link Google Drive Poster Paket" onChange={(e) => handleChange('img', e.target.value)} value={paket?.img || ""}
                       className='text-gray-50 px-2 py-4 border rounded-lg focus:outline-none'/>
                <div className='flexCenter mx-8'>
                  {paket.img && (
                      <img
                          src={paket?.img}
                          alt='foto-paket'
                          className='w-96 h-auto'
                          onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                            const target = e.target as HTMLImageElement;
                            target.src = "https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg";
                          }}
                      />
                  )}
                </div>
              </div>

              <div className='flex flex-col gap-1'>
                <label className='font-semibold text-[18px]'>Thumbnail Paket</label>
                <input placeholder="Link Google Drive Thumbnail Paket" onChange={(e) => handleChange('thumbnail', e.target.value)} value={paket?.thumbnail || ""}
                       className='text-gray-50 px-2 py-4 border rounded-lg focus:outline-none'/>
                <div className='flexCenter mx-8'>
                  {paket.thumbnail && (
                      <img
                          src={paket?.thumbnail}
                          alt='foto-paket'
                          className='w-96 h-auto'
                          onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                            const target = e.target as HTMLImageElement;
                            target.src = "https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg";
                          }}
                      />
                  )}
                </div>
              </div>

              <div className='flex flex-col gap-1'>
                <label className='font-semibold text-[18px]'>Hotel</label>
                <div className='pl-8 my-2'>
                  {paket?.hotel.map((hotel, index) => (
                      <div key={index} className='flex flex-col gap-1 mb-8'>
                        <label className='font-semibold text-[18px]'>{`Hotel ${index + 1}`}</label>
                        <div className="ml-5 flex flex-col gap-5">

                          {/* Form Input Bintang Hotel */}
                          <div className="flex flex-col gap-1">
                            <label className="font-semibold text-[16px]">Bintang</label>
                            <input
                                placeholder="Bintang Hotel"
                                value={hotel.bintang || ""}
                                onChange={(e) => handleHotelChange(index, 'bintang', e.target.value)}
                                className='text-gray-50 px-2 py-4 border rounded-lg focus:outline-none'
                            />
                          </div>
                          {/* End Of Form Input Bintang Hotel */}

                          {/* Form Input Nama Hotel */}
                          <div className="flex flex-col gap-1">
                            <label className="font-semibold text-[16px]">Nama</label>
                            <input
                                placeholder="Nama Hotel"
                                value={hotel.nama_hotel || ""}
                                onChange={(e) => handleHotelChange(index, 'nama_hotel', e.target.value)}
                                className='text-gray-50 px-2 py-4 border rounded-lg focus:outline-none'
                            />
                          </div>
                          {/* End Of Form Input Nama Hotel */}

                          {/* Form Input Url Hotel */}
                          <div className='flex flex-col gap-1'>
                            <label className='font-semibold text-[16px]'>URL Hotel</label>
                            {hotel.url_hotel.map((url, urlIndex) => (
                                <input
                                    placeholder="contoh: https://www.example.com"
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
                          {/* End Of Form Input Url Hotel */}

                        </div>
                      </div>
                  ))}
                  <div
                      onClick={handleAddHotel}
                      className='flex gap-2 items-center bg-[#f14310] w-fit px-4 py-2 rounded-lg duration-200 font-medium text-[16px] text-white fill-white tracking-wider hover:bg-black hover:cursor-pointer'
                  >
                    <svg viewBox="0 0 24 24" height={24} width={24} xmlns="http://www.w3.org/2000/svg"><path d="m11 11h-7.25c-.414 0-.75.336-.75.75s.336.75.75.75h7.25v7.25c0 .414.336.75.75.75s.75-.336.75-.75v-7.25h7.25c.414 0 .75-.336.75-.75s-.336-.75-.75-.75h-7.25v-7.25c0-.414-.336-.75-.75-.75s-.75.336-.75.75z"/></svg>
                    <p>Tambah Hotel</p>
                  </div>
                </div>
              </div>

              <div className='flex flex-col gap-1'>
                <label className='font-semibold text-[18px]'>Harga</label>
                <div className='pl-8 my-2'>
                  {paket?.harga.map((harga, index) => (
                      <div key={index} className='flex flex-col gap-1 mb-8'>
                        <label className='font-semibold text-[18px]'>{`Harga ${index + 1}`}</label>
                        <div className="flex flex-col gap-5 ml-5">

                          <div className="flex flex-col gap-1">
                            <label className="font-semibold text-[16px]">Tipe</label>
                            <input
                                placeholder="Tipe Paket"
                                value={harga.tipe || ""}
                                onChange={(e) => handleHargaChange(index, 'tipe', e.target.value)}
                                className='text-gray-50 px-2 py-4 border rounded-lg focus:outline-none'
                            />
                          </div>

                          <div className="flex flex-col gap-1">
                            <label className="font-semibold text-[16px]">Nominal</label>
                            <input
                                placeholder="Nominal Paket (contoh: 28000000)"
                                value={harga.nominal || ""}
                                onChange={(e) => handleHargaChange(index, 'nominal', parseFloat(e.target.value))}
                                className='text-gray-50 px-2 py-4 border rounded-lg focus:outline-none'
                            />
                          </div>

                          <div className="flex flex-col gap-1">
                            <label className="font-semibold text-[16px]">Mata Uang</label>
                            <select
                                value={harga.currency || ""}
                                onChange={(e) => handleHargaChange(index, 'currency', e.target.value)}
                                className='text-gray-50 px-2 py-4 border rounded-lg focus:outline-none'
                            >
                              <option value="usd">USD</option>
                              <option value="idr">IDR</option>
                            </select>
                          </div>
                        </div>
                      </div>
                  ))}
                  <div
                      onClick={handleAddHarga}
                      className='flex gap-2 items-center bg-[#f14310] w-fit px-4 py-2 rounded-lg duration-200 font-medium text-white fill-white tracking-wider hover:bg-black hover:cursor-pointer'
                  >
                    <svg viewBox="0 0 24 24" height={24} width={24} xmlns="http://www.w3.org/2000/svg"><path d="m11 11h-7.25c-.414 0-.75.336-.75.75s.336.75.75.75h7.25v7.25c0 .414.336.75.75.75s.75-.336.75-.75v-7.25h7.25c.414 0 .75-.336.75-.75s-.336-.75-.75-.75h-7.25v-7.25c0-.414-.336-.75-.75-.75s-.75.336-.75.75z"/></svg>
                    <p>Tambah Harga</p>
                  </div>
                </div>
              </div>

              <div className='flex flex-col gap-1'>
                <label className='font-semibold text-[18px]'>Harga DP</label>
                <input placeholder="contoh: 500000" onChange={(e) => handleChange('harga_dp', e.target.value)} value={paket?.harga_dp || ""}
                       className='text-gray-50 px-2 py-4 w-[52%] border rounded-lg focus:outline-none'/>
              </div>

              <div className='flex flex-col gap-1'>
                <label className='font-semibold text-[18px]'>Durasi Perjalanan</label>
                <input placeholder="Durasi Perjalanan Dalam Hari" type={"number"} onChange={(e) => handleChange('durasi', e.target.value)}
                       value={paket?.durasi || ""}
                       className='text-gray-50 px-2 py-4 w-[52%] border rounded-lg focus:outline-none'/>
              </div>

              <div className='flex flex-col gap-1'>
                <label className='font-semibold text-[18px]'>Maskapai Penerbangan</label>
                <input placeholder="Maskapai Penerbangan" onChange={(e) => handleChange('maskapai', e.target.value)} value={paket?.maskapai || ""}
                       className='text-gray-50 px-2 py-4 w-[52%] border rounded-lg focus:outline-none'/>
              </div>

              <div className='flex flex-col gap-1'>
                <label className='font-semibold text-[18px]'>Total Seat</label>
                <input placeholder="Jumlah Total Seat" type={"number"} onChange={(e) => handleChange('totalseat', e.target.value)}
                       value={paket?.totalseat || ""}
                       className='text-gray-50 px-2 py-4 w-[52%] border rounded-lg focus:outline-none'/>
              </div>

              <div className='flex flex-col gap-1'>
                <label className='font-semibold text-[18px]'>Seat Tersedia</label>
                <input placeholder="Seat Yang Tersedia" type={"number"} onChange={(e) => handleChange('remainingseat', e.target.value)}
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

          {/*<div className={"w-full"}>*/}
          {/*  <TextEditor />*/}
          {/*</div>*/}

        </section>
      </>
  );
};

export default Page;
