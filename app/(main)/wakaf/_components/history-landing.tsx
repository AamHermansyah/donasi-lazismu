import CardFlowWithdraw from '@/components/shared/card-flow-withdraw';
import { wakafPageWithdrawRequets } from '@/data/withdrawal-request';

const HistoryLanding = async () => {
  const data = await wakafPageWithdrawRequets();

  if (!data) return null;

  return (
    <div className="container mx-auto flex flex-col justify-center space-y-4 sm:space-y-8 mt-10">
      <h1 className="sm:text-center text-3xl sm:text-5xl xl:text-6xl font-bold text-secondary">
        Penyaluran Donasi Terbaru
      </h1>
      <p className="md:text-center xl:text-lg text-justify max-w-5xl mx-auto">
      Menampilkan laporan penyaluran <b>zakat, infak, sedekah, dan wakaf</b> oleh
      LAZISMU Kabupaten Tasikmalaya dalam 30 hari terakhir. Setiap donasi yang
      diterima dikelola secara <span className="text-secondary font-semibold">amanah, transparan, dan berdampak</span> untuk mendukung
      program pendidikan, ekonomi, dan sosial kemanusiaan.
      </p>
      <div className="pt-4">
        <ol className="relative border-s border-gray-200 max-w-5xl mx-auto">
          {data.map((item, index) => (
            <CardFlowWithdraw
              key={item.id}
              data={item}
              index={index}
              hiddenSortLabel
              showCampaignTitle
            />
          ))}
        </ol>
      </div>
    </div>
  );
};

export default HistoryLanding;
