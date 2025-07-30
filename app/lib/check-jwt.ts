import {jwtDecode} from "jwt-decode";

export function isTokenExpired(token: string) {
  try {
    const { exp } = jwtDecode(token);
    // @ts-ignore
    return exp * 1000 > Date.now();
  } catch {
    return false;
  }
}