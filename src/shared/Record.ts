import {FieldValue, Timestamp} from 'firebase/firestore'


export const PATH = 'record'

export interface Record {
    userId: string,
    operationId: string,
    amount: number
    userBalance: number,
    operationResponse: string | number,
    date: Date,
    isActive: boolean
}


export type RecordDTO = Omit<Record, "date"> & {
    date: FieldValue
}

export type RecordTableDataItem = Omit<Record, "userId" | "operationId"> & {
    operation: string
}

export type RecordReadDTO = Omit<RecordTableDataItem, "date"> & {
    id?: string, date: Timestamp
}