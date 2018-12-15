export const shuffle = function(arr) {
  let _arr = arr.slice();
  let i = _arr.length;
  while (i) {
    let j = Math.floor(Math.random() * i--);
    [_arr[i], _arr[j]] = [_arr[j], _arr[i]];
  }
  return _arr;
};
