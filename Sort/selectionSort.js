/*Repeatedly selecting the smallest ( or highest) element from the unsorted part of the array
 and placing it at the beginning of the array. */

let arr = [3,2,4,5,3,1];

function selectionSort(array){
    let length = array.length
    for(let i = 0; i < length; i++){
        let minIndex = i
        for(let j = i+1; j < length; j++){
            if(array[j] < array[minIndex]) minIndex = j
        }
        [array[i],array[minIndex]]=[array[minIndex],array[i]]
    }
    return array
}
console.log(selectionSort(arr))