class Graph{
    constructor(){
        this.list=new Map()
    }
    addVertex=(v)=>!this.list.has(v)?this.list.set(v,new Set()):null
    addEdge(src,dest,weight){
        this.addVertex(src)
        this.addVertex(dest)
        this.list.get(src).add({node:dest,weight})
        this.list.get(dest).add({node:src,weight})
    }
    removeEdge(src,dest){
        if(!this.list.has(src) || !this.list.has(dest)) return null
        let removeDest = [...this.list.get(src)].filter((e)=>e.node !== dest)
        this.list.set(src,new Set(removeDest))
        let removeSrc = [...this.list.get(dest)].filter((e)=>e.node !== src)
        this.list.set(dest,removeSrc)
    }
    removeVertex(vertex){
        if(!this.list.get(vertex)) return 
        for(let nbr of this.list.get(vertex)){
            this.removeEdge(nbr.node,vertex)  
        }
        this.list.delete(vertex)
    }
    hasEdge=(src,dest)=>{
        if(!this.list.has(src)) return
        for(let edge of this.list.get(src)){
            if(edge.node === dest) return true
        }
        return true
    }
    hasVertex=(v)=>this.list.has(v)
    getNeighbours=(v)=>this.list.has(v)?[...this.list.get(v)]:null
    display(){
        for(let [node,edges] of this.list){
            console.log(node+'->'+[...edges].map(e=>`${e.node}(${e.weight})`));
            
        }
    }
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
                    if (!visited.has(nbr.node)) queue.push(nbr.node)
                    }
                }
        }
        return result
    }
}
const wg = new Graph();
wg.addEdge('A', 'B', 3);
wg.addEdge('A', 'C', 5);
wg.addEdge('B', 'C', 2);
// wg.removeEdge('B', 'C');
// wg.removeVertex('C');
wg.display();
console.log(wg.hasEdge('A'));
console.log(wg.getNeighbours('C'));
console.log(wg.bfs('A'));

