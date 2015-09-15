export default class Validator {

	constructor(regExps) {
		this.regExps = regExps;
	}
	valid(adr) {
		var error = this.checkFields(adr);
		for (let prop in error) {
			if(error[prop])
				return false;
		}
		return true;
	}
	invalid(adr) {
		return !this.valid(adr)
	}
	sel(adr) {
		var match = this.checkFields(adr);
		for (let prop in match) {
			if(!match[prop])
				return true;
		}
		return false;
	}
	checkFields(adr) {
		var error = {};
		for(let prop in this.regExps){
			if(!adr[prop] || !this.regExps[prop].test(adr[prop]))
				error[prop+"Error"] = true;
			else
				error[prop+"Error"] = false;
		}
		return error;
	}

}
