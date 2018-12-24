/* var x = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
function sh(arr) {
  var _arr = arr.slice();
  let i = _arr.length;
  while (i) {
    let j = Math.floor(Math.random() * i--);
    [_arr[i], _arr[j]] = [_arr[j], _arr[i]];
  }
  return _arr;
}
console.log(sh(x)); */
let x = "http://localhost:8080/#/home/music/recommend";
let y = /#(.*)/;
console.log(x.replace(y, "#/loadPage"));
