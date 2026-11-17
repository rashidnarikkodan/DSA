# Recursion in JavaScript

A comprehensive learning guide to Recursion, Call Stack execution frames, Recurrence Relations, Recursion Trees, Tail Call Optimization, Backtracking, and the transition to Dynamic Programming.

---

## Table of Contents
1. [Introduction](#introduction)
2. [How Recursion Works](#how-recursion-works)
   - [The Two Sacred Rules of Recursion](#the-two-sacred-rules-of-recursion)
   - [The Call Stack & Stack Frames](#the-call-stack--stack-frames)
   - [Stack Overflow (`RangeError`)](#stack-overflow-rangeerror)
3. [Classifications of Recursion](#classifications-of-recursion)
   - [1. Linear Recursion](#1-linear-recursion)
   - [2. Binary / Tree Recursion](#2-binary--tree-recursion)
   - [3. Tail Recursion & Tail Call Optimization (TCO)](#3-tail-recursion--tail-call-optimization-tco)
   - [4. Backtracking (Subsets & Combinations)](#4-backtracking-subsets--combinations)
4. [Time and Space Complexity Analysis](#time-and-space-complexity-analysis)
   - [Recurrence Relations](#recurrence-relations)
   - [Recursion Trees](#recursion-trees)
   - [Space Complexity = Max Call Stack Depth](#space-complexity--max-call-stack-depth)
5. [Folder Implementation Guide](#folder-implementation-guide)
   - [fibonacci.js](#fibonaccijs)
   - [isPalindrom.js](#ispalindromjs)
6. [The Bridge: Recursion to Dynamic Programming](#the-bridge-recursion-to-dynamic-programming)
   - [Naive Exponential Recursion ($O(2^n)$)](#naive-exponential-recursion-o2n)
   - [Top-Down Memoization ($O(n)$)](#top-down-memoization-on)
   - [Bottom-Up Tabulation ($O(n)$ Time, $O(1)$ Space)](#bottom-up-tabulation-on-time-o1-space)
7. [Visualizations](#visualizations)
8. [Common Interview Questions & Edge Cases](#common-interview-questions--edge-cases)
9. [Practice Problems (Beginner to Advanced)](#practice-problems-beginner-to-advanced)
10. [Related Topics](#related-topics)

---

## Introduction

**Recursion** is a programming technique where a function solves a problem by calling copies of itself with smaller or simpler inputs.

A recursive solution breaks a complex problem down into:
1. One or more **subproblems** that are identical in structure to the original problem.
2. A known trivial state (the **Base Case**) that can be answered immediately without further function calls.

Recursion is the foundational mental model for:
- Tree and Graph traversals (DFS, In-Order, Pre-Order, Post-Order).
- Divide-and-Conquer algorithms (Merge Sort, Quick Sort, Binary Search).
- Combinatorial search and Backtracking (Subsets, Permutations, Sudoku Solver, N-Queens).
- Dynamic Programming (memoizing recursive subproblems).

---

## How Recursion Works

### The Two Sacred Rules of Recursion
Every valid recursive function must possess:
1. **The Base Case:** A stopping condition that returns a concrete result without making another recursive call. Without a base case, recursion runs infinitely until memory is exhausted.
2. **The Recursive Step (Convergence):** The function calls itself with modified arguments that move **strictly closer toward the base case**.

```javascript
function countdown(n) {
  if (n <= 0) {            // 1. Base Case
    console.log("Blastoff!");
    return;
  }
  console.log(n);
  countdown(n - 1);        // 2. Recursive Step (n decreases toward 0)
}
```

### The Call Stack & Stack Frames
Whenever a function is invoked, the JavaScript engine allocates a **Stack Frame** on the runtime **Call Stack**. The frame stores:
- Function parameters and local variables.
- The return address (where execution should resume once the called function returns).

When `countdown(3)` executes:
1. `countdown(3)` is pushed -> logs `3` -> calls `countdown(2)`
2. `countdown(2)` is pushed -> logs `2` -> calls `countdown(1)`
3. `countdown(1)` is pushed -> logs `1` -> calls `countdown(0)`
4. `countdown(0)` reaches base case -> logs `"Blastoff!"` -> returns
5. Stack unwinds: `countdown(1)`, `countdown(2)`, `countdown(3)` pop in reverse order!

### Stack Overflow (`RangeError`)
If recursion never hits a base case (or recurses too deeply), stack frames consume all allocated memory on the Call Stack:
```
RangeError: Maximum call stack size exceeded
```
In Node.js and modern V8, the call stack limit is typically between $10,000$ and $15,000$ nested calls.

---

## Classifications of Recursion

### 1. Linear Recursion
The function makes at most **one** recursive call per execution.
```javascript
// Factorial: n! = n * (n - 1)!
function factorial(n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}
```

### 2. Binary / Tree Recursion
The function makes **two or more** recursive calls, forming a branching tree of calls.
```javascript
// Fibonacci: F(n) = F(n-1) + F(n-2)
function fib(n) {
  if (n <= 1) return n;
  return fib(n - 1) + fib(n - 2);
}
```

### 3. Tail Recursion & Tail Call Optimization (TCO)
A recursive function is **tail-recursive** if the recursive call is the **very last operation** performed in the function (the return value of the recursive call is returned directly without any pending operations like `+` or `*`).

```javascript
// NOT Tail-Recursive (must multiply by n AFTER factorial(n-1) returns):
function factorial(n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}

// TAIL-RECURSIVE (accumulator passes result forward):
function factorialTail(n, accumulator = 1) {
  if (n <= 1) return accumulator;
  return factorialTail(n - 1, n * accumulator);
}
```
*Note:* While ES6 introduced syntactic specification for Tail Call Optimization (TCO), most engines (including V8/Node.js) do not optimize it in standard modes for debugging/stack-trace reasons.

### 4. Backtracking (Subsets & Combinations)
Backtracking is an algorithmic paradigm that tests candidate solutions incrementally and abandons (backtracks) candidates as soon as they fail constraints.

```javascript
// Generate all subsets (Power Set) of an array
function generateSubsets(nums) {
  const result = [];

  function backtrack(index, current) {
    if (index === nums.length) {
      result.push([...current]);
      return;
    }

    // Choice 1: Include nums[index]
    current.push(nums[index]);
    backtrack(index + 1, current);

    // Backtrack: Undo choice
    current.pop();

    // Choice 2: Exclude nums[index]
    backtrack(index + 1, current);
  }

  backtrack(0, []);
  return result;
}

console.log(generateSubsets([1, 2])); // [[1, 2], [1], [2], []]
```

---

## Time and Space Complexity Analysis

### Recurrence Relations
- Factorial: $T(n) = T(n - 1) + O(1) \implies O(n)$
- Binary Search: $T(n) = T(n/2) + O(1) \implies O(\log n)$
- Merge Sort: $T(n) = 2T(n/2) + O(n) \implies O(n \log n)$
- Naive Fibonacci: $T(n) = T(n - 1) + T(n - 2) + O(1) \implies O(2^n)$

### Recursion Trees
A Recursion Tree visualizes function calls as tree nodes:
- Total work done = Sum of work across all levels of the tree.
- For naive Fibonacci, the tree doubles at every level down to depth $n$, producing $2^n$ nodes.

### Space Complexity = Max Call Stack Depth
Even if a recursive algorithm performs $O(2^n)$ total calls, its **auxiliary space complexity is determined strictly by the maximum height of the Call Stack** at any single moment in time!
For naive `fib(n)`, the call stack never exceeds depth $n$, so auxiliary space is $O(n)$.

---

## Folder Implementation Guide

### [fibonacci.js](./fibonacci.js)
Contains several practical recursive drills:
1. **`countVowels(str)`:** String iteration and character code modifications.
2. **`removeDup(str)`:** Recursive adjacent duplicate character removal:
   ```javascript
   function removeDup(str) {
     if (str.length === 0) return str;
     if (str[0] === str[1]) return removeDup(str.slice(1));
     return str[0] + removeDup(str.slice(1));
   }
   ```
3. **`sub(str, i, current)`:** Generates all subsequences of a string using the Include / Exclude branching pattern.
4. **`countSubSet(ar, i)`:** Recursively computes $2^n$ subset count.

### [isPalindrom.js](./isPalindrom.js)
- Explores recursive palindrome checking: compares the first and last characters (`str[0] === str[str.length - 1]`) and recurses on `str.slice(1, -1)`.

---

## The Bridge: Recursion to Dynamic Programming

### Naive Exponential Recursion ($O(2^n)$)
In naive recursion, identical subproblems are solved repeatedly thousands of times:
```
                        fib(5)
                     /          \
              fib(4)              fib(3)
             /      \            /      \
         fib(3)    fib(2)     fib(2)   fib(1)
         /    \
      fib(2) fib(1)
```
Notice `fib(3)` and `fib(2)` are recomputed multiple times!

### Top-Down Memoization ($O(n)$ Time, $O(n)$ Space)
Stores results of subproblems in a cache (`Map` or array) so each unique subproblem is calculated only once.

```javascript
function fibMemo(n, memo = {}) {
  if (n <= 1) return n;
  if (n in memo) return memo[n];

  memo[n] = fibMemo(n - 1, memo) + fibMemo(n - 2, memo);
  return memo[n];
}

console.log(fibMemo(50)); // 12586269025 (Calculated in milliseconds!)
```

### Bottom-Up Tabulation ($O(n)$ Time, $O(1)$ Space)
Eliminates recursion entirely by building the answer iteratively from base cases:

```javascript
function fibTabulation(n) {
  if (n <= 1) return n;
  let prev2 = 0;
  let prev1 = 1;

  for (let i = 2; i <= n; i++) {
    let current = prev1 + prev2;
    prev2 = prev1;
    prev1 = current;
  }

  return prev1;
}
```

---

## Visualizations

### Call Stack Unwinding (Factorial of 3)
```
Call Stack:
| factorial(1) | -> returns 1
| factorial(2) | -> 2 * 1 = 2
| factorial(3) | -> 3 * 2 = 6
+--------------+
Result = 6
```

### Binary Decision Tree (Subsets of `"ab"`)
```
                     "" (Index 0)
                   /              \
             Include 'a'        Exclude 'a'
               "a"                  ""
              /   \                /   \
       Inc 'b'   Exc 'b'    Inc 'b'   Exc 'b'
        "ab"       "a"        "b"       ""
```

---

## Common Interview Questions & Edge Cases

### Top Questions
1. **Subsets / Power Set:** Backtracking include/exclude pattern (LeetCode #78).
2. **Permutations:** Backtracking with visited array (LeetCode #46).
3. **Combination Sum:** Reuse numbers with target reduction (LeetCode #39).
4. **Generate Parentheses:** Backtracking with open/close bracket count constraints (LeetCode #22).
5. **Word Search:** 2D matrix DFS backtracking (LeetCode #79).

### Edge Cases Checklist
- **Missing Base Case:** Causes immediate Call Stack Overflow.
- **Off-By-One Base Case:** Check whether recursion should stop at `n === 0`, `n === 1`, or `index === arr.length`.
- **Slicing Strings/Arrays in Recursion:** `arr.slice(1)` creates a new array of size $k$ on every step ($O(n^2)$ total work). Prefer passing pointer indices (`index + 1`) to preserve $O(1)$ state.
- **Reference Mutation in Backtracking:** In JS, arrays are passed by reference. When pushing to results, always push a copy (`result.push([...current])`), otherwise subsequent `pop()` operations will mutate stored results.

---

## Practice Problems (Beginner to Advanced)

### Level 1: Beginner
- [ ] Calculate the factorial of a number using recursion.
- [ ] Compute the $n$-th Fibonacci number recursively.
- [ ] Calculate the sum of an array using recursion.
- [ ] Reverse a string recursively.
- [ ] Check if a string is a palindrome recursively.

### Level 2: Intermediate
- [ ] **Binary Search (Recursive):** Divide and conquer array search.
- [ ] **Power Function ($x^n$):** Binary exponentiation in $O(\log n)$.
- [ ] **Subsets (Power Set):** Generate all $2^n$ subsets.
- [ ] **Permutations:** Generate all $n!$ orderings.
- [ ] **Combinations:** Choose $k$ elements out of $n$.

### Level 3: Advanced
- [ ] **N-Queens:** Place $N$ queens on an $N \times N$ chessboard safely.
- [ ] **Sudoku Solver:** Backtracking 9x9 board constraint validation.
- [ ] **Word Break:** Top-down memoization string segmentation.
- [ ] **Palindrome Partitioning:** All palindromic substring cuts.

---

## Related Topics

- [Stack Documentation](../Stack/README.md) - Anatomy of the Call Stack and LIFO execution frames.
- [Search Documentation](../Search/README.md) - Recursive Binary Search.
- [Sorting Documentation](../Sort/README.md) - Divide-and-Conquer Merge Sort and Quick Sort.
- [Tree Documentation](../Tree/README.md) - Recursive tree traversals (DFS).

