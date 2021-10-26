declare namespace jest {
  interface Matchers<R> {
    toContainHeaders(expected: unknown): R;
    notContainHeaders(expected: string[]): R;
  }
}
