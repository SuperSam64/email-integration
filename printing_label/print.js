getBase64
var imageData = function getBase64(){
  var params = new URLSearchParams(window.location.search);
			return params.get('image');
}
