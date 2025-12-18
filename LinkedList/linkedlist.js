class Node{
  constructor(val){
    this.val = val
    this.next = null;
  }
}
class CircularList{
  constructor(){
    this.head = null
    this.tail = null
  }
  append(val){
    const node = new Node(val)
    if(!this.head)return this.head = this.tail = node
    this.tail.next = node
    this.tail = node
    this.tail.next = this.head
  }
  print(){
    let current = this.head
    let result = ''
    while(current){
      result+=current.val+'=>'
      current = current.next
    }
    console.log(result);
  }
}
const list = new CircularList()
list.append(1)
list.append(2)
list.append(3)
list.append(4)
console.log('hello');

list.print()
