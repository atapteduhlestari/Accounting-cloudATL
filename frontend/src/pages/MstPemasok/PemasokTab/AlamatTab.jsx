const AlamatTab = ({ formData, onChange }) => {
  return (
    <div className="grid gap-6">
      {/* Checkbox Non-Aktif */}
      <div className="flex items-center">
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            checked={!formData.is_active}
            onChange={() =>
              onChange({
                target: {
                  name: 'is_active',
                  type: 'checkbox',
                  checked: !formData.is_active,
                },
              })
            }
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <span className="ml-2 text-sm text-gray-700">Non-Aktif</span>
        </label>
      </div>

      {/* No. Pemasok dan Nama */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            No. Pemasok
          </label>
          <input
            type="text"
            name="no_pemasok"
            value={formData.no_pemasok}
            onChange={onChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nama
          </label>
          <input
            type="text"
            name="nama"
            value={formData.nama}
            onChange={onChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Alamat dan Lokasi */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="md:w-1/2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Alamat
          </label>
          <textarea
            name="alamat"
            value={formData.alamat}
            onChange={onChange}
            rows={5}
            className="w-full h-full px-3 py-2 border border-gray-300 rounded-md shadow-sm resize-none focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="md:w-1/2 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Kota
            </label>
            <input
              type="text"
              name="kota"
              value={formData.kota}
              onChange={onChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Provinsi
            </label>
            <input
              type="text"
              name="provinsi"
              value={formData.provinsi}
              onChange={onChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Kode Pos
            </label>
            <input
              type="text"
              name="kode_pos"
              value={formData.kode_pos}
              onChange={onChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Negara
            </label>
            <input
              type="text"
              name="negara"
              value={formData.negara}
              onChange={onChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Telepon dan Faksimili */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Telepon
          </label>
          <input
            type="text"
            name="telepon"
            value={formData.telepon}
            onChange={onChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Faksimili
          </label>
          <input
            type="text"
            name="faksimili"
            value={formData.faksimili}
            onChange={onChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Kontak dan Email */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Kontak
          </label>
          <input
            type="text"
            name="kontak"
            value={formData.kontak}
            onChange={onChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            E-Mail
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={onChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Halaman Web */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Halaman Web
        </label>
        <input
          type="text"
          name="website"
          value={formData.website}
          onChange={onChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
    </div>
  );
};

export default AlamatTab;
