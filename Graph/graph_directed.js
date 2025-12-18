class Graph{
    constructor(){
        this.list = new Map()
    }
    addVertex=(v)=>!this.list.get(v)?this.list.set(v,new Set()):undefined;
    addEdge(from, to){
        this.addVertex(from)
        this.addVertex(to)
        this.list.get(from).add(to)
    }

    removeVertex(v){
        if(!this.list.get(v)) return;
        for(let [node,nbrs] of this.list) nbrs.delete(v)
        this.list.delete(v)
    }
    removeEdge(from, to){
        if(!this.list.get(from)) return null;
        this.list.get(from).delete(to)
    }
    hasEdge=(from,to)=>this.list.has(from) && this.list.get(from).has(to)
    hasVertex=(v)=>this.list.has(v)
    getNeighbours=(v)=>this.list.has(v)?[...this.list.get(v)]:null;
    display(){
        for(let [node,nbrs] of this.list) console.log(node+'->'+[...nbrs]);
    }

    outDegree=(v)=>this.list.has(v)?this.list.get(v).size:null
    inDegree(v){
        let count=0
        if(!this.list.get(v)) return null;
        for(let [node,edge] of this.list){
            if(edge.has(v))count++
        }
        return count
    }

    //traversal

    bfs(start){
        if(!this.list.get(start)) return [];
        let visited = new Set()
        let result = []
        let queue = [start]
        while(queue.length>0){
            let node = queue.shift()
            if(!visited.has(node)){
                visited.add(node)
                result.push(node)
                for(let nbr of this.list.get(node)){
                    if(!visited.has(nbr)) queue.push(nbr)
                }
            }
        }
        return result
    }
    dfs(start){
        if(!this.list.get(start)) return [];
        let visited = new Set()
        let result = []
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
    dfsStack(start){
        if(!this.list.has(start)) return [];
        let visited=new Set()
        let result = []
        let stack=[start]
        while(stack.length>0){
            let node = stack.pop()
            if(!visited.has(node)){
                visited.add(node)
                result.push(node)
                for(let nbr of [...this.list.get(node)].reverse()){
                    if(!visited.has(nbr)) stack.push(nbr)
                }
            }
        }
        return result
    }
}
const graph = new Graph()
graph.addEdge('A','B')
graph.addEdge('A','C')
graph.addEdge('B','C')
console.log(graph.display());
console.log(graph.getNeighbours('C'));
console.log(graph.bfs('A'));
console.log(graph.dfs('A'));
console.log(graph.dfsStack('A'));
console.log(graph.inDegree('B'));
console.log(graph.outDegree('B'));
