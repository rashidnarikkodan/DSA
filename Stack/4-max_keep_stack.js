class Stack {
    constructor() {
        this.stack = []
        this.max = []
    }
    push(value) {
        let max_length = this.max.length
        if (max_length == 0) this.max.push(value)
        let currMax = this.max[max_length - 1]
        if (value >= currMax) {
            this.max.push(value)
        }
        this.stack.push(value)
    }
    pop() {
        let max_length = this.max.length
        let popped = this.stack.pop()
        if (popped == this.max[max_length - 1]) this.max.pop()
        return popped
    }
    getMax() {
        return this.max[this.max.length - 1]
    }
}
const stack = new Stack()
stack.push(1)
stack.push(4)
stack.push(3)
stack.push(4)
stack.push(2)
console.log(stack.pop());
console.log(stack.pop());
console.log(stack.pop());
console.log(stack.getMax());
console.log(stack.stack);
