import { AccountList } from "./(components)/account-list";
import { getAccountsAction } from "./actions";

export default async function Accounts() {
  const accountsRes = await getAccountsAction();

  if (!accountsRes.success) {
    return;
  }

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-lg space-y-2">
        <h1 className="text-center">Accounts</h1>

        <AccountList accounts={accountsRes.data} />
      </div>
    </div>
  );
}
