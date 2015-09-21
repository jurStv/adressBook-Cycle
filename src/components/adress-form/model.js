import cuid 			from "cuid";
import v from "./helpers/validator";

export default function model( submit$ ) {
	var adres$ = submit$.map(
			({email, firstname, lastname}) => ({email: email.value,
					firstname: firstname.value,
					lastname: lastname.value})
		).shareReplay(1);
	var valid$ = adres$.filter( v.isFormValidBool )
		.map( (adr) => {
			adr._id = cuid();
			return adr;
		} );
	var wrong$ = adres$.filter( v.isFormWrongBool )
		.map( (adr) => ( {wrongAdr: adr, errorObj: v.makeErrorObject(adr)} ) );
	return  { valid$, wrong$ };
}
