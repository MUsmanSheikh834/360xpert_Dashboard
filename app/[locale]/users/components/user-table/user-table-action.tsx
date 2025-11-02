import { TableHeader } from "@/components/shared/table-header";
import PopupModal from "@/components/shared/popup-modal";
import TableSearchInput from "@/components/shared/table-search-input";
import UserCreateForm from "../user-forms/user-create-form";

export default function UserTableActions() {
  return (
    <TableHeader
      search={<TableSearchInput placeholder="Search users by email or name..." />}
      actions={[
        <PopupModal
          key="create-user"
          renderModal={(onClose) => <UserCreateForm modalClose={onClose} />}
        />,
      ]}
    />
  );
}
