var itemData = getParams();
var key = itemData.key;
createItem();
function getParams(){
	var requestType = params.get('requestType');
	var mentions = params.get('mentions') ? params.get('mentions').split(',') : [];
	var mentionsString = '';
	for(i = 0; i < mentions.length; i++){
		mentionsString += '{id: ' + mentions[i] + ' type: User}';
	}
	var itemObject = {
		key: params.get('key'),
		info: {
			linkedRequest: params.get('linkedRequest'),
			shipper: params.get('shipper'),
			shipperNum: params.get('shipperNum'),
			CID: params.get('CID'),
			orderNum: params.get('orderNum'),
			refundReason: params.get('refundReason'),
			refundAmount: params.get('refundAmount'),
			refundType: params.get('refundType') ? ' (' + params.get('refundType') + ')': ''
		}
	};
	switch(requestType){
		case 'refund':
			itemObject.item = {
				board_id: 169806972,
				item_name: 'Cancelled order #' + itemObject.info.orderNum + ' / ' + itemObject.info.CID + ' / $' + itemObject.info.refundAmount + itemObject.info.refundType,
				group_id: 'refund_requests',
				columns: 'status_1,' + itemObject.info.refundReason
			};
			itemObject.update = {
				body: params.get('update') ? params.get('update') : '',
				mentions_list: 'mentions_list: [], '
			};
			break;
		case 'large refund':
			itemObject.item = {
				board_id: 169806972,
				item_name: 'Cancelled order #' + itemObject.info.orderNum + ' / ' + itemObject.info.CID + ' / $' + itemObject.info.refundAmount + itemObject.info.refundType,
				group_id: 'new_group71812',
				columns: 'status_1,' + itemObject.info.refundReason
			};
			itemObject.update = {				
				body: (params.get('update') ? params.get('update') + '<br>' : '') + 'FYI',
				mentions_list: 'mentions_list: [{id: ' + 35911561 /* 20525251 */ + ' type: User}], '
			};
			break;
		case 'shipping request':
			itemObject.item = {
				board_id: 768866444,
				item_name: 'B2B order #' + itemObject.info.orderNum,
				group_id: 'topics'
			};
			itemObject.update = {
				body: 'Please ship using ' + itemObject.info.shipper + ' account #' + itemObject.info.shipperNum + ', thank you!<br>',
				mentions_list: 'mentions_list: [{id: ' + 2574175 + ' type: User}{id: ' + 620174 + ' type: User}], '
			};
			break;
		case 'matching_only':
			console.log(itemObject.orderNum);
			break;
		default:
			itemObject.item = {
				board_id: params.get('board'),
				item_name: params.get('name'),
				group_id: params.get('group'),
				columns: params.get('columns')
			};
			itemObject.update = {
				body: params.get('update') ? params.get('update') : '',
				mentions_list: 'mentions_list: [' + (mentionsString == '' ? '' : mentionsString) + '], '
			};
			break;
	}
	console.log(itemObject);
	return itemObject;
}
async function createItem(){
	    if(itemData.item){
		const response = await fetch ("https://api.monday.com/v2", {
	        method: 'post',
	        headers: {
	            'Content-Type': 'application/json',
	            'Authorization' : key,
	            'API-Version' : '2025-10'
	        },
	        body: JSON.stringify({
	          'query' : 
	            `mutation {
	              create_item(
	                board_id: ` + itemData.item.board_id + `
	                item_name: "` + itemData.item.item_name + `",
	                group_id: "` + itemData.item.group_id + `",
	              ),
	              {
	                id
	              }
	            }`
	        })
	    });
	    var item = await response.json();
		confirmShippingRequest(itemData.info.linkedRequest);
		updateColumn(item.data.create_item.id, itemData.item.board_id, itemData.item.columns);
		createUpdate(item.data.create_item.id, itemData.item.board_id);
	}
	else{
		var details = {
			orderNumber: itemData.orderNum
		};
		updateCCABoardPosts(details);
	}
}
function createUpdate(item, board){
	if(itemData.update.body && itemData.update.mentions_list){
		fetch ("https://api.monday.com/v2", {
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
				'Authorization' : key,
				'API-Version' : '2025-10'
			},
			body: JSON.stringify({
			  'query' : 
				`mutation {
			create_update (item_id: ` + item + `, ` + itemData.update.mentions_list + ` body: "` + itemData.update.body + `") {
				id
			}
		}`
			})
		});
	}
	goToItem(item, board);
}
function updateColumn(item, board, updatesString){
	if(updatesString){
		var columns = updatesString.split(';');
		var updates = [];
		for(i = 0; i < columns.length; i ++){
			if(columns[i] != ''){
				updates.push(`\\"` + columns[i].split(',')[0] + `\\": {\\"label\\": \\"` + columns[i].split(',')[1] + `\\"}`);
			}
		}
		var updatesOutput = '"{' + updates.join(',') + '}"';
		console.log(updatesOutput);
		fetch ("https://api.monday.com/v2", {
				method: 'post',
				headers: {
					'Content-Type': 'application/json',
					'Authorization' : key,
					'API-Version' : '2025-10'
				},
				body: JSON.stringify({
				'query': `mutation {
					change_multiple_column_values (
						board_id: ` + board + `,
						item_id: ` + item + `,
						column_values: ` + updatesOutput + `
					) {
						id
					}
				}`
			})
		});
	}
}
async function confirmShippingRequest(linkedItem){
	if(linkedItem){
		fetch ("https://api.monday.com/v2", {
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
				'Authorization' : key,
				'API-Version' : '2025-10'
			},
			body: JSON.stringify({
				'query' : 
				`mutation {
					change_multiple_column_values(
						board_id: 18391198601,
						item_id: ` + linkedItem + `,
						column_values: "{\\"boolean_mkycdv3t\\": {\\"checked\\": \\"true\\"}}"
					) {
						id
					}
				}`
			})
		});
	}
}
function updateCCABoardPosts(detailsObject){
	console.log(detailsObject.orderNumber);
}
function goToItem(item, board){
	window.location.href = 'https://filtersfast.monday.com/boards/' + board + '/pulses/' + item;
}
