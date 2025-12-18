class Node{
    constructor(value){
        this.value = value;
        this.left = null;
        this.right = null;
    }
}
class Tree{
    constructor(){
    this.root = null
    }
    insert(value){
        //follow BFS rule - level by level checking for empty left then empty right
        const newNode = new Node(value);
        if(!this.root)return this.root = newNode;
        let q = [this.root]
        while(q.length){
            const n = q.shift()
            if(!n.left) return n.left = newNode;
            else q.push(n.left)
            if(!n.right) return n.right = newNode;
            else q.push(n.right)
        }
    }
    //traversal
    preOrder(node = this.root){
        if(!node)return
        console.log(node.value);
        this.preOrder(node.left)
        this.preOrder(node.right)
    }
    inOrder(node=this.root){
        if(!node)return
        this.inOrder(node.left)
        console.log(node.value);
        this.inOrder(node.right)
    }
    postOrder(node=this.root){
        if(!node)return
        this.postOrder(node.left)
        this.postOrder(node.right)
        console.log(node.value)
    }
    //BFS traversal
    levelOrder(){
        if(!this.root)return;
        const q=[this.root]
        while(q.length){
            const n = q.shift()
            console.log(n.value);
            if(n.left)q.push(n.left)
            if(n.right)q.push(n.right)
        }
    }
    //search using DFS
    search(value,node = this.root){
        if(!node) return null
        if(node.value == value) return node
        let found = this.search(value,node.left)
        if(found) return found
        return this.search(value,node.right)
    }
    //search using BFS
    find(value){
        let q=[this.root]
        while(q.length){
            const n = q.shift()
            if(n.value == value) return n
            if(n.left)q.push(n.left)
            if(n.right)q.push(n.right)
        }
    }
    height(node=this.root){
        if(!node) return 0
        return 1+Math.max(this.height(node.left),this.height(node.right))
    }
    update(old,newV){
        let node = this.search(old)
        if(node)node.value = newV
    }
    isLeaf(value){
        const node=this.search(value)
        return node && !node.left && !node.right
    }
    countNode(node = this.root){
        if(!node)return 0;
        return 1+this.countNode(node.left)+this.countNode(node.right)
    }
    delete(val){
        if (!this.root) return null;

        // Case: root is the only node
        if (this.root.val === val && !this.root.left && !this.root.right){
            this.root = null;
            return;
        }

        let target = null;
        let queue = [this.root];
        let parentOfDeepest = null;
        let deepest = null;

        while(queue.length){
            let node = queue.shift();

            if (node.val === val) target = node;

            if (node.left){
                parentOfDeepest = node;
                deepest = node.left;
                queue.push(node.left);
            }
            if (node.right){
                parentOfDeepest = node;
                deepest = node.right;
                queue.push(node.right);
            }
        }

        if (!target) return;  // value not found

        // Step 3: replace
        target.val = deepest.val;

        // Step 4: delete deepest
        if (parentOfDeepest.right === deepest) parentOfDeepest.right = null;
        else parentOfDeepest.left = null;
    }



}
const tree = new Tree()
tree.insert("A")
tree.insert("B")
tree.insert("C")
tree.insert("D")
tree.insert("E")
tree.insert("F")
tree.insert("G")
tree.insert("J")
console.log(tree.delete('C'));

// console.log(tree.root)
