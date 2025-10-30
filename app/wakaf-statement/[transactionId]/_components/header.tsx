import { cn } from "@/lib/utils"
import { Gravitas_One } from "next/font/google"

const gravitasOne = Gravitas_One({
  subsets: ["latin"],
  weight: ["400"]
})

function Header() {
  return (
    <header className="text-center mb-0.5 border-b-[4px] border-double border-gray-800 pb-4">
      <h1 className={cn(
        'text-xl sm:text-2xl font-[900] uppercase text-[#7B9039] leading-6 md:leading-9',
        gravitasOne.className)
      }>
        Lazismu{' '}
        <br className="hidden sm:block" />
        Kabupaten Tasikmalaya
      </h1>
      <p className="text-[10px] sm:text-xs">
        Jl. Sukahaji Singasari Singaparna Kabupaten Tasikmalaya 46412
      </p>
      <p className="text-xs sm:text-sm">
        Telpon: 085223355383 | Email: kabtasikmalayalazismu@gmail.com
      </p>
    </header>
  )
}

export default Header