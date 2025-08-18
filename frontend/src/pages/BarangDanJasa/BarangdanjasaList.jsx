import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import api from '../../axios';
import BarangdanjasaForm from './BarangdanjasaForm';
import BarangdanjasaDetail from './BarangdanjasaDetail';

const BarangdanjasaList = () => {
  const [items, setItems] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  // 🔹 State untuk filter
  const [searchKeterangan, setSearchKeterangan] = useState('');
  const [filterTipe, setFilterTipe] = useState(''); // '' = semua
  const [filterNonAktif, setFilterNonAktif] = useState('Tidak'); // default Tidak

  // 🔹 State pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const fetchData = async () => {
    try {
      const res = await api.get('/api/barang-jasa');
      setItems(res.data);
    } catch (err) {
      console.error('Gagal mengambil data:', err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openForm = (id = null) => {
    setSelectedId(id);
    setShowForm(true);
  };

  const openDetail = (id) => {
    setSelectedId(id);
    setShowDetail(true);
  };

  const handleDelete = (id) => {
    setConfirmDeleteId(id);
  };

  const confirmDelete = async () => {
    try {
      await api.delete(`/api/barang-jasa/${confirmDeleteId}`);
      fetchData();
      setConfirmDeleteId(null);
    } catch (error) {
      console.error('Gagal menghapus data:', error);
    }
  };

  // 🔹 Filter data sebelum ditampilkan
  const filteredItems = items.filter(item => {
    const matchKeterangan = item.keterangan
      ? item.keterangan.toLowerCase().includes(searchKeterangan.toLowerCase())
      : false;

    const matchTipe = filterTipe ? item.tipe_item === filterTipe : true;

    const matchNonAktif =
      filterNonAktif === 'Semua'
        ? true
        : filterNonAktif === 'Ya'
        ? item.non_aktif === true
        : item.non_aktif === false;

    return matchKeterangan && matchTipe && matchNonAktif;
  });

  // 🔹 Pagination logic
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  return (
    <Layout>
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Daftar Barang & Jasa</h2>
          <button
            onClick={() => openForm()}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            + Tambah
          </button>
        </div>

        {/* 🔹 Filter UI */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {/* Pencarian Keterangan */}
          <input
            type="text"
            placeholder="Cari keterangan..."
            value={searchKeterangan}
            onChange={(e) => setSearchKeterangan(e.target.value)}
            className="border px-3 py-2 rounded"
          />

          {/* Filter Tipe */}
          <select
            value={filterTipe}
            onChange={(e) => setFilterTipe(e.target.value)}
            className="border px-3 py-2 rounded"
          >
            <option value="">Semua Tipe</option>
            <option value="Persedian">Persedian</option>
            <option value="Non Persedian">Non Persedian</option>
            <option value="Servis">Servis</option>
          </select>

          {/* Filter Non Aktif */}
          <select
            value={filterNonAktif}
            onChange={(e) => setFilterNonAktif(e.target.value)}
            className="border px-3 py-2 rounded"
          >
            <option value="Tidak">Non Aktif: Tidak</option>
            <option value="Ya">Non Aktif: Ya</option>
            <option value="Semua">Semua</option>
          </select>
        </div>

        {/* 🔹 Tabel Data */}
        <table className="w-full border text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2 text-center">No</th>
              <th className="border p-2">No Item</th>
              <th className="border p-2">Keterangan</th>
              <th className="border p-2">Kuantitas</th>
              <th className="border p-2">Unit</th>
              <th className="border p-2">Tipe</th>
              {/* <th className="border p-2">Non Aktif</th> */}
              <th className="border p-2 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.length > 0 ? (
              currentItems.map((item, index) => (
                <tr key={item.id}>
                  <td className="border p-2 text-center">{indexOfFirstItem + index + 1}</td>
                  <td className="border p-2">{item.no_item}</td>
                  <td className="border p-2">{item.keterangan}</td>
                  <td className="border p-2">{item.saldo_saat_ini_kuantitas}</td>
                  <td className="border p-2">{item.unit}</td>
                  <td className="border p-2">{item.tipe_item}</td>
                  {/* <td className="border p-2 text-center">
                    {item.non_aktif ? 'Ya' : 'Tidak'}
                  </td> */}
                  <td className="border p-2 text-center">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => openDetail(item.id)}
                        className="bg-green-50 hover:bg-green-100 text-green-600 hover:text-green-800 px-3 py-2 rounded-md transition duration-200"
                        title="Detail"
                      >
                        <i className="bi bi-eye-fill"></i>
                      </button>
                      <button
                        onClick={() => openForm(item.id)}
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
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center p-4 text-gray-500">
                  Tidak ada data barang atau jasa.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* 🔹 Pagination Controls */}
        <div className="flex justify-between items-center mt-4">
          {/* Kiri: Dropdown Show entries */}
          <div className="flex items-center space-x-2">
            <span>Show</span>
            <select
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
              className="border px-2 py-1 rounded"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={15}>15</option>
            </select>
            <span>entries</span>
          </div>

          {/* Kanan: Prev / Next dan Page Info */}
          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className={`px-3 py-1 border rounded ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              Prev
            </button>
            <span>
              Page {currentPage} of {totalPages || 1}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages || totalPages === 0}
              className={`px-3 py-1 border rounded ${currentPage === totalPages || totalPages === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              Next
            </button>
          </div>
        </div>


        {showForm && (
          <BarangdanjasaForm
            id={selectedId}
            onClose={() => {
              setShowForm(false);
              fetchData();
            }}
          />
        )}

        {showDetail && (
          <BarangdanjasaDetail
            id={selectedId}
            onClose={() => setShowDetail(false)}
          />
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

export default BarangdanjasaList;
