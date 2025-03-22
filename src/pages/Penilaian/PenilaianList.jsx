import React from "react";
import Layout from "../Layout";
import PenilaianTable from "../../components/Penilaian/PenilaianTable";
import Breadcrumbs from "../../components/ui/Breadcrumbs";

const PenilaianList = () => {
  return (
    <Layout>
      <Breadcrumbs pathArray={["Home", "Penilaian"]} />
      <PenilaianTable />
    </Layout>
  );
};

export default PenilaianList;
