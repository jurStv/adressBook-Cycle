import last from "ramda/src/last";
import append from "ramda/src/append";
import {Rx} from "@cycle/core";

function accumulator( accValue, current) {
  return (current.actionType === "add") ?
      {...accValue, list: append(current.item, accValue.list)} :
       (current.actionType === "remove") ?
      {...accValue, list: accValue.list.filter( x => x._id !== current.item._id)} :
      accValue ;
}

export default function model(sourceStore$, delete$, submit$ ){
  let removeFromList$ = delete$.map( item => ({item,actionType: "remove"}) );
  let pushToList$ = submit$.map( item => ({item,actionType: "add"}) );
  let modifyList$ = removeFromList$.merge(pushToList$);
  return sourceStore$.flatMap( initialStore =>
      modifyList$.scan(accumulator, initialStore).throttle(100)
   );


  // return sourceStore$.flatMap( ( storeImm ) => {
  //
  //   let mapMutable = storeImm.list.reduce( (acc, cur) => acc.set(cur._id, cur) ,new Map());
  //
	// 	let deleteFromList$ = delete$.map( actAdr =>
	// 		   mapMutable.delete( actAdr._id ) ?
  //         [...mapMutable].map( last ) : null
	// 	 ).filter( x => !!x );
  //
	// 	let pushToList$ = submit$.map( actAdr =>
	// 		  [...mapMutable.set(actAdr._id, actAdr)].map( last )
	// 	 );
  //
	// 	return  deleteFromList$.merge(pushToList$).map( x => ({list: x}) ).throttle(100);
	// } );

}
