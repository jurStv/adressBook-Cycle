import {Rx}	from "@cycle/core";
import {h} 	from '@cycle/dom';

export default function view(name = ""){
  return Rx.Observable.just(
		h("fieldset", [
			h("legend", "Search contact"),
			h("div.input-group", [
				h(`span.input-group-addon`, [h("span.glyphicon.glyphicon-search")]),
				h(`input${name}.form-control.input-sm#search`, {atributes: {placeholder: "Search"}, type: "text"})
				])
			])
		);
}
