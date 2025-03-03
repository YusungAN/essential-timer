import { SolvedRecord } from "./record.util";

class IndexedDBClient { // Singleton for only one db instance
    private static instance: IDBDatabase;

    public static async getInstance() { // may need to be modified..,
        return new Promise<IDBDatabase>((resolve, reject) => {
            if (!IndexedDBClient.instance) {
                const request = indexedDB.open('essential-timer-db');
      
                request.onupgradeneeded = (e: IDBVersionChangeEvent) => {
                    const db = (e.target as IDBOpenDBRequest).result;
                    db.createObjectStore('record-session', { keyPath: 'session_id' });
                };
            
                request.onsuccess = () => {
                    IndexedDBClient.instance = request.result;
                    resolve(IndexedDBClient.instance);
                };
            
                request.onerror = () => {
                    reject('indexedDB load fail');
                };
            }
    
            resolve(IndexedDBClient.instance);
        });
    }

    public static async getSessionRecords(sessionID: string) {
        return new Promise<{session_id: string, records: SolvedRecord[]}>((resolve, reject) => {
            if (!IndexedDBClient.instance) {
                const request = indexedDB.open('essential-timer-db');
          
                request.onupgradeneeded = (e: IDBVersionChangeEvent) => {
                    const db = (e.target as IDBOpenDBRequest).result;
                    db.createObjectStore('record-session', { keyPath: 'session_id' });
                };
            
                request.onsuccess = () => {
                    IndexedDBClient.instance = request.result;
                    const tx = IndexedDBClient.instance.transaction('record-session', 'readonly');
                    const store = tx.objectStore('record-session');
                    const getReq = store.get(sessionID);

                    getReq.onsuccess = () => {
                        resolve(getReq.result);
                    }
    
                    getReq.onerror = () => {
                        resolve({session_id: '0', records: []});
                    }
                };
            
                request.onerror = () => {
                    reject('indexedDB load fail');
                };
            } else {
                const tx = IndexedDBClient.instance.transaction('record-session', 'readonly');
                const store = tx.objectStore('record-session');
                const getReq = store.get(sessionID);


                getReq.onsuccess = () => {
                    resolve(getReq.result);
                }

                getReq.onerror = () => {
                    resolve({session_id: '0', records: []});
                }
            }
        });
    }

    public static async addRecord(sessionID: string, record: SolvedRecord) {
        const idxDB = await IndexedDBClient.getInstance();

        return new Promise<void>((resolve, reject) => {
            const tx = idxDB.transaction('record-session', 'readwrite');
            const store = tx.objectStore('record-session');
            const getReq = store.get(sessionID);

            getReq.onsuccess = () => {
                let data = getReq.result || {session_id: sessionID, records: []};
                data.records.push(record);
                store.put(data);
                resolve();
            }

            getReq.onerror = () => {
                reject();
            }
            
        });
    }

    public static async deleteRecord(sessionID: string, target: SolvedRecord) {
        const idxDB = await IndexedDBClient.getInstance();

        return new Promise<void>((resolve, reject) => {
            const tx = idxDB.transaction('record-session', 'readwrite');
            const store = tx.objectStore('record-session');
            const getReq = store.get(sessionID);

            getReq.onsuccess = () => {
                let data = getReq.result || {session_id: sessionID, records: []};

                if (data.records.length > 0) {
                    // const deleteIdx: number = data.records.findIndex((item: SolvedRecord) => item.timestamp === target.timestamp);
                    // if (deleteIdx > -1) data.records.splice(deleteIdx, 1);
                    data.records = data.records.filter((item: SolvedRecord) => item.timestamp !== target.timestamp);
                    store.put(data);
                }
                resolve();
            }

            getReq.onerror = () => {
                reject();
            }
        });
    }

    public static async changePenalty(sessionID: string, target: SolvedRecord, penalty: '' | '+2' | 'DNF') {
        const idxDB = await IndexedDBClient.getInstance();

        return new Promise<void>((resolve, reject) => {
            const tx = idxDB.transaction('record-session', 'readwrite');
            const store = tx.objectStore('record-session');
            const getReq = store.get(sessionID);

            getReq.onsuccess = () => {
                let data = getReq.result || {session_id: sessionID, records: []};

                if (data.records.length > 0) {
                    // const deleteIdx: number = data.records.findIndex((item: SolvedRecord) => item.timestamp === target.timestamp);
                    // if (deleteIdx > -1) data.records.splice(deleteIdx, 1);
                    data.records = data.records.map((item: SolvedRecord) => {
                        if (item.timestamp === target.timestamp) {
                            if (item.penalty !== penalty) return {...item, penalty: penalty};
                            else return {...item, penalty: ''};
                        } else return item;
                    });
                    store.put(data);
                }
                resolve();
            }

            getReq.onerror = () => {
                reject();
            }
        });
    }
}

export default IndexedDBClient;