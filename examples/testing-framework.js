function test(title, callback) {
  try {
    callback();
  } catch (error) {
    console.log("Failed: " + title);
    console.error(error.message);
    process.exit(1);
  }
}

function expect(result) {
  return {
    toBe(expected) {
      if (result === expected) {
        console.log("Passed");
      } else {
        throw new Error(`expected ${expected} but result is ${result}`);
      }
    },
  };
}

module.exports = { test, expect };
