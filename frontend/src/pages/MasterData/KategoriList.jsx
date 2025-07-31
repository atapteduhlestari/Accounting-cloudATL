import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import api from '../../axios';

const KategoriList = () => {
  const [kategoris, setKategoris] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editKategori, setEditKategori] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [formData, setFormData] = useState({ nama: '' });

  useEffect(() => {
    fetchKategoris();
  }, []);

  const fetchKategoris = async () => {
    try {
      const response = await api.get('/api/kategoris');
      setKategoris(response.data.data);
    } catch (error) {
      console.error('Gagal mengambil data kategori:', error);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editKategori) {
        await api.put(`/api/kategoris/${editKategori.id}`, formData);
      } else {
        await api.post('/api/kategoris', formData);
      }
      fetchKategoris();
      closeModal();
    } catch (error) {
      console.error('Gagal menyimpan data:', error);
    }
  };

  const handleEdit = (kategori) => {
    setFormData({ nama: kategori.nama });
    setEditKategori(kategori);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    setConfirmDeleteId(id);
  };

  const confirmDelete = async () => {
    try {
      await api.delete(`/api/kategoris/${confirmDeleteId}`);
      fetchKategoris();
      setConfirmDeleteId(null);
    } catch (error) {
      console.error('Gagal menghapus data:', error);
    }
  };

  const openModal = () => {
    setFormData({ nama: '' });
    setEditKategori(null);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setFormData({ nama: '' });
    setEditKategori(null);
  };

  return (
    <Layout>
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Master Kategori</h2>
          <button
            onClick={openModal}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            + Kategori Baru
          </button>
        </div>

        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2 w-20 text-center">No</th>
              <th className="border p-2">Nama Kategori</th>
              <th className="border p-2 text-center">Kode</th>
              <th className="border p-2 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {kategoris.map((kategori, index) => (
              <tr key={kategori.id}>
                <td className="border p-2 text-center">{index + 1}</td>
                <td className="border p-2">{kategori.nama}</td>
                <td className="border p-2 text-center">{kategori.kode}</td>
                <td className="border p-2 text-center">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => handleEdit(kategori)}
                      className="bg-blue-50 hover:bg-blue-100 text-blue-600 hover:text-blue-800 px-3 py-2 rounded-md transition duration-200"
                      title="Edit"
                    >
                      <i className="bi bi-pencil-fill"></i>
                    </button>
                    <button
                      onClick={() => handleDelete(kategori.id)}
                      className="bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-800 px-3 py-2 rounded-md transition duration-200"
                      title="Hapus"
                    >
                      <i className="bi bi-trash-fill"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {kategoris.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center p-4">
                  Tidak ada kategori.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/20">
            <div className="bg-white p-6 rounded w-full max-w-md relative shadow-lg">
              <h2 className="text-lg mb-4 font-semibold">
                {editKategori ? 'Edit Kategori' : 'Tambah Kategori'}
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">
                    Nama Kategori
                  </label>
                  <input
                    name="nama"
                    value={formData.nama}
                    onChange={handleChange}
                    className="w-full border px-3 py-2 rounded"
                    required
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="px-4 py-2 bg-gray-300 rounded"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded"
                  >
                    {editKategori ? 'Update' : 'Simpan'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {confirmDeleteId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/20">
            <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
              <h2 className="text-lg font-semibold mb-4 text-red-600 flex items-center">
                <i className="bi bi-exclamation-triangle-fill mr-2 text-xl" />
                Konfirmasi Hapus
              </h2>
              <p className="mb-6 text-sm text-gray-700">
                Apakah Anda yakin ingin menghapus kategori ini?
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

export default KategoriList;
