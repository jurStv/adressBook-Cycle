import {run, Rx} from "@cycle/core";
import {makeDOMDriver} from '@cycle/dom';
import adressApp from "./components/index";
import Drivers from "./drivers";

const main = adressApp;

run( main, {
	DOM: makeDOMDriver("#app"),
	localStorageSource: Drivers.makeLocalStorageSourceDriver("adress-book"),
	localStorageSink: Drivers.makeLocalStorageSinkDriver("adress-book")
} );
