# Sorting Algorithms in JavaScript

A comprehensive reference for Comparison and Non-Comparison Sorting Algorithms, Time/Space Complexity trade-offs, Stability, In-Place semantics, and V8 engine sorting internals.

---

## Table of Contents
1. [Introduction](#introduction)
2. [Classification of Sorting Algorithms](#classification-of-sorting-algorithms)
   - [Comparison vs. Non-Comparison Sorts](#comparison-vs-non-comparison-sorts)
   - [Stability in Sorting (Stable vs. Unstable)](#stability-in-sorting-stable-vs-unstable)
   - [In-Place vs. Out-of-Place Sorting](#in-place-vs-out-of-place-sorting)
   - [Adaptive vs. Non-Adaptive Sorts](#adaptive-vs-non-adaptive-sorts)
3. [Master Sorting Comparison Table](#master-sorting-comparison-table)
4. [Folder Implementation Guide](#folder-implementation-guide)
   - [bubbleSort.js](#bubblesortjs)
   - [insertionSort.js](#insertionsortjs)
   - [selectionSort.js](#selectionsortjs)
   - [mergeSort.js](#mergesortjs)
   - [quickSort.js](#quicksortjs)
   - [allSorts.js](#allsortsjs)
5. [In-Depth Algorithm Walkthroughs](#in-depth-algorithm-walkthroughs)
   - [1. Bubble Sort (With Early Exit Optimization)](#1-bubble-sort-with-early-exit-optimization)
   - [2. Insertion Sort (Online & Nearly-Sorted Specialist)](#2-insertion-sort-online--nearly-sorted-specialist)
   - [3. Selection Sort (Minimizing Memory Writes)](#3-selection-sort-minimizing-memory-writes)
   - [4. Merge Sort (Guaranteed $O(n \log n)$ & Stable)](#4-merge-sort-guaranteed-on-log-n--stable)
   - [5. Quick Sort (Divide-and-Conquer Partitioning)](#5-quick-sort-divide-and-conquer-partitioning)
6. [JavaScript's Native `Array.prototype.sort()` Internals](#javascripts-native-arrayprototypesort-internals)
   - [Why `[10, 5, 25, 1].sort()` Fails by Default](#why-10-5-25-1sort-fails-by-default)
   - [V8's Timsort Hybrid Engine](#v8s-timsort-hybrid-engine)
7. [Non-Comparison Sorts Overview](#non-comparison-sorts-overview)
   - [Counting Sort ($O(n + k)$)](#counting-sort-on--k)
   - [Radix Sort ($O(d \times (n + k))$)](#radix-sort-od-times-n--k)
8. [Visualizations](#visualizations)
9. [Common Interview Questions & Edge Cases](#common-interview-questions--edge-cases)
10. [Practice Problems (Beginner to Advanced)](#practice-problems-beginner-to-advanced)
11. [Related Topics](#related-topics)

---

## Introduction

**Sorting** is the algorithmic process of rearranging a sequence of elements into a specified order (numerical or lexicographical, ascending or descending).

Sorting is one of the most heavily studied domains in computer science because efficient sorting:
- Unlocks **$O(\log n)$ Binary Search** on otherwise unsorted arrays.
- Enables efficient data deduplication ($O(n)$ after sorting).
- Powers database indexing, query optimization, and join operations.
- Renders graph algorithms (Kruskal’s MST) and computational geometry possible.

---

## Classification of Sorting Algorithms

### Comparison vs. Non-Comparison Sorts
- **Comparison Sorts:** Compare elements pairwise using operators ($<, >, \le$). **Information theory mathematically proves that no comparison-based sort can exceed a lower bound of $\Omega(n \log n)$ in the worst case**. Examples: Quick Sort, Merge Sort, Heap Sort, Insertion Sort.
- **Non-Comparison Sorts:** Exploit integer or bit representations without comparing elements directly. Can achieve linear $O(n)$ time! Examples: Counting Sort, Radix Sort, Bucket Sort.

### Stability in Sorting (Stable vs. Unstable)
A sorting algorithm is **Stable** if it preserves the relative original order of records with equal keys.
```
Input:  [ 4a,  2,  4b,  1 ]
Stable:   [ 1,  2,  4a,  4b ]  (4a remains before 4b)
Unstable: [ 1,  2,  4b,  4a ]  (Order of equal keys inverted)
```
*Why Stability Matters:* If sorting users first by Name, then by Age, an unstable sort destroys the previous alphabetical order.

### In-Place vs. Out-of-Place Sorting
- **In-Place Sort:** Uses $O(1)$ auxiliary memory (rearranging elements directly within the original array). Examples: Quick Sort (with recursive stack), Insertion Sort, Selection Sort, Heap Sort.
- **Out-of-Place Sort:** Requires $O(n)$ auxiliary buffers. Example: Standard Merge Sort.

### Adaptive vs. Non-Adaptive Sorts
- **Adaptive Sort:** Takes advantage of pre-existing order in the input, running significantly faster ($O(n)$) when data is already nearly sorted. Examples: Insertion Sort, Bubble Sort (with swapped flag), Timsort.
- **Non-Adaptive Sort:** Performs the identical number of operations regardless of initial array ordering. Example: Selection Sort ($O(n^2)$ always).

---

## Master Sorting Comparison Table

| Algorithm | Best Time | Average Time | Worst Time | Space Complexity | Stable? | In-Place? | Method / Strategy |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :--- |
| **Bubble Sort** | $O(n)$ | $O(n^2)$ | $O(n^2)$ | $O(1)$ | **Yes** | **Yes** | Exchanging adjacent elements |
| **Insertion Sort**| $O(n)$ | $O(n^2)$ | $O(n^2)$ | $O(1)$ | **Yes** | **Yes** | Incremental insertion |
| **Selection Sort**| $O(n^2)$ | $O(n^2)$ | $O(n^2)$ | $O(1)$ | **No** | **Yes** | Selecting extremum |
| **Merge Sort** | $O(n \log n)$ | $O(n \log n)$| $O(n \log n)$| $O(n)$ | **Yes** | **No** | Divide and conquer |
| **Quick Sort** | $O(n \log n)$ | $O(n \log n)$| $O(n^2)$ | $O(\log n)$ stack | **No** | **Yes** | Partitioning around pivot |
| **Heap Sort** | $O(n \log n)$ | $O(n \log n)$| $O(n \log n)$| $O(1)$ | **No** | **Yes** | Complete binary heap |
| **Counting Sort**| $O(n + k)$ | $O(n + k)$ | $O(n + k)$ | $O(k)$ | **Yes** | **No** | Frequency integer indexing |
| **Radix Sort** | $O(d(n + k))$| $O(d(n + k))$| $O(d(n + k))$| $O(n + k)$ | **Yes** | **No** | Digit-by-digit distribution |

---

## Folder Implementation Guide

### [bubbleSort.js](./bubbleSort.js)
- Implements both standard unoptimized Bubble Sort and the **optimized version with early exit (`swapped` boolean flag)**.
- Compares best-case $O(n)$ detection vs. quadratic execution.

### [insertionSort.js](./insertionSort.js)
- Features step-by-step trace comments demonstrating how elements are shifted rightward to open slots for the `currentElement`.

### [selectionSort.js](./selectionSort.js)
- Implements minimum index scanning (`minIndex`) and in-place swapping with ES6 destructuring `[arr[i], arr[minIndex]] = [arr[minIndex], arr[i]]`.

### [mergeSort.js](./mergeSort.js)
- Divide-and-conquer implementation: recursively splits arrays via `slice` and stitches them together with an auxiliary `merge(left, right)` helper.

### [quickSort.js](./quickSort.js)
- Functional Quick Sort implementation using the first element as pivot and partitioning elements into `left` and `right` arrays.

### [allSorts.js](./allSorts.js)
- Unified compilation module combining Bubble Sort, Insertion Sort, Selection Sort, and Merge Sort into a single testing playground.

---

## In-Depth Algorithm Walkthroughs

### 1. Bubble Sort (With Early Exit Optimization)

Repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order. Larger elements **"bubble up"** to the end of the list on each pass.

```javascript
function bubbleSort(arr) {
  let len = arr.length;
  let swapped;

  do {
    swapped = false;
    for (let i = 0; i < len - 1; i++) {
      if (arr[i] > arr[i + 1]) {
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
        swapped = true;
      }
    }
    len--; // The largest element is guaranteed to be in place at the end!
  } while (swapped);

  return arr;
}
```
- **Optimization:** If an entire pass completes with zero swaps (`swapped === false`), the array is already sorted; the loop terminates immediately in **$O(n)$ best-case time**.

---

### 2. Insertion Sort (Online & Nearly-Sorted Specialist)

Builds the sorted array one element at a time by consuming elements from the unsorted section and shifting larger elements in the sorted section to the right.

```javascript
function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    let current = arr[i];
    let j = i - 1;

    // Shift elements of arr[0..i-1] that are greater than current to one position ahead
    while (j >= 0 && arr[j] > current) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = current;
  }
  return arr;
}
```
- **Superpower:** Fastest algorithm for **small arrays ($n < 30$)** or **nearly-sorted datasets** ($O(n)$). Used inside Timsort and hybrid engines.

---

### 3. Selection Sort (Minimizing Memory Writes)

Divides the array into a sorted left prefix and unsorted right suffix. Finds the minimum element from the unsorted suffix and swaps it with the leftmost unsorted element.

```javascript
function selectionSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIndex]) minIndex = j;
    }
    if (minIndex !== i) {
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
    }
  }
  return arr;
}
```
- **Superpower:** Guarantees at most **$O(n)$ total swaps/writes**. Ideal when writing to memory (e.g. Flash EEPROM) is physically expensive.
- **Downside:** Always $O(n^2)$ comparisons, even on already sorted arrays. Unstable!

---

### 4. Merge Sort (Guaranteed $O(n \log n)$ & Stable)

A classic Divide-and-Conquer algorithm:
1. **Divide:** Find the midpoint and split array into two halves ($O(1)$).
2. **Conquer:** Recursively sort both halves ($2 T(n/2)$).
3. **Combine:** Merge the two sorted halves into a single sorted array ($O(n)$).

```javascript
function mergeSort(arr) {
  if (arr.length <= 1) return arr;

  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));

  return merge(left, right);
}

function merge(left, right) {
  const result = [];
  let i = 0;
  let j = 0;

  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) { // '<=' preserves stability!
      result.push(left[i++]);
    } else {
      result.push(right[j++]);
    }
  }

  return result.concat(left.slice(i)).concat(right.slice(j));
}
```
- **Superpower:** Guaranteed $O(n \log n)$ worst-case runtime. Highly preferred for sorting **Linked Lists** (because merging linked lists requires $O(1)$ auxiliary memory).

---

### 5. Quick Sort (Divide-and-Conquer Partitioning)

Selects a **Pivot** element and partitions the array such that all elements smaller than the pivot are placed to its left, and all elements larger are placed to its right.

#### In-Place Lomuto Partition Scheme
```javascript
function quickSortInPlace(arr, low = 0, high = arr.length - 1) {
  if (low < high) {
    const pivotIndex = partition(arr, low, high);
    quickSortInPlace(arr, low, pivotIndex - 1);
    quickSortInPlace(arr, pivotIndex + 1, high);
  }
  return arr;
}

function partition(arr, low, high) {
  const pivot = arr[high]; // Last element as pivot
  let i = low - 1;

  for (let j = low; j < high; j++) {
    if (arr[j] < pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }

  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  return i + 1;
}
```
- **Pivot Selection Strategies:**
  - *First / Last Element:* Susceptible to $O(n^2)$ worst-case on already sorted arrays!
  - *Random Element:* Mitigates worst-case performance on adversarial inputs.
  - *Median-of-Three:* Picks median of `arr[low]`, `arr[mid]`, and `arr[high]`.

---

## JavaScript's Native `Array.prototype.sort()` Internals

### Why `[10, 5, 25, 1].sort()` Fails by Default
By default, JavaScript converts elements into **strings** and sorts lexicographically by UTF-16 code units:
```javascript
[10, 5, 25, 1].sort(); // [1, 10, 25, 5] <-- "10" comes before "5"!
```
To sort numbers, you must provide a **Comparator Function**:
```javascript
// Ascending Numeric Sort:
arr.sort((a, b) => a - b);

// Descending Numeric Sort:
arr.sort((a, b) => b - a);
```
- If comparator returns `< 0`, `a` is placed before `b`.
- If comparator returns `0`, relative positions remain unchanged.
- If comparator returns `> 0`, `b` is placed before `a`.

### V8's Timsort Hybrid Engine
Modern V8 (Chrome & Node.js) utilizes **Timsort** (a hybrid of **Merge Sort** and **Insertion Sort**):
- Divides data into natural runs.
- Uses Insertion Sort on small chunks ($< 64$ elements) for raw CPU cache efficiency.
- Merges chunks using a balanced Merge Sort strategy.
- Guarantees **$O(n \log n)$ worst-case time, $O(n)$ best-case time, and strict stability**.

---

## Non-Comparison Sorts Overview

### Counting Sort ($O(n + k)$)
Counts the frequency of each distinct key within range $[0..k]$ and accumulates counts to place elements directly into their target indices. Operates in $O(n + k)$ linear time when $k = O(n)$.

### Radix Sort ($O(d \times (n + k))$)
Sorts integers digit-by-digit from Least Significant Digit (LSD) to Most Significant Digit (MSD) using a stable subroutine like Counting Sort.

---

## Visualizations

### Bubble Sort Pass
```
Array: [ 5,  1,  4,  2,  8 ]
Pass 1:
(5 > 1) -> Swap -> [ 1, 5, 4, 2, 8 ]
(5 > 4) -> Swap -> [ 1, 4, 5, 2, 8 ]
(5 > 2) -> Swap -> [ 1, 4, 2, 5, 8 ]
(5 < 8) -> No Swap -> [ 1, 4, 2, 5, 8 ]
Largest element (8) is bubbled to the end!
```

### Quick Sort Partitioning
```
Pivot = 5
Array: [ 3,  7,  8,  2,  5 ]
Elements < 5: [ 3, 2 ]
Pivot:        [ 5 ]
Elements >= 5: [ 7, 8 ]
Result: [ 3, 2, 5, 7, 8 ]
```

---

## Common Interview Questions & Edge Cases

### Top Questions
1. **Sort Colors (Dutch National Flag):** Sort 0s, 1s, and 2s in-place in $O(n)$ time (LeetCode #75).
2. **Merge Intervals:** Sort intervals by start time and merge overlaps (LeetCode #56).
3. **Kth Largest Element in an Array:** Quickselect algorithm in average $O(n)$ time (LeetCode #215).
4. **Sort List:** Sort a Singly Linked List in $O(n \log n)$ time and $O(1)$ space using Merge Sort (LeetCode #148).
5. **Largest Number:** Custom comparator sorting strings in descending order (LeetCode #179).

### Edge Cases Checklist
- **Empty Array (`[]`) or Single Element (`[1]`):** Already sorted; immediately return without recursive calls.
- **Already Sorted Array:** Without optimization, Bubble Sort wastes $O(n^2)$ time; Quick Sort with first-element pivot collapses to $O(n^2)$.
- **All Duplicate Elements (`[5, 5, 5, 5]`):** Partitioning must not degrade to $O(n^2)$ (handled by three-way partitioning).
- **Reverse Sorted Array:** Tests worst-case performance for un-randomized algorithms.

---

## Practice Problems (Beginner to Advanced)

### Level 1: Beginner
- [ ] Implement Bubble Sort with early exit flag.
- [ ] Implement Selection Sort.
- [ ] Implement Insertion Sort.
- [ ] Sort an array of strings alphabetically.

### Level 2: Intermediate
- [ ] **Merge Sort:** Implement recursive divide and merge.
- [ ] **Quick Sort:** Implement in-place with Lomuto or Hoare partition.
- [ ] **Sort Colors:** Dutch National Flag three-pointer algorithm.
- [ ] **Merge Intervals:** Overlapping interval consolidation.
- [ ] **H-Index:** Sorting-based citation ranking.

### Level 3: Advanced
- [ ] **Sort List:** Merge Sort on Singly Linked List in $O(1)$ auxiliary space.
- [ ] **Kth Largest Element (Quickselect):** Linear average time selection.
- [ ] **Counting Sort & Radix Sort:** Non-comparison linear time sorting.
- [ ] **Wiggle Sort II:** Three-way partitioning with virtual indexing.

---

## Related Topics

- [Search Documentation](../Search/README.md) - Binary search requiring sorted inputs.
- [Heap Documentation](../Heap/README.md) - Heap Sort algorithm using complete binary heaps.
- [Array Documentation](../Array/README.md) - Array memory layouts, in-place swaps, and two pointers.
- [Recursion Documentation](../Recursion/README.md) - Divide-and-Conquer recurrence relations.

