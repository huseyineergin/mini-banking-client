"use server";

import { ApiClient } from "@/lib/api-client";
import { Account } from "@/types/account";
import { APIErrorResponse, APISuccessResponse } from "@/types/api-response";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

const apiClient = new ApiClient();

export async function getAccountDetailsAction(
  accountId: string
): Promise<APISuccessResponse<Account> | APIErrorResponse> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");

  if (!token) {
    return {
      success: false,
      status: 401,
      message: "Unauthorized.",
    } satisfies APIErrorResponse;
  }

  return apiClient.get<Account>(`/api/accounts/${accountId}`, {
    headers: { Authorization: `Bearer ${token.value}` },
  });
}

export async function getAccountsAction(): Promise<APISuccessResponse<Account[]> | APIErrorResponse> {
  const cookieStore = await cookies();

  const token = cookieStore.get("token");

  if (!token) {
    return {
      success: false,
      status: 401,
      message: "Unauthorized.",
    } satisfies APIErrorResponse;
  }

  return apiClient.post<Account[]>(
    "/api/accounts/search",
    {},
    {
      headers: { Authorization: `Bearer ${token.value}` },
    }
  );
}

export async function deleteAccountAction(accountId: string): Promise<APISuccessResponse<null> | APIErrorResponse> {
  const cookieStore = await cookies();

  const token = cookieStore.get("token");

  if (!token) {
    return {
      success: false,
      status: 401,
      message: "Unauthorized.",
    } satisfies APIErrorResponse;
  }

  const response = await apiClient.delete<null>(`/api/accounts/${accountId}`, {
    headers: { Authorization: `Bearer ${token.value}` },
  });

  if (response.success) {
    revalidatePath("/accounts");
  }

  return response;
}

export async function createAccountAction(formData: {
  name: string;
}): Promise<APISuccessResponse<Account> | APIErrorResponse> {
  const cookieStore = await cookies();

  const token = cookieStore.get("token");

  if (!token) {
    return {
      success: false,
      status: 401,
      message: "Unauthorized.",
    } satisfies APIErrorResponse;
  }

  const response = await apiClient.post<Account>("/api/accounts", formData, {
    headers: { Authorization: `Bearer ${token.value}` },
  });

  if (response.success) {
    revalidatePath("/accounts");
  }

  return response;
}

export async function updateAccountAction(
  accountId: string,
  formData: {
    name: string;
  }
): Promise<APISuccessResponse<Account> | APIErrorResponse> {
  const cookieStore = await cookies();

  const token = cookieStore.get("token");

  if (!token) {
    return {
      success: false,
      status: 401,
      message: "Unauthorized.",
    } satisfies APIErrorResponse;
  }

  const response = await apiClient.put<Account>(`/api/accounts/${accountId}`, formData, {
    headers: { Authorization: `Bearer ${token.value}` },
  });

  if (response.success) {
    revalidatePath("/accounts");
  }

  return response;
}
