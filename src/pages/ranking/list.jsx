import LayoutRoot from "../layout";
import RankingTable from "@/components/Ranking/Table";
import PageTitle from "@/components/PageTitle";

export default function RankingList() {
  return (
    <LayoutRoot>
      <PageTitle title="Ranking" />
      <RankingTable />
    </LayoutRoot>
  );
}
