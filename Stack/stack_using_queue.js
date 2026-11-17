import Queue from '../Queue/1-queue.js'
class Stack {
    constructor() {
        this.queue = new Queue(); // only allow  enqueue() and dequeue() and front()    
    }

    push(value) { //O(n)
        this.queue.enqueue(value);
        let size = this.queue.length()
        while(size>1){
            this.queue.enqueue(this.queue.dequeue())
            size--
        }
    }

    pop() { // O(n)
        return this.isEmpty() ? null : this.queue.dequeue();
    }

    top() {
        return this.isEmpty() ? null : this.queue.front();
    }

    isEmpty() {
        return this.queue.isEmpty();
    }

    size() {
        return this.queue.length();
    }
}

const stack = new Stack();

stack.push(1);
stack.push(2);
stack.push(3);
stack.push(4);
stack.push(5);

console.log(stack.pop());     // 5
console.log(stack.size());    // 4
console.log(stack.isEmpty()); // false
console.log(stack.top());     // 4

export default Stack;