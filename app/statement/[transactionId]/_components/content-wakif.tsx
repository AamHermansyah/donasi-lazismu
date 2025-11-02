'use client'

import QRCodeComponent from '@/components/shared/qr-component';
import { User } from '@prisma/client'
import { useEffect, useState } from 'react';

interface IProps {
  data: User;
}

function ContentWakif({ data }: IProps) {
  const [URL, setURL] = useState('');

  useEffect(() => {
    setURL(window.location.href);
  }, []);

  return (
    <>
      <section>
        <p>Yang bertanda tangan di bawah ini kami donatur dan penerima donasi menerangkan bahwa:</p>
        <div className="relative mt-4 flex flex-col gap-2">
          <div className="w-full flex gap-1">
            <span className="block w-[130px] sm:w-[220px]">Nama Para/Ahli Waris</span>
            {" : "}
            <span className="block w-full font-semibold">
              {data.name || 'tidak diisi'}
            </span>
          </div>
          <div className="w-full flex gap-1">
            <span className="block w-[130px] sm:w-[220px]">Pekerjaan</span>
            {" : "}
            <span className="block w-full font-semibold">
              {data.profession || 'tidak diisi'}
            </span>
          </div>
          <div className="w-full flex gap-1">
            <span className="block w-[130px] sm:w-[220px]">Instansi</span>
            {" : "}
            <span className="block w-full font-semibold">
              {data.institution || 'tidak diisi'}
            </span>
          </div>
          <div className="w-full flex gap-1">
            <span className="block w-[130px] sm:w-[220px]">Alamat</span>
            {" : "}
            <span className="block w-full font-semibold">
              {data.address || 'tidak diisi'}
            </span>
          </div>
          <div className="absolute top-[50%] -translate-y-[50%] right-4">
            <QRCodeComponent text={URL} />
          </div>
        </div>
      </section>
      <p className="italic my-4">
        (Selaku donatur yang selanjutnya disebut pihak ke-I)
      </p>
    </>
  )
}

export default ContentWakif