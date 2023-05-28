import {httpsCallable} from 'firebase/functions';
import {functions} from '../../firebaseSettings';
import {getUser} from '../firestore/user';
import {OperationRequest} from "../../shared/Operation";


async function callFunction(functionName: string, data?: object): Promise<{ data: null; error: string } | { data: unknown; error: null }> {
    const call = httpsCallable(functions, functionName);
    try {
        const result = await call(data);
        return {data: result.data, error:null};
    } catch (e: any) {
        return {data: null, error: e.message}
    }
}

export async function createUserInDbIfNotExists(user: { uid: string; email: string | null } | null) {
    if (!user) {
        console.error('No user received');
        return;
    }

    const userInDb = await getUser(user.uid);
    if (userInDb) {
        return;
    }

    const email = user.email;
    return callFunction('authentication-createUserInDB', {email});

}


export async function performOperation(operationRequest: OperationRequest) {
    const functionName = 'operations-performOperation';
    return callFunction(functionName, operationRequest);
}
