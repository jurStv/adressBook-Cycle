import {h} 				from '@cycle/dom';
import makeIcon   from "./makeIcon";
export default function makeInputGroup( {id, placeholder, value, error,  icoName = ".glyphicon-user"} ){
 return h("div.input-group", [
						makeIcon(icoName),
						h(`input${id}.form-control.input-sm${error}`, {
							type: "text",
							form: "form",
							atributes: {placeholder},
							value
						})
					]);
}
