export {};

declare global {
  interface SetConstructor {
    range(a: number, b: number): Set<number>;
  }

  interface Set<T> {
    filter(predicate: (el: T) => boolean): Set<T>;
    symDiff(other: Set<T>): Set<T>;
    union(other: Set<T>): Set<T>;
  }
}

Set.range = function (start: number, end: number) {
  const newSet = new Set<number>();
  const [s, e] = [Math.min(start, end), Math.max(start, end)];
  for (let i = s; i <= e; i++) {
    newSet.add(i);
  }
  return newSet;
};

Set.prototype.filter = function <T>(predicate: (el: T) => boolean) {
  const newSet = new Set<T>();
  for (const el of this) {
    if (predicate(el)) {
      newSet.add(el);
    }
  }
  return newSet;
};

Set.prototype.symDiff = function <T>(other: Set<T>) {
  const newSet = new Set<T>();
  for (const el of this) {
    if (!other.has(el)) {
      newSet.add(el);
    }
  }

  for (const el of other) {
    if (!this.has(el)) {
      newSet.add(el);
    }
  }

  return newSet;
};

Set.prototype.union = function <T>(other: Set<T>) {
  const newSet = new Set<T>();
  this.forEach(el => newSet.add(el));
  other.forEach(el => newSet.add(el));
  return newSet;
}
