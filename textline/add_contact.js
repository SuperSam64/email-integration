var contact=getParams();
coneole.log(contact);
function getParams(){
  var queryString=window.location.search;
  var urlParams=new URLSearchParams(queryString);
  return {
    name:URLSearchParams.get('name'),
    phone:URLSearchParams.get('phone'),
    email:URLSearchParams.get('email'),
    CID:URLSearchParams.get('CID'),
    order:URLSearchParams.get('order')
  }
}
