"use client";

import { FormInputField } from "@/components/form/form-input-field";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { registerAction } from "../actions";

const formSchema = z.object({
  email: z.email({ error: "Please enter a valid email." }).nonempty({ error: "Email is required." }),
  username: z.string().nonempty({ error: "Username is required." }),
  password: z.string().nonempty({ error: "Password is required." }),
});

export function RegisterForm({ className, ...props }: React.ComponentProps<"div">) {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      username: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(async () => {
      const res = await registerAction(values);
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
      <Card>
        <CardHeader className="text-center">
          <CardTitle>Register</CardTitle>
          <CardDescription>Enter your details below to create a new account</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-6">
                <FormInputField name="email" control={form.control} label="Email" />

                <FormInputField name="username" control={form.control} label="Username" />

                <FormInputField type="password" name="password" control={form.control} label="Password" />

                <div className="flex flex-col gap-3">
                  <Button type="submit" className="w-full" disabled={isPending}>
                    {isPending ? <Loader2 className="animate-spin" /> : "Register"}
                  </Button>
                </div>
              </div>

              <div className="mt-4 text-center text-sm">
                Already have an account?{" "}
                <Link href="/login" className="underline underline-offset-4">
                  Login
                </Link>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
