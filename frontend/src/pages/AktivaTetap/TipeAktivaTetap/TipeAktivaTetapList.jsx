import React, { useEffect, useState, useMemo } from 'react';
import Layout from '../../../components/Layout';
import api from '../../../axios';
import TipeAktivaTetapForm from './TipeAktivaTetapForm';
import TipeAktivaTetapDetail from './TipeAktivaTetapDetail';

const TipeAktivaTetapList = () => {
  const [rows, setRows] = useState([]);
  const [meta, setMeta] = useState({ current_page: 1, per_page: 10, total: 0 });
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [showDetail, setShowDetail] = useState(false);
  const [detailRow, setDetailRow] = useState(null);
  const [confirmDeleteRow, setConfirmDeleteRow] = useState(null);

  const fetchData = async (page = 1) => {
    setLoading(true);
    try {
      const res = await api.get('/api/tipe-aktiva-tetap', {
        params: { page, per_page: meta.per_page }
      });
      setRows(res.data.data || []);
      setMeta({
        current_page: res.data.current_page,
        per_page: res.data.per_page,
        total: res.data.total,
        last_page: res.data.last_page
      });
    } catch (e) {
      console.error(e);
      alert('Gagal memuat data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(1); }, []);

  const onCreate = () => {
    setEditing(null);
    setShowForm(true);
  };

  const onEdit = (row) => {
    setEditing(row);
    setShowForm(true);
  };

  const confirmDelete = async () => {
    try {
      await api.delete(`/api/tipe-aktiva-tetap/${confirmDeleteRow.id}`);
      await fetchData(meta.current_page);
      setConfirmDeleteRow(null);
    } catch (e) {
      console.error(e);
      alert('Gagal menghapus.');
    }
  };

  const onDetail = async (row) => {
    try {
      const res = await api.get(`/api/tipe-aktiva-tetap/${row.id}`);
      setDetailRow(res.data);
      setShowDetail(true);
    } catch (e) {
      console.error(e);
      alert('Gagal memuat detail.');
    }
  };

  const pages = useMemo(() => {
    const arr = [];
    const last = meta.last_page || 1;
    for (let i = 1; i <= last; i++) arr.push(i);
    return arr;
  }, [meta.last_page]);

  return (
    <Layout>
      <div className="p-4">
        {/* Header + Tombol Tambah */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Tipe Aktiva Tetap</h2>
          <button
            onClick={onCreate}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            + Tambah
          </button>
        </div>

        {/* Tabel */}
        <div className="overflow-auto border rounded-lg">
          <table className="w-full border text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 border text-left">Nama</th>
                <th className="p-2 border text-left">Tipe Aset Tetap Pajak</th>
                <th className="p-2 border text-center w-40">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="3" className="p-4 text-center">Memuat…</td></tr>
              ) : rows.length === 0 ? (
                <tr><td colSpan="3" className="p-4 text-center">Tidak ada data.</td></tr>
              ) : (
                rows.map((r) => (
                  <tr key={r.id} className="border-b">
                    <td className="p-2 border">{r.nama}</td>
                    <td className="p-2 border">{r.tipe_pajak?.nama ?? '-'}</td>
                    <td className="p-2 border text-center">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => onDetail(r)}
                          className="bg-gray-50 hover:bg-gray-100 text-gray-600 hover:text-gray-800 px-3 py-2 rounded-md transition duration-200"
                          title="Detail"
                        >
                          <i className="bi bi-eye-fill"></i>
                        </button>
                        <button
                          onClick={() => onEdit(r)}
                          className="bg-blue-50 hover:bg-blue-100 text-blue-600 hover:text-blue-800 px-3 py-2 rounded-md transition duration-200"
                          title="Edit"
                        >
                          <i className="bi bi-pencil-fill"></i>
                        </button>
                        <button
                          onClick={() => setConfirmDeleteRow(r)}
                          className="bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-800 px-3 py-2 rounded-md transition duration-200"
                          title="Hapus"
                        >
                          <i className="bi bi-trash-fill"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {meta.last_page > 1 && (
          <div className="mt-4 flex flex-wrap gap-2 justify-center">
            {pages.map((p) => (
              <button
                key={p}
                onClick={() => fetchData(p)}
                className={`px-3 py-1 rounded border ${p === meta.current_page ? 'bg-black text-white' : ''}`}
              >
                {p}
              </button>
            ))}
          </div>
        )}

        {/* Modal Form */}
        {showForm && (
          <TipeAktivaTetapForm
            open={showForm}
            onClose={() => setShowForm(false)}
            initialData={editing}
            onSaved={() => { setShowForm(false); fetchData(meta.current_page); }}
          />
        )}

        {/* Modal Detail */}
        {showDetail && detailRow && (
          <TipeAktivaTetapDetail
            open={showDetail}
            onClose={() => setShowDetail(false)}
            data={detailRow}
          />
        )}

        {/* Modal Konfirmasi Hapus */}
        {confirmDeleteRow && (
          <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/20">
            <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
              <h2 className="text-lg font-semibold mb-4 text-red-600 flex items-center">
                <i className="bi bi-exclamation-triangle-fill mr-2 text-xl" />
                Konfirmasi Hapus
              </h2>
              <p className="mb-6 text-sm text-gray-700">
                Apakah Anda yakin ingin menghapus <b>{confirmDeleteRow.nama}</b>?
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setConfirmDeleteRow(null)}
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

export default TipeAktivaTetapList;
