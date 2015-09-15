export default function intent( DOM, item ){
	return {
		edit$: DOM.get(`.edit.${item._id}`, "click"),
		delete$: DOM.get(`.delete.${item._id}`, "click")
	};
}
