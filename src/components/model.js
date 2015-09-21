import last from "ramda/src/last";
export default function model(sourceStore$, delete$, submit$ ){
  return sourceStore$.flatMap( ( storeImm ) => {
    let mapMutable = storeImm.list.reduce( (acc, cur) => acc.set(cur._id, cur) ,new Map());
		let deleteFromList$ = delete$.map( actAdr =>
			   mapMutable.delete( actAdr._id ) ?
          [...mapMutable].map( last ) : null
		 ).filter( x => !!x );
		let pushToList$ = submit$.map( actAdr =>
			  [...mapMutable.set(actAdr._id, actAdr)].map( last )
		 );
		return  deleteFromList$.merge(pushToList$).map( x => ({list: x}) ).throttle(100);
	} );
}
