import LayoutRoot from "../LayoutRoot";
import SubCriteriaTable from "../../Components/SubKriteria/subKriteriaTable";
import PageTitle from "../../Components/PageTitle";

export default function SubKriteriaList() {
  return (
    <LayoutRoot>
      <PageTitle title="Sub Kriteria" />
      <SubCriteriaTable />
    </LayoutRoot>
  );
}
