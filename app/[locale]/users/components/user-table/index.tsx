import DataTable from "@/components/shared/data-table";
import { columns } from "./columns";
import UserTableActions from "./user-table-action";
import { UserModuleUser } from "@/types/user";

type TUserTableProps = {
  users: UserModuleUser[];
  page: number;
  totalUsers: number;
  pageCount: number;
};

export default function UserTable({ users, pageCount }: TUserTableProps) {
  return (
    <>
      <UserTableActions />
      {users && <DataTable columns={columns} data={users} pageCount={pageCount} />}
    </>
  );
}
