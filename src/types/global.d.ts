// session
declare namespace CookieSessionInterfaces {
  interface CookieSessionObject {
    hasBeenHere: boolean;
  }
}

interface String {
  format: (...values: string[]) => string;
}
