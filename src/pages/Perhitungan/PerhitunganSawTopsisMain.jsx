import React from "react";
import Layout from "../Layout";
import PerhitunganSawTopsis from "../../components/Perhitungan/SawTopsis/PerhitunganSawTopsis";
import Breadcrumbs from "../../components/ui/Breadcrumbs";

const PerhitunganSawTopsisMain = () => {
  return (
    <Layout>
      <Breadcrumbs
        pathArray={[
          { path: "/dashboard", label: "Home" },
          { path: "/perhitungan-intro", label: "Perhitungan" },
          { path: null, label: "Perhitungan SAW-TOPSIS" },
        ]}
      />
      <PerhitunganSawTopsis />
    </Layout>
  );
};

export default PerhitunganSawTopsisMain;
