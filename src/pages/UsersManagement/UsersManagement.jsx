import Layout from "../Layout";
import UserTable from "../../components/UsersManagement/UserTable";
import PageTitle from "../../components/ui/PageTitle";

export default function UsersList() {
  return (
    <Layout>
      <PageTitle title="Admin" />
      <UserTable />
    </Layout>
  );
}
