import { cn } from "@/lib/utils";
import React from "react";

interface IProps {
  className?: string;
}

function HowToWakaf({ className }: IProps) {
  return (
    <div className={cn("space-y-2", className)}>
      <h2 className="font-extrabold tracking-wide">Cara berdonasi</h2>
      <ol className="text-sm list-decimal space-y-1 pl-4">
        <li>
          Pilih metode donasi: <b>Uang</b> (Midtrans/Cash Manual) atau{" "}
          <b>Barang</b>.
        </li>

        <li>
          Isi sesuai pilihan:
          <ul className="list-disc pl-5 space-y-1">
            <li>
              Jika <b>Uang</b>: masukkan nominal donasi.
            </li>
            <li>
              Jika <b>Barang</b>: pilih kategori <b>Barang Pakai</b> atau{" "}
              <b>Barang Konsumsi</b>, lalu isi detail (nama barang, jumlah &amp;
              satuan, kondisi, cara serah terima).
            </li>
          </ul>
        </li>

        <li>
          Lengkapi form data diri (nama, email/ponsel, opsi anonim, pesan/doa).
        </li>
        <li>
          Tinjau ringkasan dan klik tombol <b>Serah Terima</b>.
        </li>

        <li>
          Ikuti instruksi serah terima sesuai metode:
          <ul className="list-disc pl-5 space-y-1">
            <li>
              <b>Midtrans</b>: selesaikan pembayaran melalui kanal yang
              tersedia.
            </li>
            <li>
              <b>Cash</b>: tunjukkan <b>kode verifikasi</b> ke petugas.
            </li>
            <li>
              <b>Donasi Barang</b>: lakukan serah terima sesuai pilihan
              (antar/jemput/kirim) dan tunjukkan
              <b> kode verifikasi</b>. Jika kirim ekspedisi, unggah{" "}
              <b>foto resi</b>.
            </li>
          </ul>
        </li>

        <li>Pengurus akan melakukan konfirmasi serah terima.</li>
        <li>Anda akan menerima sertifikat, dan donasi Anda akan disalurkan.</li>
      </ol>
    </div>
  );
}

export default HowToWakaf;
