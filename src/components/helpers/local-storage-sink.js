export default function serialize(adresse$) {
  return adresse$.map( JSON.stringify );
};
