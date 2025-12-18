class Node{
    constructor(value){
        this.value = value;
        this.left = null
        this.right = null
    }
}
class Tree{
    constructor()
    {
        this.root = null
    }
    insert(value){
        const newNode = new Node(value)
        if(!this.root) return this.root = newNode
        let curr = this.root;
        while(true){
            if(value < curr.value){
                if(!curr.left) return curr.left = newNode
                curr=curr.left
            }else{
                if(!curr.right) return curr.right = newNode
                curr=curr.right
            }
        }
    }
    contains(value){
        let current = this.root

        while(current){
            if(value == current.value) return true
            if(value < current.value) current = current.left
            else current = current.right
        }
        return false
    }
    delete(value){
        this.root = this._delete(this.root, value)
    }
    _delete(root, value){
        if(!root) return null;
        if(value < root.value){
            root.left = this._delete(root.left, value)
        }else if(value > root.value){
            root.right = this.delete(root.right, value)
        }else{
            if(!root.left && !root.right) return null
            if(!root.left) return root.right
            if(!root.right) return root.left
            const minNode =  this.min(root.right)
            root.value = minNode.value;
            root.right = this._delete(root.right, minNode.value)
        }
        return root
    }
    min(cur=this.root){
        if(!cur.left) return cur.value
        return this.min(cur.left)
    }
    isValid(){
        return this._validate(this.root, -Infinity, Infinity)
    }
    _validate(node, min, max){
        if(!node) return true;
        if(node.value<=min || node.value>=max) return false
        return (
            this._validate(node.left, min,node.value) &&
            this._validate(node.right, node.value,max)
        )
    }
}
const bst = new Tree()
bst.insert(10)
bst.insert(15)
bst.insert(5)
bst.insert(3)
bst.insert(7)
console.log(bst.contains(4))
console.log(bst.delete(3))
console.log(bst.root);
console.log(bst.isValid());