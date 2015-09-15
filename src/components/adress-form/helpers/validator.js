import { Success, Failure } from "data.validation";
import curry                from "ramda/src/curry";
import fromPairs            from "ramda/src/fromPairs";

function isNameValid(label = "", name){
  return /^[\d\w]+$/.test(name) ?
           Success(name)
  :
           Failure([ [label, ".error"] ])
}

function isEmailValid(email){
  return /^\S+@\S+\.\S+/.test(email) ?
           Success(email)
  :
           Failure([ ["emailError", ".error"] ])
}

function isFormValid( {firstname, lastname, email} ){
  return Success( curry( (fname,lname,email) => [fname,lname,email] ) )
            .ap(isNameValid( "firstnameError", firstname ))
            .ap(isNameValid( "lastnameError", lastname ))
            .ap(isEmailValid( email ))
}

function isFormValidBool( form ){
  return isFormValid( form ).isSuccess;
}

function isFormWrongBool( form ){
  return isFormValid( form ).isFailure;
}

function makeErrorObject( form ){
  var formChecked = isFormValid( form );
  return formChecked.isFailure ? fromPairs( formChecked.merge() ) : {};
}

export default {
	isFormValidBool,
	isFormWrongBool,
	makeErrorObject
}
