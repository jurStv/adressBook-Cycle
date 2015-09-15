import {Rx} 				from "@cycle/core";
import tableItem 		from "./table-item";


function tableConstructor( {DOM, list$, validator$} ) {
	 var ti$ = Rx.Observable.combineLatest( list$, validator$, ( {list} , valid) => {
		 return list.filter( valid.sel.bind(valid) ).map( adress => tableItem( DOM,  adress) );
	 } );
	 var vtree$ = ti$.map( (tis) => tis.map( (ti) => ti.DOM ) );
	 var edit$ = ti$.flatMapLatest( (tis) =>
	 		tis.map( (ti) => ti.edit$ )
		 		.reduce( (acc, cur) => acc.merge( cur ), new Rx.Subject()  )
		).share();
		var delete$ = ti$.flatMapLatest( (tis) =>
			 tis.map( (ti) => ti.delete$ )
				 .reduce( (acc, cur) => acc.merge( cur ), new Rx.Subject()  )
		 );
	return {
		DOM: vtree$,
		edit$,
		delete$
	}
}
export default tableConstructor;
