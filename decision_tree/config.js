var code = `
exportClipboard();
async function exportClipboard(){
	if(validatePage == true){
		var pageData = document.body.innerHTML;
		var clipboardContents = await navigator.clipboard.read();
		var containsPlaintext = false;
		var copiedObject = {};
		for(const item of clipboardContents){
			for(const mimeType of item.types){
				var copied = await item.getType(mimeType);
				if(mimeType === 'text/plain'){
					var copiedText = await navigator.clipboard.readText();
					copied = copiedText + '{{ %end_clipboard% }}' + pageData;
					containsPlaintext = true;
				}
				copiedObject[mimeType] = copied;
				
			}
		}
		if(containsPlaintext == false){
			copiedObject['text/plain'] = pageData;
		}
		var clipboard = new ClipboardItem(copiedObject);
		await navigator.clipboard.write([clipboard]);
	}
	window.open(target);
}
`




var prefix = `javascript:
var config = ` + '[[config placeholder]]' + `;
var url = window.location.href.toLowerCase().replace('https://', '').replace('https://', '').replace('www.', '');
var validatePage = url.startsWith('filtersfast.com/manager/sa_order_edit.asp') || url.startsWith('filtersfast.com/manager/sa_cust_edit.asp');
if(validatePage == true){
	config.pageType = url.startsWith('filtersfast.com/manager/sa_order_edit.asp') ? 'order' : 'customer';	
}
else{
	config.pageType = 'none';
}
var target = 'https://supersam64.github.io/email-integration/decision_tree/index.html?' + new URLSearchParams(config).toString();
` + code;



var crm = new URLSearchParams(window.location.search).get('crm');


var currentTheme = document.querySelector('#currentTheme');

var themeList = document.querySelector('#themeList');
var themeSelector = document.querySelector('#themeSelector');
var themeItems = Array.from(document.querySelectorAll('div .themeItem'));

currentTheme.addEventListener('click', function () {
	toggleDropdown();
	
});

for(theme in themeItems){
	var thisTheme = themeItems[theme];
	thisTheme.addEventListener('click', function(){
		
		currentTheme.value = event.target.innerText;
		toggleDropdown();
		
	});
}

function toggleDropdown(){
	if(themeList.className.includes('visible')){
		themeList.classList.remove('visible');
		themeList.classList.add('hidden');
	}
	else{
		themeList.classList.remove('hidden');
		themeList.classList.add('visible');
	}
}

var firstName = document.querySelector('#firstName');
var lastName = document.querySelector('#lastName');
var initials = document.querySelector('#initials');

var missiveKey = document.querySelector('#missiveKey');
var mondayKey = document.querySelector('#mondayKey');

var textlineKey;

if(crm){textlineKey = document.querySelector('#textlineKey')}else{var row = document.querySelector('.textlineRow');row.classList.remove('visible');row.classList.add('hidden')}

firstName.addEventListener('input', function() {
	updateInitials();
});
lastName.addEventListener('input', function() {
	updateInitials();
});


function updateInitials(){
	if(firstName.value != '' && lastName.value != ''){
		initials.value = (firstName.value.slice(0, 1) + lastName.value.slice(0, 1)).toUpperCase();
	}
}

var button = document.querySelector('.button');
button.addEventListener('click', function(){
	if(firstName.value != '' &&
		initials.value != '' &&
		missiveKey.value != '' &&
		(crm ? textlineKey.value != '' : true) &&
		mondayKey.value != '' 
	){
		
		var output = JSON.stringify({
			theme: currentTheme.value.toLowerCase(),
			firstName: firstName.value,
			lastName: lastName.value,
			initials: initials.value,
			missiveKey: missiveKey.value.replace(/\s/g, ''),
			mondayKey: mondayKey.value.replace(/\s/g, ''),
			options: 'CCA'
		});
		if(crm){output.options = 'CRM'; output.textlineKey = textlineKey.value.replace(/\s/g, '')}
		output = prefix.replace('[[config placeholder]]', output);
		console.log(output);
		navigator.clipboard.writeText(output);
		document.querySelector('.outer').classList.add('hidden');
		document.querySelector('.final').classList.remove('hidden');
		document.querySelector('.final').classList.add('visible');
		
	}
	else{
		alert('Please fill in all required fields!');
	}
	
});

var inputs = Array.from(document.querySelectorAll('input'));
for(let i = 0; i < inputs.length; i ++){
	
	var currentInput = inputs[i];
	currentInput.addEventListener('focus', function() {
		hideSpans(i);
	});
}




function hideSpans(exclude){
	console.log(exclude);
	document.querySelector('#itemNumber').innerHTML = '<b>' + (exclude + 1) + '.</b>';
	var spans = Array.from(document.querySelectorAll('span'));
	for(span of spans){
		span.classList.add('hidden');
		span.classList.remove('visible');
	}
	spans[exclude].classList.add('visible');
	spans[exclude].classList.remove('hidden');
}


document.body.addEventListener('click', function(){
	if(event.target.id != 'currentTheme' && !event.target.className.includes('themeItem')){
		themeList.classList.add('hidden');
		themeList.classList.remove('visible');
	}	
});




/* pageType=order/customer/none 

var url = window.location.href.toLowerCase().replace('https://', '').replace('https://', '').replace('www.', '');
if(url.startsWith('filtersfast.com/manager/sa_order_edit.asp') || (url.startsWith('filtersfast.com/manager/sa_cust_edit.asp')){



*/
