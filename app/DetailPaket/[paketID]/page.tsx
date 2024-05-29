'use client'
import React, {useEffect, useState} from "react";
import {useParams, useRouter} from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {cardProps, hargaProps, hotelProps, paketProps} from "@/components/CardPaket";
import {ambilPaket, ambilSemuaPaket, deletePaket, editPaket} from "@/db/query";
import {Timestamp} from "firebase/firestore";

const Page = () => {
  const params = useParams()
  const router = useRouter()
  const [paket, setPaket] = useState<paketProps>({
    durasi: 0,
    harga: [],
    harga_dp: 0,
    hotel: [],
    img: '',
    jadwal: null,
    lokasiberangkat: '',
    maskapai: '',
    paketID: '',
    remainingseat: 0,
    thumbnail: '',
    title: '',
    totalseat: 0,
  })
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ambilPaket(String(params.paketID));
        setPaket(response)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData().then()
  }, [params]);

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
    setIsEditing(prev => !prev);
    if (window.confirm("Apakah Anda yakin ingin menyimpan perubahan pada paket ini?")) {
      await editPaket(String(params.paketID), paket);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Apakah Anda yakin ingin menghapus paket ini?")) {
      await deletePaket(String(params.paketID));
      router.replace("/PaketPage");
    }
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
            {isEditing ? (
                <button
                    onClick={handleSimpan}
                    className='bg-[#f14310] px-4 py-2 rounded-lg duration-200 font-medium text-white tracking-wider hover:bg-black'
                >
                  Simpan
                </button>
            ) : (
                <button
                    onClick={() => setIsEditing(prev => !prev)}
                    className='bg-[#f14310] px-4 py-2 rounded-lg duration-200 font-medium text-white tracking-wider hover:bg-black'
                >
                  Edit
                </button>
            )}
            <button
                onClick={handleDelete}
                className='bg-red-900 px-4 py-2 rounded-lg duration-200 font-medium text-white tracking-wider hover:bg-black'
            >
              Hapus
            </button>
          </div>

          {/* Content */}
          <div className='my-8'>
            <div className='flexCenter mb-8'>
              <img src={paket?.img} alt='foto-paket' className='w-96 h-auto'/>
            </div>

            <form className='flex flex-col gap-5 my-8'>
              <div className='flex flex-col gap-1'>
                <label className='font-semibold text-[18px]'>ID Paket</label>
                <input onChange={(e) => handleChange('paketID', e.target.value)} value={paket?.paketID || ""}
                       readOnly className='text-gray-50 px-2 py-4 border rounded-lg focus:outline-none'/>
              </div>

              <div className='flex flex-col gap-1'>
                <label className='font-semibold text-[18px]'>Nama Paket</label>
                <input onChange={(e) => handleChange('title', e.target.value)} value={paket?.title || ""}
                       readOnly={!isEditing}
                       className='text-gray-50 px-2 py-4 border rounded-lg focus:outline-none'/>
              </div>

              <div className='flex flex-col gap-1'>
                <label className='font-semibold text-[18px]'>Tanggal Keberangkatan</label>
                <input
                    type="date"
                    onChange={(e) => handleChange('jadwal', e.target.value)}
                    value={paket?.jadwal ? new Date(paket.jadwal.seconds * 1000).toISOString().split('T')[0] : ''}
                    readOnly={!isEditing}
                    className='text-gray-50 px-2 py-4 border rounded-lg focus:outline-none'
                />
              </div>

              <div className='flex flex-col gap-1'>
                <label className='font-semibold text-[18px]'>Lokasi Keberangkatan</label>
                <input onChange={(e) => handleChange('lokasiberangkat', e.target.value)} value={paket?.lokasiberangkat || ""}
                       readOnly={!isEditing}
                       className='text-gray-50 px-2 py-4 border rounded-lg focus:outline-none'/>
              </div>

              <div className='flex flex-col gap-1'>
                <label className='font-semibold text-[18px]'>Poster Paket</label>
                <input onChange={(e) => handleChange('img', e.target.value)} value={paket?.img || ""}
                       readOnly={!isEditing}
                       className='text-gray-50 px-2 py-4 border rounded-lg focus:outline-none'/>
              </div>

              <div className='flex flex-col gap-1'>
                <label className='font-semibold text-[18px]'>Thumbnail Paket</label>
                <input onChange={(e) => handleChange('thumbnail', e.target.value)} value={paket?.thumbnail || ""}
                       readOnly={!isEditing}
                       className='text-gray-50 px-2 py-4 border rounded-lg focus:outline-none'/>
              </div>

              <div className='flex flex-col gap-1'>
                <label className='font-semibold text-[18px]'>Hotel</label>
                <div className='pl-8 my-2'>
                  {paket?.hotel.map((hotel, index) => (
                      <div key={index} className='flex flex-col gap-1 mb-8'>
                        <label className='font-semibold text-[18px]'>{`Hotel ${index + 1}`}</label>
                        <div className="flex flex-col gap-5 ml-5">

                          <div className="flex flex-col gap-1">
                            <label className="font-semibold text-[16px]">Bintang</label>
                            <input
                                value={hotel.bintang || ""}
                                readOnly={!isEditing}
                                onChange={(e) => handleHotelChange(index, 'bintang', e.target.value)}
                                className='text-gray-50 px-2 py-4 border rounded-lg focus:outline-none'
                            />
                          </div>

                          <div className="flex flex-col gap-1">
                            <label className="font-semibold text-[16px]">Nama</label>
                            <input
                                value={hotel.nama_hotel || ""}
                                readOnly={!isEditing}
                                onChange={(e) => handleHotelChange(index, 'nama_hotel', e.target.value)}
                                className='text-gray-50 px-2 py-4 border rounded-lg focus:outline-none'
                            />
                          </div>

                          <div className='flex flex-col gap-1'>
                            <label className='font-semibold text-[18px]'>URL Hotel</label>
                            {hotel.url_hotel.map((url, urlIndex) => (
                                <input
                                    key={urlIndex}
                                    value={url || ""}
                                    readOnly={!isEditing}
                                    onChange={(e) => handleHotelChange(index, "urlIndex", {
                                      index: urlIndex,
                                      url: e.target.value
                                    })}
                                    className='text-gray-50 px-2 py-4 border rounded-lg focus:outline-none'
                                />
                            ))}
                          </div>
                        </div>
                      </div>
                  ))}
                  {isEditing && (
                      <div
                          onClick={handleAddHotel}
                          className='bg-[#f14310] w-fit px-4 py-2 rounded-lg duration-200 font-medium text-white tracking-wider hover:bg-black hover:cursor-pointer'
                      >
                        Tambah Hotel
                      </div>
                  )}
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
                                value={harga.tipe || ""}
                                readOnly={!isEditing}
                                onChange={(e) => handleHargaChange(index, 'tipe', e.target.value)}
                                className='text-gray-50 px-2 py-4 border rounded-lg focus:outline-none'
                            />
                          </div>
                          
                          <div className="flex flex-col gap-1">
                            <label className="font-semibold text-[16px]">Mata Uang</label>
                            <select
                                value={harga.currency || ""}
                                disabled={!isEditing}
                                onChange={(e) => handleHargaChange(index, 'currency', e.target.value)}
                                className='text-gray-50 px-2 py-4 border rounded-lg focus:outline-none'
                            >
                              <option value="usd">USD</option>
                              <option value="idr">IDR</option>
                            </select>
                          </div>

                          <div className="flex flex-col gap-1">
                            <label className="font-semibold text-[16px]">Nominal</label>
                            <input
                                value={harga.nominal || ""}
                                readOnly={!isEditing}
                                type={"number"}
                                onChange={(e) => handleHargaChange(index, 'nominal', parseFloat(e.target.value))}
                                className='text-gray-50 px-2 py-4 border rounded-lg focus:outline-none'
                            />
                          </div>

                        </div>
                      </div>
                  ))}
                  {isEditing && (
                      <div
                          onClick={handleAddHarga}
                          className='bg-[#f14310] w-fit px-4 py-2 rounded-lg duration-200 font-medium text-white tracking-wider hover:bg-black hover:cursor-pointer'
                      >
                        Tambah Harga
                      </div>
                  )}
                </div>
              </div>

              <div className='flex flex-col gap-1'>
                <label className='font-semibold text-[18px]'>Harga DP</label>
                <input onChange={(e) => handleChange('harga_dp', e.target.value)} value={paket?.harga_dp || ""}
                       readOnly={!isEditing}
                       type={"number"}
                       className='text-gray-50 px-2 py-4 w-[52%] border rounded-lg focus:outline-none'/>
              </div>

              <div className='flex flex-col gap-1'>
                <label className='font-semibold text-[18px]'>Durasi Perjalanan</label>
                <input type={"number"} onChange={(e) => handleChange('durasi', e.target.value)} value={paket?.durasi || ""}
                       readOnly={!isEditing}
                       className='text-gray-50 px-2 py-4 w-[52%] border rounded-lg focus:outline-none'/>
              </div>

              <div className='flex flex-col gap-1'>
                <label className='font-semibold text-[18px]'>Maskapai Penerbangan</label>
                <input onChange={(e) => handleChange('maskapai', e.target.value)} value={paket?.maskapai || ""}
                       readOnly={!isEditing}
                       className='text-gray-50 px-2 py-4 w-[52%] border rounded-lg focus:outline-none'/>
              </div>

              <div className='flex flex-col gap-1'>
                <label className='font-semibold text-[18px]'>Total Seat</label>
                <input type={"number"} onChange={(e) => handleChange('totalseat', e.target.value)}
                       value={paket?.totalseat >= 0 ? paket?.totalseat : ""} readOnly={!isEditing}
                       className='text-gray-50 px-2 py-4 w-[52%] border rounded-lg focus:outline-none'/>
              </div>

              <div className='flex flex-col gap-1'>
                <label className='font-semibold text-[18px]'>Seat Tersedia</label>
                <input type={"number"} onChange={(e) => handleChange('remainingseat', e.target.value)}
                       value={paket?.remainingseat >= 0 ? paket?.remainingseat : ""} readOnly={!isEditing}
                       className='text-gray-50 px-2 py-4 w-[52%] border rounded-lg focus:outline-none'/>
              </div>

            </form>
          </div>
          {/* End Of Content */}

          <Link href={'/PaketPage'}>
            <div className='flexEnd mt-5'>
              <button
                  className='bg-[#f14310] px-4 py-2 rounded-lg duration-200 font-medium text-white tracking-wider hover:bg-black'>
                Kembali
              </button>
            </div>
          </Link>
        </section>
      </>
  );
};

export default Page;
