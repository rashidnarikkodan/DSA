class Stack{
    constructor(){
        this.stack = []
    }
    push(elem){ //O(1) since its push, time is constant
        this.stack.push(elem)
    }
    pop(){ // O(1) - pop also constant time
        if(this.isEmpty())return 'Empty stack'
        return this.stack.pop()
    }
    peek(){ // O(1) time constant since its reading with index
        if(this.isEmpty())return 'Empty stack'
        return this.stack[this.size()-1]
    }
    isEmpty(){ // O(1)
        return this.size() === 0
    }
    size(){ // O(1)
        return this.stack.length
    }
    print(){
        return this.stack.join('<-')
    }
}

const stack = new Stack()
stack.push(1)
stack.push(2)
stack.push(3)
stack.push(4)
console.log('size :-',stack.size());
console.log('pop :-',stack.pop());
console.log('peek :-',stack.peek());
console.log('isEmpty :-',stack.isEmpty());
