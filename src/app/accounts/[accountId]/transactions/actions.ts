"use server";

import { APIErrorResponse, APISuccessResponse } from "@/types/api-response";
import { Transaction } from "@/types/transaction";
import { cookies } from "next/headers";

const baseUrl = process.env.API_BASE_URL!;

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

  try {
    const res = await fetch(`${baseUrl}/api/transactions/account/${accountId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.value}`,
      },
    });

    if (!res.ok) {
      try {
        const error: APIErrorResponse = await res.json();
        return error;
      } catch {
        return {
          success: false,
          status: res.status,
          message: "An unexpected error occurred.",
        } satisfies APIErrorResponse;
      }
    }

    const result: APISuccessResponse<Transaction[]> = await res.json();

    return result;
  } catch {
    return {
      success: false,
      status: 503,
      message: "An unexpected error occurred.",
    } satisfies APIErrorResponse;
  }
}
