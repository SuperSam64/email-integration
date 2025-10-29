var messageDetails;
var key;
function getDayPart(){
	var date=new Date(Date.now());
	var hour=date.getHours();
	if(hour>16){
		return 'evening';
	}
	else if(hour>11){
		return 'afternoon';
	}
	else{
		return 'morning'
	}
}

function getDetails(){
	var urlParams=new URLSearchParams(window.location.search);
	var orderNumber=urlParams.get('order');
	var label=urlParams.get('label');
	if(urlParams.order===null){orderNumber=''};
	if(urlParams.get('theme')!==null){
		if(urlParams.get('theme').toLowerCase()=='dark'){
			document.getElementById('pagestyle').setAttribute('href', 'style_dark.css'); 
		}
	}
	key=urlParams.get('key');
	var output={
		'subject': orderNumber==''?'':'Re: order #'+orderNumber,
		'firstName': urlParams.get('firstName'),
		'email':urlParams.get('email'),
		'organization': urlParams.get('organization')
	}
	if(label!==null){output.label=[];output.label.push(label)};
	return output;
}

async function getUserId(){
	messageDetails=getDetails();
	await fetch("https://public.missiveapp.com/v1/users",{  
		method: "GET",
		headers: {
			"Host": "public.missiveapp.com",
			"Authorization": "Bearer " + key,
			"Content-type": "application/json"
		},
	})
	.then(response => response.json())
	.then(data => {
		var user;
		var userName;
		for(i=0;i<data.users.length;i++){
			if(data.users[i].me){
				user=(data.users[i].id);
				userName=(data.users[i].name).split(' ')[0];
			}
		}
		messageDetails.assignees=[user];
		messageDetails.signature=(
			'<div class="missive_signature" spellcheck="false"><br>'+
			'<p style="margin-top: 0; margin-bottom: 0">--</p>'+
			'<p style="margin-top: 0; margin-bottom: 0">Sincerely,</p>'+
			'<p style="margin-top: 0; margin-bottom: 0">'+userName+'<br><br></p>'+
			'<p>Filters Fast Customer Experience<br><br></p>'+
			'<p><a href="https://www.filtersfast.com">'+
			'<img src="https://files.missiveusercontent.com/3747ddf5-6f69-4d16-a903-73873a0b8d37/large-FF-shield-logo-Full.png"alt="" '+
			'title="" width="192" data-missive-resizable-image="true" data-missive-image-resolution="288" style="max-width: 100%">'+
			'</a></p><p>✉ <a href="mailto:support@filtersfast.com">support@filtersfast.com</a>&nbsp; | &nbsp;📞 <a href="tel:+18664383458">866-438-3458</a>'+
			'&nbsp; | &nbsp;💬 <a href="sms:+17042289166">704-228-9166</a></p></div>'
		);
		getConversationId(messageDetails);
	})
}
async function getConversationId(details,currentTime,searchRange=7,resultsPerPage=50){
	var until = currentTime;
	if(!currentTime){until=Math.round(Date.now()/1000)};
	var latest;
	await fetch("https://public.missiveapp.com/v1/conversations?all=true&limit="+resultsPerPage+"&until="+until,{  
		method: "GET",
		headers: {
			"Host": "public.missiveapp.com",
			"Authorization": "Bearer " + key,
			"Content-type": "application/json"
		},
	})
	.then(response => response.json())
	.then(data => {
		for(i=0;i<data.conversations.length;i++){
			var parsed='';
			for(n=0;n<data.conversations[i].external_authors.length;n++){
				if(data.conversations[i].external_authors[n].address){parsed=data.conversations[i].external_authors[n].address.toLowerCase().trim()}						
				if(details.email.toLowerCase().trim()==parsed){
					getReplyType(details,data.conversations[i].id);
					return data.conversations[i].id;
				}
			}
			until=data.conversations[i].last_activity_at;
		}	
		if(daysPassed(searchRange)<until){
			getConversationId(details,until,searchRange,resultsPerPage);
		}
		else{
			createDraft(details);
		return;
		}
	})
}

async function getReplyType(details,input=''){
	var firstContact=true;
	var incoming=0;
	await fetch("https://public.missiveapp.com/v1/conversations/"+input+"/messages",{  
		method: "GET",
		headers: {
			"Host": "public.missiveapp.com",
			"Authorization": "Bearer " + key,
			"Content-type": "application/json"
		},
	})
	.then(response => response.json())
	.then(data => {
		for(m=0;m<data.messages.length;m++){
			var currentMessage;
			for(s=0;s<data.messages[m].to_fields.length;s++){
				if(data.messages[m].to_fields[s].address.includes('@filtersfast.com')&&!(data.messages[m].from_field.address.includes('@filtersfast.com'))){
					incoming++;
				}
				if(incoming>0&&!(data.messages[m].to_fields[s].address.includes('@filtersfast.com'))&&data.messages[m].from_field.address.includes('@filtersfast.com')){
					firstContact=false;
				}
			}
		}
		createDraft(details,firstContact,input);
	})
}

function createDraft(details,firstContact=true,input=''){
	var messageBody='A copy of your prepaid return shipping label is attached. Please let me know if there is anything else I can assist with, and have a great day!';
	fetch("https://public.missiveapp.com/v1/drafts", {
        method: "POST",
        body: JSON.stringify({
			"drafts": {
				...(input!='' ? { "conversation": input } : {}),
				"subject": details.subject,
				"body": "Good "+getDayPart()+", "+details.firstName+",<br><br>"+messageBody+details.signature,
				"to_fields": [
					{
						"address": details.email
					}
				],
				"from_field": {
					"name": "Filters Fast Customer Care Team",
					"address": "sales@filtersfast.com"
				},
				"organization": details.organization,
				"add_assignees": details.assignees,
				"add_shared_labels": ['9af713d8-d632-47f2-b2ee-9da899fe72e1'],
				"quote_previous_message": true
			}
		}),
		headers: {
			"Host": "public.missiveapp.com",
			"Authorization": "Bearer " + key,
			"Content-type": "application/json"
		}
	})
	.then(response => response.json())
	.then(data => {
		var conversationId=data.drafts.conversation;
		var messageId=data.drafts.id;
		var url='https://mail.missiveapp.com/#inbox/conversations/'+conversationId+'/messages/'+messageId;
		window.location.href=url;
	})	
}

function daysPassed(input){
	return Math.round((Date.now()-(86400000*input))/1000)
}
