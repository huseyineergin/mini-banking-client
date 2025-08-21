"use server";

import { Account } from "@/types/account";
import { APIErrorResponse, APISuccessResponse } from "@/types/api-response";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

const baseUrl = process.env.API_BASE_URL!;

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

  try {
    const res = await fetch(`${baseUrl}/api/accounts/search`, {
      method: "POST",
      body: JSON.stringify({}),
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

    const result: APISuccessResponse<Account[]> = await res.json();

    return result;
  } catch {
    return {
      success: false,
      status: 503,
      message: "An unexpected error occurred.",
    } satisfies APIErrorResponse;
  }
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

  try {
    const res = await fetch(`${baseUrl}/api/accounts/${accountId}`, {
      method: "DELETE",
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

    const result: APISuccessResponse<null> = await res.json();

    revalidatePath("/accounts");

    return result;
  } catch {
    return {
      success: false,
      status: 503,
      message: "An unexpected error occurred.",
    } satisfies APIErrorResponse;
  }
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

  try {
    const res = await fetch(`${baseUrl}/api/accounts`, {
      method: "POST",
      body: JSON.stringify(formData),
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

    const result: APISuccessResponse<Account> = await res.json();

    revalidatePath("/accounts");

    return result;
  } catch {
    return {
      success: false,
      status: 503,
      message: "An unexpected error occurred.",
    } satisfies APIErrorResponse;
  }
}
