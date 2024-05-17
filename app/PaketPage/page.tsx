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

    return (
        <>
            <section className="bg-white p-6 rounded-lg">
                <SectionHead title="Paket" placeholder="Cari Paket" addButton="visible" link="/TambahPaket" />

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
                        paketLama?.map((paket) => <CardPaket key={paket.paketID} paket={paket}/>)}
                    {selectedTab === "paketBaru" &&
                        paketBaru?.map((paket) => <CardPaket key={paket.paketID} paket={paket} />)}
                </div>
                {/* End Of Content */}
            </section>
        </>
    );
};

export default Page;
