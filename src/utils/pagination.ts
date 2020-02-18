export function getStartIndexAndLimit(page: string, limit: string): [number, number] {
  if (!page || !limit) return [null, null];

  const pageInt = parseInt(page, 10);
  const limitInt = parseInt(limit, 10);
  const startIndex = (pageInt - 1) * limitInt;

  return [startIndex, limitInt];
}
