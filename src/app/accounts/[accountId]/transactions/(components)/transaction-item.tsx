"use client";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Transaction, TransactionStatus } from "@/types/transaction";
import { ArrowLeftRight, Banknote, Calendar } from "lucide-react";

type TransactionItemProps = {
  transaction: Transaction;
};

export function TransactionItem({ transaction }: TransactionItemProps) {
  return (
    <Card className="rounded-md hover:shadow-md">
      <CardContent className="flex flex-col space-y-2">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Transaction #{transaction.id}</h2>
          <span
            className={cn(
              "rounded px-2 py-1 text-xs font-semibold",
              transaction.status === TransactionStatus.SUCCESS
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            )}
          >
            {transaction.status}
          </span>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <ArrowLeftRight className="h-4 w-4" />
          <span>
            {transaction.fromAccountNumber ?? "Unknown"} → {transaction.toAccountNumber ?? "Unknown"}
          </span>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <Banknote className="h-4 w-4" />
          <span className="font-medium">${transaction.amount.toFixed(2)}</span>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <Calendar className="h-4 w-4" />
          <span>{new Date(transaction.transactionDate).toLocaleString()}</span>
        </div>
      </CardContent>
    </Card>
  );
}
