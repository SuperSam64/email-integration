buildPage(data);
function buildPage(input){
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
