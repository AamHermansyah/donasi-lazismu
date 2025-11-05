"use client";

import React from "react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { formatRupiah } from "@/lib/utils";
import { User, WithdrawalRequest } from "@prisma/client";
import { useFileUpload, FileMetadata } from "@/hooks/use-file-upload";
import { AlertCircleIcon, ImageIcon, UploadIcon, XIcon } from "lucide-react";

interface IProps {
  paymentData: Pick<
    WithdrawalRequest,
    "methodAccountHolder" | "methodAccountNumber" | "methodBankName"
  >;
  user: Pick<User, "id" | "name" | "email">;
  amount: number;
  description: string | null;
}

function DetailWithdraw({ amount, description, paymentData, user }: IProps) {
  const maxSizeMB = 2;
  const maxSize = maxSizeMB * 1024 * 1024; // 2MB

  const [state, actions] = useFileUpload({
    accept: "image/svg+xml,image/png,image/jpeg,image/jpg,image/gif",
    maxSize,
    multiple: false,
  });

  const { files, isDragging, errors } = state;
  const {
    handleDragEnter,
    handleDragLeave,
    handleDragOver,
    handleDrop,
    openFileDialog,
    removeFile,
    getInputProps,
  } = actions;

  const previewUrl = files[0]?.preview || null;
  const getFileName = () => {
    if (!files[0]) return "Bukti terupload";
    if (files[0].file instanceof File) return files[0].file.name;
    return (files[0].file as FileMetadata).name;
  };

  const [evidenceNote, setEvidenceNote] = React.useState("");

  return (
    <>
      <div className="space-y-2 text-sm sm:text-base">
        <h1 className="font-bold">Detail Informasi</h1>
        <div className="flex items-center justify-between gap-2">
          <span className="font-semibold text-gray-400">Nama Lengkap</span>
          <span className="text-right">{user.name}</span>
        </div>
        <div className="flex items-center justify-between gap-2">
          <span className="font-semibold text-gray-400">Email</span>
          <span className="text-right">{user.email}</span>
        </div>
      </div>

      <Separator />

      {/* Detail Penarikan */}
      <div className="space-y-2 text-sm sm:text-base">
        <h1 className="font-bold">Detail Penarikan</h1>
        <div className="flex items-center justify-between gap-2">
          <span className="font-semibold text-gray-400">Metode Penarikan</span>
          <span className="text-right">{paymentData.methodBankName}</span>
        </div>
        <div className="flex items-center justify-between gap-2">
          <span className="font-semibold text-gray-400">Atas Nama</span>
          <span className="text-right">{paymentData.methodAccountHolder}</span>
        </div>
        <div className="flex items-center justify-between gap-2">
          <span className="font-semibold text-gray-400">No. Rek/Telepon</span>
          <span className="text-right">{paymentData.methodAccountNumber}</span>
        </div>
        <div className="flex items-center justify-between gap-2">
          <span className="font-semibold text-gray-400">Jumlah</span>
          <span className="font-bold text-right">{formatRupiah(amount)}</span>
        </div>
      </div>

      <Separator />

      {/* Deskripsi Permintaan (dari data) */}
      <div className="space-y-2 text-sm sm:text-base">
        <h1 className="font-bold">Deskripsi</h1>
        <p>{description || "Deskripsi tidak diisi."}</p>
      </div>

      {/* ==== Bukti Penyaluran: grid 2 kolom responsif ==== */}
      <div className="space-y-3">
        <h1 className="font-bold text-sm sm:text-base">Bukti Penyaluran Dana</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Kiri: Upload Bukti */}
          <div className="flex flex-col">
            <label className="mb-2 text-sm font-medium">Unggah Bukti Transfer</label>

            <div className="relative flex-1">
              <div
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                data-dragging={isDragging || undefined}
                className="relative h-full min-h-[240px] sm:min-h-[280px] flex flex-col items-center justify-center rounded-xl border border-dashed border-input p-4 transition-colors has-[input:focus]:border-ring has-[input:focus]:ring-[3px] has-[input:focus]:ring-ring/50 data-[dragging=true]:bg-accent/50"
              >
                <input {...getInputProps({ style: { display: "none" } })} />

                {previewUrl ? (
                  <div className="absolute inset-0 flex items-center justify-center p-3">
                    <img
                      src={previewUrl}
                      alt={getFileName()}
                      className="mx-auto max-h-full rounded object-contain"
                    />
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center px-4 py-3 text-center">
                    <div
                      className="mb-2 flex size-11 shrink-0 items-center justify-center rounded-full border bg-background"
                      aria-hidden="true"
                    >
                      <ImageIcon className="size-4 opacity-60" />
                    </div>
                    <p className="mb-1.5 text-sm font-medium">
                      Letakkan bukti transfer di sini
                    </p>
                    <p className="text-xs text-muted-foreground">
                      SVG, PNG, JPG atau GIF (max. {maxSizeMB}MB)
                    </p>
                    <Button
                      variant="outline"
                      className="mt-4 gap-2"
                      onClick={openFileDialog}
                      type="button"
                    >
                      <UploadIcon className="-ms-1 size-4 opacity-60" aria-hidden="true" />
                      Pilih Bukti
                    </Button>
                  </div>
                )}
              </div>

              {previewUrl && (
                <button
                  type="button"
                  className="absolute top-3 right-3 z-10 flex size-8 items-center justify-center rounded-full bg-black/60 text-white outline-none transition hover:bg-black/80 focus-visible:ring-2 focus-visible:ring-ring"
                  onClick={() => removeFile(files[0]?.id)}
                  aria-label="Hapus gambar"
                >
                  <XIcon className="size-4" />
                </button>
              )}

              {errors.length > 0 && (
                <div
                  className="mt-2 flex items-center gap-1 text-xs text-destructive"
                  role="alert"
                >
                  <AlertCircleIcon className="size-3 shrink-0" />
                  <span>{errors[0]}</span>
                </div>
              )}
            </div>
          </div>

          {/* Kanan: Deskripsi Bukti */}
          <div className="flex flex-col">
            <label className="mb-2 text-sm font-medium">Deskripsi Bukti Penyaluran</label>
            <textarea
              value={evidenceNote}
              onChange={(e) => setEvidenceNote(e.target.value)}
              placeholder="Tulis ringkasan penyaluran (tanggal, lokasi, penerima, dll.)"
              className="flex-1 min-h-[240px] sm:min-h-[280px] w-full rounded-xl border p-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>
        </div>

        {/* Catatan di bawah kedua input */}
        <p className="text-xs text-muted-foreground">
          Opsional. Maksimalkan kejelasan agar mudah diverifikasi (sertakan tanggal, lokasi,
          penerima, dan ringkasan penyaluran).
        </p>
      </div>
      {/* ==== /end Bukti Penyaluran ==== */}
    </>
  );
}

export default DetailWithdraw;
