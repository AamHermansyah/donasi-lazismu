import OverviewCampaign from './_components/overview-campaign'
import HowToDonate from './_components/how-to-donate'
import FormBerwakaf from './_components/form-berwakaf'
import { Campaign } from '@prisma/client';
import { getCampaignById } from '@/data/campaign';
import { FormTypes } from './_types';
import { auth } from '@/lib/auth';
import { getUserByEmail } from '@/data/user';

interface IProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

async function BerwakafPage({ searchParams }: IProps) {
  const session = await auth();

  let selectedCampaign: Omit<Campaign, 'description'> | null = null;
  const { campaign_id } = await searchParams;
  if (campaign_id && !isNaN(+campaign_id)) {
    selectedCampaign = await getCampaignById(+campaign_id, {
      withoutDescription: true
    });
  }

  const user = await getUserByEmail(session?.user?.email || '');

  if (!user) throw new Error('User not found');

  const initialForm: FormTypes = {
    step1: {
      amount: 0
    },
    step2: {
      paymentMethodId: null,
      paymentMethodLabel: null,
      paymentLogo: '',
    },
    step3: {
      name: user.name || '',
      email: user.email || '',
      address: user.address || '',
      phone: user.phoneNumber || '',
      isHiddenName: false,
      message: ''
    },
  }

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
          campaignId={!!selectedCampaign ? selectedCampaign.id : null}
        />
      </div>
      <div className="p-4 sm:p-6 rounded-lg bg-background col-span-12 md:hidden">
        <HowToDonate />
      </div>
    </div>
  )
}

export default BerwakafPage