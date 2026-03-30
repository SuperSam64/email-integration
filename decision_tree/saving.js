var readButton = document.querySelector('#readButton');
var saveButton = document.querySelector('#saveButton');
var backupButton = document.querySelector('#backupButton');
var restoreButton = document.querySelector('#restoreButton');


var data = getData();
readButton.addEventListener('click', function() {
  read();
});
saveButton.addEventListener('click', function() {
  save(data);
});
backupButton.addEventListener('click', function() {
  backup();
});
restoreButton.addEventListener('click', function() {
  restore();
});

function getData(){
  return {
    first: document.querySelector('#first'),
    second: {
      secondA: document.querySelector('#second'),
      secondB: document.querySelector('#third')
    }
  }
}

async function save(content){
  try{
    const handle = await window.showSaveFilePicker({
      suggestedName: 'config.json',
      types: [{
        description: 'JSON Files',
        accept: {'application/json': ['.json']}
      }]
    });
    const writable = await handle.createWritable();
    await writable.write(content);
    await writable.close();
    console.log('saved');
  }
  catch(err){console.log('failed')}
}

function read(){
  console.log('reading file');
}

function backup(){

}

function restore(){

}
