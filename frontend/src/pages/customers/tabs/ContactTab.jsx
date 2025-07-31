import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const ContactTab = ({ form, setForm }) => {
  const [editingIndex, setEditingIndex] = useState(null);
  const [contactForm, setContactForm] = useState(initialContact());
  const [isModalOpen, setIsModalOpen] = useState(false);

  function initialContact() {
    return {
      temp_id: uuidv4(),
      first_name: '',
      last_name: '',
      title: '',
      business_phone1: '',
      business_phone2: '',
      mobile_phone: '',
      pager: '',
      email: '',
      extension1: '',
      extension2: '',
      fax: '',
      home_phone: '',
      notes: '',
    };
  }

  const handleChange = (field, value) => {
    setContactForm((prev) => ({ ...prev, [field]: value }));
  };

  const saveContact = () => {
    if (editingIndex !== null) {
      const updated = [...form.customer_contacts];
      updated[editingIndex] = contactForm;
      setForm((prev) => ({ ...prev, customer_contacts: updated }));
      setEditingIndex(null);
    } else {
      setForm((prev) => ({
        ...prev,
        customer_contacts: [...(prev.customer_contacts || []), contactForm],
      }));
    }
    setContactForm(initialContact());
    setIsModalOpen(false);
  };

  const editContact = (index) => {
    setEditingIndex(index);
    setContactForm(form.customer_contacts[index]);
    setIsModalOpen(true);
  };

  const deleteContact = (index) => {
    const updated = [...form.customer_contacts];
    updated.splice(index, 1);
    setForm((prev) => ({ ...prev, customer_contacts: updated }));
    if (editingIndex === index) {
      setEditingIndex(null);
      setContactForm(initialContact());
      setIsModalOpen(false);
    }
  };

  const cancelEdit = () => {
    setEditingIndex(null);
    setContactForm(initialContact());
    setIsModalOpen(false);
  };

  const openAddContactModal = () => {
    setEditingIndex(null);
    setContactForm(initialContact());
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Kontak Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Nama
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Nama Depan
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Jabatan
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Telepon
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
            {form.customer_contacts?.map((contact, i) => (
              <tr key={contact.temp_id || i}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {contact.first_name} {contact.last_name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {contact.first_name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {contact.title}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {contact.mobile_phone}
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => editContact(i)}
                    className="text-blue-600 hover:text-blue-900 mr-4"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteContact(i)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
            {form.customer_contacts?.length === 0 && (
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

      {/* Add Contact Button */}
      <div className="flex justify-end">
        <button
          onClick={openAddContactModal}
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Tambah Kontak Baru
        </button>
      </div>

      {/* Modal for Contact Form */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            {/* White blur backdrop */}
            <div
              className="fixed inset-0 backdrop-blur-sm bg-white/30"
              aria-hidden="true"
            ></div>

            {/* Modal container */}
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full border border-gray-200">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  {editingIndex !== null ? 'Edit Kontak' : 'Tambah Kontak Baru'}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nama Depan
                    </label>
                    <input
                      type="text"
                      value={contactForm.first_name}
                      onChange={(e) =>
                        handleChange('first_name', e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Belakang
                    </label>
                    <input
                      type="text"
                      value={contactForm.last_name}
                      onChange={(e) =>
                        handleChange('last_name', e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Jabatan
                    </label>
                    <input
                      type="text"
                      value={contactForm.title}
                      onChange={(e) => handleChange('title', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Bisnis 1
                    </label>
                    <input
                      type="text"
                      value={contactForm.business_phone1}
                      onChange={(e) =>
                        handleChange('business_phone1', e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Bisnis 2
                    </label>
                    <input
                      type="text"
                      value={contactForm.business_phone2}
                      onChange={(e) =>
                        handleChange('business_phone2', e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Seluler
                    </label>
                    <input
                      type="text"
                      value={contactForm.mobile_phone}
                      onChange={(e) =>
                        handleChange('mobile_phone', e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Pager
                    </label>
                    <input
                      type="text"
                      value={contactForm.pager}
                      onChange={(e) => handleChange('pager', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      E-mail
                    </label>
                    <input
                      type="email"
                      value={contactForm.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Ext
                    </label>
                    <input
                      type="text"
                      value={contactForm.extension1}
                      onChange={(e) =>
                        handleChange('extension1', e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Ext
                    </label>
                    <input
                      type="text"
                      value={contactForm.extension2}
                      onChange={(e) =>
                        handleChange('extension2', e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Fax
                    </label>
                    <input
                      type="text"
                      value={contactForm.fax}
                      onChange={(e) => handleChange('fax', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Rumah
                    </label>
                    <input
                      type="text"
                      value={contactForm.home_phone}
                      onChange={(e) =>
                        handleChange('home_phone', e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Catatan
                    </label>
                    <textarea
                      value={contactForm.notes}
                      onChange={(e) => handleChange('notes', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      rows={3}
                    />
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                {editingIndex !== null && (
                  <button
                    onClick={cancelEdit}
                    className="w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Batal
                  </button>
                )}
                <button
                  onClick={saveContact}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  {editingIndex !== null ? 'Update Kontak' : 'Tambah Kontak'}
                </button>

                <button
                  onClick={() => setIsModalOpen(false)}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactTab;
