console.log('hello world!');
var URL = window.location.search;
var parameters = new URLSearchParams(URL);
var query = parameters.get('query');
var key = parameters.get('key');
console.log(globalSearch(query, key))
async function globalSearch(term,token){
    const response = await fetch ("https://filtersfast.monday.com/search/cross_board?q" + term, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : token,
            'API-Version' : '2024-04'
        }
    })
    return response.json();
}
