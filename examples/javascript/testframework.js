class Test {
  static throwAssertError(s, r, e) {
    e && console.error(e),
      console.error(`TEST FAILED: ${r} was expected but ${s} was given.`),
      process.exit(1);
  }
  static assertEquals(s, r, e) {
    s === r ? console.log("Passed") : Test.throwAssertError(s, r, e);
  }
  static assertSimilar(s, r) {
    Array.isArray(s)
      ? s.length == r.length && s.every((s, e) => s == r[e])
        ? console.log("Passed")
        : Test.throwAssertError(s, r)
      : s == r
      ? console.log("Passed")
      : Test.throwAssertError(s, r);
  }
  static expect(s, r) {
    s ? console.log("Passed") : Test.throwAssertError(s, !0, r);
  }
  static assertDeepEquals(s, r, e) {
    JSON.stringify(s) === JSON.stringify(r)
      ? console.log("Passed")
      : Test.throwAssertError(s, r, e);
  }
}
