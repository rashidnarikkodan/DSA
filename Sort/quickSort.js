
function quickSort(array){
    if(array.length <= 1) return array

    let pivot = array[0]
    let right = []
    let left = []
    for(let i = 1; i < array.length; i++){
        if(array[i] < pivot) left.push(array[i])
        else right.push(array[i])
    }
    return [...quickSort(left),pivot,...quickSort(right)]
}
console.log(quickSort([4,34,3,24,5,67,86]));