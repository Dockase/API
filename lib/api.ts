// Typed client for the Dockase developer account API (api.dockase.com).
// Session token is persisted in localStorage so developers stay signed in
// across visits; API keys themselves are shown once and never stored.

export const BASE_URL = "https://api.dockase.com";
export const TOKEN_KEY = "dockase_dev_token";

export class ApiError extends Error {
  constructor(
    public status: number,
    public type: string,
    message: string,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export interface SignupResponse {
  api_key: string;
  key_prefix: string;
  session_token: string;
}

export interface LoginResponse {
  session_token: string;
  key_prefix: string;
  plan_type: string;
}

export interface Account {
  key_prefix: string;
  plan_type: string;
  plan_price_usd: number | null;
  queries_used: number;
  query_limit: number;
  tokens_used: number;
  token_limit: number;
  overage_tokens: number;
  overage_enabled: boolean;
  is_active: boolean;
  rate_limit_per_minute: number;
  last_reset_date: string;
  prepaid_calls: number;
  prepaid_packs: Record<string, PrepaidPackInfo>;
}

export interface RegenerateResponse {
  api_key: string;
  key_prefix: string;
}

export interface OverageToggleResponse {
  overage_enabled: boolean;
}

export interface UpgradeResponse {
  authorization_url: string;
}

export type PrepaidPack = "STARTER" | "GROWTH" | "SCALE";

export interface PrepaidPackInfo {
  usd: number;
  calls: number;
}

export interface PrepaidPurchaseResponse {
  authorization_url: string;
}

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearToken() {
  localStorage.removeItem(TOKEN_KEY);
}

interface RequestOptions {
  method?: "GET" | "POST";
  body?: unknown;
  /** Attach the session token. Default true. */
  auth?: boolean;
}

async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { method = "GET", body, auth = true } = options;

  const headers: Record<string, string> = {};
  if (body !== undefined) headers["Content-Type"] = "application/json";
  if (auth) {
    const token = getToken();
    if (token) headers["Authorization"] = `Bearer ${token}`;
  }

  let res: Response;
  try {
    res = await fetch(`${BASE_URL}${path}`, {
      method,
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
  } catch {
    throw new ApiError(0, "network_error", "Couldn't reach api.dockase.com — check your connection.");
  }

  let json: {
    data?: T;
    error?: { type?: string; message?: string };
  } | null = null;
  try {
    json = await res.json();
  } catch {
    // non-JSON body — fall through to status handling
  }

  if (!res.ok) {
    if (res.status === 401 && auth) {
      clearToken();
      if (typeof window !== "undefined") window.location.href = "/login";
    }
    throw new ApiError(
      res.status,
      json?.error?.type ?? "unknown_error",
      json?.error?.message ?? `Request failed with status ${res.status}.`,
    );
  }

  return (json?.data ?? ({} as T)) as T;
}

export function signup(input: {
  email: string;
  password: string;
  full_name?: string;
}) {
  return request<SignupResponse>("/v1/auth/signup", {
    method: "POST",
    body: input,
    auth: false,
  });
}

export function login(input: { email: string; password: string }) {
  return request<LoginResponse>("/v1/auth/login", {
    method: "POST",
    body: input,
    auth: false,
  });
}

export function getAccount() {
  return request<Account>("/v1/account");
}

export function regenerateKey() {
  return request<RegenerateResponse>("/v1/account/key/regenerate", {
    method: "POST",
  });
}

export function toggleOverage() {
  return request<OverageToggleResponse>("/v1/account/overage/toggle", {
    method: "POST",
  });
}

export function upgradePlan(plan_type: "PRO" | "ENTERPRISE") {
  return request<UpgradeResponse>("/v1/account/upgrade", {
    method: "POST",
    body: { plan_type },
  });
}

export function buyPrepaidPack(pack: PrepaidPack) {
  return request<PrepaidPurchaseResponse>("/v1/account/prepaid", {
    method: "POST",
    body: { pack },
  });
}
