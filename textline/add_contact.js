var params=getParams();
var key=params[0];
var contact=params[1];
function getParams(){
  var urlParams=new URLSearchParams(window.location.search);
  return [urlParams.get('key'),{
    uuid:urlParams.get('uuid'),
    name:urlParams.get('name'),
    email:urlParams.get('email'),
    CID:urlParams.get('CID'),
    order:urlParams.get('order')
  }];
}
function createContact(key,data){
  var request = new XMLHttpRequest();
  request.open('POST', 'https://private-anon-a941205863-textline.apiary-proxy.com/api/customers.json?access_token='+key);
  request.setRequestHeader('Content-Type', 'application/json');
  request.onreadystatechange = function () {
    if (this.readyState === 4) {
      console.log('Status:', this.status);
      console.log('Headers:', this.getAllResponseHeaders());
      console.log('Body:', this.responseText);
    }
  };
  var body = {
    'customer': {
      'name':data.name,
      'email': data.email,
      'notes': data.CID,
      'tags': data.order
    }
  };
  request.send(JSON.stringify(body));
}
