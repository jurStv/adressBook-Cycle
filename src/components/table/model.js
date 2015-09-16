import {Rx} 						from "@cycle/core";
import tableRow 				from "./table-row/index";
import findAnyMatching	from "./helpers/findAnyMatching";

export default function model( DOM, store$, filterInput$ = new Rx.Subject() ){
  var ti$ = Rx.Observable.combineLatest( store$, filterInput$.startWith(""), ( store , str) => {
    var list = Object.assign( {}, store ).list;
 	 return list.filter( findAnyMatching(str) ).map( adress => tableRow( DOM,  adress) );
  } );
  var edit$ = ti$.flatMapLatest( (tis) =>
  		tis.map( (ti) => ti.edit$ )
 	 		.reduce( (acc, cur) => acc.merge( cur ), new Rx.Subject()  )
 	).share();
 	var delete$ = ti$.flatMapLatest( (tis) =>
 		 tis.map( (ti) => ti.delete$ )
 			 .reduce( (acc, cur) => acc.merge( cur ), new Rx.Subject()  )
 	 );
   return {  ti$, edit$, delete$  };
}
