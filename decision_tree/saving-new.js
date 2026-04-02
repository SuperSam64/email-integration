/* when nothing is in indexedDB, store a value in indexedDB that no data has been loaded. Offer to load config. Also offer not to ask again. If user opts out, do not show again. */
var configData;
const dbName = "ConfigDB";
const storeName = "user_settings";




var saveButton = document.querySelector('#saveButton');
var backupButton = document.querySelector('#backupButton');
var restoreButton = document.querySelector('#restoreButton');

saveButton.addEventListener('click', function() {
  saveToDB(getData());
});
backupButton.addEventListener('click', function() {
  exportConfig();
});
restoreButton.addEventListener('click', function() {
  importConfig();
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


setValues();
async function setValues(){
  var imported = await loadFromDB()
  if(imported){
    var importedJSON = JSON.parse(imported);
    var firstVal = document.querySelector('#first');
    var secondVal = document.querySelector('#second');
    var thirdVal = document.querySelector('#third');
    firstVal.value = importedJSON.first;
    secondVal.value = importedJSON.second.secondA;
    thirdVal.value = importedJSON.second.secondB;
    configData = imported;
    console.log('success');
  }
  else{
    console.log('failure');
  }
}






async function initDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName, 1);
    request.onupgradeneeded = (e) => e.target.result.createObjectStore(storeName);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function saveToDB(config) {
  console.log('saving...');
  const db = await initDB();
  const tx = db.transaction(storeName, "readwrite");
  tx.objectStore(storeName).put(config, "current_config");
}

async function loadFromDB() {
  console.log('loading...');
  const db = await initDB();
  return new Promise((resolve) => {
    const req = db.transaction(storeName).objectStore(storeName).get("current_config");
    req.onsuccess = () => resolve(req.result);
  });
}


async function exportConfig() {
  console.log('export initiated');
  const config = await loadFromDB();
  const handle = await window.showSaveFilePicker({
    suggestedName: 'config.json',
    types: [{ description: 'JSON', accept: {'application/json': ['.json']} }]
  });
  const writable = await handle.createWritable();
  await writable.write(JSON.stringify(config, null, 2));
  await writable.close();
  saveToDB(getData());
}

async function importConfig() {
  const [handle] = await window.showOpenFilePicker();
  const file = await handle.getFile();
  const config = JSON.parse(await file.text());
  await saveToDB(config); // Sync to DB after import
  return config;
}

/*
1) No safe file found. This can occur after browsing data has been cleared. Please restore your settings from a backup, or configure your settings again. Note: the default name and location of your backups will be Documents/decision_tree/config.json
2) Configuration complete. Would you like to backup this configuration?
3) Configuration restored from backup.*/

