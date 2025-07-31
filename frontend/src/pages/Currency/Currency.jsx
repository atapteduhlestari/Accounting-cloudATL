import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import api from '../../axios';

const Currency = () => {
  const [currencies, setCurrencies] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editCurrency, setEditCurrency] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    exchange_rate: '',
    country: '',
    symbol: '',
  });

  useEffect(() => {
    fetchCurrencies();
  }, []);

  const fetchCurrencies = async () => {
    try {
      const response = await api.get('/api/currencies');
      setCurrencies(response.data);
    } catch (error) {
      console.error('Failed to fetch currencies:', error);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        exchange_rate: Number(formData.exchange_rate),
      };
      if (editCurrency) {
        await api.put(`/api/currencies/${editCurrency.id}`, payload);
      } else {
        await api.post('/api/currencies', payload);
      }
      fetchCurrencies();
      closeModal();
    } catch (error) {
      console.error('Failed to save currency:', error);
    }
  };

  const handleEdit = (currency) => {
    setFormData({
      name: currency.name,
      exchange_rate: Number(currency.exchange_rate),
      country: currency.country,
      symbol: currency.symbol,
    });
    setEditCurrency(currency);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    setConfirmDeleteId(id);
  };

  const confirmDelete = async () => {
    try {
      await api.delete(`/api/currencies/${confirmDeleteId}`);
      fetchCurrencies();
      setConfirmDeleteId(null);
    } catch (error) {
      console.error('Failed to delete currency:', error);
    }
  };

  const openModal = () => {
    setFormData({ name: '', exchange_rate: '', country: '', symbol: '' });
    setEditCurrency(null);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setFormData({ name: '', exchange_rate: '', country: '', symbol: '' });
    setEditCurrency(null);
  };

  return (
    <Layout>
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl">Currency Master</h2>
          <button
            onClick={openModal}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            + New
          </button>
        </div>

        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Currency</th>
              <th className="border p-2">Rate</th>
              <th className="border p-2">Country</th>
              <th className="border p-2">Symbol</th>
              <th className="border text-center p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {currencies.map((a) => (
              <tr key={a.id}>
                <td className="border p-2">{a.name}</td>
                <td className="border p-2">{Number(a.exchange_rate)}</td>
                <td className="border p-2">{a.country}</td>
                <td className="border p-2">{a.symbol}</td>
                <td className="border p-2 flex justify-center items-center gap-2 text-center">
                    <button
                      onClick={() => handleEdit(a)}
                      className="bg-blue-50 hover:bg-blue-100 text-blue-600 hover:text-blue-800 px-3 py-2 rounded-md transition duration-200"
                      title="Edit"
                    >
                      <i className="bi bi-pencil-fill"></i>
                    </button>
                    <button
                      onClick={() => handleDelete(a.id)}
                      className="bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-800 px-3 py-2 rounded-md transition duration-200"
                      title="Hapus"
                    >
                      <i className="bi bi-trash-fill"></i>
                    </button>
                </td>
              </tr>
            ))}
            {currencies.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center p-4">
                  No currencies found.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Modal Tambah/Edit */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/10">
            <div className="bg-white p-6 rounded w-full max-w-lg relative shadow-lg">
              <h2 className="text-lg mb-4">
                {editCurrency ? 'Edit Currency' : 'Add New Currency'}
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-2">
                  <label className="block text-sm">Name</label>
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full border px-2 py-1 rounded"
                    required
                  />
                </div>
                <div className="mb-2">
                  <label className="block text-sm">Exchange Rate</label>
                  <input
                    name="exchange_rate"
                    type="number"
                    value={formData.exchange_rate}
                    onChange={handleChange}
                    className="w-full border px-2 py-1 rounded"
                    required
                  />
                </div>
                <div className="mb-2">
                  <label className="block text-sm">Country</label>
                  <input
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="w-full border px-2 py-1 rounded"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm">Symbol</label>
                  <input
                    name="symbol"
                    value={formData.symbol}
                    onChange={handleChange}
                    className="w-full border px-2 py-1 rounded"
                    required
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="px-4 py-2 bg-gray-300 rounded"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                  >
                    {editCurrency ? 'Update' : 'Create'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal Konfirmasi Hapus */}
        {confirmDeleteId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/10">
            <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
              <h2 className="text-lg font-semibold mb-4 text-red-600 flex items-center">
                <i className="bi bi-exclamation-triangle-fill mr-2 text-xl" />
                Konfirmasi Hapus
              </h2>
              <p className="mb-6 text-sm text-gray-700">
                Apakah Anda yakin ingin menghapus currency ini?
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

export default Currency;
