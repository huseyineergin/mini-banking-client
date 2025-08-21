"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Account } from "@/types/account";
import { Banknote, Calendar, Hash, Loader2, Trash } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";
import { deleteAccountAction } from "../actions";

type AccountItemProps = {
  account: Account;
};

export function AccountItem({ account }: AccountItemProps) {
  const [isPending, startTransition] = useTransition();

  function handleDeleteAccount() {
    startTransition(async () => {
      const res = await deleteAccountAction(account.id);

      if (res.success) {
        toast.success(res.message, { position: "top-center", closeButton: true });
      } else {
        toast.error(res.message, { position: "top-center", closeButton: true });
      }
    });
  }

  return (
    <Card className="rounded-md hover:shadow-md">
      <CardContent className="flex flex-col space-y-2">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Name: {account.name}</h2>
          <div className="space-x-1">
            {/* <Button size="icon" variant="ghost">
              <ArrowLeftRight width={16} height={16} />
            </Button>

            <Button size="icon" variant="ghost">
              <PenLine width={16} height={16} />
            </Button> */}

            <Button size="icon" variant="ghost" onClick={handleDeleteAccount}>
              {isPending ? <Loader2 className="animate-spin" /> : <Trash width={16} height={16} />}
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <Hash className="h-4 w-4" />
          <span>{account.number}</span>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <Banknote className="h-4 w-4" />
          <span className="font-medium">${account.balance.toFixed(2)}</span>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <Calendar className="h-4 w-4" />
          <span>Created At: {new Date(account.createdAt).toLocaleDateString()}</span>
        </div>
      </CardContent>
    </Card>
  );
}
