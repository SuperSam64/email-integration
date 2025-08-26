getParams();
function getParams(){
	var urlParams=new URLSearchParams(window.location.search);
	var key=urlParams.get('key');
	var phone_number=urlParams.get('phone_number');
	getConversationId(key, phone_number);
}

function getConversationId(key, phone_number){
	var request = new XMLHttpRequest();
	request.open('GET', 'https://private-anon-6123db9648-textline.apiary-proxy.com/api/customers.json?phone_number='+phone_number.phone_number+'&access_token='+key); /* a941205863 */
	request.onreadystatechange = function () {
		if (this.readyState === 4) {
			if(JSON.parse(this.response).customer==null){
				alert('error');
			}
			else{
				console.log(JSON.parse(this.response).customer.uuid);
			}
		}
	};
	request.send();
}
