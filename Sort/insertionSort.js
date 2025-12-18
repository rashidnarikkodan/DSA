/* 
Insertion Sort is an in-place, comparison-based sorting algorithm that divides the array into a sorted left section 
and an unsorted right section,
repeatedly taking each element from the unsorted part and shifting larger elements in the sorted part to the right
until the element can be inserted into its correct position,
expanding the sorted section with each iteration.
*/

let arr = [5, 3, 8, 4, 2];

function insertionSort(array){
    let length = array.length
    for(let i = 1; i < length; i++){
        let currentElement = array[i];
        let j = i - 1;
        while(j >= 0 && array[j] > currentElement){
            array[j + 1] = array[j];
            j--;
        }
        array[j + 1] = currentElement;
    }
    return array;
}

console.log(insertionSort(arr));

/*
1 => {
    [5, 3, 8, 4, 2]
    cur = 3
    j = 0
    arr[j] = 5
    while(0 >= 0 && 5 > 3){
        arr[1] = 5  → [5, 5, 8, 4, 2]
        j = -1
    }
    insert currentElement (3) at arr[j+1] = arr[0]
    → [3, 5, 8, 4, 2]
}

2 => {
    [3, 5, 8, 4, 2]
    cur = 8
    j = 1
    arr[j] = 5
    while(1 >= 0 && 5 > 8) → false
    insert currentElement (8) → [3, 5, 8, 4, 2]
}

3 => {
    [3, 5, 8, 4, 2]
    cur = 4
    j = 2
    arr[j] = 8
    while(2 >= 0 && 8 > 4){
        arr[3] = 8 → [3, 5, 8, 8, 2]
        j = 1
    }
    while(1 >= 0 && 5 > 4){
        arr[2] = 5 → [3, 5, 5, 8, 2]
        j = 0
    }
    while(0 >= 0 && 3 > 4) → false
    insert currentElement (4) → arr[2] = 4
    → [3, 4, 5, 8, 2]
}

4 => {
    [3, 4, 5, 8, 2]
    cur = 2
    j = 3
    arr[j] = 8
    while(3 >= 0 && 8 > 2){
        arr[4] = 8 → [3, 4, 5, 8, 8]
        j = 2
    }
    while(2 >= 0 && 5 > 2){
        arr[3] = 5 → [3, 4, 5, 5, 8]
        j = 1
    }
    while(1 >= 0 && 4 > 2){
        arr[2] = 4 → [3, 4, 4, 5, 8]
        j = 0
    }
    while(0 >= 0 && 3 > 2){
        arr[1] = 3 → [3, 3, 4, 5, 8]
        j = -1
    }
    insert currentElement (2) → arr[0] = 2
    → [2, 3, 4, 5, 8]
}

✅ Final Sorted Output: [2, 3, 4, 5, 8]
*/
