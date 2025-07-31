// ChartOfAccounts.jsx
import React, { useEffect, useState, useCallback } from 'react';
import api from '../../axios';
import Layout from '../../components/Layout';
import ChartOfAccountForm from './ChartOfAccountForm';

const ChartOfAccounts = () => {
  // const today = new Date().toISOString().split('T')[0];
  const [tipeAkuns, setTipeAkuns] = useState([]);
  const [currencies, setCurrencies] = useState([]);
  const [chartAccounts, setChartAccounts] = useState([]);
  // const [subAccounts, setSubAccounts] = useState([]);
  const [filterTipe, setFilterTipe] = useState('');
  const [search, setSearch] = useState('');
  const [editingData, setEditingData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);


  const fetchAccounts = useCallback(async () => {
    try {
      const res = await api.get('/api/chart-of-accounts', {
        params: { tipe: filterTipe, search },
      });
      setChartAccounts(res.data);
      // setSubAccounts(res.data);
    } catch (error) {
      console.error('Gagal memuat akun:', error.message);
    }
  }, [filterTipe, search]);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [tipeRes, currencyRes] = await Promise.all([
          api.get('/api/tipe-akun'),
          api.get('/api/currencies'),
        ]);
        setTipeAkuns(tipeRes.data);
        setCurrencies(currencyRes.data);
      } catch (error) {
        console.error('Gagal memuat data awal:', error);
      }
    };
    fetchInitialData();
  }, []);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchAccounts();
    }, 500);
    return () => clearTimeout(delayDebounce);
  }, [search, filterTipe, fetchAccounts]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filterTipe, search, itemsPerPage]);
  

  const handleEdit = (akun) => {
    setEditingData(akun);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    setConfirmDeleteId(id);
  };

  const confirmDelete = async () => {
    try {
      await api.delete(`/api/chart-of-accounts/${confirmDeleteId}`);
      setConfirmDeleteId(null);
      fetchAccounts();
    } catch (err) {
      console.error(err);
      alert('Gagal menghapus akun.');
    }
  };

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  const buildAccountTree = (list, parentId = null, level = 0) => {
    return list
      .filter((a) => a.sub_account_of === parentId)
      .flatMap((a) => [
        { ...a, level },
        ...buildAccountTree(list, a.id, level + 1),
      ]);
  };

  const filteredChartAccounts = chartAccounts.filter((a) => {
    const matchTipe = filterTipe
      ? String(a.tipe_akun_id) === String(filterTipe)
      : true;
    const matchSearch = search
      ? a.nama.toLowerCase().includes(search.toLowerCase())
      : true;
    return matchTipe && matchSearch;
  });

  const treeData = buildAccountTree(filteredChartAccounts);
  const sortedTreeData = [...treeData].sort((a, b) => {
    if (!sortBy) return 0;
    const valA = sortBy === 'tipe' ? a.tipe_akun?.nama || '' : a[sortBy] || '';
    const valB = sortBy === 'tipe' ? b.tipe_akun?.nama || '' : b[sortBy] || '';
    return typeof valA === 'string'
      ? sortOrder === 'asc'
        ? valA.localeCompare(valB)
        : valB.localeCompare(valA)
      : sortOrder === 'asc'
      ? valA - valB
      : valB - valA;
  });

  const totalPages = Math.ceil(sortedTreeData.length / itemsPerPage);

  const paginatedData = sortedTreeData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );


  return (
    <Layout>
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Chart of Accounts</h2>
          <button
            onClick={() => {
              setEditingData(null);
              setShowModal(true);
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            + New
          </button>
        </div>

        <div className="mb-4">
          <select
            onChange={(e) => setFilterTipe(e.target.value)}
            className="border p-2 mr-2"
            value={filterTipe}
          >
            <option value="">All Types</option>
            {tipeAkuns.map((tipe) => (
              <option key={tipe.id} value={tipe.id}>
                {tipe.nama}
              </option>
            ))}
          </select>
          <input
            placeholder="Search by name"
            onChange={(e) => setSearch(e.target.value)}
            className="border p-2"
          />
        </div>

        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th
                className="border p-2 cursor-pointer"
                onClick={() => handleSort('nomor_akun')}
              >
                Account No{' '}
                {sortBy === 'nomor_akun' && (sortOrder === 'asc' ? '↑' : '↓')}
              </th>
              <th className="border p-2">Name</th>
              <th
                className="border p-2 cursor-pointer"
                onClick={() => handleSort('tipe')}
              >
                Type {sortBy === 'tipe' && (sortOrder === 'asc' ? '↑' : '↓')}
              </th>
              <th className="border p-2">Currency</th>
              <th className="border p-2">Balance</th>
              <th className="border text-center p-2">Action</th>
            </tr>
          </thead>

          <tbody>
            {paginatedData.length > 0 ? (
              paginatedData.map((a) => (
                <tr key={a.id}>
                  <td className="border p-2">
                    {' '.repeat(a.level) + a.nomor_akun}
                  </td>
                  <td className="border p-2">{' '.repeat(a.level) + a.nama}</td>
                  <td className="border p-2">{a.tipe_akun?.nama}</td>
                  <td className="border p-2">{a.currency?.symbol || '-'}</td>
                  <td className="border p-2">
                    {parseFloat(a.saldo_awal || 0).toLocaleString()}
                  </td>
                  <td className="border p-2 text-center space-x-2">
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
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center text-gray-500 py-4">
                  Data tidak ditemukan
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="flex justify-between items-center mt-4">
          <div>
            <label>
              Show
              <select
                value={itemsPerPage}
                onChange={(e) => setItemsPerPage(Number(e.target.value))}
                className="mx-2 border px-2 py-1 rounded"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={15}>15</option>
              </select>
              entries
            </label>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Prev
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>

        {/* Modal Form */}
        {showModal && (
          <ChartOfAccountForm
            editingData={editingData}
            onClose={() => {
              setShowModal(false);
              setEditingData(null);
            }}
            tipeAkuns={tipeAkuns}
            currencies={currencies}
            chartAccounts={chartAccounts}
            fetchAccounts={fetchAccounts}
          />
        )}

        {/* Modal Konfirmasi Hapus */}
        {confirmDeleteId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/10">
            <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
              <h2 className="text-lg font-semibold mb-4 text-red-600">
                Konfirmasi Hapus
              </h2>
              <p className="mb-6 text-sm text-gray-700">
                Apakah Anda yakin ingin menghapus akun ini?
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

export default ChartOfAccounts;
