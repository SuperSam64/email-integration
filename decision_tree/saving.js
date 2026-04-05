/* when nothing is in indexedDB, store a value in indexedDB that no data has been loaded. Offer to load config. Also offer not to ask again. If user opts out, do not show again.
check config data once a day
*/
var configData;
const dbName = "ConfigDB";
const storeName = "user_settings";
var saveButton = document.querySelector('#saveButton');
var backupButton = document.querySelector('#backupButton');
var restoreButton = document.querySelector('#restoreButton');
setValues();
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
    document.querySelector('#messageSection').innerText = 'Stored settings are in use';
  }
  else{
    noSaveData();
    document.querySelector('#messageSection').innerHTML = '<span>Settings not found. This can occur after clearing cookies. Restore from backup?<span>&nbsp;&nbsp;<span style="color:blue;text-decoration:underline" onclick="javascript:(document.querySelector(`#restoreButton`).click())">Restore</span>';
  }
}
function noSaveData(){
  document.querySelector('#messageSection').innerHTML = '<span>Your settings have not been backed up. Would you like to back them up now?<span>&nbsp;&nbsp;<span style="color:blue;text-decoration:underline" onclick="javascript:(document.querySelector(`#backupButton`).click())">Back up</span>';;
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
  await saveToDB(getData());
  console.log('export initiated');
  const config = await loadFromDB();
  const handle = await window.showSaveFilePicker({
    suggestedName: 'config.json',
    types: [{ description: 'JSON', accept: {'application/json': ['.json']} }]
  });
  const writable = await handle.createWritable();
  await writable.write(JSON.stringify(config));
  await writable.close();
}
async function importConfig() {
  const [handle] = await window.showOpenFilePicker();
  const file = await handle.getFile();
  const config = JSON.parse(await file.text());
  await saveToDB(config); // Sync to DB after import
  setValues();
  return config;
}
/*
1) No save file found. This can occur after browsing data has been cleared. Please restore your settings from a backup, or configure your settings again. Note: the default name and location of your backups will be Documents/decision_tree/config.json
2) Configuration complete. Would you like to backup this configuration?
3) Configuration restored from backup.*/

