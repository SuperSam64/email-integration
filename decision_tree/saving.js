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
  saveToDB("ConfigDB", getData(), "current_config", "user_settings");
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
  var imported = await loadFromDB("ConfigDB", "current_config", "user_settings");
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
async function initDB(dbName, storeName) {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName, 1);
    request.onupgradeneeded = (e) => e.target.result.createObjectStore(storeName);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}
async function saveToDB(dbName, savedValue, keyName, storeName) {
  console.log('saving...');
  const db = await initDB(dbName, storeName);
  const tx = db.transaction(storeName, "readwrite");
  tx.objectStore(storeName).put(savedValue, keyName);
}
async function loadFromDB(dbName, keyName, storeName) {
  console.log('loading...');
  const db = await initDB(dbName, storeName);
  return new Promise((resolve) => {
    const req = db.transaction(storeName).objectStore(storeName).get(keyName);
    req.onsuccess = () => resolve(req.result);
  });
}
async function exportConfig() {
  await saveToDB("ConfigDB", getData(), "current_config", "user_settings");
  console.log('export initiated');
  const config = await loadFromDB("ConfigDB", "current_config", "user_settings");
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
  await saveToDB("ConfigDB", config, "current_config", "user_settings"); // Sync to DB after import
  setValues();
  return config;
}
function noConfigFound(){
		new modal({
		parent: document.querySelector('#leftSection'),
		title: 'No saved configuration', 
		content: 'No saved configuration data found. This can be caused by clearing cookies. Please restore your configuration from a backup, or configure your settings manually. Integration with third-party resources, such as Monday and Missive, will be unavailable until this has been done.',
		doNotShowCheckbox: true,
		buttons:{
			'Configure': {
				type: 'accept',
				linkedFunction: 'openConfig()'
			},
			'Skip': {
				type: 'cancel',
			}
		}
	});
}
