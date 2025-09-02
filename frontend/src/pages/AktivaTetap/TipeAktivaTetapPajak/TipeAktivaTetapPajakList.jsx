import React, { useEffect, useState } from 'react';
import Layout from '../../../components/Layout';
import api from '../../../axios';
import TipeAktivaTetapPajakForm from './TipeAktivaTetapPajakForm';

export default function TipeAktivaTetapPajakList() {
  const [data, setData] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selected, setSelected] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  const fetchData = async () => {
    try {
      const res = await api.get('/api/tipe-aktiva-tetap-pajak');
      setData(res.data);
    } catch (error) {
      console.error('Gagal mengambil data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEdit = (item) => {
    setSelected(item);
    setShowForm(true);
  };

  const confirmDelete = async () => {
    try {
      await api.delete(`/api/tipe-aktiva-tetap-pajak/${confirmDeleteId}`);
      fetchData();
      setConfirmDeleteId(null);
    } catch (error) {
      console.error('Gagal menghapus data:', error);
    }
  };

  return (
    <Layout>
      <div className="p-4">
        {/* Header + Tombol Tambah */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Tipe Aktiva Tetap Pajak</h2>
          <button
            onClick={() => { setSelected(null); setShowForm(true); }}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            + Tambah
          </button>
        </div>

        {/* Tabel */}
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border text-left">Nama</th>
              <th className="p-2 border text-left">Metode Deskripsi</th>
              <th className="p-2 border text-center">Estimasi Umur Pajak</th>
              <th className="p-2 border text-center">Tarif Penyusutan Pajak</th>
              <th className="p-2 border text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((item) => (
                <tr key={item.id} className="border-b">
                  <td className="p-2 border">{item.nama}</td>
                  <td className="p-2 border">{item.metode?.nama || '-'}</td>
                  <td className="p-2 border text-center">{item.estimasi_umur_pajak} Tahun</td>
                  <td className="p-2 border text-center">{item.tarif_penyusutan_pajak} %</td>
                  <td className="p-2 border text-center">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => handleEdit(item)}
                        className="bg-blue-50 hover:bg-blue-100 text-blue-600 hover:text-blue-800 px-3 py-2 rounded-md transition duration-200"
                        title="Edit"
                      >
                        <i className="bi bi-pencil-fill"></i>
                      </button>
                      <button
                        onClick={() => setConfirmDeleteId(item.id)}
                        className="bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-800 px-3 py-2 rounded-md transition duration-200"
                        title="Hapus"
                      >
                        <i className="bi bi-trash-fill"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center p-4">
                  Tidak ada data tipe aktiva tetap pajak.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Modal Form */}
        {showForm && (
          <TipeAktivaTetapPajakForm
            onClose={() => setShowForm(false)}
            fetchData={fetchData}
            selected={selected}
          />
        )}

        {/* Modal Konfirmasi Hapus */}
        {confirmDeleteId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/20">
            <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
              <h2 className="text-lg font-semibold mb-4 text-red-600 flex items-center">
                <i className="bi bi-exclamation-triangle-fill mr-2 text-xl" />
                Konfirmasi Hapus
              </h2>
              <p className="mb-6 text-sm text-gray-700">
                Apakah Anda yakin ingin menghapus data ini?
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setConfirmDeleteId(null)}
                  className="px-4 py-2 rounded text-gray-600 hover:text-black"
                >
                  Batal
                </button>
                <button
                  onClick={confirmDelete}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
                >
                  Hapus
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
