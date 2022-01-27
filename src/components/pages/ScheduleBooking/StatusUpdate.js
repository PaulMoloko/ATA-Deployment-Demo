import React, { useState, useEffect } from 'react'
import { Grid, } from '@material-ui/core';
import Controls from "../../../controls/Controls";
import { useForm, Form } from '../../../controls/useForm';
import * as employeeService from "../ClientDashboard/BookingService";
import PageHeader from '../../../controls/PageHeader';
import PeopleOutlineTwoToneIcon from '@material-ui/icons/PeopleOutlineTwoTone';
import { Paper,makeStyles } from '@material-ui/core';
import { Alert } from 'react-st-modal';
import axios from "axios";




const initialFValues = {
     id : 0,
    firstName : '',
    lastName :'',
    IdNumber :'',
    Email : '',
    contactNo: '',
    RetailerName: '',
    ShortListedPosition: '',
    BranchName:'',
    PreferredDate: Date(),
    IName:'',
    AssessmentType:'',
    IMobile:'',
    IEmail:'',
    RName:'',
    RMobile:'',
    REmail:'',
    status:'Pending',
    ScheduledDate: Date()
}

export default function StatusUpdate(props) {
    const url ="http://localhost:51153/api/AssessmentBooking/"
    const urll ="http://localhost:51153/api/AssessmentBookingStatus/"
    const {bookingid} = props

    const number_reged = /^[0][6-8][0-9]{8}$/im;
    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('firstName' in fieldValues)
        temp.firstName = fieldValues.firstName ? "" : "This field is required."
    if ('lastName' in fieldValues)
        temp.lastName = fieldValues.lastName ? "" : "This field is required."
    if ('Email' in fieldValues)
        temp.Email = (/$^|.+@.+..+/).test(fieldValues.Email) ? "" : "Email is not valid."
    if ('contactNo' in fieldValues)
        temp.contactNo = number_reged.test(fieldValues.contactNo) ? "" : "Minimum 10 numbers required."
    if ('IdNumber' in fieldValues)
        temp.IdNumber = fieldValues.IdNumber.length >=13 ? "" : "invalid Id."
    if ('RetailerName' in fieldValues)
        temp.RetailerName = fieldValues.RetailerName? "" : "This field is required."
    if ('BranchName' in fieldValues)
        temp.BranchName = fieldValues.BranchName.length != 0 ? "" : "This field is required."
    if ('ShortListedPosition' in fieldValues)
        temp.ShortListedPosition = fieldValues.ShortListedPosition.length != 0 ? "" : "This field is required."
    if ('AssessmentType' in fieldValues)
        temp.AssessmentType = fieldValues.AssessmentType.length != 0 ? "" : "This field is required."
    if ('IName' in fieldValues)
        temp.IName = fieldValues.IName? "" : "This field is required."
    if ('IMobile' in fieldValues)
        temp.IMobile = number_reged.test(fieldValues.IMobile)? "" : "This field is required."
    if ('IEmail' in fieldValues)
        temp.IEmail = fieldValues.IEmail? "" : "This field is required."
    
    if ('RName' in fieldValues)
        temp.RName = fieldValues.RName? "" : "This field is required."
    if ('RetailerDesignation' in fieldValues)
        temp.RetailerDesignation = fieldValues.RetailerDesignation? "" : "this field is required."
    
    if ('RMobile' in fieldValues)
        temp.RMobile = number_reged.test(fieldValues.RMobile)? "" : "Minimum 10 numbers required."
    

        if ('status' in fieldValues)
            temp.status = fieldValues.status.length != 0 ? "" : "This field is required."
        
        setErrors({
            ...temp
        })

        if (fieldValues == values)
            return Object.values(temp).every(x => x == "")
    }

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFValues, true, validate);

    const handleSubmit = e => {
        e.preventDefault()
        if (validate()){
        
        const id =bookingid
          axios.put(urll+id, values)
            .then(res=>{
                resetForm()
                 Alert('Updated Successfully.');
                 
            }).catch(err=>console.error(err))
     }
 }

    //method used to populate values in placeholders based on the id
    useEffect(() => {
        
        const id= bookingid
        axios.get(url+id)
        .then(res => 
            setValues(res.data)
         ) 
    }, [])

    const useStyles = makeStyles(theme => ({
        pageContent: {
            margin: theme.spacing(5),
            padding: theme.spacing(3)
        }
    }))
    const classes = useStyles();
    return (
        
       
        
       <Form onSubmit={handleSubmit}>
        
            <Grid container>
                
               
                  
                    <Controls.Select
                        name="status"
                        label="Status"
                        value={values.status}
                        onChange={handleInputChange}
                        options={employeeService.Status()}
                        error={errors.status}
                        items={employeeService}
                    />
                
                    <Controls.DatePicker
                        name="ScheduledDate"
                        label="Schedule Date"
                        value={values.ScheduledDate}
                        onChange={handleInputChange}
                    />
                    <div>
                        <Controls.Button
                            type="submit"
                            text="Update" />
                       
                    </div>
                
            </Grid>
        </Form>
        
        
    )
}
