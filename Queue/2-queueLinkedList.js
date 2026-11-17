class Node {
  constructor(val) {
    this.value = val;
    this.next = null;
  }
}
class Queue {
  constructor() {
    this.front = null;
    this.rear = null;
    this.length = 0;
  }
  enqueue(val) {
    const node = new Node(val);
    this.length++;
    if (!this.front) {
      this.front = this.rear = node;
      return;
    }

    this.rear.next = node;
    this.rear = node;
  }
  dequeue() {
    if (!this.front) return null;
    const val = this.front?.value;
    this.front = this.front.next;
    if (!this.front) this.last = null;
    this.length--;
    return val;
  }
  front() {
    return this.front.value;
  }
  isEmpty() {
    return this.front === null;
  }
  size() {
    return this.length;
  }
}
const queue = new Queue();
queue.enqueue(1);
queue.enqueue(2);
queue.enqueue(3);
console.log(queue.dequeue());
console.log(queue.size());
console.log(queue.front());
