import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FaArrowRightLong } from "react-icons/fa6";

const Hero = () => {
  return (
    <section className="relative container mt-24 md:mt-0 md:h-screen max-h-[800px] pb-10 items-center flex flex-col-reverse md:flex-row md:px-8 gap-10 z-[1]">
      <div className="space-y-4 flex-1">
        <h1 className="text-gray-800 font-bold text-3xl sm:text-5xl xl:text-6xl">
          Lazismu
          <br />
          <span className="text-secondary">Kabupaten Tasikmalaya</span>
        </h1>
        <p className="text-gray-500 max-w-xl leading-relaxed">
          LAZISMU adalah lembaga zakat tingkat nasional yang berkhidmat dalam
          pemberdayaan masyarakat melalui pendayagunaan secara produktif dana
          zakat, infaq, wakaf dan dana kedermawanan lainnya baik dari
          perseorangan, lembaga, perusahaan dan instansi lainnya.
        </p>
        <div className="w-full sm:flex sm:items-center sm:gap-3">
          <Link href="/wakaf">
            <Button variant="secondary" className="w-full sm:w-auto">
              Mari Berdonasi
            </Button>
          </Link>
          <Link href="/#about">
            <Button
              variant="outline"
              className="gap-2 w-full sm:w-auto mt-3 sm:mt-0"
            >
              Tentang Kami <FaArrowRightLong />
            </Button>
          </Link>
        </div>
      </div>
      <div className="flex-1 text-center mt-4 rounded-lg overflow-hidden">
        <img
          src="https://picsum.photos/id/83/1600/900"
          className="w-full h-full object-cover"
        />
      </div>
    </section>
  );
};

export default Hero;
