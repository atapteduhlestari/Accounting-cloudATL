import React, { useEffect, useState } from 'react';
import api from '../../axios';
import CustomerFormModal from './CustomerFormModal';
import Layout from '../../components/Layout';
import CustomerDetailModal from './CustomerDetailModal';

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null); // <- Tambah

  const fetchCustomers = async () => {
    try {
      const res = await api.get('/api/customers');
      setCustomers(res.data.data);
    } catch (error) {
      console.error('Gagal mengambil data pelanggan:', error);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const confirmDelete = async () => {
    try {
      await api.delete(`/api/customers/${confirmDeleteId}`);
      fetchCustomers();
      setConfirmDeleteId(null);
    } catch (error) {
      console.error('Gagal menghapus data:', error);
    }
  };

  const [detailId, setDetailId] = useState(null);

  return (
    <Layout>
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Daftar Pelanggan</h2>
          <button
            onClick={() => {
              setEditId(null);
              setOpenModal(true);
            }}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            + Tambah
          </button>
        </div>

        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2 text-center">No</th>
              <th className="border p-2">Nama</th>
              <th className="border p-2">Telepon</th>
              <th className="border p-2">Kontak</th>
              <th className="border p-2 text-center">Saldo</th>
              <th className="border p-2 text-center">Mata Uang</th>
              <th className="border p-2 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {customers.length > 0 ? (
              customers.map((cust, index) => (
                <tr key={cust.id}>
                  <td className="border p-2 text-center">{index + 1}</td>
                  <td className="border p-2">{cust.name}</td>
                  <td className="border p-2">{cust.phone}</td>
                  <td className="border p-2">{cust.contact_person}</td>
                  <td className="border p-2 text-center">
                    {cust.opening_balance}
                  </td>
                  <td className="border p-2 text-center">
                    {cust.currency
                      ? `${cust.currency.name} (${cust.currency.symbol})`
                      : '-'}
                  </td>
                  <td className="border p-2 text-center">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => setDetailId(cust.id)}
                        className="bg-green-50 hover:bg-green-100 text-green-600 hover:text-green-800 px-3 py-2 rounded-md transition duration-200"
                        title="Detail"
                      >
                        <i className="bi bi-eye-fill"></i>
                      </button>
                      <button
                        onClick={() => {
                          setEditId(cust.id);
                          setOpenModal(true);
                        }}
                        className="bg-blue-50 hover:bg-blue-100 text-blue-600 hover:text-blue-800 px-3 py-2 rounded-md transition duration-200"
                        title="Edit"
                      >
                        <i className="bi bi-pencil-fill"></i>
                      </button>
                      <button
                        onClick={() => setConfirmDeleteId(cust.id)} // <- Ubah
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
                <td colSpan="7" className="text-center p-4">
                  Tidak ada data pelanggan.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Form Modal */}
        <CustomerFormModal
          open={openModal}
          onClose={() => setOpenModal(false)}
          customerId={editId}
          onSuccess={() => {
            fetchCustomers();
            setOpenModal(false);
          }}
        />

        {/* Modal Konfirmasi Hapus */}
        {confirmDeleteId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/20">
            <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
              <h2 className="text-lg font-semibold mb-4 text-red-600 flex items-center">
                <i className="bi bi-exclamation-triangle-fill mr-2 text-xl" />
                Konfirmasi Hapus
              </h2>
              <p className="mb-6 text-sm text-gray-700">
                Apakah Anda yakin ingin menghapus pelanggan ini?
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

        {detailId && (
          <CustomerDetailModal
            customerId={detailId}
            onClose={() => setDetailId(null)}
          />
        )}
      </div>
    </Layout>
  );
};

export default CustomerList;
