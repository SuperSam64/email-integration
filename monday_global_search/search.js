console.log('hello world!');
var URL = window.location.search;
var parameters = new URLSearchParams(URL);
var query = parameters.get('query');
var key = parameters.get('key');
getResults();
fucntion getResults(){
    window.open("javascript:window.location.href='https://filtersfast.monday.com/search/cross_board?q=' + query; console.log('this is a test')");
}
/*async function globalSearch(term,token){
    const response = await fetch ("https://filtersfast.monday.com/search/cross_board?q" + term, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : token,
            'API-Version' : '2024-04'
        }
    })
    return response.json();
}*/
