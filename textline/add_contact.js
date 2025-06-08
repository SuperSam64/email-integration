var contact=getParams();
console.log(contact);
function getParams(){
  var urlParams=new URLSearchParams(window.location.search);
  return {
    key:urlParams.get('key'),
    uuid:urlParams.get('uuid'),
    name:urlParams.get('name'),
    email:urlParams.get('email'),
    CID:urlParams.get('CID'),
    order:urlParams.get('order')
  }
}
