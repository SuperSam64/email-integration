console.log('hello world!');
var URL = window.location.search;
var parameters = new URLSearchParams(URL);
console.log(parameters.get('key');
/*console.log(globalSearch('12345678','abcd'));*/
async function getMondayData(term,key){
    const response = await fetch ("https://api.monday.com/v2", {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : key,
            'API-Version' : '2024-04'
        },
        body: JSON.stringify({
                'query' : searchTerm
        })
    })
    return response.json();
}
