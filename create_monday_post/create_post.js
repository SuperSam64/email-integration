var key = getKey();
function getKey(){
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const key = urlParams.get('key');
  return key;
}
function createUpdate(item){
	console.log(item);
}
createItem();
async function createItem(){
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
                board_id: 18390618196
                item_name: "new item"
                group_id: "topics"
              ),
              {
                id
              }
            }`
        })
    });
    var item = await response.json();
    createUpdate(item.data.create_item.id);
}
