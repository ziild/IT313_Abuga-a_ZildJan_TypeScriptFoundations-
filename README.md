
# IT313 Enrollment Eligibility Checker #

## Problem overview 
This program processes raw enrollee grade records for the IT313 registrar into a formatted eligibility report using ES6+ Javascript features in Node.js

## ES6+ features applied
ES Modules: Exporting/importing utilities in `gradeUtils.js` and `index.js`.
Promises & Async/Await: Simulating asynchronous API data retrieval  with `try/catch` error handling.
Destructuring: Direct property extraction (`name`, `prelim`, `midterm`, `final`).
Array methods:
- `.map()` to build processed enrollee objects.
- `.filter()` to isolate passing objects.
- `.reduce()` to compute total class score. 

Template literals: Clean output formatting.

## How to run
Node.js should be installed, then run in the terminal:
```bash 
node index.js