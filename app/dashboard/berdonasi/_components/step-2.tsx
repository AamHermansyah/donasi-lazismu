import { forwardRef, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { cn, addThousandSeparatorNumber, formatRupiah } from "@/lib/utils";

type Mode = 'money' | 'goods';
type GoodsCategory = 'wearable' | 'consumption';
type GoodsDelivery = 'antar' | 'jemput' | 'kirim';

interface Step2MoneyOut {
  amount: number;
}
interface Step2GoodsOut {
  category: GoodsCategory;
  name: string;
  qty: number;
  unit: string;
  condition: 'Baru' | 'Bagus' | 'Layak';
  note?: string;
  delivery: GoodsDelivery;
}

interface IProps {
  mode: Mode; // dari Step1
  onChangeMoney?: (data: Step2MoneyOut) => void;
  onChangeGoods?: (data: Step2GoodsOut) => void;
}

const radioAmounts = [
  { id: "amount-1", value: 20000, emote: "🥰" },
  { id: "amount-2", value: 50000, emote: "🤗" },
  { id: "amount-3", value: 100000, emote: "😍" },
  { id: "amount-4", value: 150000, emote: "🤩" },
  { id: "amount-5", value: 250000, emote: "✨" },
  { id: "amount-6", value: 500000, emote: "💖" },
];

const Step2 = forwardRef<HTMLDivElement, IProps>(({ mode, onChangeMoney, onChangeGoods }, ref) => {
  // money state
  const [inputType, setInputType] = useState<'radio' | 'input'>('radio');
  const inputRef = useRef<HTMLInputElement>(null);

  // goods state
  const [goods, setGoods] = useState<Step2GoodsOut>({
    category: 'wearable',
    name: '',
    qty: 1,
    unit: 'pcs',
    condition: 'Bagus',
    note: '',
    delivery: 'antar',
  });

  const handleGoodsChange = <K extends keyof Step2GoodsOut>(key: K, value: Step2GoodsOut[K]) => {
    const next = { ...goods, [key]: value };
    setGoods(next);
    onChangeGoods?.(next);
  };

  return (
    <div ref={ref} className="flex-1 space-y-4">
      <div className="flex items-center gap-2">
        <span className="block px-4 py-1 rounded-full text-sm font-semibold bg-secondary/20 text-secondary">2</span>
        <h1 className="text-lg font-bold">
          {mode === 'money' ? 'Pilih nominal' : 'Detail Donasi Barang'}
        </h1>
      </div>

      {mode === 'money' ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {radioAmounts.map((item) => (
              <div key={item.id}>
                <input
                  type="radio"
                  id={item.id}
                  name="amount"
                  value={`${item.value}`}
                  className="hidden peer"
                  onChange={(e) => {
                    onChangeMoney?.({ amount: +e.target.value });
                  }}
                />
                <label
                  htmlFor={item.id}
                  onClick={() => {
                    if (inputRef.current && inputType === 'input') {
                      setInputType('radio');
                      inputRef.current.value = '';
                      onChangeMoney?.({ amount: item.value });
                    }
                  }}
                  className={cn(
                    'block cursor-pointer hover:bg-muted rounded-lg border transition',
                    inputType === 'radio' ? 'peer-checked:border-secondary peer-checked:bg-secondary/10' : ''
                  )}
                >
                  <div className="flex items-center gap-2 p-4 shadow-sm text-lg sm:text-xl font-extrabold">
                    <span className="text-3xl sm:text-4xl">{item.emote}</span>
                    {formatRupiah(item.value)}
                  </div>
                </label>
              </div>
            ))}
          </div>

          <div className="border p-4 rounded-lg space-y-2">
            <h2>Nominal donasi lainnya</h2>
            <label className="relative block bg-gray-100 rounded-md">
              <span className="absolute left-4 top-[50%] -translate-y-[50%] font-extrabold text-lg sm:text-xl">Rp</span>
              <Input
                ref={inputRef}
                className="pl-14 pr-4 py-3 h-auto text-right font-extrabold text-xl sm:text-2xl bg-transparent border-0 focus-visible:ring-transparent focus-visible:ring-0"
                placeholder="0"
                onChange={(e) => {
                  if (inputType !== 'input') setInputType('input');
                  const value = +e.target.value.replace(/[^0-9]/g, '');
                  e.target.value = addThousandSeparatorNumber(value);
                  onChangeMoney?.({ amount: value });
                }}
              />
            </label>
            <span className="block text-xs font-semibold text-gray-400">Minimal donasi sebesar Rp20.000<sup>*</sup></span>
          </div>
        </>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label>Kategori</Label>
              <Select
                defaultValue={goods.category}
                onValueChange={(v: GoodsCategory) => handleGoodsChange('category', v)}
              >
                <SelectTrigger><SelectValue placeholder="Pilih kategori" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="wearable">Barang Pakai (wearable)</SelectItem>
                  <SelectItem value="consumption">Barang Konsumsi (consumption)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1">
              <Label>Nama Barang</Label>
              <Input placeholder="Contoh: Seragam sekolah, selimut, beras 5 kg"
                     onChange={(e) => handleGoodsChange('name', e.target.value)} />
            </div>

            <div className="space-y-1">
              <Label>Jumlah</Label>
              <Input type="number" min={1} defaultValue={goods.qty}
                     onChange={(e) => handleGoodsChange('qty', Math.max(1, +e.target.value || 1))} />
            </div>

            <div className="space-y-1">
              <Label>Satuan</Label>
              <Input placeholder="pcs, kg, liter, pack" defaultValue={goods.unit}
                     onChange={(e) => handleGoodsChange('unit', e.target.value)} />
            </div>

            <div className="space-y-1">
              <Label>Kondisi</Label>
              <Select defaultValue={goods.condition}
                      onValueChange={(v: 'Baru' | 'Bagus' | 'Layak') => handleGoodsChange('condition', v)}>
                <SelectTrigger><SelectValue placeholder="Pilih kondisi" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Baru">Baru</SelectItem>
                  <SelectItem value="Bagus">Bagus</SelectItem>
                  <SelectItem value="Layak">Layak</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1">
              <Label>Cara Serah Terima</Label>
              <Select defaultValue={goods.delivery}
                      onValueChange={(v: GoodsDelivery) => handleGoodsChange('delivery', v)}>
                <SelectTrigger><SelectValue placeholder="Pilih cara" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="antar">Antar ke lokasi</SelectItem>
                  <SelectItem value="jemput">Jemput oleh petugas</SelectItem>
                  <SelectItem value="kirim">Kirim via ekspedisi</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-1">
            <Label>Catatan (opsional)</Label>
            <Textarea placeholder="Ukuran L, beras premium, exp 10/2026, dsb."
                      onChange={(e) => handleGoodsChange('note', e.target.value)} />
          </div>

          {/* Jika ingin langsung upload foto barang, aktifkan blok berikut dan handle di parent */}
          {/* <div className="space-y-1">
            <Label>Foto Barang (opsional)</Label>
            <Input type="file" multiple accept="image/*" />
          </div> */}

          <div className="pt-2">
            <Button type="button" variant="outline" disabled className="opacity-60 cursor-not-allowed">
              Simpan Detail (otomatis)
            </Button>
          </div>
        </>
      )}
    </div>
  );
});

Step2.displayName = "Step2";
export default Step2;
