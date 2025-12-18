function linearSearch(ar,n){
  for(let i=0;i<ar.length;i++){
    if(ar[i] == n) return i
  }
  return -1
}
console.log(linearSearch([1,2,3,4,5],3));

function linearSearchRecursion(array, target, index=0){
    if(index==array.length) return false
    if(array[index] === target ) return index
    return linearSearchRecursion(array, target, index+1)
}
console.log(linearSearchRecursion([1,2,3,4,5],4));

function gLinear(ar,t){
  let result = []
  for (let i = 0; i < ar.length; i++) {
    if(ar[i] == t) result.push(i)    
  }
return result.length>0?result:-1
}
console.log(gLinear([1,2,3,2,4,5,6],2));


