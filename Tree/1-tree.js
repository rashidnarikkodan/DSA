class Node{
    constructor(value){
        this.value = value;
        this.children = []
        this.parent = null
    }
}
class Tree{
    constructor(){
        this.root = null
    }
    insertValue(value,parent){
        const child = new Node(value)
        if(!this.root){
            this.root = child
            return child
        }
        if(!parent)return ' provide a parent'
        parent.children.push(child)
        child.parent = parent
        return child
    }
    search(target, node = this.root){
        if(node.value === target) return node
        for(let c of node.children) {
            const f = this.search(target,c)
            if(f) return f
        }
        return null
    }
    delete(value){
        if(this.root.value == value){
            let deleted = this.root.value
            this.root = null
            return deleted
        }
        return this.#deleteDFS(value)
    }
    #deleteDFS(value,node = this.root){
        if(!node) return false
        for(let i=0; i < node.children.length; i++){
            if(node.children[i].value === value){
                node.children.splice(i,1)
                return true
            }
            let deleted = this.#deleteDFS(value, node.children[i])
            if(deleted) return true
        }

    }
    //traversal DFS
    preOrder(node=this.root){
        console.log(node.value);
        for(const c of node.children) this.preOrder(c)
    }
    postOrder(node=this.root){
        for(const c of node.children){
            this.postOrder(c)
        }
            console.log(node.value);
    }
    //BFS breadth first search
    levelOrder(){
        let root = this.root
        const q = [root]
        while(q.length){
            const n=q.shift()
            console.log(n.value);
            q.push(...n.children)
        }
    }
    isLeaf(node){
        return node.children.length === 0
    }
    update(node,newValue){
        node.value = newValue
        return node
    }
    
}
const tree = new Tree()
tree.insertValue(1)
const two=tree.insertValue(2,tree.root)
tree.insertValue(5,tree.root)
tree.insertValue(3,two)
let c=tree.insertValue(4,two)
// console.log(tree.delete(5));
console.log(tree.root);

