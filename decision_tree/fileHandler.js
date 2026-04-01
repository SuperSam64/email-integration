import { getAllConfig } from './indexedDB.js';
import { setConfig } from './indexedDB.js';

export async function saveConfigToFile() {
  if (!('showSaveFilePicker' in window)) {
    alert('File System Access API not supported in this browser.');
    return;
  }

  try {
    // 1. Get all config data from IndexedDB
    const configData = await getAllConfig();
    const configJson = JSON.stringify(configData, null, 2);

    // 2. Open file picker
    const handle = await window.showSaveFilePicker({
      suggestedName: 'config.json',
      types: [{
        description: 'JSON Configuration File',
        accept: { 'application/json': ['.json'] },
      }],
    });

    // 3. Create a writable stream and write the data
    const writable = await handle.createWritable();
    await writable.write(new Blob([configJson], { type: 'application/json' }));
    await writable.close();
    console.log('Configuration saved to config.json');

    // Optional: Store the file handle in IndexedDB for easy re-saving
    await setConfig('configFileHandle', handle);

  } catch (error) {
    console.error('Error saving file:', error);
  }
}

export async function loadConfigFromFile() {
  if (!('showOpenFilePicker' in window)) {
    alert('File System Access API not supported in this browser.');
    return;
  }

  try {
    // 1. Open file picker
    const [handle] = await window.showOpenFilePicker({
      types: [{
        description: 'JSON Configuration File',
        accept: { 'application/json': ['.json'] },
      }],
    });

    // 2. Get file content
    const file = await handle.getFile();
    const content = await file.text();
    const configData = JSON.parse(content);

    // 3. Store the data in IndexedDB
    for (const key in configData) {
      await setConfig(key, configData[key]);
    }

    console.log('Configuration loaded from config.json');

    // Optional: Store the file handle for easy re-saving
    await setConfig('configFileHandle', handle);

  } catch (error) {
    console.error('Error loading file:', error);
  }
}
