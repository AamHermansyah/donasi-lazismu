import CardFlowWithdraw from '@/components/shared/card-flow-withdraw';
import { wakafPageWithdrawRequets } from '@/data/withdrawal-request';

const HistoryLanding = async () => {
  const data = await wakafPageWithdrawRequets();
  if (!data) return null;

  return (
    <div className="container mx-auto flex flex-col justify-center space-y-4 sm:space-y-8 mt-10">
      {/* Judul */}
      <h1 className="sm:text-center text-3xl sm:text-5xl xl:text-6xl font-bold text-secondary">
        Penyaluran Donasi Terbaru
      </h1>

      {/* Narasi header */}
      <p className="md:text-center xl:text-lg text-justify max-w-5xl mx-auto">
        Menampilkan laporan penyaluran <b>zakat, infak, sedekah, dan wakaf</b> oleh
        LAZISMU Kabupaten Tasikmalaya dalam 30 hari terakhir. Setiap donasi yang
        diterima dikelola secara <span className="text-secondary font-semibold">amanah, transparan, dan berdampak</span> untuk mendukung
        program pendidikan, ekonomi, dan sosial kemanusiaan.
      </p>

      {/* Narasi alokasi 20/80 */}
      <div className="max-w-5xl mx-auto w-full">
        <div className="p-4 sm:p-5 rounded-md border bg-amber-50 border-amber-200 text-amber-900">
          <h6 className="font-semibold mb-1">Alokasi Penyaluran Dana</h6>
          <p className="text-sm mb-1">
            Setiap pencairan dana menerapkan pembagian berikut agar penggunaan dana
            tepat sasaran sesuai tujuan kampanye:
          </p>
          <ul className="list-disc ps-5 text-sm space-y-1">
            <li>
              <b>20%</b> untuk biaya operasional pelaksanaan (administrasi, koordinasi lapangan,
              dokumentasi, serta kebutuhan teknis kegiatan).
            </li>
            <li>
              <b>80%</b> disalurkan langsung kepada penerima manfaat/korban bencana sesuai sasaran program.
            </li>
          </ul>
        </div>
      </div>

      {/* Timeline penyaluran */}
      <div className="pt-2 sm:pt-4">
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
