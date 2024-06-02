"use client"
import SectionHead from '@/components/SectionHead'
import React, {useEffect, useState} from 'react'

export interface TestiProps {
    img: string,
    nama: string,
    bintang: number,
    review: string
}

const Page = () => {
    const [search, setSearch] = useState("");
    const [testimoni, setTestimoni] = useState<TestiProps[]>([]);
    const [deleteMode, setDeleteMode] = useState(false);
    const [selected, setSelected] = useState<number[]>([]);

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("https://google-drive-storage.solo-albayt.workers.dev/testimoni/testimoni.json", {
                    headers: {
                        'Cache-Control': 'no-cache'
                    }
                });
                const data = await response.json() as TestiProps[];
                setTestimoni(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData().then();
    }, []);

    const filterTestimoni = (testimoni: TestiProps[] | null) => {
        if (!testimoni) return [];
        return testimoni.filter((item) =>
            item.img.toLowerCase().includes(search.toLowerCase()) ||
            item.nama.toLowerCase().includes(search.toLowerCase()) ||
            item.bintang.toString().toLowerCase().includes(search.toLowerCase()) ||
            item.review.toLowerCase().includes(search.toLowerCase())
        );
    };

    const handleSelect = (index: number) => {
        if (selected.includes(index)) {
            setSelected(selected.filter(i => i !== index));
        } else {
            setSelected([...selected, index]);
        }
    };

    const handleDelete = async() => {
        if (window.confirm("Apakah yakin untuk menghapus testimoni yang dipilih?")) {
            const updatedTestimoni = testimoni.filter((_, index) => !selected.includes(index));
            setTestimoni(updatedTestimoni);
            setSelected([]);
            setDeleteMode(false);

            try {
                const file = new Blob([JSON.stringify(updatedTestimoni)], { type: "application/json" });
                const response = await fetch("https://google-drive-storage.solo-albayt.workers.dev/testimoni/testimoni.json", {
                    method: "PUT",
                    body: file,
                    headers: {
                        "Content-Type": file.type
                    }
                });
                if (!response.ok) {
                    console.log('Failed to upload file');
                }
            } catch (error) {
                console.error('Error uploading file:', error);
            }
        }
    };

    const toggleDeleteMode = () => {
        if (deleteMode) {
            setSelected([]);
        }
        setDeleteMode(!deleteMode);
    };

    return (
        <>
            <section className='bg-white rounded-lg p-6'>
                <div className={""}>
                    <SectionHead title='Testimoni' placeholder='Cari Testimoni' addButton='visible'
                                 link='/Testimoni/TambahTestimoni' onSearchChange={handleSearch} searchValue={search}/>
                    <div className={"flex justify-center items-center gap-3"}>
                        <button onClick={toggleDeleteMode}
                                className='py-2 px-4 rounded-lg flex gap-1 items-center bg-[#ed0707] font-medium text-white tracking-wider duration-200 hover:bg-black'>
                            {deleteMode ? 'Batal' : 'Hapus'}
                        </button>
                        {deleteMode && selected.length > 0 && (
                            <button onClick={handleDelete} className='py-2 px-4 rounded-lg flex gap-1 items-center bg-[#ed0707] font-medium text-white tracking-wider duration-200 hover:bg-black'>
                                Hapus Item Terpilih
                            </button>
                        )}
                    </div>
                </div>

                <div className='grid grid-cols-3 gap-5 mt-4'>
                    {filterTestimoni(testimoni).map((testi, index) => (
                        <div key={index} className={`bg-white h-fit border rounded-lg shadow-md py-4 relative ${selected.includes(index) ? 'border-red-500' : ''}`}>
                            {deleteMode && (
                                <button
                                    onClick={() => handleSelect(index)}
                                    className={`absolute top-2 left-2 p-1 rounded ${selected.includes(index) ? 'bg-red-500 text-white' : 'bg-gray-500 text-white'}`}
                                >
                                    {selected.includes(index) ? 'Terpilih' : 'Pilih'}
                                </button>
                            )}
                            <div className='px-6 py-2'>
                                <h1 className='font-bold text-center text-[18px]'>{testi.nama}</h1>
                                <div className={"w-full flex justify-center my-4"}>
                                    <div className='flex gap-2 py-2 px-2 h-fit w-fit bg-[#89060b] rounded-full '>
                                        {Array.from({length: testi.bintang}, (_, starIndex) => (
                                            <div key={starIndex} className='w-4 h-4'>
                                                <svg clipRule="evenodd" fillRule="evenodd" strokeLinejoin="round"
                                                     strokeMiterlimit="2" viewBox="0 0 24 24"
                                                     xmlns="http://www.w3.org/2000/svg"
                                                     className='fill-white'>
                                                    <path
                                                        d="m11.322 2.923c.126-.259.39-.423.678-.423.289 0 .552.164.678.423.974 1.998 2.65 5.44 2.65 5.44s3.811.524 6.022.829c.403.055.65.396.65.747 0 .19-.072.383-.231.536-1.61 1.538-4.382 4.191-4.382 4.191s.677 3.767 1.069 5.952c.083.462-.275.882-.742.882-.122 0-.244-.029-.355-.089-1.968-1.048-5.359-2.851-5.359-2.851s-3.391 1.803-5.359 2.851c-.111.06-.234.089-.356.089-.465 0-.825-.421-.741-.882.393-2.185 1.07-5.952 1.07-5.952s-2.773-2.653-4.382-4.191c-.16-.153-.232-.346-.232-.535 0-.352.249-.694.651-.748 2.211-.305 6.021-.829 6.021-.829s1.677-3.442 2.65-5.44z"
                                                        fillRule="nonzero"/>
                                                </svg>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <p className='text-gray-500 text-justify text-[12px]'>{testi.review}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
}

export default Page;
