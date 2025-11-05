import React from 'react'
import { getAllWithdrawalRequestsByCampaignId } from '@/data/withdrawal-request';
import { redirect } from 'next/navigation';
import FlowWithdraw from './flow-withdraw';
import { formatRupiah } from '@/lib/utils';

interface IProps {
  campaignId: number;
}

const LIMIT = 5;

async function WakafFlowWithdraw({ campaignId }: IProps) {
  const response = await getAllWithdrawalRequestsByCampaignId(campaignId, {
    limit: LIMIT
  });

  if (!response) redirect('/error');

  const { approvedAmount, availableBalance, data } = response;

  return (
    <>
      <div className="space-y-3">
        {/* Ringkasan saldo */}
        <div className="p-4 flex justify-between gap-4 border rounded-md">
          <h3 className="text-sm lg:text-base">
            Tersedia:{' '}
            <br className="sm:hidden" />
            <b className="text-secondary">{formatRupiah(availableBalance)}</b>
          </h3>
          <h3 className="text-sm lg:text-base">
            Tersalurkan:{' '}
            <br className="sm:hidden" />
            <b className="text-emerald-500">{formatRupiah(approvedAmount)}</b>
          </h3>
        </div>

        {/* Narasi sekali di atas */}
        <div className="p-4 sm:p-5 border rounded-md bg-amber-50 border-amber-200 text-amber-900">
          <h6 className="font-semibold mb-1">Alokasi Penyaluran Dana</h6>
          <p className="text-sm mb-1">
            Dalam setiap pencairan dana, terdapat ketentuan pembagian yang diterapkan
            agar penggunaan dana lebih terarah sesuai tujuan kampanye. Pembagian
            tersebut meliputi:
          </p>
          <ul className="list-disc ps-5 text-sm">
            <li>
              <b>20%</b> dialokasikan untuk biaya operasional, seperti administrasi,
              koordinasi lapangan, dan kebutuhan teknis pelaksanaan.
            </li>
            <li>
              <b>80%</b> disalurkan secara langsung kepada penerima manfaat atau korban
              bencana sesuai sasaran dari kampanye.
            </li>
          </ul>
        </div>

        {data.length === 0 ? (
          <div className="px-2">
            <p className="text-sm lg:text-base">Belum ada data pencairan dana.</p>
          </div>
        ) : (
          <FlowWithdraw data={data} limit={LIMIT} campaignId={campaignId} />
        )}
      </div>
    </>
  )
}

export default WakafFlowWithdraw
