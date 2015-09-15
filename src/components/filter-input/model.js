export default function model(action$){
  return action$.share().map( e => e.target.value )
		.map( (str) => (str.length > 2 ? str : "") ).distinctUntilChanged();
}
