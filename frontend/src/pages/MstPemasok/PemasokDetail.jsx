import React from 'react';

const PemasokDetail = ({ show, onClose, data }) => {
  if (!show || !data) return null;

  const {
    no_pemasok,
    nama,
    alamat,
    kota,
    provinsi,
    kode_pos,
    negara,
    telepon,
    faksimili,
    kontak,
    email,
    website,
    saldo_awal,
    saldo_awal_tanggal,
    currency,
    termin,
    pajak1,
    pajak2,
    npwp,
    tax_type,
    pesan,
    catatan,
    kontak_pemasok = [],
  } = data;

  const formatCurrency = (value) => {
    if (!value) return '0.00';
    return parseFloat(value).toLocaleString('id-ID', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/20">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex justify-between items-center border-b p-4 sticky top-0 bg-white z-10">
          <h2 className="text-xl font-bold text-gray-800">
            Detail Pemasok
            <span className="ml-2 text-gray-600 font-normal">
              ({no_pemasok})
            </span>
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <i className="bi bi-x-lg text-xl"></i>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-lg mb-3 pb-2 border-b">
                Informasi Umum
              </h3>
              <div className="space-y-2">
                <div className="flex">
                  <span className="w-40 font-medium text-gray-600">Nama</span>
                  <span>: {nama}</span>
                </div>
                <div className="flex">
                  <span className="w-40 font-medium text-gray-600">Alamat</span>
                  <span>: {alamat}</span>
                </div>
                <div className="flex">
                  <span className="w-40 font-medium text-gray-600">Kota</span>
                  <span>: {kota}, {provinsi} {kode_pos}</span>
                </div>
                <div className="flex">
                  <span className="w-40 font-medium text-gray-600">Negara</span>
                  <span>: {negara}</span>
                </div>
                <div className="flex">
                  <span className="w-40 font-medium text-gray-600">Telepon</span>
                  <span>: {telepon}</span>
                </div>
                <div className="flex">
                  <span className="w-40 font-medium text-gray-600">Faksimili</span>
                  <span>: {faksimili}</span>
                </div>
                <div className="flex">
                  <span className="w-40 font-medium text-gray-600">Kontak</span>
                  <span>: {kontak}</span>
                </div>
                <div className="flex">
                  <span className="w-40 font-medium text-gray-600">Email</span>
                  <span>: {email}</span>
                </div>
                <div className="flex">
                  <span className="w-40 font-medium text-gray-600">Website</span>
                  <span>: {website}</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-3 pb-2 border-b">
                Keuangan & Pajak
              </h3>
              <div className="space-y-2">
                <div className="flex">
                  <span className="w-40 font-medium text-gray-600">Mata Uang</span>
                  <span>: {currency?.name || '-'}</span>
                </div>
                <div className="flex">
                  <span className="w-40 font-medium text-gray-600">Saldo Awal</span>
                  <span>: {formatCurrency(saldo_awal)}</span>
                </div>
                <div className="flex">
                  <span className="w-40 font-medium text-gray-600">Per Tanggal</span>
                  <span>: {saldo_awal_tanggal || '-'}</span>
                </div>
                <div className="flex">
                  <span className="w-40 font-medium text-gray-600">Termin</span>
                  <span>: {termin?.name || '-'}</span>
                </div>
                <div className="flex">
                  <span className="w-40 font-medium text-gray-600">NPWP</span>
                  <span>: {npwp || '-'}</span>
                </div>
                <div className="flex">
                  <span className="w-40 font-medium text-gray-600">Pajak 1</span>
                  <span>: {pajak1?.nama || '-'}</span>
                </div>
                <div className="flex">
                  <span className="w-40 font-medium text-gray-600">Pajak 2</span>
                  <span>: {pajak2?.nama || '-'}</span>
                </div>
                <div className="flex">
                  <span className="w-40 font-medium text-gray-600">Jenis Pajak</span>
                  <span>: {tax_type?.nama || '-'}</span>
                </div>
              </div>
            </div>
          </div>

          {pesan && (
            <div>
              <h3 className="font-semibold text-lg mb-3 pb-2 border-b">Pesan</h3>
              <div className="bg-gray-50 p-4 rounded border">{pesan}</div>
            </div>
          )}

          {catatan && (
            <div>
              <h3 className="font-semibold text-lg mb-3 pb-2 border-b">Catatan</h3>
              <div className="bg-gray-50 p-4 rounded border whitespace-pre-line">{catatan}</div>
            </div>
          )}

          <div>
            <h3 className="font-semibold text-lg mb-3 pb-2 border-b">
              Kontak Pemasok
            </h3>
            <div className="overflow-x-auto">
              <table className="min-w-full border">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border p-2 text-left">Nama</th>
                    <th className="border p-2 text-left">Nama Depan</th>
                    <th className="border p-2 text-left">Jabatan</th>
                    <th className="border p-2 text-left">Telepon</th>
                  </tr>
                </thead>
                <tbody>
                  {kontak_pemasok.length > 0 ? (
                    kontak_pemasok.map((k, idx) => (
                      <tr key={idx}>
                        <td className="border p-2">{k.nama_belakang}</td>
                        <td className="border p-2">{k.nama_depan}</td>
                        <td className="border p-2">{k.jabatan}</td>
                        <td className="border p-2">{k.seluler}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="text-center p-4 text-gray-500">
                        Tidak ada data kontak.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex justify-end border-t p-4 sticky bottom-0 bg-white">
          <button
            onClick={onClose}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};

export default PemasokDetail;
