var orderNumbersList = [
	// ================================================================================= for later use
];
var animationLength = 1.4;
async function lookupContact(input){
    var contactExists = false;
    var contactRecord;
	var contact_URL = await fetch("https://public.missiveapp.com/v1/contacts?contact_book=" + tokens[1] + "&limit=1&order=last_modified&search=" + input,{
		method: "GET",
		headers: {
		"Host": "public.missiveapp.com",
		"Authorization": "Bearer " + tokens[0],
		"Content-type": "application/json"
		}
	})
	contactRecord = await contact_URL.json();
	contact = {
		firstName:"",
		lastName:"",
        fullName:"Name",
		customerID:"Customer ID",
		phoneNumber:"Phone number",
		email: "Email address"
	};
    resetContactInfo();
    if(typeof contactRecord.contacts[0] != 'undefined'){
        contact.firstName = normalizeFirstName(contactRecord.contacts[0].first_name,"panel");
        if(contact.firstName.toLowerCase ==  'undefined'){
            contact.firstName == "";
        }
        contact.lastName = normalizeLastName(contactRecord.contacts[0].last_name,"panel");
        if(contact.lastName.toLowerCase() ==  'undefined'){
            contact.lastName == "";
        }
        contact.fullName = normalizeFullName(contact.firstName,contact.lastName,"panel",true);
        for ( var i = 0; i < contactRecord.contacts[0].infos.length; i++ ) {
            if(typeof contactRecord.contacts[0].infos[i].kind != 'undefined') {
                if(contactRecord.contacts[0].infos[i].kind == "phone_number" && contactRecord.contacts[0].infos[i].value != ""){
                    contact.phoneNumber = normalizePhoneNumber(contactRecord.contacts[0].infos[i].value,"panel",true);
                }
            }
        }
        for ( var i = 0; i < contactRecord.contacts[0].infos.length; i++ ) {
            if(typeof contactRecord.contacts[0].infos[i].custom_label != 'undefined') {
                if(contactRecord.contacts[0].infos[i].custom_label.toLowerCase() == "customer id" && contactRecord.contacts[0].infos[i].value != "" ){
                    contact.customerID = normalizeCID(contactRecord.contacts[0].infos[i].value,"panel",true);
                }
            }
        }
    }
    else if(customerName != "" && customerName != 'undefined' && typeof customerName != 'undefined'){
        contact.fullName = normalizeFullName(normalizeFirstName(customerName,"panel"),normalizeLastName(customerName,"panel"),"panel",true);
        contactExists =  false;
    }
    else{
        contactExists =  false;
    }
    contact.email = normalizeEmail(input,"panel",true);
    contactFormSave(contact.fullName,contact.customerID,contact.phoneNumber,contact.email,contact.email);
    searchMondayPosts(orderNumber,contact.customerID,contact.phoneNumber,messageFrom,tokens[2]);
}
function saveContact(firstName,lastName,email,phoneNumber,customerID){
    fetch("https://public.missiveapp.com/v1/contacts", {
        method: "POST",
        body: JSON.stringify({
            "contacts": [{
                "contact_book": tokens[1], // fill this in later
                "first_name": firstName,
                "last_name": lastName,
                "infos": [{
                    "kind": "phone_number",
                    "label": "main",
                    "value": phoneNumber
                }, {
                    "kind": "email",
                    "label": "personal",
                    "value": email
                }, {
                    "kind": "custom",
                    "label": "other",
                    "custom_label":"Customer ID",
                    "value": customerID
                }]
            }]
        }),
        headers: {
            "Host": "public.missiveapp.com",
            "Authorization": "Bearer " + tokens[0], // fill this in later
            "Content-type": "application/json"
        }
    })
    Missive.alert({title: "Contact added",message:"Contact has been added to your contact list.", note: "Click below to continue..."})
}
function showEditPanel(selected){
	document.getElementById("orderNumberList").addEventListener("focus", function() { this.select(); });
    document.getElementById("formFirstName").addEventListener("focus", function() { this.select(); });
    document.getElementById("formLastName").addEventListener("focus", function() { this.select(); });
    document.getElementById("formCustID").addEventListener("focus", function() { this.select(); });
    document.getElementById("formPhoneNumber").addEventListener("focus", function() { this.select(); });
    document.getElementById("formEmail").addEventListener("focus", function() { this.select(); this.style = '';});
    var formFirstName = document.getElementById('formFirstName');
    var formLastName = document.getElementById('formLastName');
    var formCustID = document.getElementById('formCustID');
    var formPhoneNumber = document.getElementById('formPhoneNumber');
    var formEmail = document.getElementById('formEmail');
    var formOrderNumbers = document.getElementById('formOrderNumbers');
    var nameField = document.getElementById('nameField');
    var CIDField = document.getElementById('CIDField');
    var phoneField = document.getElementById('phoneField');
    var emailField = document.getElementById('emailField');
    formFirstName.addEventListener("keyup", function(event) {
        if (event.key === "Enter") {
            contactFormSaveButton();
        }
    });
    formLastName.addEventListener("keyup", function(event) {
        if (event.key === "Enter") {
            contactFormSaveButton();
        }
    });
    formCustID.addEventListener("keyup", function(event) {
        if (event.key === "Enter") {
            contactFormSaveButton();
        }
    });
    formPhoneNumber.addEventListener("keyup", function(event) {
        if (event.key === "Enter") {
            contactFormSaveButton();
        }
    });
    formEmail.addEventListener("keyup", function(event) {
        if (event.key === "Enter") {
            contactFormSaveButton();
        }
    });
    formOrderNumbers.addEventListener("keyup", function(event) {
        if (event.key === "Enter") {
            contactFormSaveButton();
        }
    });
    
    //Missive.setSubject("");
    //Missive.setSubject("Order #" + list[0]);
    //Missive.setSubject("Orders #" + list);
    var orderNumberList = document.getElementById('orderNumberList').innerText;
    orderNumberList.value = orderNumberList.replaceAll(" ","").replaceAll("s","").replaceAll("Order","").replaceAll(",",", ");
    formOrderNumbers = orderNumberList;
    formFirstName.value = normalizeFirstName(nameField.innerText,"edit");;
    formLastName.value = normalizeLastName(nameField.innerText,"edit");
    formCustID.value = normalizeCID(CIDField.innerText,"edit",false);
    formPhoneNumber.value = normalizePhoneNumber(phoneField.innerText,"edit",false);
    formEmail.value = normalizeEmail(emailField.innerText,"edit",true);
    formOrderNumbers.value = orderNumberList;
	if(1==2){

	}
	else{

	}
    document.getElementById('contactEdit').classList.remove("hidden");
    document.getElementById('contactInfoSection').classList.add("hidden");
	if(selected == "name"){
		document.getElementById('formFirstName').focus();
	}
	if(selected == "CID"){
		document.getElementById('formCustID').focus();
	}
	if(selected == "phone"){
		document.getElementById('formPhoneNumber').focus();
	}
	if(selected == "email"){
		document.getElementById('formEmail').focus();
	}
}
function contactFormCancel(){
    document.getElementById('nameField').classList.remove("show");
    document.getElementById('CIDField').classList.remove("show");
    document.getElementById('phoneField').classList.remove("show");
    document.getElementById('emailField').classList.remove("show");
    document.getElementById('formEmail').style='';
    document.getElementById('contactInfoSection').classList.remove("hidden");
    document.getElementById('contactEdit').classList.add("hidden");
}
function resetContactInfo(){
    contactFormCancel();
    var name = document.getElementById("nameField");
    var CID = document.getElementById("CIDField");
    var phone = document.getElementById("phoneField");
    var email = document.getElementById("emailField");
    name.classList.remove("active");
    CID.classList.remove("active");
    phone.classList.remove("active");
    email.classList.remove("active");
    name.classList.add("inactive");
    CID.classList.add("inactive");
    phone.classList.add("inactive");
    email.classList.add("inactive");
    name.innerHTML = '<div style="padding:2px;width:92%">Name</div>';
    CID.innerHTML = '<div style="padding:2px;width:92%">Customer ID</div>';
    phone.innerHTML = '<div style="padding:2px;width:92%">Phone number</div>';
    email.innerHTML = '<div style="padding:2px;width:92%">Email address</div>';
    document.getElementById("contactInfoSection").classList.remove("hidden");
    document.getElementById("contactEdit").classList.add("hidden");
	//document.getElementById("ordersSection").classList.add("hidden"); =========================================================================================
}
function contactFormSave(fullName,CID,phoneNum,email,exists){
    var nameField = document.getElementById('nameField');
    var CIDField = document.getElementById('CIDField');
    var phoneField = document.getElementById('phoneField');
    var emailField = document.getElementById('emailField');
    nameField.innerHTML = '<div style="padding:2px;width:92%">' + fullName + '</div>';
    CIDField.innerHTML = '<div style="padding:2px;width:92%">' + CID + '</div>';
    phoneField.innerHTML = '<div style="padding:2px;width:92%">' + phoneNum + '</div>';
    emailField.innerHTML = '<div style="padding:2px;width:92%">' + email + '</div>';
    // IF THE CONTENT OF THE NAME FIELD IS NOT VALID
	/* NOT TRUE ========> */ if(nameField.innerText == "" || nameField.innerText == "Name" || nameField.innerText.includes("@")){
		// IF CUSTOMERNAME IS VALID
        if(customerName != "Filters Fast Customer Service" && customerName != "" && customerName != "Name" && customerName != 'undefined' && typeof customerName != 'undefined' && customerName.includes("@") == false){
            nameField.innerHTML = customerName;
			nameField.classList.remove("inactive");
        }
		// IF CUSTOMERNAME IS ALSO NOT VALID
		else{
			nameField.innerHTML = '<div style="padding:2px;width:92%">Name</div>';
			nameField.classList.add("inactive");
		}
    }
	// IF THE CONTENT OF THE NAME FIELD IS VALID
	else{
		nameField.innerHTML = '<div style="padding:2px;width:92%">' + fullName + '</div>';
		nameField.classList.remove("inactive");
	}
    if(customerName == "Name"){
		customerName = "";
	}
	else{
		
        customerName = nameField.innerText;
	}
	/*var formOrdersString = (
        //document.getElementById('formOrderNumbers').value.trim()
        orderNumber.trim()
        .replaceAll("CP09","[prefix]").replaceAll("Cp","").replaceAll("cP","").replaceAll("cp","").replaceAll("CP","")
        .replaceAll("-","").replaceAll("#","").replaceAll(" ","")
        .replaceAll("[prefix]","CP09-").replaceAll(",,",",")
    );
    var formOrderNumbers = normalizeOrderNumbers(document.getElementById('formOrderNumbers').value,formOrdersString);
    if(formOrderNumbers[0] == ""){
        if(
            currentConversation.subject.slice(0,8) == "Orders #" || currentConversation.subject.slice(0,7) == "Order #" ||
            currentConversation.subject == "" || currentConversation.subject == "No subject" || typeof currentConversation.subject == 'undefined'){
			//Missive.setSubject('');
            // come back here =======================================================================================================================
        }
        // document.getElementById('ordersSection').classList.add("hidden"); ========================================================================
    }
    else{
        //document.getElementById('ordersSection').classList.remove("hidden");======================================================================
        if(formOrderNumbers.length > 1){
          newSubject = "Orders #" + formOrdersString.replaceAll("Order #","#").replaceAll(",",", ");
        }
        else{
          newSubject = formOrderNumbers[0];
        }
		//Missive.setSubject(newSubject);
        //Missive.setSubject('');
        // come back here =======================================================================================================================
    }*/
	//document.getElementById('ordersSection').innerHTML = buildOrderNumbersList(formOrdersString.split(","));
    buildOrderNumbersList(normalizeOrderNumbers(orderNumber,"panel"));
    //console.log("test1 " + test1);
    //console.log("test2 " + test2);
    //document.getElementById('orderNumberList').innerHTML = test1;//buildOrderNumbersList(getOrderNumber(currentConversation).split(","));

    
	// searchMondayPosts(orderNumber,contact.customerID,contact.phoneNumber,messageFrom,tokens[2]);
}
function contactFormSaveButton(){
	//document.getElementById('ordersSection').classList.add('hidden');============================================================================
	if(!document.getElementById('formEmail') || !document.getElementById('formEmail').value || document.getElementById('formEmail').value == ''){
        document.getElementById('formEmail').style='border:1px solid var(--missive-red-color)';
    }
    else{
        var formFirstName = normalizeFirstName(document.getElementById('formFirstName').value,"panel");
        var formLastName = normalizeLastName(document.getElementById('formLastName').value,"panel");
        var fullName = normalizeFullName(formFirstName,formLastName,"panel",true)
        var formCustID = normalizeCID(document.getElementById('formCustID').value,"panel",true);
        var formPhoneNumber = normalizePhoneNumber(document.getElementById('formPhoneNumber').value,"panel",true);
        var formEmail = normalizeEmail(document.getElementById('formEmail').value,"panel",true);
        var formOrderNumbers = document.getElementById('formOrderNumbers').value;
        formOrderNumbers = formOrderNumbers.replaceAll(" ","").replaceAll("s","").replaceAll("Order","").replaceAll(",",", #");
        if(formOrderNumbers != ""){
            if(formOrderNumbers.includes(",")){
                formOrderNumbers = "Orders #" + formOrderNumbers;
            }
            else{
                formOrderNumbers = "Order #" + formOrderNumbers
            };
        }
        
        
        
        
        
        
        
        
        
        console.log("First name | " + formFirstName)
        console.log("Last name | "  + formLastName)
        var CIDparameter;
        var phoneParameter;
        var orderParam;
        if(formCustID != "" && formCustID != "Customer ID"){
            CIDparameter =  formCustID.replace("CID ","");
        }
        else{
            CIDparameter = "";
        }
        if(formPhoneNumber != "" && formPhoneNumber != "Phone number"){
            phoneParameter =  formPhoneNumber.replaceAll("(","").replaceAll(")","").replaceAll("-","").replaceAll(" ","");
        }
        else{
            phoneParameter = "";
        }
        if(formOrderNumbers != "" ){
            orderParam =  formOrderNumbers;
        }
        else{
            orderParam = "";
        }
        console.log("CID | " + CIDparameter)
        console.log("Phone number | " + phoneParameter)
        console.log("Email | " + formEmail)
        console.log("Order number(s) | " +  orderParam)
        console.log("Contact exists? | " +  contactExists)







        document.getElementById('contactInfoSection').classList.remove("hidden");
        document.getElementById('contactEdit').classList.add("hidden");
        Missive.setSubject(formOrderNumbers); 
		//document.getElementById("orderPopup" + orderPosition).classList.remove("show");
        if(contactExists == false){
            // saveContact(formFirstName,formLastName,formEmail,phoneParameter,CIDparameter)
        }
        contactFormSave(fullName,formCustID,formPhoneNumber,formEmail,true);
        contactSavedShow();
    }
}
function contactSavedShow(){
	var custInfo = document.getElementById("custInfo");
	custInfo.innerText = "Contact information saved!";
    custInfo.classList.add("contact-saved");
	setTimeout(contactSavedFade,1000,custInfo);
}
function contactSavedFade(element){
	element.classList.add("contact-saved-fade");
    setTimeout(contactSavedEnd,400,element);
}
function contactSavedEnd(element){
	custInfo.innerText = "Contact information";
    element.classList.remove("contact-saved");
    element.classList.remove("contact-saved-fade");
}
function selectFields(field,type,value){

}
function buildOrderNumbersList(list){
	if(list.length < 1 || list[0] == ""){
		hide("ordersSection");
        document.getElementById("orderNumberList").innerHTML = "";
	}
    else if(list.length == 1 && list[0] == ""){
        hide("ordersSection");
        document.getElementById("orderNumberList").innerHTML = "";
    }
	else{
		show("ordersSection");
		var orderArray = [];
		for(var i = 0; i < list.length; i++){
            orderArray.push(
				'<span class="fieldText" title="' + list[i].replace("Order #","") + `
(Click to copy)`+ '" style="margin-top:6px;margin-left:4px;" id="orderField' + i +
				'" onclick="copyToClipboard(' + "'order" + i + "'" + ',' + animationLength + ')">' +
				 list[i] + '<span class="popup" id="orderPopup' + i +
				'"></span></span>'
			);
		}
		document.getElementById("orderNumberList").innerHTML = orderArray.join("<br>").replace('margin-top:6px;','');
	}
}
function normalizeOrderNumbers(string,type){
    var formOrderNumbers;
    if(string == ""){
        return [""];
    }
    else{
        if(type == "panel"){
            return ("Order #"+ string).replaceAll(",",",Order #").split(",");
        }
        else{
            return string.split(",");
        }
    }
}
function normalizeFirstName(input,type){
    // remove any leading and traling spaces
    var output = ("|" + input + "|").replaceAll("| ","").replaceAll(" |","").replaceAll("|","");
    // if this is an email address,
    if(typeof input == 'undefined'){
        output = "";
    }
    else if(input.includes("@") ||input.toLowerCase() == "name" || input == ""){
        // get rid of it
        output = "";
    }
    else if( output.replaceAll(".","").replaceAll("","").length > 2){
        // if it's all  caps
        if(output.toUpperCase() === output){
            // make it lowercase, and then capital case
            document.getElementById('textmod').innerText = output;
            document.getElementById('textmod').style.textTransform = "lowercase";
            output = document.getElementById('textmod').innerText;
        }
        // otherwise just make it capital case
        document.getElementById('textmod').innerText = output;
        document.getElementById('textmod').style.textTransform = "capitalize";
        output = document.getElementById('textmod').innerText;
        document.getElementById('textmod').innerText ="";
    }
    // if grabbing the full name from the info panel,
    if (type == "panel"){
        // separate out the first name
        if(("|" + input + "|").replaceAll("| ","").replaceAll(" |","").replaceAll("|","").includes("")){
            output = output.split(" ")[0];
        }
    }
    if (type == "edit"){
        // separate out the first name
        if(("|" + input + "|").replaceAll("| ","").replaceAll(" |","").replaceAll("|","").includes("")){
            output = output.split(" ")[0];
        }
    }
    return output;
}
function normalizeLastName(input,type){
    var output = ("|" + input + "|").replaceAll("| ","").replaceAll(" |","").replaceAll("|","");
    if(typeof input == 'undefined'){
        output = "";
    }
    else if(input.includes("@") ||input.toLowerCase() == "name" || input == ""){///////} || input.includes(" ") == false){==========================
        // get rid of it
        output = "";
    }
    else if( output.replaceAll(".","").replaceAll("","").length > 2){
        if(output.toUpperCase() === output){
            document.getElementById('textmod').innerText = output;
            document.getElementById('textmod').style.textTransform = "lowercase";
            output = document.getElementById('textmod').innerText;
        }
        document.getElementById('textmod').innerText = output;
        document.getElementById('textmod').style.textTransform = "capitalize";
        output = document.getElementById('textmod').innerText;
        document.getElementById('textmod').innerText ="";
    }
    if (type == "panel"){
        if(("|" + input + "|").replaceAll("| ","").replaceAll(" |","").replaceAll("|","").includes(" ")){
            output = output.replace((output.split(" ")[0] + " "),"");
        }
    }
    if (type == "edit"){
        if(("|" + input + "|").replaceAll("| ","").replaceAll(" |","").replaceAll("|","").includes(" ")){
            output = output.replace((output.split(" ")[0] + " "),"");
        }
    }
    return output;
}
function normalizeFullName(first,last,type,updateElements){
    console.log("first " + first);
    console.log("last " + last);
    console.log("type " + type);
    console.log("updateElements " + updateElements)
    var output;
    var raw = ([first,last]).join(" ");
    console.log("raw 1 " + raw);
    var empty = (
        ([first,last]).join(" ").trim().replaceAll(" ","") == "" ||
        ([first,last]).join(" ").trim().replaceAll(" ","").toLowerCase() == "name" ||
        ([first,last]).join(" ").includes("@")
    );
    console.log("empty " + empty)
    var field = document.getElementById("nameField");
    var textInput = document.getElementById("formName");
    if(empty){
        console.log("is empty")
        if(type == "panel"){
            output = "Name";
            if(updateElements){
                field.classList.remove("active");
                field.classList.add("inactive");
                setFieldHover("nameField", "");
            }
        }
        else if (type == "edit"){
            output = raw;
            if(updateElements){
            }
        }
    }
    else{
        if(type == "panel"){
            var hover = raw;
            output = raw + '<span class="popup" id="namePopup"></span>';  //xxxxxxxxxxxxxxxxxxxxxxxx
            if(updateElements){
                field.classList.remove("inactive");
                field.classList.add("active");
                setFieldHover("nameField", hover);
            }
        }
        else if (type == "edit"){
            console.log("NOT panel")
            output = raw;
        }
    }
    console.log(output)
    return output;
}
function normalizeCID(input,type,updateElements){    
    var output;
    var raw = input.toString()    
    raw = raw.trim().replace("Customer ID","").replace("CID","").replaceAll(" ","").toUpperCase();    
    if(raw.slice(0,3) != "CUS"){
        raw = raw * 1;        
    }
    var empty = (raw == "" || raw == "CID");    
    var field = document.getElementById("CIDField");
    if(empty){        
        if(type == "panel"){            
            output = "Customer ID";
            if(updateElements){
                field.classList.remove("active");
                field.classList.add("inactive");
                setFieldHover("CIDField", "");
            }
        }
        else if (type == "edit"){
            output = "";
        }
    }
    else{
        if(type == "panel"){
            var hover = raw;
            output = 'CID ' + raw + '<span class="popup" id="CIDPopup"></span>';
            if(updateElements){
                field.classList.remove("inactive");
                field.classList.add("active");
                setFieldHover("CIDField", hover);
            }
        }
        else if (type == "edit"){
            output = raw;
        }
    }
    return output;
}
function normalizePhoneNumber(input,type,updateElements){
    var output;
    var raw = input.toString()
    raw = raw.trim().replaceAll(" ","").replaceAll("#","").replaceAll(".","").replaceAll("-","").replaceAll("+","").replaceAll("(","").replaceAll(")","");
    if(raw.slice(0,1) == 1){
        raw = raw.replace("1","");
    }
    var empty = (raw == "" || raw.toLowerCase() == "phonenumber");
    var field = document.getElementById("phoneField");
    var textInput = document.getElementById("formPhoneNumber");
    if(empty){
        if(type == "panel"){
            output = "Phone number";
            if(updateElements){
                field.classList.remove("active");
                field.classList.add("inactive");
                setFieldHover("phoneField", "");
            }
        }
        else if (type == "edit"){
            output = "";
        }
    }
    else{
        var formatted;
        if(raw.length > 10){
            formatted = "(" + raw.slice(0,3)  + ") " + raw.slice(3,6) + "-" + raw.slice(6,10) + " " + raw.slice(10,raw.length);
        }
        else if (raw.length > 6){
            formatted = "(" + raw.slice(0,3)  + ") " + raw.slice(3,6) + "-" + raw.slice(6,raw.length);
        }
        else{
            formatted = raw;
        }
        if(type == "panel"){
            var hover = raw;
            console.log("!!1 " + raw)
            console.log("!!2 " + formatted)
            output = formatted + '<span class="popup" id="phonePopup"></span>';    
            console.log("!!3 " + output)        
            if(updateElements){
                field.classList.remove("inactive");
                field.classList.add("active");
                setFieldHover("phoneField", hover);
            }
        }
        else if (type == "edit"){
            output = formatted;
        }
    }
    console.log("!!4 " + type)
    return output;
}
function normalizeEmail(input,type,updateElements){
    var output;
    var raw = (" " + input).trim().replaceAll(" ","").toLowerCase();
    var empty = (raw == "" || raw == "emailaddress" || raw.includes("@") == false);
	if((raw + "@|").split("@")[1].toLowerCase() == "filtersfast.com"){
		empty = true;
	}
    var field = document.getElementById("emailField");
    var textInput = document.getElementById("formEmail");
    if(empty){
        if(type == "panel"){
            output = "Email address";
            if(updateElements){
                field.classList.remove("active");
                field.classList.add("inactive");
                setFieldHover("emailField", "");
            }
        }
        else if (type == "edit"){
            output = "";
            if(updateElements){
                textInput.disabled = false;
                textInput.style = 'color:var(--missive-text-color-a);font-style:none';
            }
        }
    }
    else{
        if(type == "panel"){
            var hover = raw;
            output = raw + '<span class="popup" id="emailPopup"></span>';
            if(updateElements){
                field.classList.remove("inactive");
                field.classList.add("active");
                setFieldHover("emailField", hover);
            }
        }
        else if(type == "edit"){
            output = raw;
            if(updateElements){
                if(raw.split("@")[1] == "filtersfast.com"){
                    textInput.disabled = true;
                    textInput.style = 'color:var(--missive-text-color-d);font-style:italic';
                    textInput.value = "";
                }
                else{
                    textInput.disabled = true;
                    textInput.style = 'color:var(--missive-text-color-d);font-style:italic';
                }
            }
        }
    }
    return output;
}
function copyToClipboard(type, duration) {    
	var showTooltip = true;
	var elementValue ;
	if(type == "name"){
		elementValue = document.getElementById('nameField').innerText.trim().replaceAll(" ","");
		if(elementValue == "" || elementValue == "Name"){
			showTooltip = false;
		}
	}
	if(type == "CID"){
		elementValue = document.getElementById('CIDField').innerText.trim().replaceAll(" ","");
		if(elementValue == "" || elementValue == "CustomerID"){
			showTooltip = false;
		}
	}
	if(type == "phone"){
		elementValue = document.getElementById('phoneField').innerText.trim().replaceAll(" ","").toLowerCase();
		if(elementValue == "" || elementValue.toLowerCase() == "phonenumber"){
			showTooltip = false;
		}
	}
	if(type == "email"){
		elementValue = document.getElementById('emailField').innerText.trim().replaceAll(" ","").toLowerCase();
		if(elementValue == "" || elementValue.toLowerCase() == "emailaddress"){
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
			document.getElementById("contactInfoSection").appendChild(textArea);
			textArea.focus();
			textArea.select();
			try {
				document.execCommand('copy');
			} catch (err) {
				console.error('Unable to copy to clipboard', err);
			}
			document.getElementById("contactInfoSection").removeChild(textArea);
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
            console.log("=== TYPE " + type)
            console.log("=== TYPEPOPUP " + type + "Popup")
			var popup = document.getElementById(type + "Popup");
            console.log("=== POPUP " + popup)
			
            console.log("=== MESSAGES " + messages)
            
            console.log("=== INDEX " + index)          
            console.log("=== MESSAGESINDEX " + messages[index])
            
            popup.innerText = messages[index];
		}
		popup.classList.remove("hide");
		popup.classList.add("show");
		setTimeout(transition,(duration * 1000), popup);
	}
	else{
		showEditPanel(type);
	}
}
function transition(input){
    input.classList.add("hide");
    input.classList.remove("show");
}
function getPlaintext(input) {
    var span = document.getElementById('textmod');
    var store = span.innerHTML;
    if(store == ""){
        store == "it's blank"
    }
    if(typeof store == "undefined"){
        store == "it's typeof undefined"
    }
    if(store == "undefined"){
        store == "it's undefined"
    }
    span.innerHTML = input.innerHTML;
    output = span.innerText;
    span.innerText = "";
    span.innerHTML = store;
    return span.innerText;
}
function setFieldHover(element,value){
	var tooltip = value + `
(Click to copy)`;
    document.getElementById(element).setAttribute("title",tooltip);
}