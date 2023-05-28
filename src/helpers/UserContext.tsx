import {createContext, Dispatch, SetStateAction} from 'react';
import {FirebaseUserWithData} from "../shared/User";

export const UserContext = createContext<IUserContext | null>(null);
UserContext.displayName = 'UserContext';

export interface IUserContext {
    user: FirebaseUserWithData;
    // eslint-disable-next-line no-unused-vars
    setUser: Dispatch<SetStateAction<FirebaseUserWithData | undefined>>;
}
