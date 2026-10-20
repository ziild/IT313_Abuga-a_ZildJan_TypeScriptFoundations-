# IT313 TypeScript Foundations

**Name:** Zild Jan F. Abuga-a
**Section:** IT3R2

## Description
An enrollment eligibility checker that calculates student averages and determines whether they are Passing (75 and above) or on Probation (below 75).

## TypeScript Concepts
- Interfaces, type aliases, and enums
- Typed functions and optional properties
- Promises, async/await, and try/catch
- Union types and type narrowing
- Generics and array methods (`map` and `reduce`)
- ES module imports and exports
- Strict type checking

## Files
- `index.ts` - Main program
- `gradeUtils.ts` - Grade calculations and status checking
- `tsconfig.json` - TypeScript configuration

## How to Run

Run the program:

```bash
npx tsx index.ts
```

Check for type errors:

```bash
npx tsc --noEmit
```

## Expected Result
The program displays student averages, enrollment statuses, the class average (76.07), and the passing count (3 out of 5).