var readButton = document.querySelector('#readButton');
var saveButton = document.querySelector('#saveButton');
var backupButton = document.querySelector('#backupButton');
var restoreButton = document.querySelector('#restoreButton');
var displayButton = document.querySelector('#displayButton');
var loadedValues;


readButton.addEventListener('click', function() {
  read();
});
saveButton.addEventListener('click', function() {
  save(getData());
});
backupButton.addEventListener('click', function() {
  backup();
});
restoreButton.addEventListener('click', function() {
  restore();
});
displayButton.addEventListener('click', function() {
  process(loadedValues);
});
function getData(){
  return JSON.stringify({
    first: document.querySelector('#first').value,
    second: {
      secondA: document.querySelector('#second').value,
      secondB: document.querySelector('#third').value
    }
  });
}

async function save(content){
  const handle = await window.showSaveFilePicker({
    suggestedName: 'config.json',
    types: [{ description: 'JSON', accept: { 'application/json': ['.json'] }}]
  });
  const writable = await handle.createWritable();
  await writable.write(content);
  await writable.close();
  console.log('saved');
}

async function read(){
  try{
    const [fileHandle] = await window.showOpenFilePicker({
      types: [
        {
          description: 'JSON Files',
          accept: {
            'application/json': ['.json']
          }
        }
      ],
      excludeAcceptAllOption: true,
      multiple: false
    });
    const file = await fileHandle.getFile();
    const contents = await file.text();
    loadedValues = JSON.parse(contents);
    console.log(loadedValues);
  }
  catch(err){
    console.error('error');
  }
}

function backup(){

}

function process(input){
  var firstValue = input.first;
  var secondValue = input.second.secondA;
  var thirdValue = input.second.secondB;
  var firstField = document.querySelector('#initial-first');
  var secondField = document.querySelector('#initial-second');
  var thirdField = document.querySelector('#initial-third');
  firstField.innerText = firstValue;
  secondField.innerText = secondValue;
  thirdField.innerText = thirdValue;
}

function restore(){

}


