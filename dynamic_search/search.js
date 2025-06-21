function getParams(){
	var urlParams=new URLSearchParams(window.location.search);
	var query=urlParams.get(query);
  switch(query){
    case 'something';
      alert('something');
      break;
    default:
      alert('not something');
      break;
  }
  return
}
