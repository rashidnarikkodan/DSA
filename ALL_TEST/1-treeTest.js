class Node {
    constructor(value) {
        this.value = value
        this.children = []
        this.parent = null
    }
}

class Tree {
    constructor() {
        this.root = null
    }
    create(value,parent = this.root) {
        let node = new Node(value)
        if (!this.root) return this.root = node
        parent.children.push(node)
        node.parent = parent
        return node
    }
    search(value,parent = this.root) {
        if (!parent) return false
        if (parent.value == value) return parent
        for (let child of parent.children) {
            let found = this.search(value,child)
            if (found) return found
        }
        return false
    }
    delete(value,parent = this.root) {
        if (parent.value === value) {
            this.root = null
            return value
        }
        return this.#dfsDelete(value,parent)
    }
    #dfsDelete(value,parent) {
        if(!parent) return false
        for(let i=0;i < parent.children.length;i++){
            if(parent.children[i].value === value){
                parent.children.splice(i,1)
                return true
            }
            let deleted=this.#dfsDelete(value,parent.children[i])
            if(deleted) return true
        }
        return false
    }
    //traversal DFS preOrder
    preOrder(parent=this.root){
        console.log(parent.value)
        for(let child of parent.children) this.preOrder(child)
    }
//postOrder
    postOrder(parent=this.root){
        for(let child of parent.children) this.postOrder(child)
            console.log(parent.value)
    }
//level order

    levelOrder(){
        let q=[this.root]
        while(q.length>0){
            let n=q.shift()
            console.log(n.value)
            q.push(...n.children)

        }
    }
    isLeaf = (value) => this.search(value).children.length === 0
    update = (node,newValue) => node.value = newValue
    countLeafs( node = this.root){
        if(!node) return 0
        if(node.children.length == 0) return 1
        let total = 0
        for(let child of node.children){
            total+=this.countLeafs(child)
        }
        return total
    }
}
const tree = new Tree()
tree.create(1)
const B = tree.create(4)
tree.create(5)
tree.create(7,B)
tree.create(3,B)
const C = tree.create(6,B)
tree.create(50,C)
tree.delete(50)
// tree.preOrder()
tree.postOrder()
// tree.levelOrder()
// console.log(tree.isLeaf(4));
// console.log(tree.update(C,5));
// console.log(tree.countLeafs());
