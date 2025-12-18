class Stack{
    constructor(){
        this.stack = []
        this.max = null
    }
    push(value){
        if(!this.max)this.max = [value]
        if(this.max[this.max.length-1]<value){
            this.max.push(value)
        }
        this.stack.push(value)
    }
    pop(){
        let popped = this.stack.pop()
        if(popped == this.max[this.max.length-1]) this.max.pop()
        return popped
    }
    getMax(){
        return this.max[this.max.length-1]
    }
}
const stack = new Stack()
stack.push(1)
stack.push(3)
stack.push(4)
stack.push(2)
console.log(stack.pop());
console.log(stack.getMax());
console.log(stack.pop());
console.log(stack.getMax());
