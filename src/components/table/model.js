import {Rx} 						from "@cycle/core";
import tableItem 				from "./table-row/index";
import findAnyMatching	from "./helpers/findAnyMatching";

export default function model( DOM, list$, filterInput$ = new Rx.Subject() ){
  var ti$ = Rx.Observable.combineLatest( list$, filterInput$.startWith(""), ( {list} , str) => {
 	 return list.filter( findAnyMatching( str ) ).map( adress => tableItem( DOM,  adress) );
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
