var readButton = document.querySelector('#readButton');
var saveButton = document.querySelector('#saveButton');
var backupButton = document.querySelector('#backupButton');
var restoreButton = document.querySelector('#restoreButton');



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
  console.log('content', content);
  try{
    
    const handle = await window.shoSaveFilePicker({
      suggestedName:  'config.json',
      types: [{
        description: 'JSON File',
        accept: {
          'application/json': ['.json']
        }
      }]
    });
    const writable = await handle.createWritable();
    await writable.write(content);
    await writable.close();
    console.log('saved');
  }
  catch(err){console.error('failed')}
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
    process(JSON.parse(contents));
  }
  catch(err){
    console.error('error');
  }
}

function backup(){

}

function process(input){
  console.log(input);
}

function restore(){

}
