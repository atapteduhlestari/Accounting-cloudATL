import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import api from '../../axios';
import DepartmentForm from './DepartmentForm';
import DepartmentDetail from './DepartmentDetail';

export default function DepartmentList() {
  const [data, setData] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const fetchData = () => {
    api.get('/api/mst-department').then(res => setData(res.data));
  };

  const handleDelete = (id) => {
    if (window.confirm('Yakin ingin hapus?')) {
      api.delete(`/api/mst-department/${id}`).then(() => fetchData());
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Layout>
      <div className="p-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold">Master Department</h1>
          <button
            onClick={() => { setSelectedId(null); setShowForm(true); }}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded shadow"
          >
            + Add Department
          </button>
        </div>

        {/* Table */}
        <table className="w-full border text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Department No</th>
              <th className="border p-2">Department Name</th>
              <th className="border p-2">Descriptions</th>
              <th className="border p-2">Header</th>
              <th className="border p-2">Sub Department</th>
              <th className="border p-2 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((row, index) => (
                <tr key={row.id} className="hover:bg-gray-50">
                  <td className="border p-2">{row.department_no}</td>
                  <td className="border p-2">{row.department_name}</td>
                  <td className="border p-2">{row.descriptions}</td>
                  <td className="border p-2">{row.header}</td>
                  <td className="border p-2">{row.sub_department}</td>
                  <td className="border p-2 text-center">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => { setSelectedId(row.id); setShowDetail(true); }}
                        className="bg-green-50 hover:bg-green-100 text-green-600 px-3 py-1 rounded transition"
                        title="Detail"
                      >
                        <i className="bi bi-eye-fill"></i>
                      </button>
                      <button
                        onClick={() => { setSelectedId(row.id); setShowForm(true); }}
                        className="bg-blue-50 hover:bg-blue-100 text-blue-600 px-3 py-1 rounded transition"
                        title="Edit"
                      >
                        <i className="bi bi-pencil-fill"></i>
                      </button>
                      <button
                        onClick={() => handleDelete(row.id)}
                        className="bg-red-50 hover:bg-red-100 text-red-600 px-3 py-1 rounded transition"
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
                <td colSpan="6" className="text-center p-4 text-gray-500">
                  Tidak ada data department.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Modal Form */}
        {showForm && (
          <DepartmentForm
            id={selectedId}
            onClose={() => setShowForm(false)}
            onSuccess={() => { setShowForm(false); fetchData(); }}
          />
        )}

        {/* Modal Detail */}
        {showDetail && (
          <DepartmentDetail
            id={selectedId}
            onClose={() => setShowDetail(false)}
          />
        )}
      </div>
    </Layout>
  );
}
