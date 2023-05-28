import {doc, onSnapshot} from 'firebase/firestore';

import {User} from '../../shared/User';
import {getDocument} from './index';
import {db} from "../../firebaseSettings";


export const USERS = 'user';
const USER = (userId: string) => `${USERS}/${userId}`;

export const getUser = (userId: string) => <Promise<User>>getDocument(USER(userId));

export const getUserData = (userId: string, setUser) => {
    const ref = doc(db, USER(userId));
    return onSnapshot(ref, (doc) => {
        const data = doc.data();
        setUser(user => ({...user, data}))
    });
}