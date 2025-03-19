import LayoutRoot from "../LayoutRoot";
import SubCriteriaTable from "../../components/SubKriteria/subKriteriaTable";
import PageTitle from "../../components/PageTitle";

export default function SubKriteriaList() {
  return (
    <LayoutRoot>
      <PageTitle title="Sub Kriteria" />
      <SubCriteriaTable />
    </LayoutRoot>
  );
}
