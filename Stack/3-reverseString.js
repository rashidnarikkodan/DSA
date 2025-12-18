import Stack from './stack_using_queue.js'

function reverseString(str){
    const stack = new Stack()
    let reverse = ''
    for(let c of str ) stack.push(c)
    while(stack.size()>0) reverse += stack.pop()
    return reverse
}

console.log(reverseString('anfihS'));
