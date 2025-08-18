import React, { useState, useEffect } from 'react';
import api from '../../axios';

export default function DepartmentForm({ id, onClose, onSuccess }) {
  const [form, setForm] = useState({
    department_no: '',
    department_name: '',
    descriptions: '',
    header: '',
    sub_department: ''
  });

  useEffect(() => {
    if (id) {
      api.get(`/api/mst-department/${id}`).then(res => setForm(res.data));
    }
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      api.put(`/api/mst-department/${id}`, form).then(() => onSuccess());
    } else {
      api.post('/api/mst-department', form).then(() => onSuccess());
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/20">
      <div className="bg-white w-full max-w-2xl rounded-lg shadow-xl p-6 overflow-y-auto max-h-[90vh] relative">
        
        {/* Tombol Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          aria-label="Tutup"
        >
          <i className="bi bi-x-lg text-xl"></i>
        </button>

        {/* Judul Form */}
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          {id ? 'Edit Department' : 'Create Department'}
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Department No
            </label>
            <input
              name="department_no"
              value={form.department_no}
              onChange={handleChange}
              required
              className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Department Name
            </label>
            <input
              name="department_name"
              value={form.department_name}
              onChange={handleChange}
              required
              className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Descriptions
            </label>
            <textarea
              name="descriptions"
              value={form.descriptions}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Header
            </label>
            <input
              name="header"
              value={form.header}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Sub Department
            </label>
            <input
              name="sub_department"
              value={form.sub_department}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Tombol Aksi */}
          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
