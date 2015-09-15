import {Rx}	from "@cycle/core";
import {h} 	from '@cycle/dom';
import cuid from "cuid";

function filterInput(DOM, name = `.${cuid()}`) {
	var input$ = DOM.get(`${name}.form-control.input-sm`, "input").share().map( e => e.target.value )
		.map( (str) => (str.length > 2 ? str : "") ).distinctUntilChanged();
	var vtree$ = Rx.Observable.just(
		h("fieldset", [
			h("legend", "Search contact"),
			h("div.input-group", [
				h(`span.input-group-addon`, [h("span.glyphicon.glyphicon-search")]),
				h(`input${name}.form-control.input-sm#search`, {atributes: {placeholder: "search"}, type: "text"})
				])
			])
		);
	return {DOM: vtree$, input$};
}

export default filterInput;
