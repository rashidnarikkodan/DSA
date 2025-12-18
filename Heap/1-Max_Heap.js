class Heap{
    constructor(){
        this.data = []
    }
    size(){
        return this.data.length
    }
    peek(){
        return this.data[0]
    }
    isEmpty(){
        return this.data.length === 0
    }
    buildHeap(arr){
        this.data = [...arr]
        const lastParent = Math.floor((this.data.length/2)-1); // to find parent of last node
        for(let j = lastParent; j >= 0; j--){
            this.bubbleDown(j)
        }
        return this.data
        
    }
    insert(value){
        this.data.push(value);
        this.bubbleUp()
    }
    bubbleUp(){
        let index = this.data.length-1
        let data = this.data
        while(index>0){
            let parent = Math.floor((index-1)/2);
            if(data[parent] >= data[index]) break;
            [data[index],data[parent]]=
            [data[parent],data[index]]
            index = parent
        }
    }
    remove(){
        if(this.data.length === 0) return null
        if(this.data.length === 1) return this.data.pop()
        let max = this.data[0]
        this.data[0] = this.data.pop()
        this.bubbleDown()
        return max
    }
    bubbleDown(index=0){
        let data = this.data;
        let length = this.data.length
        while(true){
            let largest = index;
            let left = index*2+1
            let right = index*2+2
            if(left<length
                && data[left] > data[largest]) largest = left
            if(right<length
                && data[right] > data[largest]) largest = right
            if(largest == index) break
            [data[largest],data[index]]=
            [data[index],data[largest]];
            index = largest
        }
    }
    contains(value){
        for(let elem of this.data){
            if(elem === value) return true
        }
        return false
    }
}

function heapSort(arr){
    let heap = new Heap()
    heap.buildHeap(arr)
    let sorted = []
    while(!heap.isEmpty()){
        sorted.push(heap.remove())
    }
    return sorted
}
// console.log(heapSort([10,3,45,23,3,456,54,64]));


function kthMax(arrays,k){
    const heap = new Heap()
    for(let arr of arrays){
        let min = Math.min(...arr)
        heap.insert(min)
    }
    let r;
    while(k>0){
        r=heap.remove()
        k--;
    }
    return r
}
const r=kthMax([
    [1,2,3],
    [5,8,7],
    [34,565,6],
    [12,76,2]
],2)

console.log(r);
