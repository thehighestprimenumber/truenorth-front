import {User as FirebaseUser} from 'firebase/auth';

export const PATH = 'user'
export enum UserStatus {
    ACTIVE = 'active',
    INACTIVE = 'inactive'
}

export interface User {

    email: string;
    uid: string;
    status: UserStatus;
    balance: number;
}

export type UserChange = Partial<User>

export interface FirebaseUserWithData extends FirebaseUser {
    data?: User;
}