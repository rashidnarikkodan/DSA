# Stacks in JavaScript

A complete guide to the Stack data structure, the LIFO principle, JavaScript Call Stack execution, array vs. linked list implementations, Monotonic Stacks, and interview problem-solving.

---

## Table of Contents
1. [Introduction](#introduction)
2. [Core Concepts](#core-concepts)
   - [The LIFO Principle](#the-lifo-principle)
   - [Stack Overflow and Underflow](#stack-overflow-and-underflow)
   - [The JavaScript Call Stack](#the-javascript-call-stack)
3. [Time and Space Complexities](#time-and-space-complexities)
4. [Folder Implementation Guide](#folder-implementation-guide)
   - [1. Array-Based Stack](#1-array-based-stack)
   - [2. Linked List-Based Stack](#2-linked-list-based-stack)
   - [3. String Reversal with Stack](#3-string-reversal-with-stack)
   - [4. Min/Max Stack with $O(1)$ Lookup](#4-minmax-stack-with-o1-lookup)
   - [5. Stack Implemented Using a Queue](#5-stack-implemented-using-a-queue)
5. [Essential Algorithmic Patterns](#essential-algorithmic-patterns)
   - [Pattern 1: Balanced Parentheses Validation](#pattern-1-balanced-parentheses-validation)
   - [Pattern 2: Monotonic Stack (Next Greater Element)](#pattern-2-monotonic-stack-next-greater-element)
   - [Pattern 3: Postfix Expression Evaluation](#pattern-3-postfix-expression-evaluation)
6. [Visualizations](#visualizations)
7. [Common Interview Questions & Edge Cases](#common-interview-questions--edge-cases)
8. [Practice Problems (Beginner to Advanced)](#practice-problems-beginner-to-advanced)
9. [Related Topics](#related-topics)

---

## Introduction

A **Stack** is a linear data structure that adheres strictly to the **LIFO (Last In, First Out)** principle. The last element added to the stack is the first element to be removed.

Think of a stack of plates in a cafeteria:
- You add a clean plate onto the **top** (Push).
- You take the plate from the **top** (Pop).
- You inspect the uppermost plate without removing it (Peek).

### Why Stacks Are Essential
- **Execution Context Management:** JavaScript's single-threaded runtime tracks function calls using an internal Call Stack.
- **Undo / Redo Mechanisms:** Text editors, graphics tools, and web browser navigation histories (`window.history.back()`).
- **Syntax Parsing & Compilers:** Balancing parentheses, validating HTML/XML tags, evaluating algebraic expressions.
- **Backtracking Algorithms:** Graph Depth-First Search (DFS), maze solving, and recursion simulation.

---

## Core Concepts

### The LIFO Principle
The access point is restricted to a single position: the **Top**. Elements cannot be inserted or extracted from the middle or bottom without first popping all elements above them.

```
       +---------+
PUSH   | Element |  ===> [ Top of Stack ]
       +---------+              |
                                v
POP    <=== [ Top of Stack ] is removed first!
```

### Stack Overflow and Underflow
- **Stack Underflow:** Attempting to `pop()` or `peek()` from an empty stack. Safe implementations must check `isEmpty()` to avoid runtime errors or returning unexpected undefined states.
- **Stack Overflow:** Occurs when allocated memory for the stack is exhausted. In fixed-capacity stacks or unbounded recursive function calls in JavaScript, this manifests as `RangeError: Maximum call stack size exceeded`.

### The JavaScript Call Stack
Every function call creates an **Execution Context** pushed onto the JS Call Stack. When the function returns, its frame is popped.
```javascript
function a() { b(); }
function b() { c(); }
function c() { console.trace(); }
a();
// Call Stack State inside c():
// [ c ]  <- Top
// [ b ]
// [ a ]
// [ (global) ]
```

---

## Time and Space Complexities

| Operation | Array-Based Stack | Linked List Stack | Space Complexity | Description |
| :--- | :---: | :---: | :---: | :--- |
| **`push(val)`** | $O(1)$ amortized | $O(1)$ | $O(1)$ | Add item to top |
| **`pop()`** | $O(1)$ | $O(1)$ | $O(1)$ | Remove and return top item |
| **`peek()` / `top()`** | $O(1)$ | $O(1)$ | $O(1)$ | Read top item without removing |
| **`isEmpty()`** | $O(1)$ | $O(1)$ | $O(1)$ | Check if size === 0 |
| **`size()`** | $O(1)$ | $O(1)$ | $O(1)$ | Current number of elements |

---

## Folder Implementation Guide

### 1. Array-Based Stack
Defined in **[1-stack.js](./1-stack.js)**:
- Utilizes JavaScript's native array `push()` and `pop()`.
- Constant time $O(1)$ operations because elements are appended/removed from the end without shifting.

```javascript
class Stack {
  constructor() {
    this.stack = [];
  }
  push(elem) { this.stack.push(elem); }
  pop() {
    if (this.isEmpty()) return 'Empty stack';
    return this.stack.pop();
  }
  peek() {
    if (this.isEmpty()) return 'Empty stack';
    return this.stack[this.size() - 1];
  }
  isEmpty() { return this.size() === 0; }
  size() { return this.stack.length; }
}
```

### 2. Linked List-Based Stack
Defined in **[2-stackLinkedList.js](./2-stackLinkedList.js)**:
- Replaces the dynamic array with singly linked nodes.
- Guaranteed strict $O(1)$ push and pop without relying on array capacity reallocation.
- Pointers update directly at the `top` (analogous to `prepend` in a linked list).

### 3. String Reversal with Stack
Defined in **[3-reverseString.js](./3-reverseString.js)**:
- Pushes every character of a string onto the stack.
- Pops them sequentially; by LIFO order, the string emerges reversed.

### 4. Min/Max Stack with $O(1)$ Lookup
Defined in **[4-stack_O(n).js](./4-stack_O(n).js)**:
- Maintains an auxiliary tracking array (`this.max`) that stores the maximum value encountered up to the current depth.
- Enables `getMax()` in guaranteed $O(1)$ time.

```javascript
class MaxStack {
  constructor() {
    this.stack = [];
    this.maxStack = [];
  }

  push(val) {
    this.stack.push(val);
    const currentMax = this.maxStack.length === 0 
      ? val 
      : Math.max(val, this.maxStack[this.maxStack.length - 1]);
    this.maxStack.push(currentMax);
  }

  pop() {
    this.maxStack.pop();
    return this.stack.pop();
  }

  getMax() {
    return this.maxStack[this.maxStack.length - 1];
  }
}
```

### 5. Stack Implemented Using a Queue
Defined in **[stack_using_queue.js](./stack_using_queue.js)**:
- Illustrates how to emulate LIFO behavior using FIFO primitives by rotating queue elements on push.

---

## Essential Algorithmic Patterns

### Pattern 1: Balanced Parentheses Validation

A classic interview problem checking whether braces `()`, `{}`, `[]` are properly opened and closed.

```javascript
function isValidParentheses(s) {
  const stack = [];
  const map = {
    ')': '(',
    '}': '{',
    ']': '['
  };

  for (let char of s) {
    if (char === '(' || char === '{' || char === '[') {
      stack.push(char);
    } else if (map[char]) {
      if (stack.length === 0 || stack.pop() !== map[char]) {
        return false;
      }
    }
  }

  return stack.length === 0;
}

console.log(isValidParentheses("({[]})")); // true
console.log(isValidParentheses("([)]"));   // false
```

---

### Pattern 2: Monotonic Stack (Next Greater Element)

A **Monotonic Stack** maintains its elements in strictly ascending or descending order. It solves range-query and next-greater-element problems in linear $O(n)$ time.

```javascript
// Find the next greater element for each item in the array
function nextGreaterElement(nums) {
  const result = new Array(nums.length).fill(-1);
  const stack = []; // Stores indices

  for (let i = 0; i < nums.length; i++) {
    // While current number is greater than number at top index
    while (stack.length > 0 && nums[i] > nums[stack[stack.length - 1]]) {
      const topIndex = stack.pop();
      result[topIndex] = nums[i];
    }
    stack.push(i);
  }

  return result;
}

console.log(nextGreaterElement([4, 5, 2, 25])); // [5, 25, 25, -1]
```

---

### Pattern 3: Postfix Expression Evaluation

Evaluates Reverse Polish Notation (RPN) expressions where operators follow operands.

```javascript
function evalRPN(tokens) {
  const stack = [];

  for (let token of tokens) {
    if (token === "+" || token === "-" || token === "*" || token === "/") {
      const b = stack.pop();
      const a = stack.pop();
      if (token === "+") stack.push(a + b);
      if (token === "-") stack.push(a - b);
      if (token === "*") stack.push(a * b);
      if (token === "/") stack.push(Math.trunc(a / b));
    } else {
      stack.push(Number(token));
    }
  }

  return stack.pop();
}

console.log(evalRPN(["2", "1", "+", "3", "*"])); // ((2 + 1) * 3) = 9
```

---

## Visualizations

### Stack Operations: Push and Pop

```
       Push(30)               Push(40)                Pop()
     +---------+            +---------+            +---------+
     |         |            |   40    | <-- Top    |         |
     +---------+            +---------+            +---------+
     |   30    | <-- Top    |   30    |            |   30    | <-- Top
     +---------+            +---------+            +---------+
     |   20    |            |   20    |            |   20    |
     +---------+            +---------+            +---------+
     |   10    |            |   10    |            |   10    |
     +---------+            +---------+            +---------+
```

---

## Common Interview Questions & Edge Cases

### Top Questions
1. **Min Stack:** Design a stack that supports `push`, `pop`, `top`, and retrieving minimum element in $O(1)$ time.
2. **Valid Parentheses:** Validate nested string brackets.
3. **Daily Temperatures:** How many days until a warmer temperature (Monotonic Stack).
4. **Largest Rectangle in Histogram:** Classic hard problem solved via monotonic stack in $O(n)$ time.
5. **Implement Queue using Stacks:** Simulating FIFO queue using two LIFO stacks.

### Edge Cases Checklist
- **Popping an Empty Stack:** Always verify `stack.length > 0` before accessing or popping.
- **Unclosed Open Brackets:** String `"((("` leaves items on stack; verify `stack.length === 0` at termination.
- **Premature Closing Brackets:** String `")"` attempts to pop when stack is already empty.
- **Single Element Stacks:** Ensure peek and pop correctly handle transitions between $1$ and $0$ elements.

---

## Practice Problems (Beginner to Advanced)

### Level 1: Beginner
- [ ] Implement a Stack using JavaScript Arrays.
- [ ] Implement a Stack using a Singly Linked List.
- [ ] Reverse a string using a stack.
- [ ] Check for balanced brackets in an arithmetic expression.

### Level 2: Intermediate
- [ ] **Min Stack:** Implement `getMin()` in $O(1)$ time and $O(1)$ auxiliary space.
- [ ] **Evaluate Reverse Polish Notation (RPN):** Handle integers and four arithmetic operators.
- [ ] **Next Greater Element I & II:** Solve using Monotonic Stack.
- [ ] **Daily Temperatures:** Calculate days to wait for warmer weather.
- [ ] **Simplify Path:** Canonical Unix file path resolution (`/a/./b/../../c/`).

### Level 3: Advanced
- [ ] **Largest Rectangle in Histogram:** $O(n)$ monotonic stack approach.
- [ ] **Maximal Rectangle:** 2D binary matrix extension of histogram algorithm.
- [ ] **Trapping Rain Water:** Solve using monotonic stack.
- [ ] **Remove K Digits:** Build smallest possible number using monotonic stack greedy removal.

---

## Related Topics

- [Queue Documentation](../Queue/README.md) - FIFO counterpart and queue-stack dual implementations.
- [Recursion Documentation](../Recursion/README.md) - How the system Call Stack models recursion.
- [Linked List Documentation](../LinkedList/README.md) - Building pointer-based stacks.

