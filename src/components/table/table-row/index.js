import intent from "./intent";
import model from "./model";
import view from "./view";
import {Rx}	from "@cycle/core";

export default function main( DOM, data ){
	var data$ = Rx.Observable.just(data);
	var actions = intent(DOM, data);
	var states = model(actions, data$);
	var vtree$ = view(data$);
	return {
		DOM: vtree$,
		edit$: states.editItem$,
		delete$: states.deleteItem$
	};
}
