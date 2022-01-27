import React, { useState, useEffect } from 'react'
import StatusUpdate from './ScheduleBooking/StatusUpdate';
import PageHeader from "../../controls/PageHeader";
import PeopleOutlineTwoToneIcon from '@material-ui/icons/PeopleOutlineTwoTone';
import { Paper, makeStyles, TableBody, TableRow, TableCell, Toolbar, InputAdornment } from '@material-ui/core';
import useTable from "../../controls/useTable";

import Controls from "../../controls/Controls";
import { Search } from "@material-ui/icons";
import {CSVLink} from "react-csv";
import Popup from "../../controls/Popup";
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import jsPDF from 'jspdf';
import Button from '@material-ui/core/Button';
import ExportPdfComponent from '../../controls/ExportPdfComponent';
import axios from "axios";
axios.defaults.withCredentials=true


const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3)
    },
    searchInput: {
        width: '75%'
    }
}))




const headCells = [
    { id: 'FirstName', label: ' Name' },
    { id: 'Surname', label: 'Surname' },
    { id: 'IdNumber', label: 'ID Number' },
    { id: 'Email', label: 'Email Address ' },
    { id: 'contactNo', label: 'Mobile Number' },
    { id: 'RetailerName', label: 'Retailer Name'},
    { id: 'ShortListedPosition', label: 'Candidate Position', disableSorting: true },
    { id: 'BranchName', label: ' Branch', disableSorting: true },
    { id: 'PreferredDate', label:'Date'},
    { id: 'status', label: 'Status'},
]

export default function Employees() {

    const classes = useStyles();
    const [records, setRecords] = useState([])
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
    const [isLoaded, setIsLoaded] = useState(false);
    const [recordForEdit, setRecordForEdit] = useState(null)
    const [openPopup, setOpenPopup] = useState(false);
    const [anchorEl, setAnchorEl] = React.useState('');
    const [items,setItems] = useState([]);
    const [error, setError] = useState(null);
    const [bookingid,setbookingid ] = useState(null)

    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting
    } = useTable(records, headCells, filterFn);


    //Api for retrieving data from database
    useEffect( () => 
    { //used axios
        axios.get("http://localhost:51153/api/AssessmentBooking").then(json => 
        setRecords(json.data)) 
      }, []);

    const handleSearch = e => {
        let target = e.target;
        setFilterFn({
            fn: items => {
                if (target.value == "")
                    return items;
                else
                    return items.filter(x => x.Email.includes(target.value))
            }
        })
    }
    
    //method used to update the user's info
    function Update(id) {
        console.log(id)
        setOpenPopup(true)
        setbookingid(id);   
    }

    useEffect(()=>{
        const generatePDF = resultData =>
        {
            //Create an instance of a pdf document
            const doc = new jsPDF();
        //if localhost number changes, change it on fetch as well
        fetch("http://localhost:51153/api/AssessmentBooking")
          .then(res => res.json())
          .then(
            result => {
              setIsLoaded(true);
             
              let data=[];
              data.push(["BookingID","Firstname","Lastname","IDNumber","Email","ContactNo","Retailame","ShortListedPosition","BranchName","PreferredDate"])
              for(let i=0;i<result.length;i++)
              {
                let resultData=result[i];
                data.push([resultData.BookingID,resultData.firstName,resultData.lastName,resultData.IdNumber,resultData.Email,resultData.contactNo,resultData.RetailerName,resultData.ShortListedPosition,resultData.BranchName,resultData.PreferredDate]);
              }
              setItems(data);
              
            },
           
            (error) => {
              console.log("inputJSON1",error);
              setIsLoaded(true);
              setError(error);
            }
          )
    }})

    const inputJSON = records;
    console.log("inputJSON",records);
    const jsPdfGenerator=()=>{
        var doc = new jsPDF();
        doc.text="gjhgjhgjh";
        doc.save("generated.pdf");
    }
    return (
        <main>
        <div>
            
            <PageHeader
                title="Active Bookings"
                subTitle="You can Update Candidate Status"
                icon={<PeopleOutlineTwoToneIcon fontSize="large" />}
            />
            <Paper className={classes.pageContent}>
                {/* <EmployeeForm /> */}
                <Toolbar>
                    <Controls.Input
                        label="Search by Email"
                        className={classes.searchInput}
                        InputProps={{
                            startAdornment: (<InputAdornment position="start">
                                <Search />
                            </InputAdornment>)
                        }}
                        onChange={handleSearch}
                    />
                </Toolbar>
                <TblContainer>
                    <TblHead />
                    <TableBody>
                        {
                            recordsAfterPagingAndSorting().map(item =>
                                (<TableRow key={item.id}>
                                    <TableCell>{item.firstName}</TableCell>
                                    <TableCell>{item.lastName}</TableCell>
                                    <TableCell>{item.IdNumber}</TableCell>
                                    <TableCell>{item.Email}</TableCell>
                                    <TableCell>{item.contactNo}</TableCell>
                                    <TableCell>{item.RetailerName}</TableCell>
                                    <TableCell>{item.ShortListedPosition}</TableCell>
                                    <TableCell>{item.BranchName}</TableCell>
                                    <TableCell>{item.PreferredDate}</TableCell>
                                    <TableCell>{item.Status} <Controls.ActionButton
                                            color="primary"
                                            onClick={() => Update(item.BookingID)}>
                                            <EditOutlinedIcon fontSize="small" />
                                        </Controls.ActionButton></TableCell>
                                </TableRow>)
                            )
                        }
                    </TableBody>
                   
                </TblContainer>
                <TblPagination />
                
                <Button onClick={jsPdfGenerator}>Generated Report</Button>
                   
            </Paper>
            <Popup
                title="Update Status"
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
            >
                <StatusUpdate
                 bookingid={bookingid}/>
                   
            </Popup>
        </div>
        </main>
    )

}
