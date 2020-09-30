export {};

declare global {
  interface Set<T> {
    filter(predicate: (el: T) => boolean): Set<T>;

    // (self \ other) union (other \ self)
    symDiff(other: Set<T>): Set<T>;
  }
}

Set.prototype.filter = function<T> (predicate: (el: T) => boolean) {
  const newSet = new Set<T>();
  for (const el of this) {
    if (predicate(el)) {
      newSet.add(el);
    }
  }
  return newSet;
};

Set.prototype.symDiff = function<T> (other: Set<T>) {
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
}
