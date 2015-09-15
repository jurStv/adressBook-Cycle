import {Rx} 	from "@cycle/core";
import {h} 		from '@cycle/dom';

function view( filter$, mainForm$, table$ ) {
  return Rx.Observable.combineLatest( filter$, mainForm$, table$,
    (filter, mainForm, table) => {
      return h("div.content",[
        h("div.row", [ h("div.col-md-5", [h("h1", "Adress Book")]) ]),
        h("div.row",[
            h("div.col-md-3", [
                filter,
                mainForm
              ]),
            h("div.col-md-9", [
                h("legend", "Contact List"),
                h("table.table.table-striped.table-bordered.table-hover.table-condensed",
                  [h("tbody#tbody", [
                      h("tr", [
                          h("th", "First Name"),
                          h("th", "Last Name"),
                          h("th", "Email"),
                          h("th.text-center", "Edit"),
                          h("th.text-center", "Delete")
                        ])
                    ].concat(table)
                  )])
              ])
          ])
      ]);
    }  );
}
export default view;
