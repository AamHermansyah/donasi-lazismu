import { forwardRef } from "react";
import { FaCheck } from "react-icons/fa6";

interface IProps {
  onChange: (data: { mode: 'money' | 'goods'; payment?: { value: string; label: string; logo: string } }) => void;
}

const methodGroups = [
  {
    category: "Donasi Uang",
    methods: [
      { id: "midtrans-1", value: "Midtrans", label: "Midtrans", logo: "/images/midtrans-logo.png", description: "Semua metode pembayaran ada di sini." },
      { id: "cash-1", value: "Cash", label: "Cash Manual", logo: "/images/cash-logo.png", description: "Bayar tunai ke petugas. Verifikasi dengan kode." },
    ],
  },
  {
    category: "Donasi Barang",
    methods: [
      { id: "goods-1", value: "Goods", label: "Donasi Barang", logo: "/images/box-logo.png", description: "Sumbang barang pakai atau konsumsi." },
    ],
  },
];

const Step1 = forwardRef<HTMLDivElement, IProps>(({ onChange }, ref) => {
  return (
    <div ref={ref} className="flex-1 space-y-4">
      <div className="flex items-center gap-2">
        <span className="block px-4 py-1 rounded-full text-sm font-semibold bg-secondary/20 text-secondary">1</span>
        <h1 className="text-lg font-bold">Pilih metode donasi</h1>
      </div>

      {methodGroups.map((group, idx) => (
        <div key={idx} className="space-y-1">
          <h4 className="font-bold text-sm">{group.category}</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
            {group.methods.map((m) => (
              <div key={m.id} className="relative">
                <input
                  type="radio"
                  id={m.id}
                  name="donation-method"
                  value={m.value}
                  className="hidden peer"
                  onChange={() => {
                    if (m.value === "Goods") {
                      onChange({ mode: "goods" });
                    } else {
                      onChange({ mode: "money", payment: { value: m.value, label: m.label, logo: m.logo } });
                    }
                  }}
                />
                <label htmlFor={m.id} className="block cursor-pointer rounded-lg border peer-checked:border-secondary">
                  <div className="flex items-center gap-2 p-2 shadow-sm text-sm">
                    <div className="w-[80px] aspect-[4/3] text-lg rounded-md">
                      <img src={m.logo} alt="method logo" className="w-full h-full object-contain text-xs" />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold">{m.label}</div>
                      <p className="text-xs text-muted-foreground">{m.description}</p>
                    </div>
                  </div>
                </label>
                <FaCheck className="hidden peer-checked:block absolute top-[50%] -translate-y-[50%] right-4 text-xl text-secondary" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
});

Step1.displayName = "Step1";
export default Step1;
