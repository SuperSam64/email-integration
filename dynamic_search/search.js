function getParams(){
	var urlParams=new URLSearchParams(window.location.search);
	var query=urlParams.get(query);
	if(query=='something'){
		window.location.href='https://www.google.com/search?q='+query;
	}
	else{
		window.location.href='https://www.filtersfast.com/search/?query='+query;
	}	
  return;
}
