"use client";

import { useEffect, useRef, useState } from "react";
import { Patient } from "@/types/patient";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function PatientTable({ data }: { data: Patient[] }) {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<"name" | "date" | null>(null);
  const [visible, setVisible] = useState(5);
  const loader = useRef<HTMLDivElement>(null);

  const processed = data
    .filter(
      (p) =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.nik.includes(search)
    )
    .sort((a, b) => {
      if (sort === "name") return a.name.localeCompare(b.name);
      if (sort === "date") return a.dateIn.localeCompare(b.dateIn);
      return 0;
    });

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setVisible((v) => v + 5);
      }
    });

    if (loader.current) observer.observe(loader.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="space-y-4">
      {/* SEARCH */}
      <Input
        placeholder="Cari nama / NIK"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setVisible(5);
        }}
      />

      {/* SORT */}
      <div className="flex gap-2">
        <Button
          variant={sort === "name" ? "default" : "outline"}
          onClick={() => {
            setSort("name");
            setVisible(5);
          }}
        >
          Sort Nama
        </Button>
        <Button
          variant={sort === "date" ? "default" : "outline"}
          onClick={() => {
            setSort("date");
            setVisible(5);
          }}
        >
          Sort Tanggal
        </Button>
      </div>

      {/* TABLE */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nama</TableHead>
            <TableHead>NIK</TableHead>
            <TableHead>Diagnosa</TableHead>
            <TableHead>Tanggal</TableHead>
            <TableHead>Dokter</TableHead>
            <TableHead>Ruangan</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {processed.slice(0, visible).map((p) => (
            <TableRow key={p.id}>
              <TableCell>{p.name}</TableCell>
              <TableCell>{p.nik}</TableCell>
              <TableCell>{p.diagnosis}</TableCell>
              <TableCell>{p.dateIn}</TableCell>
              <TableCell>{p.doctor}</TableCell>
              <TableCell>{p.room}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* INFINITE SCROLL LOADER */}
      {visible < processed.length && (
        <div ref={loader} className="h-10 text-center text-gray-400">
          Loading more...
        </div>
      )}
    </div>
  );
}
