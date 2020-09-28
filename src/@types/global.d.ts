interface String {
  format: (...values: string[]) => string;
}

type IdParam = {
  id: string;
};

type ResErr = {
  msg: string;
};

interface Tokens {
  accessToken: string;
  refreshToken: string;
}

type ThenArg<T> = T extends PromiseLike<infer U> ? U : T;
