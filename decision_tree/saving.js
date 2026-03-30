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

async function save(){
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
    await writable.cloose();
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
