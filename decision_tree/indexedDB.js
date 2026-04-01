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
