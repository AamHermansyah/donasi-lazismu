// components/PengurusLazismu.js
import React from "react";
import Image from "next/image";

const pengurusData = [
  {
    nama: "Nama Ketua",
    jabatan: "KETUA BADAN PENGURUS",
    imageSrc: "/images/dummy.jpg",
  },
  {
    nama: "Nama Sekretaris",
    jabatan: "SEKRETARIS UMUM",
    imageSrc: "/images/dummy.jpg",
  },
  {
    nama: "Nama Bendahara",
    jabatan: "BENDAHARA",
    imageSrc: "/images/dummy.jpg",
  },
  {
    nama: "Nama Koordinator 1",
    jabatan: "KOOR. PROGRAM & PENDAYAGUNAAN",
    imageSrc: "/images/dummy.jpg",
  },
  {
    nama: "Nama Koordinator 2",
    jabatan: "KOOR. PENGHIMPUNAN & KEMITRAAN",
    imageSrc: "/images/dummy.jpg",
  },
  {
    nama: "Nama Koordinator 3",
    jabatan: "KOOR. ADMINISTRASI & KEUANGAN",
    imageSrc: "/images/dummy.jpg",
  },
];

const PengurusLazismu = () => {
  return (
    <section id="pengurus-lazismu" className="py-4 sm:py-12 bg-white">
      <div className="container mx-auto px-4">
        {/* Header - jangan diubah desainnya */}
        <div className="text-center mt-10 pb-4">
          <h1 className="text-secondary text-3xl sm:text-5xl xl:text-6xl font-bold">
            Pengurus LAZISMU
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto mt-4">
            Para pengurus LAZISMU Kabupaten Tasikmalaya adalah insan-insan
            <b> amanah, profesional, dan berdedikasi</b> yang berkhidmat dalam
            mengelola zakat, infak, dan wakaf untuk <b>pemberdayaan umat</b>.
            Mereka bekerja dengan semangat sinergi dan transparansi untuk
            mewujudkan kesejahteraan masyarakat.
          </p>
        </div>

        {/* Grid pengurus */}
        <ul className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 justify-center gap-4 mt-4 sm:mt-12">
          {pengurusData.map((item, idx) => (
            <li key={idx} className="p-4 space-y-4">
              <div className="w-24 aspect-square mx-auto rounded-full overflow-hidden">
                <Image
                  src={item.imageSrc}
                  alt={item.nama}
                  width={120}
                  height={120}
                  className="object-cover rounded-full h-full"
                />
              </div>
              <div className="text-center">
                <h4 className="text-gray-700 font-semibold sm:text-lg">
                  {item.nama}
                </h4>
                <p className="text-secondary text-sm">{item.jabatan}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default PengurusLazismu;
