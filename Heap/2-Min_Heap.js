class Heap{
    constructor(){
        this.data = []
    }
    size(){
        return this.data.length
    }
    peek(){
        return this.data.length>0?this.data[0]:undefined
    }
    isEmpty(){
        return this.data.length === 0
    }
    buildHeap(arr){
        this.data = [...arr];
        let lastParent = Math.floor((this.data.length/2)-1)
        for(let i = lastParent; i >= 0;i--){
            this.#bubbleDown(i)
        }
    }
    insert(value){
        this.data.push(value);
        this.#bubbleUp()
    }
    remove(){
        if(this.data.length === 0) return null
        if(this.data.length === 1) return this.data.pop()
        let min = this.data[0]
        this.data[0] = this.data.pop()
        this.#bubbleDown(0)
        return min
    }
    #bubbleUp(index = this.data.length-1){
        let data = this.data
        while(index>0){
            let parent = this.#getParent(index)
            if(data[parent]<data[index]) break;
            this.#swap(index,parent)
            index = parent
        }
    }

    #bubbleDown(index=0){
        let data = this.data;
    
        while(true){
            let smallest = index;
            let left = this.#getLeft(index)
            let right = this.#getRight(index)
            if(left < data.length && data[left] < data[smallest]) smallest = left
            if(right < data.length && data[right] < data[smallest]) smallest = right;
            if(smallest === index) break;
            this.#swap(index,smallest)
            index = smallest
        }
    }
    #getParent(index){
        if(index === 0) return null
        return Math.floor((index-1)/2)
    }
    #getLeft = (i)=> 2*i+1
    #getRight = (i)=> 2*i+2
    #swap(i,j){
        [this.data[i],this.data[j]]=
        [this.data[j],this.data[i]]
    }
    #compare(a,b){
        return a-b
    }
}
const heap = new Heap()
heap.buildHeap([10,5,25,3,30,22,12])
console.log(heap.data);
console.log(heap.heapSort());
//insert O(log n)
//remove O(log n)
//bubbleUp O(log n)
//bubbleDown O(log n)
//buildHeap O(n)
//peek O(1)
//size O(1)
//isEmpty O(1)