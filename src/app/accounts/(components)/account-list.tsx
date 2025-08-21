"use client";

import SearchBar from "@/components/search-bar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Account } from "@/types/account";
import { Plus } from "lucide-react";
import { useQueryState } from "nuqs";
import { AccountItem } from "./account-item";
import { CreateAccountForm } from "./create-account-form";

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
        <p className="my-4 text-center text-sm">No accounts found.</p>
      )}

      <Dialog>
        <DialogTrigger asChild>
          <Button className="w-full">
            <Plus /> Create Account
          </Button>
        </DialogTrigger>

        <DialogContent>
          <DialogTitle className="text-center">Create a New Account</DialogTitle>

          <CreateAccountForm />
        </DialogContent>
      </Dialog>
    </div>
  );
}
