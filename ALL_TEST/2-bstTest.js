class Node{
  constructor(value){
    this.value = value;
    this.left = null
    this.right = null
  }
}

class BST{
  constructor(){
    this.root=null
  }
  insert(value){
    const child = new Node(value)
    if(!this.root)return this.root = child
    this.#insertNode(child)
  }
  #insertNode(child, parent = this.root){
    if(child.value < parent.value){
      if(!parent.left) return parent.left = child
        else this.#insertNode(child, parent.left)
    }else{
      if(!parent.right) return parent.right = child
      else this.#insertNode(child, parent.right)
    }
  }
  preOrder(parent = this.root){
    if(!parent) return
    console.log(parent.value);
    this.preOrder(parent.left)
    this.preOrder(parent.right)
  }
  inOrder(parent = this.root){
    if(!parent) return
    this.inOrder(parent.left)
    console.log(parent.value);
    this.inOrder(parent.right)
  }
  
  postOrder(parent = this.root){
    if(!parent) return
    this.postOrder(parent.left)
    this.postOrder(parent.right)
    console.log(parent.value);
  }
  levelOrder(){
    let q=[this.root]
    while(q.length){
      let node = q.shift()
      console.log(node.value);
      if(node.left) q.push(node.left)
      if(node.right) q.push(node.right)
    } 
  }
  search(target, parent = this.root){ 
    if(!parent) return false
    if(target == parent.value) return true
    if(target < parent.value) return this.search(target, parent.left)
    else return this.search(target, parent.right)
  }
  max = (parent=this.root) => !parent.right?parent:this.max(parent.right)
  min = (parent=this.root) => !parent.left?parent:this.min(parent.left)
   
  delete(value){
    this.root = this.#deleteNode(value,this.root)
  }
  #deleteNode(value,parent){
    if(!parent) return;
    if(value < parent.value) parent.left = this.#deleteNode(value, parent.left)
    else if(value > parent.value) parent.right = this.#deleteNode(value, parent.right)
    else {
        //case 1- no children
        if(!parent.right && !parent.left) return null

        //case 2- one child
        if(!parent.left) return parent.right
        if(!parent.right) return parent.left

        //case 3- two children
        let successor = this.min(parent.right)
        parent.value = successor.value
        parent.right = this.#deleteNode(parent.right, successor.value)
      }
    return parent
 }
     countLeafs( node = this.root){
        if(!node) return 0
        if(!node.left && !node.right) return 1
        return this.countLeafs(node.left) + this.countLeafs(node.right)
    }

}
const bst = new BST()
bst.insert(49)
bst.insert(34)
bst.insert(80)
bst.insert(12)
bst.insert(23)
bst.insert(45)
// bst.postOrder()
// bst.delete(34)
// console.log(bst.search(43));
// console.log(bst.min());
// console.log(bst.max());
console.log(bst.countLeafs());

// console.log(bst.search(43));
