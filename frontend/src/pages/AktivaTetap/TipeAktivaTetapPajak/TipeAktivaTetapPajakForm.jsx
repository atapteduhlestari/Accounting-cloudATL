import React, { useEffect, useState } from 'react';
import api from '../../../axios';

export default function TipeAktivaTetapPajakForm({ onClose, fetchData, selected }) {
  const [form, setForm] = useState({
    nama: '',
    metode_id: '',
    estimasi_umur_pajak: 0,
    tarif_penyusutan_pajak: 0,
  });
  const [metodeOptions, setMetodeOptions] = useState([]);

  useEffect(() => {
    const fetchMetode = async () => {
      const res = await api.get('/api/mst_metode_penyusutan_pajak'); // pastikan endpoint ini ada
      setMetodeOptions(res.data);
    };
    fetchMetode();

    if (selected) {
      setForm({
        nama: selected.nama,
        metode_id: selected.metode_id,
        estimasi_umur_pajak: selected.estimasi_umur_pajak,
        tarif_penyusutan_pajak: selected.tarif_penyusutan_pajak,
      });
    }
  }, [selected]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selected) {
      await api.put(`/api/tipe-aktiva-tetap-pajak/${selected.id}`, form);
    } else {
      await api.post('/api/tipe-aktiva-tetap-pajak', form);
    }
    fetchData();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/20">
      <div className="bg-white w-full max-w-2xl rounded-lg shadow-xl p-6 overflow-y-auto max-h-[90vh] relative">
        
        {/* Tombol Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          aria-label="Tutup"
        >
          <i className="bi bi-x-lg text-xl"></i>
        </button>

        {/* Judul Form */}
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          {selected ? 'Edit Tipe Aktiva Tetap Pajak' : 'Tambah Tipe Aktiva Tetap Pajak'}
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nama
            </label>
            <input
              type="text"
              name="nama"
              value={form.nama}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Metode Penyusutan Pajak
            </label>
            <select
              name="metode_id"
              value={form.metode_id}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            >
              <option value="">-- Pilih Metode --</option>
              {metodeOptions.map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {opt.nama}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Estimasi Umur Pajak (Tahun)
            </label>
            <input
              type="number"
              name="estimasi_umur_pajak"
              value={form.estimasi_umur_pajak}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tarif Penyusutan Pajak (%)
            </label>
            <input
              type="number"
              step="0.01"
              name="tarif_penyusutan_pajak"
              value={form.tarif_penyusutan_pajak}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Tombol Aksi */}
          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-6 py-2 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
