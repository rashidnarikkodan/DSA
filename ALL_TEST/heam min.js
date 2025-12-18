class Heap{
    constructor(){
        this.data=[]
    }
    add(value){
        this.data.push(value)
        console.log(this.data)
        this.#bubbleUp(this.data.length-1)
    }
    #bubbleUp(i){
        let parent = Math.floor((i-1)/2)
        while(i>0){
            if(this.data[parent]>=this.data[i]) break;
                [this.data[parent],this.data[i]]=[this.data[i],this.data[parent]]
                i=parent
            
        }
    }
    display(){
        return this.data
    }
}

const heap = new Heap()
heap.add(10)
heap.add(30)
heap.add(20)
heap.add(5)
console.log(heap.display())