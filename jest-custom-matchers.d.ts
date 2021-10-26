import { TestRequest } from '@angular/common/http/testing';

declare namespace jest {
  interface Matchers<R> {
    toContainHeaders(actual: TestRequest, expected: Record<string, string | string[]>): R;
    notContainHeaders(actual: TestRequest, expected: string[]): R;
  }
}

// declare global {
//   namespace jest {
//     interface Matchers<R> {
//       toContainHeaders(actual: TestRequest, expected: Record<string, string | string[]>): R;
//       notContainHeaders(actual: TestRequest, expected: string[]): R;
//     }
//   }
// }
