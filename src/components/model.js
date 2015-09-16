export default function model(sourceStore$, delete$, submit$ ){

  return sourceStore$.flatMap( ( storeImm ) => {

    var listMutable = Object.assign( {}, storeImm ).list;

		let deleteFromList$ = delete$.map( (actAdr) => {
			let index = listMutable.findIndex( (adr) => adr._id === actAdr._id );
			(index !== -1) ? listMutable.splice( index, 1 ) : void 0;
			return  {list: listMutable} ;
		} );
		let pushToList$ = submit$.map( (actAdr) => {
			listMutable.push(actAdr);
			return  {list: listMutable} ;
		} );
		return  deleteFromList$.merge(pushToList$) ;
	} );
}
