function makeContact(){
	var key=prompt('Key');
	var url='https://application.textline.com/api/customers.json?access_token='+key;
	var request = new XMLHttpRequest();
	var customer={
		'name':'Gary Stewart',
		'phone':'(415) 606-3653',
		'email':'joegospel@aol.com',
		'cid':'2661161',
		'order':'17191387'
	}
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
		"customer": {
			"phone_number": customer.phone,
			"name": customer.name,
			"tags": customer.order,
			"custom_fields": {
				"f3310f75-3371-4620-a41a-bacad6a73ee0": customer.cid,
				"47382498-500f-40bf-b958-e355bf8e427d": customer.email
			}
		}
	};
	request.send(JSON.stringify(body));
}
