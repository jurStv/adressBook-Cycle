import model from "./model";
import view from "./view";

export default function main( DOM, list$, validator$ ) {
 var states = model( DOM, list$, validator$ );
 var vtree$ = view( states.ti$ );
return {
		DOM: vtree$,
		edit$: states.edit$,
		delete$: states.delete$
	}
}
