export default function view( ti$ ){
  return ti$.map( (tis) => tis.map( (ti) => ti.DOM ) );
}
