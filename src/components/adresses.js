import {Rx} 				from "@cycle/core";
import {h} 					from '@cycle/dom';
import tableConstructor from "./table/table"
import filterInput 	from "./filter-input/filter-input";
import adressForm 	from "./adress-form/adress-form";
import serialize 		from "./local-storage-sink";
import {deserialize, deserializeWithDefaults} 	from "./local-storage-source";
import Validator		from "./form-validator";
import view				 from './view';

let transformToValidator = (str) => {
	return new Validator({
		firstname: RegExp(str),
		lastname: RegExp(str),
		email: RegExp(str)
}) };


function model(startList$, delete$, submit$ ){
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

function adresses( {DOM, localStorageSink,localStorageSource } ) {
	var filter = filterInput( DOM );
	var validator$ = filter.input$.startWith("").map( transformToValidator );
	var startList$ = deserializeWithDefaults( localStorageSource ).shareReplay(1);
	var sinkList$ = deserialize( localStorageSink );
	var list$ = startList$.concat( sinkList$ );

	var table = tableConstructor( {DOM, list$, validator$} );
	var mainForm = adressForm( {DOM, edit$: table.edit$} );

	var removeAfterEditing$ =	table.edit$.sample( mainForm.submit$ );
	var delete$ = removeAfterEditing$.merge( table.delete$ );

	var storage$ = model(startList$, delete$, mainForm.submit$);
	var vtree$ = view( filter.DOM, mainForm.DOM, table.DOM );

	return {
    DOM: vtree$,
    localStorageSink: serialize( storage$ )
  };
}

export default adresses;
