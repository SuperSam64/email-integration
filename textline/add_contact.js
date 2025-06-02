var contact=getParams();
coneole.log(contact);
function getParams(){
  var queryString=window.location.search;
  var urlParams=new URLSearchParams(queryString);
  return {
    name:URLSearchParams.getAll('name'),
    phone:URLSearchParams.getAll('phone'),
    email:URLSearchParams.getAll('email'),
    CID:URLSearchParams.getAll('CID'),
    order:URLSearchParams.getAll('order')
  }
}
