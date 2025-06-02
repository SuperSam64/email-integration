var contact=getParams();
coneole.log(contact);
function getParams(){
  var urlParams=new URLSearchParams(window.location.search);
  return {
    name:urlParams.get('name'),
    phone:urlParams.get('phone'),
    email:urlParams.get('email'),
    CID:urlParams.get('CID'),
    order:urlParams.get('order')
  }
}
