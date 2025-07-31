import { useEffect, useState } from 'react';
import api from '../../axios';
import AlamatTab from './PemasokTab/AlamatTab';
import TerminTab from './PemasokTab/TerminTab';
import KontakTab from './PemasokTab/KontakTab';
import CatatanTab from './PemasokTab/CatatanTab';

const PemasokForm = ({ show, onClose, editMode = false, data = null, onSuccess }) => {
  const [tab, setTab] = useState('alamat');
  const [formData, setFormData] = useState({
    is_active: true,
    no_pemasok: '',
    nama: '',
    alamat: '',
    kota: '',
    provinsi: '',
    kode_pos: '',
    negara: '',
    telepon: '',
    faksimili: '',
    kontak: '',
    email: '',
    website: '',
    termin_id: '',
    currency_id: '',
    saldo_awal: 0,
    saldo_awal_tanggal: '',
    default_keterangan: '',
    pajak_1_id: '',
    pajak_2_id: '',
    npwp: '',
    tax_type_id: '',
    pesan: '',
    catatan: '',
    kontak_pemasok: [],
  });

  useEffect(() => {
    if (editMode && data) {
      setFormData({
        ...data,
        kontak_pemasok: data.kontak_pemasok || [],
      });
    }
  }, [editMode, data]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleKontakChange = (kontakList) => {
    setFormData((prev) => ({
      ...prev,
      kontak_pemasok: kontakList,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.no_pemasok || !formData.nama) {
      alert('No Pemasok dan Nama wajib diisi pada tab Alamat!');
      setTab('alamat');
      return;
    }

    try {
      if (editMode) {
        await api.put(`/api/pemasok/${data.id}`, formData);
      } else {
        await api.post('/api/pemasok', formData);
      }
      onSuccess();
      onClose();
    } catch (err) {
      console.error('Submit error:', err.response?.data || err.message);
      alert('Gagal menyimpan data. Periksa input!');
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/20">
      <div className="bg-white w-full max-w-5xl rounded-lg shadow-xl p-6 overflow-y-auto max-h-[90vh]">
        <div className="relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            aria-label="Tutup"
          >
            <i className="bi bi-x-lg text-xl"></i>
          </button>
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          {editMode ? 'Edit Pemasok' : 'Tambah Pemasok'}
        </h2>

        {/* Tabs Navigasi */}
        <div className="flex border-b border-gray-200 mb-6">
          {[
            { id: 'alamat', label: 'Alamat' },
            { id: 'termin', label: 'Termin' },
            { id: 'kontak', label: 'Kontak' },
            { id: 'catatan', label: 'Catatan' },
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setTab(item.id)}
              className={`px-4 py-2 font-medium text-sm focus:outline-none ${
                tab === item.id
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit}>
          <div className="p-4 bg-gray-50 rounded-lg">
            {tab === 'alamat' && (
              <AlamatTab formData={formData} onChange={handleChange} />
            )}
            {tab === 'termin' && (
              <TerminTab formData={formData} onChange={handleChange} />
            )}
            {tab === 'kontak' && (
              <KontakTab
                kontakList={formData.kontak_pemasok}
                onChange={handleKontakChange}
              />
            )}
            {tab === 'catatan' && (
              <CatatanTab
                value={formData.catatan}
                onChange={(val) =>
                  setFormData((prev) => ({ ...prev, catatan: val }))
                }
              />
            )}
          </div>

          {/* Tombol Aksi */}
          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-6 py-2 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PemasokForm;
