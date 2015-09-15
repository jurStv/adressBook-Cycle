import makeForm from "./helpers/makeForm";

export default function view( { valid$, wrong$ }, edit$ ) {
	var vtreeSuccess$ = valid$.map( () => makeForm() );
	var vtreeFail$ = wrong$.map( ( {wrongAdr, errorObj} ) => makeForm( wrongAdr, errorObj ) );
	var vtreeEdit$ = edit$.map( (item) => makeForm( item ));
	var vtree$ = vtreeSuccess$.merge(vtreeEdit$).merge( vtreeFail$ ).startWith( makeForm() );
	return vtree$;
}
