import { auth } from "@/lib/auth"
import { getUserById } from "@/data/user"
import { db } from "@/lib/db"
import { formatRupiah } from "@/lib/utils";
import { NextResponse } from "next/server"

interface IParams {
  id?: string;
}

interface SuccessHandleParams {
  transactionId: string;
  campaignNumberOfWakif: number;
  userId: string;
  largestWakaf: number;
  campaignId: number;
  titleCampaign: string;
  collected: number;
  paymentMethodLabel: string;
  amount: number;
}

async function handleOnSuccess(data: SuccessHandleParams) {
  // Update status dan urutan wakif
  await db.transaction.update({
    where: { id: data.transactionId },
    data: {
      status: 'COMPLETED',
      numberOfWakif: data.campaignNumberOfWakif + 1,
      paymentMethodLabel: data.paymentMethodLabel
    }
  });

  // Update data wakaf dan berwakaf user
  await db.user.update({
    where: { id: data.userId },
    data: {
      berwakafCount: {
        increment: 1
      },
      berwakafTotal: {
        increment: data.amount
      },
      largestWakaf: data.largestWakaf >= data.amount ? data.largestWakaf : data.amount
    }
  });

  // Update data campaign
  const updatedCampaign = await db.campaign.update({
    where: { id: data.campaignId },
    data: {
      numberOfWakif: {
        increment: 1
      },
      collected: {
        increment: data.amount
      },
      availableBalance: {
        increment: data.amount
      },
      remaining: {
        decrement: data.amount
      }
    }
  });

  // Update data campaign jika sudah mencapai target
  if ((updatedCampaign.collected >= updatedCampaign.target) && updatedCampaign.status === 'RUNNING') {
    await db.campaign.update({
      where: { id: data.campaignId },
      data: {
        status: 'REACHED'
      }
    })

    await db.notification.create({
      data: {
        campaignId: data.campaignId,
        title: 'Hore... kampanye sudah mencapai target😍',
        type: 'SUCCESS',
        role: 'ADMIN',
        message: `
          Kampanye dengan judul <b>${data.titleCampaign}</b> telah berhasil mencapai 
          target dengan donasi terkumpul sebesar ${formatRupiah(data.collected)}. 
          Anda dapat melihat detail kampanye tersebut di 
          <a href="/dashboard/campaign/${data.campaignId}" target="_blank" rel="noopener noreferrer">
            halaman detail
          </a>.
        `
      }
    })
  }

  // Notifikasi pembayaran berhasil
  await db.notification.create({
    data: {
      userId: data.userId,
      title: 'Yayy... transaksi donasi berhasil',
      type: 'SUCCESS',
      message: `
        Serah terima donasi pada kampanye  
        <b>${data.titleCampaign}</b> 
        dengan nominal ${formatRupiah(data.amount)} berhasil dilakukan. 
        Terima kasih atas bantuan anda, donasi akan segera disalurkan💖. Lihat lebih rinci di 
        <a href="/dashboard/transaction/${data.transactionId}" target="_blank" rel="noopener noreferrer">
          halaman transaksi
        </a>.
      `
    }
  })
}

export async function POST(req: Request, { params }: { params: Promise<IParams> }) {
  try {
    const { id } = await params;
    const session = await auth();
    if (!session || !session.user) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    if (process.env.NODE_ENV !== "development") {
      return new NextResponse("Forbidden", { status: 403 });
    }

    const currentUser = await getUserById(session.user.id!);

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    if (!id) {
      return new NextResponse('Invalid input', { status: 400 });
    }

    const transaction = await db.transaction.findUnique({
      where: { id },
      include: {
        user: true
      }
    });

    if (
      !transaction ||
      (transaction.status !== 'PENDING') ||
      (transaction.userId !== currentUser.id)
    ) {
      return new NextResponse('Invalid input', { status: 400 });
    }

    const campaign = await db.campaign.findUnique({
      where: { id: transaction.campaignId },
    })

    if (!campaign) {
      return new NextResponse('Invalid input', { status: 400 });
    }

    await handleOnSuccess({
      campaignId: campaign.id,
      campaignNumberOfWakif: campaign.numberOfWakif,
      collected: campaign.collected,
      largestWakaf: transaction.user!.largestWakaf,
      paymentMethodLabel: `Midtrans Manual`,
      titleCampaign: campaign.title,
      transactionId: id,
      userId: currentUser.id,
      amount: transaction.amount,
    });

    await db.notification.create({
      data: {
        userId: transaction.userId,
        title: 'Transaksi donasi gagal',
        type: 'ERROR',
        message: `
          Serah terima donasi pada kampanye  
          <b>${campaign.title}</b> 
          dengan nominal ${formatRupiah(transaction.amount)} gagal dilakukan. 
          Hal ini terjadi karena batas pembayaran donasi telah kadaluarsa 
          atau anda membatalkannya dihalaman transaksi detail. Lihat lebih rinci di  
          <a href="/dashboard/transaction/${transaction.id}" target="_blank" rel="noopener noreferrer">
            halaman transaksi
          </a>.
        `
      }
    })

    return NextResponse.json(transaction, {
      status: 200
    });

  } catch (error: any) {
    console.log('POST FAILED STATUS TRANSACTION ERROR: ', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}