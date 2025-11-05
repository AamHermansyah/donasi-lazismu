import OverviewCampaign from "./_components/overview-campaign";
import HowToWakaf from "./_components/how-to-wakaf";
import FormBerwakaf from "./_components/form-berwakaf";
import { Campaign } from "@prisma/client";
import { getCampaignById } from "@/data/campaign";
import { FormTypes } from "./_types";
import { auth } from "@/lib/auth";

type PageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function BerwakafPage({ searchParams }: PageProps) {
  const session = await auth();

  // Unwrap searchParams (karena sekarang Promise)
  const sp = await searchParams;
  const raw = sp.campaign_id;
  const campaignId = Array.isArray(raw) ? raw[0] : raw;

  let selectedCampaign: Omit<Campaign, "description"> | null = null;

  if (campaignId && !isNaN(Number(campaignId))) {
    selectedCampaign = await getCampaignById(Number(campaignId), {
      withoutDescription: true,
    });
  }

  const initialForm: FormTypes = {
    step1: {
      mode: 'money',   // <-- WAJIB ADA SEKARANG
      amount: 0,
    },
    step2: {
      paymentMethodId: null,
      paymentMethodLabel: null,
      paymentLogo: "",
      // goods: akan diisi otomatis saat user pilih "Donasi Barang" di Step 1
    },
    step3: {
      name: session?.user?.name || "",
      email: session?.user?.email || "",
      isHiddenName: false,
      message: "",
    },
  };

  return (
    <div className="w-full grid items-start grid-cols-12 gap-4">
      <div className="col-span-12 md:col-span-5">
        <OverviewCampaign data={selectedCampaign} />
      </div>
      <div className="col-span-12 md:col-span-7">
        <FormBerwakaf
          data={selectedCampaign}
          initialForm={initialForm}
          user={session?.user!}
          campaignId={selectedCampaign ? selectedCampaign.id : null}
        />
      </div>
      <div className="p-4 sm:p-6 rounded-lg bg-background col-span-12 md:hidden">
        <HowToWakaf />
      </div>
    </div>
  );
}
