class Stack{
    constructor(){
        this.stack = []
        this.max = []
    }
    insert(value){
        this.stack.push(value)
        if(this.max.length === 0 || value >= this.max[this.max.length-1]){
            this.max.push(value)
        }
    }
    pop(){
        let popped = this.stack.pop()
        if(popped === this.max[this.max.length-1]) this.max.pop()
        return popped    
    }
    getMax(){
        return this.max[this.max.length-1]
    }
}
const s=new Stack()
s.insert(5)
s.insert(7)
s.insert(6)
s.insert(3)
s.insert(7)
s.insert(9)
s.pop()
s.pop()
console.log(s.getMax());
console.log(s.max);
console.log(s.stack);
