import {Rx}	from "@cycle/core";
import {h} 	from '@cycle/dom';

function intent( DOM, item ){
	return {
		edit$: DOM.get(`.edit.${item._id}`, "click"),
		delete$: DOM.get(`.delete.${item._id}`, "click")
	};
}
function model({edit$, delete$}, item$){
	return {
		editItem$: Rx.Observable.combineLatest(item$, edit$, (item) => item),
		deleteItem$: Rx.Observable.combineLatest(item$, delete$, (item) => item )
	}
}
function view(item$){
 return item$.map( item => h(`tr.${item._id}`, {key: item._id}, [
				h("td",`${item.firstname}`),
				h("td",`${item.lastname}`),
				h("td",`${item.email}`),
				h("td.text-center",[
						h(`span.glyphicon.glyphicon-pencil.edit.${item._id}`, [h("::before")])
					]),
				h("td.text-center",[
						h(`span.glyphicon.glyphicon-remove.delete.${item._id}`, [h("::before")])
					])
			])
 );
}
function tableItem( DOM, item = {email: "jurstv@gmail.com", firstname: "aas", lastname: "asd", _id: "ce12111"} ){
	var actions = intent(DOM, item);
	var item$ = Rx.Observable.just(item);
	var states = model(actions, item$);
	var vtree$ = view(item$);
	return {
		DOM: vtree$,
		edit$: states.editItem$,
		delete$: states.deleteItem$
	};
}

export default tableItem;
