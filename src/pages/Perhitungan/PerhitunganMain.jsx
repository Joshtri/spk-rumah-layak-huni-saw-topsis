import React from "react";
import PerhitunganHero from "../../components/Perhitungan/PerhitunganHero";
import Layout from "../Layout";
import Breadcrumbs from "../../components/ui/Breadcrumbs";

const PerhitunganMain = () => {
  return (
    <Layout>
      <Breadcrumbs
        pathArray={[
          { path: "/dashboard", label: "Home" },
          { path: null, label: "Perhitungan" },
        ]}
      />
      <PerhitunganHero />
    </Layout>
  );
};

export default PerhitunganMain;
