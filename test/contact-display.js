var orderNumbersList = [
	"12345678",
	"CP09-1234568",
	"98765432"
];
var animationLength = 1.4;
function copyToClipboard(type, duration) {    
	var showTooltip = true;
	var elementValue ;
	if(type == "name"){
		elementValue = document.getElementById('nameField').innerText.trim().replaceAll(" ","");
		if(elementValue == "" || elementValue == "Name"){
			showTooltip = false;
		}
	}
	if(type  == "CID"){
		elementValue = document.getElementById('CIDField').innerText.trim().replaceAll(" ","");
		if(elementValue == "" || elementValue == "CustomerID"){
			showTooltip = false;
		}
	}
	if(type  == "phone"){
		elementValue = document.getElementById('phoneField').innerText.trim().replaceAll(" ","");
		if(elementValue == "" || elementValue == "Phone number"){
			showTooltip = false;
		}
	}
	if(type  == "email"){
		elementValue = document.getElementById('emailField').innerText.trim().replaceAll(" ","");
		if(elementValue == "" || elementValue == "Email address"){
			showTooltip = false;
		}
	}
	if(showTooltip){
		if(type.slice(0,5) == "order"){
			var orderPosition = (type.slice(5,6) * 1);
			var clipboard = document.getElementById("orderField" + orderPosition).innerText;
			clipboard = clipboard.replace("Order #","");
			const textArea = document.createElement("textarea");
			textArea.value = clipboard;
			//document.body.appendChild(textArea);
			document.getElementById("contactInfoSection").appendChild(textArea);
			textArea.focus();
			textArea.select();
			try {
				document.execCommand('copy');
			} catch (err) {
				console.error('Unable to copy to clipboard', err);
			}
			document.getElementById("contactInfoSection").removeChild(textArea);
			//document.body;
			var popup = document.getElementById("orderPopup" + orderPosition);
			popup.innerText = "Order #" + clipboard + " copied!";
		}
		else{
			var index = 0;
			var clipboard = document.getElementById(type + "Field").innerText;
			var fieldType = [
				"name",
				"CID",
				"phone",
				"email"
			]
			var messages = [
				"Name copied!",
				"CID copied!",
				"Phone number copied!",
				"Email copied!"
			]
			var remove = [
				clipboard,
				clipboard.replace("CID ",""),
				clipboard.replaceAll("(","").replaceAll(")","").replaceAll("-","").replaceAll(" ",""),
				clipboard
			]
			for (var i = 0; i < 4; i++){
				if(fieldType[i] == type){
					index = i;
				}
			}
			if(index == 1 && remove[index].slice(0,3).toUpperCase() != "CUS"){
				clipboard = remove[index] * 1;
			}
			else{
				clipboard = remove[index];
			}
			const textArea = document.createElement("textarea");
			textArea.value = clipboard;
			//document.body.appendChild(textArea);
			document.getElementById("contactInfoSection").appendChild(textArea);
			textArea.focus();
			textArea.select();
			try {
				document.execCommand('copy');
			} catch (err) {
				console.error('Unable to copy to clipboard', err);
			}
			document.getElementById("contactInfoSection").removeChild(textArea);
			//document.body;
			var popup = document.getElementById(type + "Popup");
			popup.innerText = messages[index];
		}
		popup.classList.remove("hide");
		popup.classList.add("show");
		setTimeout(transition,(duration * 1000), popup);
	}
}
function transition(input){
    input.classList.add("hide");
    input.classList.remove("show");
}
function buildOrderNumbersList(list){
	if(list.length < 1){
		document.getElementById("orderNumberList").classList.add = "hidden";
	}
	else{
		document.getElementById("orderNumberList").classList.remove = "hidden";
		var orderArray = [];
		for(var i = 0; i < list.length; i++){
			console.log("iteration " + i);
			orderArray.push(
				'<span class="fieldText" style="margin-top:6px" id="orderField' + i +
				'" onclick="copyToClipboard(' + "'order" + i + "'" + ',' + animationLength + ')">' +
				'Order #' + list[i] + '<span class="popup" id="orderPopup' + i +
				'"></span></span>'
			);
		}
		console.log(orderArray.join("<br>").replace('style="margin-top:6px" ',''));
		document.getElementById("orderNumberList").innerHTML = orderArray.join("<br>").replace('style="margin-top:6px" ','');
            // <div style="text-align:center;margin-top:8px;padding-top:8px;color:var(--accent-color);font-size:small;text-shadow:0px 0px 3px var(--accent-color);border-top:1px solid gray;">EDIT</div>er
	}
}