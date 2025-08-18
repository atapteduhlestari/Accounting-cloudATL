import React, { useState, useEffect } from 'react';
import api from '../../axios';

const FormProjectMst = ({ closeModal, refresh, project }) => {
  const [form, setForm] = useState({
    project_no: '',
    project_name: '',
    header: '',
    sub_project: '',
    customer_name: '',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (project) {
      setForm({
        project_no: project.project_no || '',
        project_name: project.project_name || '',
        header: project.header || '',
        sub_project: project.sub_project || '',
        customer_name: project.customer_name || '',
      });
    } else {
      setForm({
        project_no: '',
        project_name: '',
        header: '',
        sub_project: '',
        customer_name: '',
      });
    }
  }, [project]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (project) {
        await api.put(`/api/projects/${project.id}`, form);
      } else {
        await api.post('/api/projects', form);
      }
      refresh();
      closeModal();
    } catch (error) {
      console.error(error);
      alert('Terjadi kesalahan saat menyimpan data.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-2xl">
        <h2 className="text-lg font-semibold mb-4">
          {project ? 'Edit Proyek' : 'Tambah Proyek'}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1">Project No</label>
            <input
              type="text"
              name="project_no"
              value={form.project_no}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Project Name</label>
            <input
              type="text"
              name="project_name"
              value={form.project_name}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Header</label>
            <input
              type="text"
              name="header"
              value={form.header}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Sub Project</label>
            <input
              type="text"
              name="sub_project"
              value={form.sub_project}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Customer Name</label>
            <input
              type="text"
              name="customer_name"
              value={form.customer_name}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={closeModal}
              className="bg-gray-300 px-4 py-2 rounded"
              disabled={loading}
            >
              Batal
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded"
              disabled={loading}
            >
              {loading ? 'Menyimpan...' : 'Simpan'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormProjectMst;
