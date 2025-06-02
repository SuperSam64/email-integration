var contact=getParams();
coneole.log(contact);
function getParams(){
  var queryString=window.location.search;
  var urlParams=new URLSearchParams(queryString);
  return {
    name:urlParams.get('name'),
    phone:urlParams.get('phone'),
    email:urlParams.get('email'),
    CID:urlParams.get('CID'),
    order:urlParams.get('order')
  }
}
