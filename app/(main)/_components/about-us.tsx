import React from "react";
import Image from "next/image";
import scrollIcon from "/public/images/icons/scroll.png";
import placeholderIcon from "/public/images/icons/placeholder.png";
import bookIcon from "/public/images/icons/book.png";
import groupIcon from "/public/images/icons/group.png";

const AboutUs = () => {
  return (
    <section id="about" className="relative py-12 bg-white">
      <div className="absolute -top-32 -right-10 z-0">
        <div className="relative aspect-square w-[270px] h-[610px] z-0">
          <Image
            src="/images/bg-vector-3-3.png"
            alt="bg-vector"
            fill={true}
            style={{ transform: "scaleX(-1)" }}
          />
        </div>
      </div>
      <div className="relative container flex flex-col lg:flex-row items-center gap-10 sm:gap-16">
        <div className="relative flex-1 w-full aspect-[4/3] rounded-md overflow-hidden">
          <img
            src="https://picsum.photos/id/83/1600/900"
            alt="Mosque Image"
            className="object-cover h-full"
          />
        </div>
        <div className="space-y-6 max-w-lg lg:max-w-none flex-1">
          <div className="text-center lg:text-left">
            <h3 className="text-sm font-bold text-black">
              Lembaga Zakat Nasional
            </h3>
            <h1 className="text-3xl sm:text-5xl xl:text-6xl font-bold text-secondary">
              Kabupaten Tasikmalaya
            </h1>
          </div>
          <div className="mt-6 space-y-4 text-foreground">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-8 h-8">
                <Image
                  src={scrollIcon}
                  alt="Scroll Icon"
                  width={32}
                  height={32}
                />
              </div>
              <p className="text-sm sm:text-base">
                LAZISMU adalah lembaga amil zakat nasional di bawah
                Persyarikatan Muhammadiyah yang berkhidmat dalam pemberdayaan
                masyarakat melalui pengelolaan zakat, infak, dan wakaf secara
                amanah dan profesional.
              </p>
            </div>
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-8 h-8">
                <Image
                  src={placeholderIcon}
                  alt="Placeholder Icon"
                  width={32}
                  height={32}
                />
              </div>
              <p className="text-sm sm:text-base">
                Berlokasi di Jl. Sukahaji Singasari Singaparna Kabupaten
                Tasikmalaya 46412, LAZISMU hadir melayani umat dengan layanan
                zakat, infak, dan wakaf yang mudah diakses serta terpercaya.
              </p>
            </div>
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-8 h-8">
                <Image src={bookIcon} alt="Book Icon" width={32} height={32} />
              </div>
              <p className="text-sm sm:text-base">
                Didirikan oleh PP Muhammadiyah sejak tahun 2002 dan dikukuhkan
                melalui SK Menteri Agama No. 90 Tahun 2022, LAZISMU terus
                menguatkan program pendidikan, ekonomi, sosial, dan dakwah yang
                produktif serta berkemajuan.
              </p>
            </div>
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-8 h-8">
                <Image
                  src={groupIcon}
                  alt="Group Icon"
                  width={32}
                  height={32}
                />
              </div>
              <p className="text-sm sm:text-base">
                Dengan semangat sinergi dan keadilan, LAZISMU berkomitmen
                menebar manfaat seluas-luasnya bagi masyarakat melalui
                kolaborasi bersama donatur, lembaga, dan komunitas.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
