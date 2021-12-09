export function groupBy<T>(arr: Array<T>, fn: (obj: T) => any): { [key: string | number]: Array<T> } {
  const res: { [key: string | number]: Array<T> } = {};
  arr.forEach(f => {
    const val = fn(f);
    res[val] = res[val] != null ? [...res[val], f] : [f];
  });
  return res;
}