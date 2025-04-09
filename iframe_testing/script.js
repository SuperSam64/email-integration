function hideForm(input){
	window.parent.postMessage(input, "*");
}



function listenForEvent(){
	window.addEventListener('message', (event)=>{
		var element=document.getElementById('textBox');
		element.innerText=event.data;
	});
}
