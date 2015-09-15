import {run, Rx} from "@cycle/core";
import {makeDOMDriver} from '@cycle/dom';
import adresses from "./components/adresses";
import Drivers from "./drivers";

const main = adresses;

run( main, {
	DOM: makeDOMDriver("#app"),
	localStorageSource: Drivers.makeLocalStorageSourceDriver("adress-book"),
	localStorageSink: Drivers.makeLocalStorageSinkDriver("adress-book")
} );
