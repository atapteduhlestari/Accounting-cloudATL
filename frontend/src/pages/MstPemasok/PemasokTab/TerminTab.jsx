import { useEffect, useState } from 'react';
import api from '../../../axios';

const TerminTab = ({ formData, onChange }) => {
  const [paymentTerms, setPaymentTerms] = useState([]);
  const [selectedTerm, setSelectedTerm] = useState(null);
  const [currencies, setCurrencies] = useState([]);
  const [taxes, setTaxes] = useState([]);
  const [taxTypes, setTaxTypes] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const term = paymentTerms.find(
      (t) => t.id === parseInt(formData.termin_id)
    );
    setSelectedTerm(term || null);
  }, [formData.termin_id, paymentTerms]);

  const fetchData = async () => {
    try {
      const [termRes, currRes, taxRes, typeRes] = await Promise.all([
        api.get('/api/payment_terms'),
        api.get('/api/currencies'),
        api.get('/api/mst_tax'),
        api.get('/api/type_taxes'),
      ]);
      setPaymentTerms(termRes.data);
      setCurrencies(currRes.data);
      setTaxes(taxRes.data);
      setTaxTypes(typeRes.data);
    } catch (err) {
      console.error('Fetch error:', err);
    }
  };

  return (
    <div className="grid gap-6">
      {/* Termin */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Termin</label>
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            name="termin_id"
            value={formData.termin_id}
            onChange={onChange}
          >
            <option value="">-- Pilih Termin --</option>
            {paymentTerms.map((term) => (
              <option key={term.id} value={term.id}>
                {term.name}
              </option>
            ))}
          </select>
          {selectedTerm && (
            <div className="mt-2 text-sm text-gray-600 bg-blue-50 p-2 rounded">
              <p>Pay within: {selectedTerm.pay_within_days} hari</p>
              <p>Diskon: {selectedTerm.discount_percent}%</p>
              <p>Jatuh tempo: {selectedTerm.due_days} hari</p>
            </div>
          )}
        </div>
      </div>

      {/* Mata Uang, Saldo, Tanggal */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Mata Uang</label>
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            name="currency_id"
            value={formData.currency_id}
            onChange={onChange}
          >
            <option value="">-- Pilih Mata Uang --</option>
            {currencies.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Saldo Awal</label>
          <input
            type="number"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            name="saldo_awal"
            value={formData.saldo_awal}
            onChange={onChange}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Per Tanggal</label>
          <input
            type="date"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            name="saldo_awal_tanggal"
            value={formData.saldo_awal_tanggal}
            onChange={onChange}
          />
        </div>
      </div>

      {/* Keterangan */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Default Keterangan</label>
        <textarea
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          name="default_keterangan"
          rows="2"
          value={formData.default_keterangan}
          onChange={onChange}
        ></textarea>
      </div>

      {/* Pajak 1, Pajak 2, NPWP */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Pajak 1</label>
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            name="pajak_1_id"
            value={formData.pajak_1_id}
            onChange={onChange}
          >
            <option value="">-- Pilih Pajak --</option>
            {taxes.map((t) => (
              <option key={t.id} value={t.id}>
                {t.nama}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Pajak 2</label>
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            name="pajak_2_id"
            value={formData.pajak_2_id}
            onChange={onChange}
          >
            <option value="">-- Pilih Pajak --</option>
            {taxes.map((t) => (
              <option key={t.id} value={t.id}>
                {t.nama}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">NPWP Pemasok</label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            name="npwp"
            value={formData.npwp}
            onChange={onChange}
          />
        </div>
      </div>

      {/* Tax Type */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Tax Type</label>
        <select
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          name="tax_type_id"
          value={formData.tax_type_id}
          onChange={onChange}
        >
          <option value="">-- Pilih Jenis Pajak --</option>
          {taxTypes.map((t) => (
            <option key={t.id} value={t.id}>
              {t.nama}
            </option>
          ))}
        </select>
      </div>

      {/* Pesan */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Pesan</label>
        <textarea
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          name="pesan"
          rows="2"
          value={formData.pesan}
          onChange={onChange}
        ></textarea>
      </div>
    </div>
  );
};

export default TerminTab;
