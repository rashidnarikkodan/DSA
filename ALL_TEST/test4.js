function bubbleSort(arr){
    let n=arr.length
    if(arr.length<=1)return arr
    let swapped;
    do{
        swapped = false
        for(let i=0;i<n;i++){
            if(arr[i]>arr[i+1]){
                [arr[i],arr[i+1]] = [arr[i+1],arr[i]]
                swapped = true
            }
        }
        n--
    }while(swapped)
    return arr
}

console.log(bubbleSort([3,2,4,5,3,1]));

function selectionSort(arr){
    let n = arr.length
    for(let i=0;i<n;i++){
        let minIndex = i
        for(let j=i+1;j<n;j++){
            if(arr[j]<arr[minIndex]) minIndex = j
        }
        [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]]
        
    }
    return arr
}
console.log(selectionSort([3,2,4,5,3,1]));

function insertionSort(arr){
    for(let i=1;i<arr.length;i++){
        let cur = arr[i]
        let j = i - 1
        while(j>=0&&arr[j]>cur){
            arr[j+1] = arr[j]
            j--
        }
        arr[j+1] = cur
    }
    return arr
}
    console.log(insertionSort([3,2,4,5,3,1]));
    
    
function mergeSort(arr){
    if(arr.length<=1)return arr
    let mid = Math.floor(arr.length/2);
    let left = mergeSort(arr.slice(0,mid))
    let right = mergeSort(arr.slice(mid))
    return merge(left,right)
}
function merge(left,right){
    let sorted=[]
    while(left.length && right.length){
        if(left[0]<right[0]) sorted.push(left.shift())
            else sorted.push(right.shift())
    }
    return [...sorted,...left,...right]
}
    console.log(mergeSort([3,2,4,5,3,1]));
    
    
    function quickSort(arr){
        if(arr.length<=1)return arr
        let pivot = arr[0]
        let left = []
        let right = []
        for(let i=1;i<arr.length;i++){
            if(arr[i]<pivot) left.push(arr[i])
                else right.push(arr[i])
        }
        return [...quickSort(left),pivot,...quickSort(right)]
    }
        console.log(quickSort([3,2,4,5,3,1]));