import { TestRequest } from '@angular/common/http/testing';

/**
 * Custom matchers for Jest
 *
 * @see https://jestjs.io/docs/expect#expectextendmatchers
 */
export const CUSTOM_MATCHERS: jest.ExpectExtendMap = {
  /**
   * Custom matcher that checks a request that:
   * - contains all defined headers
   * - all defined headers have given value
   *
   * Expected type is a map of string to string value, for example:
   * {
   *     'Authorization': 'Bearer access_token from spec',
   *     'WEB-API-Key': 'test-web-api-key',
   *     'Pragma': 'no-cache',
   *     'Accept-Language': 'cs'
   * }
   */
  toContainHeaders: (actual: TestRequest, expected: Record<string, string | string[]>) => {
    let message = '';

    const result = Object.keys(expected).every(requiredHeader => {
      const headerPresent = actual.request.headers
        .keys()
        .some(header => requiredHeader === header);

      const actualHeaderValue = actual.request.headers.get(requiredHeader);
      const expectedHeaderValue = expected[requiredHeader];

      if (!headerPresent) {
        message = `Missing headers in request: ${Object.keys(expected).filter(h => !actual.request.headers.keys().includes(h)
        )}`;
      } else if (actualHeaderValue !== expectedHeaderValue) {
        const expectedHeader = JSON.stringify(expectedHeaderValue);
        const actualHeader = JSON.stringify(actualHeaderValue);
        message = `Header '${requiredHeader}' should have value: ${expectedHeader}, actual value: ${actualHeader}`;
      }

      return headerPresent && actualHeaderValue === expectedHeaderValue;
    });

    return {
      pass: result,
      message: () => message,
    };
  },

  /**
   * Custom matcher that checks a request that:
   * - does NOT contain all defined headers
   *
   * Expected type is an array of header names: ['spinner']
   */
  notContainHeaders: (actual: TestRequest, expected: string[]) => {
    const result = expected.every(bannedHeader => {
      return !actual.request.headers
        .keys()
        .some(header => bannedHeader === header);
    });

    return {
      pass: result,
      message: result
        ? () => 'PASS'
        : () =>
          `Should not contain HTTP header(s): ${expected.filter(h =>
            actual.request.headers.keys().includes(h)
          )}`,
    };
  },
};

/**
 * Extend built-in Jest matchers with our custom ones
 */
expect.extend(CUSTOM_MATCHERS);
