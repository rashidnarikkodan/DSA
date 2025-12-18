//addVertex (take a vertex and if not created then create one)
//addEdges (take two vertexes, if there is no vertexes create one and ,add vtx each others set)
//removeVertex (remove all edges related to that vertex)
//removeEdges (take two vertexes and remove edgews between them)
//hasEdge (take two vertex and check both have edges each other)
//hasVertex (take vertex and return boolean)
//getNeighbours ()
//display (loop trough list obect and spread all in set)
class Graph {
    constructor() {
        this.list = new Map()
    }
    addVertex(vertex) {
        if (!this.list.get(vertex)) this.list.set(vertex,new Set())
    }
    addEdges(vtx1,vtx2) {
        this.addVertex(vtx1)
        this.addVertex(vtx2)
        this.list.get(vtx1).add(vtx2)
        this.list.get(vtx2).add(vtx1)
    }
    removeEdge(vtx1,vtx2) {
        if (!this.list.get(vtx1) || !this.list.get(vtx2)) return
        this.list.get(vtx1).delete(vtx2)
        this.list.get(vtx2).delete(vtx1)
    }
    removeVertex(vertex) {
        if (!this.list.get(vertex)) return
        for (let vtx of this.list.get(vertex)) {
            this.removeEdge(vtx,vertex)
        }
        this.list.delete(vertex)
    }

    hasEdge = (vtx1,vtx2) => (this.list.get(vtx1).has(vtx2) && this.list.get(vtx2).has(vtx1))
    hasVertex = (vtx) => this.list.get(vtx) ? true : false
    getNeighbours = (v) => !this.list.get(v) ? null : [...this.list.get(v)]

    display() {
        for (let [key,set] of this.list) {
            console.log(key + '->' + [...set])
        }
    }

    //traversals 

    //BFS way of traversal
    bfs(start) {
        if (!this.list.has(start)) return []
        let result = []
        let queue = [start];
        let visited = new Set()
        while (queue.length > 0) {
            let node = queue.shift();
            if(!visited.has(node)){

                result.push(node)
                visited.add(node)
                for (let nbr of this.list.get(node)) {
                    if (!visited.has(nbr)) queue.push(nbr)
                    }
                }
        }
        return result
    }

    //DFS way of traversal
    dfs(start){
        if(!this.list.has(start)) return [];
        let visited = new Set()
        let result = [];
        this.#dfs(start, visited, result)
        return result
    }
    #dfs(node, visited, result){
        visited.add(node)
        result.push(node)
        for(let nbr of this.list.get(node)){
            if(!visited.has(nbr)) this.#dfs(nbr, visited, result)
        }
    }
    dfsStack(start) {
       if(!this.list.get(start)) return []
       let visited = new Set()
       let result = []
       let stack = [start]
       while(stack.length>0){
        let node = stack.pop()
        if(!visited.has(node)){

            visited.add(node);
            result.push(node);
            for(let nbr of [...this.list.get(node)].reverse()){
                if(!visited.has(nbr)) stack.push(nbr)
                }
            }
       }
       return result
    }

}

const graph = new Graph()
graph.addEdges('A','B')
graph.addEdges('A','C')
graph.addEdges('B','C')
graph.display()
console.log(graph.bfs('A'));
console.log(graph.dfs('A'));
console.log(graph.dfsStack('A'));
