"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Account } from "@/types/account";
import { Banknote, Calendar, Hash } from "lucide-react";

type AccountItemProps = {
  account: Account;
};

export function AccountItem({ account }: AccountItemProps) {
  return (
    <Card className="rounded-md py-4 hover:shadow-md">
      <CardContent className="flex flex-col space-y-2">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Name: {account.name}</h2>
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
