getParams();
var pass=0;
function getParams(phone_input){
	pass+=1;
	var name;
	var phone;
	var urlParams=new URLSearchParams(window.location.search);
	
	var key=urlParams.get('key');
	var contact={
		email:urlParams.get('email'),
		CID:urlParams.get('CID'),
		order:urlParams.get('order')
	};
	if(pass==1){
		contact.name=urlParams.get('name_1');
		contact.phone_number=urlParams.get('phone_number_1');
		console.log(pass);
		console.log(contact.name);
		console.log(contact.phone_number);
	}
	else if (pass==2){
		if(urlParams.get('name_2')==''||typeof urlParams.get('name_2')==='undefined'){
			contact.name=urlParams.get('name_1');
		}
		else{
			contact.name=urlParams.get('name_2');
		}
		contact.phone_number=urlParams.get('phone_number_2');
		console.log(pass);
		console.log(contact.name);
		console.log(contact.phone_number);		
	}
	else{
		contact.name=urlParams.get('name_1');
		contact.phone_number=phone_input;
		console.log(pass);		
		console.log(contact.name);
		console.log(contact.phone_number);
	}
	/*if(typeof phone_input==='undefined'){
		contact.phone_number=urlParams.get('phone_number');
	}
	else{
		
	}*/
	getConversationId(contact,key);
}

function getConversationId(contact,key){
	console.log('pass 1');
	var request = new XMLHttpRequest();
	request.open('GET', 'https://private-anon-a941205863-textline.apiary-proxy.com/api/customers.json?phone_number='+contact.phone_number+'&access_token='+key);
	request.onreadystatechange = function () {
		if (this.readyState === 4) {
			if(JSON.parse(this.response).customer==null){
				if(pass>1){
					var userInput=prompt('This customer has not communicated with us by text. Only proceed if they have provided consent to receve text messages at this phone number, or enter a different phone number below.',contact.phone_number);
					if(userInput===null){
						closeWindow();
					}
					else{
						verifyPhoneNumber(userInput);
					}
				}
				else{
					getParams();
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
		if(output.slice(1,2)=='0'||output.slice(1,2)=='1'||output.slice(6,7)=='0'||output.slice(6,7)=='1'/*||output.slice(6,9)=='555'*/||output.slice(1,4)=='555'||
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
	}
}

function closeWindow(){
	window.open('','_self').close();
}
