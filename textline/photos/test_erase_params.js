getParams();
function getParams(){
	var urlParams=new URLSearchParams(window.location.search);
	var testval=urlParams.get('testval');
	window.open('javascript:window.location.href="https://www.google.com";console.log('+testval+', "_self")')
}
