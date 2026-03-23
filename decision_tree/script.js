
var config = Object.fromEntries(new URLSearchParams(window.location.search));
console.log(config);
var importedData;
buildPage(data);
function buildPage(input){	
  window.addEventListener('load', importClipboard);
    async function importClipboard(){
    window.removeEventListener('load', importClipboard);
    var containsPlaintext = true;
    var clipboardText;
    var imported = await navigator.clipboard.readText();
    var copiedObject = {};
    if(imported.includes('{{ %end_clipboard% }}')){
  	  clipboardText = imported.split('{{ %end_clipboard% }}')[0];
	  imported = imported.split('{{ %end_clipboard% }}')[1];
    }
    var clipboardContents = await navigator.clipboard.read();
    for(const item of clipboardContents){
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
    if(config.pageType ? config.pageType != '' : false){
	  var clipboard = new ClipboardItem(copiedObject);
      await navigator.clipboard.write([clipboard]);	
      importedData = document.createElement('div');
      importedData.innerHTML = imported;
      processImportedData(importedData);
    }
  }
  function processImportedData(input){
    console.log(input);
  }	
  var output = input;
  var elementArray = [];
  setTitle(output);
  recursive(output);
  function setTitle(input, parent){
    var properties = Object.keys(input);
    for(property in properties){
      var currentProperty = input[properties[property]];
      if(typeof currentProperty == 'object'){
        currentProperty.header = parent;
        setTitle(currentProperty, properties[property]);
      }
    }
  }
  function recursive(input){
    input.final = !containsObjects(input);
    var properties = Object.keys(input);
    var subproperties = [];
    for(property in properties){
      var currentProperty = input[properties[property]];
      if(typeof currentProperty == 'object'){
        currentProperty.name = properties[property];
        subproperties.push(currentProperty);
        elementArray.push(currentProperty);				
      }
    }
    for(subproperty in subproperties){
      var currentObject = subproperties[subproperty];
      currentObject.address = (input.address ? input.address + '-' : '') + (Number(subproperty) + 1);
      recursive(currentObject);
    }	
  }
  function buildElements(input){
    var backdrop = Object.assign(document.createElement('div'), {
      className: 'backdrop',
    });
    var modalOuter = Object.assign(document.createElement('div'), {
      className: 'modal-outer',
    });
    var modalInner = Object.assign(document.createElement('div'), {
      className: 'modal-inner',
    });
    backdrop.appendChild(modalOuter);
    modalOuter.appendChild(modalInner);
    for(element in input){
      var container = buildContainer(input[element], modalOuter);
      if(container){
        var parentElement = modalInner.querySelector('#menu-' + input[element].address.slice(0, input[element].address.lastIndexOf('-')));
        if(parentElement){
          parentElement.parentNode.appendChild(container);
          var menuItem = Object.assign(document.createElement('div'), {
            className: 'menu-item' + (input[element].final ? ' final' : ''),
            id: 'option-' + input[element].address
          });
        }
        else{
          var menuOuter = Object.assign(document.createElement('div'), {
            className:'menu-outer right'
          });
          var menuItem = Object.assign(document.createElement('div'), {
            className: 'menu-item' + (input[element].final ? ' final' : ''),
            id: 'option-' + input[element].address
          });
          menuOuter.appendChild(container);
          modalInner.appendChild(menuOuter);
          container.parentNode.prepend(Object.assign(document.createElement('h2'), {
            className: 'menu-title',
            innerText: input[element].header
          }));
          container.parentNode.prepend(Object.assign(document.createElement('div'), {
            className: 'back-button',
            innerText: 'Back'
          }));
        }
        menuItem.appendChild(Object.assign(document.createElement('div'), {
          className: 'menu-item-title',
          innerText: input[element].title
        }));
        if(input[element].info){
          menuItem.appendChild(Object.assign(document.createElement('div'), {
            className: 'menu-item-details',
            innerHTML: input[element].info
          }));
        }
        container.appendChild(menuItem);
      }
    }
    return(backdrop);
  }
  function buildContainer(input, parent){
    if(input.address == 1){return}
    var id = 'menu-' + input.address.slice(0, input.address.lastIndexOf('-'));
    var container = parent.querySelector('.menu-outer div.menu-inner#' + id);
    if(container){
      return container;
    }
    else{
      var newContainer = Object.assign(document.createElement('div'), {
        className: 'menu-inner',
        id: id
      });
      parent.appendChild(newContainer);
      return newContainer;
    }
  }
  function containsObjects(input){
    var properties = Object.keys(input);
    for(property in properties){
      if(typeof input[properties[property]] == 'object'){
        return true;
      }
    }
    return false;
  }
  var selector = buildElements(elementArray);
  var firstMenu = selector.querySelector('.menu-outer.right');
  firstMenu.classList.remove('right');
  firstMenu.classList.add('active');
  document.body.querySelector('script').before(selector);
  return selector;
}
var activeMenu = 1;
const modalOuter = document.querySelector('.modal-outer');
var menuItems = document.querySelectorAll('.menu-item');
var backButtons = document.querySelectorAll('.back-button');
initialize();
function initialize(){
  modalOuter.style.height = document.querySelector('.menu-outer').scrollHeight + 'px';
  for(i = 0; i < menuItems.length; i ++){
    if(!menuItems[i].className.includes('final')){
      menuItems[i].addEventListener('click', (event) => {
        var clickedOption = event.currentTarget.id.replace('option-', '');
        var lastMenu = getMenu(activeMenu, clickedOption);
        move(lastMenu, 'left');
        move(getMenu(activeMenu), 'left');
        modalOuter.style.height = getMenu(activeMenu).scrollHeight + 'px';
		appendURL();
      });
    }
  }
  for(i = 0; i < backButtons.length; i ++){
    backButtons[i].addEventListener('click', (event) => {
      if(activeMenu != '1'){
        var lastMenu = getMenu(activeMenu, 'back');
        move(lastMenu, 'right');
        move(getMenu(activeMenu), 'right');
      }
      modalOuter.style.height = getMenu(activeMenu).scrollHeight + 'px';
	  appendURL();
    });
  }
}
function getMenu(menu, option){
  if(option){
    if(option == 'back'){
      var menuNumber = menu.toString().split('-');
      menuNumber.pop();
      activeMenu = menuNumber.join('-');
    }
    else{
      activeMenu = ([menu, option.toString().split('-')[option.toString().split('-').length - 1]]).join('-');
    }
  }
  return document.querySelector( '#menu-' + menu.toString()).parentNode;
}
function move(element, direction){
  var position = element.className.includes('left') ? 'left' : (element.className.includes('active') ? 'active' : 'right');
  var positions = ['left', 'active', 'right'];
  var offset = direction == 'left' ? -1 : 1;
  var target = positions[positions.indexOf(position) + offset];
  element.classList.remove(position);
  element.classList.add(target);		
}
function appendURL(){
	var page_id = document.querySelector('.menu-outer.active').querySelector('.menu-inner').id.replace('menu-', '').replaceAll('-', '.');
	history.pushState({}, '' , 'https://supersam64.github.io/email-integration/decision_tree/index.html?page=' + page_id);
}
