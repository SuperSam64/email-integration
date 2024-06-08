var orderNumbersList = [
	"12345678",
	"CP09-1234568",
	"98765432"
];
var animationLength = 1.4;
function copyToClipboard(type, duration) {    
    if(type.slice(0,5) == "order"){
		var orderPosition = (type.slice(5,6) * 1);
		var clipboard = document.getElementById("orderField" + orderPosition).innerText;
		clipboard = clipboard.replace("Order #","");
		//navigator.clipboard.writeText(clipboard);
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
        clipboard.select();
        document.execCommand("copy");
        /*navigator.permissions.query({
            name: "clipboard-write"
        }).then((result) => {
            if (result.state === "granted" || result.state === "prompt"){
                navigator.clipboard.writeText(clipboard);
            }
        });*/
		var popup = document.getElementById(type + "Popup");
		popup.innerText = messages[index];
	}
	popup.classList.remove("hide")
	popup.classList.add("show");
	setTimeout(transition,(duration * 1000), popup);
}
function transition(input){
    input.classList.add("hide");
    input.classList.remove("show");
}
function buildOrderNumbersList(list){
	if(list.length < 1){
		document.getElementById("orderNumberList").style = "display:none";
	}
	else{
		var orderArray = [];
		for(var i = 0; i < list.length; i++){
			orderArray.push(
				'<span class="fieldText" id="orderField' + i +
				'" onclick="copyToClipboard(' + "'order" + i + "'" + ',' + animationLength + ')">' +
				'Order #' + orderNumbersList[i] + '<span class="popup" id="orderPopup' + i +
				'"></span></span>'
			);
		}
		document.getElementById("orderNumberList").innerHTML = orderArray.join("<br>");
	}
}
function trigger(){
	buildOrderNumbersList(orderNumbersList);
}