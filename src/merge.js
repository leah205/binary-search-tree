function mergeSort(arr) {
  if (arr.length <= 1) {
    return arr;
  }
  let halfLength = Math.ceil(arr.length / 2);
  let left = mergeSort(arr.slice(0, halfLength));
  let right = mergeSort(arr.slice(halfLength, arr.length));
  let sorted = [];
  while (left.length && right.length) {
    if (left[0] < right[0]) {
      sorted = sorted.concat(left.shift());
    } else {
      sorted = sorted.concat(right.shift());
    }
  }
  sorted = sorted.concat(left);
  sorted = sorted.concat(right);

  return sorted;
}
export default mergeSort;
