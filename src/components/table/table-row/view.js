import {h} 	from '@cycle/dom';

export default function view(item$){
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
