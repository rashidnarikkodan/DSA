function bubbleSort(array) {
  let swapped;
  let length = array.length;
  do {
    swapped = false;
    for (let i = 0; i < length; i++) {
      if (array[i] > array[i + 1]) {
        [array[i], array[i + 1]] = [array[i + 1], array[i]];
        swapped = true;
      }
    }
    length--;
  } while (swapped);
  return array;
}
function insertionSort(array) {
  let length = array.length;
  for (let i = 1; i < length; i++) {
    let currentElement = array[i];
    let j = i - 1;
    while (j >= 0 && array[j] > currentElement) {
      array[j + 1] = array[j];
      j--;
    }
    array[j + 1] = currentElement;
  }
  return array;
}
function selectionSort(array) {
  let length = array.length;
  for (let i = 0; i < length; i++) {
    let minIndex = i;
    for (let j = i + 1; j < length; j++) {
      if (array[j] < array[i]) minIndex = j;
    }
    [array[i], array[minIndex]] = [array[minIndex], array[i]];
  }
  return array;
}
function mergeSort(array) {
  let length = array.length;
  if (length <= 1) return array;
  let mid = Math.floor(length / 2);
  let left = mergeSort(array.slice(0, mid));
  let right = mergeSort(array.slice(mid));
  return merge(left, right);
}
function merge(left, right) {
  let sorted = [];
  while (left.length && right.length) {
    if (left[0] < right[0]) sorted.push(left.shift());
    else sorted.push(right.shift());
  }
  return [...sorted, ...left, ...right];
}

function quickSort(array) {
  if (array.length <= 1) return array;

  let pivot = array[0];
  let right = [];
  let left = [];
  for (let i = 1; i < array.length; i++) {
    if (array[i] < pivot) left.push(array[i]);
    else right.push(array[i]);
  }
  return [...quickSort(left), pivot, ...quickSort(right)];
}

console.log(selectionSort([3, 4, 2, 6, 5, 7]));
console.log(insertionSort([3, 4, 2, 6, 5, 7]));
console.log(bubbleSort([3, 4, 2, 6, 5, 7]));
console.log(mergeSort([3, 4, 2, 6, 5, 7]));
console.log(quickSort([3, 4, 2, 6, 5, 7]));
