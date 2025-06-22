getParams();

function getParams(phone_input){
	var urlParams=new URLSearchParams(window.location.search);
	var key=urlParams.get('key');
	var contact={
		name:urlParams.get('name'),
		email:urlParams.get('email'),
		CID:urlParams.get('CID'),
		order:urlParams.get('order')
	};
	if(typeof phone_input==='undefined'){
		contact.phone_number=urlParams.get('phone_number');
	}
	else{
		contact.phone_number=phone_input;
	}
	getConversationId(contact,key);
}

function getConversationId(contact,key){
	var request = new XMLHttpRequest();
	request.open('GET', 'https://private-anon-a941205863-textline.apiary-proxy.com/api/customers.json?phone_number='+contact.phone_number+'&access_token='+key);
	request.onreadystatechange = function () {
		if (this.readyState === 4) {
			if(JSON.parse(this.response).customer==null){
				var userInput=prompt('No match!',contact.phone_number);
				if(userInput===null){
					closeWindow();
				}
				else{
					verifyPhoneNumber(userInput);
				}
			}
			else{
				storeContactData(contact,key,JSON.parse(this.response).customer.uuid);
			}
		}
	};
	request.send();
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
			if(this.status === 200){
				closeWindow();
			}
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

function normalize(input){
	var output=input.toString();
	var output_value;
	var output_ext;
	if(typeof input==='undefined'||input==''){
		output='';
		return output;
	}
	else if(input.replace(/[^a-z0-9]+/gi,'').slice(0,1)=='1'){
		output=input.replace('1','');
	}
	if(output.length<10||output.replace(/[^a-z0-9]+/gi,'').slice(0,10)!=output.replace(/[^0-9]+/g,'').slice(0,10)){
		output='Invalid format';
		return output;
	}
	else{
		var first_section=output.match(`(\\d.*?){${10}}`)[0].replace(/[^0-9]+/g,'');
		var last_section=('!'+output).split(output.match(`(\\d.*?){${10}}`)[0])[1];
		first_section='('+first_section.slice(0,3)+') '+first_section.slice(3,6)+'-'+first_section.slice(6,19);
		output_value=first_section;
		if(last_section!=''){
			output_ext=last_section.trim();
			output=([output_value,output_ext]).join(' ');
		}
		else{
			output=output_value;
		}
		if(output.slice(1,2)=='0'||output.slice(1,2)=='1'||output.slice(6,7)=='0'||output.slice(6,7)=='1'||output.slice(6,9)=='555'/*||output.slice(1,4)=='555'*/||
			output.slice(1,4)=='800'||output.slice(1,4)=='855'||output.slice(1,4)=='866'||output.slice(1,4)=='877'||output.slice(1,4)=='888'||output.slice(1,4)=='900'
		){
			output='Invalid format';
		}
		return output;
	}	
}

function verifyPhoneNumber(input){
	var output;
	if(input===null){
		closeWindow();
	}
	/*else{
		if(typeof input==='string'){*/
	else if(normalize(input)==''){
		alert('No phone number entered, please try again',input);
		var userInput=prompt('Please enter a phone number');
		return verifyPhoneNumber(userInput);
	}
	else if(normalize(input)=='Invalid format'){
		alert(input+' is not a valid phone number, please try again',input);
		var userInput=prompt('Please enter a phone number');
		return verifyPhoneNumber(userInput);
	}
	else{
		getParams(normalize(input));
		return;
			/*output='&name_1='+default_name+'&phone_1='+input;*/
	}
		/*}
		else if((normalize(input.billing.phone)==''||normalize(input.billing.phone)=='Invalid format')&&(normalize(input.shipping.phone)==''||normalize(input.shipping.phone)=='Invalid format')){
			var name=input.billing.name;
			if(normalize(input.billing.phone)==''&&normalize(input.shipping.phone)==''){
				var userInput=prompt('Please enter a phone number');
				return verifyPhoneNumber(userInput,name);
			}
			else{
				var userInput=prompt('No valid phone number saved, please enter a phone number to proceed');
				return verifyPhoneNumber(userInput,name);
			}
		}
		else if(normalize(input.billing.phone)==''||normalize(input.billing.phone)=='Invalid format'){
			if(input.shipping.name==''){
				output='&name_1='+normalize(input.billing.name)+'&phone_1='+normalize(input.shipping.phone);
			}
			else {
				output='&name_1='+input.shipping.name+'&phone_1='+normalize(input.shipping.phone);
			}
		}
		else if(normalize(input.shipping.phone)==''||normalize(input.shipping.phone)=='Invalid format'){
			output='&name_1='+normalize(input.billing.name)+'&phone_1='+normalize(input.billing.phone);
		}
		else{
			output='&name_1='+normalize(input.billing.name)+'&phone_1='+normalize(input.billing.phone)+'&name_2='+input.shipping.name+'&phone_2='+normalize(input.shipping.phone);
		}
		return output;
	}*/
}

function closeWindow(){
	/*alert('Contact data has been added, click OK to close this window.');*/
	window.open('','_self').close();
}
