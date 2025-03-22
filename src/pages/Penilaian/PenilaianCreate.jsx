import React from "react";
import Layout from "../Layout";
import PenilaianInputForm from "../../components/Penilaian/PenilaianInputForm";
import Breadcrumbs from "../../components/ui/Breadcrumbs";

const PenilaianCreate = () => {
  return (
    <Layout>
      <Breadcrumbs pathArray={["Home", "Penilaian", "Tambah Penilaian"]} />
      <PenilaianInputForm />
    </Layout>
  );
};

export default PenilaianCreate;
