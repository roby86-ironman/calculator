# Calculator Project

A browser-based calculator built with HTML, CSS, and vanilla JavaScript as part of our group practicum.

## Team Roles

- **Roberto:** Core arithmetic functions (`add`, `subtract`, `multiply`, `divide`) and `operate()`
- **Jehosue:** HTML/CSS layout, display updates, user controls, and keyboard event handling

## Features

- **Sequential Chaining:** Evaluates each pair of numbers as operators are entered (e.g. `12 + 7 - 5 * 3 = 42`).
- **Input Validation:** Prevents entering multiple decimal points in a single number.
- **Full Keyboard Support:** Use standard numeric keys, operators, Enter/Equal, Backspace, and Escape.
- **Error Handling:** Gracefully handles division by zero and resets on subsequent input.
- **Backspace & Clear:** Delete individual digits (`DEL`) or reset all state and stored values (`AC`).

## Keyboard Shortcuts

| Key | Calculator Action |
|---|---|
| `0` – `9` | Enter digit |
| `.` | Decimal point |
| `+`, `-`, `*`, `/` | Arithmetic operators (+, −, ×, ÷) |
| `Enter` or `=` | Calculate result (=) |
| `Backspace` | Delete last digit (DEL) |
| `Escape` or `c` / `C` | Clear all (AC) |

## Technologies

- HTML5
- CSS3 (Flexbox & CSS Grid)
- JavaScript (ES6)

