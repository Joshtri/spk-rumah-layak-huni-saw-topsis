import React from "react";
import Layout from "../Layout";
import PenilaianInputForm from "../../components/Penilaian/PenilaianInputForm";
import Breadcrumbs from "../../components/ui/Breadcrumbs";

const PenilaianCreate = () => {
  return (
    <Layout>
      <Breadcrumbs
        pathArray={[
          { path: "/dashboard", label: "Home" },
          { path: "/penilaian", label: "Penilaian" },
          { path: null, label: "Tambah Penilaian" },
        ]}
      />
      <PenilaianInputForm />
    </Layout>
  );
};

export default PenilaianCreate;
