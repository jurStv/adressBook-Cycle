import {Rx}				from "@cycle/core";
import {h} 				from '@cycle/dom';
import Validator	from "../form-validator";
import cuid 			from "cuid";

let formValidator = new Validator({
		firstname: /^\S+/,
		lastname:/^\S+/,
		email:/^\S+@\S+\.\S+/
});

function makeIcon(name = ""){
	return h("span.input-group-addon", [h(`span.glyphicon${name}`)])
}

function makeInputGroup( {id, placeholder, value, error,  icoName = ".glyphicon-user"} ){
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

function makeForm(
		{email="", firstname="", lastname=""} = {},
		{emailError = false, firstnameError=false, lastnameError=false} = {}
	){
	return h("form#form", [
					h("feildset", [
						h("legend", "Add new contact"),
						makeInputGroup(
								{id: "#firstname",
								placeholder: "First name",
								error: firstnameError ? ".error" : "",
								value: firstname}
							),
						makeInputGroup(
								{id: "#lastname",
								placeholder: "Last name",
								error: lastnameError ? ".error" : "",
								value: lastname}
							),
						makeInputGroup(
								{id:"#email",
								placeholder: "Email",
								error: emailError ? ".error" : "",
								icoName: ".glyphicon-envelope",
								value: email}
							),
						h("button#btn.btn.btn-default.btn-sm", {type: "submit"}, [
							h("span.glyphicon.glyphicon-plus-sign"),
							"  Save"
							])
						])
			])
}

function intent(DOM) {
	return DOM.get("#form", "submit").map( e => {
		e.preventDefault();
		return e.target.elements;
	} );
}

function model( submit$ ) {
	var adres$ = submit$.map(
			({email, firstname, lastname}) => ({email: email.value,
					firstname: firstname.value,
					lastname: lastname.value})
		).share();
	var valid$ = adres$.filter( formValidator.valid.bind(formValidator) )
		.map( (adr) => {
			adr._id = cuid();
			return adr;
		} );
	var invalid$ = adres$.filter( formValidator.invalid.bind(formValidator) );
	return  { valid$, invalid$ };
}

function view( { valid$, invalid$ }, edit$ ) {
	var vtreeSuccess$ = valid$.map( () => makeForm() );
	var vtreeFail$ = invalid$.map( ( invalidAdr ) => makeForm( invalidAdr, formValidator.checkFields.bind(formValidator, invalidAdr)()) );
	var vtreeEdit$ = edit$.map( (item) => makeForm( item ));
	var vtree$ = vtreeSuccess$.merge(vtreeEdit$).merge( vtreeFail$ ).startWith(makeForm());
	return vtree$;
}

function adressForm( {DOM, edit$} ) {
	var action$ = intent(DOM);
	var states = model(action$);
	var vtree$ = view( states, edit$ );
	return {
		DOM: vtree$,
		submit$: states.valid$
	};
}

export default adressForm;
