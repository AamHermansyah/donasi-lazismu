import { Button } from "@/components/ui/button";
import { HiOutlineChevronDown } from "react-icons/hi";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { Separator } from "@/components/ui/separator";
import { forwardRef, useMemo } from "react";
import { FormTypes } from "../_types";
import { Session } from "next-auth";
import { formatRupiah } from "@/lib/utils";

interface IProps {
  data: FormTypes;
  user: Session["user"];
  onChangeStep: (step: number) => void;
}

const Step4 = forwardRef<HTMLDivElement, IProps>(
  ({ data, user, onChangeStep }, ref) => {
    const isMoney = data.step1.mode === 'money';
    const isCash = isMoney && data.step2.paymentMethodLabel?.toLowerCase().includes("cash");
    const isGoods = data.step1.mode === 'goods';

    // placeholder kode verifikasi (aktifkan dari backend nanti)
    const kodeVerifikasi = useMemo(() => "• • • • • •", []);

    return (
      <div ref={ref} className="flex-1 space-y-4">
        <div className="flex items-center gap-2">
          <span className="block px-4 py-1 rounded-full text-sm font-semibold bg-secondary/20 text-secondary">4</span>
          <h1 className="text-lg font-bold">Ringkasan</h1>
        </div>

        <Alert variant="info">
          <AiOutlineExclamationCircle fontSize={22} />
          <AlertTitle>PENTING!</AlertTitle>
          <AlertDescription>Pastikan semua data sudah benar.</AlertDescription>
        </Alert>

        {/* Kartu metode uang atau label barang */}
        <div className="space-y-1">
          <div className="cursor-pointer rounded-lg border">
            <div className="flex items-center justify-between gap-2 p-2 shadow-sm text-sm">
              <div className="flex items-center gap-2">
                <div className="w-[80px] aspect-[4/3] text-lg rounded-md">
                  {isMoney ? (
                    <img src={data.step2.paymentLogo} alt="payment logo" className="w-full h-full object-contain text-xs" />
                  ) : (
                    <img src={"/images/box-logo.png"} alt="goods logo" className="w-full h-full object-contain text-xs" />
                  )}
                </div>
                {isMoney ? data.step2.paymentMethodLabel : "Donasi Barang"}
              </div>
              <Button
                size="sm"
                variant="primary"
                className="py-1 px-2 h-auto text-[10px] border border-secondary rounded-full gap-1"
                onClick={() => onChangeStep(1)}
              >
                Ganti
                <HiOutlineChevronDown />
              </Button>
            </div>
          </div>
        </div>

        {/* Informasi Pribadi */}
        <div className="space-y-2 text-sm sm:text-base">
          <h1 className="font-bold">Detail Informasi</h1>
          <div className="flex items-center justify-between gap-2">
            <span className="font-semibold text-gray-400">Nama Lengkap</span>
            <span className="text-right">
              {data.step3.name} {data.step3.isHiddenName && "(anonim)"}
            </span>
          </div>
          <div className="flex items-center justify-between gap-2">
            <span className="font-semibold text-gray-400">Email/Nomor Ponsel</span>
            <span className="text-right">{data.step3.email}</span>
          </div>
        </div>

        <Separator />

        {/* Detail Donasi */}
        <div className="space-y-2 text-sm sm:text-base">
          <h1 className="font-bold">Detail Donasi</h1>
          <div className="flex items-center justify-between gap-2">
            <span className="font-semibold text-gray-400">Atas Nama</span>
            <span className="font-bold text-right">{user.name}</span>
          </div>

          {isMoney ? (
            <>
              <div className="flex items-center justify-between gap-2">
                <span className="font-semibold text-gray-400">Metode Transaksi</span>
                <span className="text-right">{data.step2.paymentMethodLabel}</span>
              </div>
              <div className="flex items-center justify-between gap-2">
                <span className="font-semibold text-gray-400">Nominal</span>
                <span className="font-bold text-right">{formatRupiah(data.step1.amount)}</span>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center justify-between gap-2">
                <span className="font-semibold text-gray-400">Kategori</span>
                <span className="text-right">
                  {data.step2.goods?.category === 'wearable' ? 'Barang Pakai' : 'Barang Konsumsi'}
                </span>
              </div>
              <div className="flex items-center justify-between gap-2">
                <span className="font-semibold text-gray-400">Nama Barang</span>
                <span className="text-right">{data.step2.goods?.name}</span>
              </div>
              <div className="flex items-center justify-between gap-2">
                <span className="font-semibold text-gray-400">Jumlah</span>
                <span className="text-right">{data.step2.goods?.qty} {data.step2.goods?.unit}</span>
              </div>
              <div className="flex items-center justify-between gap-2">
                <span className="font-semibold text-gray-400">Kondisi</span>
                <span className="text-right">{data.step2.goods?.condition}</span>
              </div>
              <div className="flex items-center justify-between gap-2">
                <span className="font-semibold text-gray-400">Cara Serah Terima</span>
                <span className="text-right">
                  {data.step2.goods?.delivery === 'antar' ? 'Antar ke lokasi'
                    : data.step2.goods?.delivery === 'jemput' ? 'Jemput oleh petugas'
                    : 'Kirim via ekspedisi'}
                </span>
              </div>
              {data.step2.goods?.note && (
                <div className="flex items-center justify-between gap-2">
                  <span className="font-semibold text-gray-400">Catatan</span>
                  <span className="text-right">{data.step2.goods?.note}</span>
                </div>
              )}
            </>
          )}
        </div>

        {(isCash || isGoods) && (
          <>
            <Separator />
            <div className="space-y-2 text-sm sm:text-base">
              <h1 className="font-bold">
                {isCash ? 'Verifikasi Cash Manual' : 'Verifikasi Donasi Barang'}
              </h1>

              <div className="rounded-lg border p-3 sm:p-4 space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <div className="text-xs text-muted-foreground">Kode Verifikasi</div>
                    <div className="text-xl font-extrabold tracking-widest text-muted-foreground select-none">
                      {kodeVerifikasi}
                    </div>
                  </div>
                  <Button variant="outline" size="sm" disabled className="opacity-60 cursor-not-allowed" title="Salin kode (segera hadir)">
                    Salin
                  </Button>
                </div>

                <div className="flex items-center justify-between text-xs sm:text-sm">
                  <span className="text-muted-foreground">
                    Tunjukkan/berikan kode ini ke petugas saat serah terima{isGoods && ' barang'}.
                  </span>
                  <span className="font-semibold text-muted-foreground">Berlaku 01:00</span>
                </div>

                {isGoods && data.step2.goods?.delivery === 'kirim' && (
                  <div className="text-xs text-muted-foreground">
                    Jika kirim ekspedisi, unggah foto resi setelah pengiriman. Status akan menjadi <b>Menunggu diterima</b> sampai petugas konfirmasi.
                  </div>
                )}

                <div className="pt-1">
                  <Button variant="primary" disabled className="h-9 opacity-60 cursor-not-allowed" title="Buat Kode (segera hadir)">
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
            <b><sup>*</sup>Catatan:</b> Kamu akan mendapatkan <b>sertifikat</b> donasi setelah berhasil
            {isMoney ? ' melakukan transaksi.' : ' serah terima barang dikonfirmasi.'}
          </p>
          {isMoney && (
            <p className="text-xs">
              <b><sup>*</sup>Penting:</b> Terdapat <b>biaya admin</b> saat transaksi berlangsung karena adanya <b>pihak ketiga</b>.
            </p>
          )}
        </div>
      </div>
    );
  }
);

Step4.displayName = "Step4";
export default Step4;
