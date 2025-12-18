function bubbleSort(ar){
  let n = ar.length
  let swapped;
  let count = 0
  do{
      swapped = false;
      for(let i=0;i<n-1;i++){
          if(ar[i]>ar[i+1]){
              [ar[i],ar[i+1]]=[ar[i+1],ar[i]]
              swapped = true
              count++
          }
      }
      n--
  }while(swapped)
  return {ar,count}
}

console.log(bubbleSort([2,1,54,3,12,42,4]))

function selectionSort(ar){
    let n = ar.length
    for (let i = 0; i < n; i++) {//i=0 - 0 < 7 - 0+1// i=1; 1 < 7; 1+1// 
        let minIndex = i //minIndex = 0// mI = 1 //
        for(let j = i+1; j< n ;j++){ //j = 0+1 = 1; 1<7 ; 1+1 // j = 2; 2<7;2+1
            if(ar[j]<ar[minIndex]){ //1 < 2 -true // 
                minIndex = j//minIndex(0) = 1
            }
        }
        if(minIndex!==i) [ar[i],ar[minIndex]]=[ar[minIndex],ar[i]]// [2,1,54,3,12,42,4] //
    }
    return ar
}
console.log(selectionSort([2,1,54,3,12,42,4]))
// [1,2,54,3,12,42,4]
// [1,2,54,3,12,42,4]
// [1,2,54,3,12,42,4]

function selectionSort1(ar){
    let n = ar.length
    for (let i = 0; i < n; i++) {
        for(let j = i+1; j< n ;j++){
            if(ar[j]<ar[i]) [ar[i],ar[j]]=[ar[j],ar[i]]
        }
    }
    return ar
}
console.log(selectionSort1([2,1,54,3,12,42,4]))


function insertionSort(ar){
    let n = ar.length
    for(let i = 1; i<n; i++){
        let key = ar[i]
        let j = i-1
        while(j>=0&&ar[j]>key){
            ar[j+1] = ar[j];
            j--
        }
        ar[j+1] = key
    }
    return ar
}
console.log(insertionSort([2,1,4,3,64,6,4,654,8]))