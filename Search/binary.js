function binarySearch(arr, target) {
  let left=0;
  let right=arr.length-1
  while(left<=right){
    let mid=Math.floor((left+right)/2)
    if(arr[mid] == target) return mid
    if( arr[mid] < target ) left = mid+1
    else right = mid-1
  }
  return -1
}
console.log(binarySearch([1,2,3,4,5,6,7,8], 7));  // Output: 4


function binarySearchRecursion(array, target, left = 0, right = array.length-1){
  if(left>right)return false
  let mid = Math.floor((left+right)/2)
  if(array[mid] === target) return mid
  if(array[mid]<target) return binarySearchRecursion(array, target, mid+1, right)
    else return binarySearchRecursion(array, target, left, mid-1)
}
console.log(binarySearchRecursion([1,2,3,5,5,6,7,8],5));
