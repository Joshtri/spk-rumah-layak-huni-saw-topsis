import React from "react";
import { useLocation } from "react-router-dom";
import Layout from "../Layout";
import PenilaianInputForm from "../../components/Penilaian/PenilaianInputForm";
import Breadcrumbs from "../../components/ui/Breadcrumbs";

const PenilaianEdit = () => {
  const { state } = useLocation();
  const { alternatifName } = state || {};

  return (
    <Layout>
      <Breadcrumbs
        pathArray={[
          { path: "/dashboard", label: "Home" },
          { path: "/penilaian", label: "Penilaian" },
          { path: null, label: `Edit Penilaian - ${alternatifName}` },
        ]}
      />
      <PenilaianInputForm
        isEdit={true}
        initialData={state}
      />
    </Layout>
  );
};

export default PenilaianEdit;
