"use server";

import { ApiClient } from "@/lib/api-client";
import { APIErrorResponse, APISuccessResponse } from "@/types/api-response";
import { Transaction } from "@/types/transaction";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

const apiClient = new ApiClient();

export async function getAccountTransactionHistoryAction(
  accountId: string
): Promise<APISuccessResponse<Transaction[]> | APIErrorResponse> {
  const cookieStore = await cookies();

  const token = cookieStore.get("token");

  if (!token) {
    return {
      success: false,
      status: 401,
      message: "Unauthorized.",
    } satisfies APIErrorResponse;
  }

  return apiClient.get<Transaction[]>(`/api/transactions/account/${accountId}`, {
    headers: { Authorization: `Bearer ${token.value}` },
  });
}

export async function initiateMoneyTransferAction(formData: {
  fromAccountNumber: string;
  toAccountNumber: string;
  amount: string;
}): Promise<APISuccessResponse<Transaction> | APIErrorResponse> {
  const cookieStore = await cookies();

  const token = cookieStore.get("token");

  if (!token) {
    return {
      success: false,
      status: 401,
      message: "Unauthorized.",
    } satisfies APIErrorResponse;
  }

  const response = await apiClient.post<Transaction>("/api/transactions/transfer", formData, {
    headers: { Authorization: `Bearer ${token.value}` },
  });

  if (response.success) {
    revalidatePath("/accounts");
  }

  return response;
}
