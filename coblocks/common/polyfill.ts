let called = false;

export const polyfill = () => {
  if (called) return;

  called = true;
  // @ts-expect-error add toJSON to BigInt
  BigInt.prototype.toJSON = function () {
    const int = Number.parseInt(this.toString());
    return int ?? this.toString();
  };
};

polyfill();
