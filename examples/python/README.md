# Parity Bit Validation

Parity bits are used as very simple checksum to ensure that binary data isn't corrupted during transit. Here's how they work:

- If a binary string has an **odd** number of **1s**, the parity bit is a **1**.
- If a binary string has an **even** number of **1s**, the parity bit is a **0**.
- The parity bit is appended to the **end** of the binary string.

Create a function that validates whether a binary string is valid, using parity bits.

### Worked Example

```
validate_binary("10110010") ➞ True

# The last digit is the parity bit.
# 0 is the last digit.
# 0 means that there should be an even number of 1s.
# There are four 1s.
# Return True.
```

### Examples

```
validate_binary("00101101") ➞ True

validate_binary("11000000") ➞ True

validate_binary("11000001") ➞ False
```

### Notes

- All inputs will be a byte long (8 characters).
- You can find another parity bit involved challenge [here](https://edabit.com/challenge/nJwANk5YKK4SbbTHd "Adding Parity Bits")!
