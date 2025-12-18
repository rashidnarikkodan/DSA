

class Node{
    constructor(val){
        this.value = val;
        this.next = null
    }
}
class Queue{
    constructor(){
        this.first = null
        this.last = null
        this.length = 0
    }
    enqueue(val){
        const node = new Node(val)
        if(!this.first){
            this.length++
            this.first = this.last = node;
            return 
        }
        this.last.next = node;
        this.last = node
        this.length++
    }
    dequeue(){
        if(!this.first)return 'Queue is Empty'
        const val = this.first?.value
        this.first = this.first.next
        if(!this.first) this.last = null
        this.length--
        return val
    }
    front(){
       return this.first.value
    }
    isEmpty(){
        return this.first !== null;
    } 
    size() {
        return this.length
    } 
}
const queue = new Queue()
queue.enqueue(1)
queue.enqueue(2)
queue.enqueue(3)
console.log(queue.dequeue());
console.log(queue.size());
console.log(queue.front());




