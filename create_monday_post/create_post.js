var requestData = getParams();
processRequest(requestData, '13579246', '5678910', 55.66, 'No Longer Needed', 'large refund', 'cybersource');

async function processRequest(data, orderNumber, CID, refundAmount, reason, type, redirect, partial) {
	var refundType = type ? type.replace('refund', '').trim() : '';
	var ccaRequest = await findMatch(650367267, 'new_group37624', 'text0', orderNumber);
	if(type != 'refund'){
		var title = 'Cancelled order #' + ([orderNumber, CID, '$' + refundAmount]).join(' / ') + (type && type != 'large refund') ? ' (' + type + ')' : '';
		var group = (type == 'large refund' ? 'new_group71812' : 'refund_requests');
		var column = [{name: 'status_1', type: 'status', value: reason}];
		var newRequest = await createItem(169806972, title, group, column);
		if(ccaRequest){
			var commentBody = 'Cancelled, refund <a href=\\"https://filtersfast.monday.com/boards/169806972/pulses/' + newRequest.data.create_item.id + '\\">requested</a>';
			var latestUpdate = await getLatestUpdate(ccaRequest);
			var newUpdate = await createUpdate(ccaRequest, commentBody, latestUpdate);
		}
		if(type == 'large refund'){
			var refundRequestID = await newRequest.data.create_item.id;
			var refundCommentBody = 'FYI';
			var refundLatestUpdate = await getLatestUpdate(refundRequestID);
			var refundNewUpdate = await createUpdate(refundRequestID, refundCommentBody, refundLatestUpdate, 35911561);
		}
	}
	if(ccaRequest){console.log('!');var columnValues = await updateColumns(650367267, ccaRequest, parseColumns([{name: 'status2', type: 'status', value: (partial ? 'Pending REF' : 'Cancelled')}]))}
	/* redirect can prob be determined by the vars passed */
	/*if(redirect){
		if(type == 'refund'){
			window.location.href = 'https://ebc.cybersource.com/ebc2/app/Home';
		}
		else{
			window.location.href = 'https://filtersfast.monday.com/boards/169806972/pulses/' + newRequest.data.create_item.id;
		}
	}*/
}

async function apiHandler(key, data, awaitResult = true){
	const response = await fetch ("https://api.monday.com/v2", {
		method: 'post',
		headers: {
			'Content-Type': 'application/json',
			'Authorization' : key,
			'API-Version' : '2025-10'
		},
		body: JSON.stringify({
			'query' : data
			
		})
	});
	if(awaitResult){
		var result = await response.json();
		return result;
	}
}

function createItem(board, name, group, columns){
	var columnsFormatted = (columns ? `column_values: \"{` + parseColumns(columns) + `}\"` : '');
	var result = `mutation {
		create_item(
			board_id: ` + board + `
			item_name: "` + name + `",
			group_id: "` + group + `",
			` + columnsFormatted + `
		) {
			id
		}
	}`;
	return apiHandler(requestData.key, result);
}

function searchRequests(board, group, column){
	var result = `query {
		boards(ids: [` + board + `]){
			groups(ids: ["` + group + `"]){ 
				items_page(limit: 50) {
					items{
						id
						column_values(ids: ["`+ column +`"]) {
							value
						}
					}
				}
			}
		}
	}`;
	return apiHandler(requestData.key, result);	
}

async function findMatch(board, group, column, query) {
	var searchData = await searchRequests(board, group, column);
	var requests = searchData.data.boards[0].groups[0].items_page.items;
	for(i = 0; i < requests.length; i ++){
		if(requests[i].column_values[0].value.replaceAll('"', '') == query){
			return requests[i].id;
		}
	}
	return;
}

async function getLatestUpdate(request){
	var response = `query {
	  items(ids: [` + request + `]) {
		updates {
		  id
		  replies {
			id
			body
		  }
		}
	  }
	}`;
	var result = await apiHandler(requestData.key, response);
	var updates = result.data.items[0].updates;
	var lastUpdate =  updates.length > 0 ? updates[updates.length - 1].id : undefined;
	return lastUpdate;
}

async function createUpdate(item, comment, replyingTo, mentions){
	var response = `mutation {
		create_update (item_id: ` + item + (replyingTo ?  ' parent_id: ' + replyingTo : '') + ` body: "` + comment +	
		/* `"FYI <a class=\"user_mention_editor router\" href=\"https://filtersfast.monday.com/users/35911561\" data-mention-type=\"User\" data-mention-id=\"` + '35911561' + `\" target=\"_blank\" rel=\"noopener noreferrer\">@` + 'Sam Nimmo' + `</a>, some text"` */
		`", ` + (mentions ? 'mentions_list: [{id: ' + (Array.isArray(mentions) ? mentions.join(', type: User}, {id: ')  : mentions) + ', type: User}]' : '') + `
		) {
			id
		}
	}`;
	var result = await apiHandler(requestData.key, response);
	return result;
}

function parseColumns(data){
	var columnArray = [];
	for(i = 0; i < data.length; i ++){
		if(data[i].parsingFormula){
			columnArray.push(parsingFormula(data[i].name, data[i].value));
		}
		else{
			switch(data[i].type){
				case 'status':
					columnArray.push(`\\"` + data[i].name + `\\":{\\"label\\":\\"` + data[i].value + `\\"}`);
					console.log(data);
					break;
				case 'person':
					columnArray.push(`\\"` + data[i].name + `\\":{\\"personsAndTeams\\":[{\\"id\\":` + data[i].value + `,\\"kind\\":\\"person\\"}]}`);
					break;
				case 'connect':
					columnArray.push(`\\"` + data[i].name + `\\":  {\\"item_ids\\":[` + data[i].value + `]}`);
					break;
				case 'link':
					columnArray.push(`\\"` + data[i].name + `\\": {\\"url\\": \\"` + data[i].value[0] + `\\", \\"text\\":\\"` + data[i].value[1] + `\\"}`);
					break;
				default:
					columnArray.push(`\\"` + data[i].name  + `\\": \\"` + data[i].value + `\\"`);
					break;
			}
		}
	}
	return columnArray.join(', ');
}

function updateColumns(board, item, columns){
	var result = `mutation {
		change_multiple_column_values(
			board_id: ` + board + `
			item_id: ` + item + `
			column_values: \"{` + columns + `}\"
		) {
			id
		}
	}`;
	return apiHandler(requestData.key, result);
}

function getParams(){
	var params = Object.fromEntries((new URLSearchParams(window.location.search)).entries());
	var parsed = {};
	Object.entries(params).forEach(([arg, value]) => {
		if(arg.includes('[')){
			if(parsed[arg.split('[')[0]]){
				parsed[arg.split('[')[0]][arg.split('[')[1].replace(']', '')] = value;
			}
			else
			{
				parsed[arg.split('[')[0]] = 
				{
					[arg.split('[')[1].replace(']', '')]: value
				}
			}
		}
		else{
			parsed[arg] = value;
		}
	});
	return parsed;
}
