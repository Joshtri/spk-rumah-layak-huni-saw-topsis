import Layout from "../Layout";
import RankingTable from "../../components/ranking/table";
import PageTitle from "../../components/ui/PageTitle";
import BreadCrumbs from "../../components/ui/Breadcrumbs";

export default function RankingList() {
  return (
    <Layout>
      <BreadCrumbs pathArray={["Home", "Ranking"]} />
      <PageTitle title="Ranking" />
      <RankingTable />
    </Layout>
  );
}
