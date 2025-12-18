

function mergeSort(array){
    let length = array.length
    if(length <= 1) return array
    let mid = Math.floor(length/2)
    let left = mergeSort(array.slice(0,mid));
    let right = mergeSort(array.slice(mid));
    return merge(left,right)
}
function merge(left,right){
    let sorted = []
    while(left.length && right.length){
        if(left[0]<right[0]) sorted.push(left.shift())
            else sorted.push(right.shift())
    }
    return [...sorted,...left,...right]
}
console.log(mergeSort([2,3,1,4,2,5,3,5,7,5,6]));
