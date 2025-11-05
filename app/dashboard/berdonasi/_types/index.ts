// _types/index.ts

// 1) Tambah tipe mode & detail barang
export type DonationMode = 'money' | 'goods';

export interface GoodsDetail {
  category: 'wearable' | 'consumption';
  name: string;
  qty: number;
  unit: string;
  condition: 'Baru' | 'Bagus' | 'Layak';
  note?: string;
  delivery: 'antar' | 'jemput' | 'kirim';
}

// 2) Perluas FormTypes (kompatibel dengan struktur lama)
export interface FormTypes {
  step1: {
    // NEW: mode donasi
    mode: DonationMode;
    // Tetap ada untuk mode money (biar kode lama tetap aman)
    amount: number;
  };
  step2: {
    // Tetap ada untuk mode money (nilai bisa null saat mode goods)
    paymentMethodId: null | string;
    paymentMethodLabel: null | string;
    paymentLogo: string;

    // NEW: hanya terisi saat mode goods
    goods?: GoodsDetail;
  };
  step3: {
    name: string;
    email: string;
    isHiddenName: boolean;
    message: string;
  }
}
