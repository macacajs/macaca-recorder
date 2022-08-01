export function uniq<T>(arr: T[]): T[] {
  return arr.reduce((ret, cur) => {
    if (!ret.includes(cur)) {
      ret.push(cur);
    }
    return ret;
  }, [] as T[]);
}

export default {
  uniq,
};
