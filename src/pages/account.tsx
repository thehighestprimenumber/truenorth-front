import React, {useContext, useEffect, useState} from "react";
import {Button, Container, Grid, TextField} from "@mui/material";
import {upsertDoc} from "../helpers/firestore";
import {UserContext} from "../helpers/UserContext";
import {RecordTable} from "../components/RecordTable";
import {Record} from "../shared/Record";
import {FirebaseUserWithData, PATH as userPath} from "../shared/User";
import Typography from "@mui/material/Typography";
import {increment} from 'firebase/firestore';
import {getRecordsByUserId} from "../helpers/firestore/record";
import Toast from "../components/Toast";
import {PATH as recordPath} from "../shared/Record";
import {GridColDef} from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";

function BalanceSection(props: { user: FirebaseUserWithData | null }) {
    const [topUpAmount, setTopUpAmount] = useState('');
    const [error, setError] = useState(false);
    const handleTopUp = async () => {
        const amount = Number(topUpAmount);
        const userId = props.user?.uid;
        if (!isNaN(amount) && userId) {
            try {
                await upsertDoc(userPath, {balance: increment(amount)}, userId)
                setTopUpAmount('');
            } catch (e) {
                setError(true)
            }
        }
    };

    if (!props.user) {
        return null
    }

    return (<Grid container spacing={2} alignItems="center">
        <Grid item xs={12}>
            <Typography variant="h6">User Balance: {props.user.data?.balance}</Typography>
        </Grid>
        <Grid item xs={12}>
            <TextField
                label="Top Up Amount"
                variant="outlined"
                value={topUpAmount}
                onChange={(e) => setTopUpAmount(e.target.value)}
                type="number"
                InputLabelProps={{
                    shrink: true,
                }}
            />
        </Grid>
        <Grid item xs={12}>
            <Button variant="contained" color="primary" onClick={handleTopUp}>
                Top Up
            </Button>
        </Grid>
        {error ? <Toast severity={"error"} text={"Something went wrong"}/> : null}
    </Grid>);


}

const Account = () => {
    const [records, setRecords] = useState<Record[]>([]);

    const context = useContext(UserContext);
    const user = context ? context?.user : null;
    const userId = user?.uid;

    useEffect(() => {
        let unsubscribe
        if (userId) {
            unsubscribe = getRecordsByUserId(userId, setRecords);
        }
        return unsubscribe
    }, [user]);


    const handleDelete = (id: string) => upsertDoc(recordPath, {isActive: false}, id)

    const columns: GridColDef[] = [{field: 'operation', headerName: 'Operation', flex: 1}, {
        field: 'amount', headerName: 'Amount', flex: 1
    }, {
        field: 'userBalance', headerName: 'User Balance', flex: 1
    }, {field: 'operationResponse', headerName: 'Response', flex: 1}, {field: 'date', headerName: 'Date', flex: 1}, {
        field: 'delete', headerName: 'Delete', flex: 0.5, renderCell: (params) => (<IconButton
            onClick={() => handleDelete(params.row.id)}
            color="secondary"
            aria-label="delete"
            size="small"
        >
            <DeleteIcon/>
        </IconButton>),
    },];


    return (<Container>
        <BalanceSection user={user}/>
        <RecordTable columns={columns} records={records}/>
    </Container>);
};

export default Account
