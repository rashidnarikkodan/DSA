# Hash Maps & Hash Tables in JavaScript

A comprehensive reference for Hash Tables, Hash Functions, Collision Resolution strategies (Chaining, Linear Probing, Double Hashing), Load Factors, dynamic resizing, and interview problem-solving.

---

## Table of Contents
1. [Introduction](#introduction)
2. [How Hash Tables Work](#how-hash-tables-work)
   - [Direct Addressing vs. Hashing](#direct-addressing-vs-hashing)
   - [Hash Functions & Properties](#hash-functions--properties)
   - [Common Hash Function Methods](#common-hash-function-methods)
3. [Collision Resolution Strategies](#collision-resolution-strategies)
   - [1. Separate Chaining (Array & Linked List)](#1-separate-chaining-array--linked-list)
   - [2. Open Addressing (Linear Probing, Quadratic Probing, Double Hashing)](#2-open-addressing-linear-probing-quadratic-probing-double-hashing)
   - [The Tombstone Problem in Open Addressing](#the-tombstone-problem-in-open-addressing)
4. [Load Factor & Dynamic Resizing (Rehashing)](#load-factor--dynamic-resizing-rehashing)
5. [Time and Space Complexities](#time-and-space-complexities)
6. [JavaScript Native Map vs. Plain Object vs. Custom Hash Table](#javascript-native-map-vs-plain-object-vs-custom-hash-table)
7. [Folder Implementation Guide](#folder-implementation-guide)
   - [1-hash_map.js (Basic Table)](#1-hash_mapjs)
   - [2-sep_chaining_array.js (Chaining with Arrays)](#2-sep_chaining_arrayjs)
   - [3-sep_chaining_linked.js (Chaining with Linked Lists)](#3-sep_chaining_linkedjs)
   - [4-linear_probing.js (Open Addressing with Resizing)](#4-linear_probingjs)
   - [5-hash_methods.js (Hash Functions)](#5-hash_methodsjs)
   - [6-first_non_repeat.js (Practical Applications)](#6-first_non_repeatjs)
8. [Visualizations](#visualizations)
9. [Common Interview Questions & Edge Cases](#common-interview-questions--edge-cases)
10. [Practice Problems (Beginner to Advanced)](#practice-problems-beginner-to-advanced)
11. [Related Topics](#related-topics)

---

## Introduction

A **Hash Table** (or **Hash Map**) is a data structure that implements an associative array abstract data type, mapping **keys to values**. It achieves an **average time complexity of $O(1)$** for insertions, lookups, and deletions.

Under the hood, a hash table uses a **Hash Function** to convert arbitrary keys (strings, numbers, objects) into numerical indices within an underlying array of fixed capacity (buckets).

---

## How Hash Tables Work

### Direct Addressing vs. Hashing
- **Direct Addressing:** Uses the key itself as the array index. If keys are integers from $0$ to $999$, an array of size $1000$ provides immediate $O(1)$ access. However, if keys are strings (e.g., usernames) or sparse numbers ($1$ to $10^{12}$), direct addressing would require impossible amounts of memory.
- **Hashing:** Maps an infinite universe of potential keys into a bounded array of size $m$ using a mathematical function: $\text{Index} = \text{Hash}(\text{Key}) \pmod m$.

### Hash Functions & Properties
A good hash function must satisfy:
1. **Deterministic:** The same key must always produce the identical hash value.
2. **Uniform Distribution:** Keys must spread evenly across all buckets to minimize collisions.
3. **Fast Computation:** Must execute in $O(L)$ time where $L$ is the key length.
4. **Minimizes Clustering:** Small changes in the key should produce vastly different hash codes (avalanche effect).

### Common Hash Function Methods
As detailed in **[5-hash_methods.js](./5-hash_methods.js)**:

1. **Division Method:**
   $$\text{Hash}(k) = k \pmod m$$
   Fast and simple. $m$ is best chosen as a **prime number** not close to a power of $2$ to distribute remainder patterns evenly.
2. **Multiplication Method (Knuth's Golden Ratio):**
   $$\text{Hash}(k) = \lfloor m \times (k \times A \pmod 1) \rfloor \quad \text{where } A \approx \frac{\sqrt{5} - 1}{2} \approx 0.6180339887$$
3. **Folding Method:** The key is split into chunks, the chunks are summed, and the sum is moduloed by $m$.
4. **Polynomial Rolling Hash (DJB2):** The industry standard for string hashing:
   ```javascript
   function djb2Hash(key, size) {
     let hash = 5381;
     for (let i = 0; i < key.length; i++) {
       hash = ((hash << 5) + hash) + key.charCodeAt(i); // hash * 33 + char
       hash |= 0; // Convert to 32bit integer
     }
     return Math.abs(hash) % size;
   }
   ```

---

## Collision Resolution Strategies

Because the number of potential keys exceeds the number of table buckets, two distinct keys will inevitably map to the same bucket index (the **Pigeonhole Principle**). This is a **Collision**.

```
Hash("name")   ===> Index 3  \___ COLLISION!
Hash("gender") ===> Index 3  /
```

### 1. Separate Chaining (Array & Linked List)

Each bucket in the table holds a collection (chain) of entries that hashed to that index.

- **Chaining with Arrays ([2-sep_chaining_array.js](./2-sep_chaining_array.js)):** Bucket holds an array of `[key, value]` pairs (`[[k1, v1], [k2, v2]]`).
- **Chaining with Linked Lists ([3-sep_chaining_linked.js](./3-sep_chaining_linked.js)):** Bucket points to the head node of a singly linked list. When a collision occurs, a new node is appended to the chain.
  - **Advantage:** Never runs out of space; degrades gracefully.
  - **Disadvantage:** Pointers incur memory overhead and cache misses.

### 2. Open Addressing (Linear Probing, Quadratic Probing, Double Hashing)

All entries reside directly within the bucket array. If bucket $\text{Hash}(k)$ is occupied, the algorithm probes alternative slots until an empty slot is located.

1. **Linear Probing ([4-linear_probing.js](./4-linear_probing.js)):**
   $$\text{Probe}(k, i) = (\text{Hash}(k) + i) \pmod m \quad \text{for } i = 0, 1, 2, \dots$$
   - Check bucket $h$, then $h+1$, $h+2$, wrapping to $0$.
   - **Flaw (Primary Clustering):** Long contiguous blocks of occupied slots build up, drastically slowing subsequent insertions and lookups.
2. **Quadratic Probing:**
   $$\text{Probe}(k, i) = (\text{Hash}(k) + c_1 i + c_2 i^2) \pmod m$$
   - Spreads out probes quadratically ($h, h+1, h+4, h+9 \dots$), mitigating primary clustering.
3. **Double Hashing:**
   $$\text{Probe}(k, i) = (\text{Hash}_1(k) + i \times \text{Hash}_2(k)) \pmod m$$
   - Uses a second hash function as the stride step. Offers the best uniform distribution among open addressing schemes.

### The Tombstone Problem in Open Addressing
When deleting a key in linear probing, you cannot simply set `table[index] = null`. Doing so would break the search chain for subsequent keys that collided at that hash and probed beyond that index! Instead, a **Tombstone marker** (`DELETED`) is inserted so search algorithms continue probing while insertions can safely overwrite the slot.

---

## Load Factor & Dynamic Resizing (Rehashing)

The **Load Factor** ($\alpha$) measures how full the hash table is:

$$\alpha = \frac{n}{k} = \frac{\text{Number of Stored Entries}}{\text{Total Bucket Capacity}}$$

- For **Separate Chaining**, $\alpha$ can exceed $1.0$, but lookup times increase linearly as chains lengthen.
- For **Open Addressing**, $\alpha$ must remain below $0.7$ to $0.8$ to prevent catastrophic clustering.

### Dynamic Resizing (Rehashing)
When $\alpha \ge 0.75$:
1. Allocate a new table with double capacity ($2 \times \text{oldSize}$, ideally a prime number).
2. Rehash every existing key into the new table. (Indices change because $m$ changed!).
3. Resizing takes $O(n)$ time, but happens exponentially infrequently, preserving **amortized $O(1)$** insertion time.

---

## Time and Space Complexities

| Operation | Average Case | Worst Case (All Collide) | Space Complexity |
| :--- | :---: | :---: | :---: |
| **Insert / Set** | $O(1)$ | $O(n)$ | $O(n)$ |
| **Lookup / Get** | $O(1)$ | $O(n)$ | $O(1)$ |
| **Delete / Remove** | $O(1)$ | $O(n)$ | $O(1)$ |
| **Rehashing / Resize** | $O(n)$ | $O(n)$ | $O(n)$ |

---

## JavaScript Native Map vs. Plain Object vs. Custom Hash Table

| Feature | Plain JavaScript Object (`{}`) | JavaScript `Map` | Custom Hash Table |
| :--- | :--- | :--- | :--- |
| **Key Types** | Strings and Symbols only | Any type (objects, functions, primitives) | Whatever hash function supports |
| **Key Ordering** | Complex integer/string iteration | Insertion order strictly preserved | Dependent on hash bucketing |
| **Size Tracking** | Manual `Object.keys(obj).length` ($O(n)$) | `map.size` property ($O(1)$) | Tracked `this.size` variable |
| **Default Keys** | Inherits `Object.prototype` properties | Clean, contains no default keys | Clean custom buckets |
| **Optimization** | Fast property access via V8 Hidden Classes | Optimized hash table internally in C++ | Pedagogical control over collision logic |

---

## Folder Implementation Guide

- **[1-hash_map.js](./1-hash_map.js)**: Baseline hash table demonstrating direct index calculation using character code summation modulo table length. Demonstrates the collision overwriting issue.
- **[2-sep_chaining_array.js](./2-sep_chaining_array.js)**: Resolves collisions by assigning an array bucket at each index to store multiple `[key, value]` pairs.
- **[3-sep_chaining_linked.js](./3-sep_chaining_linked.js)**: Resolves collisions using linked list nodes (`Node { key, value, next }`), illustrating pointer-based bucket chaining.
- **[4-linear_probing.js](./4-linear_probing.js)**: Open addressing using sequential index probing `(index + 1) % table.length` and dynamic table doubling (`_resize()`).
- **[5-hash_methods.js](./5-hash_methods.js)**: Compares division and multiplication hashing formulas.
- **[6-first_non_repeat.js](./6-first_non_repeat.js)**: Practical applications:
  - Finding first non-repeating character via frequency mapping.
  - Grouping anagrams by sorting words into hash keys.

---

## Visualizations

### Separate Chaining vs. Linear Probing

```
=== Separate Chaining ===
Index:
 [0] -> null
 [1] -> [ "apple": 5 ] -> [ "peach": 2 ] -> null  (Collision chained)
 [2] -> null
 [3] -> [ "banana": 8 ] -> null
 [4] -> [ "grape": 12 ] -> null

=== Linear Probing (Open Addressing) ===
Index:
 [0]  null
 [1]  [ "apple": 5 ]     <- Hashed to 1
 [2]  [ "peach": 2 ]     <- Hashed to 1, probed to 2
 [3]  [ "banana": 8 ]    <- Hashed to 3
 [4]  [ "grape": 12 ]    <- Hashed to 3, probed to 4
```

---

## Common Interview Questions & Edge Cases

### Top Questions
1. **Two Sum:** Use a hash map of complements to solve in $O(n)$ time.
2. **Group Anagrams:** Group strings by sorted key or character frequency fingerprint.
3. **Subarray Sum Equals K:** Track running prefix sums in a frequency map ($O(n)$ time).
4. **LRU Cache:** Combine a Doubly Linked List with a Hash Map for $O(1)$ operations.
5. **Longest Consecutive Sequence:** Solve in $O(n)$ time using a `Set`.

### Edge Cases Checklist
- **Hash Collisions:** Always test inserting keys that produce identical hash codes (e.g., `"cars"` and `"arcs"`).
- **Overwriting Existing Keys:** Setting an existing key must update its value, not append duplicate keys.
- **Table Full in Open Addressing:** Avoid infinite loops by triggering resize before $\alpha = 1.0$.
- **Non-Existent Keys:** `get()` on missing keys must cleanly return `undefined` or `null`.
- **Negative Hash Codes:** Bitwise integer operations can produce negative numbers in JS; always normalize with `Math.abs()` or unsigned right shift `>>> 0`.

---

## Practice Problems (Beginner to Advanced)

### Level 1: Beginner
- [ ] Implement a Hash Table with Separate Chaining.
- [ ] Count character frequencies in a string.
- [ ] Check if an array contains duplicates.
- [ ] Find the first non-repeating character in a string.

### Level 2: Intermediate
- [ ] **Two Sum:** Solve in single pass $O(n)$ using complement hash lookup.
- [ ] **Group Anagrams:** Group strings by hash representation.
- [ ] **Intersection of Two Arrays:** Find common elements using a frequency set.
- [ ] **Isomorphic Strings:** Character-to-character mapping validation.
- [ ] **Subarray Sum Equals K:** Prefix sums stored in a hash map.

### Level 3: Advanced
- [ ] **Design LRU Cache:** $O(1)$ get and put using Doubly Linked List + Map.
- [ ] **Longest Consecutive Sequence:** Unsorted array consecutive streaks in $O(n)$ time.
- [ ] **Minimum Window Substring:** Hash map character inventory with sliding window.
- [ ] **Insert Delete GetRandom O(1):** Array + Hash Map index tracking.

---

## Related Topics

- [Array Documentation](../Array/README.md) - Underlying storage buckets for hash tables.
- [Linked List Documentation](../LinkedList/README.md) - Chained collision buckets and LRU cache structures.
- [String Documentation](../String/README.md) - String hashing algorithms (DJB2, polynomial rolling).
- [Trie Documentation](../Trie/README.md) - Prefix tree alternative for string-keyed dictionaries.

