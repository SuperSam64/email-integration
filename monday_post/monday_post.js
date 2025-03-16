// TESTING VARIABLES
//========
var shipper = 'UPS';
var shipperAccount = '1A2B3C';
//========

// API key here
var key =${{ secrets.MONDAY_KEY }};
// ID of board the new item will be posted to
var board=8705198504;
// ID of group the new item will be created in
var groupId='group_title';
// The name of the new item
var postName = 'B2B order #CP09-1234567';
// User id for notification
var userId=35911561;
// User info for mention
var mentionW = tagUser(35911561,'sam-nimmo','Sam Nimmo' );
var mentionT = tagUser(35911561,'sam-nimmo','Sam Nimmo' );
// Content of update to include with post. Can include a mention if one has been defined.
var updateContent=mentionW+" "+mentionT+" please ship on "+shipper+" account #"+shipperAccount+", thank you!";
// Update type, 'Post' or 'Project' (see documentation for more info). This set of scripts uses 'Post' and modification may be necissary if using 'Project'.
var updateType='Post';
// Create update object so the update content and type can be called later
var update={
	'content': updateContent,
	'type': updateType
};

// Array of column IDs
var idArray=[
	'status',
	'numeric_mkp2z1xj'
];
// Array of column values that correspond with the IDs in the previous array
var valueArray=[
	'Working on it',
	'2'
];

// Headers for HTTP Post
var headers={
	'Content-Type': 'application/json',
	'Authorization' : key,
	'API-Version' : '2024-04'
};


function postData(){
	createItem(userId,board,postName,idArray,valueArray,update);	
};

function parseColumns(ids,values){
	var columnArray=[];
	for(i=0;i<ids.length;i++){
		columnArray.push('\\"'+ids[i]+'\\":\\"'+values[i]+'\\"');
	}
	return columnArray;
}

function tagUser(id,userName,displayName){
	return "<a class='user_tagUser_editor router' href='https://filtersfast.monday.com/users/"+id+"-'"+userName+"' data-tagUser-type='User' data-tagUser-id='"+id+"' target='_blank' rel='noopener noreferrer'>@"+displayName+"</a>";
}

async function createItem(user,boardId,name,columnIds,columnValues){	
	var columns=parseColumns(idArray,valueArray);
	let query = 'mutation {create_item (board_id: '+boardId+', group_id: "'+groupId+'", item_name: "'+name+'", column_values: "{'+columns+'}"){id}}';
	const response = await fetch ("https://api.monday.com/v2", {
		method: 'POST',
		headers: headers,
		body: JSON.stringify({
			query : query
		})
	})
	.then(response => response.json())
	.then(data => {
		var itemId=data.data.create_item.id;
		createUpdate(user,itemId,update);
	})
	.catch(error => {
		console.error('Error:', error);
	});	
}

async function createUpdate(user,itemId,update){
	let query = 'mutation{create_update (item_id: '+itemId+', body: "'+update.content+'"){id}}'
	const response = await fetch ("https://api.monday.com/v2", {
		method: 'POST',
		headers: headers,
		body: JSON.stringify({
			query : query
		})
	})
	.then(response => response.json())
	.then(data => {
		
		var updateId=data.data.create_update.id;
		notify(user,updateId,update);
	})
	.catch(error => {
		console.error('Error:', error);
	});	
}

async function notify(user,updateId,update){
	let query = 'mutation {create_notification (user_id: '+user+', target_id: '+updateId+', text: "'+update.content+'", target_type: '+update.type+') {text}}';
	const response = await fetch ("https://api.monday.com/v2", {
		method: 'POST',
		headers: headers,
		body: JSON.stringify({
			query : query
		})
	})
}

function getParams(){
	const urlParams = new URLSearchParams(window.location.search);

	// Get the value of the 'id' parameter
	const firstParam = urlParams.get('firstThing');

	// Get all values of the 'tag' parameter
	const secondParam = urlParams.getAll('secondThing');
	
	createItem(userId,board,firstParam+secondParam,idArray,valueArray,update);
}

// ================================================================================================================================
/* To get info about a specific item, column or group, use the queries below.

// ITEMS
query {
  boards (ids: 1234567890){
    items_page {
      cursor
      items {
        id 
        name 
      }
    }
  }
}

// COLUMNS
query {
  boards(ids: 8705198504) {
    columns {
      id,
      title,  
      type
    }
  }
}

// GROUPS
query {
    boards (ids: 8705198504) {
        groups {
            id
            title
        }
    }
}

*/
// ================================================================================================================================
