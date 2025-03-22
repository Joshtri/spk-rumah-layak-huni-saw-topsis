import React from "react";
import Layout from "../Layout";
import PenilaianTable from "../../components/Penilaian/PenilaianTable";
import Breadcrumbs from "../../components/ui/Breadcrumbs";

const PenilaianList = () => {
  return (
    <Layout>
      <Breadcrumbs
        pathArray={[
          { path: "/dashboard", label: "Home" },
          { path: null, label: "Penilaian" },
        ]}
      />
      <PenilaianTable />
    </Layout>
  );
};

export default PenilaianList;
