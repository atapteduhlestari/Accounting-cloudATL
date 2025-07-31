import React from 'react';

const CatatanTab = ({ form, setForm }) => {
  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      notes: e.target.value,
    }));
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Catatan
      </label>
      <textarea
        value={form.notes || ''}
        onChange={handleChange}
        rows={5}
        placeholder="Tulis catatan pelanggan di sini..."
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
  );
};

export default CatatanTab;
