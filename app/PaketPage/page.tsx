"use client"
import CardPaket, {cardProps} from "@/components/CardPaket";
import SectionHead from "@/components/SectionHead";
import data_paket from "@/constant/datapaket.json"
import React, {useEffect, useState} from "react";
import {ambilSemuaPaket} from "@/db/query";

const Page = () => {
    const [paket, setPaket] = useState<cardProps[] | null>(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await ambilSemuaPaket();
                setPaket(response);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData().then()
    }, []);

  return (
    <>
      <section className="bg-white p-6 rounded-lg">
        <SectionHead title="Paket" placeholder="Cari Paket" addButton="visible" />

        {/* Content */}
        <div className="grid grid-cols-3 gap-5">
          {paket?.map((paket) => (
            <CardPaket key={paket.paketID} paket={paket} />
          ))}
        </div>
        {/* End Of Content */}

      </section>
    </>
  );
};

export default Page;
