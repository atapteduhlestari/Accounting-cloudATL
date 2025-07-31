import React, { useState } from 'react';

const defaultContact = {
  nama_depan: '',
  nama_belakang: '',
  jabatan: '',
  bisnis1: '',
  ext1: '',
  bisnis2: '',
  ext2: '',
  seluler: '',
  faksimili: '',
  pager: '',
  rumah: '',
  email: '',
  catatan: '',
};

const KontakTab = ({ kontakList = [], onChange }) => {
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState('umum');
  const [newContact, setNewContact] = useState(defaultContact);

  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setNewContact((prev) => ({ ...prev, [name]: value }));
  };

  const addContact = () => {
    if (!newContact.nama_depan.trim() && !newContact.nama_belakang.trim()) {
      alert('Isi minimal Nama Depan atau Nama Belakang!');
      return;
    }
    const updatedList = [...kontakList, newContact];
    onChange(updatedList);
    closeModal();
  };

  const deleteContact = (index) => {
    const updatedList = [...kontakList];
    updatedList.splice(index, 1);
    onChange(updatedList);
  };

  const closeModal = () => {
    setShowModal(false);
    setNewContact(defaultContact);
    setActiveTab('umum');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <button
          type="button"
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          onClick={() => setShowModal(true)}
        >
          + Tambah Kontak
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nama Belakang
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nama Depan
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Jabatan
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Telepon
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {kontakList.length > 0 ? (
              kontakList.map((kontak, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {kontak.nama_belakang}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {kontak.nama_depan}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {kontak.jabatan}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {kontak.seluler || kontak.bisnis1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => deleteContact(index)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="px-6 py-4 text-center text-sm text-gray-500"
                >
                  Belum ada kontak
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
              aria-hidden="true"
            ></div>

            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Tambah Kontak Pemasok
                </h3>

                <div className="mb-4 border-b border-gray-200">
                  <nav className="-mb-px flex space-x-6" aria-label="Tabs">
                    {['umum', 'catatan'].map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm ${
                          activeTab === tab
                            ? 'border-blue-500 text-blue-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        }`}
                      >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                      </button>
                    ))}
                  </nav>
                </div>

                {activeTab === 'umum' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      ['Nama Depan', 'nama_depan'],
                      ['Nama Belakang', 'nama_belakang'],
                      ['Jabatan', 'jabatan'],
                      ['Bisnis 1', 'bisnis1'],
                      ['Ext 1', 'ext1'],
                      ['Bisnis 2', 'bisnis2'],
                      ['Ext 2', 'ext2'],
                      ['Seluler', 'seluler'],
                      ['Faksimili', 'faksimili'],
                      ['Pager', 'pager'],
                      ['Rumah', 'rumah'],
                      ['Email', 'email', 'email'],
                    ].map(([label, name, type = 'text']) => (
                      <div key={name}>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {label}
                        </label>
                        <input
                          type={type}
                          name={name}
                          value={newContact[name]}
                          onChange={handleContactChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'catatan' && (
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Catatan
                    </label>
                    <textarea
                      name="catatan"
                      rows="4"
                      value={newContact.catatan}
                      onChange={handleContactChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    ></textarea>
                  </div>
                )}
              </div>

              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  onClick={addContact}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-white font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Simpan Kontak
                </button>
                <button
                  onClick={closeModal}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Batal
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default KontakTab;
