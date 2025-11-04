"use client";

import { Separator } from "@/components/ui/separator";
import { formatRupiah } from "@/lib/utils";
import { User, WithdrawalRequest } from "@prisma/client";
import { useFileUpload, FileMetadata } from "@/hooks/use-file-upload";
import { AlertCircleIcon, ImageIcon, UploadIcon, XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

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
    maxSize: maxSize,
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

    if (files[0].file instanceof File) {
      return files[0].file.name;
    }
    return (files[0].file as FileMetadata).name;
  };

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
      <div className="space-y-2 text-sm sm:text-base">
        <h1 className="font-bold">Deskripsi</h1>
        <p>{description || "Deskripsi tidak diisi."}</p>
      </div>
      
      <div className="flex flex-col gap-2">
        <h1 className="font-bold text-sm sm:text-base">
          Upload Bukti Penyaluran
        </h1>
        <div className="relative">
          <div
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            data-dragging={isDragging || undefined}
            className="relative flex min-h-52 flex-col items-center justify-center overflow-hidden rounded-xl border border-dashed border-input p-4 transition-colors has-[input:focus]:border-ring has-[input:focus]:ring-[3px] has-[input:focus]:ring-ring/50 data-[dragging=true]:bg-accent/50"
          >
            <input {...getInputProps({ style: { display: "none" } })} />

            {previewUrl ? (
              <div className="absolute inset-0 flex items-center justify-center p-4">
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
                  <UploadIcon
                    className="-ms-1 size-2 opacity-60"
                    aria-hidden="true"
                  />
                  Pilih Bukti
                </Button>
              </div>
            )}
          </div>

          {previewUrl && (
            <div className="absolute top-4 right-4">
              <button
                type="button"
                className="z-50 flex size-8 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white transition-[color,box-shadow] outline-none hover:bg-black/80 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
                onClick={() => removeFile(files[0]?.id)}
                aria-label="Hapus gambar"
              >
                <XIcon className="size-4" aria-hidden="true" />
              </button>
            </div>
          )}
        </div>

        {errors.length > 0 && (
          <div
            className="flex items-center gap-1 text-xs text-destructive"
            role="alert"
          >
            <AlertCircleIcon className="size-3 shrink-0" />
            <span>{errors[0]}</span>
          </div>
        )}
      </div>
    </>
  );
}

export default DetailWithdraw;