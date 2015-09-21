import {Rx}	from "@cycle/core";

export default function intent( DOM, item$ ){
	return {
		edit$: item$.flatMap( item => DOM.get(`.edit.${item._id}`, "click") ),
		delete$: item$.flatMap( item => DOM.get(`.delete.${item._id}`, "click") )
	};
}
