import React, { useState, useEffect } from 'react'
import ScheduleBooking from '../ScheduleBooking/UpdateModal';
import PageHeader from "../../../controls/PageHeader";
import PeopleOutlineTwoToneIcon from '@material-ui/icons/PeopleOutlineTwoTone';
import { Paper, makeStyles, TableBody, TableRow, TableCell, Toolbar, InputAdornment } from '@material-ui/core';
import useTable from "../../../controls/useTable";
import * as employeeService from "../ClientDashboard/BookingService";
import Controls from "../../../controls/Controls";
import { Search } from "@material-ui/icons";
import AddIcon from '@material-ui/icons/Add';
import Popup from "../../../controls/Popup";
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import CloseIcon from '@material-ui/icons/Close';
import axios from "axios";
axios.defaults.withCredentials=true



const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3)
    },
    searchInput: {
        width: '75%'
    },
    newButton: {
        position: 'absolute',
        right: '10px'
    }
}))


const headCells = [
    { id: 'firstName', label: 'Employee Name' },
    { id: 'lastName', label: 'Surname'},
   // { id: 'IdNumber', label: 'ID Number' },
    { id: 'email', label: 'Email Address (Personal)' },
    { id: 'mobile', label: 'Mobile Number' },
    { id: 'RetailerName', label: 'Retailer Name'},
    { id: 'ShortListedPosition', label: 'Candidate Position', disableSorting: true },
    { id: 'BranchName', label: 'Candidate Brand', disableSorting: true },
    { id: 'PreferredDate', label:'Date'},
    { id: 'actions', label: 'Actions', disableSorting: true }
]

export default function Employees() {

    const classes = useStyles();
    const [recordForEdit, setRecordForEdit] = useState(null)
    //const for holding records from the api
    const [records, setRecords] = useState([])
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
    const [openPopup, setOpenPopup] = useState(false)
    const [bookingid,setbookingid ] = useState(null)

    //Api for retrieving data from database
    useEffect( () => 
    { //used axios
        axios.get("http://localhost:51153/api/AssessmentBooking").then(json => 
        setRecords(json.data)) 
      }, []);

    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting
    } = useTable(records, headCells, filterFn);
        
    //handling search  method
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

   
    //method for opening the popup to update info
    const openInPopup = item => { 
        setRecordForEdit(item)
        setOpenPopup(true)
    }

    return (
        <>
            <PageHeader
                title="Candidates"
                subTitle="Records Of All Booked Candidates"
                icon={<PeopleOutlineTwoToneIcon fontSize="large" />}
            />
            <Paper className={classes.pageContent}>

                <Toolbar>
                    <Controls.Input
                        label="Search By Email"
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
                                    
                                    <TableCell>{item.Email}</TableCell>
                                    <TableCell>{item.contactNo}</TableCell>
                                    <TableCell>{item.RetailerName}</TableCell>
                                    <TableCell>{item.ShortListedPosition}</TableCell>
                                    <TableCell>{item.BranchName}</TableCell>
                                    <TableCell>{item.PreferredDate}</TableCell>
                                    <TableCell>
                                        <Controls.ActionButton
                                            color="primary"
                                            onClick={() => Update(item.BookingID)}>
                                            <EditOutlinedIcon fontSize="small" />
                                        </Controls.ActionButton>
                                       
                                    </TableCell>
                                </TableRow>)
                            )
                        }
                    </TableBody>
                </TblContainer>
                <TblPagination />
            </Paper>
            <Popup
                title="Update Details"
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
            >  
                <ScheduleBooking
                    bookingid={bookingid}
                      setOpenPopup={openInPopup}   
                    />
                   

            </Popup>
        </>
    )
}