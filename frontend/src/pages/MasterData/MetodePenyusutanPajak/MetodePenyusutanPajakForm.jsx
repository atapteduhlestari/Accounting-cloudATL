import React, { useState, useEffect } from "react";
import api from "../../../axios";

const MetodePenyusutanPajakForm = ({ fetchData, onClose, editItem }) => {
  const [nama, setNama] = useState("");

  useEffect(() => {
    if (editItem) {
      setNama(editItem.nama);
    }
  }, [editItem]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editItem) {
        await api.put(`/api/metode-penyusutan-pajak/${editItem.id}`, { nama });
      } else {
        await api.post("/api/metode-penyusutan-pajak", { nama });
      }
      fetchData();
      onClose();
    } catch (err) {
      alert("Terjadi kesalahan, pastikan nama unik!");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white/60 backdrop-blur">
      <div className="bg-white p-6 rounded-xl shadow-2xl w-96">
        <h2 className="text-lg font-bold mb-4">
          {editItem ? "Edit Metode" : "Tambah Metode"}
        </h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            placeholder="Nama metode"
            className="w-full border rounded px-3 py-2 mb-4"
            required
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded bg-gray-300"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-blue-600 text-white"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MetodePenyusutanPajakForm;
