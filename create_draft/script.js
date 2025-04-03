// TO DO
// 1) apply dark mode by URL param
// 2) simplify URL params users may need to easily change and put them in an easy-toedit location. Consider making a spreadsheet. (light/dark mode, key, user ID (?))
// 3) grab page contents
// 4) pass page contents to URL
// 5) tracking
// 6) add contact
// 7) wording of "reaching out" vs "reply depending on # of messages, have third optoin of neither
// 8) adjust greeting to time of day
// 9) consider adding a submenu while loading, and think about implimentation
// 10) label conversations
// 11) set to recognize user wtihout needing ID
// 12) quote previous message

var messageDetails=getDetails();
var key;

getUserId();

function getDetails(){
	var urlParams=new URLSearchParams(window.location.search);
	var orderNumber=urlParams.get('order');
	var user;////////////////////
	
	if(urlParams.order===null){orderNumber=''}
	key=urlParams.get('key');
	var output={
		'subject': orderNumber==''?'':'Re: order #'+orderNumber,
		'firstName': urlParams.get('firstName'),
		'email':urlParams.get('email'),
		'organization': urlParams.get('organization')
	}
	return output;
}

async function getUserId(){
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
		var user
		for(i=0;i<data.users.length;i++){
			if(data.users[i].me){
				user=data.users[i].id;
			}
		}
		getConversationId(messageDetails,user);
		//getConversationID, pass the user object. not user[].id, just user (so both name and ID can be pulled from it later)
	})
}

async function getConversationId(details,user,currentTime,searchRange=7,resultsPerPage=50){
	details.user=user;
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
		window.location.href=url;
	})	
}

function daysPassed(input){
	return Math.round((Date.now()-(86400000*input))/1000)
}
