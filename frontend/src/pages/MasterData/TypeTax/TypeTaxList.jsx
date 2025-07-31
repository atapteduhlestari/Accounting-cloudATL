import React, { useEffect, useState } from 'react';
import api from '../../../axios';
import Layout from '../../../components/Layout';
import TypeTaxForm from './TypeTaxForm';

const TypeTaxList = () => {
  const [typeTaxes, setTypeTaxes] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTypeTax, setSelectedTypeTax] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  const fetchData = async () => {
    try {
      const res = await api.get('/api/type-tax');
      setTypeTaxes(res.data);
    } catch (err) {
      console.error('Gagal mengambil data:', err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = (id) => {
    setConfirmDeleteId(id); // buka modal konfirmasi
  };

  const confirmDelete = async () => {
    try {
      await api.delete(`/api/type-tax/${confirmDeleteId}`);
      fetchData();
      setConfirmDeleteId(null);
    } catch (err) {
      console.error('Gagal menghapus data:', err);
      alert('Terjadi kesalahan saat menghapus data.');
    }
  };

  const handleEdit = (item) => {
    setSelectedTypeTax(item);
    setModalOpen(true);
  };

  const handleAdd = () => {
    setSelectedTypeTax(null);
    setModalOpen(true);
  };

  return (
    <Layout>
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Master Type Tax</h2>
          <button
            onClick={handleAdd}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            + Tambah
          </button>
        </div>

        <table className="w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2 text-center">No</th>
              <th className="border p-2">Nama</th>
              <th className="border p-2 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {typeTaxes.length > 0 ? (
              typeTaxes.map((item, index) => (
                <tr key={item.id}>
                  <td className="border p-2 text-center">{index + 1}</td>
                  <td className="border p-2">{item.nama}</td>
                  <td className="border p-2 flex justify-center gap-2">
                    <button
                      onClick={() => handleEdit(item)}
                      className="bg-blue-50 hover:bg-blue-100 text-blue-600 hover:text-blue-800 px-3 py-2 rounded-md transition duration-200"
                      title="Edit"
                    >
                      <i className="bi bi-pencil-fill"></i>
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-800 px-3 py-2 rounded-md transition duration-200"
                      title="Hapus"
                    >
                      <i className="bi bi-trash-fill"></i>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center p-4">
                  Tidak ada data.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Modal Tambah/Edit */}
        {modalOpen && (
          <TypeTaxForm
            onClose={() => setModalOpen(false)}
            fetchData={fetchData}
            data={selectedTypeTax}
          />
        )}

        {/* Modal Konfirmasi Hapus */}
        {confirmDeleteId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
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
};

export default TypeTaxList;
