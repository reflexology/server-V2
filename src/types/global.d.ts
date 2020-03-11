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
