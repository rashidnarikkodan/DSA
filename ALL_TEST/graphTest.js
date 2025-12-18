//Directed graph
//Undirected graph
//weighted graph
class Graph{
    constructor(){
        this.list = new Map()
    }
    addVertex=(vtx)=>!this.list.get(vtx)?this.list.set(vtx,new Set()):null
    addEdges(vtx1,vtx2){
        this.addVertex(vtx1)
        this.addVertex(vtx2)
        this.list.get(vtx1).add(vtx2)
        this.list.get(vtx2).add(vtx1)
    }
    removeEdges(vtx1,vtx2){
        if(!this.list.get(vtx1)) return false
        this.list.get(vtx1).delete(vtx2)
        this.list.get(vtx2).delete(vtx1)
    }
    removeVertex(vtx){
        if(!this.list.get(vtx)) return false
        for(let node of this.list.get(vtx)){
            this.removeEdges(vtx,node)
        }
        this.list.delete(vtx)
    }
    getEdges=(v)=>this.list.has(v)?[...this.list.get(v)]:null
    degree=(v)=>this.list.has(v)?this.list.get(v).size:null
    bfs(start){
        if(!this.list.get(start)) return []
        let visited=new Set()
        let result = []
        let q=[start]
        while(q.length>0){
            let node = q.shift()
            result.push(node)
            for(let edge of this.list.get(node)){
                if(!visited.has(edge)){
                    visited.add(edge)
                    q.push(edge)
                }
            }
        }
        return result
    }
    dfs(start){
        if(!this.list.get(start)) return []
        let result=[]
        let visited = new Set()
        this.#dfs(start, visited, result)
        return result
    }
    #dfs(node, visited, result){
        visited.add(node)
        result.push(node)
        for(let edge of this.list.get(node)){
            if(!visited.has(edge)) this.#dfs(edge, visited, result)
        }
    }
    display(){
        for(let [node,edges] of this.list){
            console.log(node+'  ->  '+[...edges].join(', '));
        }
    }
    shortestPath(){
        
    }
}
const graph = new Graph()
const edges = [
  ["Assam", "Arunachal Pradesh"],
  ["Assam", "West Bengal"],
  ["West Bengal", "Bihar"],
  ["Bihar", "Jharkhand"],
  ["Jharkhand", "Odisha"],
  ["Odisha", "Chhattisgarh"],
  ["Chhattisgarh", "Madhya Pradesh"]
];

for(let [src,dest] of edges){
    graph.addEdges(src,dest)
}
graph.display()
// graph.removeEdges()
console.log('------------------');

graph.display()
// console.log(graph.bfs('Assam'));
console.log(graph.dfs('Assam'));
console.log(graph.degree('Assam'));
console.log(graph.getEdges('Assam'));


class TrieNode{
    constructor(){
        isEnd
        children=new Map
    }
}
class Trie{
    constructor(){
        root=new TrieNode()
    }
}

class Graph{
    constructor(){
        this.list=new Map()
    }
}

class Heap{
    constructor(){
        this.data=[]
    }
}

