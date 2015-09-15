import {Rx} 				from "@cycle/core";
import {h} 					from '@cycle/dom';
import view					from './view';
import model				from "./model";
import filterInput 	from "./filter-input/index";
import adressForm 	from "./adress-form/index";
import tableBody 		from "./table/index"
import serialize 		from "./helpers/local-storage-sink";
import {deserialize, deserializeWithDefaults} from "./helpers/local-storage-source";

function main( {DOM, localStorageSink, localStorageSource} ) {
	var filter = filterInput( DOM );

	var startList$ = deserializeWithDefaults( localStorageSource ).shareReplay(1);
	var sinkList$ = deserialize( localStorageSink );
	var list$ = startList$.concat( sinkList$ );

	var table = tableBody( DOM, list$, filter.input$ );
	var mainForm = adressForm( DOM, table.edit$ );

	var removeAfterEditing$ =	table.edit$.sample( mainForm.submit$ );
	var delete$ = removeAfterEditing$.merge( table.delete$ );

	var storage$ = model( startList$, delete$, mainForm.submit$ );
	var vtree$ = view( filter.DOM, mainForm.DOM, table.DOM );
	return {
    DOM: vtree$,
    localStorageSink: serialize( storage$ )
  };
}

export default main;
