import values from "ramda/src/values";
import any from "ramda/src/any";
import test from "ramda/src/test";
import compose from "ramda/src/compose";

const findAnyMatching = (str) => compose( any( test( RegExp(str) ) ), values ) ;

export default findAnyMatching;
