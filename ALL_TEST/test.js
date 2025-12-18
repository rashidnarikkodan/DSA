// sum of array - recursion
function sum(ar, i = 0) {
  if (ar.length == i) return 0;
  return ar[i] + sum(ar, i + 1);
}
console.log("sum :- " + sum([3, 7, 2, 5])); // expected: 17

// reverse array - recursion
function reverseArray(ar, i = 0, j = ar.length - 1) {
  if (i >= j) return ar;
  [ar[i], ar[j]] = [ar[j], ar[i]];
  return reverseArray(ar, i + 1, j - 1);
}
console.log("reverseArray :- ", reverseArray([1, 2, 3, 4])); // expected: [4,3,2,1]

// factorial - recursion
function factorial(n) {
  if (n === 0) return 1;
  return n * factorial(n - 1);
}
console.log("factorial :- " + factorial(5)); // expected: 120

// fibonacci - recursion
function fibonacci(n) {
  if (n < 2) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}
console.log("fibonacci :- " + fibonacci(6)); // expected: 8 ---0 1 1 2 3 5 8----

// count digits - recursion
function countDigits(n, count = 0) {
  if (n == 0) return count || 1;
  count++;
  return countDigits(Math.floor(n / 10), count);
}
console.log("countDigits :- " + countDigits(123)); // expected: 5

// palindrome check - recursion
function isPalindrome(str, i = 0, j = str.length - 1) {
  if (j <= i) return true;
  if (str[i] !== str[j]) return false;
  return isPalindrome(str, i + 1, j - 1);
}
console.log("isPalindrome :- " + isPalindrome("awa")); // expected: true

// find max in array - recursion
function findMax(ar, i = 0, max = -Infinity) {
  if (ar.length == i) return max;
  if (ar[i] > max) max = ar[i];
  return findMax(ar, i + 1, max);
}
console.log("findMax :- " + findMax([10, 2, 45, 33, 7])); // expected: 45

// print array in reverse - recursion
function printReverse(ar, i = ar.length - 1) {
  if (i < 0) return;
  console.log(ar[i]);
  printReverse(ar, i - 1);
}
console.log("printReverse :- ");
printReverse([1, 4, 9]); // expected print: 9 4 1

// product of array - recursion
function product(ar, i = 0) {
  if (i === ar.length) return 1;
  return ar[i] * product(ar, i + 1);
}
console.log("product :- " + product([2, 4, 3])); // expected: 24

// power - recursion
function power(base, exp) {
  if (exp === 0) return 1;
  return base * power(base, exp - 1);
}
console.log("power :- " + power(2, 5)); // expected: 32

//second set of 10 question

// binary search - recursion
function binarySearch(ar, target, left = 0, right = ar.length - 1) {
  if (left >= right) return -1;
  let mid = Math.floor((left + right) / 2);
  if (ar[mid] === target) return mid;
  if (ar[mid] < target)
    return binarySearch(ar, target, (left = mid + 1), right);
  else return binarySearch(ar, target, left, (right = mid - 1));
}
console.log("binarySearch :- " + binarySearch([1, 2, 3, 4, 5, 6, 7], 4)); // expected: 3

// print numbers 1 to n - recursion
function printOneToN(n, i = 1) {
  if (i > n) return;
  console.log(i);
  printOneToN(n, i + 1);
}

console.log("printOneToN :- ");
printOneToN(5); // expected: 1 2 3 4 5

// print numbers n to 1 - recursion
function printNtoOne(n) {
  if (n == 0) return;
  console.log(n);
  printNtoOne(n - 1);
}
console.log("printNtoOne :- ");
printNtoOne(5); // expected: 5 4 3 2 1

// sum of digits - recursion
function sumOfDigits(n) {
  if (n == 0) return 0;
  return (n % 10) + sumOfDigits(Math.floor(n / 2));
}
console.log("sumOfDigits :- " + sumOfDigits(987)); // expected: 24

// check array sorted (ascending) - recursion
function isSorted(ar, i = 0) {
  if (ar.length == i) return true;
  if (ar[i] > ar[i + 1]) return false;
  return isSorted(ar, i + 1);
}
console.log("isSorted :- " + isSorted([1, 2, 3, 4, 5])); // expected: true

// count occurrences - recursion
function countOccurrences(ar, target, i = 0, count = 0) {
  if (ar.length == i) return count;
  if (ar[i] == target) count++;
  return countOccurrences(ar, target, i + 1, count);
}
console.log("countOccurrences :- " + countOccurrences([1, 2, 2, 5, 2, 7], 2)); // expected: 3

// find index of element - recursion
function findIndex(ar, target, i = 0) {
  if (ar.length == i) return -1;
  if (ar[i] == target) return i;
  return findIndex(ar, target, i + 1);
}
console.log("findIndex :- " + findIndex([10, 20, 30, 40, 50], 30)); // expected: 2

// reverse a string - recursion
function reverseString(str) {
  if (str.length == 0) return str;
  return reverseString(str.slice(1)) + str[0];
}
console.log("reverseString :- " + reverseString("mentor")); // expected: "rotnem"

// gcd using recursion (Euclid's)
function gcd(a, b) {
  if (b == 0) return a;
  return gcd(b, a % b);
}
console.log("gcd :- " + gcd(48, 18)); // expected: 6

// print all subsets of array - recursion
function printSubsets(ar, i = 0, subset = []) {

}

console.log("printSubsets :- ");
printSubsets([1, 2]);
// expected: [], [1], [2], [1,2]  (order may vary)




//linked list singly
class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}
class SingleList {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  //add value at end
  append(val) {
    const node = new Node(val);
    if (!this.head) return (this.head = this.tail = node);
    this.tail.next = node;
    this.tail = node;
  }

  //add value at start
  prepend(val) {
    const node = new Node(val);
    if (!this.head) return (this.head = this.tail = node);
    node.next = this.head;
    this.head = node;
  }

  //add value after a index
  at(val, index) {
    const node = new Node(val);
    let current = this.head;
    let count = 0;
    while (current && count < index - 1) {
      current = current.next;
      count++;
    }
    node.next = current.next;
    current.next = node;
  }

  //reverse linked list
  reverse() {
    let prev = null;
    let next = null;
    let current = this.head;
    while (current) {
      next = current.next;
      current.next = prev;
      prev = current;
      current = next;
    }
    this.head = prev;
  }

  //delete value at end
  pop() {
    let current = this.head;
    while (current.next.next) {
      current = current.next;
    }
    current.next = null;
    this.tail = current;
  }
  shift() {
    this.head = this.head.next;
  }
  insertAfter(value, nodeValue) {
    const node = new Node(value);
    let current = this.head;
    while (current && current.val !== nodeValue) current = current.next;
    if (!current) return console.log("No such values found");
    node.next = current.next;
    current.next = node;
    if (!node.next) this.tail = node;
  }
  insertBefore(value, nodeValue) {
    const node = new Node(value);
    let current = this.head;
    if (current.val == nodeValue) {
      node.next = this.head;
      this.head = node;
      return;
    }
    while (current.next && current.next.val !== nodeValue)
      current = current.next;
    if (!current.next) return console.log("InsertBefore : Value not found");
    node.next = current.next;
    current.next = node;
    if (!node.next) this.tail = node;
  }
  deleteByValue(value) {
    let current = this.head;
    if (current.val === value) return (this.head = this.head.next);
    while (current.next && current.next.val !== value) current = current.next;
    if (!current.next)
      return console.log(
        `delete by value : ${value} is not a value in this list`
      );
    current.next = current.next.next;
    if (!current.next) this.tail = current;
  }
  deleteByIndex(index) {
    let current = this.head;
    let count = 0;
    if (index === 0) return (this.head = this.head.next);
    if (index < 0) return console.log("invalid index");
    while (current && count < index - 1) {
      current = current.next;
      count++;
    }
    if (!current)
      return console.log(
        `delete By Index : ${index} is not a inde in this linked list`
      );
    current.next = current.next.next;
    if (!current.next) this.tail = current;
  }

  updateByIndex(value, index) {
    let current = this.head;
    let count = 0;
    while (current && count < index) {
      current = current.next;
      count++;
    }
    if(!current)return console.log('No index found');
    
    current.val = value;
  }
  removeDuplicate(){
    let current = this.head
    let set = new Set()
    let prev = null
    while(current){
      if(set.has(current.val)){
        prev.next = current.next
        if(!prev.next)this.tail = prev
      }else{
        set.add(current.val)
        prev = current
      }
      current = current.next
    }
  }

  print() {
    let cur = this.head;
    let result = "";
    while (cur) {
      result += cur.val + "=>";
      cur = cur.next;
    }
    console.log(result ? result + cur : "list is Empty");
  }
  printReverse() {
    console.log(this.tail)
  }
  length() {
    let current = this.head;
    let count = 0;
    while (current) {
      current = current.next;
      count++;
    }
    console.log(count);
  }
  findByValue(value) {
    let current = this.head;
    let count = 0;
    if (current.val === value) return count;
    while (current && current.val !== value) {
      count++;
      current = current.next;
    }
    if (!current)
      return console.log(
        `find by value : ${value} is not a value in this list`
      );
    return count;
  }
  findByIndex(index) {
    let current = this.head;
    let count = 0;
    if (index == 0)
      return console.log("ef" + current ? current.val : "No value found");
    while (current && count < index) {
      count++;
      current = current.next;
    }
    console.log(current ? current.val : "No value found");
  }
  clear() {
    this.head = null;
    this.tail = null;
  }
  isEmpty() {
    return this;
  }
}
const list = new SingleList();
list.append(1);
list.append(5);
list.append(2);
list.append(4);
list.append(6);
list.append(7);
list.pop()
list.print();


// Doubly Linked List Implementation
// Node structure


console.log('DOUBLE LINKED LIST');

class DNode {
  constructor(val) {
    this.val = val; // value
    this.next = null; // pointer to next node
    this.prev = null; // pointer to previous node
  }
}

class DoubleList {
  constructor() {
    this.head = null; // start of list
    this.tail = null; // end of list
    this.length = 0; // size
  }

  // ===================== CREATE =====================

  // Insert node at the end (append)
  append(val) {
    const node = new DNode(val);
    if (!this.head) {
      this.length++;
      return (this.head = this.tail = node);
    }
    this.tail.next = node;
    node.prev = this.tail;
    this.tail = node;
    this.length++;
  }

  // Insert node at the beginning (prepend)
  prepend(val) {
    const node = new DNode(val);
    if (!this.head) {
      this.length++;
      return (this.head = this.tail = node);
    }
    this.head.prev = node;
    node.next = this.head;
    this.head = node;
    this.length++;
  }

  // Insert node at specific index
  atIndex(val, ind) {
    if (ind === 0) return this.prepend(val);
    if (ind === this.length - 1) return this.append(val);

    const node = new DNode(val);
    let current = this.head;
    let count = 0;

    while (current && count < ind) {
      current = current.next;
      count++;
    }

    if (!current) return console.log("Index not found");

    node.prev = current.prev;
    node.prev.next = node;
    current.prev = node;
    node.next = current;

    this.length++;

    if (!node.next) this.tail = node;
  }

  // Insert node after a given value
  insertAfter(val, ref) {
    const node = new DNode(val);
    let current = this.head;

    while (current && current.val !== ref) current = current.next;

    if (!current) return;

    node.next = current.next;
    node.prev = current;

    if (current.next) current.next.prev = node;

    current.next = node;
    this.length++;

    if (!node.next) this.tail = node;
  }

  // Insert node before a given value
  insertBefore(val, ref) {
    const node = new DNode(val);
    let current = this.head;

    while (current && current.val !== ref) current = current.next;

    if (!current) return;

    node.prev = current.prev;
    if (current.prev) current.prev.next = node;

    node.next = current;
    current.prev = node;

    this.length++;

    if (!node.prev) this.head = node;
    if (!node.next) this.tail = node;
  }

  // Build list from array
  fromArray(ar) {
    ar.forEach((elem) => this.append(elem));
  }

  // ===================== READ =====================

  // Print list forward
  print() {
    let cur = this.head;
    let result = "";

    while (cur) {
      result += cur.val + "=>";
      cur = cur.next;
    }

    console.log(result ? result + cur : "list is Empty");
  }

  // Print list backward
  Rprint() {
    let cur = this.tail;
    let result = "";

    while (cur) {
      result += cur.val + "=>";
      cur = cur.prev;
    }

    console.log(result ? result + cur : "list is Empty");
  }

  // Return size
  size() {
    console.log(this.length);
  }

  //search
  searchByIndex(index){
    let current = this.head
    let count = 0
    while(current && count < index){
      current = current.next
      count++
    }
    if(!current) return console.log('Index not found')
    console.log(current.val)
    return current
  }
  search(val){
    let current = this.head
    let count = 0
    while(current&&current.val !== val){
      current = current.next
      count++
    }
    console.log(count)
  }

  // ===================== UPDATE =====================
  reverse(){
    let current = this.head
    while(current){
      [current.next,current.prev]=[current.prev,current.next]
      current = current.prev
    }
    [this.head,this.tail] = [this.tail,this.head]
  }
  updateByIndex(val,index){
    let current = this.head
    let count = 0
    while(current && count<index){
      current = current.next;
      count++
    }
    current.val = val
  }
  toArray(){
    let ar=[]
    let current = this.head
    while(current){
      ar.push(current.val)
      current = current.next
    }
    return ar
  }
  removeDuplicates(){
    let set = new Set()
    let current = this.head
    while(current){

      if(set.has(current.val)){
        current.prev.next = current.next
        if(current.next){
          current.next.prev = current.prev
        }
        if (current === this.tail) this.tail = current.prev;
      }else{
        set.add(current.val)
      }

      current = current.next
    }
  }

  // ===================== DELETE =====================

  pop() {
    this.tail.prev.next = null;
    this.tail = this.tail.prev;
    this.length--;
  }
  shift() {
    this.head.next.prev = null;
    this.head = this.head.next;
    this.length--;
  }
  deleteByIndex(index) {
    let current = this.head;
    let count = 0;
    if (index === 0) return this.shift();
    if (index === this.length - 1) return this.pop();
    while (current && count < index) {
      current = current.next;
      count++;
    }
    if(!current) return console.log('No index found');
    
    current.prev.next = current.next 
    current.next.prev = current.prev
    this.length--;
  }
  deleteByValue(val){
    let current = this.head;
    if (current.val === val) return this.shift();
    if (val === this.tail.val) return this.pop();
    while (current && current.val !== val) {
      current = current.next;
    }
    if(!current) return console.log('No value found');
    
    current.prev.next = current.next 
    current.next.prev = current.prev
    this.length--;
  }
  clear(){
    this.head = this.tail = null
    this.length = 0
  }
}

// Example usage
const dlist = new DoubleList();
dlist.append(1);
dlist.append(1);
dlist.append(2);
dlist.append(5);
dlist.append(2);
dlist.append(2);
dlist.append(2);
dlist.append(7);
dlist.append(4);
dlist.append(3);
dlist.append(3);
dlist.append(4);
dlist.append(4);
dlist.removeDuplicates()
dlist.print();
dlist.Rprint();
dlist.size();




function binary(arr, target){
  let right = arr.length-1
  let left = 0
  while(left<=right){
    let mid = Math.floor((left+right)/2)
    if(arr[mid] === target) return mid
    if(arr[mid]>target) right = mid-1
    else left = mid+1
  }
  return -1
}
console.log(binary([1,2,3,4,5,6],6));


function recursiveBinary(arr,target,left = 0, right = arr.length-1){
  if(left > right)return -1
  let mid = Math.floor((left+right)/2)
  if(arr[mid] === target) return mid
  if(arr[mid] > target) return recursiveBinary(arr,target,left,right = mid-1)
  else return recursiveBinary(arr,target,left = mid+1,right)
}

console.log(recursiveBinary([1,2,3,4],2));
