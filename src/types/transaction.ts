export type Transaction = {
  id: string;
  fromAccountNumber: string;
  toAccountNumber: string;
  amount: number;
  transactionDate: string;
  status: TransactionStatus;
};

export enum TransactionStatus {
  SUCCESS = "SUCCESS",
  FAILED = "FAILED",
}
