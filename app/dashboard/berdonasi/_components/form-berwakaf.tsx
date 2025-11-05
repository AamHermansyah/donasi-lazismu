'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import StepHeader from './step-header'
import Step1 from './step-1'
import { Separator } from '@/components/ui/separator'
import Step2 from './step-2'
import Step3 from './step-3'
import Step4 from './step-4'
import { Campaign } from '@prisma/client'
import { MIN_AMOUNT } from '../../_constants/data'
import { FormTypes } from '../_types'
import { Session } from 'next-auth'
import { VscLoading } from 'react-icons/vsc'
import axios, { AxiosError } from 'axios'
import { toast } from 'sonner'
import useAxiosErrorToast from '@/hooks/useAxiosErrorToast'
import { useRouter } from 'next/navigation'

interface IProps {
  data: Omit<Campaign, 'description'> | null;
  initialForm: FormTypes;
  user: Session['user'];
  campaignId: number | null;
}

function FormBerwakaf({ data, initialForm, user, campaignId }: IProps) {
  // ========================
  // STATE
  // ========================
  const [form, setForm] = useState<FormTypes>(initialForm);
  const [loading, setLoading] = useState(false);
  const [steps, setStep] = useState({
    stepsCount: [1, 2, 3, 4],
    currentStep: 1
  })

  const { handleAxiosErrorToast } = useAxiosErrorToast();
  const navigate = useRouter();

  // Refs untuk auto-height slider
  const formWrapperRef = useRef<HTMLDivElement>(null);
  const step1Ref = useRef<HTMLDivElement>(null);
  const step2Ref = useRef<HTMLDivElement>(null);
  const step3Ref = useRef<HTMLDivElement>(null);
  const step4Ref = useRef<HTMLDivElement>(null);

  // ========================
  // STEP NAV
  // ========================
  const handleNextStep = () => {
    setStep((prev) => ({
      ...prev,
      currentStep: Math.min(prev.currentStep + 1, prev.stepsCount.length)
    }))
  }

  const handlePrevStep = () => {
    setStep((prev) => ({
      ...prev,
      currentStep: Math.max(prev.currentStep - 1, 1)
    }))
  }

  // ========================
  // SUBMIT
  // ========================
  const handleSubmit = () => {
    if (!campaignId) return;

    setLoading(true);
    // Payload backend: tetap flat seperti sebelumnya.
    // Untuk mode 'goods', payment* boleh null dan akan ada field goods di step2.
    axios.post('/api/user/transaction', {
      ...form.step1,
      ...form.step2,
      ...form.step3,
      userId: user.id,
      campaignId,
      paymentLogo: undefined, // biar tidak tersimpan
    })
      .then((res) => {
        if (res.status === 201) {
          setTimeout(() => {
            navigate.push(`/dashboard/transaction/${res.data.id}`);
          }, 500);
        } else {
          setLoading(false);
          toast.error('Terjadi kesalahan di server');
        }
      })
      .catch((error: AxiosError) => {
        setLoading(false);
        if (error.response) {
          handleAxiosErrorToast(error.response!.status);
        } else {
          toast.error('Internal Error');
        }
      });
  }

  // ========================
  // VALIDASI NEXT BUTTON
  // ========================
  const disabledNextButton = useCallback(() => {
    const mode = form.step1.mode;

    switch (steps.currentStep) {
      case 1: {
        // Step 1 = pilih metode donasi
        if (mode === 'money') {
          const { paymentMethodId, paymentMethodLabel } = form.step2;
          return !paymentMethodId || !paymentMethodLabel;
        }
        // mode goods cukup memilih "Donasi Barang"
        return mode !== 'goods' && mode !== 'money';
      }
      case 2: {
        // Step 2 = branch
        if (mode === 'money') {
          const { amount } = form.step1;
          return amount < MIN_AMOUNT;
        } else {
          const g = form.step2.goods;
          // Validasi minimal barang
          if (!g) return true;
          const namaOk = g.name && g.name.trim().length > 0;
          const qtyOk = Number(g.qty) >= 1;
          const unitOk = g.unit && g.unit.trim().length > 0;
          const catOk = g.category === 'wearable' || g.category === 'consumption';
          const condOk = g.condition === 'Baru' || g.condition === 'Bagus' || g.condition === 'Layak';
          const delivOk = g.delivery === 'antar' || g.delivery === 'jemput' || g.delivery === 'kirim';
          return !(namaOk && qtyOk && unitOk && catOk && condOk && delivOk);
        }
      }
      case 3: {
        const { email, name } = form.step3;
        return !email || !name;
      }
      case 4:
      default:
        return false;
    }
  }, [steps.currentStep, form]);

  // ========================
  // AUTO-HEIGHT SLIDER
  // ========================
  const updateFormWrapperHeight = () => {
    if (!formWrapperRef.current) return;
    const el = formWrapperRef.current;

    const setH = (n?: number) => {
      if (n && n > 0) el.style.height = `${n + 4}px`;
    }

    switch (steps.currentStep) {
      case 1: setH(step1Ref.current?.clientHeight); break;
      case 2: setH(step2Ref.current?.clientHeight); break;
      case 3: setH(step3Ref.current?.clientHeight); break;
      case 4: setH(step4Ref.current?.clientHeight); break;
      default: break;
    }
  };

  useEffect(() => {
    updateFormWrapperHeight();
    const onResize = () => updateFormWrapperHeight();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [steps.currentStep])

  // ========================
  // RENDER
  // ========================
  return (
    <div className="w-full bg-background p-4 sm:p-6 rounded-xl shadow-sm space-y-2">
      <h2 className="text-lg font-bold text-secondary">Mari Berdonasi</h2>
      <StepHeader data={steps} />

      <div className="w-full overflow-x-hidden">
        <div
          ref={formWrapperRef}
          className="flex items-start gap-1 px-0.5 transition-all duration-500 overflow-y-hidden"
          style={{
            width: 100 * 4 + '%',
            transform: `translateX(-${100 / 4 * (steps.currentStep - 1)}%)`
          }}
        >
          {/* STEP 1: PILIH METODE DONASI (UANG / BARANG) */}
          <Step1
            ref={step1Ref}
            onChange={(payload) => {
              // payload: { mode: 'money' | 'goods', payment? }
              if (payload.mode === 'money') {
                setForm((prev) => ({
                  ...prev,
                  step1: { ...prev.step1, mode: 'money' },
                  step2: {
                    ...prev.step2,
                    paymentMethodId: payload.payment?.value ?? null,
                    paymentMethodLabel: payload.payment?.label ?? null,
                    paymentLogo: payload.payment?.logo ?? '',
                    goods: undefined,
                  },
                }));
              } else {
                // goods
                setForm((prev) => ({
                  ...prev,
                  step1: { ...prev.step1, mode: 'goods', amount: 0 },
                  step2: {
                    paymentMethodId: null,
                    paymentMethodLabel: null,
                    paymentLogo: '',
                    goods: {
                      category: 'wearable',
                      name: '',
                      qty: 1,
                      unit: 'pcs',
                      condition: 'Bagus',
                      note: '',
                      delivery: 'antar',
                    },
                  },
                }));
              }
            }}
          />

          {/* STEP 2: BRANCH - UANG (NOMINAL) / BARANG (DETAIL) */}
          <Step2
            ref={step2Ref}
            mode={form.step1.mode}
            onChangeMoney={(m) => {
              setForm((prev) => ({
                ...prev,
                step1: { ...prev.step1, amount: m.amount }
              }))
            }}
            onChangeGoods={(g) => {
              setForm((prev) => ({
                ...prev,
                step2: { ...prev.step2, goods: g }
              }))
            }}
          />

          {/* STEP 3: DATA PRIBADI */}
          <Step3
            ref={step3Ref}
            data={form.step3}
            onChange={(key, value) => {
              setForm((prev) => ({
                ...prev,
                step3: {
                  ...prev.step3,
                  [key]: value
                }
              }))
            }}
          />

          {/* STEP 4: RINGKASAN */}
          <Step4
            ref={step4Ref}
            data={form}
            user={user}
            onChangeStep={(step) => {
              // Step4 punya tombol "Ganti" → balik ke step tertentu
              setStep((prev) => ({
                ...prev,
                currentStep: step
              }))
            }}
          />
        </div>
      </div>

      {/* FOOTER NAVIGATION */}
      <div className="space-y-4">
        <Separator />
        <div className="flex gap-4">
          {steps.currentStep > 1 && (
            <Button
              onClick={handlePrevStep}
              variant="outline"
              className="w-full flex-1"
              disabled={!data || data.status !== 'RUNNING' || loading}
            >
              Kembali
            </Button>
          )}

          {steps.currentStep < steps.stepsCount.length ? (
            <Button
              onClick={handleNextStep}
              variant="secondary"
              className="w-full flex-1"
              disabled={!data || data.status !== 'RUNNING' || disabledNextButton() || loading}
            >
              Lanjutkan
            </Button>
          ) : (
            <Button
              variant="secondary"
              className="w-full flex-1 gap-2"
              disabled={!data || data.status !== 'RUNNING' || loading}
              onClick={handleSubmit}
            >
              {loading && <VscLoading className="animate-spin" />}
              Konfirmasi
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

export default FormBerwakaf
