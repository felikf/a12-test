import { TestRequest } from '@angular/common/http/testing';

declare namespace jest {
  interface Matchers<R> {
    toContainHeaders(expected: Record<string, string | string[]>): R;
    notContainHeaders(expected: string[]): R;
  }
}

// declare global {
//   namespace jest {
//     interface Matchers<R> {
//       toContainHeaders(expected: Record<string, string | string[]>): R;
//       notContainHeaders(expected: string[]): R;
//     }
//   }
// }
