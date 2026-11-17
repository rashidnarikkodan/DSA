# Arrays in JavaScript

A comprehensive learning guide and reference for arrays, memory layouts, fundamental operations, algorithmic patterns, and interview problem-solving techniques.

---

## Table of Contents
1. [Introduction](#introduction)
2. [How Arrays Work in JavaScript](#how-arrays-work-in-javascript)
   - [Static vs. Dynamic Arrays](#static-vs-dynamic-arrays)
   - [V8 Engine Array Internals (Packed vs. Holey)](#v8-engine-array-internals-packed-vs-holey)
3. [Time and Space Complexities](#time-and-space-complexities)
4. [Core Operations & Implementations](#core-operations--implementations)
   - [Insertion, Deletion, and Access](#insertion-deletion-and-access)
   - [Common Built-in Array Methods](#common-built-in-array-methods)
5. [Essential Algorithmic Patterns](#essential-algorithmic-patterns)
   - [1. Two-Pointer Technique](#1-two-pointer-technique)
   - [2. Sliding Window](#2-sliding-window)
   - [3. Prefix Sum Arrays](#3-prefix-sum-arrays)
   - [4. Kadane's Algorithm (Maximum Subarray Sum)](#4-kadanes-algorithm-maximum-subarray-sum)
   - [5. Dutch National Flag (3-Way Partitioning)](#5-dutch-national-flag-3-way-partitioning)
6. [Visualizations](#visualizations)
7. [Existing Folder Files](#existing-folder-files)
8. [Common Interview Questions & Edge Cases](#common-interview-questions--edge-cases)
9. [Practice Problems (Beginner to Advanced)](#practice-problems-beginner-to-advanced)
10. [Related Topics](#related-topics)

---

## Introduction

An **Array** is a linear data structure that stores a collection of elements identified by index or key. In traditional low-level programming languages (like C, C++, or Java), an array represents a **contiguous block of memory** storing fixed-size elements of homogeneous data types.

In JavaScript, arrays are first-class, dynamic objects inheriting from `Array.prototype`. They can grow and shrink dynamically, hold heterogeneous elements (numbers, strings, objects, nested arrays), and offer high-level functional methods such as `map`, `filter`, and `reduce`.

### Why Arrays Are Fundamental
- **Instant Random Access ($O(1)$):** Given an index $i$, calculating the element's memory address is direct: $\text{Address} = \text{Base Address} + (i \times \text{Element Size})$.
- **Foundation for Other Structures:** Stacks, Queues, Heaps, Hash Tables, and Graph Adjacency Matrices are commonly backed by arrays.
- **Cache Locality:** Contiguous memory storage maximizes CPU cache hit rates, yielding superior traversal speeds compared to pointer-heavy structures like linked lists.

---

## How Arrays Work in JavaScript

### Static vs. Dynamic Arrays

| Feature | Static Array (C / C++) | Dynamic Array / JS Array |
| :--- | :--- | :--- |
| **Size** | Fixed at compile time | Resizable at runtime |
| **Memory Allocation** | Contiguous chunk on Stack / Heap | Managed by JavaScript runtime engine (V8) |
| **Element Types** | Strictly Homogeneous (e.g., `int[]`) | Heterogeneous (`[1, "hello", { a: 1 }]`) |
| **Appends** | Not allowed beyond capacity | Amortized $O(1)$ capacity doubling |

#### How Dynamic Resizing Works
When a dynamic array runs out of capacity:
1. The runtime allocates a new underlying buffer (typically **$2 \times$** the current capacity).
2. Existing elements are copied over to the new buffer.
3. The old buffer is garbage-collected.
4. While the resizing copy costs $O(n)$, it occurs infrequently ($1, 2, 4, 8, 16...$). Averaged across $n$ insertions, each append costs **amortized $O(1)$** time.

### V8 Engine Array Internals (Packed vs. Holey)

Modern JavaScript engines like Google V8 optimize arrays based on how elements are stored:

1. **PACKED Elements (Fast):**
   - Arrays with continuous indices without gaps (e.g., `[10, 20, 30]`).
   - Categorized by type:
     - `PACKED_SMI_ELEMENTS` (Small Integers, fastest)
     - `PACKED_DOUBLE_ELEMENTS` (Floating-point numbers)
     - `PACKED_ELEMENTS` (Objects, strings, or mixed types)
2. **HOLEY Elements (Slow):**
   - Arrays containing empty slots / holes (e.g., `let a = []; a[0] = 1; a[100] = 2;`).
   - Accessing a hole forces the engine to traverse prototype chains looking for values, degrading performance.

> [!TIP]
> Keep your arrays packed and contiguous. Avoid creating holes with `delete arr[i]` or skipping indices like `arr[1000] = x`. Prefer `arr.splice()` or `arr.filter()` instead.

---

## Time and Space Complexities

| Operation | Best Case | Average Case | Worst Case | Space Complexity | Notes |
| :--- | :---: | :---: | :---: | :---: | :--- |
| **Access by Index** (`arr[i]`) | $O(1)$ | $O(1)$ | $O(1)$ | $O(1)$ | Direct pointer arithmetic |
| **Search by Value** (Linear) | $O(1)$ | $O(n)$ | $O(n)$ | $O(1)$ | Must inspect each element |
| **Search (Binary Search - Sorted)** | $O(1)$ | $O(\log n)$ | $O(\log n)$ | $O(1)$ | Requires sorted array |
| **Insert at End** (`push`) | $O(1)$ | $O(1)$ | $O(n)$ | $O(1)$ | Amortized $O(1)$; $O(n)$ only on buffer resize |
| **Delete from End** (`pop`) | $O(1)$ | $O(1)$ | $O(1)$ | $O(1)$ | No shifting required |
| **Insert at Beginning** (`unshift`) | $O(n)$ | $O(n)$ | $O(n)$ | $O(1)$ | Shifts all elements to the right |
| **Delete from Beginning** (`shift`) | $O(n)$ | $O(n)$ | $O(n)$ | $O(1)$ | Shifts all elements to the left |
| **Insert / Delete at Index** (`splice`)| $O(1)$ | $O(n)$ | $O(n)$ | $O(1)$ | Requires shifting subsequent elements |

---

## Core Operations & Implementations

### Insertion, Deletion, and Access

```javascript
// Manual Implementation of Low-Level Array Mechanics
class MyArray {
  constructor() {
    this.length = 0;
    this.data = {};
  }

  // O(1) Access
  get(index) {
    return this.data[index];
  }

  // O(1) Amortized Append
  push(item) {
    this.data[this.length] = item;
    this.length++;
    return this.length;
  }

  // O(1) Pop
  pop() {
    if (this.length === 0) return undefined;
    const lastItem = this.data[this.length - 1];
    delete this.data[this.length - 1];
    this.length--;
    return lastItem;
  }

  // O(n) Delete at Index
  deleteAt(index) {
    if (index < 0 || index >= this.length) return undefined;
    const item = this.data[index];
    this._shiftItems(index);
    return item;
  }

  // Helper: Shift items to fill the gap
  _shiftItems(index) {
    for (let i = index; i < this.length - 1; i++) {
      this.data[i] = this.data[i + 1];
    }
    delete this.data[this.length - 1];
    this.length--;
  }

  // O(n) Insert at Index
  insertAt(index, item) {
    if (index < 0 || index > this.length) return false;
    for (let i = this.length; i > index; i--) {
      this.data[i] = this.data[i - 1];
    }
    this.data[index] = item;
    this.length++;
    return true;
  }
}

// Verification
const arr = new MyArray();
arr.push(10);
arr.push(20);
arr.push(30);
arr.insertAt(1, 15); // [10, 15, 20, 30]
console.log(arr.get(1)); // 15
arr.deleteAt(2);        // [10, 15, 30]
console.log(arr.get(2)); // 30
```

---

## Essential Algorithmic Patterns

### 1. Two-Pointer Technique

Used on sorted arrays or when comparing items from opposite or same ends without nested loops ($O(n)$ instead of $O(n^2)$).

#### Example: Two Sum on Sorted Array
```javascript
function twoSumSorted(arr, target) {
  let left = 0;
  let right = arr.length - 1;

  while (left < right) {
    const currentSum = arr[left] + arr[right];
    if (currentSum === target) {
      return [left, right];
    } else if (currentSum < target) {
      left++; // Increase sum by moving right
    } else {
      right--; // Decrease sum by moving left
    }
  }
  return [-1, -1];
}

console.log(twoSumSorted([2, 7, 11, 15], 9)); // [0, 1]
```

### 2. Sliding Window

Used for subarray or substring problems (finding contiguous subarrays with maximum sum, distinct elements, or target lengths).

#### Example: Maximum Sum Subarray of Size K
```javascript
function maxSubarraySum(arr, k) {
  if (arr.length < k) return null;

  let maxSum = 0;
  let windowSum = 0;

  // Compute sum of initial window of size k
  for (let i = 0; i < k; i++) {
    windowSum += arr[i];
  }
  maxSum = windowSum;

  // Slide window by adding right element and subtracting left element
  for (let i = k; i < arr.length; i++) {
    windowSum += arr[i] - arr[i - k];
    maxSum = Math.max(maxSum, windowSum);
  }

  return maxSum;
}

console.log(maxSubarraySum([2, 1, 5, 1, 3, 2], 3)); // 9 (subarray [5, 1, 3])
```

### 3. Prefix Sum Arrays

Precomputes running totals to answer range sum queries $[L, R]$ in $O(1)$ time after $O(n)$ pre-processing.

$$\text{RangeSum}(L, R) = \text{Prefix}[R] - \text{Prefix}[L - 1]$$

```javascript
class PrefixSum {
  constructor(arr) {
    this.prefix = new Array(arr.length);
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
      sum += arr[i];
      this.prefix[i] = sum;
    }
  }

  query(left, right) {
    if (left === 0) return this.prefix[right];
    return this.prefix[right] - this.prefix[left - 1];
  }
}

const p = new PrefixSum([3, 1, 4, 1, 5, 9, 2]);
console.log(p.query(1, 4)); // 1 + 4 + 1 + 5 = 11
```

### 4. Kadane's Algorithm (Maximum Subarray Sum)

Finds the contiguous subarray with the largest sum in $O(n)$ time and $O(1)$ space.

```javascript
function kadanesAlgorithm(nums) {
  let maxSoFar = nums[0];
  let currentMax = nums[0];

  for (let i = 1; i < nums.length; i++) {
    // Either extend the previous subarray or start fresh from nums[i]
    currentMax = Math.max(nums[i], currentMax + nums[i]);
    maxSoFar = Math.max(maxSoFar, currentMax);
  }

  return maxSoFar;
}

console.log(kadanesAlgorithm([-2, 1, -3, 4, -1, 2, 1, -5, 4])); // 6 ([4, -1, 2, 1])
```

### 5. Dutch National Flag (3-Way Partitioning)

Sorts an array containing three distinct keys (e.g., 0, 1, 2) in a single pass $O(n)$ time and $O(1)$ space.

```javascript
function sortColors(nums) {
  let low = 0;
  let mid = 0;
  let high = nums.length - 1;

  while (mid <= high) {
    if (nums[mid] === 0) {
      [nums[low], nums[mid]] = [nums[mid], nums[low]];
      low++;
      mid++;
    } else if (nums[mid] === 1) {
      mid++;
    } else {
      [nums[mid], nums[high]] = [nums[high], nums[mid]];
      high--;
    }
  }
  return nums;
}

console.log(sortColors([2, 0, 2, 1, 1, 0])); // [0, 0, 1, 1, 2, 2]
```

---

## Visualizations

### Memory Representation: Contiguous Indexing
```
Index:         0       1       2       3       4
Value:     |  10   |  25   |   8   |  42   |  17   |
Memory:     0x100   0x104   0x108   0x10C   0x110
            \___________________________________/
                 Contiguous 4-byte increments
```

### Sliding Window Mechanics
```
Array: [ 2,  1,  5,  1,  3,  2 ]   k = 3
Window 1: [ 2,  1,  5 ]                 Sum = 8
Window 2:     [ 1,  5,  1 ]             Sum = 7
Window 3:         [ 5,  1,  3 ]         Sum = 9  <-- Maximum
Window 4:             [ 1,  3,  2 ]     Sum = 6
```

---

## Existing Folder Files

- **[array.js](./array.js)**: Workspace scratchpad file for array experiments, custom implementations, and practice drills.

---

## Common Interview Questions & Edge Cases

### Top Questions
1. **Find Missing Number in $[1..n]$:** Sum formula $n(n+1)/2 - \sum arr$ or XOR trick in $O(n)$ time and $O(1)$ space.
2. **Rotate Array by $K$ Steps:** Reverse entire array, reverse first $k$ elements, reverse remaining elements ($O(n)$ time, $O(1)$ space).
3. **Move Zeroes to End:** Two-pointer in-place swap keeping relative order of non-zero elements.
4. **Merge Intervals:** Sort by start time, then merge overlapping ranges ($O(n \log n)$).
5. **Product of Array Except Self:** Compute prefix and suffix products in $O(n)$ time without division.

### Crucial Edge Cases to Handle
- **Empty Array (`[]`):** Ensure functions do not throw on `nums[0]`.
- **Single Element Array (`[5]`):** Boundaries for two pointers (`left < right`).
- **All Identical Elements (`[7, 7, 7]`):** Two-pointer termination or partitioning traps.
- **Negative Numbers:** Critical for Kadane's algorithm (initial max cannot be `0` if all values are negative).
- **Even vs. Odd Lengths:** Index calculations when finding medians or binary search midpoints.

---

## Practice Problems (Beginner to Advanced)

### Level 1: Beginner
- [ ] Find the maximum and minimum element in an array.
- [ ] Reverse an array in-place using two pointers.
- [ ] Check if an array is sorted.
- [ ] Remove duplicates from a sorted array.

### Level 2: Intermediate
- [ ] **Two Sum:** Return indices of two numbers that add up to a target (Hash Map approach).
- [ ] **Maximum Subarray (Kadane's Algorithm):** Find the contiguous subarray with maximum sum.
- [ ] **Container With Most Water:** Two-pointer greedy approach.
- [ ] **3Sum:** Sort and reduce to 2Sum using two pointers.
- [ ] **Merge Sorted Arrays in-place:** Three-pointer backwards iteration.

### Level 3: Advanced
- [ ] **Trapping Rain Water:** Two pointers or prefix/suffix arrays ($O(n)$ time, $O(1)$ space).
- [ ] **First Missing Positive:** Cyclic sort in $O(n)$ time and $O(1)$ extra space.
- [ ] **Sliding Window Maximum:** Monotonic double-ended queue ($O(n)$ time).
- [ ] **Subarray Sum Equals K:** Prefix sum combined with frequency hash map.

---

## Related Topics

- [String Documentation](../String/README.md) - Strings as character sequences and array-like manipulations.
- [Search Algorithms](../Search/README.md) - Linear Search and Binary Search on arrays.
- [Sorting Algorithms](../Sort/README.md) - In-place and divide-and-conquer sorting algorithms.
- [Linked List Documentation](../LinkedList/README.md) - Comparison between contiguous arrays and node-pointer lists.
- [Hash Map Documentation](../HashMap/README.md) - Constant-time lookups using bucket arrays.

