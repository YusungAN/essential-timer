import { useState, useEffect } from "react";
import IndexedDBClient from "../util/clientDB";
import { SolvedRecord } from "../util/record.util";


export function useRecords() {

    const [sessionID, setSessionID] = useState('session1');
    const [recordList, setRecordList] = useState<SolvedRecord[]>([]);

    async function getSessionRecords() {
        // will be added after login logic
        
        try {
            const data = await IndexedDBClient.getSessionRecords(sessionID);
            console.log('asdfasdfasdfasdf', data);
            setRecordList(data.records);   
        } catch (e) {
            console.log(e);
        }
    }

    async function addRecord(scramble: string, record: number, penalty: '' | '+2' | 'DNF') {
        const newRecord = {record: record, scramble: scramble, penalty: penalty, timestamp: Date.now()};
        setRecordList(prevList => [...prevList, newRecord]);
        await IndexedDBClient.addRecord(sessionID, newRecord);
    }

    async function deleteRecord(target: SolvedRecord) {
        setRecordList(recordList.filter((item: SolvedRecord) => item.timestamp !== target.timestamp));
        await IndexedDBClient.deleteRecord(sessionID, target);
    }

    async function changePenalty(target: SolvedRecord, penalty: '' | '+2' | 'DNF') {
        setRecordList(recordList.map((item) => {
            if (item.timestamp === target.timestamp) {
                if (item.penalty !== penalty) return {...item, penalty: penalty};
                else return {...item, penalty: ''};
            } else return item;
        }));
        await IndexedDBClient.changePenalty(sessionID, target, penalty);
    }

    useEffect(() => {
        getSessionRecords();
    }, [sessionID]);

    useEffect(() => {
        console.log('list changed', recordList);
    }, [recordList]);

    return {sessionID, recordList, changeSession: setSessionID, getSessionRecords, addRecord, deleteRecord, changePenalty};
};