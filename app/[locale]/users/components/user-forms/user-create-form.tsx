"use client";

import { BaseForm } from "@/components/form/base-form";
import Heading from "@/components/shared/heading";
import { Button } from "@/components/ui/button/button";
import { Loader2 } from "lucide-react";
import { z } from "zod";
import { toast } from "sonner";
import { UserModuleUser } from "@/app/[locale]/users/types/user";
import { createUserSchema, updateUserSchema } from "@/validations";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import {
  createUser as createUserAction,
  updateUser as updateUserAction,
} from "@/redux/slices/user-slice";
import { FormField } from "@/components/form/types/form";

interface UserFormProps {
  modalClose: () => void;
  initialData?: UserModuleUser;
  isUpdate?: boolean;
}

const UserCreateForm = ({ modalClose, initialData, isUpdate }: UserFormProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector((state: RootState) => state.users);

  // ✅ Choose schema dynamically (call the function)
  const validationSchema = isUpdate ? updateUserSchema() : createUserSchema();
  type UserFormData = z.infer<typeof validationSchema>;

  // ✅ Handle submit
  const onSubmit = async (values: UserFormData) => {
    try {
      if (isUpdate && initialData) {
        await dispatch(
          updateUserAction({
            id: initialData._id,
            userData: values,
          })
        ).unwrap();
        toast.success("User updated successfully");
      } else {
        await dispatch(createUserAction(values as any)).unwrap();
        toast.success("User created successfully");
      }

      // ✅ Redux already updates the list optimistically - no refetch needed!
      modalClose();
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message || error?.message || "Something went wrong";
      toast.error(errorMessage);
    }
  };

  // ✅ Define form fields
  const userFormFields: FormField[] = [
    {
      id: "user-info",
      name: "user-info",
      type: "section",
      label: "User Information",
      defaultOpen: true,
      collapsible: false,
      grid: { columns: { sm: 1, md: 2, lg: 2 }, gap: 4 },
      fields: [
        {
          id: "name",
          name: "name",
          type: "text",
          label: "Full Name",
          required: true,
          placeholder: "Enter full name",
          className: "bg-muted/50 focus:bg-background transition-colors",
        },
        {
          id: "email",
          name: "email",
          type: "email",
          label: "Email",
          required: true,
          placeholder: "Enter email address",
          className: "bg-muted/50 focus:bg-background transition-colors",
        },
        {
          id: "phone",
          name: "phone",
          type: "text",
          label: "Phone Number",
          placeholder: "+1234567890",
          className: "bg-muted/50 focus:bg-background transition-colors",
        },
        {
          id: "age",
          name: "age",
          type: "number",
          label: "Age",
          placeholder: "Enter age",
          className: "bg-muted/50 focus:bg-background transition-colors",
        },
        {
          id: "gender",
          name: "gender",
          type: "select",
          label: "Gender",
          placeholder: "Select gender",
          options: [
            { label: "Male", value: "Male" },
            { label: "Female", value: "Female" },
            { label: "Other", value: "Other" },
          ],
          className: "bg-muted/50 focus:bg-background transition-colors",
        },
        {
          id: "address",
          name: "address",
          type: "text",
          label: "Address",
          placeholder: "Enter address",
          span: { sm: 1, md: 2, lg: 2 },
          className: "bg-muted/50 focus:bg-background transition-colors",
        },
        {
          id: "city",
          name: "city",
          type: "text",
          label: "City",
          placeholder: "Enter city",
          className: "bg-muted/50 focus:bg-background transition-colors",
        },
        {
          id: "country",
          name: "country",
          type: "text",
          label: "Country",
          placeholder: "Enter country",
          className: "bg-muted/50 focus:bg-background transition-colors",
        },
        {
          id: "zipCode",
          name: "zipCode",
          type: "text",
          label: "Zip Code",
          placeholder: "Enter zip code",
          className: "bg-muted/50 focus:bg-background transition-colors",
        },
        {
          id: "isActive",
          name: "isActive",
          type: "toggle",
          label: "Active Status",
          className: "bg-muted/50 focus:bg-background transition-colors",
        },
      ],
    },
  ];

  // ✅ Default values for form
  const defaultValues =
    isUpdate && initialData
      ? {
          name: initialData.name || "",
          email: initialData.email || "",
          phone: initialData.phone || "",
          age: initialData.age || undefined,
          gender: initialData.gender || "",
          address: initialData.address || "",
          city: initialData.city || "",
          country: initialData.country || "",
          zipCode: initialData.zipCode || "",
          isActive: initialData.isActive ?? true,
        }
      : {
          isActive: true,
        };

  const isPending = loading;

  return (
    <div className="space-y-6">
      <Heading
        title={isUpdate ? "Edit User" : "New User"}
        description={isUpdate ? `Update user: ${initialData?.email}` : "Add a new user"}
        className="text-center"
      />

      <BaseForm
        fields={userFormFields}
        onSubmit={onSubmit}
        defaultValues={defaultValues}
        validationSchema={validationSchema}
        submitText={isUpdate ? "Update User" : "Create User"}
        renderSubmitButton={() => (
          <div className="mt-6 flex justify-end gap-4 border-t pt-4">
            <Button type="button" variant="outline" onClick={modalClose} disabled={isPending}>
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {isUpdate ? "Updating..." : "Creating..."}
                </>
              ) : isUpdate ? (
                "Update User"
              ) : (
                "Create User"
              )}
            </Button>
          </div>
        )}
        loading={isPending}
      />
    </div>
  );
};

export default UserCreateForm;
