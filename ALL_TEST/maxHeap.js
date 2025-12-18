class MaxHeap{
    constructor(){
        this.data = []
    }
    add(value){
        this.data.push(value)
        this.bubbleUp(this.data.length-1)
    }
    bubbleUp(idx){
        while(idx>0){
            let parent = Math.floor((idx-1)/2)
            if(this.data[parent]>=this.data[idx]) break;
            [this.data[parent],this.data[idx]]=
            [this.data[idx],this.data[parent]]
            idx = parent
        }
    }
    remove(){
        let removed = this.data[0]
        this.data[0] = this.data.pop()
        this.bubbleDown(0);
        return removed
    }
    bubbleDown(idx){
        while(idx<this.data.length){
            let left = 2*idx+1
            let right = 2*idx+2
            let largest = idx
            if(left < this.data.length && this.data[left]>this.data[idx]) largest = left
            if(right < this.data.length && this.data[right]>this.data[idx]) largest = right
            if(largest === idx) break;
            [this.data[largest],this.data[idx]]=
            [this.data[idx],this.data[largest]]
            idx = largest
        }
    }

}

const data=new MaxHeap()
data.add(23)
data.add(5)
data.add(89)
data.add(3)
data.add(30)
data.add(93)
data.remove()
console.log(data.data)