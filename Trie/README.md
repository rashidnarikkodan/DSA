# Tries (Prefix Trees) in JavaScript

A complete learning guide to Tries (Digital Search Trees / Prefix Trees), string prefix matching, autocomplete search engines, recursive node deletion, memory optimization, and interview problem-solving.

---

## Table of Contents
1. [Introduction](#introduction)
2. [How a Trie Works](#how-a-trie-works)
   - [Node Structure & Child Links](#node-structure--child-links)
   - [Prefix Sharing & Memory Efficiency](#prefix-sharing--memory-efficiency)
3. [Trie vs. Hash Table Comparison](#trie-vs-hash-table-comparison)
4. [Time and Space Complexities](#time-and-space-complexities)
5. [Folder Implementation Guide](#folder-implementation-guide)
   - [Detailed Walkthrough of trie.js](#detailed-walkthrough-of-triejs)
6. [Core Operations & Step-by-Step Logic](#core-operations--step-by-step-logic)
   - [1. Insertion](#1-insertion)
   - [2. Search (Exact Word Match)](#2-search-exact-word-match)
   - [3. StartsWith / Prefix Search](#3-startswith--prefix-search)
   - [4. Autocomplete / Word Suggestions (DFS Collection)](#4-autocomplete--word-suggestions-dfs-collection)
   - [5. Recursive Deletion with Garbage Cleanup](#5-recursive-deletion-with-garbage-cleanup)
7. [Visualizations](#visualizations)
8. [Advanced Topics: Compressed Tries (Radix Trees)](#advanced-topics-compressed-tries-radix-trees)
9. [Common Interview Questions & Edge Cases](#common-interview-questions--edge-cases)
10. [Practice Problems (Beginner to Advanced)](#practice-problems-beginner-to-advanced)
11. [Related Topics](#related-topics)

---

## Introduction

A **Trie** (pronounced *"try"*, derived from re**trie**val) is an $N$-ary tree specialized for storing and searching dynamic collections of strings. 

Instead of storing entire words inside individual nodes, each node represents a single character or common prefix. All descendants of a node share the prefix associated with that node, and the **root represents the empty string**.

### Real-World Applications
- **Search Engine Autocomplete:** Suggesting search queries as you type.
- **Spell Checkers & Dictionaries:** Verifying whether a word exists in a language lexicon.
- **IP Network Routing:** Longest Prefix Matching (LPM) in network routers.
- **T9 Predictive Text:** Keyboard typing prediction algorithms.
- **DNA Sequence Analysis:** Matching nucleotide genome sequences (`A`, `C`, `G`, `T`).

---

## How a Trie Works

### Node Structure & Child Links
Each node in a Trie contains:
1. **Children Collection:** Can be implemented using:
   - A JavaScript `Map` (as in **[trie.js](./trie.js)**): Handles all Unicode/arbitrary characters dynamically with low memory for sparse alphabets.
   - An Array of size $26$ (`new Array(26).fill(null)`): For fixed lowercase English alphabets ($a-z$) where child index $= \text{char.charCodeAt}(0) - 97$.
   - An Object map (`{}`).
2. **`isEnd` Flag (Boolean):** Indicates whether the sequence of characters from the root ending at this node forms a complete, valid word.

```javascript
class TrieNode {
  constructor() {
    this.children = new Map();
    this.isEnd = false;
  }
}
```

### Prefix Sharing & Memory Efficiency
If you store the words `"car"`, `"cart"`, `"care"`, and `"cat"`:
- The common prefix `"ca"` is shared by all four words.
- The path diverges at `'r'` and `'t'`.
- Characters are never duplicated along shared prefixes, dramatically conserving space compared to storing individual strings in an array.

---

## Trie vs. Hash Table Comparison

| Feature | Trie (Prefix Tree) | Hash Table (Map / Object) |
| :--- | :--- | :--- |
| **Search Time** | $O(L)$ strictly ($L = \text{word length}$) | $O(L)$ average (computing hash), $O(n \times L)$ worst-case |
| **Prefix Matching (`startsWith`)**| $O(L)$ native and fast | $O(N \times L)$ requires scanning every stored key |
| **Autocomplete (Find all with prefix)**| $O(L + K)$ ($K = \text{matching words}$) | Requires exhaustive search across all entries |
| **Memory Consumption** | Higher per character due to node pointers | Compact array buckets |
| **Lexicographical Ordering** | Naturally alphabetical via in-order traversal | Keys are unordered |
| **Worst-Case Guarantees** | Deterministic, no collisions possible | Degrades on hash collisions |

---

## Time and Space Complexities

Let $L$ be the length of the target word/prefix, and $N$ be the total number of words in the Trie:

| Operation | Time Complexity | Space Complexity | Description |
| :--- | :---: | :---: | :--- |
| **`insert(word)`** | $O(L)$ | $O(L)$ | Creates at most $L$ new nodes |
| **`search(word)`** | $O(L)$ | $O(1)$ | Follows $L$ child links |
| **`startPrefix(prefix)`** | $O(L)$ | $O(1)$ | Verifies prefix path exists |
| **`getWordsWithPrefix(prefix)`** | $O(L + M)$ | $O(M)$ | $M = \text{total characters across matched words}$ |
| **`delete(word)`** | $O(L)$ | $O(L)$ | Recursive call stack depth $L$ |
| **Overall Space Complexity** | — | $O(\Sigma \times L \times N)$ | $\Sigma = \text{alphabet size}$ |

---

## Folder Implementation Guide

### Detailed Walkthrough of [trie.js](./trie.js)

The file **[trie.js](./trie.js)** contains a production-ready, feature-complete Trie implementation:

- **Configurable Sanitizer:** The constructor accepts an optional `clean` function (defaults to `(w) => w.trim().toLowerCase()`) ensuring all strings are sanitized before storage or lookup.
- **`insert(word)`:** Iterates through characters, dynamically instantiates `TrieNode` objects inside `node.children` (`Map`), and flags `node.isEnd = true` at the final character.
- **`search(word)`:** Walks down the children links; returns `true` if and only if all characters exist **and** `node.isEnd === true`.
- **`startPrefix(prefix)`:** Validates whether the given prefix exists anywhere within the trie (does not require `isEnd`).
- **`getWordsWithPrefix(prefix)`:** Navigates to the prefix node, then executes `#dfsPrefix` to recursively collect all descendant words with that prefix.
- **`delete(word)`:** Performs a recursive bottom-up deletion (`_deleteDFS`), safely unmarking `isEnd` and pruning childless nodes to release memory.

---

## Core Operations & Step-by-Step Logic

### 1. Insertion
```javascript
insert(word) {
  if (typeof word !== 'string') return;
  word = this.clean(word);
  let node = this.root;

  for (let char of word) {
    let exist = node.children.get(char);
    if (!exist) {
      exist = new TrieNode();
      node.children.set(char, exist);
    }
    node = exist;
  }
  node.isEnd = true;
}
```

### 2. Search (Exact Word Match)
```javascript
search(word) {
  if (typeof word !== 'string') return false;
  word = this.clean(word);
  let node = this.root;

  for (let char of word) {
    let exist = node.children.get(char);
    if (!exist) return false;
    node = exist;
  }
  return node.isEnd === true;
}
```

### 3. StartsWith / Prefix Search
```javascript
startPrefix(prefix) {
  if (typeof prefix !== 'string' || prefix.length === 0) return false;
  prefix = this.clean(prefix);
  let current = this.root;

  for (let char of prefix) {
    let exist = current.children.get(char);
    if (!exist) return false;
    current = exist;
  }
  return true; // Path exists, valid prefix!
}
```

### 4. Autocomplete / Word Suggestions (DFS Collection)
1. Traverse down the trie to the node corresponding to the last character of `prefix`.
2. If prefix path does not exist, return `[]`.
3. From that node, run a **Depth-First Search (DFS)** to traverse all downward branches, collecting every word where `node.isEnd === true`.

```javascript
getWordsWithPrefix(prefix) {
  prefix = this.clean(prefix);
  let current = this.root;

  for (let char of prefix) {
    let exist = current.children.get(char);
    if (!exist) return [];
    current = exist;
  }

  const result = [];
  this._dfsCollect(current, prefix, result);
  return result;
}

_dfsCollect(node, currentWord, result) {
  if (node.isEnd) result.push(currentWord);

  for (let [char, child] of node.children) {
    this._dfsCollect(child, currentWord + char, result);
  }
}
```

---

### 5. Recursive Deletion with Garbage Cleanup

Deleting a word from a Trie requires more than unmarking `isEnd`. Intermediate nodes that belong exclusively to the deleted word must be pruned to avoid memory leaks:

```javascript
delete(word) {
  this._deleteDFS(this.root, this.clean(word), 0);
}

_deleteDFS(node, word, i) {
  if (i === word.length) {
    if (!node.isEnd) return false; // Word does not exist
    node.isEnd = false;            // Unmark word ending
    return node.children.size === 0; // If node has no children, signal parent to delete it
  }

  const char = word[i];
  const child = node.children.get(char);
  if (!child) return false; // Word does not exist

  const shouldDeleteChild = this._deleteDFS(child, word, i + 1);

  if (shouldDeleteChild) {
    node.children.delete(char); // Prune reference
    // Delete this node too if it has no other children and is not another word's end
    return node.children.size === 0 && !node.isEnd;
  }

  return false;
}
```

---

## Visualizations

### Trie Structure Storing `"cat"`, `"car"`, `"cart"`, `"dog"`

```
                   (Root)
                  /      \
               'c'        'd'
                |          |
               'a'        'o'
              /   \        |
           'r'*   't'*    'g'*
            |
           't'*

* indicates isEnd === true
- "c" -> "a" -> "r" (isEnd: true)  ===> "car"
- "c" -> "a" -> "r" -> "t" (isEnd: true) ===> "cart"
- "c" -> "a" -> "t" (isEnd: true)  ===> "cat"
- "d" -> "o" -> "g" (isEnd: true)  ===> "dog"
```

---

## Advanced Topics: Compressed Tries (Radix Trees)

In a standard Trie, chains of nodes with single children consume unnecessary memory (e.g., `'d' -> 'o' -> 'g'`).
A **Radix Tree (Compressed Trie)** compresses single-child chains into multi-character edges:
```
Standard Trie: (Root) -> 'd' -> 'o' -> 'g'*
Radix Tree:    (Root) -> "dog"*
```
Used extensively in HTTP routers (such as Express, Fastify, Go Gin) for high-speed URL path matching (`/api/v1/users/:id`).

---

## Common Interview Questions & Edge Cases

### Top Questions
1. **Implement Trie (Prefix Tree):** LeetCode #208 (`insert`, `search`, `startsWith`).
2. **Design Add and Search Words Data Structure:** Supporting `.` wildcard matching via backtracking (LeetCode #211).
3. **Word Search II:** Find all words from a dictionary present in a 2D Boggle grid (LeetCode #212).
4. **Replace Words:** Replace words in a sentence with their shortest root prefix (LeetCode #648).
5. **Maximum XOR of Two Numbers in an Array:** Solved using a **Binary Trie** storing bits ($0$ and $1$) in $O(32 \times n)$ time (LeetCode #421).

### Edge Cases Checklist
- **Empty String (`""`):** Handled at root level (`this.root.isEnd = true`).
- **Prefix is a Full Word:** Inserting `"car"` when `"cart"` already exists must mark `'r'` as `isEnd = true` without disturbing `'t'`.
- **Deleting a Substring Word:** Deleting `"car"` from a trie containing `"cart"` must unmark `isEnd` at `'r'` but **must not delete** the node, because `'t'` depends on it.
- **Deleting a Word with Descendants:** Deleting `"cart"` from `["car", "cart"]` safely removes `'t'` and leaves `"car"` intact.

---

## Practice Problems (Beginner to Advanced)

### Level 1: Beginner
- [ ] Implement a basic Trie with `insert` and `search`.
- [ ] Implement `startsWith(prefix)`.
- [ ] Count total number of words in a Trie.
- [ ] Print all words stored in a Trie in alphabetical order.

### Level 2: Intermediate
- [ ] **Autocomplete System:** Return all words matching a prefix.
- [ ] **Longest Common Prefix:** Solve using a Trie.
- [ ] **Design Add and Search Words Data Structure:** Backtracking for `.` wildcard characters.
- [ ] **Replace Words:** Replace with shortest root in a dictionary.
- [ ] **Map Sum Pairs:** Return sum of values associated with a prefix.

### Level 3: Advanced
- [ ] **Word Search II:** 2D grid matrix word search with Trie backtracking.
- [ ] **Concatenated Words:** Find all words made up of shorter words in the list.
- [ ] **Maximum XOR of Two Numbers in an Array:** Binary Trie bit manipulation.
- [ ] **Implement Compressed Trie (Radix Tree):** Merge single-child edges.

---

## Related Topics

- [String Documentation](../String/README.md) - String manipulation and character encoding fundamentals.
- [Hash Map Documentation](../HashMap/README.md) - Hash table vs. Trie performance comparisons.
- [Tree Documentation](../Tree/README.md) - Multi-way (N-ary) tree concepts.
- [Recursion Documentation](../Recursion/README.md) - Backtracking and recursive DFS traversals.

