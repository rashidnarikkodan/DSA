class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor() {
    this.root = null;
    this.sorted=''
  }
  isEmpty() {
    return this.root === null;
  }
  insert(value) {
    const node = new Node(value);
    if (this.isEmpty()) return (this.root = node);
    this._insert(this.root, node);
  }
  _insert(root, node) {
    if (node.value < root.value) {
      if (!root.left) root.left = node;
      else this._insert(root.left, node);
    } else {
      if (!root.right) root.right = node;
      else this._insert(root.right, node);
    }
  }
  search(value, root = this.root) {
    if (!root) return false;

    if (root.value === value) return true;

    if (value < root.value) return this.search(root.left, value);
    else return this.search(root.right, value);
  }

  //traversals---DFS - preOrder, inOrder, postOrder

  //preOrder steps
  /*
    1.Read the node value
    2.visit left subtree recursivly
    3.visit right subtree recursivly
    */
  preOrder(root = this.root) {
    if (!root) return
      this.sorted+=root.value+'=>';
      this.preOrder(root.left);
      this.preOrder(root.right);
      return this.sorted;
  }

  //inOrder
  /*
    1.visit left subtree recursivly
    2.Read the node value
    3.visit right subtree recursivly
    */
  inOrder(root = this.root) {
    if (!root) return;
    this.inOrder(root.left);
    this.sorted+=root.value+'=>'
    this.inOrder(root.right);
    return this.sorted
  }

  //postOrder
  /*
    1.visit left subtree recursivly
    2.visit right subtree recursivly
    3.Read the node value
    */
  postOrder(root = this.root) {
    if (!root) return;
    this.postOrder(root.left);
    this.postOrder(root.right);
    console.log(root.value);
  }

  levelOrder() {
    if (!this.root) return;
    let result = "";
    const queue = [this.root];
    while (queue.length > 0) {
      const current = queue.shift();
      console.log(current.value)
      result += current.value + "=>";
      if (current.left) queue.push(current.left);
      if (current.right) queue.push(current.right);
    }
    console.log(result);
  }
  min(root = this.root){
    if(!root.left) return root.value
    return this.min(root.left)
  }
  max(root = this.root){
    if(!root.right) return root.value
    return this.max(root.right)
  }
  delete(value){
    this.root = this.#deleteNode(this.root,value)
  }
  #deleteNode(parent, value){
    if(!parent) return;
    if(value < parent.value){
      parent.left = this.#deleteNode(parent.left,value)
    }else if(value > parent.value){
      parent.right = this.#deleteNode(parent.right, value)
    }else{
      //logic to delete because its match

      //case one - no child
      if(!parent.left && !parent.right) return null

      //case two - one child case
      if(!parent.left) return parent.right
      if(!parent.right) return parent.left

      //case three - two child case
      let successor = this.min(parent.right)
      parent.value = successor.value;
      parent.right = this.#deleteNode(parent.right, successor.value)
    
    }
  }
  closest(target){
    let closest = this.root.value
    let cur=this.root

    while(cur){
      if(Math.abs(cur.value-target)<Math.abs(closest-target)){
        closest = cur.value
      }
      if(target < cur.value){
        cur=cur.left
      }else if(target > cur.value){
        cur=cur.right
      }else{
        return cur.value
      }
    }
    return closest
  }
}

const bst = new Tree();
bst.insert(10);
bst.insert(5);
bst.insert(3);
bst.insert(7);
bst.insert(15);
bst.insert(20);
console.log(bst.preOrder())
console.log(bst.inOrder())
bst.postOrder();
console.log("------------------------");
// bst.levelOrder();
console.log("------------------------");
console.log(bst.root)
console.log(bst.min());
console.log(bst.max());
