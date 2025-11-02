const AboutUs = () => {
  return (
    <section id="about" className="relative py-12 bg-white">
      <div className="absolute -top-32 -right-10 z-0">
        <div className="relative aspect-square w-[270px] h-[610px] z-0">
          <img
            src="/images/bg-vector-3-3.png"
            alt="bg-vector"
            className="w-full h-full object-cover scale-x-[-1]"
          />
        </div>
      </div>

      <div className="relative container flex flex-col lg:flex-row items-center gap-10 sm:gap-16">
        <div className="relative flex-1 w-full aspect-[4/3] rounded-md overflow-hidden">
          <img
            src="/images/postingan-kantor.png"
            alt="Respon Muhammadiyah"
            className="h-full w-full object-cover"
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
                <img
                  src="/images/icons/scroll.png"
                  alt="Scroll Icon"
                  className="w-8 h-8"
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
                <img
                  src="/images/icons/placeholder.png"
                  alt="Placeholder Icon"
                  className="w-8 h-8"
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
                <img
                  src="/images/icons/book.png"
                  alt="Book Icon"
                  className="w-8 h-8"
                />
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
                <img
                  src="/images/icons/group.png"
                  alt="Group Icon"
                  className="w-8 h-8"
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

