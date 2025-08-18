import React, { useEffect, useState } from 'react';
import TabUmum from './Tabs/TabUmum';
import TabAkunAkun from './Tabs/TabAkunAkun';
import api from '../../axios';

const BarangdanjasaForm = ({ id, onClose }) => {
  const [activeTab, setActiveTab] = useState('umum');
  const [errorMessage, setErrorMessage] = useState('');
  const [hasVisitedAkunTab, setHasVisitedAkunTab] = useState(false);
  const [showAkunValidationModal, setShowAkunValidationModal] = useState(false);

  // Definisikan akunFieldsMap di dalam komponen
  const akunFieldsMap = {
    Persedian: [
      { field: 'akun_persediaan_id', allowedType: 'Persediaan', defaultNama: 'Barang Jadi Sendiri' },
      { field: 'akun_penjualan_id', allowedType: ['Pendapatan', 'Pendapatan Lain'], defaultNama: 'Penjualan barang Sendiri' },
      { field: 'akun_return_penjualan_id', allowedType: ['Pendapatan', 'Pendapatan Lain'], defaultNama: '(Return Penjualan)' },
      { field: 'akun_diskon_penjualan_id', allowedType: ['Pendapatan', 'Pendapatan Lain'], defaultNama: '(Disc. Penjualan)' },
      { field: 'akun_hpp_id', allowedType: 'Harga Pokok Penjualan', defaultNama: 'HPP Penjualan Barang Sendiri' },
      { field: 'akun_return_pembelian_id', allowedType: 'Persediaan', defaultNama: 'Barang Jadi Sendiri' },
      { field: 'akun_belum_tertagih_id', allowedType: 'Hutang lancar lainnya', defaultNama: 'Hutang Penerimaan Barang' },
      { field: 'akun_inventory_controller_id', allowedType: 'Aktiva Lancar lainnya' },
    ],
    'Non Persedian': [
      { field: 'akun_beban_id', defaultNama: 'HPP Penjualan Jasa Pasang' },
      { field: 'akun_penjualan_id', allowedType: ['Pendapatan', 'Pendapatan Lain'], defaultNama: 'Penjualan Jasa Pasang' },
      { field: 'akun_return_penjualan_id', allowedType: ['Pendapatan', 'Pendapatan Lain'], defaultNama: 'Penjualan Jasa Pasang' },
      { field: 'akun_diskon_penjualan_id', allowedType: ['Pendapatan', 'Pendapatan Lain'], defaultNama: '(Disc. Penjualan)' },
      { field: 'akun_return_pembelian_id', allowedType: 'Persediaan', defaultNama: 'Barang Jadi Sendiri' },
      { field: 'akun_belum_tertagih_id', allowedType: 'Hutang lancar lainnya', defaultNama: 'Hutang Penerimaan Barang' },
    ],
    Servis: [
      { field: 'akun_penjualan_id', allowedType: ['Pendapatan', 'Pendapatan Lain'] },
      { field: 'akun_diskon_penjualan_id', allowedType: ['Pendapatan', 'Pendapatan Lain'] },
      { field: 'akun_return_penjualan_id', allowedType: ['Pendapatan', 'Pendapatan Lain'] },
    ],
  };

  const initialFormData = {
    tipe_item: 'Persedian',
    non_aktif: false,
    no_item: '',
    keterangan: '',
    saldo_awal_kuantitas: 0,
    saldo_awal_harga_per_unit: 0,
    saldo_awal_harga_pokok: 0,
    saldo_saat_ini_kuantitas: 0,
    saldo_saat_ini_harga_per_unit: 0,
    saldo_saat_ini_harga_pokok: 0,
    kategori_id: '',
    per_tanggal: '',
    unit: '',
    harga_jual: 0,
    diskon_penjualan: 0,
    kode_pajak_penjualan: '',
    default_unit: 0,
    diskon_pembelian: 0,
    kode_pajak_pembelian: '',
    pemasok_utama_id: '',
    min_jumlah_reorder: 0,
    akun: {
      akun_persediaan_id: '',
      akun_penjualan_id: '',
      akun_return_penjualan_id: '',
      akun_diskon_penjualan_id: '',
      akun_hpp_id: '',
      akun_return_pembelian_id: '',
      akun_belum_tertagih_id: '',
      akun_inventory_controller_id: '',
      akun_beban_id: '',
    }
  };

  const [formData, setFormData] = useState(initialFormData);

  const fetchData = async () => {
    if (id) {
      try {
        const res = await api.get(`/api/barang-jasa/${id}`);
        const data = res.data;

        const akun = data.akun ?? {};
        const updatedForm = {
          ...initialFormData,
          ...data,
          akun: {
            akun_persediaan_id: akun.akun_persediaan_id ?? '',
            akun_penjualan_id: akun.akun_penjualan_id ?? '',
            akun_return_penjualan_id: akun.akun_return_penjualan_id ?? '',
            akun_diskon_penjualan_id: akun.akun_diskon_penjualan_id ?? '',
            akun_hpp_id: akun.akun_hpp_id ?? '',
            akun_return_pembelian_id: akun.akun_return_pembelian_id ?? '',
            akun_belum_tertagih_id: akun.akun_belum_tertagih_id ?? '',
            akun_inventory_controller_id: akun.akun_inventory_controller_id ?? '',
            akun_beban_id: akun.akun_beban_id ?? '',
          }
        };

        setFormData(updatedForm);
        setHasVisitedAkunTab(true);
      } catch (err) {
        console.error('Gagal mengambil data:', err);
        setErrorMessage('Gagal mengambil data dari server.');
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const validateAkunFields = () => {
    const requiredFields = [];
    const tipeItem = formData.tipe_item;
    
    if (akunFieldsMap[tipeItem]) {
      requiredFields.push(...akunFieldsMap[tipeItem].map(item => item.field));
    }
    
    return requiredFields.every(field => formData.akun[field]);
  };

  const handleSubmit = async () => {
    try {
      setErrorMessage('');

      if (!hasVisitedAkunTab) {
        setShowAkunValidationModal(true);
        return;
      }

      if (!validateAkunFields()) {
        setShowAkunValidationModal(true);
        return;
      }

      const payload = {
        ...formData,
        akun: formData.akun ?? {}
      };

      if (id) {
        await api.put(`/api/barang-jasa/${id}`, payload);
      } else {
        await api.post('/api/barang-jasa', payload);
      }

      onClose();
    } catch (error) {
      console.error('Gagal menyimpan data:', error);
      if (error.response?.data?.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('Terjadi kesalahan saat menyimpan data.');
      }
    }
  };

  const handleTabChange = (tabId) => {
    if (tabId === 'akun') {
      setHasVisitedAkunTab(true);
    }
    setActiveTab(tabId);
  };

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
          {id ? 'Edit Barang/Jasa' : 'Tambah Barang/Jasa'}
        </h2>

        {errorMessage && (
          <div className="bg-red-100 border border-red-300 text-red-700 p-3 rounded mb-4">
            {errorMessage}
          </div>
        )}

        <div className="flex border-b border-gray-200 mb-6">
          {[
            { id: 'umum', label: 'Umum' },
            { id: 'akun', label: 'Akun-Akun' },
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => handleTabChange(item.id)}
              className={`px-4 py-2 font-medium text-sm focus:outline-none ${
                activeTab === item.id
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="p-4 bg-gray-50 rounded-lg">
          {activeTab === 'umum' && (
            <TabUmum formData={formData} setFormData={setFormData} />
          )}
          {activeTab === 'akun' && (
            <TabAkunAkun formData={formData} setFormData={setFormData} />
          )}
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Batal
          </button>
          <button
            onClick={handleSubmit}
            className="px-6 py-2 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Simpan
          </button>
        </div>
      </div>

      {showAkunValidationModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/20">
          <div className="bg-white w-full max-w-md rounded-lg shadow-xl p-6">
            <div className="mb-4">
              <h3 className="text-lg font-medium text-gray-900">Perhatian</h3>
            </div>
            <div className="mb-6">
              <p className="text-sm text-gray-600">
                Anda belum membuka tab Akun-Akun atau ada akun yang belum diisi. 
                Silakan buka tab Akun-Akun terlebih dahulu dan pastikan semua akun yang wajib diisi telah terisi.
              </p>
            </div>
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowAkunValidationModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Tutup
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveTab('akun');
                  setHasVisitedAkunTab(true);
                  setShowAkunValidationModal(false);
                }}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
              >
                Buka Tab Akun
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BarangdanjasaForm;