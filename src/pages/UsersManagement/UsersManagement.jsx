import Layout from "../Layout";
import UserTable from "../../components/UsersManagement/UserTable";
import PageTitle from "../../components/ui/PageTitle";
import Breadcrumbs from "../../components/ui/Breadcrumbs";

export default function UsersList() {
  return (
    <Layout>
      <Breadcrumbs pathArray={["Home", "Users Management"]} />
      <PageTitle title="Admin" />
      <UserTable />
    </Layout>
  );
}
