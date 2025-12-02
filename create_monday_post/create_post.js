console.log(getKey());
function getKey(){
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const key = urlParams.get('key');
  return key;
}
