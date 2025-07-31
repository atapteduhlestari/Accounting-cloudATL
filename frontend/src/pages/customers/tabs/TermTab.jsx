import React, { useEffect, useState } from 'react';
import api from '../../../axios';

const TermTab = ({ form, setForm }) => {
  const [termsList, setTermsList] = useState([]);
  const [currencies, setCurrencies] = useState([]);
  const [selectedTerm, setSelectedTerm] = useState(null);

  const update = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    api.get('/api/payment_terms').then((res) => setTermsList(res.data));
    api.get('/api/currencies').then((res) => setCurrencies(res.data));
  }, []);

  useEffect(() => {
    if (form.payment_term_id && termsList.length > 0) {
      const term = termsList.find((t) => t.id === form.payment_term_id);
      setSelectedTerm(term);
    } else {
      setSelectedTerm(null);
    }
  }, [form.payment_term_id, termsList]);

  const handleInvoiceLimit = (checked) => {
    if (checked) {
      update('max_invoice_amount', -1);
    } else {
      update('max_invoice_amount', '');
    }
  };

  return (
    <div className="grid gap-6">
      {/* Terms dan Batas Kredit */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Terms
          </label>
          <select
            value={form.payment_term_id || ''}
            onChange={(e) =>
              update('payment_term_id', parseInt(e.target.value))
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">-- Pilih Terms --</option>
            {termsList.map((term) => (
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
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Batas Kredit
          </label>
          <input
            type="number"
            value={form.credit_limit}
            onChange={(e) => update('credit_limit', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Jumlah Faktur Penjualan Jatuh Tempo + Unlimited */}
      <div className="flex items-start gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Jumlah Faktur Penjualan Jatuh Tempo
          </label>
          <input
            type="number"
            value={
              form.max_invoice_amount === -1 ? '' : form.max_invoice_amount
            }
            onChange={(e) => update('max_invoice_amount', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            disabled={form.max_invoice_amount === -1}
          />
        </div>
        <div className="mt-8">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              checked={form.max_invoice_amount === -1}
              onChange={(e) => handleInvoiceLimit(e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <span className="ml-2 text-sm text-gray-700">Unlimited</span>
          </label>
        </div>
      </div>

      {/* Mata Uang, Saldo Awal, Tanggal */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Mata Uang
          </label>
          <select
            value={form.currency_id || ''}
            onChange={(e) => update('currency_id', parseInt(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">-- Pilih Mata Uang --</option>
            {currencies.map((cur) => (
              <option key={cur.id} value={cur.id}>
                {cur.name} ({cur.symbol})
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Saldo Awal
          </label>
          <input
            type="number"
            value={form.opening_balance}
            onChange={(e) => update('opening_balance', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tanggal
          </label>
          <input
            type="date"
            value={form.balance_date || ''}
            onChange={(e) => update('balance_date', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Pesan */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Pesan
        </label>
        <textarea
          value={form.payment_message}
          onChange={(e) => update('payment_message', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          rows={3}
        ></textarea>
      </div>
    </div>
  );
};

export default TermTab;
