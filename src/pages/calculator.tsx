import React, {useEffect, useState} from "react";
import {Button, CircularProgress, Container, Grid, TextField} from "@mui/material";
import {performOperation} from "../helpers/functions";
import {getCollection} from "../helpers/firestore";
import {Operation, OperationRequest} from "../shared/Operation"


const Calculator = () => {
    const [operand1, setOperand1] = useState('');
    const [operand2, setOperand2] = useState('');
    const [result, setResult] = useState<string>();
    const [operations, setOperations] = useState<Operation[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetch() {
            const ops = (await getCollection('operation')) as Operation[]
            setOperations(ops)
            setLoading(false)
        }

        fetch()
    }, []);


    const handleInputChange1 = (event) => {
        setOperand1(event.target.value);
    };

    const handleInputChange2 = (event) => {
        setOperand2(event.target.value);
    };


    const handleOperation = async (operation) => {
        setLoading(true)
        const operationRequest: OperationRequest = {operationId: operation.id};
        if (operand1.length) operationRequest.operand1 = Number(operand1);
        if (operand2.length) operationRequest.operand2 = Number(operand2);
        const {error, data} = await performOperation(operationRequest);
        setResult(error ?? (data as string))
        setLoading(false)
    };


    return (<Container style={{margin: 10}}>
        <Grid container spacing={2} gap={2}>
            <Grid item xs={6}>
                <TextField
                    label="Input 1"
                    variant="outlined"
                    value={operand1}
                    type="number"
                    onChange={handleInputChange1}
                    fullWidth
                />
            </Grid>
            <Grid item xs={6}>
                <TextField
                    label="Input 2"
                    variant="outlined"
                    type="number"
                    value={operand2}
                    onChange={handleInputChange2}
                    fullWidth
                />
            </Grid>
            <Grid container gap={2} item xs={12}>
                {operations.map(o => <Button key={o.type} variant="contained" color="primary"
                                             onClick={() => handleOperation(o)} disabled={loading}>
                    {o.type}
                </Button>)}

            </Grid>
            {loading && <CircularProgress/>}
            {!loading && result && (<Grid item xs={12}>
                <TextField
                    label="Result"
                    variant="outlined"
                    value={result}
                    fullWidth
                    InputProps={{
                        readOnly: true,
                    }}
                />
            </Grid>)}
        </Grid>
    </Container>);
};

export default Calculator
