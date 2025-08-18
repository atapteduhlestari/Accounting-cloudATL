import React, { useEffect, useState } from 'react';
import api from '../../axios';

const BarangdanjasaDetail = ({ id, onClose }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await api.get(`/api/barang-jasa/${id}`);
        setData(res.data);
      } catch (error) {
        console.error('Gagal mengambil detail:', error);
      }
    };
    fetch();
  }, [id]);

  if (!data) return null;

  const akun = data.akun || {};
  const tipeItem = data.tipe_item;

  const akunFieldsMap = {
    Persedian: [
      { label: 'Persediaan', key: 'akun_persediaan' },
      { label: 'Penjualan', key: 'akun_penjualan' },
      { label: 'Return Penjualan', key: 'akun_return_penjualan' },
      { label: 'Diskon Penjualan', key: 'akun_diskon_penjualan' },
      { label: 'HPP', key: 'akun_hpp' },
      { label: 'Return Pembelian', key: 'akun_return_pembelian' },
      { label: 'Belum Tertagih', key: 'akun_belum_tertagih' },
      { label: 'Inventory Ctrl', key: 'akun_inventory_controller' },
    ],
    'Non Persedian': [
      { label: 'Beban', key: 'akun_beban' },
      { label: 'Penjualan', key: 'akun_penjualan' },
      { label: 'Return Penjualan', key: 'akun_return_penjualan' },
      { label: 'Diskon Penjualan', key: 'akun_diskon_penjualan' },
      { label: 'Return Pembelian', key: 'akun_return_pembelian' },
      { label: 'Belum Tertagih', key: 'akun_belum_tertagih' },
    ],
    Servis: [
      { label: 'Penjualan', key: 'akun_penjualan' },
      { label: 'Diskon Penjualan', key: 'akun_diskon_penjualan' },
    ],
  };

  const akunFields = akunFieldsMap[tipeItem] || [];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-auto">
      <div className="bg-white w-full max-w-xl rounded-lg p-4 relative shadow-md">
        <button onClick={onClose} className="absolute top-2 right-3 text-red-600 font-bold text-lg">×</button>
        <h2 className="text-lg font-semibold mb-4 text-center">Detail Barang / Jasa</h2>

        <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-sm">
          <p><strong>No Item:</strong> {data.no_item}</p>
          <p><strong>Tipe:</strong> {data.tipe_item}</p>
          <p><strong>Keterangan:</strong> {data.keterangan}</p>
          <p><strong>Unit:</strong> {data.unit}</p>
          <p><strong>Kategori:</strong> {data.kategori?.nama || '-'}</p>
          <p><strong>Non Aktif:</strong> {data.non_aktif ? 'Ya' : 'Tidak'}</p>
        </div>

        <div className="border-t my-3 pt-2">
          <h3 className="font-semibold text-sm mb-2">Saldo Awal</h3>
          <div className="grid grid-cols-3 text-xs gap-x-4">
            <p><strong>Kuantitas:</strong> {data.saldo_awal_kuantitas}</p>
            <p><strong>Harga/Unit:</strong> {data.saldo_awal_harga_per_unit}</p>
            <p><strong>Harga Pokok:</strong> {data.saldo_awal_harga_pokok}</p>
          </div>
        </div>

        <div className="border-t my-3 pt-2">
          <h3 className="font-semibold text-sm mb-2">Saldo Saat Ini</h3>
          <div className="grid grid-cols-3 text-xs gap-x-4">
            <p><strong>Kuantitas:</strong> {data.saldo_saat_ini_kuantitas}</p>
            <p><strong>Harga/Unit:</strong> {data.saldo_saat_ini_harga_per_unit}</p>
            <p><strong>Harga Pokok:</strong> {data.saldo_saat_ini_harga_pokok}</p>
          </div>
        </div>

        <div className="border-t my-3 pt-2">
          <h3 className="font-semibold text-sm mb-2">Informasi Penjualan</h3>
          <div className="grid grid-cols-3 text-xs gap-x-4">
            <p><strong>Harga Jual:</strong> {data.harga_jual}</p>
            <p><strong>Diskon (%):</strong> {data.diskon_penjualan}</p>
            <p><strong>Kode Pajak Penjualan:</strong> {data.kode_pajak_penjualan}</p>
          </div>
        </div>

        <div className="border-t my-3 pt-2">
          <h3 className="font-semibold text-sm mb-2">Informasi Pembelian</h3>
          <div className="grid grid-cols-2 text-xs gap-x-4">
            <p><strong>Default Unit:</strong> {data.default_unit}</p>
            <p><strong>Diskon (%):</strong> {data.diskon_pembelian}</p>
            <p><strong>Kode Pajak Pembelian:</strong> {data.kode_pajak_pembelian}</p>
            <p><strong>Pemasok Utama:</strong> {data.pemasok_utama?.nama || '-'}</p>
            <p><strong>Min. Reorder:</strong> {data.min_jumlah_reorder}</p>
          </div>
        </div>

        <div className="border-t my-3 pt-2">
          <h3 className="font-semibold text-sm mb-2">Akun-Akun</h3>
          <div className="grid grid-cols-2 text-xs gap-x-4">
            {akunFields.map(({ label, key }) => (
              <p key={key}><strong>{label}:</strong> {akun[key]?.nama || '-'}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BarangdanjasaDetail;
