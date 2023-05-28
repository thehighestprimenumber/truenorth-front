import React, {useState} from 'react';
import {DataGrid} from '@mui/x-data-grid';
import {TextField} from '@mui/material';


const CustomToolbar = ({filterText, setFilterText}) => {
    return (
        <TextField
            variant="standard"
            placeholder="Search..."
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
        />

    );
};


export const RecordTable = (props) => {
    const {records, columns} = props;

    const [filterText, setFilterText] = useState('');
    const [pageSize, setPageSize] = useState(5);

    const filteredRecords = records.filter((record) => Object.values(record).some((value: any) => value.toString().toLowerCase().includes(filterText.toLowerCase())));

    const onChangeFilterText = (value) => {
        setFilterText(value)
    };
    return (<div style={{height: 400, width: '100%'}}>
        <CustomToolbar filterText={filterText} setFilterText={onChangeFilterText}/>
        <DataGrid
            rows={filteredRecords}
            columns={columns}
            // @ts-ignore
            pageSize={pageSize}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        />
    </div>);
};



