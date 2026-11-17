# DSA Curriculum & Study Materials Roadmap (`All_Materials`)

A comprehensive curriculum overview, syllabus mapping, weekly milestone breakdown, and interview preparation roadmap aligned with the provided study guides: `Ds - 1 practice.pdf`, `DS2.pdf`, and `DS-3.pdf`.

---

## Table of Contents
1. [Curriculum Overview](#curriculum-overview)
2. [Phase 1: DS-1 — Fundamentals & Linear Data Structures](#phase-1-ds-1--fundamentals--linear-data-structures)
   - [Core Topics Covered](#core-topics-covered)
   - [Practical Checklists & Repository Code Links](#practical-checklists--repository-code-links)
3. [Phase 2: DS-2 — Sorting Algorithms & Hash Tables](#phase-2-ds-2--sorting-algorithms--hash-tables)
   - [Core Topics Covered](#core-topics-covered-1)
   - [Practical Checklists & Repository Code Links](#practical-checklists--repository-code-links-1)
4. [Phase 3: DS-3 — Non-Linear Hierarchies & Advanced Graph Algorithms](#phase-3-ds-3--non-linear-hierarchies--advanced-graph-algorithms)
   - [Core Topics Covered](#core-topics-covered-2)
   - [Practical Checklists & Repository Code Links](#practical-checklists--repository-code-links-2)
5. [The Structured Technical Interview Methodology](#the-structured-technical-interview-methodology)
   - [Step 1: Clarification & Constraint Gathering](#step-1-clarification--constraint-gathering)
   - [Step 2: Brute Force & Optimization Brainstorm](#step-2-brute-force--optimization-brainstorm)
   - [Step 3: Clean Implementation](#step-3-clean-implementation)
   - [Step 4: Dry-Run, Verification & Complexity Analysis](#step-4-dry-run-verification--complexity-analysis)
6. [Study Timeline & Time-Allocation Strategy](#study-timeline--time-allocation-strategy)
7. [Directory Navigation](#directory-navigation)

---

## Curriculum Overview

This repository is structured around a rigorous 3-phase Data Structures and Algorithms curriculum designed to transition learners from foundational memory mechanics to senior engineer interview proficiency.

```
       +-------------------------------------------------------+
       |             DSA 3-PHASE MASTERY ROADMAP               |
       +-------------------------------------------------------+
                                   |
         +-------------------------+-------------------------+
         |                         |                         |
         v                         v                         v
   [ PHASE 1: DS-1 ]         [ PHASE 2: DS-2 ]         [ PHASE 3: DS-3 ]
   - Arrays & Strings        - Sorting Algorithms      - Trees & BSTs
   - Linked Lists            - Hash Tables             - Binary Heaps
   - Stacks & Queues         - Collision Handling      - Priority Queues
   - Recursion Basics        - Load Factors            - Tries (Prefix)
   - Linear/Binary Search    - Amortized Analysis      - Graphs (BFS/DFS/SP)
```

---

## Phase 1: DS-1 — Fundamentals & Linear Data Structures

*Referenced in:* **`Ds - 1 practice.pdf`**

Phase 1 focuses on continuous memory, pointer mechanics, linear abstract data types, and recursive thinking.

### Core Topics Covered
1. **Arrays & Strings:**
   - Memory models: Contiguous allocation, index arithmetic, and V8 packed vs. holey optimization.
   - Algorithmic techniques: Two pointers, sliding window, prefix sums, and Kadane’s algorithm.
   - String immutability, UTF-16 code units, and character frequencies.
2. **Linked Lists:**
   - Singly Linked Lists, Doubly Linked Lists, and Circular Linked Lists.
   - Pointer manipulation, in-place list reversal, and Floyd’s Cycle Detection (Tortoise and Hare).
3. **Stacks & Queues:**
   - LIFO (Stack) vs. FIFO (Queue) access principles.
   - The JavaScript Call Stack and execution context lifecycle.
   - Implementing Stacks via Linked Lists and Queues via Dual Stacks.
4. **Recursion:**
   - Base case convergence, stack frames, recursion trees, and backtracking.
5. **Searching:**
   - Linear Search vs. $O(\log n)$ Binary Search and safe midpoint formulas.

### Practical Checklists & Repository Code Links
- [x] Implement array two-pointer reversal and sliding window: [Array Guide](../Array/README.md)
- [x] Anagram detection, palindrome validation, and prefix searches: [String Guide](../String/README.md)
- [x] Singly, Doubly, and Circular Linked List implementations: [LinkedList Guide](../LinkedList/README.md)
- [x] Balanced parentheses, monotonic stack, and string reversal: [Stack Guide](../Stack/README.md)
- [x] Queue with $O(1)$ linked list and circular buffer wrap-around: [Queue Guide](../Queue/README.md)
- [x] Recursive Fibonacci, subsets power set, and string deduplication: [Recursion Guide](../Recursion/README.md)
- [x] Iterative and recursive Binary Search: [Search Guide](../Search/README.md)

---

## Phase 2: DS-2 — Sorting Algorithms & Hash Tables

*Referenced in:* **`DS2.pdf`**

Phase 2 shifts focus to comparison bounds, divide-and-conquer strategies, and constant-time key-value mapping architectures.

### Core Topics Covered
1. **Sorting Algorithms:**
   - **Bubble Sort:** Adjacent element exchanges, stability, and early exit via swap tracking ($O(n)$ best case).
   - **Insertion Sort:** Incremental insertion into sorted prefix; online sorting; best for small/nearly-sorted data.
   - **Selection Sort:** Repeated extremum selection; exactly $O(n)$ writes/swaps; unstable.
   - **Quick Sort:** Divide-and-conquer partitioning (Lomuto/Hoare), pivot selection (first, median-of-three, random), and $O(n \log n)$ average time.
   - **Merge Sort:** Guaranteed $O(n \log n)$ time, stable, divide-and-conquer; optimal for Linked Lists.
   - **JavaScript Engine Sort:** V8's Timsort hybrid (Merge Sort + Insertion Sort) and custom comparator functions.
2. **Hash Tables:**
   - Hash function design: Division, multiplication (golden ratio), folding, and DJB2 rolling hash.
   - Collision Resolution Strategies:
     - **Separate Chaining:** Storing collisions in bucket arrays or linked lists.
     - **Open Addressing:** Linear probing, quadratic probing, and double hashing.
     - Primary vs. secondary clustering and tombstone deletion markers.
   - Load Factor ($\alpha = n / k$), rehashing, and dynamic table resizing.
   - Applications: Frequency counters, two sum, anagram grouping, caching.

### Practical Checklists & Repository Code Links
- [x] Five fundamental sorting implementations: [Sort Guide](../Sort/README.md)
- [x] Hash Table with separate chaining (array & linked list): [HashMap Guide](../HashMap/README.md)
- [x] Hash Table with linear probing and automatic resizing: [HashMap Guide](../HashMap/README.md)
- [x] First non-repeating character and group anagrams: [HashMap Guide](../HashMap/README.md)

---

## Phase 3: DS-3 — Non-Linear Hierarchies & Advanced Graph Algorithms

*Referenced in:* **`DS-3.pdf`**

Phase 3 covers hierarchical trees, priority heaps, dictionary tries, and network graph algorithms.

### Core Topics Covered
1. **Tree Structures & Binary Search Trees (BST):**
   - Tree properties: Height vs. depth, node degree, internal nodes vs. leaves.
   - Types: Full, Complete, Perfect, Balanced, and Skewed trees.
   - The BST Invariant ($left < root < right$).
   - Traversals: Level-order (BFS via queue), In-Order (sorted order!), Pre-Order, Post-Order.
   - Operations: Recursive and iterative insertion, search, min/max, and 3-case deletion (in-order successor).
   - Advanced BST: Validation (min/max bounds), closest value search, AVL trees (rotations: LL, RR, LR, RL), and Red-Black properties.
2. **Binary Heaps & Priority Queues:**
   - Complete binary tree array representation: Parent $\lfloor(i-1)/2\rfloor$, Left $2i+1$, Right $2i+2$.
   - Max-Heap vs. Min-Heap order properties.
   - Operations: $O(1)$ peek, $O(\log n)$ insertion (`bubbleUp`), $O(\log n)$ deletion (`bubbleDown`).
   - The $O(n)$ Bottom-Up `buildHeap` algorithm proof.
   - In-place Heap Sort ($O(n \log n)$ time, $O(1)$ space).
   - Priority Queue implementation.
3. **Tries (Prefix Trees):**
   - Node architecture: Children maps and `isEnd` flags.
   - String insertion, exact search, and prefix matching in $O(L)$ time.
   - Autocomplete / suggestion engine via DFS prefix traversal.
   - Memory cleanup on deletion; Trie vs. Hash Table trade-offs; Radix Trees.
4. **Graphs:**
   - Formal definition ($G = (V, E)$), directed vs. undirected, weighted vs. unweighted, cyclic vs. DAGs.
   - Representations: Adjacency List (`Map` + `Set`) vs. Adjacency Matrix (2D array).
   - Traversals: BFS (shortest path in unweighted graph) and DFS (recursive and iterative stack).
   - Advanced Algorithms: Cycle detection (parent tracking in undirected, 3-color in directed), Topological Sorting (Kahn's algorithm with in-degrees), Dijkstra's shortest path (non-negative weights), and Bellman-Ford (negative weights & negative cycles).

### Practical Checklists & Repository Code Links
- [x] General Tree, Binary Tree, and Recursive/Iterative BST: [Tree Guide](../Tree/README.md)
- [x] Max-Heap and Min-Heap with $O(n)$ buildHeap: [Heap Guide](../Heap/README.md)
- [x] Prefix Trie with autocomplete and recursive deletion: [Trie Guide](../Trie/README.md)
- [x] Directed, Undirected, Matrix, and Weighted Graphs: [Graph Guide](../Graph/README.md)

---

## The Structured Technical Interview Methodology

When solving DSA problems in live technical interviews, follow this proven 4-step framework:

### Step 1: Clarification & Constraint Gathering (5 Minutes)
- **Inputs & Outputs:** What are the parameter types? Can inputs be empty, null, or negative?
- **Data Scale ($N$):** If $N \le 10^3$, an $O(N^2)$ solution passes. If $N \le 10^5$, an $O(N \log N)$ or $O(N)$ solution is required. If $N \le 10^{18}$, consider $O(\log N)$ binary search or mathematical closed form.
- **Duplicates & Casing:** Are there duplicate values? Are strings case-sensitive?

### Step 2: Brute Force & Optimization Brainstorm (5-10 Minutes)
- State the naive brute-force approach first to establish a baseline (e.g., nested loops $O(n^2)$).
- Identify the bottleneck: Can a Hash Map trade space for time? Can two pointers eliminate a loop? Can sorting enable binary search?
- Align on time and space complexities with the interviewer **before typing code**.

### Step 3: Clean Implementation (15-20 Minutes)
- Write modular, self-documenting code.
- Use descriptive variable names (`left`, `right`, `slow`, `fast`, `inDegree`).
- Handle base cases and edge conditions early (early exit guards).

### Step 4: Dry-Run, Verification & Complexity Analysis (5 Minutes)
- Walk through a concrete example with a pen-and-paper trace table.
- Test boundary conditions (empty input, single element, extreme targets).
- State final Big-O time and space complexities clearly.

---

## Study Timeline & Time-Allocation Strategy

| Week | Focus Area | Recommended Daily Schedule | Target Milestones |
| :---: | :--- | :--- | :--- |
| **Week 1** | DS-1: Linear Structures & Recursion | 2 hrs theory + 3 hrs coding | 15 problems across Arrays, Strings, Linked Lists, Stacks, Queues |
| **Week 2** | DS-2: Sorting & Hash Tables | 2 hrs theory + 3 hrs coding | Master 5 sorting algorithms; build collision-handling Hash Tables |
| **Week 3** | DS-3: Trees, Heaps, Tries & Graphs | 2.5 hrs theory + 3.5 hrs coding | Implement BST with deletion, Min/Max Heap, Trie autocomplete, Graph BFS/DFS |
| **Week 4** | Integration & Mock Drills | 1 hr review + 4 hrs timed drills | Solve 25 medium/hard LeetCode problems using [ALL_TEST](../ALL_TEST/README.md) |

---

## Directory Navigation

- [Array Documentation](../Array/README.md)
- [String Documentation](../String/README.md)
- [Linked List Documentation](../LinkedList/README.md)
- [Stack Documentation](../Stack/README.md)
- [Queue Documentation](../Queue/README.md)
- [Hash Map Documentation](../HashMap/README.md)
- [Tree Documentation](../Tree/README.md)
- [Heap Documentation](../Heap/README.md)
- [Trie Documentation](../Trie/README.md)
- [Graph Documentation](../Graph/README.md)
- [Recursion Documentation](../Recursion/README.md)
- [Search Documentation](../Search/README.md)
- [Sort Documentation](../Sort/README.md)
- [Test Suites & Drills](../ALL_TEST/README.md)

