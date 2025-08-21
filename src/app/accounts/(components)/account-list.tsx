"use client";

import SearchBar from "@/components/search-bar";
import { Account } from "@/types/account";
import { useQueryState } from "nuqs";
import { AccountItem } from "./account-item";

type AccountListProps = {
  accounts: Account[];
};

export function AccountList({ accounts }: AccountListProps) {
  const [query, setQuery] = useQueryState("q", { defaultValue: "" });

  const filteredAccounts = accounts.filter(
    (account) => account.name.toLowerCase().includes(query.toLowerCase()) || account.number.includes(query)
  );

  return (
    <div className="space-y-2">
      <SearchBar value={query} onChange={setQuery} />

      {filteredAccounts.length > 0 ? (
        filteredAccounts.map((account) => <AccountItem key={account.id} account={account} />)
      ) : (
        <p className="mt-4 text-center text-sm">No accounts found.</p>
      )}
    </div>
  );
}
