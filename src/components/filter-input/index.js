import intent from "./intent";
import model from "./model";
import view from "./view";

export default function filterInput(DOM, name = `.my-form`) {
	var action$ = intent( DOM, name);
	var state$ = model( action$ );
	var vtree$ = view( name );
	return {DOM: vtree$, input$: state$};
}
