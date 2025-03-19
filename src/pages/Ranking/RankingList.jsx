import LayoutRoot from "../LayoutRoot";
import RankingTable from "../../Components/ranking/table";
import PageTitle from "../../Components/PageTitle";

export default function RankingList() {
  return (
    <LayoutRoot>
      <PageTitle title="Ranking" />
      <RankingTable />
    </LayoutRoot>
  );
}
