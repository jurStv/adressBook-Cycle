import model from "./model";
import view from "./view";

export default function main( DOM, store$, validator$ ) {
 var states = model( DOM, store$, validator$ );
 var vtree$ = view( states.ti$ );
return {
		DOM: vtree$,
		edit$: states.edit$,
		delete$: states.delete$
	}
}
