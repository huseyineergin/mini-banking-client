"use client";

import { FormInputField } from "@/components/form/form-input-field";
import { FormSelectField } from "@/components/form/form-select-field";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { Account } from "@/types/account";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { initiateMoneyTransferAction } from "../[accountId]/transactions/actions";

const formSchema = z.object({
  fromAccountNumber: z.string().nonempty({ message: "Sender account is required." }),
  toAccountNumber: z.string().nonempty({ message: "Sender account is required." }),
  amount: z
    .string()
    .nonempty({ error: "Amount is required." })
    .refine((val) => !isNaN(Number(val)), {
      message: "Amount must be a valid number.",
    })
    .refine((val) => Number(val) > 0, {
      message: "Amount cannot be less than 1.",
    }),
});

type CreateTransactionFormProps = {
  accounts: Account[];
};

export function CreateTransactionForm({
  className,
  accounts,
  ...props
}: React.ComponentProps<"div"> & CreateTransactionFormProps) {
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fromAccountNumber: "",
      toAccountNumber: "",
      amount: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(async () => {
      const res = await initiateMoneyTransferAction(values);
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
            <FormSelectField
              name="fromAccountNumber"
              control={form.control}
              label="Sender Account"
              options={accounts.map((account) => ({
                label: `${account.name} - ${account.number}`,
                value: account.number,
              }))}
            />

            <FormInputField name="toAccountNumber" control={form.control} label="Receiver Account Number" />

            <FormInputField name="amount" control={form.control} label="Amount" />

            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? <Loader2 className="animate-spin" /> : "Transfer"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
