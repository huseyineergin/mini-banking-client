"use client";

import { FormInputField } from "@/components/form/form-input-field";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { updateAccountAction } from "../actions";

const formSchema = z.object({
  name: z.string().nonempty({ message: "Account name is required." }),
});

type UpdateAccountProps = {
  accountId: string;
};

export function UpdateAccountForm({
  className,
  accountId,
  ...props
}: React.ComponentProps<"div"> & UpdateAccountProps) {
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(async () => {
      const res = await updateAccountAction(accountId, values);
      if (res.success) {
        toast.success(res.message, { position: "bottom-center", closeButton: true });
        form.reset();
      } else {
        const messages = Array.isArray(res.message) ? res.message : [res.message];
        messages.forEach((message) => {
          toast.error(message, {
            position: "bottom-center",
            closeButton: true,
          });
        });
      }
    });
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-6">
            <FormInputField name="name" control={form.control} label="New Name" />

            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? <Loader2 className="animate-spin" /> : "Update"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
