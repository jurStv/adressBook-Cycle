import {Rx} from "@cycle/core";

function makeLocalStorageSourceDriver(keyName) {
	return () => Rx.Observable.just( localStorage.getItem(keyName) );
}
function makeLocalStorageSinkDriver(keyName) {
	var subject = new Rx.Subject();
	return function (keyValue$) {
		keyValue$.subscribe( keyValue => {
			localStorage.setItem( keyName, keyValue );
			subject.onNext(keyValue);
		} );
		return subject;
	};
}

export default { makeLocalStorageSinkDriver, makeLocalStorageSourceDriver };
