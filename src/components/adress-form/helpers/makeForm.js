import {h} 				from '@cycle/dom';
import makeInputGroup from "./makeInputGroup";

export default function makeForm(
		{email="", firstname="", lastname=""} = {},
		{emailError = "", firstnameError = "", lastnameError = ""} = {}
	){
	return h("form#form", [
					h("feildset", [
						h("legend", "Add new contact"),
						makeInputGroup(
								{id: "#firstname",
								placeholder: "First name",
								error: firstnameError,
								value: firstname}
							),
						makeInputGroup(
								{id: "#lastname",
								placeholder: "Last name",
								error: lastnameError,
								value: lastname}
							),
						makeInputGroup(
								{id:"#email",
								placeholder: "Email",
								error: emailError,
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
