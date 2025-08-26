getParams();
function getParams(){
	var urlParams=new URLSearchParams(window.location.search);
	var key=urlParams.get('key');
	var phone_number=urlParams.get('phone_number');
	getConversationId(key, phone_number);
}

function getConversationId(key, phone_number){
	var request = new XMLHttpRequest();
	request.open('GET', 'https://private-anon-6123db9648-textline.apiary-proxy.com/api/conversations.json?phone_number='+phone_number+'&access_token='+key); /* a941205863 */
	request.onreadystatechange = function () {
		if (this.readyState === 4) {
			if(JSON.parse(this.response).conversation==null){
				alert('error');
			}
			else{
				getImages(JSON.parse(this.response));
				/*console.log(JSON.parse(this.response));*/
			}
		}
	};
	request.send();
}
function getImages(input){
	var images=[];
	for(c=0;c<input.posts.length;c++){
		if(input.posts[c].attachments!=null){
			for(i=0;i<input.posts[c].attachments.length;i++){
				images.push(input.posts[c].attachments.[i]);
			}
		}
	}
	console.log(images);
	return images;
}
