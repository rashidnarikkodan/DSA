// class Node{
//     constructor(data){
//         this.value = data
//         this.next = null
//     }
// }

// class LinkedList{
//     constructor(){
//         this.head = null
//         this.tail = null
//     }
//     append(data){
//         const node = new Node(data)
//         if(!this.head){
//             this.head = this.tail = node
//             return
//         }
//         this.tail.next = node
//         this.tail = node
//     }
//     print(){
//         let current = this.head
//         let result = ''
//         while(current){
//             result+=current.value+'=>'
//             current=current.next
//         }
//         console.log(result+current);
//     }
//     indexAt(index){
//         let current = this.head
//         let count = 0
//         while(current && count < index-1){
//             count++
//             current=current.next
//         }
//         current.next = current.next.next
//         if(current.next == null) this.tail = current
//     }
//     reverse(){
//         let current = this.head
//         let prev = null
//         let next = null
//         while(current){
//             next = current.next
//             current.next = prev
//             prev = current
//             current = next
//         }
//         this.head = prev
//     }
// }

// const list = new LinkedList()
// list.append(1)
// list.append(2)
// list.append(3)
// list.append(4)
// list.append(5)
// list.append(6)
// list.indexAt(4)
// list.print()
// list.reverse()
// list.print()


// const ar = [1,2,3,4,5]

// function sum(ar,i=0){
//     console.log(i)
//     if(i==ar.length) return 0
//     return ar[i] + sum(ar,i+1)
// }

// console.log(sum(ar));


// function binary(ar,target,left=0,right = ar.length-1){

//     if(left>right) return -1

//     let mid = Math.floor((left+right)/2)

//     if(ar[mid] == target) return mid
//     if(ar[mid]<ar[left]){
//         return binary(ar,target,left,right=mid-1)
//     }else{
//         return binary(ar,target,left=mid+1,right)
//     }
    
// }
// console.log(binary([1,2,3,4,5],3));


// const str = 'malayalam'

// function rm(str){
//     let ar=str.split('')
//     for(let i=0;i<ar.length;i++){
//         if(/[aeiou]/i.test(ar[i])){
//             ar.splice(i,1)
//         }
//     }
//     return ar.join('')
// }
// console.log(rm(str));
