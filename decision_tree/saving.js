var readButton = document.querySelector('#readButton');
var saveButton = document.querySelector('#saveButton');
var backupButton = document.querySelector('#backupButton');
var restoreButton = document.querySelector('#restoreButton');

readButton.addEventListener('click', function() {
  read();
});
saveButton.addEventListener('click', function() {
  save();
});
backupButton.addEventListener('click', function() {
  backup();
});
restoreButton.addEventListener('click', function() {
  restore();
});

function save(){

}

function read(){
  console.log('reading file');
}

function backup(){

}

function restore(){

}
