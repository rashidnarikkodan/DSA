# Graphs in JavaScript

A complete, in-depth guide to Graph Data Structures, Adjacency Lists, Adjacency Matrices, Weighted Graphs, Traversals (BFS & DFS), Cycle Detection, Topological Sorting, and Shortest Path Algorithms (Dijkstra & Bellman-Ford).

---

## Table of Contents
1. [Introduction](#introduction)
2. [Graph Terminology & Core Concepts](#graph-terminology--core-concepts)
   - [Formal Definition ($G = (V, E)$)](#formal-definition-g--v-e)
   - [Directed vs. Undirected Graphs](#directed-vs-undirected-graphs)
   - [Weighted vs. Unweighted Graphs](#weighted-vs-unweighted-graphs)
   - [Cyclic vs. Acyclic Graphs & DAGs](#cyclic-vs-acyclic-graphs--dags)
   - [Degree, In-Degree, Out-Degree & Isolated Vertices](#degree-in-degree-out-degree--isolated-vertices)
3. [Graph Representations](#graph-representations)
   - [Adjacency List (`Map` & `Set`)](#adjacency-list-map--set)
   - [Adjacency Matrix (2D Array)](#adjacency-matrix-2d-array)
   - [Trade-Offs & Complexity Comparison](#trade-offs--complexity-comparison)
4. [Folder Implementation Guide](#folder-implementation-guide)
   - [graph_undirected.js](#graph_undirectedjs)
   - [graph_directed.js](#graph_directedjs)
   - [graph_matrix.js](#graph_matrixjs)
   - [weighted_graph.js](#weighted_graphjs)
5. [Graph Traversals](#graph-traversals)
   - [Breadth-First Search (BFS)](#breadth-first-search-bfs)
   - [Depth-First Search (DFS: Recursive & Iterative Stack)](#depth-first-search-dfs-recursive--iterative-stack)
6. [Essential Graph Algorithms](#essential-graph-algorithms)
   - [1. Cycle Detection (Undirected & Directed)](#1-cycle-detection-undirected--directed)
   - [2. Topological Sorting (Kahn's Algorithm & DFS)](#2-topological-sorting-kahns-algorithm--dfs)
   - [3. Shortest Path in Unweighted Graph (BFS)](#3-shortest-path-in-unweighted-graph-bfs)
   - [4. Dijkstra's Algorithm (Non-Negative Weighted Graph)](#4-dijkstras-algorithm-non-negative-weighted-graph)
   - [5. Bellman-Ford Algorithm (Negative Weights & Negative Cycles)](#5-bellman-ford-algorithm-negative-weights--negative-cycles)
7. [Visualizations](#visualizations)
8. [Common Interview Questions & Edge Cases](#common-interview-questions--edge-cases)
9. [Practice Problems (Beginner to Advanced)](#practice-problems-beginner-to-advanced)
10. [Related Topics](#related-topics)

---

## Introduction

A **Graph** is a non-linear data structure consisting of a finite set of **Vertices (Nodes)** and a collection of **Edges (Links)** that connect pairs of vertices.

Unlike Trees (which enforce strict parent-child hierarchies and prohibit cycles), graphs model arbitrary networks and connections:
- **Social Networks:** Users are vertices; friendships/follows are edges.
- **GPS Navigation & Maps:** Intersections/cities are vertices; roads with distances/travel times are weighted edges.
- **The World Wide Web:** Webpages are vertices; hyperlinks are directed edges.
- **Dependency Resolvers:** npm package dependencies, compiler build order, and database transactions (Deadlock detection).

---

## Graph Terminology & Core Concepts

### Formal Definition ($G = (V, E)$)
- $V$: Set of vertices (e.g., $V = \{A, B, C, D\}$).
- $E$: Set of edges connecting pairs of vertices (e.g., $E = \{(A, B), (B, C), (C, D)\}$).

### Directed vs. Undirected Graphs
- **Undirected Graph:** Edges are bidirectional. If $(A, B) \in E$, you can travel from $A \to B$ and $B \to A$.
- **Directed Graph (Digraph):** Edges have direction. An edge from $A \to B$ does not imply an edge from $B \to A$.

### Weighted vs. Unweighted Graphs
- **Unweighted Graph:** Every edge has equal cost/weight (typically treated as $1$).
- **Weighted Graph:** Every edge carries an associated cost, distance, latency, or capacity ($w$).

### Cyclic vs. Acyclic Graphs & DAGs
- **Cycle:** A path that starts and ends at the identical vertex without traversing any edge twice.
- **DAG (Directed Acyclic Graph):** A directed graph containing **no directed cycles**. Essential for task scheduling, compiler optimizations, and Git commit trees.

### Degree, In-Degree, Out-Degree & Isolated Vertices
- **Degree (Undirected):** Number of edges connected to a vertex.
- **In-Degree (Directed):** Number of incoming edges directed into a vertex.
- **Out-Degree (Directed):** Number of outgoing edges pointing out from a vertex.
- **Isolated Vertex:** A vertex with degree $0$ (no incident edges).

---

## Graph Representations

### Adjacency List (`Map` & `Set`)
Maps each vertex to a set/array of its adjacent neighbors.
```javascript
const adjList = new Map();
adjList.set('A', new Set(['B', 'C']));
adjList.set('B', new Set(['A', 'D']));
```

### Adjacency Matrix (2D Array)
An $n \times n$ matrix where row $i$ and column $j$ indicates whether edge $(i, j)$ exists.
```javascript
// 0: A, 1: B, 2: C
const matrix = [
  [0, 1, 1], // A connects to B and C
  [1, 0, 0], // B connects to A
  [1, 0, 0]  // C connects to A
];
```

### Trade-Offs & Complexity Comparison

| Operation | Adjacency List | Adjacency Matrix | Edge List |
| :--- | :---: | :---: | :---: |
| **Space Complexity** | $O(V + E)$ (Optimal for sparse graphs) | $O(V^2)$ (Better for dense graphs) | $O(E)$ |
| **Add Vertex** | $O(1)$ | $O(V^2)$ (reallocate matrix) | $O(1)$ |
| **Add Edge** | $O(1)$ | $O(1)$ | $O(1)$ |
| **Remove Edge** | $O(1)$ | $O(1)$ | $O(E)$ |
| **Check Edge $(u, v)$** | $O(\text{deg}(u))$ or $O(1)$ with Set | $O(1)$ direct lookup | $O(E)$ |
| **Iterate Neighbors** | $O(\text{deg}(u))$ (Fast) | $O(V)$ (Must scan full row) | $O(E)$ |

---

## Folder Implementation Guide

### [graph_undirected.js](./graph_undirected.js)
- Implements an **Undirected Graph** using `Map<Vertex, Set<Vertex>>`.
- Methods: `addVertex`, `addEdges` (adds both $(u, v)$ and $(v, u)$), `removeEdge`, `removeVertex` (purges vertex from all neighbor sets), `hasEdge`, `hasVertex`, `getNeighbours`, and `display`.
- Traversals:
  - `bfs(start)`: Queue-based level traversal.
  - `dfs(start)`: Recursive depth-first traversal using private `#dfs`.
  - `dfsStack(start)`: Iterative depth-first traversal using an explicit LIFO array stack.

### [graph_directed.js](./graph_directed.js)
- Implements a **Directed Graph** using `Map<Vertex, Set<Vertex>>`.
- Methods: `addEdge(from, to)` (unidirectional link), `inDegree(v)` (scans all sets), `outDegree(v)` (`set.size`), `removeEdge(from, to)`, `removeVertex`, and `display`.
- Traversals: Both recursive DFS and iterative `dfsStack` and `bfs`.

### [graph_matrix.js](./graph_matrix.js)
- Implements an **Adjacency Matrix** using a fixed-size 2D array:
  - `this.m = Array.from({ length: n }, () => Array(n).fill(0))`.
  - Methods: `addEdge(i, j, weight)`, `removeEdge(i, j)`, `hasEdge(i, j)`, and `neighbors(i)`.

### [weighted_graph.js](./weighted_graph.js)
- Implements a **Weighted Graph** using `Map<Vertex, Set<{ node, weight }>>`.
- Methods: `addEdge(src, dest, weight)` storing `{ node: dest, weight }`, `removeEdge`, `removeVertex`, and weighted BFS.

---

## Graph Traversals

### Breadth-First Search (BFS)
Explores graph layer-by-layer starting from source vertex using a FIFO Queue and a `visited` Set to avoid cycles. Guaranteed to find the **shortest path in unweighted graphs**.

```javascript
bfs(start) {
  if (!this.list.has(start)) return [];
  const result = [];
  const visited = new Set([start]);
  const queue = [start];

  while (queue.length > 0) {
    const vertex = queue.shift();
    result.push(vertex);

    for (let neighbor of this.list.get(vertex)) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }

  return result;
}
```

### Depth-First Search (DFS: Recursive & Iterative Stack)
Plunges deep down each path until no unvisited neighbors remain, then backtracks.

#### 1. Recursive DFS
```javascript
dfs(start) {
  const visited = new Set();
  const result = [];

  const traverse = (vertex) => {
    if (!vertex) return;
    visited.add(vertex);
    result.push(vertex);

    for (let neighbor of this.list.get(vertex)) {
      if (!visited.has(neighbor)) {
        traverse(neighbor);
      }
    }
  };

  traverse(start);
  return result;
}
```

#### 2. Iterative DFS (Using Explicit Stack)
```javascript
dfsIterative(start) {
  if (!this.list.has(start)) return [];
  const visited = new Set();
  const result = [];
  const stack = [start];

  while (stack.length > 0) {
    const vertex = stack.pop();

    if (!visited.has(vertex)) {
      visited.add(vertex);
      result.push(vertex);

      // Reverse neighbors to match recursive traversal order
      const neighbors = [...this.list.get(vertex)].reverse();
      for (let neighbor of neighbors) {
        if (!visited.has(neighbor)) {
          stack.push(neighbor);
        }
      }
    }
  }

  return result;
}
```

---

## Essential Graph Algorithms

### 1. Cycle Detection (Undirected & Directed)

#### In Undirected Graphs (Parent Tracking)
During DFS, if an adjacent neighbor is already `visited` and is **not the immediate parent**, a cycle exists!

```javascript
function hasCycleUndirected(adjList) {
  const visited = new Set();

  function dfs(vertex, parent) {
    visited.add(vertex);
    for (let neighbor of adjList.get(vertex)) {
      if (!visited.has(neighbor)) {
        if (dfs(neighbor, vertex)) return true;
      } else if (neighbor !== parent) {
        return true; // Visited non-parent neighbor === Cycle!
      }
    }
    return false;
  }

  for (let vertex of adjList.keys()) {
    if (!visited.has(vertex)) {
      if (dfs(vertex, null)) return true;
    }
  }
  return false;
}
```

#### In Directed Graphs (Three-Color State: 0 = Unvisited, 1 = Visiting, 2 = Visited)
If we encounter a node currently in the `Visiting` state (on the active recursion call stack), a back-edge and cycle is detected.

---

### 2. Topological Sorting (Kahn's Algorithm & DFS)

A linear ordering of vertices in a **Directed Acyclic Graph (DAG)** such that for every directed edge $u \to v$, vertex $u$ comes before $v$.

#### Kahn's Algorithm (BFS with In-Degrees)
1. Compute in-degree for every vertex.
2. Push all vertices with `inDegree === 0` into a queue.
3. While queue is not empty:
   - Dequeue vertex $u$ and add to topological order.
   - For each neighbor $v$ of $u$, decrement $v$'s in-degree by $1$.
   - If $v$'s in-degree drops to $0$, enqueue $v$.
4. If topological order length $< |V|$, a cycle exists (not a DAG).

```javascript
function topologicalSortKahn(numCourses, prerequisites) {
  const inDegree = new Array(numCourses).fill(0);
  const adjList = Array.from({ length: numCourses }, () => []);

  for (let [dest, src] of prerequisites) {
    adjList[src].push(dest);
    inDegree[dest]++;
  }

  const queue = [];
  for (let i = 0; i < numCourses; i++) {
    if (inDegree[i] === 0) queue.push(i);
  }

  const order = [];
  while (queue.length > 0) {
    const node = queue.shift();
    order.push(node);

    for (let neighbor of adjList[node]) {
      inDegree[neighbor]--;
      if (inDegree[neighbor] === 0) queue.push(neighbor);
    }
  }

  return order.length === numCourses ? order : []; // Cycle check
}
```

---

### 3. Shortest Path in Unweighted Graph (BFS)
Track `parent` pointers or distances during BFS traversal:

```javascript
function shortestPathBFS(adjList, start, target) {
  const queue = [start];
  const visited = new Set([start]);
  const parent = new Map();

  while (queue.length > 0) {
    const curr = queue.shift();
    if (curr === target) break;

    for (let neighbor of adjList.get(curr)) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        parent.set(neighbor, curr);
        queue.push(neighbor);
      }
    }
  }

  // Reconstruct path
  if (!parent.has(target) && start !== target) return [];
  const path = [];
  let curr = target;
  while (curr) {
    path.unshift(curr);
    curr = parent.get(curr);
  }
  return path;
}
```

---

### 4. Dijkstra's Algorithm (Non-Negative Weighted Graph)

Finds the shortest distance from a single source vertex to all other vertices in a weighted graph with non-negative edge weights.

```javascript
function dijkstra(weightedGraph, start) {
  const distances = {};
  const visited = new Set();
  const pq = [{ node: start, dist: 0 }]; // Simple priority array (or use Heap)

  for (let vertex of weightedGraph.list.keys()) {
    distances[vertex] = Infinity;
  }
  distances[start] = 0;

  while (pq.length > 0) {
    // Sort to extract minimum distance node
    pq.sort((a, b) => a.dist - b.dist);
    const { node: currNode, dist: currDist } = pq.shift();

    if (visited.has(currNode)) continue;
    visited.add(currNode);

    for (let edge of weightedGraph.list.get(currNode)) {
      const newDist = currDist + edge.weight;
      if (newDist < distances[edge.node]) {
        distances[edge.node] = newDist;
        pq.push({ node: edge.node, dist: newDist });
      }
    }
  }

  return distances;
}
```
**Complexity:** $O((V + E) \log V)$ with a Min-Heap.

---

### 5. Bellman-Ford Algorithm (Negative Weights & Negative Cycles)
- Computes shortest paths even with **negative edge weights**.
- Relaxes all $|E|$ edges $|V| - 1$ times.
- If an edge can still be relaxed on the $|V|$-th pass, the graph contains a **Negative Weight Cycle**.
- **Complexity:** $O(V \times E)$.

---

## Visualizations

### Graph Representations
```
Undirected Graph:
  (A) ----- (B)
   |       /
   |     /
   |   /
  (C)

Adjacency List:
A: [ B, C ]
B: [ A, C ]
C: [ A, B ]

Adjacency Matrix:
    A   B   C
A [ 0,  1,  1 ]
B [ 1,  0,  1 ]
C [ 1,  1,  0 ]
```

---

## Common Interview Questions & Edge Cases

### Top Questions
1. **Number of Islands:** 2D grid connected components using BFS/DFS (LeetCode #200).
2. **Clone Graph:** Deep copy graph using Hash Map of visited copies (LeetCode #133).
3. **Course Schedule I & II:** Topological Sort & Cycle Detection in DAG (LeetCode #207, #210).
4. **Word Ladder:** Shortest path transformation using BFS (LeetCode #127).
5. **Network Delay Time:** Dijkstra's shortest path algorithm (LeetCode #743).

### Edge Cases Checklist
- **Disconnected Graphs / Multiple Components:** Always iterate through all vertices to run BFS/DFS across disconnected islands.
- **Self Loops:** Vertex connecting to itself (`(A, A)`). Must not cause infinite loop in cycle detection.
- **Parallel / Multiple Edges:** Two edges connecting the same pair with different weights.
- **Isolated Vertices:** Vertices with zero edges must still be counted.
- **Negative Weight Cycles:** Can cause infinite loops in Dijkstra; use Bellman-Ford to detect.

---

## Practice Problems (Beginner to Advanced)

### Level 1: Beginner
- [ ] Implement Graph using Adjacency List.
- [ ] Implement Graph using Adjacency Matrix.
- [ ] BFS and DFS traversal of a graph.
- [ ] Find all neighbors of a given vertex.

### Level 2: Intermediate
- [ ] **Number of Islands:** 2D matrix traversal.
- [ ] **Clone Graph:** Deep copy node graph.
- [ ] **Course Schedule:** Detect cycles in prerequisite directed graph.
- [ ] **Shortest Path in Binary Matrix:** BFS shortest path.
- [ ] **All Paths from Source to Target:** Backtracking DFS on DAG.

### Level 3: Advanced
- [ ] **Course Schedule II (Topological Sort):** Return valid build order.
- [ ] **Network Delay Time (Dijkstra):** Single-source shortest path.
- [ ] **Alien Dictionary:** Topological sort on alphabet precedence.
- [ ] **Cheapest Flights Within K Stops:** Bellman-Ford or Dijkstra with step count.
- [ ] **Critical Connections in a Network (Tarjan's Bridges):** DFS low-link discovery.

---

## Related Topics

- [Queue Documentation](../Queue/README.md) - FIFO engine driving Breadth-First Search.
- [Stack Documentation](../Stack/README.md) - LIFO engine driving Depth-First Search.
- [Heap Documentation](../Heap/README.md) - Min-Heap priority queue driving Dijkstra’s and Prim’s algorithms.
- [Tree Documentation](../Tree/README.md) - Trees as connected, acyclic directed graphs.

