"use client";

import { Transaction } from "@/types/transaction";
import { TransactionItem } from "./transaction-item";

type TransactionListProps = {
  transactions: Transaction[];
};

export function TransactionList({ transactions }: TransactionListProps) {
  return (
    <div className="max-h-[480px] space-y-2 overflow-y-scroll md:max-h-[640px]">
      {transactions.length > 0 ? (
        transactions.map((transaction) => <TransactionItem key={transaction.id} transaction={transaction} />)
      ) : (
        <p className="my-4 text-center text-sm">No transactions found.</p>
      )}
    </div>
  );
}
