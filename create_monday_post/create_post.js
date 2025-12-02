var key = getKey();
function getKey(){
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const key = urlParams.get('key');
  return key;
}

function doAthing(input){
  console.log(input);
}

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
    })
    doAthing(response.json());
    return;
}
