import { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import api from '../../axios';
import PemasokForm from './PemasokForm';
import PemasokDetail from './PemasokDetail';

const PemasokList = () => {
  const [data, setData] = useState([]);
  const [selectedPemasok, setSelectedPemasok] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null); // Untuk modal hapus

  const fetchData = async () => {
    try {
      const res = await api.get('/api/pemasok');
      setData(res.data);
    } catch (error) {
      console.error('Gagal mengambil data pemasok:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEdit = (pemasok) => {
    setSelectedPemasok(pemasok);
    setEditMode(true);
    setShowForm(true);
  };

  const handleDetail = (pemasok) => {
    setSelectedPemasok(pemasok);
    setShowDetail(true);
  };

  const confirmDelete = async () => {
    try {
      await api.delete(`/api/pemasok/${confirmDeleteId}`);
      fetchData();
      setConfirmDeleteId(null);
    } catch (error) {
      console.error('Gagal menghapus pemasok:', error);
    }
  };

  return (
    <Layout>
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Daftar Pemasok</h2>
          <button
            onClick={() => {
              setShowForm(true);
              setEditMode(false);
              setSelectedPemasok(null);
            }}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            + Tambah
          </button>
        </div>

        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2 text-center">No Pemasok</th>
              <th className="border p-2">Nama</th>
              <th className="border p-2">Telepon</th>
              <th className="border p-2">Kontak</th>
              <th className="border p-2 text-center">Saldo Awal</th>
              <th className="border p-2 text-center">Mata Uang</th>
              <th className="border p-2 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((p) => (
                <tr key={p.id}>
                  <td className="border p-2 text-center">{p.no_pemasok}</td>
                  <td className="border p-2">{p.nama}</td>
                  <td className="border p-2">{p.telepon}</td>
                  <td className="border p-2">{typeof p.kontak === 'string' ? p.kontak : '-'}</td>
                  <td className="border p-2 text-center">{p.saldo_awal}</td>
                  <td className="border p-2 text-center">{p.currency?.name || '-'}</td>
                  <td className="border p-2 text-center">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => handleDetail(p)}
                        className="bg-green-50 hover:bg-green-100 text-green-600 hover:text-green-800 px-3 py-2 rounded-md transition duration-200"
                        title="Detail"
                      >
                        <i className="bi bi-eye-fill"></i>
                      </button>
                      <button
                        onClick={() => handleEdit(p)}
                        className="bg-blue-50 hover:bg-blue-100 text-blue-600 hover:text-blue-800 px-3 py-2 rounded-md transition duration-200"
                        title="Edit"
                      >
                        <i className="bi bi-pencil-fill"></i>
                      </button>
                      <button
                        onClick={() => setConfirmDeleteId(p.id)}
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
                  Tidak ada data pemasok.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Modal Form */}
        {showForm && (
          <PemasokForm
            show={showForm}
            onClose={() => setShowForm(false)}
            editMode={editMode}
            data={selectedPemasok}
            onSuccess={fetchData}
          />
        )}

        {/* Modal Detail */}
        {showDetail && (
          <PemasokDetail
            show={showDetail}
            onClose={() => setShowDetail(false)}
            data={selectedPemasok}
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
                Apakah Anda yakin ingin menghapus pemasok ini?
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

export default PemasokList;
