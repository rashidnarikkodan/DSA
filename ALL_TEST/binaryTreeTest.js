class Node{
    constructor(value){
        this.value = value
        this.left = null
        this.right = null
    }
}
class BinaryTree{
    constructor(){
        this.root = null
    }

    //insertion in binary is through BFS
    insert(value){
        // const child = new Node(value)
        // if(!this.root) return this.root = child
        // let q=[this.root]
        // while(q.length>0){
        //     let parent = q.shift()
        //     if(!parent.left) return parent.left = child
        //         else q.push(parent.left)
        //     if(!parent.right) return parent.right = child
        //         else q.push(parent.right)
        // }
        // return child
        const child = new Node(value)
        if(!this.root)return this.root = child
        let q=[this.root]
        while(q.length>0){
            let node=q.shift()
            if(!node.left)return node.left = child 
            else q.push(node.left) 
            if(!node.right)return node.right = child 
            else q.push(node.right) 
        }
        return child
    }
    preOrder(parent=this.root){
        if(!parent) return
        console.log(parent.value)
        this.preOrder(parent.left)
        this.preOrder(parent.right)
    }
    inOrder(parent=this.root){
        if(!parent) return
        this.inOrder(parent.left)
        console.log(parent.value)
        this.inOrder(parent.right)
    }
    postOrder(parent=this.root){
        if(!parent) return
        this.postOrder(parent.left)
        this.postOrder(parent.right)
        console.log(parent.value)
    }
    levelOrder(parent = this.root){
        let q=[parent]
        while(q.length>0){
            let n=q.shift()
            console.log(n.value)
            if(n.left) q.push(n.left)
            if(n.right) q.push(n.right)
        }
    }
    search(target, parent=this.root){
        if(!parent) return false
        if(parent.value === target) return parent
        let found = this.search(target, parent.left)
        if(found) return found
        return this.search(target, parent.right)
    }
    searchBFS(target){
        const q=[this.root]
        while(q.length>0){
            const n=q.shift()
            if(n.value === target){
                return n
            }
            if(n.left)q.push(n.left)
            if(n.right)q.push(n.right)
        }
    }
    update(node,value){
        if(typeof node !== 'object'){
            node=this.search(node)
        }
        node.value = value
        return node
    }
    delete(target){
        if(this.root.value == target && !this.root.left && !this.root.right) return this.root = null
        let targetted=null
        let lastNode=null
        let lastParent=null
        let q=[this.root]
        while(q.length>0){
            let node = q.shift()
            if(node.value === target) targetted = node
            if(node.left){
                lastNode=node.left;
                lastParent=node
                q.push(node.left)
            }
            if(node.right){
                lastNode=node.right;
                lastParent=node
                q.push(node.right)
            }
        }
            if(!targetted) return null
            targetted.value = lastNode.value
            if(lastParent.right === lastNode) lastParent.right = null
            else lastParent.left = null
        return true
    }
    countLeaf(node=this.root){
        if(!node) return 0;
        if(!node.left && !node.right) return 1
        return this.countLeaf(node.left) + this.countLeaf(node.right)
    }
    countNode = (node=this.root) => !node?0:1+this.countNode(node.left)+this.countNode(node.right) 
    height = (node=this.root) => !node?-1:1+Math.max(this.height(node.left),this.height(node.right)) 
    isLeaf = (node) => !this.search(node).left && !this.search(node).right?true:false

}
const bt=new BinaryTree()
bt.insert(1)
bt.insert(2)
bt.insert(3)
bt.insert(4)
bt.insert(5)
bt.insert(6)
// bt.postOrder()
// const node4=bt.search(4)
// console.log(bt.searchBFS(4));
// console.log(bt.height(node4));
// console.log(bt.isLeaf(5));
// console.log(bt.countNode());
// console.log(bt.delete(3));
console.log(bt.delete(6));
// console.log(bt.countLeaf());
bt.levelOrder()


