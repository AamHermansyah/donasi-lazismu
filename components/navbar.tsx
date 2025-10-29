'use client'

import Image from "next/image"
import Link from "next/link"
import { useState } from 'react'
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai"
import { Button } from "./ui/button"
import { cn } from "@/lib/utils"

interface IProps {
  isAuthenticated: boolean;
}

const Navbar: React.FC<IProps> = ({ isAuthenticated }) => {
  const [nav, setNav] = useState(false);

  const toggleNav = () => setNav((prev) => !prev);

  return (
    <>
      {/* Navbar Desktop*/}
      <header className="fixed w-full left-0 top-0 z-10 bg-background shadow">
        <div className="flex container py-2 justify-between items-center w-full">
          <Link href="/" className="relative block w-[50px] sm:w-[60px] aspect-square rounded-md overflow-hidden">
            <Image
              src="/logo.jpeg"
              alt="logo"
              fill={true}
            />
          </Link>
          <div className="hidden lg:flex items-center gap-12">
            <nav className="flex gap-6">
              <Link href="/">Beranda</Link>
              <Link href="/wakaf">Donasi</Link>
              <Link href="/#about">Tentang Kami</Link>
              <Link href="/#contact">Kontak</Link>
            </nav>
            <div className="flex gap-6">
              {isAuthenticated ? (
                <Link href="/dashboard">
                  <Button variant="secondary">Dashboard</Button>
                </Link>
              ) : (
                <Link href="/auth/login">
                  <Button variant="secondary">Login</Button>
                </Link>
              )}
            </div>
          </div>
          <div className="lg:hidden">
            {nav ? (
              <button onClick={toggleNav}>
                <AiOutlineClose
                  size={24}
                  className="text-secondary"
                />
              </button>
            ) : (
              <button onClick={toggleNav}>
                <AiOutlineMenu
                  size={24}
                  className="text-secondary"
                />
              </button>
            )}
          </div>
        </div>
      </header>
      {/*End Navbar Desktop*/}

      {/* Dropdown Menu Mobile */}
      <header
        onClick={toggleNav}
        className={cn(
          'fixed lg:hidden w-full h-screen py-10 bg-foreground/30 backdrop-blur-sm shadow-md ease-in-out duration-700 z-[9]',
          nav ? 'top-0 opacity-100' : '-top-[100%] opacity-0'
        )}>
        <div
          onClick={(e) => e.stopPropagation()}
          className="px-8 pt-16 pb-10 space-y-6 bg-background"
        >
          <nav className="gap-5 flex flex-col">
            <Link href="/" className="w-max" onClick={toggleNav}>
              Beranda
            </Link>
            <Link href="/wakaf" className="w-max" onClick={toggleNav}>
              Wakaf
            </Link>
            <Link href="/#about" className="w-max" onClick={toggleNav}>
              Tentang Kami
            </Link>
            <Link href="/#contact" className="w-max" onClick={toggleNav}>
              Kontak
            </Link>
          </nav>
          <div className="w-full h-auto flex flex-col gap-4">
            {isAuthenticated ? (
              <Link href="/dashboard">
                <Button
                  variant="secondary"
                  className="w-full"
                  onClick={toggleNav}
                >
                  Dashboard
                </Button>
              </Link>
            ) : (
              <Link href="/auth/login">
                <Button
                  variant="secondary"
                  className="w-full"
                  onClick={toggleNav}
                >
                  Login
                </Button>
              </Link>
            )}
          </div>
        </div>
      </header>
      {/* End Dropdown Menu Mobile */}
    </>
  )
}

export default Navbar
