// file:///C:/Users/Sampson/OneDrive%20-%20Filters%20Fast,%20LLC/Projects/Customization/monday%20api%20call/index.html?key=58493819165911490022072701070942
function decryptKey(){
	var urlParams = new URLSearchParams(window.location.search);
	var cypher = parseCypher(urlParams.get('key'));
	var range = [45,46,48,49,50,51,52,53,54,57,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,95,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122];
	var placeholder='_ku-rCnVO2QiV4RiIVuSHa930wcqjVs.z62zFIOwyiZNjeeuk2L5DIciizcClPsUu921DIdG2hZNjheuf2L5yIuwyiJTxUaht6qiEIda1iKFyUalr6oUqEtiiyNvzPsUdO5mO_G3pzNujSLycKgj3VN26hqq2TM9t5nbEVFsijpj2jD9s2PLHTJxfYpYwLRO-OCjJnhwL-FEmQ.2xk-sGUZYE01vOi9t';
	function parseCypher(input){
		var parsedCypher=[];
		for(i=0;i<14;i++){
			for(n=0;n<input.length/2;n++){
				parsedCypher.push(input.slice(n*2,(n+1)*2)*1);
			}
		}
		return parsedCypher;
	}
	
	function parsePlaceholder(input){
		var character=[];
		for(i=0;i<input.length;i++){
			var difference = range.indexOf(placeholder.charCodeAt(i))-cypher[i];
			if(difference<0){difference=difference+63};			
			character.push(String.fromCharCode(range[difference]));
		}
		return character.join('').trim();
	}
	return parsePlaceholder(placeholder);
}
