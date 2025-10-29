import React from "react";
import Image from "next/image";
import bedIcon from "/public/images/icons/bed.png";
import homeIcon from "/public/images/icons/home.png";
import officeBuildingIcon from "/public/images/icons/office-building.png";
import parkingIcon from "/public/images/icons/parking.png";
import mosqueIcon from "/public/images/icons/mosque.png";

const Facilities = () => {
  return (
    <section id="facilities">
      <div className="absolute -left-10 z-0">
        {/* <div className="relative aspect-square w-[270px] h-[610px] z-0">
          <Image src="/images/bg-vector-3-3.png" alt="bg-vector" fill />
        </div> */}
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
          <img
            src="https://picsum.photos/id/83/1600/900"
            alt="Mosque Image"
            className="object-cover h-full"
          />
          </div>
          <div className="relative w-full aspect-video sm:aspect-auto h-full col-span-12 sm:col-span-5 rounded-lg overflow-hidden">
            <Image src="/images/Gallery2.png" alt="Gallery image 2" fill className="object-cover" />
          </div>
          <div className="relative w-full aspect-video sm:aspect-auto h-full col-span-12 sm:col-span-5 rounded-lg overflow-hidden">
            <Image src="/images/Gallery3.png" alt="Gallery image 3" fill className="object-cover" />
          </div>
        </div>

        {/* Grid layanan/program */}
        <div className="mt-12 py-10">
          <div className="mb-8 space-y-3">
            <h2 className="text-secondary text-3xl sm:text-5xl xl:text-6xl font-bold text-center">
              Apa yang Kami Sediakan
            </h2>
            <p className="text-gray-500 max-w-3xl mx-auto text-center">
              Layanan pengelolaan ZISWAF, program pendayagunaan yang produktif,
              serta dukungan kemudahan donasi dan kolaborasi untuk menebar
              kemanfaatan secara luas.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-gray-800">
            {/* 1 */}
            <div className="flex items-center border rounded-md p-6">
              <div className="flex-shrink-0 w-8 h-8">
                <Image src={bedIcon} alt="ZISWAF Icon" width={32} height={32} />
              </div>
              <div className="ml-4 flex flex-col font-medium sm:text-lg">
                <span className="text-secondary text-2xl sm:text-3xl font-bold">Amanah</span>
                Pengelolaan Zakat, Infak & Wakaf (ZISWAF)
              </div>
            </div>

            {/* 2 */}
            <div className="flex items-center border rounded-md p-6">
              <div className="flex-shrink-0 w-8 h-8">
                <Image src={bedIcon} alt="Produktif Icon" width={32} height={32} />
              </div>
              <div className="ml-4 flex flex-col font-medium sm:text-lg">
                <span className="text-secondary text-2xl sm:text-3xl font-bold">Produktif</span>
                Pendayagunaan dana untuk pemberdayaan
              </div>
            </div>

            {/* 3 */}
            <div className="flex items-center border rounded-md p-6">
              <div className="flex-shrink-0 w-8 h-8">
                <Image src={homeIcon} alt="Kantor Icon" width={32} height={32} />
              </div>
              <div className="ml-4 flex flex-col font-medium sm:text-lg">
                <span className="text-secondary text-2xl sm:text-3xl font-bold">Kantor</span>
                Jl. Sukahaji Singasari, Singaparna – Tasikmalaya
              </div>
            </div>

            {/* 4 */}
            <div className="flex items-center border rounded-md p-6">
              <div className="flex-shrink-0 w-8 h-8">
                <Image src="/images/icons/town-hall.png" alt="Pendidikan Icon" width={30} height={30} />
              </div>
              <div className="ml-4 flex flex-col font-medium sm:text-lg">
                <span className="text-secondary text-2xl sm:text-3xl font-bold">Pendidikan</span>
                Beasiswa, literasi & peningkatan kapasitas
              </div>
            </div>

            {/* 5 */}
            <div className="flex items-center border rounded-md p-6">
              <Image src="/images/icons/toilet-.png" alt="Ekonomi Icon" width={32} height={32} />
              <div className="ml-4 flex flex-col font-medium sm:text-lg">
                <span className="text-secondary text-2xl sm:text-3xl font-bold">Ekonomi</span>
                Usaha mikro & penguatan livelihood
              </div>
            </div>

            {/* 6 */}
            <div className="flex items-center border rounded-md p-6">
              <Image src="/images/icons/toilet-.png" alt="Sosial Dakwah Icon" width={32} height={32} />
              <div className="ml-4 flex flex-col font-medium sm:text-lg">
                <span className="text-secondary text-2xl sm:text-3xl font-bold">Sosial–Dakwah</span>
                Respon bencana & layanan kemanusiaan
              </div>
            </div>

            {/* 7 */}
            <div className="flex items-center border rounded-md p-6">
              <Image src="/images/icons/kitchen.png" alt="Transparansi Icon" width={32} height={32} />
              <div className="ml-4 flex flex-col font-medium sm:text-lg">
                <span className="text-secondary text-2xl sm:text-3xl font-bold">Transparan</span>
                Akuntabilitas laporan & kepastian hukum
              </div>
            </div>

            {/* 8 */}
            <div className="flex items-center border rounded-md p-6">
              <div className="flex-shrink-0 w-8 h-8">
                <Image src={parkingIcon} alt="Jemput Donasi Icon" width={32} height={32} />
              </div>
              <div className="ml-4 flex flex-col font-medium sm:text-lg">
                <span className="text-secondary text-2xl sm:text-3xl font-bold">Jemput Donasi</span>
                0813-2065-8036
              </div>
            </div>

            {/* 9 */}
            <div className="flex items-center border rounded-md p-6">
              <div className="flex-shrink-0 w-8 h-8">
                <Image src={officeBuildingIcon} alt="Legalitas Icon" width={32} height={32} />
              </div>
              <div className="ml-4 flex flex-col font-medium sm:text-lg">
                <span className="text-secondary text-2xl sm:text-3xl font-bold">Legalitas</span>
                SK Menag No. 90 Tahun 2022
              </div>
            </div>

            {/* 10 */}
            <div className="flex items-center border rounded-md p-6">
              <Image src="/images/icons/guard.png" alt="Sinergi Icon" width={32} height={32} />
              <div className="ml-4 flex flex-col font-medium sm:text-lg">
                <span className="text-secondary text-2xl sm:text-3xl font-bold">Sinergi</span>
                Persyarikatan & komunitas untuk dampak luas
              </div>
            </div>

            {/* 11 */}
            <div className="flex items-center border rounded-md p-6">
              <div className="flex-shrink-0 w-8 h-8">
                <Image src={mosqueIcon} alt="Call Center Icon" width={32} height={32} />
              </div>
              <div className="ml-4 flex flex-col font-medium sm:text-lg">
                <span className="text-secondary text-2xl sm:text-3xl font-bold">Call Center</span>
                0852-2335-5383
              </div>
            </div>

            {/* 12 */}
            <div className="flex items-center border rounded-md p-6">
              <Image src="/images/icons/guard.png" alt="Kepatuhan APU-PPT Icon" width={32} height={32} />
              <div className="ml-4 flex flex-col font-medium sm:text-lg">
                <span className="text-secondary text-2xl sm:text-3xl font-bold">Kepatuhan APU–PPT</span>
                Tidak menerima dana dari kejahatan (UU 8/2010)
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Facilities;
