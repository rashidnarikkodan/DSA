class Node{
    constructor(val){
        this.val = val
        this.next = null
    }
}

class LinkedList{
    constructor(){
        this.head = null;
        this.tail = null
    }
    append(val){
        const node = new Node(val)
        if(!this.head) {
            this.head = this.tail = node;
            return;
        }
        this.tail.next = node
        this.tail = node
    }
    print(){
        let current = this.head;
        let result = ''
        while(current){
            result+=current.val+' => '
            current = current.next
        }
        console.log(result + 'null');
        
    }
    reverse(){
        let current = this.head
        let prev = null
        let next = null
        while(current){
            next = current.next
            current.next = prev
            prev = current
            current = next
        }
        this.head = prev
    }
    removemiddle(){
        let slow = this.head
        let fast = this.head
        let prev = null
        while(fast&&fast.next){
            prev = slow
            slow = slow.next
            fast = fast.next.next
        }
        prev.next = slow.next
    }
    removeDupl(){
        let current = this.head
        while(current.next){
            if(current.val == current.next.val){
                current.next = current.next.next
            }
            current = current.next
        }
    }
}
const list = new LinkedList()
list.append(1)
list.append(2)
list.append(3)
list.append(4)
list.append(4)
list.append(5)
list.removeDupl()
list.print()

list.print()

function sum(ar,i=0){
    if(i==ar.length)return 0
    return ar[i]+sum(ar,i+1)
}
console.log(sum([1,2,3,4,5]));

function power(x,z){
    if(z==0)return 1
    return x*power(x,z-1)
} 
console.log(power(3,2));

function reverse(str){
    if(str.length == 0 )return ''
    return reverse(str.slice(1))+str[0]
}
console.log(reverse('hello'));

function fibonacci(n){
    if(n<2) return n
    return fibonacci(n-1)+fibonacci(n-2)
}
console.log(fibonacci(6));

function sum(n){
    if(n==0)return 0
    return n%10+sum(Math.floor(n/10))
}
console.log(sum(1234));

function countN(n,count=0){
    if(n==0) return count;
    count++
    return countN(Math.floor(n/10),count)
}
console.log(countN(12345));

function gcd(a,b){
    if(b==0)return a
    return gcd(b,a%b)
}
console.log(gcd(20,8));
gcd(20,8)
gcd(8,4)
gcd(4,0)