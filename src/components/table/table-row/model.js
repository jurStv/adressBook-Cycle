import {Rx}	from "@cycle/core";

export default function model({edit$, delete$}, item$){
	return {
		editItem$: Rx.Observable.combineLatest(item$, edit$, (item) => item),
		deleteItem$: Rx.Observable.combineLatest(item$, delete$, (item) => item )
	}
}
