# Data Structures & Algorithms (DSA) in JavaScript

A comprehensive, production-grade learning hub, reference handbook, and interview preparation repository covering fundamental to advanced data structures and algorithms implemented in modern JavaScript.

---

## Table of Contents
1. [Repository Overview](#repository-overview)
2. [Folder Structure & Architecture](#folder-structure--architecture)
3. [The 3-Phase Mastery Curriculum](#the-3-phase-mastery-curriculum)
4. [Master Big-O Complexity Cheat Sheet](#master-big-o-complexity-cheat-sheet)
   - [Data Structures Complexity Table](#data-structures-complexity-table)
   - [Algorithms Complexity Table](#algorithms-complexity-table)
5. [Complete Topic Directory & Navigation](#complete-topic-directory--navigation)
6. [Core Algorithmic Patterns Quick Reference](#core-algorithmic-patterns-quick-reference)
7. [Running Code & Test Suites](#running-code--test-suites)
8. [Technical Interview Preparation Framework](#technical-interview-preparation-framework)

---

## Repository Overview

This repository is designed as an all-in-one personal DSA handbook. Every data structure and algorithm is built from scratch in JavaScript with a focus on:
- **Conceptual Depth:** Understanding underlying memory models (contiguous memory, heap allocations, pointer dereferencing, cache locality, and V8 optimization).
- **Technical Rigor:** Precise Big-O time and space complexity analyses for every operation.
- **Self-Contained Documentation:** Every folder includes an extensive `README.md` containing visual diagrams, step-by-step logic walkthroughs, edge cases, interview questions, and graded practice problems.
- **Zero Modifications to Existing Code:** All pre-existing source files and test scripts remain intact, documented, and fully linked.

---

## Folder Structure & Architecture

```
DSA/
├── Array/                 # Contiguous arrays, two-pointers, sliding window, Kadane's algorithm
├── String/                # Character encoding, immutability, anagrams, palindrome verification
├── LinkedList/            # Singly, Doubly, and Circular Linked Lists; cycle detection
├── Stack/                 # LIFO structures, Call Stack mechanics, Monotonic Stacks
├── Queue/                 # FIFO structures, Linked List queues, Circular Ring Buffers, Deques
├── HashMap/               # Hash tables, collision handling (Chaining, Linear Probing), rehashing
├── Tree/                  # General Trees, Binary Trees, BSTs, Traversals (BFS/DFS), AVL rotations
├── Heap/                  # Complete Binary Heaps (Max/Min), O(n) buildHeap, Priority Queues, Heap Sort
├── Trie/                  # Prefix trees, dictionary lookups, autocomplete engines, word pruning
├── Graph/                 # Adjacency Lists/Matrices, Weighted Graphs, BFS/DFS, Dijkstra, Bellman-Ford
├── Recursion/             # Stack frames, recurrence relations, backtracking, memoization
├── Search/                # Linear Search, Binary Search, Lower/Upper bounds, Rotated Array search
├── Sort/                  # Bubble, Insertion, Selection, Merge, Quick, and Timsort algorithms
├── ALL_TEST/              # Integration test suites, mock interview drills, verification scripts
└── All_Materials/         # Syllabus roadmaps, weekly practice guides, PDF study materials
```

---

## The 3-Phase Mastery Curriculum

The repository is organized around a structured 3-phase curriculum (detailed in **[All_Materials/README.md](./All_Materials/README.md)**):

```
       +-------------------------------------------------------+
       |             DSA 3-PHASE MASTERY ROADMAP               |
       +-------------------------------------------------------+
                                   |
         +-------------------------+-------------------------+
         |                         |                         |
         v                         v                         v
   [ PHASE 1: DS-1 ]         [ PHASE 2: DS-2 ]         [ PHASE 3: DS-3 ]
   Linear & Foundational     Sorting & Key-Value       Hierarchies & Networks
   - Array                   - Bubble Sort             - Tree (General, Binary)
   - String                  - Insertion Sort          - Binary Search Tree (BST)
   - LinkedList              - Selection Sort          - Max-Heap & Min-Heap
   - Stack                   - Merge Sort              - Priority Queue
   - Queue                   - Quick Sort              - Trie (Prefix Tree)
   - Recursion               - Hash Table (Chaining)   - Graph (Adjacency List)
   - Linear Search           - Open Addressing         - Graph Traversals (BFS/DFS)
   - Binary Search           - Dynamic Rehashing       - Shortest Path (Dijkstra)
```

---

## Master Big-O Complexity Cheat Sheet

### Data Structures Complexity Table

| Data Structure | Access | Search | Insertion | Deletion | Space Complexity | Best Used When |
| :--- | :---: | :---: | :---: | :---: | :---: | :--- |
| **Array** | $O(1)$ | $O(n)$ | $O(n)$ | $O(n)$ | $O(n)$ | Fast index lookup and cache locality are critical |
| **Singly Linked List** | $O(n)$ | $O(n)$ | $O(1)$ (head/tail) | $O(1)$ (head) | $O(n)$ | Frequent insertions/deletions at extremities |
| **Doubly Linked List** | $O(n)$ | $O(n)$ | $O(1)$ | $O(1)$ | $O(n)$ | Bidirectional navigation and LRU Caches |
| **Stack** | $O(n)$ | $O(n)$ | $O(1)$ (push) | $O(1)$ (pop) | $O(n)$ | LIFO tracking, undo features, syntax parsing |
| **Queue** | $O(n)$ | $O(n)$ | $O(1)$ (enqueue) | $O(1)$ (dequeue) | $O(n)$ | FIFO scheduling, BFS traversals, buffer queues |
| **Hash Table** | — | $O(1)$ avg | $O(1)$ avg | $O(1)$ avg | $O(n)$ | Constant-time key-value lookups |
| **Binary Search Tree** | $O(\log n)$ avg | $O(\log n)$ avg | $O(\log n)$ avg | $O(\log n)$ avg | $O(n)$ | Dynamic sorted datasets, range queries |
| **Balanced BST (AVL)** | $O(\log n)$ | $O(\log n)$ | $O(\log n)$ | $O(\log n)$ | $O(n)$ | Guaranteed $O(\log n)$ operations under frequent updates |
| **Binary Heap** | — | $O(n)$ | $O(\log n)$ | $O(\log n)$ (extract) | $O(n)$ | Priority Queues, real-time minimum/maximum tracking |
| **Trie (Prefix Tree)** | — | $O(L)$ | $O(L)$ | $O(L)$ | $O(\Sigma \cdot L \cdot N)$ | Prefix lookups, autocomplete, spell-checking |
| **Graph (Adj. List)** | — | $O(V + E)$ | $O(1)$ (add edge) | $O(V + E)$ | $O(V + E)$ | Sparse networks, pathfinding, social graphs |
| **Graph (Adj. Matrix)**| $O(1)$ | $O(V^2)$ | $O(1)$ (edge) | $O(1)$ (edge) | $O(V^2)$ | Dense networks with frequent edge-existence checks |

*Note: For BSTs, worst-case time is $O(n)$ when the tree is degenerate (skewed).*

---

### Algorithms Complexity Table

| Algorithm | Best Time | Average Time | Worst Time | Space Complexity | Stable? | In-Place? |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| **Linear Search** | $O(1)$ | $O(n)$ | $O(n)$ | $O(1)$ | N/A | Yes |
| **Binary Search** | $O(1)$ | $O(\log n)$ | $O(\log n)$ | $O(1)$ | N/A | Yes |
| **Bubble Sort** | $O(n)$ | $O(n^2)$ | $O(n^2)$ | $O(1)$ | **Yes** | **Yes** |
| **Insertion Sort** | $O(n)$ | $O(n^2)$ | $O(n^2)$ | $O(1)$ | **Yes** | **Yes** |
| **Selection Sort** | $O(n^2)$ | $O(n^2)$ | $O(n^2)$ | $O(1)$ | **No** | **Yes** |
| **Merge Sort** | $O(n \log n)$ | $O(n \log n)$ | $O(n \log n)$ | $O(n)$ | **Yes** | **No** |
| **Quick Sort** | $O(n \log n)$ | $O(n \log n)$ | $O(n^2)$ | $O(\log n)$ | **No** | **Yes** |
| **Heap Sort** | $O(n \log n)$ | $O(n \log n)$ | $O(n \log n)$ | $O(1)$ | **No** | **Yes** |
| **Counting Sort** | $O(n + k)$ | $O(n + k)$ | $O(n + k)$ | $O(k)$ | **Yes** | **No** |
| **Radix Sort** | $O(d(n + k))$ | $O(d(n + k))$ | $O(d(n + k))$ | $O(n + k)$ | **Yes** | **No** |

---

## Complete Topic Directory & Navigation

Click on any topic folder to open its complete learning guide:

| Topic Folder | Learning Guide | Existing Source Files | Key Concepts Covered |
| :--- | :--- | :--- | :--- |
| **Array** | [Array Guide](./Array/README.md) | `array.js` | Contiguous memory, two pointers, sliding window, prefix sums, Kadane's algorithm, Dutch flag. |
| **String** | [String Guide](./String/README.md) | `string.js`, `isAnagram.js`, `stringReverse.js` | Immutability, UTF-16 encoding, anagram maps, palindrome checking, longest common prefix. |
| **LinkedList** | [LinkedList Guide](./LinkedList/README.md) | `doubleList.js`, `linkedlist1.js`, `linkedlist.js` | Singly, Doubly, and Circular lists; three-pointer in-place reversal, Floyd's cycle detection. |
| **Stack** | [Stack Guide](./Stack/README.md) | `1-stack.js`, `2-stackLinkedList.js`, `3-reverseString.js`, `4-stack_O(n).js`, `stack_using_queue.js` | LIFO principle, JS Call Stack, Monotonic Stack, balanced brackets, $O(1)$ Min/Max Stack. |
| **Queue** | [Queue Guide](./Queue/README.md) | `1-queue.js`, `2-queueLinkedList.js`, `3-queue_using_stack.js` | FIFO principle, avoiding `arr.shift()`, Linked List queues, Dual-Stack queue, Circular Buffers. |
| **HashMap** | [HashMap Guide](./HashMap/README.md) | `1-hash_map.js`, `2-sep_chaining_array.js`, `3-sep_chaining_linked.js`, `4-linear_probing.js`, `5-hash_methods.js`, `6-first_non_repeat.js` | Hash functions (DJB2), collision resolution (Separate Chaining vs. Linear Probing), rehashing. |
| **Tree** | [Tree Guide](./Tree/README.md) | `1-tree.js`, `2-binaryTree.js`, `3-binarySearchTree.js`, `4-bst_noRecursion.js` | Binary trees, BST invariant, BFS/DFS traversals, 3-case deletion, validation, AVL rotations. |
| **Heap** | [Heap Guide](./Heap/README.md) | `1-Max_Heap.js`, `2-Min_Heap.js` | Complete binary tree array indexing, $O(n)$ `buildHeap`, Priority Queues, Heap Sort, Top-K elements. |
| **Trie** | [Trie Guide](./Trie/README.md) | `trie.js` | Prefix trees, word search, prefix matching, autocomplete engine, recursive node pruning. |
| **Graph** | [Graph Guide](./Graph/README.md) | `graph_undirected.js`, `graph_directed.js`, `graph_matrix.js`, `weighted_graph.js` | Adjacency lists/matrices, BFS/DFS, cycle detection, Kahn's Topological Sort, Dijkstra's algorithm. |
| **Recursion** | [Recursion Guide](./Recursion/README.md) | `fibonacci.js`, `isPalindrom.js` | Base case, stack frames, recursion trees, backtracking (subsets/permutations), memoization. |
| **Search** | [Search Guide](./Search/README.md) | `linear.js`, `binary.js` | Linear Search, iterative/recursive Binary Search, lower/upper bounds, rotated sorted arrays. |
| **Sort** | [Sort Guide](./Sort/README.md) | `bubbleSort.js`, `insertionSort.js`, `selectionSort.js`, `mergeSort.js`, `quickSort.js`, `allSorts.js` | 5 comparison sorts, stability, in-place Lomuto partition, V8 Timsort internals. |
| **ALL_TEST** | [Test Guide](./ALL_TEST/README.md) | 13 test and drill files (`test.js`, `graphTest.js`, etc.) | Unit tests, verification scripts, randomized stress testing, and edge case checklists. |
| **All_Materials** | [Curriculum Guide](./All_Materials/README.md) | `Ds - 1 practice.pdf`, `DS2.pdf`, `DS-3.pdf` | Phase 1-3 weekly milestone roadmaps and technical interview preparation frameworks. |

---

## Core Algorithmic Patterns Quick Reference

When approaching coding interview problems, map problem statements to these standard patterns:

1. **Two Pointers (Opposite Ends):** Sorted array two-sum, valid palindrome, container with most water.
2. **Two Pointers (Fast & Slow):** Linked list cycle detection, finding list midpoint, happy number.
3. **Sliding Window:** Subarrays/substrings with length, sum, or distinct element constraints.
4. **Prefix Sum Arrays:** Constant-time range sum queries $[L, R]$, subarray sum equals $K$.
5. **Monotonic Stack:** Next greater element, daily temperatures, largest rectangle in histogram.
6. **Monotonic Deque:** Sliding window maximum/minimum in linear $O(n)$ time.
7. **Breadth-First Search (BFS):** Shortest path in unweighted graph, level-order tree traversal.
8. **Depth-First Search (DFS):** Connected components, maze solving, path existence, subtree calculations.
9. **Topological Sort:** Task scheduling, build order dependencies, detecting cycles in directed graphs.
10. **Binary Search on Answer:** Searching numeric solution spaces (e.g., Koko eating bananas, capacity to ship packages).
11. **Two Heaps Pattern:** Finding median of a continuous data stream in $O(1)$ time.
12. **Backtracking:** Generating permutations, combinations, subsets, N-Queens.

---

## Running Code & Test Suites

You can execute any file in this repository directly using **Node.js**:

```bash
# Execute specific topic files
node Array/array.js
node LinkedList/doubleList.js
node Tree/3-binarySearchTree.js
node Graph/graph_undirected.js

# Run integration tests and mock drills
node ALL_TEST/binaryTreeTest.js
node ALL_TEST/graphTest.js
node ALL_TEST/testHeap.js
node ALL_TEST/test.js
```

---

## Technical Interview Preparation Framework

Follow this structured 4-step framework in technical interviews:

```
[ Step 1: Clarify & Constrain ]
  - Verify input types, null/empty states, duplicates, and data volume (N).
                 |
                 v
[ Step 2: State Brute Force & Optimize ]
  - Present naive O(n^2) solution first.
  - Identify bottleneck; select optimal pattern (Hash Map, Two Pointers, Heap).
  - Confirm Big-O time and space with interviewer.
                 |
                 v
[ Step 3: Implement Cleanly ]
  - Write modular code with clear variable names and early exit guards.
                 |
                 v
[ Step 4: Dry-Run & Edge Cases ]
  - Trace code step-by-step using a concrete input table.
  - Test boundaries: empty inputs, single element, negative numbers, duplicates.
```

---

*Authored as comprehensive personal DSA learning and interview reference documentation.*

