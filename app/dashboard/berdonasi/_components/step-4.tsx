import { Button } from '@/components/ui/button'
import { HiOutlineChevronDown } from 'react-icons/hi'
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import { AiOutlineExclamationCircle } from 'react-icons/ai'
import { Separator } from '@/components/ui/separator'
import { forwardRef } from 'react'
import { FormTypes } from '../_types'
import { Session } from 'next-auth'
import { formatRupiah } from '@/lib/utils'

interface IProps {
  data: FormTypes;
  user: Session['user'];
  onChangeStep: (step: number) => void;
}

const Step4 = forwardRef<HTMLDivElement, IProps>(({ data, user, onChangeStep }, ref) => {
  const isCash = data.step2.paymentMethodLabel?.toLowerCase().includes('cash');

  return (
    <div ref={ref} className="flex-1 space-y-4">
      <div className="flex items-center gap-2">
        <span className="block px-4 py-1 rounded-full text-sm font-semibold bg-secondary/20 text-secondary">4</span>
        <h1 className="text-lg font-bold">Ringkasan</h1>
      </div>

      <Alert variant="info">
        <AiOutlineExclamationCircle fontSize={22} />
        <AlertTitle>PENTING!</AlertTitle>
        <AlertDescription>
          Pastikan semua data sudah benar.
        </AlertDescription>
      </Alert>

      <div className="space-y-1">
        <div className="cursor-pointer rounded-lg border">
          <div className="flex items-center justify-between gap-2 p-2 shadow-sm text-sm">
            <div className="flex items-center gap-2">
              <div className="w-[80px] aspect-[4/3] text-lg rounded-md">
                <img
                  src={data.step2.paymentLogo}
                  alt="payment logo"
                  className="w-full h-full object-contain text-xs"
                />
              </div>
              {data.step2.paymentMethodLabel}
            </div>
            <Button
              size="sm"
              variant="primary"
              className="py-1 px-2 h-auto text-[10px] border border-secondary rounded-full gap-1"
              onClick={() => onChangeStep(2)}
            >
              Ganti
              <HiOutlineChevronDown />
            </Button>
          </div>
        </div>
      </div>

      <div className="space-y-2 text-sm sm:text-base">
        <h1 className="font-bold">Detail Informasi</h1>
        <div className="flex items-center justify-between gap-2">
          <span className="font-semibold text-gray-400">Nama Lengkap</span>
          <span className="text-right">
            {data.step3.name} {data.step3.isHiddenName && '(anonim)'}
          </span>
        </div>
        <div className="flex items-center justify-between gap-2">
          <span className="font-semibold text-gray-400">Email/Nomor Ponsel</span>
          <span className="text-right">{data.step3.email}</span>
        </div>
      </div>

      <Separator />

      <div className="space-y-2 text-sm sm:text-base">
        <h1 className="font-bold">Detail Donasi</h1>
        <div className="flex items-center justify-between gap-2">
          <span className="font-semibold text-gray-400">Atas Nama</span>
          <span className="font-bold text-right">
            {user.name}
          </span>
        </div>
        <div className="flex items-center justify-between gap-2">
          <span className="font-semibold text-gray-400">Metode Transaksi</span>
          <span className="text-right">
            {data.step2.paymentMethodLabel}
          </span>
        </div>
        <div className="flex items-center justify-between gap-2">
          <span className="font-semibold text-gray-400">Nominal</span>
          <span className="font-bold text-right">
            {formatRupiah(data.step1.amount)}
          </span>
        </div>
      </div>

      {isCash && (
        <>
          <Separator />
          <div className="space-y-2 text-sm sm:text-base">
            <h1 className="font-bold">Verifikasi Cash Manual</h1>

            {/* UI Placeholder – belum ada fungsi */}
            <div className="rounded-lg border p-3 sm:p-4 space-y-3">
              <div className="flex items-center justify-between gap-2">
                <div>
                  <div className="text-xs text-muted-foreground">Kode Verifikasi</div>
                  <div className="text-xl font-extrabold tracking-widest text-muted-foreground select-none">
                    • • • • • •
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  disabled
                  className="opacity-60 cursor-not-allowed"
                  title="Salin kode (segera hadir)"
                >
                  Salin
                </Button>
              </div>

              <div className="flex items-center justify-between text-xs sm:text-sm">
                <span className="text-muted-foreground">
                  Berikan kode ini ke petugas untuk verifikasi pembayaran tunai.
                </span>
                <span className="font-semibold text-muted-foreground">
                  Berlaku 01:00
                </span>
              </div>

              <div className="pt-1">
                <Button
                  variant="primary"
                  disabled
                  className="h-9 opacity-60 cursor-not-allowed"
                  title="Buat Kode (segera hadir)"
                >
                  Buat Kode (segera hadir)
                </Button>
              </div>
            </div>

            <p className="text-[11px] leading-4 text-muted-foreground">
              Kode akan tidak berlaku otomatis setelah 1 jam. Fitur pembuatan kode akan tersedia segera.
            </p>
          </div>
        </>
      )}

      <Separator />
      <div className="space-y-1">
        <p className="text-xs">
          <b><sup>*</sup>Catatan:</b> Kamu akan mendapatkan <b>sertifikat</b> donasi setelah berhasil melakukan donasi.
        </p>
        <p className="text-xs">
          <b><sup>*</sup>Penting:</b> Terdapat <b>biaya admin</b> pada saat transaksi berlangsung karena adanya <b>pihak ketiga</b> untuk melakukan transaksi.
        </p>
      </div>
    </div>
  )
})

Step4.displayName = 'Step4'
export default Step4
