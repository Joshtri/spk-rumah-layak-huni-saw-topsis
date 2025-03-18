import LayoutRoot from "@/pages/layout";
import SubCriteriaTable from "@/components/sub-kriteria/subCriteriaTable";
import PageTitle from "@/components/pageTitle";

export default function SubKriteriaList() {
  return (
    <LayoutRoot>
      <PageTitle title="Sub Kriteria" />
      <SubCriteriaTable />
    </LayoutRoot>
  );
}
