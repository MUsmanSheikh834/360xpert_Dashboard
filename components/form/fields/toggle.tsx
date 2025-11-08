import { Switch } from "@/components/ui/switch";
import { FormField } from "@/components/form/types/form";
import { BaseField } from "../base-field";

export const ToggleField = ({ field }: { field: FormField }) => {
  return (
    <BaseField
      field={field}
      renderInput={({ onChange, value }: any) => (
        <Switch checked={value} onCheckedChange={onChange} />
      )}
    />
  );
};
