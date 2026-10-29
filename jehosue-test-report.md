# Jehosue's Test Report – HTML, CSS, Controls & Integration

**Project:** Calculator Group Practicum  
**Component:** UI, Controls, Keyboard Handling & Integration  
**Tester:** Jehosue  

## Test Results

| No. | Test Case | Input Sequence | Expected Result | Actual Result | Status |
|---|---|---|---|---|---|
| 1 | Sequential chained calculation | `12 + 7 - 5 * 3 =` | `42` (evaluated step-by-step from left to right) | Displays `19` after `-`, `14` after `*`, and `42` after `=` | Pass |
| 2 | Pair evaluation on operator | `25 + 5 *` | Evaluates `25 + 5` to `30` before accepting `*` | Screen displays `30 *` | Pass |
| 3 | Prevent multiple decimals | `5 . 2 . 5` | Only the first decimal point is accepted (`5.25`) | Second decimal ignored; display shows `5.25` | Pass |
| 4 | Decimal on empty input | `.` | Prefixes with leading zero (`0.`) | Display shows `0.` | Pass |
| 5 | Clear (AC) | `123 + 45` then `AC` | Resets stored operands, operator, and display | Display resets to `0`, state fully cleared | Pass |
| 6 | Backspace (DEL) single digit | `123` then `DEL` | Removes last character (`12`) | Display shows `12` | Pass |
| 7 | Backspace to zero | `7` then `DEL` | Resets current input to `0` | Display shows `0` | Pass |
| 8 | Division by zero | `10 ÷ 0 =` | Display error message without crashing | Displays `"Cannot divide by 0"` | Pass |
| 9 | Incomplete calculation | `12 + =` | Keep current number without error or NaN | Retains `12` safely | Pass |
| 10 | Operator overwrite | `12 + * 3 =` | Overwrites `+` with `*`, computing `12 * 3` | Displays `36` | Pass |
| 11 | Post-result chained calculation | `5 * 2 =` then `+ 4 =` | Evaluates `10 + 4 = 14` | Displays `14` | Pass |
| 12 | Keyboard consistency | Keys `1`, `2`, `+`, `7`, `Enter` | Matches clicking on UI buttons | Exactly identical behavior and triggers button visual press effect | Pass |

## Conclusion

All user controls, display functions, and keyboard listeners behave consistently. Edge cases such as chained calculations, division by zero, duplicate decimal points, and operator changes evaluate correctly according to specification.

