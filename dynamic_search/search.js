var urlParams=new URLSearchParams(window.location.search);
var query=urlParams.get('query');
switch(getSearchType(query)){
	case 'phone':
		window.location.href='https://www.google.com/search?q='+query;
		break;
	default:
		window.location.href='https://www.filtersfast.com/search/?query='+query;
		break;
}

function getSearchType(input){
	if(query=='something'){
		return 'phone';
	}
	else{
		return 'email';
	}
}
