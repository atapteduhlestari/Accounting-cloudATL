import React, { useEffect, useState } from 'react';
import api from '../../../axios';

const SalesTab = ({ form, setForm }) => {
  const [taxes, setTaxes] = useState([]);
  const [customerTypes, setCustomerTypes] = useState([]);

  const update = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    api.get('/api/mst_tax').then((res) => setTaxes(res.data));
    api.get('/api/customer_types').then((res) => setCustomerTypes(res.data));
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Pajak 1 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Pajak 1
        </label>
        <select
          value={form.tax1_id || ''}
          onChange={(e) => update('tax1_id', parseInt(e.target.value))}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">-- Pilih Pajak --</option>
          {taxes.map((tax) => (
            <option key={tax.id} value={tax.id}>
              {tax.nama} ({tax.nilai}%)
            </option>
          ))}
        </select>
      </div>

      {/* Pajak 2 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Pajak 2
        </label>
        <select
          value={form.tax2_id || ''}
          onChange={(e) => update('tax2_id', parseInt(e.target.value))}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">-- Pilih Pajak --</option>
          {taxes.map((tax) => (
            <option key={tax.id} value={tax.id}>
              {tax.nama} ({tax.nilai}%)
            </option>
          ))}
        </select>
      </div>

      {/* NPWP */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          NPWP Pelanggan
        </label>
        <input
          type="text"
          value={form.tax_number}
          onChange={(e) => update('tax_number', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Tax Code */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Kode Pajak
        </label>
        <input
          type="text"
          value={form.tax_code}
          onChange={(e) => update('tax_code', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Tax Address 1 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Alamat Pajak 1
        </label>
        <input
          type="text"
          value={form.tax_address1}
          onChange={(e) => update('tax_address1', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Tax Address 2 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Alamat Pajak 2
        </label>
        <input
          type="text"
          value={form.tax_address2}
          onChange={(e) => update('tax_address2', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Tipe Pelanggan */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Tipe Pelanggan
        </label>
        <select
          value={form.customer_type_id || ''}
          onChange={(e) => update('customer_type_id', parseInt(e.target.value))}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">-- Pilih Tipe --</option>
          {customerTypes.map((type) => (
            <option key={type.id} value={type.id}>
              {type.name}
            </option>
          ))}
        </select>
      </div>

      {/* Tingkat Harga Jual */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Tingkat Harga Jual
        </label>
        <select
          value={form.price_level || 1}
          onChange={(e) => update('price_level', parseInt(e.target.value))}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        >
          {[1, 2, 3, 4, 5].map((level) => (
            <option key={level} value={level}>
              {level}
            </option>
          ))}
        </select>
      </div>

      {/* Default Diskon Penjualan */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Default Diskon Penjualan (%)
        </label>
        <input
          type="number"
          value={form.default_sales_discount}
          onChange={(e) => update('default_sales_discount', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
    </div>
  );
};

export default SalesTab;
