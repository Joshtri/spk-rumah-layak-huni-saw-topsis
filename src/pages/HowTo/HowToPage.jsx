"use client";

import { useEffect } from "react";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import {
  Calculator,
  BookOpenCheck,
  Ruler,
  Gauge,
  Settings2,
  CircleCheck,
  ArrowDownWideNarrow,
  TrendingUp,
} from "lucide-react";
import Layout from "../Layout";
import Breadcrumbs from "../../components/ui/Breadcrumbs";

export default function SPKGuide() {
  useEffect(() => {
    const stepGuide = driver({
      showProgress: true,
      animate: true,
      steps: [
        {
          element: "#step1",
          popover: {
            title: "Langkah 1: Matriks Keputusan",
            description:
              "Susun data ke dalam bentuk tabel berdasarkan C1–C9 untuk tiap alternatif (A1–A10).",
          },
        },
        {
          element: "#step2",
          popover: {
            title: "Langkah 2: Cost / Benefit",
            description:
              "Tentukan tipe tiap kriteria. Misalnya: C8 adalah cost karena lebih kecil = lebih baik.",
          },
        },
        {
          element: "#step3",
          popover: {
            title: "Langkah 3: Normalisasi (SAW)",
            description:
              "Gunakan rumus untuk mengubah data menjadi nilai skala 0–1.",
          },
        },
        {
          element: "#step4",
          popover: {
            title: "Langkah 4: Matriks Terbobot (SAW)",
            description:
              "Kalikan nilai normalisasi dengan bobot untuk tiap kriteria.",
          },
        },
        {
          element: "#step5",
          popover: {
            title: "Langkah 5: Total Skor SAW",
            description:
              "Jumlahkan skor terbobot untuk mendapatkan nilai akhir.",
          },
        },
        {
          element: "#step6",
          popover: {
            title: "Langkah 6: Matriks Terbobot (TOPSIS)",
            description:
              "Gunakan hasil normalisasi SAW lalu kalikan lagi dengan bobot.",
          },
        },
        {
          element: "#step7",
          popover: {
            title: "Langkah 7: Solusi Ideal A+ & A-",
            description:
              "Identifikasi nilai ideal tertinggi dan terendah untuk tiap kriteria.",
          },
        },
        {
          element: "#step8",
          popover: {
            title: "Langkah 8: Jarak ke Solusi Ideal",
            description: "Hitung jarak tiap alternatif ke solusi A⁺ dan A⁻.",
          },
        },
        {
          element: "#step9",
          popover: {
            title: "Langkah 9: Nilai Preferensi (Vi)",
            description:
              "Hitung Vi = D⁻ / (D⁻ + D⁺). Vi terbesar = alternatif terbaik.",
          },
        },
      ],
    });

    stepGuide.drive();
  }, []);

  const steps = [
    {
      id: "step1",
      icon: <BookOpenCheck />,
      title: "Matriks Keputusan",
      content:
        "Susun data ke dalam tabel berdasarkan C1–C9 untuk tiap alternatif (A1–A10).",
    },
    {
      id: "step2",
      icon: <Settings2 />,
      title: "Cost / Benefit",
      content:
        "Tentukan apakah kriteria bersifat cost atau benefit. Contoh: C8 = cost.",
    },
    {
      id: "step3",
      icon: <Ruler />,
      title: "Normalisasi (SAW)",
      content: (
        <>
          Benefit:{" "}
          <code className="bg-muted px-1 rounded">rij = xij / max(xij)</code>
          <br />
          Cost:{" "}
          <code className="bg-muted px-1 rounded">rij = min(xij) / xij</code>
        </>
      ),
    },
    {
      id: "step4",
      icon: <Calculator />,
      title: "Matriks Terbobot (SAW)",
      content: (
        <>
          <code>yij = rij × wj</code> (bobot masing-masing kriteria)
        </>
      ),
    },
    {
      id: "step5",
      icon: <Gauge />,
      title: "Total Skor SAW",
      content: "Jumlahkan yij per baris → skor akhir untuk ranking awal.",
    },
    {
      id: "step6",
      icon: <Calculator />,
      title: "Matriks Terbobot (TOPSIS)",
      content: "Gunakan hasil normalisasi SAW untuk membuat matriks TOPSIS.",
    },
    {
      id: "step7",
      icon: <CircleCheck />,
      title: "Solusi Ideal A⁺ dan A⁻",
      content: (
        <>
          A⁺ = nilai terbaik
          <br />
          A⁻ = nilai terburuk
        </>
      ),
    },
    {
      id: "step8",
      icon: <ArrowDownWideNarrow />,
      title: "Jarak ke A⁺ dan A⁻",
      content: (
        <>
          D⁺ = √Σ(yij - A⁺j)²
          <br />
          D⁻ = √Σ(yij - A⁻j)²
        </>
      ),
    },
    {
      id: "step9",
      icon: <TrendingUp />,
      title: "Nilai Preferensi (Vi)",
      content: (
        <>
          <code>Vi = D⁻ / (D⁺ + D⁻)</code> → Vi tertinggi = alternatif terbaik
        </>
      ),
    },
  ];

  return (
    <Layout>
      <div className="p-6 max-w-6xl mx-auto space-y-8 text-gray-800">
        <Breadcrumbs
          pathArray={[
            { path: "/dashboard", label: "Home" },
            { path: null, label: "Panduan Perhitungan SPK" },
          ]}
        />
        <h1 className="text-3xl font-bold mb-10 text-center text-primary">
          Panduan Perhitungan SPK SAW & TOPSIS Interaktif
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {steps.map((step, index) => (
            <div
              key={step.id}
              id={step.id}
              className="flex flex-col h-full p-6 border rounded-xl shadow-md bg-white hover:shadow-lg transition"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="p-3 bg-primary/10 rounded-full text-primary">
                  {step.icon}
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">
                    Step {index + 1}
                  </div>
                  <h2 className="text-lg font-semibold text-primary">
                    {step.title}
                  </h2>
                </div>
              </div>

              <div className="text-gray-600 text-sm md:text-base leading-relaxed mt-2">
                {step.content}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
