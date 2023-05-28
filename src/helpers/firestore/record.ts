import {collection, DocumentData, onSnapshot, query, QuerySnapshot, where} from "firebase/firestore";
import {PATH as recordPath, RecordReadDTO, RecordTableDataItem} from "../../shared/Record";
import {db} from "../../firebaseSettings";
import {getCollection} from "./index";
import {Operation, PATH as operationPath} from "../../shared/Operation";

export function transform(querySnapshot: QuerySnapshot<DocumentData>, operations) {
    return <unknown>querySnapshot.docs.map((doc) => {
        const {operationId, ...data} = doc.data()
        return toJs({
            id: doc.id,
            ...data,
            operation: operations[operationId]
        } as RecordReadDTO) as RecordTableDataItem;
    })

}

export const getRecordsByUserId = async (uid: string, setRecords) => {
    const operations = (await getCollection(operationPath)) as Operation[]
    const operationNameById = {}
    operations.forEach(o => operationNameById[o.id] = o.type);
    const ref = collection(db, recordPath);
    const q = query(ref, where('userId', '==', uid), where('isActive', '==', true));
    return onSnapshot(q, querySnapshot => {
        setRecords(transform(querySnapshot, operationNameById))
    })
};
const toJs = (record: RecordReadDTO) => ({
    ...record, date: record.date?.toDate()
} as RecordTableDataItem);