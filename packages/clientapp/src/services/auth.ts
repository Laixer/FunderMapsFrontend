import { login as apiLogin, refresh } from "@/api/auth";
import { JwtToken } from "@/models/JwtToken";
import { UserRole } from "@/models/UserRole";
// eslint-disable-next-line @typescript-eslint/camelcase
import jwt_decode from "jwt-decode";

// localStorage keys
const userKey = "user";
const lastUser = "lastUser";
const accessToken = "access_token";

// Gets the stored access token.
function getAccessToken(): string | null {
  return localStorage.getItem(accessToken);
}

// Get the access token from storage and decode it.
function getAccessTokenDecoded(): JwtToken {
  const token = getAccessToken();
  if (!token) {
    throw new Error("Could not get access token when requesting user");
  }

  return jwt_decode(token);
}

// Get the user from storage.
// TODO: This is broken because our user isn't returned by the token anymore.
function getUser(): any {
  const tokenDecoded = getAccessTokenDecoded();

  //throw new Error("auth.ts .getUser() should retrieve from the store.")

  return null;
}

// Gets the organization role from the jwt access token.
function getOrganizationRole() {
  try {
    const tokenDecoded = getAccessTokenDecoded();

    return tokenDecoded.cfor.toLowerCase();
  } catch (err) {
    return "";
  }
}

/**
 * Gets the user role from the jwt access token.
 */
function getUserRole() {
  try {
    const tokenDecoded: any = getAccessTokenDecoded();

    return tokenDecoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"].toLowerCase();
  } catch (err) {
    return "";
  }
}

// Check whether the user has credentials stored
//  Note: the credentials may be invalid
//  TODO: This should be checked
export function isLoggedIn(): boolean {
  const token = getAccessToken();
  if (token == null) {
    return false;
  }

  const parsed = getAccessTokenDecoded();
  const time = Math.round(new Date().getTime() / 1000);
  return parsed.exp > time;
}

function removeUserInformation() {
  localStorage.removeItem(accessToken);
  localStorage.removeItem(userKey);
}

// Login based on email & password. Store credentials on success.
export function login(email: string, password: string): Promise<void> {
  return apiLogin(email, password).then(response => {
    localStorage.setItem(accessToken, response.token);
  });
}

// End the user session
export function logout(): void {
  removeUserInformation();
}

// ****************************************************************************
//  Private
// ****************************************************************************

// Store the authentication or refresh response
function handleAuthResponse(response: any) {
  localStorage.setItem(accessToken, response.data.token);

  // TODO: We don't get a principal or email back anymore.
  // localStorage.setItem(userKey, JSON.stringify(response.data.principal))
  //sessionStorage.setItem(lastUser, response.data.principal.email)
}

// Get the last login user from session storage
function getLastUserEmailFromStorage() {
  return sessionStorage.getItem(lastUser) || false;
}

// Renew the authentication credentials
export function refreshLogin(): void {
  if (isLoggedIn()) {
    refresh()
      .then(handleAuthResponse)
      .catch(() => {
        // Redirect to Login?
        // console.error(error)
      });
  }
}

// Return authorization header with jwt token
export function authHeader(): object {
  return isLoggedIn() ? { Authorization: "Bearer " + getAccessToken() } : {};
}

export function getUserEmail(): string {
  const user = getUser();
  return user ? user.email : "";
}

export function getUserId(): string {
  const user = getUser();
  return user ? user.id : "";
}

export function getLastUserEmail(): string {
  const email = getLastUserEmailFromStorage();
  return email ? email : "";
}

// ****************************************************************************
//  User Roles & Capabilities
// ****************************************************************************

export function isAdmin(): boolean {
  return getUserRole() === UserRole.Administrator;
}
export function isSuperUser(): boolean {
  return getOrganizationRole() === UserRole.SuperUser;
}
export function isVerifier(): boolean {
  return getOrganizationRole() === UserRole.Verifier;
}
export function isWriter(): boolean {
  return getOrganizationRole() === UserRole.Writer;
}
export function isReader(): boolean {
  return getOrganizationRole() === UserRole.Reader;
}
export function canManageUsers(): boolean {
  return isSuperUser();
}
export function canApprove(): boolean {
  return isVerifier() || isSuperUser();
}
export function canWrite(): boolean {
  return canApprove() || isWriter();
}

/**
 * Checks if a user can write. Being a superuser implies that you can.
 */
export function canUserWrite(): boolean {
  return getOrganizationRole() === UserRole.SuperUser;
}

export function canRead(): boolean {
  // Everyone can read
  return true;
}
