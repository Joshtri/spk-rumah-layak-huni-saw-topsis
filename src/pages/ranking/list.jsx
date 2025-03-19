import LayoutRoot from "../layout";
import RankingTable from "../../components/ranking/table";
import PageTitle from "../../components/pageTitle";

export default function RankingList() {
  return (
    <LayoutRoot>
      <PageTitle title="Ranking" />
      <RankingTable />
    </LayoutRoot>
  );
}
