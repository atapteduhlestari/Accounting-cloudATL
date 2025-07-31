import React, { useState, useEffect } from 'react';
import AddressTab from './tabs/AddressTab';
import TermTab from './tabs/TermTab';
import SalesTab from './tabs/SalesTab';
import ContactTab from './tabs/ContactTab';
import ShipToTab from './tabs/ShipToTab';
import CatatanTab from './tabs/CatatanTab';
import api from '../../axios';

const CustomerForm = ({ id, onSuccess }) => {
  const [form, setForm] = useState({
    customer_number: '',
    is_active: true,
    name: '',
    address: '',
    city: '',
    province: '',
    postal_code: '',
    country: '',
    phone: '',
    fax: '',
    contact_person: '',
    email: '',
    website: '',
    payment_term_id: '',
    credit_limit: '',
    max_invoice_amount: '',
    currency_id: '',
    opening_balance: 0,
    balance_date: '',
    payment_message: '',
    tax1_id: '',
    tax2_id: '',
    tax_number: '',
    tax_code: '',
    tax_address1: '',
    tax_address2: '',
    customer_type_id: '',
    price_level: 1,
    default_sales_discount: 0,
    notes: '',
    customer_contacts: [],
    ship_to_addresses: [],
  });

  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('alamat');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);

  useEffect(() => {
    if (id) {
      api.get('/sanctum/csrf-cookie').then(() => {
        api
          .get(`/api/customers/${id}`)
          .then((res) => {
            const data = res.data;
            setForm((prevForm) => ({
              ...prevForm,
              ...data,
              customer_contacts: data.contacts || [],
              ship_to_addresses: data.shipAddresses || [],
              is_active: data.is_active ?? true,
            }));
          })
          .catch((err) => {
            console.error('Gagal load customer', err);
          });
      });
    }
  }, [id]);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const payload = {
        ...form,
        credit_limit: parseFloat(form.credit_limit) || 0,
        max_invoice_amount: parseFloat(form.max_invoice_amount) || 0,
        opening_balance: parseFloat(form.opening_balance) || 0,
        default_sales_discount: parseFloat(form.default_sales_discount) || 0,
      };

      if (id) {
        await api.put(`/api/customers/${id}`, payload);
      } else {
        await api.post('/api/customers', payload);
      }

      setShowSuccessModal(true); // tampilkan modal sukses
    } catch (err) {
      console.error('Error saat menyimpan:', err);
      setShowErrorModal(true); // tampilkan modal gagal
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-5xl rounded-lg shadow-xl p-6 overflow-y-auto max-h-[90vh]">
        <div className="relative">
          <button
            onClick={onSuccess}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            aria-label="Tutup"
          >
            <i className="bi bi-x-lg text-xl"></i>
          </button>
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          {id ? 'Edit Pelanggan' : 'Tambah Pelanggan Baru'}
        </h2>

        {/* Tabs Navigasi */}
        <div className="flex border-b border-gray-200 mb-6">
          {[
            { id: 'alamat', label: 'Alamat' },
            { id: 'termin', label: 'Termin' },
            { id: 'penjualan', label: 'Penjualan' },
            { id: 'kontak', label: 'Kontak' },
            { id: 'shipto', label: 'Ship To' },
            { id: 'catatan', label: 'Catatan' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 font-medium text-sm focus:outline-none ${
                activeTab === tab.id
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Isi Tab */}
        <div className="p-4 bg-gray-50 rounded-lg">
          {activeTab === 'alamat' && (
            <AddressTab form={form} setForm={setForm} />
          )}
          {activeTab === 'termin' && <TermTab form={form} setForm={setForm} />}
          {activeTab === 'penjualan' && (
            <SalesTab form={form} setForm={setForm} />
          )}
          {activeTab === 'kontak' && (
            <ContactTab form={form} setForm={setForm} />
          )}
          {activeTab === 'shipto' && (
            <ShipToTab form={form} setForm={setForm} />
          )}
          {activeTab === 'catatan' && (
            <CatatanTab form={form} setForm={setForm} />
          )}
        </div>

        {/* Tombol Aksi */}
        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onSuccess}
            className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Tutup
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-6 py-2 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-70"
          >
            {loading ? (
              <span className="flex items-center">
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Menyimpan...
              </span>
            ) : (
              'Simpan'
            )}
          </button>
        </div>
      </div>

      {/* Modal Sukses */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/30 backdrop-blur-sm">
          <div className="bg-white border border-white/50 shadow-lg rounded-xl max-w-md w-full p-6 text-center">
            <h3 className="text-xl font-semibold text-green-700 mb-2">
              Berhasil!
            </h3>
            <p className="text-gray-800 mb-4">
              Data pelanggan berhasil disimpan.
            </p>
            <button
              onClick={() => {
                setShowSuccessModal(false);
                if (onSuccess) onSuccess();
              }}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Tutup
            </button>
          </div>
        </div>
      )}

      {/* Modal Error */}
      {showErrorModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/30 backdrop-blur-sm">
          <div className="bg-white border border-white/50 shadow-lg rounded-xl max-w-md w-full p-6 text-center">
            <h3 className="text-xl font-semibold text-red-700 mb-2">Gagal!</h3>
            <p className="text-gray-800 mb-4">
              Terjadi kesalahan saat menyimpan data. Silakan coba lagi.
            </p>
            <button
              onClick={() => setShowErrorModal(false)}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Tutup
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerForm;
