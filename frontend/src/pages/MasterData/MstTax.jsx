import React, { useEffect, useState } from 'react';
import api from '../../axios';
import Layout from '../../components/Layout';

export default function MstTax() {
  const [form, setForm] = useState({
    nama: '',
    nilai: '',
    kode: '',
    keterangan: '',
    akun_pajak_penjualan: '',
    akun_pajak_pembelian: '',
  });

  const [taxes, setTaxes] = useState([]);
  const [coaList, setCoaList] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  const fetchData = async () => {
    const [taxRes, coaRes] = await Promise.all([
      api.get('/api/taxes'),
      api.get('/api/coa'),
    ]);
    setTaxes(taxRes.data);
    setCoaList(coaRes.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const getNomorAkun = (id) => {
    const coa = coaList.find((item) => item.id === parseInt(id));
    return coa ? coa.nomor_akun : '';
  };

  const resetForm = () => {
    setForm({
      nama: '',
      nilai: '',
      kode: '',
      keterangan: '',
      akun_pajak_penjualan: '',
      akun_pajak_pembelian: '',
    });
    setEditingId(null);
  };

  const openModal = () => {
    resetForm();
    setShowModal(true);
  };

  const closeModal = () => {
    resetForm();
    setShowModal(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`/api/taxes/${editingId}`, form);
      } else {
        await api.post('/api/taxes', form);
      }
      fetchData();
      closeModal();
    } catch (error) {
      console.error('Gagal menyimpan data', error);
    }
  };

  const handleEdit = (tax) => {
    setForm({
      nama: tax.nama,
      nilai: tax.nilai,
      kode: tax.kode,
      keterangan: tax.keterangan,
      akun_pajak_penjualan: tax.akun_pajak_penjualan,
      akun_pajak_pembelian: tax.akun_pajak_pembelian,
    });
    setEditingId(tax.id);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    setConfirmDeleteId(id);
  };

  const confirmDelete = async () => {
    try {
      await api.delete(`/api/taxes/${confirmDeleteId}`);
      fetchData();
      setConfirmDeleteId(null);
    } catch (error) {
      console.error('Gagal menghapus data:', error);
    }
  };

  return (
    <Layout>
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Master Data Pajak</h2>
          <button
            onClick={openModal}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            + Pajak Baru
          </button>
        </div>

        <table className="w-full border text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Nama</th>
              <th className="border p-2 text-center">Nilai (%)</th>
              <th className="border p-2 text-center">Kode</th>
              <th className="border p-2">Akun Penjualan</th>
              <th className="border p-2">Akun Pembelian</th>
              <th className="border p-2 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {taxes.map((tax) => (
              <tr key={tax.id}>
                <td className="border p-2">{tax.nama}</td>
                <td className="border p-2 text-center">{tax.nilai}</td>
                <td className="border p-2 text-center">{tax.kode}</td>
                <td className="border p-2">
                  {tax.akun_penjualan?.nama} ({tax.akun_penjualan?.nomor_akun})
                </td>
                <td className="border p-2">
                  {tax.akun_pembelian?.nama} ({tax.akun_pembelian?.nomor_akun})
                </td>
                <td className="border p-2 text-center">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => handleEdit(tax)}
                      className="bg-blue-50 hover:bg-blue-100 text-blue-600 px-3 py-1 rounded-md"
                    >
                      <i className="bi bi-pencil-fill"></i>
                    </button>
                    <button
                      onClick={() => handleDelete(tax.id)}
                      className="bg-red-50 hover:bg-red-100 text-red-600 px-3 py-1 rounded-md"
                    >
                      <i className="bi bi-trash-fill"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {taxes.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center p-4">
                  Tidak ada data pajak.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Modal Tambah/Edit */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/20">
            <div className="bg-white p-6 rounded shadow-lg w-full max-w-xl">
              <h2 className="text-lg font-semibold mb-4">
                {editingId ? 'Edit Pajak' : 'Tambah Pajak'}
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Nama
                    </label>
                    <input
                      name="nama"
                      value={form.nama}
                      onChange={handleChange}
                      className="w-full border px-3 py-2 rounded"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Nilai (%)
                    </label>
                    <input
                      name="nilai"
                      type="number"
                      value={form.nilai}
                      onChange={handleChange}
                      className="w-full border px-3 py-2 rounded"
                      required
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium mb-1">
                      Kode
                    </label>
                    <input
                      name="kode"
                      value={form.kode}
                      onChange={handleChange}
                      className="w-full border px-3 py-2 rounded"
                      required
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium mb-1">
                      Keterangan
                    </label>
                    <textarea
                      name="keterangan"
                      value={form.keterangan}
                      onChange={handleChange}
                      className="w-full border px-3 py-2 rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Akun Penjualan
                    </label>
                    <select
                      name="akun_pajak_penjualan"
                      value={form.akun_pajak_penjualan}
                      onChange={handleChange}
                      className="w-full border px-3 py-2 rounded"
                      required
                    >
                      <option value="">-- Pilih Akun --</option>
                      {coaList.map((coa) => (
                        <option key={coa.id} value={coa.id}>
                          {coa.nama}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Nomor Akun
                    </label>
                    <input
                      type="text"
                      readOnly
                      value={getNomorAkun(form.akun_pajak_penjualan)}
                      className="w-full border px-3 py-2 rounded bg-gray-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Akun Pembelian
                    </label>
                    <select
                      name="akun_pajak_pembelian"
                      value={form.akun_pajak_pembelian}
                      onChange={handleChange}
                      className="w-full border px-3 py-2 rounded"
                      required
                    >
                      <option value="">-- Pilih Akun --</option>
                      {coaList.map((coa) => (
                        <option key={coa.id} value={coa.id}>
                          {coa.nama}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Nomor Akun
                    </label>
                    <input
                      type="text"
                      readOnly
                      value={getNomorAkun(form.akun_pajak_pembelian)}
                      className="w-full border px-3 py-2 rounded bg-gray-100"
                    />
                  </div>
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
                    {editingId ? 'Update' : 'Simpan'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal Hapus */}
        {confirmDeleteId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/20">
            <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
              <h2 className="text-lg font-semibold mb-4 text-red-600 flex items-center">
                <i className="bi bi-exclamation-triangle-fill mr-2 text-xl" />
                Konfirmasi Hapus
              </h2>
              <p className="mb-6 text-sm text-gray-700">
                Apakah Anda yakin ingin menghapus data pajak ini?
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
