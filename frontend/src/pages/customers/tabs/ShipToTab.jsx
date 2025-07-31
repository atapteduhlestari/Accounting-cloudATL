import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const ShipToTab = ({ form, setForm }) => {
  const [newAddress, setNewAddress] = useState(initialAddress());

  function initialAddress() {
    return {
      temp_id: uuidv4(),
      address1: '',
      address2: '',
      city: '',
      province: '',
      postal_code: '',
      country: '',
    };
  }

  const handleAdd = () => {
    if (!newAddress.address1) return;

    setForm((prev) => ({
      ...prev,
      ship_to_addresses: [...(prev.ship_to_addresses || []), newAddress],
    }));
    setNewAddress(initialAddress());
  };

  const handleDelete = (index) => {
    const updated = [...form.ship_to_addresses];
    updated.splice(index, 1);
    setForm((prev) => ({ ...prev, ship_to_addresses: updated }));
  };

  const handleChange = (index, field, value) => {
    const updated = [...form.ship_to_addresses];
    updated[index][field] = value;
    setForm((prev) => ({ ...prev, ship_to_addresses: updated }));
  };

  return (
    <div className="space-y-6">
      {/* Tabel data */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Alamat 1
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Alamat 2
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Kota
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Provinsi
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Kode Pos
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Negara
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Aksi
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {form.ship_to_addresses?.map((address, i) => (
              <tr key={address.temp_id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <input
                    type="text"
                    value={address.address1}
                    onChange={(e) =>
                      handleChange(i, 'address1', e.target.value)
                    }
                    className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <input
                    type="text"
                    value={address.address2}
                    onChange={(e) =>
                      handleChange(i, 'address2', e.target.value)
                    }
                    className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <input
                    type="text"
                    value={address.city}
                    onChange={(e) => handleChange(i, 'city', e.target.value)}
                    className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <input
                    type="text"
                    value={address.province}
                    onChange={(e) =>
                      handleChange(i, 'province', e.target.value)
                    }
                    className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <input
                    type="text"
                    value={address.postal_code}
                    onChange={(e) =>
                      handleChange(i, 'postal_code', e.target.value)
                    }
                    className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <input
                    type="text"
                    value={address.country}
                    onChange={(e) => handleChange(i, 'country', e.target.value)}
                    className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => handleDelete(i)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
            {(!form.ship_to_addresses ||
              form.ship_to_addresses.length === 0) && (
              <tr>
                <td
                  colSpan="7"
                  className="px-6 py-4 text-center text-sm text-gray-500"
                >
                  Belum ada alamat pengiriman
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Form Tambah Baris */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Tambah Alamat Pengiriman
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Alamat 1
            </label>
            <input
              type="text"
              placeholder="Address 1"
              value={newAddress.address1}
              onChange={(e) =>
                setNewAddress((prev) => ({ ...prev, address1: e.target.value }))
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Alamat 2
            </label>
            <input
              type="text"
              placeholder="Address 2"
              value={newAddress.address2}
              onChange={(e) =>
                setNewAddress((prev) => ({ ...prev, address2: e.target.value }))
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Kota
            </label>
            <input
              type="text"
              placeholder="City"
              value={newAddress.city}
              onChange={(e) =>
                setNewAddress((prev) => ({ ...prev, city: e.target.value }))
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Provinsi
            </label>
            <input
              type="text"
              placeholder="Province"
              value={newAddress.province}
              onChange={(e) =>
                setNewAddress((prev) => ({ ...prev, province: e.target.value }))
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Kode Pos
            </label>
            <input
              type="text"
              placeholder="Postal Code"
              value={newAddress.postal_code}
              onChange={(e) =>
                setNewAddress((prev) => ({
                  ...prev,
                  postal_code: e.target.value,
                }))
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Negara
            </label>
            <input
              type="text"
              placeholder="Country"
              value={newAddress.country}
              onChange={(e) =>
                setNewAddress((prev) => ({ ...prev, country: e.target.value }))
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <div className="mt-4 flex justify-end">
          <button
            onClick={handleAdd}
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Tambah Alamat
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShipToTab;
