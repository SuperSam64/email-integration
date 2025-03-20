async function makeContact(e){	
	var cust=prompt('Customer');
	var key=prompt('Key');
	var url='https://application.textline.com/api/customer/'+cust+'.json

	
	const response = await fetch ("https://api.monday.com/v2", {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'X-TGP-ACCESS-TOKEN' : key
		},
		body: JSON.stringify({
			'customer': {
				'phone_number': '(222) 222-2222',
				'email': 'chuck@mycompany.com',
				'name': 'Chuck Finley',
				'notes': 'some samples notes for the contact',
				'tags': 'foo_bar'
			}
		})
	})

	.catch(error => {
		console.error('Error:', error);
	}
}
