"use server";

import { ApiClient } from "@/lib/api-client";
import { APIErrorResponse, APISuccessResponse } from "@/types/api-response";
import { cookies } from "next/headers";

const apiClient = new ApiClient();

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete("token");
}

export async function loginAction(formData: {
  username: string;
  password: string;
}): Promise<APISuccessResponse<{ token: string }> | APIErrorResponse> {
  const cookieStore = await cookies();

  const response = await apiClient.post<{ token: string }>("/api/users/login", formData);

  if (response.success) {
    cookieStore.set("token", response.data.token, {
      path: "/",
      maxAge: 60 * 60,
      sameSite: "strict",
    });
  }

  return response;
}

export async function registerAction(formData: {
  email: string;
  username: string;
  password: string;
}): Promise<APISuccessResponse<{ token: string }> | APIErrorResponse> {
  const cookieStore = await cookies();

  const response = await apiClient.post<{ token: string }>("/api/users/register", formData);

  if (response.success) {
    cookieStore.set("token", response.data.token, {
      path: "/",
      maxAge: 60 * 60,
      sameSite: "strict",
    });
  }

  return response;
}
