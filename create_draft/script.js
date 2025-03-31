var messageDetails=getDetails();
var key;

function getDetails(){
	var urlParams=new URLSearchParams(window.location.search);
	var orderNumber=urlParams.get('order');
	if(urlParams.order===null){orderNumber=''}
	key=urlParams.get('key');
	var output={
		'subject': orderNumber==''?'':'Re: order #'+orderNumber,
		'firstName': urlParams.get('firstName'),
		'email':urlParams.get('email'),
		'organization': urlParams.get('organization'),
		'assignees': [urlParams.get('user')]
	}
	return output;
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
					createDraft(details,data.conversations[i].id);
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

function createDraft(details,input=''){
	fetch("https://public.missiveapp.com/v1/drafts", {
        method: "POST",
        body: JSON.stringify({
			"drafts": {
				...(input!='' ? { "conversation": input } : {}),
				"subject": details.subject,
				"body": "Good morning "+details.firstName+",<br><br>Thank you for reaching out to us!",
				"to_fields": [
					{
						"address": details.email
					}
				],
				"from_field": {
					"name": "Filters Fast Customer Care Team",
					"address": "boldsales@filtersfast.com"
				},
				"organization": details.organization,
				"add_assignees": details.assignees
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
		window.location.herf=url;
	})	
}

function daysPassed(input){
	return Math.round((Date.now()-(86400000*input))/1000)
}
