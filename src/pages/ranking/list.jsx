import LayoutRoot from "../LayoutRoot";
import RankingTable from "../../components/ranking/table";
import PageTitle from "../../components/PageTitle";

export default function RankingList() {
  return (
    <LayoutRoot>
      <PageTitle title="Ranking" />
      <RankingTable />
    </LayoutRoot>
  );
}
