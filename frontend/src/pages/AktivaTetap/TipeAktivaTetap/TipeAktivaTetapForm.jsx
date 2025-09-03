import React, { useEffect, useState } from 'react';
import api from '../../../axios';

const TipeAktivaTetapForm = ({ open, onClose, initialData, onSaved }) => {
  const isEdit = !!initialData;

  // hooks harus didefinisikan di awal, sebelum conditional return
  const [nama, setNama] = useState(initialData?.nama || '');
  const [tipePajakId, setTipePajakId] = useState(
    initialData?.tipe_pajak_id || initialData?.tipe_pajak?.id || ''
  );
  const [pajakOptions, setPajakOptions] = useState([]);

  // readonly fields (auto dari pilihan pajak)
  const [metodeNama, setMetodeNama] = useState(initialData?.metode_penyusutan_pajak || '');
  const [estimasiUmur, setEstimasiUmur] = useState(initialData?.estimasi_umur_pajak || '');
  const [tarif, setTarif] = useState(initialData?.tarif_penyusutan_pajak || '');

  useEffect(() => {
    const loadOptions = async () => {
      try {
        const res = await api.get('/api/tipe-aktiva-tetap-pajak');
        setPajakOptions(res.data);
      } catch (e) {
        console.error(e);
        alert('Gagal memuat opsi pajak.');
      }
    };
    loadOptions();
  }, []);

  useEffect(() => {
    if (!tipePajakId) return;
    const found = pajakOptions.find((o) => String(o.id) === String(tipePajakId));
    if (found) {
      setMetodeNama(found.metode_nama || '');
      setEstimasiUmur(found.estimasi_umur_pajak || '');
      setTarif(found.tarif_penyusutan_pajak || '');
    }
  }, [tipePajakId, pajakOptions]);

  const onSubmit = async (e) => {
    e.preventDefault();
    const payload = { nama, tipe_pajak_id: tipePajakId };
    try {
      if (isEdit) {
        await api.put(`/api/tipe-aktiva-tetap/${initialData.id}`, payload);
      } else {
        await api.post('/api/tipe-aktiva-tetap', payload);
      }
      onSaved?.();
      onClose();
    } catch (e) {
      console.error(e);
      if (e.response?.data?.message) alert(e.response.data.message);
      else alert('Gagal menyimpan.');
    }
  };

  // baru lakukan return conditional setelah semua hooks
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-2xl">
        <h2 className="text-lg font-semibold mb-4">
          {isEdit ? 'Edit Tipe Aktiva Tetap' : 'Tambah Tipe Aktiva Tetap'}
        </h2>
        <form className="space-y-4" onSubmit={onSubmit}>
          <div>
            <label className="block mb-1">Nama (Tipe Aktiva Tetap)</label>
            <input
              className="w-full border rounded px-3 py-2"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block mb-1">Tipe Aset Tetap Pajak</label>
            <select
              className="w-full border rounded px-3 py-2"
              value={tipePajakId}
              onChange={(e) => setTipePajakId(e.target.value)}
              required
            >
              <option value="">-- pilih --</option>
              {pajakOptions.map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {opt.nama}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <label className="block mb-1">Metode Penyusutan Pajak</label>
              <input
                className="w-full border rounded px-3 py-2 bg-gray-50"
                value={metodeNama}
                readOnly
              />
            </div>
            <div>
              <label className="block mb-1">Estimasi Umur Pajak</label>
              <input
                className="w-full border rounded px-3 py-2 bg-gray-50"
                value={estimasiUmur}
                readOnly
              />
            </div>
            <div>
              <label className="block mb-1">Tarif Penyusutan Pajak</label>
              <input
                className="w-full border rounded px-3 py-2 bg-gray-50"
                value={tarif}
                readOnly
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 px-4 py-2 rounded"
            >
              Batal
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              {isEdit ? 'Simpan Perubahan' : 'Simpan'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TipeAktivaTetapForm;
