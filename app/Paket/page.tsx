"use client";
import CardPaket, { cardProps } from "@/components/CardPaket";
import SectionHead from "@/components/SectionHead";
import React, { useEffect, useState, useCallback } from "react";
import { ambilSemuaPaket } from "@/db/query";

const Page = () => {
    const [paketBaru, setPaketBaru] = useState<cardProps[] | null>(null);
    const [selectedTab, setSelectedTab] = useState("paketBaru");
    const [paketLama, setPaketLama] = useState<cardProps[] | null>(null);
    const [paketLamaFetched, setPaketLamaFetched] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [search, setSearch] = useState("");

    const fetchData = useCallback(async () => {
        try {
            if (selectedTab === "paketBaru") {
                const responseBaru = await ambilSemuaPaket(">");
                setPaketBaru(responseBaru);
            } else if (selectedTab === "paketLama") {
                const responseLama = await ambilSemuaPaket("<");
                setPaketLama(responseLama);
                setPaketLamaFetched(true);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }, [selectedTab]);

    useEffect(() => {
        fetchData().then();
    }, [fetchData, refresh]);

    const handleRefresh = () => {
        setRefresh(!refresh);
    };

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
    };

    const filterPaket = (paket: cardProps[] | null) => {
        if (!paket) return [];
        return paket.filter((item) => item.title.toLowerCase().includes(search.toLowerCase()));
    };

    return (
        <>
            <section className="bg-white p-6 rounded-lg">
                <SectionHead
                    title="Paket"
                    placeholder="Cari Paket"
                    addButton="visible"
                    link="/Paket/TambahPaket"
                    searchValue={search}
                    onSearchChange={handleSearch}
                />

                {/* Tabs */}
                <div className="flex justify-center gap-5 mb-4">
                    <button
                        className={`px-4 py-2 ml-2 rounded-lg ${
                            selectedTab === "paketBaru" ? "bg-green-500 text-white" : "bg-gray-200 text-gray-700"
                        }`}
                        onClick={() => setSelectedTab("paketBaru")}
                    >
                        Paket Baru
                    </button>
                    <button
                        className={`px-4 py-2 mr-2 rounded-lg ${
                            selectedTab === "paketLama" ? "bg-green-500 text-white" : "bg-gray-200 text-gray-700"
                        }`}
                        onClick={() => setSelectedTab("paketLama")}
                    >
                        Paket Lama
                    </button>
                </div>

                {/* Content */}
                <div className="grid grid-cols-3 gap-5">
                    {selectedTab === "paketLama" &&
                        filterPaket(paketLama)?.map((paket) => <CardPaket key={paket.paketID} paket={paket}/>)}
                    {selectedTab === "paketBaru" &&
                        filterPaket(paketBaru)?.map((paket) => <CardPaket key={paket.paketID} paket={paket}/>)}
                </div>
                {/* End Of Content */}
            </section>
        </>
    );
};

export default Page;
