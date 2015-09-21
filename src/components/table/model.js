import {Rx} 						from "@cycle/core";
import tableRow 				from "./table-row/index";
import findAnyMatching 	from "./helpers/findAnyMatching";

const grabAndJoinActions = (field, action$) => action$.flatMapLatest( (actions) =>
    actions.map( (el) => el[field] )
    .reduce( (acc, cur) => acc.merge( cur ), Rx.Observable.never()  )
)
export default function model( DOM, store$, filterInput$ = Rx.Observale.never() ){
  var ti$ = Rx.Observable.combineLatest( store$, filterInput$.startWith(""), ( store , str) => {
    let list = Object.assign( {}, store ).list;
 	  return list.filter( findAnyMatching(str) ).map( adress => tableRow( DOM,  adress) );
  } );
  var edit$ = grabAndJoinActions("edit$", ti$);
 	var delete$ = grabAndJoinActions("delete$", ti$);
  return {  ti$, edit$, delete$  };
}
