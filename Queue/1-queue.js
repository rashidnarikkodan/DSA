
class Queue{
    constructor(){
        this.queue = []
    }
    enqueue = (element) => this.queue.push(element) //O(1)
    
    dequeue = () => this.isEmpty()?'Queue is empty':this.queue.shift() //O(n) it should optimize (use stack to create queue)
    
    isEmpty = () => this.queue.length === 0 //O(1)
    
    front = () => this.isEmpty() ? "Queue is empty" : this.queue[0] //O(1)
    
    length=() => this.queue.length //O(1)
}
const queue = new Queue()
queue.enqueue(1)
queue.enqueue(2)
queue.enqueue(3)
queue.enqueue(4)
console.log('dequeue :-',queue.dequeue())
console.log('show front :-',queue.front());
console.log('length :-',queue.length());
