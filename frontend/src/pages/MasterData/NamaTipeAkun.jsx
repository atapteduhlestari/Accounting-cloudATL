import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import api from '../../axios';

const NamaTipeAkun = () => {
  const [tipeAkuns, setTipeAkuns] = useState([]);
  const [kategoris, setKategoris] = useState([]);
  const [form, setForm] = useState({
    id: null,
    nama: '',
    kategori_id: '', 
    is_currency_required: false,
    is_opening_balance_required: false,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchTipeAkuns();
    fetchKategoris();
  }, []);

  const fetchTipeAkuns = async () => {
    try {
      const res = await api.get('/api/tipe-akun');
      setTipeAkuns(res.data);
    } catch (err) {
      console.error('Gagal mengambil data tipe akun:', err);
    }
  };

  const handleCheckboxChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.checked });
  };
  

  const fetchKategoris = async () => {
    try {
      const res = await api.get('/api/kategoris');
      setKategoris(res.data.data);
    } catch (err) {
      console.error('Gagal mengambil data kategori:', err);
      alert('Gagal mengambil data kategori. Silakan cek console.');
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      nama: form.nama,
      kategori_id: form.kategori_id,
      is_currency_required: form.is_currency_required,
      is_opening_balance_required: form.is_opening_balance_required,
    };

    try {
      if (isEditing) {
        await api.put(`/api/tipe-akun/${form.id}`, payload);
      } else {
        await api.post('/api/tipe-akun', payload);
      }

      fetchTipeAkuns();
      closeModal();
    } catch (err) {
      console.error('Gagal menyimpan tipe akun:', err);
      alert('Terjadi kesalahan saat menyimpan data.');
    }
  };

  const handleEdit = (item) => {
    setForm({
      id: item.id,
      nama: item.nama,
      kategori_id: item.kategori_id,
      is_currency_required: item.is_currency_required,
      is_opening_balance_required: item.is_opening_balance_required,
    });
    setIsEditing(true);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    setConfirmDeleteId(id);
  };

  const confirmDelete = async () => {
    try {
      await api.delete(`/api/tipe-akun/${confirmDeleteId}`);
      fetchTipeAkuns();
      setConfirmDeleteId(null);
    } catch (err) {
      console.error('Gagal menghapus tipe akun:', err);
      alert('Gagal menghapus data.');
    }
  };

  const openModal = () => {
    setForm({
      id: null,
      nama: '',
      kategori_id: '',
      is_currency_required: false,
      is_opening_balance_required: false,
    });
    setIsEditing(false);
    setShowModal(true);
  };
  

  const closeModal = () => {
    setShowModal(false);
    setForm({ id: null, nama: '', kategori_id: '' });
    setIsEditing(false);
  };

  return (
    <Layout>
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Master Nama Tipe Akun</h2>
          <button
            onClick={openModal}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            + Tambah
          </button>
        </div>

        <table className="w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">Nama</th>
              <th className="border p-2">Kode</th>
              <th className="border p-2">Kategori</th>
              <th className="border p-2 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {tipeAkuns.length > 0 ? (
              tipeAkuns.map((item) => (
                <tr key={item.id}>
                  <td className="border p-2">{item.nama}</td>
                  <td className="border p-2">{item.kode}</td>
                  <td className="border p-2">
                    {kategoris.find((k) => k.id === item.kategori_id)?.nama ||
                      'Tidak ditemukan'}
                  </td>
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
                <td colSpan="4" className="text-center p-4">
                  Tidak ada data.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Modal Tambah / Edit */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
            <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
              <h2 className="text-lg font-semibold mb-4">
                {isEditing ? 'Edit Tipe Akun' : 'Tambah Tipe Akun'}
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block mb-1">Nama</label>
                  <input
                    type="text"
                    name="nama"
                    value={form.nama}
                    onChange={handleChange}
                    className="w-full border px-3 py-2 rounded"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-1">Kategori</label>
                  <select
                    name="kategori_id"
                    value={form.kategori_id}
                    onChange={handleChange}
                    className="w-full border px-3 py-2 rounded"
                    required
                  >
                    <option value="">-- Pilih Kategori --</option>
                    {kategoris.map((kategori) => (
                      <option key={kategori.id} value={kategori.id}>
                        {kategori.nama}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block mb-1">
                    <input
                      type="checkbox"
                      name="is_currency_required"
                      checked={form.is_currency_required}
                      onChange={handleCheckboxChange}
                      className="mr-2"
                    />
                    Wajib Mata Uang
                  </label>
                </div>
                <div className="mb-4">
                  <label className="block mb-1">
                    <input
                      type="checkbox"
                      name="is_opening_balance_required"
                      checked={form.is_opening_balance_required}
                      onChange={handleCheckboxChange}
                      className="mr-2"
                    />
                    Wajib Saldo Awal
                  </label>
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="bg-gray-300 px-4 py-2 rounded"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                  >
                    {isEditing ? 'Perbarui' : 'Simpan'}
                  </button>
                </div>
              </form>
            </div>
          </div>
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
                Apakah Anda yakin ingin menghapus tipe akun ini?
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

export default NamaTipeAkun;
