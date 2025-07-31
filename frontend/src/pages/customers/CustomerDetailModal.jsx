import React, { useState, useEffect } from 'react';
import api from '../../axios';

const CustomerDetailModal = ({ customerId, onClose }) => {
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (customerId) {
      const fetchCustomerDetails = async () => {
        try {
          setLoading(true);
          const response = await api.get(`/api/customers/${customerId}`);
          setCustomer(response.data);
          setLoading(false);
        } catch (error) {
          console.error('Gagal mengambil detail pelanggan:', error);
          setLoading(false);
        }
      };

      fetchCustomerDetails();
    }
  }, [customerId]);

  const formatCurrency = (value) => {
    if (!value) return '0.00';
    return parseFloat(value).toLocaleString('id-ID', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  if (!customerId) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/20">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex justify-between items-center border-b p-4 sticky top-0 bg-white z-10">
          <h2 className="text-xl font-bold text-gray-800">
            Detail Pelanggan
            {customer && (
              <span className="ml-2 text-gray-600 font-normal">
                ({customer.customer_number})
              </span>
            )}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <i className="bi bi-x-lg text-xl"></i>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : customer ? (
            <div className="space-y-6">
              {/* Informasi Utama */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-lg mb-3 pb-2 border-b">
                    Informasi Umum
                  </h3>
                  <div className="space-y-2">
                    <div className="flex">
                      <span className="w-40 font-medium text-gray-600">
                        Nama
                      </span>
                      <span>: {customer.name}</span>
                    </div>
                    <div className="flex">
                      <span className="w-40 font-medium text-gray-600">
                        Status
                      </span>
                      <span>
                        :{' '}
                        {customer.is_active ? (
                          <span className="text-green-600">Aktif</span>
                        ) : (
                          <span className="text-red-600">Non-Aktif</span>
                        )}
                      </span>
                    </div>
                    <div className="flex">
                      <span className="w-40 font-medium text-gray-600">
                        Tipe Pelanggan
                      </span>
                      <span>
                        : {customer.customer_type?.name || 'Tidak ada'}
                      </span>
                    </div>
                    <div className="flex">
                      <span className="w-40 font-medium text-gray-600">
                        Kontak Utama
                      </span>
                      <span>: {customer.contact_person || '-'}</span>
                    </div>
                    <div className="flex">
                      <span className="w-40 font-medium text-gray-600">
                        Telepon
                      </span>
                      <span>: {customer.phone || '-'}</span>
                    </div>
                    <div className="flex">
                      <span className="w-40 font-medium text-gray-600">
                        Email
                      </span>
                      <span>: {customer.email || '-'}</span>
                    </div>
                    <div className="flex">
                      <span className="w-40 font-medium text-gray-600">
                        Website
                      </span>
                      <span>: {customer.website || '-'}</span>
                    </div>
                  </div>
                </div>

                {/* Termin */}
                <div>
                  <h3 className="font-semibold text-lg mb-3 pb-2 border-b">
                    Termin
                  </h3>
                  <div className="space-y-2">
                    <div className="flex">
                      <span className="w-40 font-medium text-gray-600">
                        Termin Pembayaran
                      </span>
                      <span>: {customer.paymentTerm?.name || '-'}</span>
                    </div>
                    {customer.paymentTerm && (
                      <>
                        <div className="flex">
                          <span className="w-40 font-medium text-gray-600">
                            Pay Within
                          </span>
                          <span>
                            : {customer.paymentTerm.pay_within_days} hari
                          </span>
                        </div>
                        <div className="flex">
                          <span className="w-40 font-medium text-gray-600">
                            Diskon
                          </span>
                          <span>
                            : {customer.paymentTerm.discount_percent}%
                          </span>
                        </div>
                        <div className="flex">
                          <span className="w-40 font-medium text-gray-600">
                            Jatuh Tempo
                          </span>
                          <span>: {customer.paymentTerm.due_days} hari</span>
                        </div>
                      </>
                    )}
                    <div className="flex">
                      <span className="w-40 font-medium text-gray-600">
                        Batas Kredit
                      </span>
                      <span>: {formatCurrency(customer.credit_limit)}</span>
                    </div>
                    <div className="flex">
                      <span className="w-40 font-medium text-gray-600">
                        Jumlah Faktur Jatuh Tempo
                      </span>
                      <span>
                        :{' '}
                        {customer.max_invoice_amount === -1
                          ? 'Unlimited'
                          : formatCurrency(customer.max_invoice_amount)}
                      </span>
                    </div>
                    <div className="flex">
                      <span className="w-40 font-medium text-gray-600">
                        Mata Uang
                      </span>
                      <span>
                        : {customer.currency?.name} ({customer.currency?.symbol}
                        )
                      </span>
                    </div>
                    <div className="flex">
                      <span className="w-40 font-medium text-gray-600">
                        Saldo Awal
                      </span>
                      <span>: {formatCurrency(customer.opening_balance)}</span>
                    </div>
                    <div className="flex">
                      <span className="w-40 font-medium text-gray-600">
                        Tanggal Saldo
                      </span>
                      <span>: {customer.balance_date || '-'}</span>
                    </div>
                    <div className="flex">
                      <span className="w-40 font-medium text-gray-600">
                        Pesan
                      </span>
                      <span>: {customer.payment_message || '-'}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Penjualan */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-lg mb-3 pb-2 border-b">
                    Informasi Penjualan
                  </h3>
                  <div className="space-y-2">
                    {/* Pajak 1 */}
                    <div className="flex">
                      <span className="w-40 font-medium text-gray-600">
                        Pajak 1
                      </span>
                      <span>: {customer.tax1?.nama || '-'}</span>
                    </div>

                    {/* Pajak 2 */}
                    <div className="flex">
                      <span className="w-40 font-medium text-gray-600">
                        Pajak 2
                      </span>
                      <span>: {customer.tax2?.nama || '-'}</span>
                    </div>

                    {/* NPWP */}
                    <div className="flex">
                      <span className="w-40 font-medium text-gray-600">
                        NPWP
                      </span>
                      <span>: {customer.tax_number || '-'}</span>
                    </div>

                    {/* Kode Pajak */}
                    <div className="flex">
                      <span className="w-40 font-medium text-gray-600">
                        Kode Pajak
                      </span>
                      <span>: {customer.tax_code || '-'}</span>
                    </div>

                    {/* Alamat Pajak 1 */}
                    <div className="flex">
                      <span className="w-40 font-medium text-gray-600">
                        Alamat Pajak 1
                      </span>
                      <span>: {customer.tax_address1 || '-'}</span>
                    </div>

                    {/* Alamat Pajak 2 */}
                    <div className="flex">
                      <span className="w-40 font-medium text-gray-600">
                        Alamat Pajak 2
                      </span>
                      <span>: {customer.tax_address2 || '-'}</span>
                    </div>

                    {/* Tipe Pelanggan */}
                    <div className="flex">
                      <span className="w-40 font-medium text-gray-600">
                        Tipe Pelanggan
                      </span>
                      <span>: {customer.customerType?.name || '-'}</span>
                    </div>

                    {/* Tingkat Harga Jual */}
                    <div className="flex">
                      <span className="w-40 font-medium text-gray-600">
                        Tingkat Harga Jual
                      </span>
                      <span>: {customer.price_level || 1}</span>
                    </div>

                    {/* Default Diskon Penjualan */}
                    <div className="flex">
                      <span className="w-40 font-medium text-gray-600">
                        Default Diskon
                      </span>
                      <span>: {customer.default_sales_discount || 0}%</span>
                    </div>
                  </div>
                </div>
                {/* Alamat */}
                <div>
                  <h3 className="font-semibold text-lg mb-3 pb-2 border-b">
                    Alamat
                  </h3>
                  <div className="space-y-2">
                    <div className="flex">
                      <span className="w-40 font-medium text-gray-600">
                        Alamat
                      </span>
                      <span>: {customer.address || '-'}</span>
                    </div>
                    <div className="flex">
                      <span className="w-40 font-medium text-gray-600">
                        Kota
                      </span>
                      <span>: {customer.city || '-'}</span>
                    </div>
                    <div className="flex">
                      <span className="w-40 font-medium text-gray-600">
                        Provinsi
                      </span>
                      <span>: {customer.province || '-'}</span>
                    </div>
                    <div className="flex">
                      <span className="w-40 font-medium text-gray-600">
                        Kode Pos
                      </span>
                      <span>: {customer.postal_code || '-'}</span>
                    </div>
                    <div className="flex">
                      <span className="w-40 font-medium text-gray-600">
                        Negara
                      </span>
                      <span>: {customer.country || '-'}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Kontak Tambahan */}
              {customer.contacts && customer.contacts.length > 0 && (
                <div>
                  <h3 className="font-semibold text-lg mb-3 pb-2 border-b">
                    Kontak Tambahan
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full border">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="border p-2 text-left">Nama</th>
                          <th className="border p-2 text-left">Jabatan</th>
                          <th className="border p-2 text-left">Email</th>
                          <th className="border p-2 text-left">Telepon</th>
                          {/* <th className="border p-2 text-left">Mobile</th> */}
                        </tr>
                      </thead>
                      <tbody>
                        {customer.contacts.map((contact, index) => (
                          <tr key={index}>
                            <td className="border p-2">
                              {contact.first_name} {contact.last_name}
                            </td>
                            <td className="border p-2">{contact.title}</td>
                            <td className="border p-2">{contact.email}</td>
                            <td className="border p-2">
                              {contact.mobile_phone}
                            </td>
                            {/* <td className="border p-2">{contact.mobile}</td> */}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Alamat Pengiriman */}
              {customer.shipAddresses && customer.shipAddresses.length > 0 && (
                <div>
                  <h3 className="font-semibold text-lg mb-3 pb-2 border-b">
                    Alamat Pengiriman
                  </h3>
                  <div className="space-y-4">
                    {customer.shipAddresses.map((address, index) => (
                      <div
                        key={index}
                        className="border rounded-lg p-4 bg-gray-50"
                      >
                        {/* <h4 className="font-medium mb-3">Alamat {index + 1}</h4> */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          <div className="flex">
                            <span className="w-24 font-medium text-gray-600">
                              Alamat 1:
                            </span>
                            <span>{address.address1 || '-'}</span>
                          </div>
                          <div className="flex">
                            <span className="w-24 font-medium text-gray-600">
                              Kota:
                            </span>
                            <span>{address.city || '-'}</span>
                          </div>
                          <div className="flex">
                            <span className="w-24 font-medium text-gray-600">
                              Alamat 2:
                            </span>
                            <span>{address.address2 || '-'}</span>
                          </div>
                          <div className="flex">
                            <span className="w-24 font-medium text-gray-600">
                              Provinsi:
                            </span>
                            <span>{address.province || '-'}</span>
                          </div>
                          <div className="flex">
                            <span className="w-24 font-medium text-gray-600">
                              Kode Pos:
                            </span>
                            <span>{address.postal_code || '-'}</span>
                          </div>
                          <div className="flex">
                            <span className="w-24 font-medium text-gray-600">
                              Negara:
                            </span>
                            <span>{address.country || '-'}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Catatan */}
              {customer.notes && (
                <div>
                  <h3 className="font-semibold text-lg mb-3 pb-2 border-b">
                    Catatan
                  </h3>
                  <div className="whitespace-pre-line bg-gray-50 p-4 rounded border">
                    {customer.notes}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              Gagal memuat data pelanggan
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="flex justify-end border-t p-4 sticky bottom-0 bg-white">
          <button
            onClick={onClose}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetailModal;
