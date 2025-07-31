import React from 'react';

const CatatanTab = ({ value, onChange }) => {
  return (
    <div>
      <label htmlFor="catatan" className="block text-sm font-medium text-gray-700 mb-2">
        Catatan
      </label>
      <textarea
        id="catatan"
        name="catatan"
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        rows="5"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Masukkan catatan tambahan mengenai pemasok..."
      />
    </div>
  );
};

export default CatatanTab;
