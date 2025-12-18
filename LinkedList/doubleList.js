class Node{
  constructor(data){
    this.value  = data
    this.next = null
  }
}

class LinkedList{
  constructor(){
    this.head = null
    this.tail = null
  }

  //CREATE Operations
  prepend(value){
    const node = new Node(value)
    if(!this.head) return this.head = this.tail = node
    node.next = this.head
    this.head = node
  }

  append(value){
    const node = new Node(value)
    if(!this.head) return this.head = this.tail = node
    this.tail.next = node
    this.tail = node
  }

  insertAt(value,index){
    const node = new Node(value)
    if(!this.head || index === 0){
      node.next = this.head
      this.head = node
      if(!this.tail) this.tail = node
    }
    let count = 0
    let current = this.head
    while(current && count < index-1){
      current = current.next
      count++
    }
    if(!current) return console.log(`index out of range`)
    node.next = current.next
    current.next = node
    if(!node.next) this.tail = node
  }

  insertAfter(value,nodeValue){
    const node = new Node(value)
    let current = this.head
    while(current && current.value !== nodeValue) current = current.next
    if(!current) return console.log('No such values found')
      node.next = current.next
    current.next = node
    if(!node.next) this.tail = node
  }

    insertBefore(value,nodeValue){
    const node = new Node(value)
    let current = this.head
    if(current.value == nodeValue){
      node.next = this.head
      this.head = node
      return
    }
    while(current.next && current.next.value !== nodeValue) current = current.next;
    if(!current.next) return console.log('InsertBefore : Value not found')
      node.next = current.next
      current.next = node
  }

  //DELETE Operations
  deleteEnd(){
    let current = this.head
    while(current.next.next){
      current=current.next
    }
    current.next = null
    this.tail = current
  }

  deleteStart(){
    this.head = this.head.next
  }

  deleteByValue(value){
    let current = this.head
    if(current.value == value){
      return this.head = this.head.next
    }
    while(current.next && current.next.value !== value){
      current = current.next
    }
    if(!current.next) return console.log(`delete by value : ${value} is not a value in this list`)
    current.next = current.next.next

    if(current.next === null) this.tail = current
  }

  deleteByIndex(index){
    let current = this.head
    let count = 0
    if(index === 0 )return this.head = this.head.next
    if(index<0)return console.log('invalid index')
    while(current.next && count < index-1){
      current = current.next;
       count++
    } 
    if(!current.next) return console.log(`delete By Index : ${index} is not a inde in this linked list`);
    
    current.next = current.next.next
    if(!current.next) this.tail = current
  }

  //UPDATE Operations

  removeDupl(){
    let current = this.head
    while(current){
      if(current.next && current.next.value === current.value){
        current.next = current.next.next
      }else{
        current = current.next
      }
    } 
  }
  // sort(){
  //   if(!this.head || !this.head.next) return
  //   let swapped;
  //   do{
  //     swapped = false;
  //     let current = this.head
  //     while(current){
  //       if(current.next&&current.value>current.next.value){
  //         let temp = current.value;
  //         current.value = current.next.value
  //         current.next.value = temp
  //         swapped = true
  //       }
  //       current = current.next
  //     }
  //   }while(swapped)
  // }

  //
  //list => 30-10-40-20-50
  //c.v>c.n.v => 10-30-40-20-50 swapped
  //c.v>c.n.v => 10-30-40-20-50 not swapped

  sort(){
    if(!this.head||!this.head.next) return
    let swapped;
    do{
      swapped = false
      let current = this.head
      while(current){
        if( current.next && current.value > current.next.value ){
          let temp = current.value
          current.value = current.next.value
          current.next.value = temp
          swapped = true
        }
        current = current.next
      }
    }while(swapped)
  }
  
  //READ Operations
  findByIndex(index){
    let current = this.head
    let count=0
    while(current&&count < index){
      current = current.next
      count++
    }
    return current?current.value:current
  }

  length(){
    let current = this.head
    let size = 0
    while(current){
      current = current.next
      size++
    }
    console.log(size);
    
  }

  print(){
    let current=this.head
    let result = ''
    while(current) {
      result+=current.value+'=>';
      current = current.next
    }
    console.log(result+current);
  }

  reverse(current=this.head){
    if(!current) return;
    this.reverse(current.next)
    console.log(current.value);
  }

}  

const list = new LinkedList()

list.append(30)
list.append(10)
list.append(40)
list.append(20)
list.append(50)
list.sort()
list.print()
