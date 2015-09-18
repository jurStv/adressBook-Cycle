import values from "ramda/src/values";
import any from "ramda/src/any";
import test from "ramda/src/test";
import compose from "ramda/src/compose";

var call = Function.prototype.call;
var getClassName = call.bind({}.toString);

var typeOf = function (s) {
    return function (v) {
      if (typeof v !== s) {
        throw new TypeError("Expected a " + (s === "object" ? "n" : "") + s + ".");
      }
      return v;
    };
  };
var classOf = function (s) {
  return function (v) {
    if (getClassName(v) !== "[object " + s + "]") {
      throw new TypeError("Expected " + s);
    }
    return v;
  };
};

var str = typeOf("string");
var arr = classOf("Array");

var arrOf = function (c) {
  return function (a) {
    return arr(a).map(c);
  };
};

var arrOfStrings = arrOf(str);

const findAnyMatchingString = (str) => compose( any( test( RegExp(str) ) ), arrOfStrings, values ) ;

export default findAnyMatchingString;
