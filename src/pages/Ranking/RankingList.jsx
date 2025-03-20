import Layout from "../Layout";
import RankingTable from "../../components/ranking/table";
import PageTitle from "../../components/ui/PageTitle";

export default function RankingList() {
  return (
    <Layout>
      <PageTitle title="Ranking" />
      <RankingTable />
    </Layout>
  );
}
