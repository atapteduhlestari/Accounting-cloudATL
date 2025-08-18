import React from 'react';

const DetailProjectMst = ({ closeModal, project }) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-2xl">
        <h2 className="text-lg font-semibold mb-4">Detail Proyek</h2>

        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium">Project No</label>
            <p className="border px-3 py-2 rounded bg-gray-50">{project.project_no}</p>
          </div>
          <div>
            <label className="block text-sm font-medium">Project Name</label>
            <p className="border px-3 py-2 rounded bg-gray-50">{project.project_name}</p>
          </div>
          <div>
            <label className="block text-sm font-medium">Header</label>
            <p className="border px-3 py-2 rounded bg-gray-50">{project.header}</p>
          </div>
          <div>
            <label className="block text-sm font-medium">Sub Project</label>
            <p className="border px-3 py-2 rounded bg-gray-50">{project.sub_project}</p>
          </div>
          <div>
            <label className="block text-sm font-medium">Customer Name</label>
            <p className="border px-3 py-2 rounded bg-gray-50">{project.customer_name}</p>
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <button
            type="button"
            onClick={closeModal}
            className="bg-gray-300 px-4 py-2 rounded"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailProjectMst;
