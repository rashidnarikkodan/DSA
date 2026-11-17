# Searching Algorithms in JavaScript

A comprehensive reference for Linear Search, Binary Search (Iterative & Recursive), Lower/Upper Bound variations, Search in Rotated Arrays, and the Binary Search on Answer pattern.

---

## Table of Contents
1. [Introduction](#introduction)
2. [Linear Search](#linear-search)
   - [How It Works](#how-it-works)
   - [When to Use Linear Search](#when-to-use-linear-search)
   - [Implementations (Iterative, Recursive, Global)](#implementations-iterative-recursive-global)
3. [Binary Search](#binary-search)
   - [How It Works (Divide & Conquer)](#how-it-works-divide--conquer)
   - [The Monotonicity Precondition](#the-monotonicity-precondition)
   - [Integer Overflow & The Safe Midpoint Formula](#integer-overflow--the-safe-midpoint-formula)
   - [Implementations (Iterative & Recursive)](#implementations-iterative--recursive)
4. [Time and Space Complexities](#time-and-space-complexities)
5. [Folder Implementation Guide](#folder-implementation-guide)
   - [linear.js](#linearjs)
   - [binary.js](#binaryjs)
6. [Advanced Binary Search Patterns](#advanced-binary-search-patterns)
   - [1. Lower Bound (First Occurrence / First Element $\ge X$)](#1-lower-bound-first-occurrence--first-element-ge-x)
   - [2. Upper Bound (Last Occurrence)](#2-upper-bound-last-occurrence)
   - [3. Search in Rotated Sorted Array](#3-search-in-rotated-sorted-array)
   - [4. Binary Search on Answer / Solution Space](#4-binary-search-on-answer--solution-space)
7. [Other Searching Algorithms Overview](#other-searching-algorithms-overview)
   - [Jump Search ($O(\sqrt{n})$)](#jump-search-osqrtn)
   - [Interpolation Search ($O(\log \log n)$)](#interpolation-search-olog-log-n)
   - [Exponential Search ($O(\log n)$)](#exponential-search-olog-n)
8. [Visualizations](#visualizations)
9. [Common Interview Questions & Edge Cases](#common-interview-questions--edge-cases)
10. [Practice Problems (Beginner to Advanced)](#practice-problems-beginner-to-advanced)
11. [Related Topics](#related-topics)

---

## Introduction

**Searching** is the algorithmic process of locating a specific target value within a collection of data, returning its position (index) or confirming its absence.

Searching algorithms fall into two primary paradigms:
1. **Uninformed / Sequential Search (Linear Search):** Inspects every element sequentially without prior assumptions about order.
2. **Interval / Divide-and-Conquer Search (Binary Search):** Exploits a sorted (monotonic) property to eliminate half of the search space at each step.

---

## Linear Search

### How It Works
Linear search starts at index $0$ and checks each successive element until the target is found or the end of the array is reached.

### When to Use Linear Search
- When the array is **unsorted** and sorting beforehand would cost $O(n \log n)$ time.
- For small collections ($n < 50$), where the simplicity of a single loop outperforms pointer setup.
- When searching non-indexed structures like Singly Linked Lists.

### Implementations (Iterative, Recursive, Global)
As implemented in **[linear.js](./linear.js)**:

```javascript
// 1. Standard Iterative O(n)
function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) return i;
  }
  return -1;
}

// 2. Recursive O(n) Time, O(n) Call Stack
function linearSearchRecursive(arr, target, index = 0) {
  if (index >= arr.length) return -1;
  if (arr[index] === target) return index;
  return linearSearchRecursive(arr, target, index + 1);
}

// 3. Global Search (Find all matching indices)
function globalLinearSearch(arr, target) {
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) result.push(i);
  }
  return result.length > 0 ? result : -1;
}
```

---

## Binary Search

### How It Works (Divide & Conquer)
Binary Search operates on a **sorted array**:
1. Set pointers to search window boundaries: `left = 0`, `right = arr.length - 1`.
2. Compute the midpoint: `mid = left + Math.floor((right - left) / 2)`.
3. If `arr[mid] === target`, target is found; return `mid`.
4. If `arr[mid] < target`, the target must lie in the right half: update `left = mid + 1`.
5. If `arr[mid] > target`, the target must lie in the left half: update `right = mid - 1`.
6. Repeat until `left > right`. If pointers cross without a match, target is not in array; return `-1`.

### The Monotonicity Precondition
Binary search **requires** the dataset (or decision function) to be **monotonic** (strictly non-decreasing or non-increasing). If data is unsorted, binary search produces incorrect results.

### Integer Overflow & The Safe Midpoint Formula
In languages with fixed 32-bit integers, `(left + right) / 2` can overflow $2^{31} - 1$ when both `left` and `right` are large.
Even though JavaScript numbers are double-precision 64-bit floats, best practice is to use the overflow-safe formula:
$$\text{mid} = \text{left} + \left\lfloor \frac{\text{right} - \text{left}}{2} \right\rfloor \quad \text{or bitwise: } (\text{left} + \text{right}) \mathbin{>\!>\!>} 1$$

### Implementations (Iterative & Recursive)
As implemented in **[binary.js](./binary.js)**:

```javascript
// 1. Iterative Binary Search (Recommended: O(1) Space)
function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    let mid = left + Math.floor((right - left) / 2);

    if (arr[mid] === target) return mid;
    if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return -1;
}

// 2. Recursive Binary Search (O(log n) Call Stack Space)
function binarySearchRecursive(arr, target, left = 0, right = arr.length - 1) {
  if (left > right) return -1;

  let mid = left + Math.floor((right - left) / 2);

  if (arr[mid] === target) return mid;
  if (arr[mid] < target) {
    return binarySearchRecursive(arr, target, mid + 1, right);
  } else {
    return binarySearchRecursive(arr, target, left, mid - 1);
  }
}
```

---

## Time and Space Complexities

| Algorithm | Best Case | Average Case | Worst Case | Space Complexity | Requirements |
| :--- | :---: | :---: | :---: | :---: | :--- |
| **Linear Search** | $O(1)$ (First element) | $O(n)$ | $O(n)$ | $O(1)$ | None (works on unsorted) |
| **Binary Search (Iterative)** | $O(1)$ (At midpoint) | $O(\log n)$ | $O(\log n)$ | $O(1)$ | Array must be sorted |
| **Binary Search (Recursive)** | $O(1)$ | $O(\log n)$ | $O(\log n)$ | $O(\log n)$ | Array must be sorted |
| **Jump Search** | $O(1)$ | $O(\sqrt{n})$ | $O(\sqrt{n})$ | $O(1)$ | Array must be sorted |

---

## Folder Implementation Guide

### [linear.js](./linear.js)
- Explores sequential scanning techniques:
  - Iterative loop `linearSearch(ar, n)`.
  - Recursive search `linearSearchRecursion(array, target, index)`.
  - Multi-match collector `gLinear(ar, t)` returning an array of all occurrences.

### [binary.js](./binary.js)
- Explores divide-and-conquer interval halving:
  - Iterative `binarySearch(arr, target)`.
  - Recursive `binarySearchRecursion(array, target, left, right)`.

---

## Advanced Binary Search Patterns

### 1. Lower Bound (First Occurrence / First Element $\ge X$)
Finds the first position where target appears (handling duplicates).

```javascript
function lowerBound(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  let ans = -1;

  while (left <= right) {
    let mid = left + Math.floor((right - left) / 2);

    if (arr[mid] === target) {
      ans = mid;
      right = mid - 1; // Keep searching left for earlier occurrence!
    } else if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return ans;
}

console.log(lowerBound([1, 2, 2, 2, 3, 4], 2)); // Index 1
```

### 2. Upper Bound (Last Occurrence)
Finds the final index where target appears.

```javascript
function upperBound(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  let ans = -1;

  while (left <= right) {
    let mid = left + Math.floor((right - left) / 2);

    if (arr[mid] === target) {
      ans = mid;
      left = mid + 1; // Keep searching right for later occurrence!
    } else if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return ans;
}

console.log(upperBound([1, 2, 2, 2, 3, 4], 2)); // Index 3
```

---

### 3. Search in Rotated Sorted Array
A sorted array was rotated at some unknown pivot (e.g., `[4, 5, 6, 7, 0, 1, 2]`). Find target in $O(\log n)$ time.

**Key Insight:** At any midpoint `mid`, **at least one of the two halves is guaranteed to be normally sorted!**

```javascript
function searchRotated(nums, target) {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    let mid = left + Math.floor((right - left) / 2);
    if (nums[mid] === target) return mid;

    // Check if left half is sorted
    if (nums[left] <= nums[mid]) {
      if (nums[left] <= target && target < nums[mid]) {
        right = mid - 1; // Target is inside left half
      } else {
        left = mid + 1;  // Target is inside right half
      }
    } else {
      // Right half is sorted
      if (nums[mid] < target && target <= nums[right]) {
        left = mid + 1;  // Target is inside right half
      } else {
        right = mid - 1; // Target is inside left half
      }
    }
  }

  return -1;
}

console.log(searchRotated([4, 5, 6, 7, 0, 1, 2], 0)); // Index 4
```

---

### 4. Binary Search on Answer / Solution Space

A powerful interview pattern used when searching for an optimal numerical answer within a bounded range $[L, R]$ where a boolean helper function `canAchieve(mid)` is monotonic (`[F, F, F, T, T, T]`).

#### Example: Koko Eating Bananas (LeetCode #875)
Find the minimum integer eating speed $k$ to eat all piles within $h$ hours.

```javascript
function minEatingSpeed(piles, h) {
  let left = 1;
  let right = Math.max(...piles);
  let ans = right;

  function canFinish(speed) {
    let hours = 0;
    for (let p of piles) {
      hours += Math.ceil(p / speed);
    }
    return hours <= h;
  }

  while (left <= right) {
    let mid = left + Math.floor((right - left) / 2);
    if (canFinish(mid)) {
      ans = mid;
      right = mid - 1; // Try smaller speed
    } else {
      left = mid + 1;  // Speed too slow, increase
    }
  }

  return ans;
}
```

---

## Other Searching Algorithms Overview

### Jump Search ($O(\sqrt{n})$)
Divides a sorted array into blocks of size $m = \sqrt{n}$. Jumps ahead by $m$ until `arr[k * m] > target`, then performs backward linear search within that block.

### Interpolation Search ($O(\log \log n)$)
For **uniformly distributed** sorted numbers (like a telephone book), estimates target location using linear interpolation:
$$\text{pos} = \text{low} + \left\lfloor \frac{\text{target} - \text{arr}[\text{low}]}{\text{arr}[\text{high}] - \text{arr}[\text{low}]} \times (\text{high} - \text{low}) \right\rfloor$$

### Exponential Search ($O(\log n)$)
Used for unbounded or infinite arrays: finds range by doubling index ($1, 2, 4, 8, 16 \dots$) until `arr[i] > target`, then runs binary search within $[i/2, i]$.

---

## Visualizations

### Binary Search Interval Halving
```
Target = 23
Array: [ 2,  5,  8, 12, 16, 23, 38, 56, 72, 91 ]
         ^                   ^               ^
        left                mid            right
Step 1: arr[mid] (16) < 23 -> Eliminate left half! left = mid + 1 = 5

Array: [ 2,  5,  8, 12, 16, 23, 38, 56, 72, 91 ]
                            ^       ^        ^
                           left    mid     right
Step 2: arr[mid] (56) > 23 -> Eliminate right half! right = mid - 1 = 6

Array: [ 2,  5,  8, 12, 16, 23, 38, 56, 72, 91 ]
                            ^   ^
                           l/m  r
Step 3: arr[mid] (23) === 23 -> MATCH FOUND at Index 5!
```

---

## Common Interview Questions & Edge Cases

### Top Questions
1. **Binary Search:** Standard template implementation (LeetCode #704).
2. **Search in Rotated Sorted Array:** LeetCode #33.
3. **Find First and Last Position of Element in Sorted Array:** LeetCode #34.
4. **Search a 2D Matrix:** Treat matrix as 1D array of length $m \times n$ (LeetCode #74).
5. **Find Peak Element:** Binary search on gradient slope (LeetCode #162).
6. **Capacity to Ship Packages Within D Days:** Binary search on answer (LeetCode #1011).

### Edge Cases Checklist
- **Empty Array (`[]`):** Return `-1` immediately.
- **Single Element (`[5]`):** Handled cleanly by `left <= right`.
- **Target Not in Array:** Pointers cross safely and return `-1`.
- **Target Smaller Than Minimum / Larger Than Maximum:** Avoid index out of bounds.
- **Array with All Duplicate Values:** In rotated arrays with duplicates, worst case collapses to $O(n)$.

---

## Practice Problems (Beginner to Advanced)

### Level 1: Beginner
- [ ] Implement Linear Search (iterative and recursive).
- [ ] Implement standard Binary Search on a sorted array.
- [ ] Find the minimum element in a sorted rotated array.
- [ ] Count the frequency of an element in a sorted array using binary search.

### Level 2: Intermediate
- [ ] **First and Last Position of Element:** Find index range $[L, R]$.
- [ ] **Search in Rotated Sorted Array:** Without duplicates.
- [ ] **Search Insert Position:** Return index where target should be placed.
- [ ] **Find Peak Element:** Array element strictly greater than neighbors.
- [ ] **Single Element in a Sorted Array:** Pair parity binary search ($O(\log n)$).

### Level 3: Advanced
- [ ] **Search in Rotated Sorted Array II:** Handling duplicate elements.
- [ ] **Median of Two Sorted Arrays:** Binary search partition in $O(\log(\min(m, n)))$.
- [ ] **Koko Eating Bananas:** Binary search on answer space.
- [ ] **Split Array Largest Sum:** Minimize the largest subarray sum.

---

## Related Topics

- [Array Documentation](../Array/README.md) - Contiguous indexing and random access.
- [Sorting Documentation](../Sort/README.md) - Pre-sorting data to enable $O(\log n)$ binary searches.
- [Recursion Documentation](../Recursion/README.md) - Divide-and-conquer recursion and call stack bounds.
- [Tree Documentation](../Tree/README.md) - Binary Search Trees as hierarchical dynamic binary search.

