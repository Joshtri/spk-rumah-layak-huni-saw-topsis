import { Button } from "flowbite-react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import React from "react";
import { useNavigate } from "react-router-dom";

const PerhitunganHero = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <motion.div
        initial={{ opacity: 0, y: 20 }} // Animasi masuk dari bawah
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative max-w-3xl p-8 bg-white rounded-lg shadow-lg text-center overflow-hidden"
      >
        {/* Background Gradien */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 opacity-10 rounded-lg"></div>

        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-3xl font-extrabold text-gray-800 mb-4 relative z-10"
        >
          Perhitungan Penerima Bantuan Rumah Layak Huni
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="text-gray-700 mb-6 text-lg leading-relaxed relative z-10"
        >
          Sistem ini menggunakan metode{" "}
          <span className="font-semibold">SAW (Simple Additive Weighting)</span>{" "}
          dan{" "}
          <span className="font-semibold">
            TOPSIS (Technique for Order Preference by Similarity to Ideal
            Solution)
          </span>{" "}
          untuk menentukan penerima bantuan secara{" "}
          <span className="text-blue-600 font-bold">objektif dan transparan</span>.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105"
            onClick={() => navigate("/perhitungan-saw-topsis")}
          >
            Mulai Perhitungan 🚀
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default PerhitunganHero;
