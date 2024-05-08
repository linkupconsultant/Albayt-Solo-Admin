import CardPaket from "@/components/CardPaket";
import SectionHead from "@/components/SectionHead";
import { PACKAGE_DATA } from "@/constant";
import data_paket from "@/constant/datapaket.json"
import React from "react";

const page = () => {
  return (
    <>
      <section className="bg-white p-6 rounded-lg">
        <SectionHead title="Paket" placeholder="Cari Paket" />

        {/* Content */}
        <div className="grid grid-cols-3 gap-5">
          {data_paket.map((paket) => (
            <CardPaket key={paket.paketID} paketID={paket.paketID} img={paket.img} title={paket.title} durasi={paket.durasi} harga={paket.harga} harga_dp={paket.harga_dp} hotel={paket.hotel} jadwal={paket.jadwal} lokasikeberangkatan={paket.lokasiberangkat} maskapai={paket.maskapai} remainingseat={paket.remainingseat} thumbnail={paket.thumbnail} totalseat={paket.totalseat} />
          ))}
        </div>
        {/* End Of Content */}

      </section>
    </>
  );
};

export default page;
