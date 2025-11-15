import { cn } from '@/lib/utils';
import React from 'react'

interface IProps {
  className?: string;
}

function HowToDonate({ className }: IProps) {
  return (
    <div className={cn('space-y-2', className)}>
      <h2 className="font-extrabold tracking-wide">Cara berdonasi</h2>
      <ol className="text-sm list-decimal space-y-1 pl-4">
        <li>
          Masukkan jumlah uang yang ingin anda donasikan.
        </li>
        <li>
          Pilih metode pembayaran yang tersedia.
        </li>
        <li>
          Lengkapi form dengan data diri.
        </li>
        <li>
          Pastikan data sudah benar dan klik tombol serah terima.
        </li>
        <li>
          Ikuti instruksi serah terima donasi sesuai dengan metode pembayaran yang dipilih.
        </li>
        <li>
          Setelah melakukan serah terima, pengurus akan melakukan konfirmasi serah terima donasi.
        </li>
        <li>
          Anda akan menerima sertifikat dan donasi Anda telah tersalurkan.
        </li>
      </ol>
    </div>
  )
}

export default HowToDonate