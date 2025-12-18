class Heap{
  constructor(type='min'){
    this.data = []
    this.type = type
  }
  insert(value){
    this.data.push(value)
    this.#bubbleUp(this.data.length-1)
  }
  remove(){
    const rm = this.data[0]
    this.data[0] = this.data.pop()
    this.#bubbleDown(0)
    return rm
  }
  buildHeap(arr){
    this.data = [...arr]
    let Lparent = this.#getParent(this.data.length-1)
    for(let i=Lparent;i>=0;i--){
      this.#bubbleDown(i)
    }
  }

  peek = () => this.data[0]
  size = () => this.data.length
  isEmpty = () => this.data.length === 0
  #getParent = (i) => Math.floor((i-1)/2)
  #getLeft = (i) => 2*i+1
  #getRight = (i) => 2*i+2
  #compare = (a,b) => a-b
  #swap = (i,j) => [this.data[i],this.data[j]]=[this.data[j],this.data[i]]

  #bubbleUp(i){
    if(i == 0) return
    let parent = this.#getParent(i)
    if(this.type=='min' && this.#compare(this.data[i], this.data[parent]) >= 0) return
    if(this.type=='max' && this.#compare(this.data[i], this.data[parent]) < 0) return
    this.#swap(i, parent)
    this.#bubbleUp(parent)
  }
  #bubbleDown(i){
    //  if(i>=this.data.length) return
      let left = this.#getLeft(i)
      let right = this.#getRight(i)
      let smallest = i
      if(this.type == 'min'){
        if(left < this.data.length && this.#compare(this.data[left],this.data[smallest]) < 0) smallest = left
        if(right < this.data.length && this.#compare(this.data[right],this.data[smallest]) < 0) smallest = right
      }else{
        if(left < this.data.length && this.#compare(this.data[left],this.data[smallest]) > 0) smallest = left
        if(right < this.data.length && this.#compare(this.data[right],this.data[smallest]) > 0) smallest = right
      }
      if(smallest === i) return;
      this.#swap(i,smallest)
      this.#bubbleDown(smallest)
    
  }
}
const heap = new Heap()
heap.buildHeap([2,1,3,4,43,5])
console.log(heap.data);
