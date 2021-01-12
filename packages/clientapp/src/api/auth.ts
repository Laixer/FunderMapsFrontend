import { get, post } from "@/api/api";

export async function login(email: string, password: string): Promise<{ token: string }> {
  return await post("/api/auth/signin", { email, password });
}

export async function refresh(): Promise<Response> {
  return await get("/api/auth/token-refresh");
}
