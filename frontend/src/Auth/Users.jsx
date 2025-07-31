import { useEffect, useState } from 'react';
import api from '../axios';
import Layout from '../components/Layout';
import { useAuth } from './AuthContext';

function Users() {
  const [users, setUsers] = useState([]);
  const { role } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [form, setForm] = useState({
    id: null,
    name: '',
    email: '',
    password: '',
    role: 'admin',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await api.get('/api/users');
      setUsers(res.data);
    } catch (err) {
      console.error('Gagal mengambil data user', err);
    }
  };

  const handleDelete = (id) => {
    setConfirmDeleteId(id);
  };

  const confirmDelete = async () => {
    try {
      await api.delete(`/api/users/${confirmDeleteId}`);
      setConfirmDeleteId(null);
      fetchUsers();
    } catch (err) {
      console.error('Gagal menghapus user', err);
    }
  };

  const openAddModal = () => {
    setIsEdit(false);
    setForm({ id: null, name: '', email: '', password: '', role: 'admin' });
    setErrors({});
    setShowModal(true);
  };

  const openEditModal = (user) => {
    setIsEdit(true);
    setForm({ ...user, password: '' });
    setErrors({});
    setShowModal(true);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const data = { ...form };
      if (isEdit && data.password === '') {
        delete data.password;
      }

      setErrors({});
      if (isEdit) {
        await api.put(`/api/users/${form.id}`, data);
      } else {
        await api.post('/api/users', data);
      }

      setShowModal(false);
      fetchUsers();
    } catch (err) {
      if (err.response?.status === 422) {
        setErrors(err.response.data.errors || {});
      } else {
        console.error('Gagal menyimpan data user', err);
        alert('Terjadi kesalahan saat menyimpan data.');
      }
    }
  };

  if (role !== 'admin') {
    return (
      <Layout>
        <div className="p-4">
          <h1 className="text-xl font-semibold text-red-600">
            Akses ditolak: Hanya admin yang bisa melihat halaman ini.
          </h1>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="p-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl">Manajemen User</h2>
          <button
            onClick={openAddModal}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            + Tambah
          </button>
        </div>

        {/* Table */}
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Nama</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Role</th>
              <th className="border p-2 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td className="border p-2">{u.name}</td>
                <td className="border p-2">{u.email}</td>
                <td className="border p-2 capitalize">{u.role}</td>
                <td className="border p-2 text-center space-x-2">
                  <button
                    onClick={() => openEditModal(u)}
                    className="bg-blue-50 hover:bg-blue-100 text-blue-600 hover:text-blue-800 px-3 py-2 rounded-md transition duration-200"
                    title="Edit"
                  >
                    <i className="bi bi-pencil-fill"></i>
                  </button>
                  <button
                    onClick={() => handleDelete(u.id)}
                    className="bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-800 px-3 py-2 rounded-md transition duration-200"
                    title="Hapus"
                  >
                    <i className="bi bi-trash-fill"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Modal Tambah/Edit */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/10">
            <div className="bg-white p-6 rounded w-full max-w-lg relative shadow-lg">
              <h2 className="text-xl font-semibold mb-4">
                {isEdit ? 'Edit User' : 'Tambah User'}
              </h2>
              <div className="space-y-4">
                <div>
                  <input
                    type="text"
                    name="name"
                    placeholder="Nama"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full border px-3 py-2 rounded"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm">{errors.name[0]}</p>
                  )}
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full border px-3 py-2 rounded"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm">{errors.email[0]}</p>
                  )}
                </div>
                <div>
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                    className="w-full border px-3 py-2 rounded"
                  />
                  {!isEdit && errors.password && (
                    <p className="text-red-500 text-sm">{errors.password[0]}</p>
                  )}
                </div>
                <div>
                  <select
                    name="role"
                    value={form.role}
                    onChange={handleChange}
                    className="w-full border px-3 py-2 rounded"
                  >
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                  </select>
                  {errors.role && (
                    <p className="text-red-500 text-sm">{errors.role[0]}</p>
                  )}
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded text-gray-600 hover:text-black"
                >
                  Batal
                </button>
                <button
                  onClick={handleSubmit}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                >
                  Simpan
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal Konfirmasi Hapus */}
        {confirmDeleteId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/10">
            <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
              <h2 className="text-lg font-semibold mb-4 text-red-600 flex items-center">
                <i className="bi bi-exclamation-triangle-fill mr-2 text-xl" />
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
}

export default Users;
