"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import PatientForm from "./PatientForm";
import { Patient } from "@/types/patient";

export default function AddPatientModal({
  onSubmit,
}: {
  onSubmit: (data: Patient) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setOpen(true)}>+ Pasien Masuk</Button>
      </DialogTrigger>

      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Form Pasien Masuk</DialogTitle>
        </DialogHeader>

        <PatientForm
          onSubmit={(data) => {
            onSubmit(data);
            setOpen(false);
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
