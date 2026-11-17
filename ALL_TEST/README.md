# Test Suites and Practice Drills (`ALL_TEST`)

A comprehensive index and guide to the integration tests, mock interview drills, verification scripts, and edge-case suites across the DSA repository.

---

## Table of Contents
1. [Overview](#overview)
2. [How to Run Tests](#how-to-run-tests)
3. [Test Mapping & Coverage Matrix](#test-mapping--coverage-matrix)
4. [File-by-File Breakdown](#file-by-file-breakdown)
   - [Tree & BST Test Suites](#tree--bst-test-suites)
   - [Heap & Priority Queue Test Suites](#heap--priority-queue-test-suites)
   - [Trie Test Suite](#trie-test-suite)
   - [Graph Test Suite](#graph-test-suite)
   - [Linear Structures & Sorting Drill Suites](#linear-structures--sorting-drill-suites)
   - [Comprehensive Master Test Suite (test.js)](#comprehensive-master-test-suite-testjs)
5. [DSA Testing Methodology & Best Practices](#dsa-testing-methodology--best-practices)
   - [Asserting Correctness Without Frameworks](#asserting-correctness-without-frameworks)
   - [Benchmarking Execution Time (`console.time`)](#benchmarking-execution-time-consoletime)
   - [Generating Randomized Stress Test Inputs](#generating-randomized-stress-test-inputs)
6. [Master Edge Case Verification Checklist](#master-edge-case-verification-checklist)
7. [Related Topics](#related-topics)

---

## Overview

The `ALL_TEST/` folder serves as the centralized testing, practice drill, and verification laboratory for this DSA repository. It allows you to:
- Test custom implementations under mock interview conditions.
- Verify algorithm correctness against known expected outputs.
- Stress-test data structures with boundary cases (empty collections, single nodes, duplicates, negative numbers, extreme values).

---

## How to Run Tests

Every test script is designed to run directly using **Node.js** in your terminal:

```bash
# Run a specific test suite
node ALL_TEST/binaryTreeTest.js
node ALL_TEST/graphTest.js
node ALL_TEST/testHeap.js

# Run the master comprehensive test file
node ALL_TEST/test.js

# Run all test files in sequence
for f in ALL_TEST/*.js; do echo "Running $f..."; node "$f"; done
```

---

## Test Mapping & Coverage Matrix

| Test File | Primary Topic | What It Tests & Verifies | Reference Guide |
| :--- | :--- | :--- | :--- |
| **[1-treeTest.js](./1-treeTest.js)** | General Tree | Node creation, parent-child links, tree search, depth calculation | [Tree Guide](../Tree/README.md) |
| **[2-bstTest.js](./2-bstTest.js)** | BST | Recursive insert, search, min/max, in-order/pre-order traversals | [Tree Guide](../Tree/README.md) |
| **[binaryTreeTest.js](./binaryTreeTest.js)**| Binary Tree | BFS level-order insertion, DFS traversals, node replacement deletion | [Tree Guide](../Tree/README.md) |
| **[3-trieTest.js](./3-trieTest.js)** | Trie | String insertion, search, prefix matching, word cleanup | [Trie Guide](../Trie/README.md) |
| **[graphTest.js](./graphTest.js)** | Graph | Directed/Undirected vertices, edge removal, BFS and DFS traversals | [Graph Guide](../Graph/README.md) |
| **[heam min.js](./heam%20min.js)** | Min-Heap | Add operations, `#bubbleUp` index arithmetic | [Heap Guide](../Heap/README.md) |
| **[maxHeap.js](./maxHeap.js)** | Max-Heap | Insertion, `bubbleUp`, parent extraction | [Heap Guide](../Heap/README.md) |
| **[testHeap.js](./testHeap.js)** | Configurable Heap | Dual Min/Max heap toggle, `remove`, `bubbleDown` | [Heap Guide](../Heap/README.md) |
| **[testStack.js](./testStack.js)** | Stack | Array stack with auxiliary Max-stack tracking in $O(1)$ time | [Stack Guide](../Stack/README.md) |
| **[test2.js](./test2.js)** | Linked List | Singly linked list append, prepend, traversal, deletion | [LinkedList Guide](../LinkedList/README.md) |
| **[test3.js](./test3.js)** | Sorting | Optimized Bubble Sort with swap counting | [Sort Guide](../Sort/README.md) |
| **[test4.js](./test4.js)** | Sorting | Bubble Sort boundary validation | [Sort Guide](../Sort/README.md) |
| **[test.js](./test.js)** | Master Suite (690+ Lines) | Recursion drills, array sum, string palindrome, binary search, BST | [Repo Root](../README.md) |

---

## File-by-File Breakdown

### Tree & BST Test Suites
- **[1-treeTest.js](./1-treeTest.js)**: Validates generic multi-way trees with `children` arrays, verifying hierarchical insertion and descendant search.
- **[2-bstTest.js](./2-bstTest.js)**: Verifies the BST invariant ($left < root < right$), checking node insertion, min/max extraction, and sorted in-order traversal output.
- **[binaryTreeTest.js](./binaryTreeTest.js)**: Tests level-order (BFS) insertion into a standard binary tree using a queue, alongside deletion by swapping with the deepest leaf node.

### Heap & Priority Queue Test Suites
- **[heam min.js](./heam%20min.js)** & **[maxHeap.js](./maxHeap.js)**: Focuses on isolated bubble-up testing, validating parent index calculations $\lfloor(i - 1)/2\rfloor$ and array swapping.
- **[testHeap.js](./testHeap.js)**: Full-featured dual-mode heap testing both insertion (`bubbleUp`) and root extraction (`bubbleDown`).

### Trie Test Suite
- **[3-trieTest.js](./3-trieTest.js)**: Tests `TrieNode` child maps, validating exact word searches, prefix containment, case-insensitive cleaning, and whitespace trimming.

### Graph Test Suite
- **[graphTest.js](./graphTest.js)**: Tests Graph representation using `Map<Vertex, Set<Vertex>>`, validating bidirectional edge binding for undirected graphs and isolated vertex cleanup upon deletion.

### Linear Structures & Sorting Drill Suites
- **[testStack.js](./testStack.js)**: Validates Max-Stack tracking with an auxiliary stack, verifying that `getMax()` remains $O(1)$ after popping elements.
- **[test2.js](./test2.js)**: Tests singly linked list head/tail pointer integrity across sequential appends.
- **[test3.js](./test3.js)** & **[test4.js](./test4.js)**: Step-by-step verification of Bubble Sort passes, verifying early exit when swap counts reach zero.

### Comprehensive Master Test Suite ([test.js](./test.js))
A monolithic 690-line practice file covering:
- Recursive Array Sum and In-Place Array Reversal.
- Recursive Factorial, Fibonacci, and Digit Counting.
- Recursive Palindrome Verification.
- Array Extremum Discovery (`findMax`).
- String character frequency mappings.
- Binary Search boundary validations.

---

## DSA Testing Methodology & Best Practices

### Asserting Correctness Without Frameworks
You do not need heavy test runners (Jest/Mocha) to write rigorous DSA tests. Node.js features a built-in `assert` module:

```javascript
import assert from 'node:assert/strict';

function testBinarySearch() {
  const arr = [10, 20, 30, 40, 50];
  assert.equal(binarySearch(arr, 30), 2, "Failed to find existing element");
  assert.equal(binarySearch(arr, 99), -1, "Failed on non-existent element");
  assert.equal(binarySearch([], 10), -1, "Failed on empty array");
  console.log(" All Binary Search tests passed!");
}

testBinarySearch();
```

### Benchmarking Execution Time (`console.time`)
Measure performance differences between $O(n^2)$ and $O(n \log n)$ algorithms:

```javascript
const largeArray = Array.from({ length: 50000 }, () => Math.floor(Math.random() * 100000));

console.time("Merge Sort");
mergeSort([...largeArray]);
console.timeEnd("Merge Sort");

console.time("Bubble Sort");
bubbleSort([...largeArray]);
console.timeEnd("Bubble Sort");
```

### Generating Randomized Stress Test Inputs
Verify that custom sorting or heap algorithms match JavaScript's native engine:

```javascript
function stressTestSort(iterations = 100) {
  for (let i = 0; i < iterations; i++) {
    const len = Math.floor(Math.random() * 1000);
    const original = Array.from({ length: len }, () => Math.floor(Math.random() * 2000) - 1000);
    const expected = [...original].sort((a, b) => a - b);
    const actual = quickSort([...original]);

    for (let j = 0; j < len; j++) {
      if (actual[j] !== expected[j]) {
        console.error(`Mismatch detected at iteration ${i}!`);
        return false;
      }
    }
  }
  console.log(` Passed ${iterations} randomized stress tests!`);
  return true;
}

stressTestSort();
```

---

## Master Edge Case Verification Checklist

Before considering an implementation complete, verify each of these boundary scenarios:

| Data Structure / Topic | Must-Test Edge Cases |
| :--- | :--- |
| **Arrays & Strings** | Empty (`[]`, `""`), single element (`[1]`, `"a"`), all duplicates, negative numbers, odd vs. even lengths. |
| **Linked Lists** | `head === null`, single node (`head.next === null`), two nodes, deleting head, deleting tail, cyclic loops. |
| **Stacks & Queues** | Popping/dequeuing an empty structure (underflow), single item transitions, interleaving pushes/pops. |
| **Hash Tables** | Hash collision handling (keys producing identical indices), updating existing keys, load factor resizing. |
| **Trees & BST** | Empty tree (`root === null`), single node, completely skewed tree (ascending/descending input), deleting node with 0, 1, and 2 children. |
| **Heaps** | `buildHeap` on reverse-sorted array, extracting all elements until empty, duplicate values. |
| **Graphs** | Disconnected components, isolated vertices (degree 0), cycles, self-loops (`(u, u)`). |
| **Searching & Sorting** | Element at index 0, element at last index, target absent, array already sorted, array reverse sorted. |

---

## Related Topics

- [All Materials & Curriculum Guide](../All_Materials/README.md) - Weekly study roadmaps and PDF syllabus alignment.
- [Repository Master Guide](../README.md) - Repository architecture and full Big-O cheat sheet.

