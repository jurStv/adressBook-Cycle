import {h} 	from '@cycle/dom';

export default function makeIcon(name = ""){
	return h("span.input-group-addon", [h(`span.glyphicon${name}`)])
}
