# Queues in JavaScript

A comprehensive learning guide to Queues, the FIFO principle, queue implementations (Array, Linked List, Dual Stacks, Circular Buffer, Deque), and graph/tree search applications.

---

## Table of Contents
1. [Introduction](#introduction)
2. [Core Concepts](#core-concepts)
   - [The FIFO Principle](#the-fifo-principle)
   - [The JavaScript `arr.shift()` Performance Trap](#the-javascript-arrshift-performance-trap)
   - [Types of Queues](#types-of-queues)
3. [Time and Space Complexities](#time-and-space-complexities)
4. [Folder Implementation Guide](#folder-implementation-guide)
   - [1. Array-Based Queue](#1-array-based-queue)
   - [2. Linked List-Based Queue](#2-linked-list-based-queue)
   - [3. Queue Implemented Using Two Stacks](#3-queue-implemented-using-two-stacks)
5. [Advanced Queue Architectures](#advanced-queue-architectures)
   - [Circular Queue (Ring Buffer)](#circular-queue-ring-buffer)
   - [Double-Ended Queue (Deque)](#double-ended-queue-deque)
6. [Core Algorithms & Applications](#core-algorithms--applications)
   - [1. Breadth-First Search (BFS) Traversal Engine](#1-breadth-first-search-bfs-traversal-engine)
   - [2. Sliding Window Maximum (Monotonic Deque)](#2-sliding-window-maximum-monotonic-deque)
7. [Visualizations](#visualizations)
8. [Common Interview Questions & Edge Cases](#common-interview-questions--edge-cases)
9. [Practice Problems (Beginner to Advanced)](#practice-problems-beginner-to-advanced)
10. [Related Topics](#related-topics)

---

## Introduction

A **Queue** is a linear data structure that operates on the **FIFO (First In, First Out)** principle. The first item inserted into the queue is the first item removed.

Real-world analogies include:
- A queue of people waiting at an airport ticket counter.
- A print spooler servicing print requests in the order received.
- Node.js event loop task and microtask queues.
- Web server request throttling and background job workers (e.g., BullMQ, RabbitMQ).

---

## Core Concepts

### The FIFO Principle
Data enters through the **Rear / Back** (Enqueue) and exits through the **Front / Head** (Dequeue).

```
Enqueue (Rear) ===> [ E ] [ D ] [ C ] [ B ] [ A ] ===> Dequeue (Front)
```

### The JavaScript `arr.shift()` Performance Trap
In JavaScript, developers often implement queues using arrays:
```javascript
queue.push(item); // Enqueue: O(1)
queue.shift();     // Dequeue: O(n) <-- DANGER!
```
Every call to `shift()` removes index $0$ and forces the engine to **shift all remaining $n - 1$ elements one index to the left**. In high-volume systems or algorithms with $n$ elements, this degrades overall runtime from $O(n)$ to $O(n^2)$.

> [!IMPORTANT]
> For production-grade queues and optimal interview performance, always use a **Linked List** or an **Object with tracking pointer indices** to achieve true $O(1)$ dequeues.

### Types of Queues
1. **Simple Queue (Linear Queue):** Enqueue at rear, dequeue at front.
2. **Circular Queue (Ring Buffer):** The rear wraps around to the front when capacity is reached, preventing memory waste.
3. **Double-Ended Queue (Deque):** Allows insertion and deletion at both front and rear.
4. **Priority Queue:** Each element has an associated priority; elements with highest priority are dequeued first regardless of arrival order (backed by Heaps).

---

## Time and Space Complexities

| Operation | Array with `shift()` | Linked List Queue | Queue with Two Stacks | Circular Queue |
| :--- | :---: | :---: | :---: | :---: |
| **`enqueue()`** | $O(1)$ amortized | $O(1)$ | $O(1)$ | $O(1)$ |
| **`dequeue()`** | $O(n)$ | $O(1)$ | Amortized $O(1)$ | $O(1)$ |
| **`front()` / `peek()`** | $O(1)$ | $O(1)$ | Amortized $O(1)$ | $O(1)$ |
| **`isEmpty()`** | $O(1)$ | $O(1)$ | $O(1)$ | $O(1)$ |
| **Space Complexity** | $O(n)$ | $O(n)$ | $O(n)$ | $O(k)$ (fixed size) |

---

## Folder Implementation Guide

### 1. Array-Based Queue
Defined in **[1-queue.js](./1-queue.js)**:
- Straightforward implementation using array `push` and `shift`.
- Includes comments highlighting the $O(n)$ dequeue bottleneck and motivating linked list / dual stack alternatives.

### 2. Linked List-Based Queue
Defined in **[2-queueLinkedList.js](./2-queueLinkedList.js)**:
- Features `first` (front) and `last` (rear) pointers.
- **Enqueue:** Appends a new node to `this.last.next`, updating `this.last` in $O(1)$ time.
- **Dequeue:** Advances `this.first = this.first.next` in $O(1)$ time.

```javascript
class Node {
  constructor(val) {
    this.value = val;
    this.next = null;
  }
}

class LinkedListQueue {
  constructor() {
    this.first = null;
    this.last = null;
    this.length = 0;
  }

  enqueue(val) {
    const node = new Node(val);
    if (!this.first) {
      this.first = this.last = node;
    } else {
      this.last.next = node;
      this.last = node;
    }
    this.length++;
  }

  dequeue() {
    if (!this.first) return null;
    const val = this.first.value;
    this.first = this.first.next;
    if (!this.first) this.last = null;
    this.length--;
    return val;
  }
}
```

### 3. Queue Implemented Using Two Stacks
Defined in **[3-queue_using_stack.js](./3-queue_using_stack.js)**:
- Emulates FIFO behavior using two LIFO stacks:
  - `stack1` (Input Stack): Receives incoming elements (`enqueue`).
  - `stack2` (Output Stack): Serves `dequeue` and `front`.
- When `stack2` is empty, all elements from `stack1` are popped and pushed into `stack2`, reversing their order to restore FIFO!
- Each element is moved between stacks at most once, guaranteeing **Amortized $O(1)$** performance per operation.

---

## Advanced Queue Architectures

### Circular Queue (Ring Buffer)

A fixed-size array where pointers wrap around using the modulo operator `(index + 1) % capacity`.

```javascript
class CircularQueue {
  constructor(k) {
    this.capacity = k;
    this.queue = new Array(k);
    this.head = -1;
    this.tail = -1;
  }

  enqueue(value) {
    if (this.isFull()) return false;
    if (this.isEmpty()) this.head = 0;
    this.tail = (this.tail + 1) % this.capacity;
    this.queue[this.tail] = value;
    return true;
  }

  dequeue() {
    if (this.isEmpty()) return false;
    if (this.head === this.tail) {
      this.head = -1;
      this.tail = -1;
    } else {
      this.head = (this.head + 1) % this.capacity;
    }
    return true;
  }

  front() {
    return this.isEmpty() ? -1 : this.queue[this.head];
  }

  rear() {
    return this.isEmpty() ? -1 : this.queue[this.tail];
  }

  isEmpty() {
    return this.head === -1;
  }

  isFull() {
    return (this.tail + 1) % this.capacity === this.head;
  }
}
```

### Double-Ended Queue (Deque)

Supports $O(1)$ operations at both ends (`pushFront`, `pushBack`, `popFront`, `popBack`). Crucial for sliding window algorithms and work-stealing job schedulers.

---

## Core Algorithms & Applications

### 1. Breadth-First Search (BFS) Traversal Engine

Queues form the algorithmic backbone of level-order tree traversal and finding the shortest path on unweighted graphs.

```javascript
function bfs(root) {
  if (!root) return [];
  const result = [];
  const queue = [root];

  while (queue.length > 0) {
    const current = queue.shift(); // For large graphs, use LinkedListQueue
    result.push(current.val);

    if (current.left) queue.push(current.left);
    if (current.right) queue.push(current.right);
  }

  return result;
}
```

### 2. Sliding Window Maximum (Monotonic Deque)

Finds the maximum in every sliding window of size $k$ in linear $O(n)$ time.

```javascript
function maxSlidingWindow(nums, k) {
  const deque = []; // Stores indices of candidate maximums
  const result = [];

  for (let i = 0; i < nums.length; i++) {
    // 1. Remove indices outside current sliding window
    if (deque.length > 0 && deque[0] <= i - k) {
      deque.shift();
    }

    // 2. Remove smaller elements from back of deque
    while (deque.length > 0 && nums[deque[deque.length - 1]] < nums[i]) {
      deque.pop();
    }

    deque.push(i);

    // 3. Add max of current window (element at deque[0]) to result
    if (i >= k - 1) {
      result.push(nums[deque[0]]);
    }
  }

  return result;
}

console.log(maxSlidingWindow([1, 3, -1, -3, 5, 3, 6, 7], 3)); // [3, 3, 5, 5, 6, 7]
```

---

## Visualizations

### Queue Enqueue and Dequeue Flow
```
        +-----+-----+-----+-----+
Rear -> | 40  | 30  | 20  | 10  | -> Front
        +-----+-----+-----+-----+
           |                 |
      Enqueue(50)        Dequeue() returns 10
           v                 v
        +-----+-----+-----+-----+
Rear -> | 50  | 40  | 30  | 20  | -> Front
        +-----+-----+-----+-----+
```

### Circular Queue Wrap-Around
```
Capacity = 5
Indices:   [0]    [1]    [2]    [3]    [4]
Values:  [ 50  |  60  | (free) | 30  | 40  ]
                   ^              ^
                  tail           head
Tail wrapped around to front using (tail + 1) % capacity!
```

---

## Common Interview Questions & Edge Cases

### Top Questions
1. **Implement Queue using Stacks:** LeetCode #232 (Amortized $O(1)$ operations).
2. **Design Circular Queue:** LeetCode #622.
3. **Sliding Window Maximum:** LeetCode #239 (Monotonic Deque).
4. **Rotting Oranges:** Multi-source BFS using queue.
5. **Open the Lock:** Shortest path state space search using BFS.

### Edge Cases Checklist
- **Empty Queue Dequeue:** Must return `null` or appropriate sentinel without throwing exceptions.
- **Single Element Queue:** Dequeuing must reset both `front` and `last` to `null`.
- **Capacity Overflow:** In bounded circular queues, reject enqueues when `isFull() === true`.
- **Lazy Transfer in Dual Stacks:** Only transfer elements from `stack1` to `stack2` when `stack2` is completely empty.

---

## Practice Problems (Beginner to Advanced)

### Level 1: Beginner
- [ ] Implement an Array-based Queue.
- [ ] Implement a Linked List-based Queue.
- [ ] Reverse the first $K$ elements of a queue.
- [ ] Generate binary numbers from $1$ to $N$ using a queue.

### Level 2: Intermediate
- [ ] **Implement Queue using Stacks:** Dual stack with amortized analysis.
- [ ] **Design Circular Queue:** Modulo ring buffer.
- [ ] **Moving Average from Data Stream:** Fixed-window queue.
- [ ] **Number of Recent Calls:** Timestamp queue ping tracker.
- [ ] **Level Order Traversal of Binary Tree:** BFS with queue.

### Level 3: Advanced
- [ ] **Sliding Window Maximum:** Monotonic Deque.
- [ ] **Design Circular Deque:** Double-ended circular queue.
- [ ] **Shortest Subarray with Sum at Least K:** Monotonic deque on prefix sums.
- [ ] **Task Scheduler:** Queue paired with max-heap for CPU cooldown cycles.

---

## Related Topics

- [Stack Documentation](../Stack/README.md) - LIFO counterpart and dual-stack queue implementation.
- [Linked List Documentation](../LinkedList/README.md) - Pointer-based queue implementation for $O(1)$ operations.
- [Tree Documentation](../Tree/README.md) - Breadth-First Search (BFS) and level-order tree traversals.
- [Graph Documentation](../Graph/README.md) - Shortest path algorithms on unweighted graphs using BFS.

