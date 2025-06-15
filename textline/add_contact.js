getParams();

function getParams(){
	var urlParams=new URLSearchParams(window.location.search);
	var key=urlParams.get('key');
	var uuid=urlParams.get('uuid');
	var contact={     
		phone_number:urlParams.get('phone_number'),
		name:urlParams.get('name'),
		email:urlParams.get('email'),
		CID:urlParams.get('CID'),
		order:urlParams.get('order')
	};
	awaitResult(contact,key,uuid);
	
}

async function awaitResult(contact,key,uuid){
	var contactData=new Promise(resolve => {
		resolve(storeContactData(contact,key,uuid));
	});
	var result = await contactData;
	closeWindow();
}

function storeContactData(contact,key,uuid){
	var request = new XMLHttpRequest();
	if(typeof uuid==='undefined'){
		request.open('POST', 'https://private-anon-a941205863-textline.apiary-proxy.com/api/customers.json?access_token='+key);
	}
	else{
		request.open('PUT', 'https://private-anon-c310406e46-textline.apiary-proxy.com/api/customer/'+uuid+'.json?access_token='+key);
	}
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
			'email': contact.email,
			'name': contact.name,
			'tags': contact.order,
			'tags_handling': 'add',
			'custom_fields':{
				'f3310f75-3371-4620-a41a-bacad6a73ee0':contact.CID
			}
		}
	};
	if(typeof uuid==='undefined'){body.customer.phone_number=contact.phone_number};
	request.send(JSON.stringify(body));
}

function closeWindow(){
	alert('updated');
	/*window.open('','_self').close();*/
}
