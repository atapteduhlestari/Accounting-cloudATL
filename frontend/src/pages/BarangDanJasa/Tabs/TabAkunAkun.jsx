import React, { useEffect, useState } from 'react';
import api from '../../../axios';

const akunFieldsMap = {
  Persedian: [
    { label: 'Akun Persediaan', field: 'akun_persediaan_id', allowedType: 'Persediaan', defaultNama: 'Barang Jadi Sendiri' },
    { label: 'Akun Penjualan', field: 'akun_penjualan_id', allowedType: ['Pendapatan', 'Pendapatan Lain'], defaultNama: 'Penjualan barang Sendiri' },
    { label: 'Akun Return Penjualan', field: 'akun_return_penjualan_id', allowedType: ['Pendapatan', 'Pendapatan Lain'], defaultNama: '(Return Penjualan)' },
    { label: 'Akun Diskon Penjualan', field: 'akun_diskon_penjualan_id', allowedType: ['Pendapatan', 'Pendapatan Lain'], defaultNama: '(Disc. Penjualan)' },
    { label: 'Akun HPP', field: 'akun_hpp_id', allowedType: 'Harga Pokok Penjualan', defaultNama: 'HPP Penjualan Barang Sendiri' },
    { label: 'Akun Return Pembelian', field: 'akun_return_pembelian_id', allowedType: 'Persediaan', defaultNama: 'Barang Jadi Sendiri' },
    { label: 'Akun Belum Tertagih', field: 'akun_belum_tertagih_id', allowedType: 'Hutang lancar lainnya', defaultNama: 'Hutang Penerimaan Barang' },
    { label: 'Akun Inventory Controller', field: 'akun_inventory_controller_id', allowedType: 'Aktiva Lancar lainnya' },
  ],
  'Non Persedian': [
    { label: 'Akun Beban', field: 'akun_beban_id',defaultNama:'HPP Penjualan Jasa Pasang' },
    { label: 'Akun Penjualan', field: 'akun_penjualan_id', allowedType: ['Pendapatan', 'Pendapatan Lain'], defaultNama:'Penjualan Jasa Pasang' },
    { label: 'Akun Return Penjualan', field: 'akun_return_penjualan_id', allowedType: ['Pendapatan', 'Pendapatan Lain'], defaultNama:'Penjualan Jasa Pasang' },
    { label: 'Akun Diskon Penjualan', field: 'akun_diskon_penjualan_id', allowedType: ['Pendapatan', 'Pendapatan Lain'], defaultNama:'(Disc. Penjualan)' },
    { label: 'Akun Return Pembelian', field: 'akun_return_pembelian_id', allowedType: 'Persediaan', defaultNama:'Barang Jadi Sendiri'},
    { label: 'Akun Belum Tertagih', field: 'akun_belum_tertagih_id', allowedType: 'Hutang lancar lainnya', defaultNama:'Hutang Penerimaan Barang' },
  ],
  Servis: [
    { label: 'Akun Penjualan', field: 'akun_penjualan_id', allowedType: ['Pendapatan', 'Pendapatan Lain'] },
    { label: 'Akun Diskon Penjualan', field: 'akun_diskon_penjualan_id', allowedType: ['Pendapatan', 'Pendapatan Lain'] },
    { label: 'Akun Return Penjualan', field: 'akun_return_penjualan_id', allowedType: ['Pendapatan', 'Pendapatan Lain'] },
  ],
};

const TabAkunAkun = ({ formData, setFormData }) => {
  const [akunList, setAkunList] = useState([]);
  const tipeItem = formData?.tipe_item || 'Persedian';
  const akunFields = akunFieldsMap[tipeItem] || [];

  // Fungsi untuk normalisasi string (biar tidak sensitif kapital/spasi)
const normalize = (str) =>
  (str || '').toLowerCase().replace(/\s+/g, ' ').trim();

useEffect(() => {
  const fetchAkun = async () => {
    try {
      const res = await api.get('/api/chart-of-accounts-barang');
      const data = Array.isArray(res.data) ? res.data : res.data?.data || [];
      setAkunList(data);

      // Jika membuat data baru, set default akun
      if (!formData?.id) {
        const defaultValues = {};
        akunFields.forEach(({ field, defaultNama }) => {
          if (defaultNama) {
            const match = data.find((a) => normalize(a.nama) === normalize(defaultNama));
            if (match) {
              defaultValues[field] = match.id;
            }
          }
        });
        setFormData((prev) => ({
          ...prev,
          akun: {
            ...prev.akun,
            ...defaultValues,
          },
        }));
      }
    } catch (err) {
      console.error('Gagal mengambil data akun:', err);
    }
  };

  fetchAkun();
}, [formData?.id, tipeItem]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      akun: {
        ...prev.akun,
        [field]: value,
      },
    }));
  };

  const optionsForField = (fieldObj) => {
    const { allowedType } = fieldObj;
    if (!allowedType) return akunList;

    return akunList.filter((a) => {
      const tipeNama = a?.tipe_akun?.nama || '';
      if (Array.isArray(allowedType)) {
        return allowedType.includes(tipeNama);
      }
      return tipeNama === allowedType;
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {akunFields.map(({ label, field, allowedType }) => (
        <div key={field}>
          <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
          <select
            value={formData?.akun?.[field] ?? ''}
            onChange={(e) => handleChange(field, e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">-- Pilih Akun --</option>
            {optionsForField({ allowedType }).map((akun) => (
              <option key={akun.id} value={akun.id}>
                {akun.nomor_akun ? `${akun.nomor_akun} - ${akun.nama}` : akun.nama}
              </option>
            ))}
          </select>
        </div>
      ))}
    </div>
  );
};

export default TabAkunAkun;
