import React, { useEffect, useState } from 'react';
import api from '../../../axios';

const TypeTaxForm = ({ onClose, fetchData, data }) => {
  const [nama, setNama] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (data) {
      setNama(data.nama);
    } else {
      setNama('');
    }
  }, [data]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (data) {
        await api.put(`/api/type-tax/${data.id}`, { nama });
      } else {
        await api.post('/api/type-tax', { nama });
      }
      fetchData();
      onClose();
    } catch (err) {
      console.error('Gagal menyimpan data:', err);
      alert('Terjadi kesalahan saat menyimpan data.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4">
          {data ? 'Edit Type Tax' : 'Tambah Type Tax'}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1">Nama</label>
            <input
              type="text"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 px-4 py-2 rounded"
              disabled={loading}
            >
              Batal
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded"
              disabled={loading}
            >
              {loading ? 'Menyimpan...' : 'Simpan'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TypeTaxForm;
