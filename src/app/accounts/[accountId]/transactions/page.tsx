import { TransactionList } from "./(components)/transaction-list";
import { getAccountTransactionHistoryAction } from "./actions";

export default async function Transactions({ params }: { params: Promise<{ accountId: string }> }) {
  const transactionsRes = await getAccountTransactionHistoryAction((await params).accountId);

  if (!transactionsRes.success) return;

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-lg space-y-2">
        <h1 className="text-center">Transactions</h1>

        <TransactionList transactions={transactionsRes.data} />
      </div>
    </div>
  );
}
