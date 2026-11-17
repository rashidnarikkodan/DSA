# Linked Lists in JavaScript

A complete, practical guide to Singly Linked Lists, Doubly Linked Lists, and Circular Linked Lists, covering pointer mechanics, time/space trade-offs, core algorithms, and interview mastery.

---

## Table of Contents
1. [Introduction](#introduction)
2. [Linked List vs. Array Comparison](#linked-list-vs-array-comparison)
3. [Types of Linked Lists](#types-of-linked-lists)
   - [Singly Linked List](#singly-linked-list)
   - [Doubly Linked List](#doubly-linked-list)
   - [Circular Linked List](#circular-linked-list)
4. [Time and Space Complexities](#time-and-space-complexities)
5. [Folder Implementation Guide](#folder-implementation-guide)
   - [Overview of Existing Files](#overview-of-existing-files)
   - [Code Breakdown](#code-breakdown)
6. [Core Algorithms & Techniques](#core-algorithms--techniques)
   - [1. In-Place Reversal (Three-Pointer Technique)](#1-in-place-reversal-three-pointer-technique)
   - [2. Finding the Middle Node (Fast & Slow Pointers)](#2-finding-the-middle-node-fast--slow-pointers)
   - [3. Floyd's Cycle Detection (Tortoise and Hare)](#3-floyds-cycle-detection-tortoise-and-hare)
   - [4. Merging Two Sorted Linked Lists](#4-merging-two-sorted-linked-lists)
   - [5. Removing Duplicates](#5-removing-duplicates)
7. [Visualizations](#visualizations)
8. [Common Interview Questions & Edge Cases](#common-interview-questions--edge-cases)
9. [Practice Problems (Beginner to Advanced)](#practice-problems-beginner-to-advanced)
10. [Related Topics](#related-topics)

---

## Introduction

A **Linked List** is a linear collection of data elements whose order is not given by their physical placement in memory. Instead, each element (called a **Node**) contains two parts:
1. **Data / Value:** The payload stored in the node.
2. **Next Pointer / Reference:** An address or reference pointing to the next node in the sequence.

Unlike contiguous arrays, linked list nodes can be scattered across the memory heap. Nodes are linked together dynamically at runtime using object references.

---

## Linked List vs. Array Comparison

| Metric | Array | Singly Linked List | Doubly Linked List |
| :--- | :---: | :---: | :---: |
| **Access by Index ($k$)** | $O(1)$ | $O(n)$ | $O(n)$ |
| **Insert at Beginning** | $O(n)$ (shift required) | $O(1)$ | $O(1)$ |
| **Insert at End (with tail pointer)** | $O(1)$ amortized | $O(1)$ | $O(1)$ |
| **Delete from Beginning** | $O(n)$ (shift required) | $O(1)$ | $O(1)$ |
| **Delete from End** | $O(1)$ | $O(n)$ (must reach node before tail) | $O(1)$ (using `tail.prev`) |
| **Insert / Delete at Given Node** | $O(n)$ | $O(1)$ (if pointer to predecessor is known) | $O(1)$ |
| **Memory Overhead** | Low (values only) | Medium (extra `next` pointer per node) | High (extra `next` + `prev` pointers) |
| **Cache Locality** | Excellent (contiguous memory) | Poor (scattered heap allocations) | Poor (scattered heap allocations) |
| **Dynamic Resizing** | Buffer copy required | Instant node allocation | Instant node allocation |

---

## Types of Linked Lists

### Singly Linked List
Each node points only forward to its successor (`next`). The final node points to `null`.
```
[ Head: 10 | next ] --> [ 20 | next ] --> [ 30 | next ] --> null
```

### Doubly Linked List
Each node has two references: `next` pointing forward and `prev` pointing backward.
```
null <-- [ prev | 10 | next ] <===> [ prev | 20 | next ] <===> [ prev | 30 | next ] --> null
```

### Circular Linked List
The last node’s `next` pointer references back to the `head` node rather than `null`.
```
[ Head: 10 | next ] --> [ 20 | next ] --> [ 30 | next ]
         ^                                        |
         \----------------------------------------/
```

---

## Time and Space Complexities

| Operation | Singly Linked List (with Tail) | Doubly Linked List (with Tail) | Space Complexity |
| :--- | :---: | :---: | :---: |
| **Prepend (Insert Head)** | $O(1)$ | $O(1)$ | $O(1)$ |
| **Append (Insert Tail)** | $O(1)$ | $O(1)$ | $O(1)$ |
| **Insert at Index $k$** | $O(n)$ | $O(n)$ | $O(1)$ |
| **Delete Head** | $O(1)$ | $O(1)$ | $O(1)$ |
| **Delete Tail** | $O(n)$ | $O(1)$ | $O(1)$ |
| **Delete by Value / Index** | $O(n)$ | $O(n)$ | $O(1)$ |
| **Search / Find** | $O(n)$ | $O(n)$ | $O(1)$ |
| **Traversal / Print** | $O(n)$ | $O(n)$ | $O(1)$ |

---

## Folder Implementation Guide

### Overview of Existing Files

- **[doubleList.js](./doubleList.js)**: A comprehensive singly linked list implementation equipped with both `head` and `tail` pointers:
  - Insertion: `prepend`, `append`, `insertAt`, `insertAfter`, `insertBefore`.
  - Deletion: `deleteStart`, `deleteEnd`, `deleteByValue`, `deleteByIndex`.
  - Utilities: `removeDupl`, `sort` (in-place bubble sort swapping node values), `findByIndex`, `length`, `print`, and recursive `reverse` print.
- **[linkedlist1.js](./linkedlist1.js)**: Singly linked list with iterative in-place pointer reversal (`reverse`), index removal, append, and print methods.
- **[linkedlist.js](./linkedlist.js)**: Circular linked list (`CircularList`) implementation where `tail.next = this.head`.

---

## Core Algorithms & Techniques

### 1. In-Place Reversal (Three-Pointer Technique)

Reversing a singly linked list in $O(n)$ time and $O(1)$ auxiliary space without creating new nodes.

```javascript
class Node {
  constructor(val) {
    this.value = val;
    this.next = null;
  }
}

function reverseLinkedList(head) {
  let prev = null;
  let current = head;
  let next = null;

  while (current !== null) {
    next = current.next; // 1. Save reference to next node
    current.next = prev; // 2. Reverse pointer to previous node
    prev = current;      // 3. Move prev forward
    current = next;      // 4. Move current forward
  }

  return prev; // New head of the reversed list
}
```

---

### 2. Finding the Middle Node (Fast & Slow Pointers)

Using two pointers moving at different speeds: `slow` advances $1$ step while `fast` advances $2$ steps. When `fast` reaches the end, `slow` is at the midpoint.

```javascript
function findMiddleNode(head) {
  let slow = head;
  let fast = head;

  while (fast !== null && fast.next !== null) {
    slow = slow.next;
    fast = fast.next.next;
  }

  return slow; // Points to middle node
}
```

---

### 3. Floyd's Cycle Detection (Tortoise and Hare)

Detects whether a linked list contains a cycle in $O(n)$ time and $O(1)$ space.

```javascript
function hasCycle(head) {
  if (!head || !head.next) return false;

  let slow = head;
  let fast = head;

  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;

    if (slow === fast) {
      return true; // Cycle detected
    }
  }

  return false; // Reached null, no cycle
}

// Find where cycle begins
function detectCycleStart(head) {
  let slow = head;
  let fast = head;
  let hasLoop = false;

  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) {
      hasLoop = true;
      break;
    }
  }

  if (!hasLoop) return null;

  // Reset slow to head; advance both 1 step until they meet
  slow = head;
  while (slow !== fast) {
    slow = slow.next;
    fast = fast.next;
  }

  return slow; // Start of cycle
}
```

---

### 4. Merging Two Sorted Linked Lists

Merges two sorted lists into one sorted list in $O(n + m)$ time.

```javascript
function mergeTwoLists(l1, l2) {
  const dummy = new Node(0);
  let tail = dummy;

  while (l1 && l2) {
    if (l1.value <= l2.value) {
      tail.next = l1;
      l1 = l1.next;
    } else {
      tail.next = l2;
      l2 = l2.next;
    }
    tail = tail.next;
  }

  tail.next = l1 ? l1 : l2;
  return dummy.next;
}
```

---

### 5. Removing Duplicates

#### From a Sorted List ($O(n)$ Time, $O(1)$ Space)
```javascript
function deleteDuplicatesSorted(head) {
  let current = head;
  while (current && current.next) {
    if (current.value === current.next.value) {
      current.next = current.next.next; // Skip duplicate
    } else {
      current = current.next;
    }
  }
  return head;
}
```

#### From an Unsorted List ($O(n)$ Time, $O(n)$ Space with `Set`)
```javascript
function deleteDuplicatesUnsorted(head) {
  if (!head) return null;
  const seen = new Set([head.value]);
  let current = head;

  while (current.next) {
    if (seen.has(current.next.value)) {
      current.next = current.next.next;
    } else {
      seen.add(current.next.value);
      current = current.next;
    }
  }
  return head;
}
```

---

## Visualizations

### Three-Pointer In-Place Reversal Step-by-Step

```
Initial:
null    [ 1 ] ---> [ 2 ] ---> [ 3 ] ---> null
 ^        ^          ^
prev    curr       next

Step 1: curr.next = prev; prev = curr; curr = next;
null <-- [ 1 ]      [ 2 ] ---> [ 3 ] ---> null
           ^          ^          ^
          prev       curr       next

Step 2: curr.next = prev; prev = curr; curr = next;
null <-- [ 1 ] <--- [ 2 ]      [ 3 ] ---> null
                      ^          ^
                     prev       curr

Step 3: curr.next = prev; prev = curr; curr = next;
null <-- [ 1 ] <--- [ 2 ] <--- [ 3 ]     null
                                 ^         ^
                                prev     curr (null)
Result: prev is the new Head: [ 3 ] -> [ 2 ] -> [ 1 ] -> null
```

---

## Common Interview Questions & Edge Cases

### Top Questions
1. **Reverse a Linked List:** Iterative and recursive solutions.
2. **Detect and Remove Loop:** Floyd's cycle detection.
3. **Remove N-th Node From End of List:** Two-pointer gap of $N$ nodes.
4. **Palindrome Linked List:** Find middle, reverse second half, compare both halves.
5. **Intersection of Two Linked Lists:** Advance pointers through both lists; they align at intersection.
6. **LRU Cache Implementation:** Uses a Doubly Linked List + Hash Map for $O(1)$ get and put.

### Edge Cases Checklist
- **Empty List (`head === null`):** Ensure operations gracefully return `null` without throwing `TypeError: Cannot read properties of null`.
- **Single Node (`head.next === null`):** Middle is the head; reversing yields the head; deleting the head empties the list.
- **Two Nodes:** Boundary case for midpoint calculations and two-pointer loops.
- **Deleting the Head Node:** Must update `this.head = this.head.next`.
- **Deleting the Tail Node:** In a singly list, requires traversing to the $(n-1)$-th node to update its pointer to `null`.
- **Loops & Cycles:** Can cause infinite loops if traversal condition assumes `current !== null`.

---

## Practice Problems (Beginner to Advanced)

### Level 1: Beginner
- [ ] Implement a Singly Linked List with `append`, `prepend`, and `delete`.
- [ ] Calculate the length of a linked list (iteratively and recursively).
- [ ] Search for a value in a linked list.
- [ ] Delete node by value.

### Level 2: Intermediate
- [ ] **Reverse Linked List:** In-place three-pointer reversal.
- [ ] **Middle of the Linked List:** Slow and fast pointer technique.
- [ ] **Delete N-th Node From End:** One-pass two-pointer solution.
- [ ] **Merge Two Sorted Lists:** Merge without allocating new nodes.
- [ ] **Linked List Cycle:** Floyd's Tortoise and Hare algorithm.
- [ ] **Palindrome Linked List:** $O(n)$ time and $O(1)$ space.

### Level 3: Advanced
- [ ] **Linked List Cycle II:** Find the exact node where cycle begins.
- [ ] **Merge K Sorted Lists:** Using Min-Heap or divide-and-conquer.
- [ ] **Reverse Nodes in k-Group:** Reverse segments of length $k$.
- [ ] **Copy List with Random Pointer:** Deep clone with random references.
- [ ] **LRU Cache:** Combine Doubly Linked List with Hash Map for $O(1)$ operations.

---

## Related Topics

- [Stack Documentation](../Stack/README.md) - Stacks implemented using linked lists.
- [Queue Documentation](../Queue/README.md) - Queues implemented using linked lists for $O(1)$ dequeue.
- [Array Documentation](../Array/README.md) - Comparing memory layout and random access between arrays and lists.
- [Hash Map Documentation](../HashMap/README.md) - Separate chaining collision resolution using linked list buckets.

