
class Node{
    constructor(value){
        this.value = value
        this.next = null
    }
}

class Stack{
    constructor(){
        this.top = null;
        this.length = 0
    }
    push(value){
        const node = new Node(value);
        if(!this.top){
            this.length++
            this.top = node
            return 
        }
        node.next = this.top
        this.top = node
        this.length++
    }
    pop(){
        if(this.isEmpty()) return 'Stack is Empty'
        let popped = this.top.value;
        this.top = this.top.next
        this.length--
        return popped
    }
    peek(){
        return this.top.value
    }
    isEmpty(){
        return this.length === 0
    }
    size(){
        return this.length
    }
}

export default Stack
