# Heaps and Priority Queues in JavaScript

A complete, deep-dive reference for Binary Heaps, Max-Heaps, Min-Heaps, $O(n)$ Bottom-Up Heap Construction, Heap Sort, Priority Queues, and Top-K interview patterns.

---

## Table of Contents
1. [Introduction](#introduction)
2. [What is a Binary Heap?](#what-is-a-binary-heap)
   - [The Complete Binary Tree Property](#the-complete-binary-tree-property)
   - [The Heap-Order Property](#the-heap-order-property)
   - [Max-Heap vs. Min-Heap](#max-heap-vs-min-heap)
3. [Array-Based Heap Representation](#array-based-heap-representation)
   - [Index Arithmetic Formulas](#index-arithmetic-formulas)
   - [Why Arrays are Used Over Linked Nodes](#why-arrays-are-used-over-linked-nodes)
4. [Time and Space Complexities](#time-and-space-complexities)
5. [Core Operations & Step-by-Step Logic](#core-operations--step-by-step-logic)
   - [Insertion & Bubble-Up (Heapify-Up)](#insertion--bubble-up-heapify-up)
   - [Removal (Extract Max/Min) & Bubble-Down (Heapify-Down)](#removal-extract-maxmin--bubble-down-heapify-down)
   - [The $O(n)$ `buildHeap` Bottom-Up Algorithm](#the-on-buildheap-bottom-up-algorithm)
6. [Folder Implementation Guide](#folder-implementation-guide)
   - [1-Max_Heap.js Breakdown](#1-max_heapjs-breakdown)
   - [2-Min_Heap.js Breakdown](#2-min_heapjs-breakdown)
7. [Priority Queue Implementation](#priority-queue-implementation)
8. [Heap Sort Algorithm](#heap-sort-algorithm)
9. [Visualizations](#visualizations)
10. [Common Interview Questions & Top Patterns](#common-interview-questions--top-patterns)
    - [1. Kth Largest / Smallest Element](#1-kth-largest--smallest-element)
    - [2. Find Median from Data Stream (Two-Heap Pattern)](#2-find-median-from-data-stream-two-heap-pattern)
    - [3. Merge K Sorted Lists](#3-merge-k-sorted-lists)
11. [Practice Problems (Beginner to Advanced)](#practice-problems-beginner-to-advanced)
12. [Related Topics](#related-topics)

---

## Introduction

A **Heap** is a specialized tree-based data structure that satisfies the **Heap Property**. Heaps are the standard engine powering:
- **Priority Queues:** Scheduling operating system processes, network packet routing, Dijkstra’s shortest path algorithm, and Prim’s Minimum Spanning Tree algorithm.
- **Heap Sort:** An in-place comparison sorting algorithm guaranteeing $O(n \log n)$ worst-case time without requiring extra space.
- **Order Statistics:** Finding the $K$-th largest/smallest elements in streams of data without sorting the entire dataset.

---

## What is a Binary Heap?

A Binary Heap is a binary tree that satisfies two strict invariants:

### 1. The Complete Binary Tree Property
Every level of the tree is completely filled, except possibly the last level, where all nodes are populated from **left to right** without gaps. Because there are no missing nodes, a binary heap can be stored compactly in a flat array without pointer overhead.

### 2. The Heap-Order Property
- **Max-Heap Property:** The key stored at any node is **greater than or equal to** the keys of its children:
  $$\text{Parent}(i) \ge \text{LeftChild}(i) \quad \text{and} \quad \text{Parent}(i) \ge \text{RightChild}(i)$$
  Consequently, the **maximum element is always at the root** (`index 0`).
- **Min-Heap Property:** The key stored at any node is **less than or equal to** the keys of its children:
  $$\text{Parent}(i) \le \text{LeftChild}(i) \quad \text{and} \quad \text{Parent}(i) \le \text{RightChild}(i)$$
  Consequently, the **minimum element is always at the root** (`index 0`).

> [!NOTE]
> Unlike a Binary Search Tree (BST), a Heap **does not maintain order between left and right siblings**. All it guarantees is the vertical ancestor-descendant priority.

---

## Array-Based Heap Representation

Because a binary heap is a complete binary tree, it is mapped directly onto a zero-indexed array:

### Index Arithmetic Formulas
For any element at index $i$:
- **Parent Index:**
  $$\text{Parent}(i) = \left\lfloor \frac{i - 1}{2} \right\rfloor$$
- **Left Child Index:**
  $$\text{Left}(i) = 2i + 1$$
- **Right Child Index:**
  $$\text{Right}(i) = 2i + 2$$
- **Last Non-Leaf (Parent) Node:**
  $$\text{LastParent} = \left\lfloor \frac{n}{2} \right\rfloor - 1$$

### Why Arrays are Used Over Linked Nodes
1. **Zero Pointer Memory Overhead:** No `node.left` or `node.right` references required.
2. **CPU Cache Locality:** Continuous memory chunks maximize hardware cache hit rates.
3. **Instant Index Calculation:** Bitwise shifts and simple arithmetic replace pointer dereferencing.

---

## Time and Space Complexities

| Operation | Time Complexity | Space Complexity | Notes |
| :--- | :---: | :---: | :--- |
| **`peek()`** (Get Max or Min) | $O(1)$ | $O(1)$ | Directly inspect root (`arr[0]`) |
| **`insert(val)`** | $O(\log n)$ | $O(1)$ | Append to end and `bubbleUp` |
| **`remove()`** (Extract Max/Min) | $O(\log n)$ | $O(1)$ | Swap root with last and `bubbleDown` |
| **`buildHeap(arr)`** (Bottom-Up) | $O(n)$ | $O(1)$ | Mathematically bounded linear time! |
| **Heap Sort** | $O(n \log n)$ | $O(1)$ | In-place, unstable sort |
| **Search / Contains** | $O(n)$ | $O(1)$ | No horizontal ordering exists |

---

## Core Operations & Step-by-Step Logic

### Insertion & Bubble-Up (Heapify-Up)
1. Append the new value to the end of the array (`this.data.push(val)`), maintaining the complete binary tree structure.
2. Compare the inserted element with its parent ($\lfloor(i - 1)/2\rfloor$).
3. If the heap invariant is violated (e.g., in a Max-Heap, child $>$ parent), swap the child with its parent.
4. Repeat step 2-3 upward until the element reaches the root or its parent satisfies the heap property.
5. Runs in $O(\log n)$ because the tree height is $\lfloor\log_2 n\rfloor$.

### Removal (Extract Max/Min) & Bubble-Down (Heapify-Down)
1. Store the root value (`this.data[0]`) to return at the end.
2. Remove the last element of the array via `pop()` and move it to the root (`this.data[0] = this.data.pop()`).
3. Compare the new root with its children ($2i+1$ and $2i+2$).
4. In a Max-Heap, find the **largest** of the node and its children (in a Min-Heap, the **smallest**).
5. If the parent is not the extreme, swap the parent with that extreme child.
6. Continue sinking downwards until the heap property is restored or a leaf is reached.
7. Runs in $O(\log n)$ time.

---

### The $O(n)$ `buildHeap` Bottom-Up Algorithm

A common misconception is that building a heap from an unsorted array of size $n$ takes $O(n \log n)$ (by inserting $n$ elements one-by-one). 

However, **Bottom-Up Heapification** builds a valid heap in **$O(n)$ linear time**!

#### Logic:
1. Copy the unsorted array directly into the heap buffer.
2. Notice that all elements from index $\lfloor n/2 \rfloor$ to $n - 1$ are leaf nodes. Leaf nodes automatically satisfy the heap property by definition!
3. Iterate backwards from the last parent node ($\lfloor n/2 \rfloor - 1$) down to the root ($0$), calling `bubbleDown(i)` on each:

```javascript
buildHeap(arr) {
  this.data = [...arr];
  const lastParent = Math.floor(this.data.length / 2) - 1;
  for (let i = lastParent; i >= 0; i--) {
    this.bubbleDown(i);
  }
  return this.data;
}
```

#### Mathematical Proof of $O(n)$ Bound:
At height $h$ from the bottom, there are at most $\lceil n / 2^{h+1} \rceil$ nodes, and each can sink down at most $h$ levels:
$$\sum_{h=0}^{\log n} \frac{n}{2^{h+1}} \times h = \frac{n}{2} \sum_{h=0}^{\log n} \frac{h}{2^h} = \frac{n}{2} \times 2 = O(n)$$

---

## Folder Implementation Guide

### [1-Max_Heap.js](./1-Max_Heap.js) Breakdown
- **Class Structure:** Maintains internal array `this.data = []`.
- **`buildHeap(arr)`:** Implements the $O(n)$ bottom-up heapification starting from `lastParent`.
- **`insert(value)`:** Appends value and triggers iterative `bubbleUp()`.
- **`remove()`:** Extracts maximum element from root, moves last element to index 0, and sinks it with `bubbleDown()`.
- **Utilities:** `peek()`, `size()`, `isEmpty()`, and `contains()`.
- **Included Algorithms:**
  - `heapSort(arr)`: Repeatedly extracts maximum elements to produce sorted output.
  - `kthMax(arrays, k)`: Finds the $k$-th maximum across matrix rows using heap extraction.

### [2-Min_Heap.js](./2-Min_Heap.js) Breakdown
- Implements a Min-Heap using modern ES6 private methods:
  - `#getParent(i)`, `#getLeft(i)`, `#getRight(i)`, `#swap(i, j)`.
  - `#bubbleUp(index)`: Swaps upward while `data[parent] > data[index]`.
  - `#bubbleDown(index)`: Finds smallest child and sinks down.
  - `peek()` returns `this.data[0]` in $O(1)$ time.

---

## Priority Queue Implementation

A Priority Queue using the Min-Heap principles from this folder:

```javascript
class PriorityQueue {
  constructor() {
    this.heap = [];
  }

  enqueue(item, priority) {
    const node = { item, priority };
    this.heap.push(node);
    this._bubbleUp(this.heap.length - 1);
  }

  dequeue() {
    if (this.isEmpty()) return null;
    if (this.heap.length === 1) return this.heap.pop().item;

    const min = this.heap[0].item;
    this.heap[0] = this.heap.pop();
    this._bubbleDown(0);
    return min;
  }

  peek() {
    return this.isEmpty() ? null : this.heap[0].item;
  }

  isEmpty() {
    return this.heap.length === 0;
  }

  _bubbleUp(index) {
    while (index > 0) {
      const parent = Math.floor((index - 1) / 2);
      if (this.heap[parent].priority <= this.heap[index].priority) break;
      [this.heap[parent], this.heap[index]] = [this.heap[index], this.heap[parent]];
      index = parent;
    }
  }

  _bubbleDown(index) {
    const len = this.heap.length;
    while (true) {
      let smallest = index;
      const left = 2 * index + 1;
      const right = 2 * index + 2;

      if (left < len && this.heap[left].priority < this.heap[smallest].priority) smallest = left;
      if (right < len && this.heap[right].priority < this.heap[smallest].priority) smallest = right;

      if (smallest === index) break;
      [this.heap[index], this.heap[smallest]] = [this.heap[smallest], this.heap[index]];
      index = smallest;
    }
  }
}
```

---

## Heap Sort Algorithm

Heap Sort achieves guaranteed $O(n \log n)$ time and $O(1)$ auxiliary space:
1. Build a Max-Heap from the input array in $O(n)$ time.
2. Swap the root (maximum element) with the last element in the array.
3. Reduce heap size by $1$ and call `bubbleDown(0)` to restore Max-Heap property.
4. Repeat until the entire array is sorted in ascending order.

```javascript
function inPlaceHeapSort(arr) {
  const n = arr.length;

  function heapify(len, i) {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    if (left < len && arr[left] > arr[largest]) largest = left;
    if (right < len && arr[right] > arr[largest]) largest = right;

    if (largest !== i) {
      [arr[i], arr[largest]] = [arr[largest], arr[i]];
      heapify(len, largest);
    }
  }

  // Step 1: Build max heap O(n)
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(n, i);
  }

  // Step 2: Extract elements from heap one by one O(n log n)
  for (let i = n - 1; i > 0; i--) {
    [arr[0], arr[i]] = [arr[i], arr[0]]; // Move current max to end
    heapify(i, 0); // Restore heap on reduced array
  }

  return arr;
}

console.log(inPlaceHeapSort([12, 11, 13, 5, 6, 7])); // [5, 6, 7, 11, 12, 13]
```

---

## Visualizations

### Tree vs. Array Representation
```
Binary Tree View:
                  100 (Index 0)
                /     \
      (Index 1) 40     50 (Index 2)
              /   \    /
  (Index 3) 10    15  25 (Index 5)
           (Index 4)

Flat Array Buffer:
Index:   [ 0 ]   [ 1 ]   [ 2 ]   [ 3 ]   [ 4 ]   [ 5 ]
Value:  | 100 |  |  40 |  |  50 |  |  10 |  |  15 |  |  25 |
```

### Bubble-Down Operation (Extract Max)
```
1. Swap Root (100) with Last Element (25):
   [ 25, 40, 50, 10, 15 ] (100 popped)

2. 25 has children 40 (left) and 50 (right).
   Largest child is 50. Swap 25 with 50:
   [ 50, 40, 25, 10, 15 ]

3. 25 has no children. Heap property restored!
```

---

## Common Interview Questions & Top Patterns

### 1. Kth Largest / Smallest Element
- To find the **$K$-th Largest Element** in an array, use a **Min-Heap of size $K$**.
- Iterate through numbers: push into heap, and if heap size exceeds $K$, pop the root.
- At the end, the root of the Min-Heap is guaranteed to be the $K$-th largest element in $O(n \log K)$ time and $O(K)$ space.

### 2. Find Median from Data Stream (Two-Heap Pattern)
- Divide incoming numbers into two halves:
  - **Max-Heap:** Stores the smaller half of numbers.
  - **Min-Heap:** Stores the larger half of numbers.
- Balance heaps such that sizes differ by at most $1$.
- Median is either the root of the larger heap, or the average of both roots in $O(1)$ time!

### 3. Merge K Sorted Lists
- Push the head node of each of the $K$ lists into a Min-Heap.
- Repeatedly pop the minimum node, attach it to the merged list, and push its `next` node into the heap.
- Solves the problem in $O(N \log K)$ time where $N$ is total node count.

---

## Practice Problems (Beginner to Advanced)

### Level 1: Beginner
- [ ] Implement a Max-Heap from scratch with `insert`, `remove`, and `peek`.
- [ ] Implement a Min-Heap from scratch.
- [ ] Verify if a given array represents a valid Binary Max-Heap.
- [ ] Implement Heap Sort.

### Level 2: Intermediate
- [ ] **Kth Largest Element in an Array:** Solve using Min-Heap of size $k$.
- [ ] **Top K Frequent Elements:** Frequency map + Min-Heap.
- [ ] **Sort Characters By Frequency:** Max-Heap priority ordering.
- [ ] **K Closest Points to Origin:** Max-Heap with Euclidean distance.
- [ ] **Connect Ropes with Minimum Cost:** Greedy aggregation using Min-Heap.

### Level 3: Advanced
- [ ] **Find Median from Data Stream:** Dual-heap balance (Max-Heap + Min-Heap).
- [ ] **Merge K Sorted Lists:** Min-Heap priority tracking.
- [ ] **Task Scheduler:** Max-Heap cooling cycle simulation.
- [ ] **Sliding Window Median:** Dual heaps with lazy deletion.

---

## Related Topics

- [Tree Documentation](../Tree/README.md) - Binary Tree structures, complete vs. full trees.
- [Sorting Documentation](../Sort/README.md) - Heap Sort comparison against Quick Sort and Merge Sort.
- [Queue Documentation](../Queue/README.md) - Priority Queue abstractions.
- [Graph Documentation](../Graph/README.md) - Priority queues powering Dijkstra’s and Prim’s algorithms.

