/*Bubble Sort is a sorting algorithm that repeatedly swaps adjacent elements if they are in the wrong order,
causing larger elements to “bubble up”(goes to end) to the end of the list.*/

function bubbleSort(array) {
  let swapped;
  let length = array.length;
  do {
    swapped = false;
    for (let i = 0; i < length; i++) {
      if(array[i] > array[i+1]){
        [array[i],array[i+1]] = [array[i+1], array[i]];
        swapped = true;
      }
    }
    length--;
  } while (swapped);
  return array
}
console.log(bubbleSort([3,4,2,6,5,7]));
//O(n) as best case - o(n^2) as worst case
//here we have early exit if sorted array using swapped flag
//efficent and best

//Non-optimized bubbleSort
function bubbleSort3(array){
  let length = array.length;
  for(let i = 0; i < length; i++){
    for(let j = 0; j < length-i-1;j++){
      if(array[j]>array[j+1]){
        [array[j],array[j+1]]=[array[j+1],array[j]];
      }
    }
  }
  return array;
}
console.log(bubbleSort3([2,8,10,6,53,7]));
      //O(n^2) as best case - o(n^2) as worst case
      //here we didn't have early exit if sorted array.
      //simple logic but inefficent comparitivly