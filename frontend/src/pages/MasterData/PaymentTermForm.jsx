import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import api from '../../axios';

const PaymentTermForm = () => {
  const [terms, setTerms] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    pay_within_days: '',
    discount_percent: '',
    due_days: '',
    note: '',
  });

  useEffect(() => {
    fetchTerms();
  }, []);

  const fetchTerms = async () => {
    try {
      const res = await api.get('/api/payment-terms');
      setTerms(res.data);
    } catch (err) {
      console.error('Gagal memuat data:', err);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const openModal = (term = null) => {
    if (term) {
      setEditData(term);
      setFormData({
        name: term.name,
        pay_within_days: term.pay_within_days,
        discount_percent: term.discount_percent,
        due_days: term.due_days,
        note: term.note || '',
      });
    } else {
      setEditData(null);
      setFormData({
        name: '',
        pay_within_days: '',
        discount_percent: '',
        due_days: '',
        note: '',
      });
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setFormData({
      name: '',
      pay_within_days: '',
      discount_percent: '',
      due_days: '',
      note: '',
    });
    setEditData(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editData) {
        await api.put(`/api/payment-terms/${editData.id}`, formData);
      } else {
        await api.post('/api/payment-terms', formData);
      }
      fetchTerms();
      closeModal();
    } catch (err) {
      console.error('Gagal menyimpan:', err);
    }
  };

  const handleDelete = (id) => {
    setConfirmDeleteId(id);
  };

  const confirmDelete = async () => {
    try {
      await api.delete(`/api/payment-terms/${confirmDeleteId}`);
      fetchTerms();
      setConfirmDeleteId(null);
    } catch (err) {
      console.error('Gagal menghapus:', err);
    }
  };

  return (
    <Layout>
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Master Syarat Pembayaran</h2>
          <button
            onClick={() => openModal()}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            + Tambah Syarat
          </button>
        </div>

        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2 w-10 text-center">No</th>
              <th className="border p-2">Nama</th>
              <th className="border p-2">Bayar dlm (hari)</th>
              <th className="border p-2">Diskon (%)</th>
              <th className="border p-2">Jatuh Tempo (hari)</th>
              <th className="border p-2">Keterangan</th>
              <th className="border p-2 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {terms.map((term, i) => (
              <tr key={term.id}>
                <td className="border p-2 text-center">{i + 1}</td>
                <td className="border p-2">{term.name}</td>
                <td className="border p-2 text-center">
                  {term.pay_within_days}
                </td>
                <td className="border p-2 text-center">
                  {term.discount_percent}
                </td>
                <td className="border p-2 text-center">{term.due_days}</td>
                <td className="border p-2">{term.note}</td>
                <td className="border p-2 text-center">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => openModal(term)}
                      className="bg-blue-50 hover:bg-blue-100 text-blue-600 px-3 py-2 rounded-md"
                      title="Edit"
                    >
                      <i className="bi bi-pencil-fill" />
                    </button>
                    <button
                      onClick={() => handleDelete(term.id)}
                      className="bg-red-50 hover:bg-red-100 text-red-600 px-3 py-2 rounded-md"
                      title="Hapus"
                    >
                      <i className="bi bi-trash-fill" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {terms.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center p-4">
                  Tidak ada data syarat pembayaran.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/20">
            <div className="bg-white p-6 rounded w-full max-w-lg shadow-lg">
              <h2 className="text-lg mb-4 font-semibold">
                {editData ? 'Edit' : 'Tambah'} Syarat Pembayaran
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="block text-sm font-medium">Nama</label>
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full border px-3 py-2 rounded"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="block text-sm font-medium">
                    Jika membayar antara (hari)
                  </label>
                  <input
                    type="number"
                    name="pay_within_days"
                    value={formData.pay_within_days}
                    onChange={handleChange}
                    className="w-full border px-3 py-2 rounded"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="block text-sm font-medium">
                    Akan dapat diskon (%)
                  </label>
                  <input
                    type="number"
                    name="discount_percent"
                    value={formData.discount_percent}
                    onChange={handleChange}
                    className="w-full border px-3 py-2 rounded"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="block text-sm font-medium">
                    Jatuh tempo (hari)
                  </label>
                  <input
                    type="number"
                    name="due_days"
                    value={formData.due_days}
                    onChange={handleChange}
                    className="w-full border px-3 py-2 rounded"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium">
                    Keterangan
                  </label>
                  <textarea
                    name="note"
                    value={formData.note}
                    onChange={handleChange}
                    className="w-full border px-3 py-2 rounded"
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
                    {editData ? 'Update' : 'Simpan'}
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

export default PaymentTermForm;
