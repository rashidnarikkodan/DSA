import Stack from "../Stack/1-stack.js"
class Queue {
    constructor() {
        this.input = new Stack()
        this.output = new Stack()
    }
    enqueue(val) {
        this.input.push(val)
    }
    dequeue() {
        if (this.isEmpty()) return null;
        if (this.output.isEmpty()) {
            while (!this.input.isEmpty()) {
                this.output.push(this.input.pop())
            }
        }
        return this.output.pop()
    }
    front() {
        if (this.isEmpty()) return null;
        if (this.output.isEmpty()) {
            while (!this.input.isEmpty()) {
                this.output.push(this.input.pop())
            }
        }
        return this.output.peek()
    }
    isEmpty() {
        return this.input.isEmpty() && this.output.isEmpty();
    }
    size() {
        return this.input.size() + this.output.size();
    }

}
const queue = new Queue()
queue.enqueue(10)
queue.enqueue(20)
queue.enqueue(30)
queue.enqueue(40)
console.log(queue.dequeue())
console.log(queue.front());
console.log(queue.isEmpty());

