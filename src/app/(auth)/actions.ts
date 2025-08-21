"use server";

import { APIErrorResponse, APISuccessResponse } from "@/types/api-response";
import { cookies } from "next/headers";

const baseUrl = process.env.API_BASE_URL!;

export async function loginAction(formData: {
  username: string;
  password: string;
}): Promise<APISuccessResponse<{ token: string }> | APIErrorResponse> {
  const cookieStore = await cookies();

  try {
    const res = await fetch(`${baseUrl}/api/users/login`, {
      method: "POST",
      body: JSON.stringify(formData),
      headers: { "Content-Type": "application/json" },
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

    const result: APISuccessResponse<{ token: string }> = await res.json();

    cookieStore.set("token", result.data.token, {
      path: "/",
      maxAge: 60 * 60,
      sameSite: "strict",
    });

    return result;
  } catch {
    return {
      success: false,
      status: 503,
      message: "An unexpected error occurred.",
    } satisfies APIErrorResponse;
  }
}

export async function registerAction(formData: {
  email: string;
  username: string;
  password: string;
}): Promise<APISuccessResponse<{ token: string }> | APIErrorResponse> {
  const cookieStore = await cookies();

  try {
    const res = await fetch(`${baseUrl}/api/users/register`, {
      method: "POST",
      body: JSON.stringify(formData),
      headers: { "Content-Type": "application/json" },
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

    const result: APISuccessResponse<{ token: string }> = await res.json();

    cookieStore.set("token", result.data.token, {
      path: "/",
      maxAge: 60 * 60,
      sameSite: "strict",
    });

    return result;
  } catch {
    return {
      success: false,
      status: 503,
      message: "An unexpected error occurred.",
    } satisfies APIErrorResponse;
  }
}
