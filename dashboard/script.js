var data = getParams(window.location.href.split('?')[0], 'Dashboard');
console.log(data);
function getParams(newURL, newTitle, args){
	var output = Object.fromEntries(new URLSearchParams(window.location.search));
	if(newURL){
		history.replaceState(output, newTitle ? newTitle : '', newURL);
	}
	return output;
}
