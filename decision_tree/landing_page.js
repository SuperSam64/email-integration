var config;
var importedData;
getData(data);
function getData(input){	
  window.addEventListener('load', importClipboard);
  async function importClipboard(){
  window.removeEventListener('load', importClipboard);
  var containsPlaintext = true;
  var clipboardText;
  var empty = true;
  var imported = await navigator.clipboard.readText();
  var copiedObject = {};
  if(imported.includes('{{ %end_clipboard% }}')){
	clipboardText = imported.split('{{ %end_clipboard% }}')[0];
	imported = imported.split('{{ %end_clipboard% }}')[1];
  }
  var clipboardContents = await navigator.clipboard.read();
  for(const item of clipboardContents){
	empty = false;
	for(const mimeType of item.types){
	  if(mimeType === 'text/plain' && clipboardText){
	    copiedObject[mimeType] = clipboardText;
	  }
	  else if(mimeType !== 'text/plain'){
	    var copied = await item.getType(mimeType);
	    copiedObject[mimeType] = copied;
      }
    }
  }
  if(empty == false){
	var clipboard = new ClipboardItem(copiedObject);
      await navigator.clipboard.write([clipboard]);	
      importedData = document.createElement('div');
      importedData.innerHTML = imported;
      processImportedData(importedData);
    }
  }
  function processImportedData(input){
    sessionStorage.setItem('dataObject', input);
    console.log(input);
  }
}
