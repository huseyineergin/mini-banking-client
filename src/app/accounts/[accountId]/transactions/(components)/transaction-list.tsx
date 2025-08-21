"use client";

import { Transaction } from "@/types/transaction";
import { TransactionItem } from "./transaction-item";

type TransactionListProps = {
  transactions: Transaction[];
};

export function TransactionList({ transactions }: TransactionListProps) {
  return (
    <div className="space-y-2">
      {transactions.length > 0 ? (
        transactions.map((transaction) => <TransactionItem key={transaction.id} transaction={transaction} />)
      ) : (
        <p className="my-4 text-center text-sm">No transactions found.</p>
      )}
    </div>
  );
}
