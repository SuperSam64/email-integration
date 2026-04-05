class modal{
	/* ================ Example use case ================ 	
	new modal({
		// Identify the element in which the modal should appear
		parent: document.querySelector('#myElement'),
		// Specify the distance from the top, if the modal should not be centered vertically. If this is omitted, it will be centered vertically.
		distanceFromTop: '40px',
		// The modal title, which will appear above the main content
		title: 'Modal Title', 
		// Modal main content
		content: 'The body of the modal goes here. Generally this would only include text, but can include HTML when needed.',
		// If true, the entire page background will dim. Otherwise, only the parent element will dim.
		dimFullPage: true,
		// Make this true if a "Do not show again" checkbox is needed.
		doNotShow : true,
		// Define each button. The name of the button will serve as its text.
		buttons:{
			'OK': {
				type: 'accept',  // Type can be 'accept', 'cancel', or unspecified, which only determines the color.
				linkedFunction: 'acceptFunction()' // The function that will run when clicked. Parameters can be passed if needed.
			},
			'Cancel': {
				type: 'cancel',
				// Cancel does not need a function, since clicking the 'accept' or 'close' buttons will close it automatically, and nothing else needs to be done when clicking cancel.
			},
			'Other': {
				linkedFunction: 'otherFunction()',
				close: true // For other buttons, they will not close the modal by default, but will if 'close' has a value of 'true'.
			}
		}   
	});*/
	constructor(input){
		var keyName = input.title.replaceAll(' ', '_').toLowerCase();
		checksavedValue(keyName);		
		async function checksavedValue(keyName){
			var hide = await loadFromDB('ModalDB', keyName, 'modals_do_not_ask');
			if(!hide){buildModal()}
		}
		function buildModal(){
			setStyle();
			document.body.classList.add('blocking');
			if(!input.parent){input.parent = document.body}
			input.parent.classList.add('contain');
			var backdrop = Object.assign(document.createElement('div'), {
				className: 'backdrop fade-in'
			});
			
			var newModal = Object.assign(document.createElement('div'), {
				className: 'modal show'
			});
			window.addEventListener('keydown', keyPress);
			addElements(setTitle(input.title), setContent(input.content), setCheckbox(input.doNotShowCheckbox), setButtons(input.buttons));
			backdrop.appendChild(newModal);
			input.parent.appendChild(backdrop);
			if(!input.distanceFromTop){
				const root = document.documentElement;
				root.style.setProperty('--distance-from-top', '50%');
				root.style.setProperty('--offset-top', '-50%');
			}
			window.addEventListener('click', modalClick);
			var buttonArray = newModal.querySelectorAll('.button');
			for(let button of buttonArray){
				if(button.className.includes('cancel') || button.className.includes('accept') || button.className.includes('close')){
					button.addEventListener('click', modalClose);
				}
			}
			function setTitle(titleValue){
				if(titleValue){
					var title = Object.assign(document.createElement('div'), {
						className: 'modalTitle',
						innerText: titleValue
					});
					return title;
				}
			}
			function setContent(contentValue){
				var content = Object.assign(document.createElement('div'), {
					className: 'modalContent '
				});
				content.style.width = input.content.length > 120 ? Math.ceil(input.content.length / (Math.sqrt(input.content.length / (5 * 1)))) + 'ch' : '30ch';
				content.innerHTML = contentValue;
				return content;
			}
			function setCheckbox(checkboxValue){
				if(checkboxValue){
					var doNotShow = Object.assign(document.createElement('div'), {
						id: 'doNotShow'
					});
					var checkbox = Object.assign(document.createElement('input'), {
						name: 'doNotShow',
						type: 'checkbox'
					});
					
					var label = Object.assign(document.createElement('label'), {
						innerText: 'Do not show again',
						htmlFor: 'doNotShow'
					});
					doNotShow.appendChild(checkbox);
					doNotShow.appendChild(label);					
					return doNotShow;
				}
			}
			function setButtons(buttonsValue){
				if(buttonsValue){
					var buttonRow = Object.assign(document.createElement('div'), {
						className: 'buttonRow'
					});
					for(let button in buttonsValue){
						var currentButton = buttonsValue[button];
						var newButton = Object.assign(document.createElement('div'), {
							className: 'button' + (currentButton.type ? ' ' + currentButton.type : '') + (currentButton.close ? ' close' : ''),
							innerText: button
						});
						if(currentButton.linkedFunction){
							var onClick = new Function(currentButton.linkedFunction);
							newButton.addEventListener('click', () => {
								onClick()
							});
						}
						buttonRow.appendChild(newButton);
					}
					return buttonRow;
				}
			}
			function addElements(title, content, checkbox, buttons){
				for(let arg of arguments){
					if(arg){
						newModal.appendChild(arg);
					}
				}
			}
			function modalClick(event){
				if(!newModal.contains(event.target)){
					modalClose();
				}
			}
			function modalClose(){
				document.body.classList.remove('blocking');
				window.removeEventListener('click', modalClick);
				window.removeEventListener('keydown', keyPress);
				var target = event.target;
				document.querySelector('.backdrop').classList.add('fade-out');
				document.querySelector('.modal').classList.add('hide');
				setTimeout(() => {
					if(target.className.includes('cancel') && (document.querySelector('#doNotShow') ? document.querySelector('#doNotShow').querySelector('input').checked : false)){
						deactivate();
					}
					document.querySelector('.backdrop').parentNode.classList.remove('contain');
					document.querySelector('.backdrop').remove();
				}, 400);
			}
			function deactivate(){
				console.log('!');
				saveToDB('ModalDB', true, keyName, 'modals_do_not_ask');
			}
			function setStyle(){
				var styles = document.querySelectorAll('link');
				var styleSet;
				for(let style of styles){
					if(style.getAttribute('href') == 'ui.css'){
						styleSet = true;
					}
				}
				if(!styleSet){
					const link = document.createElement('link');
					link.rel = 'stylesheet';
					link.type = 'text/css';
					link.href = 'ui.css'; // Path to your CSS file
					document.head.appendChild(link);
				}
			}
			function keyPress(event){
				var buttons = input.buttons ? Object.keys(input.buttons) : false;
				if(buttons){
					for(let button of buttons){
						if(input.buttons[button].type == 'accept' && event.key == 'Enter'){
							var action = new Function(input.buttons[button].linkedFunction);
							action();
							modalClose();
						}
						else if(input.buttons[button].type == 'cancel' && event.key == 'Escape'){
							if(document.querySelector('#doNotShow') ? document.querySelector('#doNotShow').querySelector('input').checked : false){
								deactivate();
							}							
							if(input.buttons[button].linkedFunction){
								var action = new Function(input.buttons[button].linkedFunction);
								action();
							}
							else{
								modalClose();
							}
						}
					}
				}
			}
		}
	}
}
