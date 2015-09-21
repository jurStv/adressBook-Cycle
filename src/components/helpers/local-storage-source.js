import containsWith from "ramda/src/containsWith";
import append from "ramda/src/append";
import compose from "ramda/src/compose";

function deepFreeze(o) {
  var prop, propKey;
  Object.freeze(o);
  for (propKey in o) {
    prop = o[propKey];
    if (!o.hasOwnProperty(propKey) || !(typeof prop === 'object') || Object.isFrozen(prop)) {
      continue;
    }
    deepFreeze(prop);
  }
  return o;
}

const addDefaultUniq = (defItem, key, items) => {
  return  ( containsWith( (a,b) => {return a[key] === b[key]}, defItem, items  ) )
  ?
    items
  :
    append(defItem, items);
}

const safeJSONParse = str => JSON.parse(str) || {list:[]};
const mergeWithDefaultAdresses = adresses => {
  let defaultAdresses = [{email: "key@key.com", firstname: "key", lastname: "key", _id: "test_id1106306"}];
  return {list: addDefaultUniq( defaultAdresses[0], "_id", adresses.list ) }
}
function deserialize(localStorageValue$) {
  return localStorageValue$
    .map(safeJSONParse)
    .map(deepFreeze)
}
function deserializeWithDefaults(localStorageValue$) {
  return localStorageValue$
    .map( compose( deepFreeze , mergeWithDefaultAdresses, safeJSONParse ) )
}
export default {deserialize, deserializeWithDefaults};
