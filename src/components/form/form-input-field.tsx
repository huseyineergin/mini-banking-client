import { Control } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";

interface FormInputFieldProps extends React.ComponentProps<"input"> {
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  label: string;
  placeholder?: string;
}

export function FormInputField({ name, control, label, placeholder, ...props }: FormInputFieldProps) {
  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem className="w-full">
          <div className="grid gap-3">
            <FormLabel>{label}</FormLabel>
            <FormControl>
              <Input placeholder={placeholder} {...field} {...props} />
            </FormControl>
            <FormMessage />
          </div>
        </FormItem>
      )}
    />
  );
}
