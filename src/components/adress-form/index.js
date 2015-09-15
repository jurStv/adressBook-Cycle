import intent from "./intent";
import model from "./model";
import view from "./view";

export default function adressForm( DOM, edit$ ) {
	var action$ = intent(DOM);
	var states = model(action$);
	var vtree$ = view( states, edit$ );
	return {
		DOM: vtree$,
		submit$: states.valid$
	};
}
