import { forwardRef } from 'react'
import { FaCheck } from 'react-icons/fa6'

interface IProps {
  onChange: (payment: {
    value: string,
    label: string,
    logo: string
  }) => void;
}

const paymentMethods = [
  {
    category: "All in One",
    methods: [
      {
        id: 'midtrans-1',
        value: 'Midtrans',
        label: 'Midtrans',
        logo: '/images/midtrans-logo.png',
        description: 'Semua metode pembayaran ada disini.'
      },
      {
        id: 'cash-1',
        value: 'Cash',
        label: 'Cash Manual',
        logo: '/images/cash-logo.png',
        description: 'Bayar tunai ke petugas. Verifikasi dengan kode (segera hadir).'
      },
    ]
  },
];

const Step2 = forwardRef<HTMLDivElement, IProps>(({ onChange }, ref) => {
  return (
    <div ref={ref} className="flex-1 space-y-4">
      <div className="flex items-center gap-2">
        <span className="block px-4 py-1 rounded-full text-sm font-semibold bg-secondary/20 text-secondary">2</span>
        <h1 className="text-lg font-bold">Pilih metode donasi</h1>
      </div>

      {paymentMethods.map((category, index) => (
        <div key={index} className="space-y-1">
          <h4 className="font-bold text-sm">{category.category}</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
            {category.methods.map((method) => (
              <div key={method.id} className="relative">
                <input
                  type="radio"
                  id={method.id}
                  name="payment-method"
                  value={method.value}
                  className="hidden peer"
                  onChange={() => {
                    onChange({
                      value: method.value,
                      label: method.label,
                      logo: method.logo
                    })
                  }}
                />
                <label
                  htmlFor={method.id}
                  className="block cursor-pointer rounded-lg border peer-checked:border-secondary"
                >
                  <div className="flex items-center gap-2 p-2 shadow-sm text-sm">
                    <div className="w-[80px] aspect-[4/3] text-lg rounded-md">
                      <img
                        src={method.logo}
                        alt="payment logo"
                        className="w-full h-full object-contain text-xs"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold">{method.label}</div>
                      <p className="text-xs text-muted-foreground">{method.description}</p>
                    </div>
                  </div>
                </label>

                <FaCheck
                  className="
                    hidden
                    peer-checked:block
                    absolute 
                    top-[50%] 
                    -translate-y-[50%] 
                    right-4 
                    text-xl 
                    text-secondary
                  "
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
})

Step2.displayName = 'Step2'
export default Step2
