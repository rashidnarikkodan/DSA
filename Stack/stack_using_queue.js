class Stack{
    constructor(){
        this.q = []
    }
    push(value){
        this.q.push(value)
        if(this.q.length>1){
            this.q.unshift(this.q.pop())
        }
    }
    pop(){
        return this.isEmpty()?'Queue is Empty':this.q.shift()
    }
    front(){
        return this.isEmpty()?'Queue is empty':this.q[0]
    }
    isEmpty(){
        return this.q.length == 0
    }
    size(){
        return this.isEmpty()?'Queue is empty':this.q.length
    }
}

const stack = new Stack()
console.log(stack.isEmpty());
stack.push(1)
stack.push(2)
stack.push(3)
stack.push(4)
stack.push(5)
console.log(stack.pop());
console.log(stack.size());
console.log(stack.isEmpty());
console.log(stack.front());

export default Stack