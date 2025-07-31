// ChartOfAccountForm.jsx
import React, { useEffect, useState } from 'react';
import api from '../../axios';

const ChartOfAccountForm = ({
  editingData,
  onClose,
  tipeAkuns,
  currencies,
  chartAccounts,
  fetchAccounts,
}) => {
  const today = new Date().toISOString().split('T')[0];
  const [formData, setFormData] = useState({
    nama: '',
    tipe_akun_id: '',
    nomor_akun: '',
    sub_account_of: '',
    saldo_awal: '',
    currency_id: '',
    kalender: today,
    isSub: false,
  });

  const [showCurrencyField, setShowCurrencyField] = useState(false);
  const [showBalanceField, setShowBalanceField] = useState(false);

  useEffect(() => {
    if (editingData) {
      const tipeAkun = tipeAkuns.find((t) => t.id === editingData.tipe_akun_id);
      setShowCurrencyField(tipeAkun?.is_currency_required || false);
      setShowBalanceField(tipeAkun?.is_opening_balance_required || false);
      setFormData({
        nama: editingData.nama,
        tipe_akun_id: editingData.tipe_akun_id,
        nomor_akun: editingData.nomor_akun,
        sub_account_of: editingData.sub_account_of || '',
        saldo_awal: editingData.saldo_awal,
        currency_id: editingData.currency_id || '',
        kalender: editingData.kalender,
        isSub: !!editingData.sub_account_of,
      });
    }
  }, [editingData, tipeAkuns]);

  const generateNomorAkun = (tipeId, isSub = false, indukId = null) => {
    if (isSub && indukId) {
      const induk = chartAccounts.find((a) => a.id === parseInt(indukId));
      if (!induk) return '';
      const [seg1, seg2] = induk.nomor_akun.split('-');
      const subList = chartAccounts
        .filter((a) => a.sub_account_of === induk.id)
        .map((a) => parseInt(a.nomor_akun.split('-')[2]));
      const baseNumber =
        Math.floor(parseInt(induk.nomor_akun.split('-')[2]) / 1000) * 1000 +
        100;
      const nextSubNumber =
        subList.length > 0 ? Math.max(...subList) + 100 : baseNumber;
      return `${seg1}-${seg2}-${nextSubNumber}`;
    } else {
      const tipe = tipeAkuns.find((t) => t.id === parseInt(tipeId));
      if (!tipe) return '';
      const kode = tipe.kode || '1-1';
      const [seg1, seg2] = kode.split('-');
      const akunUtama = chartAccounts.filter(
        (a) => a.tipe_akun_id === parseInt(tipeId) && !a.sub_account_of
      );
      const existingMainNumbers = akunUtama.map((a) =>
        parseInt(a.nomor_akun.split('-')[2])
      );
      const nextMainNumber =
        existingMainNumbers.length > 0
          ? Math.max(...existingMainNumbers) + 1000
          : 1000;
      return `${seg1}-${seg2}-${nextMainNumber}`;
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    let updatedForm = {
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    };

    if (name === 'tipe_akun_id' && !formData.isSub) {
      updatedForm.nomor_akun = generateNomorAkun(value, false);
    }

    if (name === 'isSub') {
      updatedForm.sub_account_of = '';
      updatedForm.nomor_akun = '';
    }

    if (name === 'sub_account_of') {
      updatedForm.nomor_akun = generateNomorAkun(
        formData.tipe_akun_id,
        true,
        value
      );
    }

    setFormData(updatedForm);
  };

  const handleTipeAkunChange = async (e) => {
    const tipeId = e.target.value;
    if (tipeId) {
      try {
        const res = await api.get(`/api/tipe-akun/${tipeId}`);
        setShowCurrencyField(res.data.is_currency_required);
        setShowBalanceField(res.data.is_opening_balance_required);
      } catch (error) {
        console.error('Gagal memuat detail tipe akun:', error);
      }
    } else {
      setShowCurrencyField(false);
      setShowBalanceField(false);
    }

    const newNumber = generateNomorAkun(
      tipeId,
      formData.isSub,
      formData.sub_account_of
    );
    setFormData((prev) => ({
      ...prev,
      tipe_akun_id: tipeId,
      nomor_akun: newNumber,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.nama.trim()) return alert('Nama akun wajib diisi.');
    if (!formData.tipe_akun_id) return alert('Tipe akun wajib dipilih.');
    if (!formData.kalender) return alert('Tanggal wajib diisi.');
    if (formData.isSub && !formData.sub_account_of)
      return alert('Pilih akun induk jika ini sub akun.');

    const isDuplicateNomor = chartAccounts.some(
      (a) => a.nomor_akun === formData.nomor_akun && a.id !== editingData?.id
    );
    if (isDuplicateNomor) {
      return alert(
        'Nomor akun sudah digunakan. Silakan pilih/ganti nomor lain.'
      );
    }

    const payload = {
      ...formData,
      saldo_awal:
        formData.saldo_awal === '' ? 0 : parseFloat(formData.saldo_awal),
      sub_account_of: formData.isSub ? formData.sub_account_of : null,
      currency_id: showCurrencyField ? formData.currency_id : null,
    };

    try {
      if (editingData) {
        await api.put(`/api/chart-of-accounts/${editingData.id}`, payload);
      } else {
        await api.post('/api/chart-of-accounts', payload);
      }
      onClose();
      fetchAccounts();
    } catch (err) {
      if (err.response && err.response.status === 409) {
        alert('Gagal menyimpan: Nomor akun sudah digunakan.');
      } else {
        console.error(err);
        alert('Gagal menyimpan data.');
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/10">
      <div className="bg-white p-6 rounded w-full max-w-lg relative shadow-lg">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-black"
          onClick={onClose}
        >
          ✕
        </button>
        <h3 className="text-lg font-semibold mb-4">
          {editingData ? 'Edit Account' : 'Create New Account'}
        </h3>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nama Akun
            </label>
            <input
              name="nama"
              value={formData.nama}
              onChange={handleChange}
              placeholder="Masukkan nama akun"
              className="border p-2 w-full rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tipe Akun
            </label>
            <select
              name="tipe_akun_id"
              value={formData.tipe_akun_id}
              onChange={handleTipeAkunChange}
              className="border p-2 w-full rounded"
            >
              <option value="">-- Pilih Tipe Akun --</option>
              {tipeAkuns.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.nama}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nomor Akun
            </label>
            <input
              name="nomor_akun"
              value={formData.nomor_akun}
              onChange={handleChange}
              placeholder="Nomor akun akan digenerate otomatis"
              className="border p-2 w-full rounded"
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              name="isSub"
              checked={formData.isSub}
              onChange={handleChange}
              className="mr-2"
              id="isSubCheckbox"
            />
            <label htmlFor="isSubCheckbox" className="text-sm text-gray-700">
              Sub Account of
            </label>
          </div>

          {formData.isSub && (
            <div>
              <select
                name="sub_account_of"
                value={formData.sub_account_of}
                onChange={handleChange}
                className="border p-2 w-full rounded"
              >
                <option value="">-- Pilih Akun Induk --</option>
                {chartAccounts
                  .filter(
                    (p) => p.tipe_akun_id === parseInt(formData.tipe_akun_id)
                  )
                  .map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.nama}
                    </option>
                  ))}
              </select>
            </div>
          )}

          {showCurrencyField && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ✅ Mata Uang
              </label>
              <select
                name="currency_id"
                value={formData.currency_id}
                onChange={handleChange}
                className="border p-2 w-full rounded"
              >
                <option value="">-- Pilih Mata Uang --</option>
                {currencies.map((currency) => (
                  <option key={currency.id} value={currency.id}>
                    {currency.name} ({currency.symbol})
                  </option>
                ))}
              </select>
            </div>
          )}

          {showBalanceField ? (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Saldo Awal
              </label>
              <input
                type="number"
                name="saldo_awal"
                value={formData.saldo_awal}
                onChange={handleChange}
                placeholder="Masukkan saldo awal"
                className="border p-2 w-full rounded"
              />
            </div>
          ) : (
            <div className="text-sm text-gray-500">
              🚫 Saldo Awal: tidak ditampilkan (berdasarkan tipe akun)
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tanggal
            </label>
            <input
              type="date"
              name="kalender"
              value={formData.kalender}
              onChange={handleChange}
              className="border p-2 w-full rounded"
            />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded text-gray-600 hover:bg-gray-100"
            >
              BATAL
            </button>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            >
              SIMPAN
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChartOfAccountForm;
