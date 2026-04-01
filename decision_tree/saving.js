import { openDB } from 'https://unpkg.com';

const DB_NAME = 'UserConfigDB';
const STORE_NAME = 'configStore';

async function getDB() {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      db.createObjectStore(STORE_NAME);
    },
  });
}

export async function getConfig(key) {
  const db = await getDB();
  return db.get(STORE_NAME, key);
}

export async function setConfig(key, val) {
  const db = await getDB();
  return db.put(STORE_NAME, val, key);
}

export async function getAllConfig() {
    const db = await getDB();
    const allKeys = await db.getAllKeys(STORE_NAME);
    const config = {};
    for (const key of allKeys) {
        config[key] = await db.get(STORE_NAME, key);
    }
    return config;
}



var readButton = document.querySelector('#readButton');
var saveButton = document.querySelector('#saveButton');
var backupButton = document.querySelector('#backupButton');
var restoreButton = document.querySelector('#restoreButton');

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
    startIn: 'documents',
    types: [{ description: 'JSON', accept: { 'application/json': ['.json'] }}]
  });
  const writable = await handle.createWritable();
  await writable.write(content);
  await writable.close();
  console.log('saved');
  await storeHandleInDB(handle);
}
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
    process(loadedValues);
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

async function storeHandleInDB(fileHandle) {
  const db = await openDB(); // Assume a standard IDB open request
  const tx = db.transaction('fileHandles', 'readwrite');
  tx.store.put({ id: 'mySavedFile', handle: fileHandle });
  await tx.done;
}
