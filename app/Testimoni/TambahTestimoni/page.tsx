'use client'
import React, {useEffect, useRef, useState} from "react";
import Link from "next/link";
import {TestiProps} from "@/app/Testimoni/page";
import {useRouter} from "next/navigation";

const Page = () => {
  const router = useRouter()
  const [testimoni, setTestimoni] = useState<TestiProps>({
    img: "",
    nama: "",
    review: "",
    bintang: 5
  })

  const handleChange = (key: keyof TestiProps, value: any) => {
    setTestimoni((prevTesti) => {
      if (key === "bintang") {
        value = parseInt(value)
      }
      return {...prevTesti, [key]: value} as TestiProps;
    });
  };

  const handleSimpan = async () => {
    if (window.confirm("Apakah Anda yakin ingin menambahkan testimoni ini?")) {
      try {
        const url = `https://google-drive-storage.solo-albayt.workers.dev/testimoni/testimoni.json`

        const res = await fetch(url)
        const allData = await res.json() as TestiProps[]
        const arr = [testimoni, ...allData];

        const file = new Blob([JSON.stringify(arr)], { type: "application/json" });
        const response = await fetch(url, {
          method: "PUT",
          body: file,
          headers: {
            "Content-Type": file.type
          }
        });
        if (!response.ok) {
          console.log('Failed to upload file');
        }
        router.push("/Testimoni")
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    }
  };

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [testimoni.review]);

  return (
      <>
        <section className='bg-white p-6 rounded-lg'>
          <div className='flex gap-5 items-center'>
            <Link href={'/Testimoni'}>
              <svg width={36} height={36} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
                   className='bg-[#f14310] fill-white rounded-md duration-200 hover:bg-black'>
                <path
                    d="m9.474 5.209s-4.501 4.505-6.254 6.259c-.147.146-.22.338-.22.53s.073.384.22.53c1.752 1.754 6.252 6.257 6.252 6.257.145.145.336.217.527.217.191-.001.383-.074.53-.221.293-.293.294-.766.004-1.057l-4.976-4.976h14.692c.414 0 .75-.336.75-.75s-.336-.75-.75-.75h-14.692l4.978-4.979c.289-.289.287-.761-.006-1.054-.147-.147-.339-.221-.53-.221-.191-.001-.38.071-.525.215z"/>
              </svg>
            </Link>
            <h1 className='font-bold uppercase text-4xl text-[#f14310]'>Tambah Testimoni</h1>
          </div>

          {/* Content */}
          <div className='my-8'>
            <div className='flex flex-col gap-5 my-8'>
              <div className='flex flex-col gap-1'>
                <label className='font-semibold text-[18px]'>Nama Pelanggan</label>
                <input placeholder="Nama Pelanggan" onChange={(e) => handleChange('nama', e.target.value)}
                       value={testimoni.nama}
                       className='text-gray-50 px-2 py-4 border rounded-lg focus:outline-none'/>
              </div>

              <div className='flex flex-col gap-1'>
                <label className='font-semibold text-[18px]'>Bintang</label>
                <input onChange={(e) => handleChange('bintang', e.target.value)}
                       value={testimoni.bintang}
                       type={"number"}
                       min={1}
                       max={5}
                       placeholder="Bintang"
                       className='text-gray-50 px-2 py-4 border rounded-lg focus:outline-none'/>
              </div>

              <div className='flex flex-col gap-1'>
                <label className='font-semibold text-[18px]'>Review</label>
                <textarea
                    ref={textareaRef}
                    placeholder="Review"
                    onChange={(e) => handleChange('review', e.target.value)}
                    value={testimoni.review}
                    className="text-gray-50 border overflow-hidden px-2 py-4 rounded-lg focus:outline-none resize-none"
                />
              </div>

              {/* End Of Content */}
              <div className='flexEnd mt-5'>
                <button
                    onClick={handleSimpan}
                    className='bg-[#f14310] px-4 py-2 rounded-lg duration-200 font-medium text-white tracking-wider hover:bg-black'>
                  Simpan
                </button>
              </div>
            </div>
          </div>
        </section>
      </>
  )
}


export default Page;
