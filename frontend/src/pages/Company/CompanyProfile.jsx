import { useState } from 'react';
import Layout from '../../components/Layout';


export default function CompanyProfile() {
  const [activeTab, setActiveTab] = useState('general');

  return (
    <Layout>
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h4 className="text-xl font-semibold mb-4">Company Profile</h4>

          {/* Tabs */}
          <div className="mb-4 border-b border-gray-200">
            <ul className="flex flex-wrap -mb-px text-sm font-medium text-center">
              {['general', 'period', 'tax'].map((tab) => (
                <li key={tab} className="me-2">
                  <button
                    onClick={() => setActiveTab(tab)}
                    className={`inline-block px-4 py-2 border-b-2 rounded-t-lg ${
                      activeTab === tab
                        ? 'text-blue-600 border-blue-600'
                        : 'text-gray-500 border-transparent hover:text-gray-600 hover:border-gray-300'
                    }`}
                  >
                    {tab === 'general'
                      ? 'General'
                      : tab === 'period'
                      ? 'Accounting Period'
                      : 'Tax'}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Tab Content */}
          <div className="bg-gray-50 border border-t-0 rounded-b-lg p-4">
            {activeTab === 'general' && (
              <FormGrid
                inputs={[
                  'Company Name',
                  'Address',
                  'Phone No.',
                  'Fax No.',
                  'Country',
                  'Default Currency',
                ]}
              />
            )}

            {activeTab === 'period' && (
              <FormGrid
                inputs={[
                  { label: 'Start Date', type: 'date' },
                  'Fiscal Year',
                  'Fiscal Month Start In',
                  'Default Period',
                  { label: 'Warn if before', placeholder: 'MM-DD' },
                  { label: 'or after', placeholder: 'MM-DD' },
                  'Error if before',
                  'or after',
                ]}
              />
            )}

            {activeTab === 'tax' && (
              <FormGrid
                inputs={[
                  'Form Serial Number',
                  'Tax Registration Number',
                  "Taxable Company's No",
                  'Tax Office Service',
                  'Type',
                  'KLU',
                ]}
              />
            )}
          </div>

          <div className="text-end mt-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded">
              Simpan
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

// Form grid component
const FormGrid = ({ inputs }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    {inputs.map((item, idx) =>
      typeof item === 'string' ? (
        <Input key={idx} label={item} />
      ) : (
        <Input key={idx} {...item} />
      )
    )}
  </div>
);

const Input = ({ label, type = 'text', placeholder = '' }) => (
  <div>
    <label className="block text-sm font-medium mb-1">{label}:</label>
    {label.toLowerCase() === 'address' ? (
      <textarea
        rows={2}
        placeholder={placeholder}
        className="form-textarea block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
      />
    ) : (
      <input
        type={type}
        placeholder={placeholder}
        className="form-input block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
      />
    )}
  </div>
);
