import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import api from '../../axios';
import FormProjectMst from './FormProjectMst';
import DetailProjectMst from './DetailProjectMst';

const ListProjectMst = () => {
  const [projects, setProjects] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await api.get('/api/projects');
      setProjects(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAdd = () => {
    setSelectedProject(null);
    setShowForm(true);
  };

  const handleEdit = (project) => {
    setSelectedProject(project);
    setShowForm(true);
  };

  const handleDetail = (project) => {
    setSelectedProject(project);
    setShowDetail(true);
  };

  const handleDelete = (id) => {
    setConfirmDeleteId(id);
  };

  const confirmDelete = async () => {
    try {
      await api.delete(`/api/projects/${confirmDeleteId}`);
      fetchProjects();
      setConfirmDeleteId(null);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout>
      <div className="p-4">
        {/* Header + Button */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Master Data Proyek</h2>
          <button
            onClick={handleAdd}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            + Proyek Baru
          </button>
        </div>

        {/* Tabel */}
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2 w-16 text-center">No</th>
              <th className="border p-2">Project No</th>
              <th className="border p-2">Project Name</th>
              <th className="border p-2">Header</th>
              <th className="border p-2">Sub Project</th>
              <th className="border p-2">Customer Name</th>
              <th className="border p-2 w-32 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {projects.length > 0 ? (
              projects.map((p, index) => (
                <tr key={p.id}>
                  <td className="border p-2 text-center">{index + 1}</td>
                  <td className="border p-2">{p.project_no}</td>
                  <td className="border p-2">{p.project_name}</td>
                  <td className="border p-2">{p.header}</td>
                  <td className="border p-2">{p.sub_project}</td>
                  <td className="border p-2">{p.customer_name}</td>
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
                        onClick={() => handleDelete(p.id)}
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
                  Tidak ada data proyek.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal Form */}
      {showForm && (
        <FormProjectMst
          closeModal={() => setShowForm(false)}
          refresh={fetchProjects}
          project={selectedProject}
        />
      )}

      {/* Modal Detail */}
      {showDetail && (
        <DetailProjectMst
          closeModal={() => setShowDetail(false)}
          project={selectedProject}
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
              Apakah Anda yakin ingin menghapus proyek ini?
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
    </Layout>
  );
};

export default ListProjectMst;
