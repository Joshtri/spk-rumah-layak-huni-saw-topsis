import Layout from "../Layout";
import SubCriteriaTable from "../../components/SubKriteria/SubKriteriaTable";
import PageTitle from "../../components/ui/PageTitle";

export default function SubKriteriaList() {
  return (
    <Layout>
      <PageTitle title="Sub Kriteria" />
      <SubCriteriaTable />
    </Layout>
  );
}
