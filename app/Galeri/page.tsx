"use client"
import SectionHead from '@/components/SectionHead'
import { FOLDER_GALERI } from '@/constant'
import Link from 'next/link'
import React, {useEffect, useState} from 'react'
import {useParams} from "next/navigation";
import {DataPembelian} from "@/app/Pembelian/page";

const Page = () => {
    const [search, setSearch] = useState("");
    const params = useParams()
    const [folders, setFolders] = useState<string[]>([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch("https://google-drive-storage.solo-albayt.workers.dev/galery/")
                const data = await res.json()
                setFolders(data)
            } catch {
                console.error("Error fetch galery")
            }
        }
        fetchData().then()
    }, [params.FolderGalery]);


    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
    };

    const filterGaleri = (data_galery: string[] | null) => {
        if (!data_galery) return [];
        return data_galery.filter((folder) => {
            const decodedFolder = decodeURIComponent(new URL(folder).pathname.split('/').pop().toLowerCase());
            return decodedFolder.includes(search);
        });
    };

  return (
    <>
        <section className='bg-white p-6 rounded-lg'>
            <SectionHead title='Galeri' placeholder='Cari Galeri' addButton='hidden' link=''
                         onSearchChange={handleSearch} searchValue={search}/>

            <div className='grid grid-cols-3 gap-5'>
                {filterGaleri(folders).map((folder, index) => {
                    const folderPath = decodeURIComponent(new URL(folder).pathname.split('/').pop());
                    const folderLink = `/Galeri/${folderPath}`;

                    return (
                        <Link key={index} href={folderLink}>
                            <div className='bg-white h-56 border rounded-lg shadow-md duration-500 hover:shadow-2xl'>
                                <img src={"/images/sample-hajj1.png"} alt='thumbnail-folder'
                                     className='object-cover w-full h-[70%] rounded-t-lg'/>

                                <div className='px-6 py-3'>
                                    <h1 className='text-center font-bold text-[18px]'>{folderPath}</h1>
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>

        </section>
    </>
  )
}

export default Page