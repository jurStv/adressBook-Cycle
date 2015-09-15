export default function intent(DOM) {
	return DOM.get("#form", "submit").map( e => {
		e.preventDefault();
		return e.target.elements;
	} );
}
