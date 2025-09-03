import React from 'react';

const Modal = ({ open, children, onClose, title }) => {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backdropFilter: 'blur(8px)', background: 'rgba(255,255,255,0.6)' }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg rounded-2xl shadow-2xl"
        style={{ background: 'rgba(255,255,255,0.9)' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="font-semibold">{title}</h2>
          <button onClick={onClose} className="px-2 py-1 rounded-lg border">✕</button>
        </div>
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};

const Row = ({ label, value }) => (
  <div className="flex items-start gap-4 py-2 border-b">
    <div className="w-48 text-sm text-gray-600">{label}</div>
    <div className="flex-1">{value ?? '-'}</div>
  </div>
);

const TipeAktivaTetapDetail = ({ open, onClose, data }) => {
  return (
    <Modal open={open} onClose={onClose} title="Detail Tipe Aktiva Tetap">
      <div className="space-y-1">
        <Row label="Nama (Tipe Aktiva Tetap)" value={data?.nama} />
        <Row label="Tipe Aset Tetap Pajak" value={data?.tipe_pajak?.nama} />
        <Row label="Metode Penyusutan Pajak" value={data?.metode_penyusutan_pajak} />
        <Row label="Estimasi Umur Pajak" value={data?.estimasi_umur_pajak} />
        <Row label="Tarif Penyusutan Pajak" value={data?.tarif_penyusutan_pajak} />
        <Row label="Dibuat" value={new Date(data?.created_at).toLocaleString()} />
        <Row label="Diubah" value={new Date(data?.updated_at).toLocaleString()} />
      </div>
    </Modal>
  );
};

export default TipeAktivaTetapDetail;
