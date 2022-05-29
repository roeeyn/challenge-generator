/**
 * Test Framework to reuse the test functions provided by the API.
 */
class Test {
  /**
   * Throws an error with the given message and the given values.
   *
   * @static
   * @param {any} resultValue - The result value from execution.
   * @param {any} expectedValue - The expected value after the execution.
   * @param {string} errorMessage - (optional) The error message.
   * @throws {Error} - The error thrown.
   * @returns {void} returns nothing.
   */
  static throwAssertError(resultValue, expectedValue, errorMessage) {
    errorMessage && console.error(errorMessage);
    console.error(
      `TEST FAILED: ${expectedValue} was expected but ${resultValue} was given.`
    );
    process.exit(1);
  }

  /**
   * Assert with strict equality.
   *
   * @static
   * @param {any} resultValue - The result value from execution.
   * @param {any} expectedValue - The expected value after the execution.
   * @param {string} errorMessage - (optional) The error message.
   * @returns {void} returns nothing.
   */
  static assertEquals(resultValue, expectedValue, errorMessage) {
    resultValue === expectedValue
      ? console.log("Passed")
      : Test.throwAssertError(resultValue, expectedValue, errorMessage);
  }

  /**
   * Assert with no strict equality, and check the results if it's an  array.
   *
   * @static
   * @param {any} resultValue - The result value from execution.
   * @param {any} expectedValue - The expected value after the execution.
   * @returns {void} returns nothing.
   */
  static assertSimilar(resultValue, expectedValue) {
    if (Array.isArray(resultValue)) {
      resultValue.length == expectedValue.length &&
      resultValue.every((value, index) => value == expectedValue[index])
        ? console.log("Passed")
        : Test.throwAssertError(resultValue, expectedValue);
    } else {
      resultValue == expectedValue
        ? console.log("Passed")
        : Test.throwAssertError(resultValue, expectedValue);
    }
  }

  /**
   * Assert if truthy result.
   *
   * @static
   * @param {any} resultValue - The result value from execution.
   * @param {string} errorMessage - (optional) The error message.
   * @returns {void} returns nothing.
   */
  static expect(resultValue, errorMessage) {
    resultValue
      ? console.log("Passed")
      : Test.throwAssertError(resultValue, true, errorMessage);
  }

  /**
   * Assert if deep equal based on JSON.stringify.
   *
   * @static
   * @param {any} resultValue - The result value from execution.
   * @param {any} expectedValue - The expected value after the execution.
   * @param {string} errorMessage - (optional) The error message.
   * @returns {void} returns nothing.
   */
  static assertDeepEquals(resultValue, expectedValue, errorMessage) {
    JSON.stringify(resultValue) === JSON.stringify(expectedValue)
      ? console.log("Passed")
      : Test.throwAssertError(resultValue, expectedValue, errorMessage);
  }
}
