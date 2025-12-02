var key = getKey();
function getKey(){
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const key = urlParams.get('key');
  return key;
}
/*doAthing();
async function doAthing(){
  var something = await createPost();
  console.log(something.data.create_item.id);
}*/
createPost();
async function createPost(){
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
    console.log(item.data.create_item.id);
}
