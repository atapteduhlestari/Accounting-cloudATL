import React, { useEffect, useState } from "react";
import api from "../../../axios";

const TabUmum = ({ formData, setFormData }) => {
  const [kategoriList, setKategoriList] = useState([]);
  const [pemasokList, setPemasokList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [kategoriRes, pemasokRes] = await Promise.all([
          api.get("/api/kategori-barang"),
          api.get("/api/pemasok"),
        ]);

        setKategoriList(Array.isArray(kategoriRes.data) ? kategoriRes.data : []);
        setPemasokList(Array.isArray(pemasokRes.data) ? pemasokRes.data : []);
      } catch (error) {
        console.error("Gagal fetch data:", error);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === "checkbox" ? checked : value;

    let updatedFormData = { ...formData, [name]: val };

    if (
      name === "saldo_awal_kuantitas" ||
      name === "saldo_awal_harga_per_unit"
    ) {
      const kuantitas = parseFloat(
        name === "saldo_awal_kuantitas" ? val : formData.saldo_awal_kuantitas || 0
      );
      const hargaPerUnit = parseFloat(
        name === "saldo_awal_harga_per_unit" ? val : formData.saldo_awal_harga_per_unit || 0
      );
      const hargaPokok = kuantitas * hargaPerUnit;

      updatedFormData.saldo_awal_harga_pokok = hargaPokok.toFixed(2);
    }

    setFormData(updatedFormData);
  };

  return (
    <div className="space-y-6">
      {/* Tipe Item & Non Aktif */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Tipe Item</label>
          <select
            name="tipe_item"
            value={formData.tipe_item || ""}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">-- Pilih Tipe --</option>
            <option value="Persedian">Persedian</option>
            <option value="Non Persedian">Non Persedian</option>
            <option value="Servis">Servis</option>
          </select>
        </div>
        <div className="flex items-end">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              name="non_aktif"
              checked={formData.non_aktif || false}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <span className="ml-2 text-sm text-gray-700">Non Aktif</span>
          </label>
        </div>
      </div>

      {/* No Item */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">No. Item</label>
        <input
          type="text"
          name="no_item"
          value={formData.no_item || ""}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Keterangan */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Keterangan</label>
        <textarea
          name="keterangan"
          value={formData.keterangan || ""}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm resize-none focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Informasi Persediaan */}
      <div>
        <h4 className="font-semibold text-gray-800">Informasi Persediaan</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
          {[
            { label: 'Kuantitas (Awal)', name: 'saldo_awal_kuantitas' },
            { label: 'Harga/Unit (Awal)', name: 'saldo_awal_harga_per_unit' },
            { label: 'Harga Pokok (Awal)', name: 'saldo_awal_harga_pokok', readOnly: true },
          ].map(({ label, name, readOnly }) => (
            <div key={name}>
              <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
              <input
                type="number"
                name={name}
                value={formData[name] || 0}
                onChange={handleChange}
                readOnly={readOnly}
                className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm ${readOnly ? 'bg-gray-100' : ''} focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
              />
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          {[
            { label: 'Kuantitas (Saat Ini)', name: 'saldo_saat_ini_kuantitas' },
            { label: 'Harga/Unit (Saat Ini)', name: 'saldo_saat_ini_harga_per_unit' },
            { label: 'Harga Pokok (Saat Ini)', name: 'saldo_saat_ini_harga_pokok' },
          ].map(({ label, name }) => (
            <div key={name}>
              <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
              <input
                type="number"
                value={formData[name] || 0}
                readOnly
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Kategori */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Kategori</label>
        <select
          name="kategori_id"
          value={formData.kategori_id || ""}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">-- Pilih Kategori --</option>
          {kategoriList.map((kategori) => (
            <option key={kategori.id} value={kategori.id}>
              {kategori.nama}
            </option>
          ))}
        </select>
      </div>

      {/* Per Tanggal & Unit */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Per Tanggal</label>
          <input
            type="date"
            name="per_tanggal"
            value={formData.per_tanggal || ""}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Unit</label>
          <input
            type="text"
            name="unit"
            value={formData.unit || ""}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Informasi Penjualan */}
      <div>
        <h4 className="font-semibold text-gray-800 mt-6">Informasi Penjualan</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Harga Jual</label>
            <input
              type="number"
              name="harga_jual"
              value={formData.harga_jual || 0}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Diskon (%)</label>
            <input
              type="number"
              name="diskon_penjualan"
              value={formData.diskon_penjualan || 0}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Kode Pajak Penjualan</label>
            <input
              type="text"
              name="kode_pajak_penjualan"
              value={formData.kode_pajak_penjualan || ""}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Informasi Pembelian */}
      <div>
        <h4 className="font-semibold text-gray-800 mt-6">Informasi Pembelian</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Default Unit</label>
            <input
              type="number"
              name="default_unit"
              value={formData.default_unit || 0}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Diskon Pembelian (%)</label>
            <input
              type="number"
              name="diskon_pembelian"
              value={formData.diskon_pembelian || 0}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Kode Pajak Pembelian</label>
            <input
              type="text"
              name="kode_pajak_pembelian"
              value={formData.kode_pajak_pembelian || ""}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Pemasok Utama</label>
            <select
              name="pemasok_utama_id"
              value={formData.pemasok_utama_id || ""}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">-- Pilih Pemasok --</option>
              {pemasokList.map((pemasok) => (
                <option key={pemasok.id} value={pemasok.id}>
                  {pemasok.nama}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Min. Jumlah Reorder</label>
            <input
              type="number"
              name="min_jumlah_reorder"
              value={formData.min_jumlah_reorder || 0}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TabUmum;
