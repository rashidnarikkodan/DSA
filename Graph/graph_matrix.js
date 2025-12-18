class MatrixGraph {
  constructor(n) {
    this.n = n;
    this.m = Array.from({ length: n }, () => Array(n).fill(0));
  }

  addEdge(i, j, w = 1) {
    this.m[i][j] = w;
  }

  removeEdge(i, j) {
    this.m[i][j] = 0;
  }

  hasEdge(i, j) {
    return this.m[i][j] !== 0;
  }

  neighbors(i) {
    const res = [];
    for (let j = 0; j < this.n; j++) {
      if (this.m[i][j] !== 0) res.push(j);
    }
    return res;
  }
}

const graph=new MatrixGraph(3)
graph.addEdge(0,1)
// graph.addEdge('B',"C")
// graph.addEdge('C',"D")
console.log(graph.m);
