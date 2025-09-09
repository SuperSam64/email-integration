function getParams(){
	var urlParams=new URLSearchParams(window.location.search);
	var testval=urlParams.get('testval');
	window.open('javascript:window.location.href="https://supersam64.github.io/email-integration/textline/photos/test_erase_params.html";setTimeout(console.log('+testval+'),3000)','_self')
}
