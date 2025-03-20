// send.js:31
function makeContact(body) {
  // Use proxy URL instead of original URL
  const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
  var key=prompt('Key');
  var cust=prompt('Customer');
  var targetUrl='https://application.textline.com/api/customer/'+cust+'.json?access_token='+key;
  var body = {
    'customer': {
      'phone_number': '(222) 222-2222',
      'email': 'chuck@mycompany.com',
      'name': 'Chuck Finley',
      'notes': 'some samples notes for the contact',
      'tags': 'foo_bar'
    }
  };
  const request = new XMLHttpRequest();
  request.open('POST', proxyUrl + targetUrl, true); // Add proxyUrl to front of the targetUrl
  request.setRequestHeader('Content-Type', 'application/json');
  request.onload = function() {
    if (this.status >= 200 && this.status < 400) {
      // Success!
      console.log("Request successful:", this.responseText);
    } else {
      // Error handling
      console.error("Request failed with status:", this.status);
    }
  };
  request.onerror = function() {
    // Connection error handling
    console.error("Connection error");
  };
  request.send(JSON.stringify(body));
}
