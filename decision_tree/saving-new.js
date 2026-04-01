const dbName = "ConfigDB";
const storeName = "user_settings";

async function initDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName, 1);
    request.onupgradeneeded = (e) => e.target.result.createObjectStore(storeName);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function saveToDB(config) {
  const db = await initDB();
  const tx = db.transaction(storeName, "readwrite");
  tx.objectStore(storeName).put(config, "current_config");
}

async function loadFromDB() {
  const db = await initDB();
  return new Promise((resolve) => {
    const req = db.transaction(storeName).objectStore(storeName).get("current_config");
    req.onsuccess = () => resolve(req.result);
  });
}

// --- File System Access (config.json) ---
async function exportConfig() {
  const config = await loadFromDB();
  const handle = await window.showSaveFilePicker({
    suggestedName: 'config.json',
    types: [{ description: 'JSON', accept: {'application/json': ['.json']} }]
  });
  const writable = await handle.createWritable();
  await writable.write(JSON.stringify(config, null, 2));
  await writable.close();
}

async function importConfig() {
  const [handle] = await window.showOpenFilePicker();
  const file = await handle.getFile();
  const config = JSON.parse(await file.text());
  await saveToDB(config); // Sync to DB after import
  return config;
}
