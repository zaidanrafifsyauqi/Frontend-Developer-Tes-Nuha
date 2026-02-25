"use client";

import { useEffect, useState } from "react";
import { Patient } from "@/types/patient";
import PatientTable from "@/components/PatientTable";
import AddPatientModal from "@/components/AddPatientModal";
import Loading from "@/components/Loading";

export default function Page() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setPatients([
        {
          id: "1",
          name: "Budi Santoso",
          nik: "3201010101010101",
          diagnosis: "Demam",
          dateIn: "2026-02-20",
          doctor: "Dr. Andi",
          room: "A-101",
        },
      ]);
      setLoading(false);
    }, 500);
  }, []);

  return (
    <main className="p-6 max-w-5xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Daftar Pasien Aktif</h1>
        <AddPatientModal
          onSubmit={(p) => setPatients((prev) => [...prev, p])}
        />
      </div>

      {loading ? <Loading /> : <PatientTable data={patients} />}
    </main>
  );
}
