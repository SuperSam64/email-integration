
var url='https://application.textline.com/api/customer/'+cust+'.json?access_token='+key;


function makeContact(){
	var key=prompt('Key');
	var convo=prompt('Convo');
	
	var request = new XMLHttpRequest();

	request.open('POST', url);

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
		'phone_number': '(222) 222-2222',
		'email': 'chuck@mycompany.com',
		'name': 'Chuck Finley',
		'notes': 'some samples notes for the contact',
		'tags': 'foo_bar'
	  }
	};

	request.send(JSON.stringify(body));
}
