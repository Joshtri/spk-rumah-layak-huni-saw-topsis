import Layout from "../Layout";
import SubCriteriaTable from "../../components/SubKriteria/SubKriteriaTable";
import PageTitle from "../../components/ui/PageTitle";
import Breadcrumbs from "../../components/ui/Breadcrumbs";

export default function SubKriteriaList() {
  return (
    <Layout>
      <Breadcrumbs pathArray={["Home", "Sub Kriteria"]} />
      <PageTitle title="Sub Kriteria" />
      <SubCriteriaTable />
    </Layout>
  );
}
