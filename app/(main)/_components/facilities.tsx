import React from "react";
import Image from "next/image";
import bedIcon from "/public/images/icons/bed.png";
import homeIcon from "/public/images/icons/home.png";
import officeBuildingIcon from "/public/images/icons/office-building.png";
import parkingIcon from "/public/images/icons/parking.png";
import mosqueIcon from "/public/images/icons/mosque.png";


const Facilities = () => {
  function CoreProgram({ emoji, title, desc }: {
    emoji: string;
    title: string;
    desc: string;
  }) {
    return (
      <div className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-gradient-to-br from-white to-gray-50 p-6 shadow-sm hover:shadow-xl transition-shadow">
        <div className="text-5xl mb-4">{emoji}</div>
        <h3 className="text-secondary text-xl sm:text-2xl font-bold mb-2">
          {title}
        </h3>
        <p className="text-gray-600 text-sm sm:text-base">{desc}</p>
      </div>
    );
  }
  
  function SupportCard({ emoji, label, sub }: {
    emoji: string;
    label: string;
    sub: string;
  }) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-gray-200 bg-gray-50 p-4 text-center hover:bg-white hover:shadow-md transition">
        <div className="text-3xl mb-2">{emoji}</div>
        <div className="text-secondary font-semibold text-sm">{label}</div>
        <div className="text-gray-500 text-xs mt-1">{sub}</div>
      </div>
    );
  }
  return (
    <section id="facilities">
      <div className="absolute -left-10 z-0">
        <div className="relative aspect-square w-[270px] h-[610px] z-0">
          <Image src="/images/bg-vector-3-3.png" alt="bg-vector" fill />
        </div>
      </div>

      <div className="relative container flex flex-col py-8 overflow-hidden">
        {/* Header */}
        <div className="text-center mt-10 pb-4">
          <h3 className="text-foreground font-bold text-sm">LAZISMU Tasikmalaya</h3>
          <h1 className="text-secondary text-3xl sm:text-5xl xl:text-6xl font-bold">
            Layanan & Program
          </h1>
        </div>

        {/* Intro */}
        <p className="text-center max-w-3xl place-self-center sm:text-base text-sm">
          LAZISMU adalah lembaga amil zakat nasional yang mengelola zakat, infak,
          dan wakaf secara <b>amanah, profesional, dan transparan</b> untuk
          pemberdayaan masyarakat—berbasis program <b>pendidikan, ekonomi,
          sosial-dakwah</b>, dan kolaborasi yang berkemajuan.
        </p>

        {/* Gallery tetap */}
        <div className="w-full grid grid-cols-12 gap-2 sm:gap-4 mt-12">
          <div className="relative w-full aspect-video sm:aspect-[4/3] rounded-lg overflow-hidden col-span-12 sm:col-span-7 sm:row-span-2">
            <Image src="/images/dummy.jpg" alt="Gallery image 2" fill className="object-cover" />
          </div>
          <div className="relative w-full aspect-video sm:aspect-auto h-full col-span-12 sm:col-span-5 rounded-lg overflow-hidden">
            <Image src="/images/dummy.jpg" alt="Gallery image 2" fill className="object-cover" />
          </div>
          <div className="relative w-full aspect-video sm:aspect-auto h-full col-span-12 sm:col-span-5 rounded-lg overflow-hidden">
            <Image src="/images/dummy.jpg" alt="Gallery image 3" fill className="object-cover" />
          </div>
        </div>

        {/* Grid layanan/program */}
        <div className="mt-12 py-10">
          {/* Header */}
          <div className="mb-10 space-y-3 text-center">
            <h2 className="text-secondary text-3xl sm:text-5xl font-extrabold">
              Apa yang Kami Sediakan
            </h2>
            <p className="text-gray-500 max-w-3xl mx-auto">
              Zakat Anda disalurkan melalui program produktif berbasis pendidikan,
              ekonomi dan sosial-dakwah—dengan layanan donasi yang mudah, transparan,
              serta terpercaya.
            </p>
          </div>

          {/* 1. Program Inti */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <CoreProgram
              emoji="📚"
              title="Pendidikan Berdaya"
              desc="Beasiswa, renovasi sekolah, literasi & pelatihan guru untuk generasi cerdas."
            />
            <CoreProgram
              emoji="💼"
              title="Ekonomi Produktif"
              desc="Modal usaha mikro, pelatihan kewirausahaan & pasar yang terintegrasi."
            />
            <CoreProgram
              emoji="❤️"
              title="Sosial-Dakwah"
              desc="Ambulans gratis, ruang ibadah, tanggap bencana & kemanusiaan cepat."
            />
          </div>

          {/* 2. Layanan Pendukung */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            <SupportCard emoji="📞" label="Call Center" sub="0852-2335-5383" />
            <SupportCard emoji="🚚" label="Jemput Donasi" sub="Gratis" />
            <SupportCard emoji="📜" label="Legalitas" sub="SK Menag 90/2022" />
            <SupportCard emoji="📊" label="Transparan" sub="Laporan Real-time" />
            <SupportCard emoji="🤝" label="Sinergi" sub="MUH & Aisyiyah" />
            <SupportCard emoji="🛡️" label="Bebas Tindak Pidana" sub="APU-PPT" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Facilities;
