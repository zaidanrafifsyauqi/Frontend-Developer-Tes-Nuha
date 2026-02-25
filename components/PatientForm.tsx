"use client";

import { useState } from "react";
import { Patient } from "@/types/patient";

interface Props {
  onSubmit: (data: Patient) => void;
}

export default function PatientForm({ onSubmit }: Props) {
  const [form, setForm] = useState({
    name: "",
    nik: "",
    diagnosis: "",
    dateIn: "",
    doctor: "",
    room: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = () => {
    if (
      !form.name ||
      !form.nik ||
      !form.diagnosis ||
      !form.dateIn ||
      !form.doctor ||
      !form.room
    ) {
      alert("Semua field wajib diisi");
      return;
    }

    if (form.nik.length !== 16) {
      alert("NIK harus 16 digit");
      return;
    }

    onSubmit({
      id: Date.now().toString(),
      ...form,
    });
  };

  return (
    <div className="bg-white shadow rounded p-6 space-y-4">
      {[
        { label: "Nama", name: "name" },
        { label: "NIK", name: "nik" },
        { label: "Diagnosa Masuk", name: "diagnosis" },
        { label: "Tanggal Masuk", name: "dateIn", type: "date" },
        { label: "Dokter", name: "doctor" },
        { label: "Ruangan", name: "room" },
      ].map((f) => (
        <input
          key={f.name}
          type={f.type || "text"}
          name={f.name}
          placeholder={f.label}
          value={(form as any)[f.name]}
          onChange={handleChange}
          className="border p-2 w-full rounded"
        />
      ))}

      <button
        onClick={submit}
        className="bg-blue-600 text-white px-4 py-2 rounded w-full"
      >
        Simpan Pasien
      </button>
    </div>
  );
}
