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
            // console.log('asdfasdfasdfasdf', data);
            if (data !== undefined) setRecordList(data.records);   
        } catch (e) {
            console.log(e);
            alert('기록을 불러오는데 실패했습니다.');
        }
    }

    async function addRecord(scramble: string, record: number, penalty: '' | '+2' | 'DNF') {
        const newRecord = {record: record, scramble: scramble, penalty: penalty, timestamp: Date.now()};
        setRecordList(prevList => [...prevList, newRecord]);
        try {
            await IndexedDBClient.addRecord(sessionID, newRecord);
        } catch (e) {
            console.log(e);
            alert('기록을 추가하는데 실패했습니다.');
        }
    }

    async function deleteRecord(target: SolvedRecord) {
        setRecordList(recordList.filter((item: SolvedRecord) => item.timestamp !== target.timestamp));
        try {
            await IndexedDBClient.deleteRecord(sessionID, target);
        } catch (e) {
            console.log('기록을 삭제하는데 실패했습니다.')
        }
    }

    async function changePenalty(target: SolvedRecord, penalty: '' | '+2' | 'DNF') {
        setRecordList(recordList.map((item) => {
            if (item.timestamp === target.timestamp) {
                if (item.penalty !== penalty) return {...item, penalty: penalty};
                else return {...item, penalty: ''};
            } else return item;
        }));
        try {
            await IndexedDBClient.changePenalty(sessionID, target, penalty);
        } catch (e) {
            console.log(e);
            alert('페널티를 수정하는데 실패했습니다.');
        }
    }

    useEffect(() => {
        getSessionRecords();
    }, [sessionID]);

    return {sessionID, recordList, changeSession: setSessionID, getSessionRecords, addRecord, deleteRecord, changePenalty};
};