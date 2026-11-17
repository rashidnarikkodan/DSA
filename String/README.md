# Strings in JavaScript

A complete, in-depth guide to strings, character encoding, immutability, algorithmic patterns, performance pitfalls, and interview problems in JavaScript.

---

## Table of Contents
1. [Introduction](#introduction)
2. [JavaScript String Fundamentals](#javascript-string-fundamentals)
   - [Immutability and Memory](#immutability-and-memory)
   - [UTF-16 Encoding & Character Codes](#utf-16-encoding--character-codes)
3. [Time and Space Complexities](#time-and-space-complexities)
4. [Folder Implementation Guide](#folder-implementation-guide)
   - [Overview of Existing Files](#overview-of-existing-files)
   - [Detailed Code Breakdown](#detailed-code-breakdown)
5. [Core String Algorithms & Patterns](#core-string-algorithms--patterns)
   - [1. String Reversal (Iterative, Recursive, Two-Pointer)](#1-string-reversal-iterative-recursive-two-pointer)
   - [2. Palindrome Checking (Strict and Alphanumeric)](#2-palindrome-checking-strict-and-alphanumeric)
   - [3. Anagram Detection (Sorting vs. Frequency Map)](#3-anagram-detection-sorting-vs-frequency-map)
   - [4. First Non-Repeating Character](#4-first-non-repeating-character)
   - [5. Longest Common Prefix](#5-longest-common-prefix)
   - [6. Longest Substring Without Repeating Characters (Sliding Window)](#6-longest-substring-without-repeating-characters-sliding-window)
6. [Visualizations](#visualizations)
7. [Interview Questions & Edge Cases](#interview-questions--edge-cases)
8. [Practice Problems (Beginner to Advanced)](#practice-problems-beginner-to-advanced)
9. [Related Topics](#related-topics)

---

## Introduction

In computer science, a **String** is a finite sequence of characters. While many languages (like C) treat strings as mutable null-terminated character arrays, **JavaScript strings are immutable primitive values**.

Understanding string operations is critical because string manipulation appears in nearly every technical interview. Due to immutability, naive string operations (such as repeated string concatenation inside a loop) can silently degrade runtime from $O(n)$ to $O(n^2)$.

---

## JavaScript String Fundamentals

### Immutability and Memory

When you modify a string in JavaScript:
```javascript
let str = "hello";
str[0] = "H"; // Silently fails in non-strict mode; throws TypeError in strict mode
console.log(str); // "hello"

str = str + " world"; // Creates an entirely NEW string in memory; leaves old string for GC
```

> [!WARNING]
> Because strings cannot be mutated in place, every operation that appears to modify a string (`slice`, `concat`, `replace`, `toLowerCase`, `+`) allocates a **brand-new string** in memory of length $k$, costing $O(k)$ time and space.

#### The $O(n^2)$ Concatenation Pitfall
```javascript
// AVOID: O(n^2) total time because a new string is copied in each iteration
let result = "";
for (let i = 0; i < n; i++) {
  result += str[i]; // Copies 1, then 2, then 3 ... up to n characters
}

// PREFER: O(n) total time by collecting in an array and joining
const chars = [];
for (let i = 0; i < n; i++) {
  chars.push(str[i]);
}
const output = chars.join("");
```

### UTF-16 Encoding & Character Codes

JavaScript strings are encoded in **UTF-16** code units (16-bit numbers).
- `str.charCodeAt(i)`: Returns the UTF-16 integer code between $0$ and $65535$.
- Common ranges:
  - `'0'` to `'9'`: $48$ to $57$
  - `'A'` to `'Z'`: $65$ to $90$
  - `'a'` to `'z'`: $97$ to $122$
- For emojis or characters outside the Basic Multilingual Plane (BMP), characters are represented as surrogate pairs (two 16-bit code units, causing `str.length` to report `2` for a single emoji like `"😀"`). Use `codePointAt()` and `Array.from(str)` to correctly handle surrogate pairs.

---

## Time and Space Complexities

| Operation | Time Complexity | Space Complexity | Description |
| :--- | :---: | :---: | :--- |
| `str[i]` / `charAt(i)` | $O(1)$ | $O(1)$ | Direct indexed access |
| `str.charCodeAt(i)` | $O(1)$ | $O(1)$ | Retrieve character code point |
| `str.length` | $O(1)$ | $O(1)$ | Stored as string property |
| `str.slice(start, end)` | $O(k)$ | $O(k)$ | Where $k = \text{end} - \text{start}$ |
| `str.indexOf(sub)` / `includes` | $O(n \times m)$ | $O(1)$ | $n = \text{haystack length}$, $m = \text{needle length}$ |
| `str.split(delim)` | $O(n)$ | $O(n)$ | Allocates an array of substrings |
| `arr.join(delim)` | $O(n)$ | $O(n)$ | Concatenates array of characters into string |
| `str.toLowerCase()` / `toUpperCase()` | $O(n)$ | $O(n)$ | Creates new string with converted casing |

---

## Folder Implementation Guide

### Overview of Existing Files

This directory contains the following practice files:
- **[string.js](./string.js)**: Comprehensive string utility implementations:
  - Recursive and iterative string reversal.
  - Palindrome checking with recursion.
  - Finding first non-repeating character via `Map`.
  - Duplicate character removal via `Set`.
  - Longest common prefix across string arrays.
  - Vowel removal with regex.
  - Anagram validation using frequency maps.
- **[isAnagram.js](./isAnagram.js)**: Anagram validation (sorting vs. frequency counting), array sum formula, and missing number discovery using `Set`.
- **[stringReverse.js](./stringReverse.js)**: Recursive range generation and iterative vs. recursive Fibonacci sequences.

---

## Core String Algorithms & Patterns

### 1. String Reversal (Iterative, Recursive, Two-Pointer)

#### A. Iterative ($O(n)$ Time, $O(n)$ Space)
```javascript
function reverseIterative(str) {
  let result = '';
  for (let i = str.length - 1; i >= 0; i--) {
    result += str[i];
  }
  return result;
}
```

#### B. Recursive ($O(n)$ Time, $O(n)$ Call Stack)
```javascript
function reverseRecursive(str) {
  if (str.length <= 1) return str;
  return reverseRecursive(str.slice(1)) + str[0];
}
```

#### C. Two-Pointer In-Place via Character Array ($O(n)$ Time, $O(n)$ Space)
```javascript
function reverseTwoPointer(str) {
  const chars = str.split('');
  let left = 0;
  let right = chars.length - 1;
  while (left < right) {
    [chars[left], chars[right]] = [chars[right], chars[left]];
    left++;
    right--;
  }
  return chars.join('');
}

console.log(reverseTwoPointer("algorithm")); // "mhtirogla"
```

---

### 2. Palindrome Checking (Strict and Alphanumeric)

A string is a palindrome if it reads identically forwards and backwards.

```javascript
function isPalindrome(str) {
  let left = 0;
  let right = str.length - 1;

  while (left < right) {
    if (str[left] !== str[right]) return false;
    left++;
    right--;
  }
  return true;
}

// Handling non-alphanumeric characters and casing:
function isPalindromeValid(s) {
  // Normalize string: lowercase and remove non-alphanumeric chars
  const clean = s.toLowerCase().replace(/[^a-z0-9]/g, '');
  let left = 0;
  let right = clean.length - 1;

  while (left < right) {
    if (clean[left] !== clean[right]) return false;
    left++;
    right--;
  }
  return true;
}

console.log(isPalindromeValid("A man, a plan, a canal: Panama")); // true
```

---

### 3. Anagram Detection (Sorting vs. Frequency Map)

Two strings are anagrams if they contain identical characters with identical frequencies.

#### Approach 1: Sorting ($O(n \log n)$ Time, $O(n)$ Space)
```javascript
function isAnagramSort(s, t) {
  if (s.length !== t.length) return false;
  return s.split('').sort().join('') === t.split('').sort().join('');
}
```

#### Approach 2: Frequency Map ($O(n)$ Time, $O(k)$ Space where $k \le 26$)
This is the optimal approach for interviews.

```javascript
function isAnagramMap(s, t) {
  if (s.length !== t.length) return false;

  const count = {};

  for (let char of s) {
    count[char] = (count[char] || 0) + 1;
  }

  for (let char of t) {
    if (!count[char]) return false; // Character missing or frequency exceeded
    count[char]--;
  }

  return true;
}

console.log(isAnagramMap("anagram", "nagaram")); // true
console.log(isAnagramMap("rat", "car"));         // false
```

---

### 4. First Non-Repeating Character

Find the first character in a string that occurs only once.

```javascript
function firstNonRepeating(str) {
  const freq = new Map();

  // Pass 1: Count occurrences O(n)
  for (let char of str) {
    freq.set(char, (freq.get(char) || 0) + 1);
  }

  // Pass 2: Find first character with count === 1 O(n)
  for (let char of str) {
    if (freq.get(char) === 1) return char;
  }

  return null;
}

console.log(firstNonRepeating("swiss")); // "w"
```

---

### 5. Longest Common Prefix

Find the longest common prefix among an array of strings.

```javascript
function longestCommonPrefix(strs) {
  if (!strs.length) return "";
  let prefix = strs[0];

  for (let i = 1; i < strs.length; i++) {
    while (strs[i].indexOf(prefix) !== 0) {
      prefix = prefix.slice(0, prefix.length - 1);
      if (prefix === "") return "";
    }
  }

  return prefix;
}

console.log(longestCommonPrefix(["flower", "flow", "flight"])); // "fl"
```

---

### 6. Longest Substring Without Repeating Characters (Sliding Window)

Find the length of the longest substring with all unique characters in $O(n)$ time.

```javascript
function lengthOfLongestSubstring(s) {
  let maxLength = 0;
  let left = 0;
  const seenIndex = new Map();

  for (let right = 0; right < s.length; right++) {
    const char = s[right];

    // If character was seen inside the current window, move left pointer past it
    if (seenIndex.has(char) && seenIndex.get(char) >= left) {
      left = seenIndex.get(char) + 1;
    }

    seenIndex.set(char, right);
    maxLength = Math.max(maxLength, right - left + 1);
  }

  return maxLength;
}

console.log(lengthOfLongestSubstring("abcabcbb")); // 3 ("abc")
```

---

## Visualizations

### Palindrome Check (Two Pointers)
```
String:  " r  a  c  e  c  a  r "
           ^                 ^
         left              right   -> 'r' === 'r' (advance)

String:  " r  a  c  e  c  a  r "
              ^           ^
            left        right     -> 'a' === 'a' (advance)

String:  " r  a  c  e  c  a  r "
                 ^     ^
               left  right       -> 'c' === 'c' (advance)

String:  " r  a  c  e  c  a  r "
                    ^
               left === right    -> Loop ends: Palindrome Confirmed!
```

### Anagram Frequency Map Balance
```
String 1: " silent "           String 2: " listen "
Char Map:                      Char Map:
  s: 1                           s: 1 - 1 = 0
  i: 1                           i: 1 - 1 = 0
  l: 1                           l: 1 - 1 = 0
  e: 1                           e: 1 - 1 = 0
  n: 1                           n: 1 - 1 = 0
  t: 1                           t: 1 - 1 = 0
All counts balanced to 0  ===> Anagram Confirmed!
```

---

## Interview Questions & Edge Cases

### Top Questions
1. **Valid Anagram:** Compare two strings using character counts.
2. **Longest Palindromic Substring:** Expand around center approach ($O(n^2)$ time, $O(1)$ space).
3. **Group Anagrams:** Categorize array of words by their sorted form or character count hash.
4. **String to Integer (atoi):** Handling leading whitespace, sign signs, overflow clamp, and non-digit characters.
5. **Count and Say:** Run-length encoding sequence generation.

### Edge Cases Checklist
- **Empty String (`""`):** Should return `""`, `0`, or `true` depending on problem specification.
- **Single Character (`"a"`):** Is automatically a palindrome; length of unique substring is `1`.
- **Case Sensitivity:** `'A'` ($65$) is distinct from `'a'` ($97$). Always clarify whether case matters.
- **Whitespace & Punctuation:** Determine if spaces, commas, or symbols must be stripped or preserved.
- **Repeated Characters:** Strings containing only duplicates (`"aaaaa"`).

---

## Practice Problems (Beginner to Advanced)

### Level 1: Beginner
- [ ] Reverse a string without using built-in `.reverse()`.
- [ ] Check if a given string is a palindrome.
- [ ] Count vowels and consonants in a string.
- [ ] Capitalize the first letter of every word in a sentence.

### Level 2: Intermediate
- [ ] **Valid Anagram:** Solve using an ASCII frequency array.
- [ ] **Longest Common Prefix:** Solve for an array of $n$ strings.
- [ ] **First Unique Character:** Find the first non-repeating character in $O(n)$ time.
- [ ] **String Compression:** Compress `"aabcccccaaa"` into `"a2b1c5a3"`.
- [ ] **Longest Substring Without Repeating Characters:** Dynamic sliding window.

### Level 3: Advanced
- [ ] **Group Anagrams:** Group words like `["eat","tea","tan","ate","nat","bat"]`.
- [ ] **Minimum Window Substring:** Sliding window with character requirement counts.
- [ ] **Longest Palindromic Substring:** Expand around center and Manacher's Algorithm.
- [ ] **Implement `strStr()` (Substring Search):** Knuth-Morris-Pratt (KMP) or Rabin-Karp algorithm.

---

## Related Topics

- [Array Documentation](../Array/README.md) - Array traversal and two-pointer techniques.
- [Hash Map Documentation](../HashMap/README.md) - Frequency counters and constant-time lookups.
- [Trie Documentation](../Trie/README.md) - Prefix trees for dictionary searches and autocomplete.
- [Recursion Documentation](../Recursion/README.md) - Recursive string processing and backtracking.

