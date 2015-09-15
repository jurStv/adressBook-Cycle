export default function model(startList$, delete$, submit$ ){
  return startList$.flatMap( ({list}) => {
		let deleteFromList$ = delete$.map( (actAdr) => {
			let index = list.findIndex( (adr) => adr._id === actAdr._id );
			(index !== -1) ? list.splice( index, 1 ) : void 0;
			return {list};
		} );
		let pushToList$ = submit$.map( (actAdr) => {
			list.push(actAdr);
			return {list};
		} );
		return pushToList$.merge( deleteFromList$ );
	} );
}
