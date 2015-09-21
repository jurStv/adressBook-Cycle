export default function intent(DOM, name = ""){
  return DOM.get(`${name}.form-control.input-sm`, "input").publish().refCount();
}
