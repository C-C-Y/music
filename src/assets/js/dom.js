function addClass(el, className) {
  if (hasClass(el)) {
    return;
  }
  let newClassName = el.className + " " + className;
  el.className = newClassName;
}

function hasClass(el, className) {
  let reg = new RegExp(`(^|\\s)` + className + `(\\s|$)`);
  return reg.test(el.className);
}

let eleStyle = document.createElement("div").style;
let vendor = (() => {
  let transforNames = {
    webkit: "webkitTransform",
    Moz: "MozTransform",
    O: "OTransform",
    ms: "msTransform",
    standard: "transform"
  };
  for (let key in transforNames) {
    if (eleStyle[transforNames[key]] !== undefined) {
      return key;
    }
    return false;
  }
})();
function prefixStyle(style) {
  if (vendor == false) {
    return false;
  }
  if (vendor == "standard") {
    return style;
  }
  return vendor + style[0].toUpperCase() + style.slice(1);
}
export { addClass, prefixStyle };
