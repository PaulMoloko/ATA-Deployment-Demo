import React, { useState, useEffect } from 'react'
import { Grid, } from '@material-ui/core';
import Controls from "../../../controls/Controls";
import { useForm, Form } from '../../../controls/useForm';
import * as employeeService from "../ClientDashboard/BookingService";
import PageHeader from '../../../controls/PageHeader';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Stack from '@mui/material/Stack'
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
    PreferredDate: new Date(),
    IName:'',
    AssessmentType:'',
    Province:'',
    IMobile:'',
    IEmail:'',
    RName:'',
    RMobile:'',
    REmail:'',
    status:'Pending'
}

export default function ScheduleBooking(props) {

    const [uploadFile, setUploadFile] = React.useState();
    const [superHero, setSuperHero] = React.useState();

    

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
        if ('RetailerName' in fieldValues)
            temp.RetailerName = fieldValues.RetailerName? "" : "This field is required."
        if ('BranchName' in fieldValues)
            temp.BranchName = fieldValues.BranchName.length != 0 ? "" : "This field is required."
        if ('ShortListedPosition' in fieldValues)
            temp.ShortListedPosition = fieldValues.ShortListedPosition.length != 0 ? "" : "This field is required."
        if ('AssessmentType' in fieldValues)
            temp.AssessmentType = fieldValues.AssessmentType.length != 0 ? "" : "This field is required."
        if ('Province' in fieldValues)
            temp.Province = fieldValues.Province.length != 0 ? "" : "This field is required."
        if ('IName' in fieldValues)
            temp.IName = fieldValues.IName? "" : "This field is required."
        if ('IMobile' in fieldValues)
            temp.IMobile = number_reged.test(fieldValues.IMobile)? "" : "This field is required."
        if ('IEmail' in fieldValues)
            temp.IEmail = fieldValues.IEmail? "" : "This field is required."
            if ('status' in fieldValues)
            temp.status = fieldValues.status.length != 0 ? "" : "This field is required."
        if ('RName' in fieldValues)
            temp.RName = fieldValues.RName? "" : "This field is required."
        if ('RetailerDesignation' in fieldValues)
            temp.RetailerDesignation = fieldValues.RetailerDesignation? "" : "this field is required."
        
        if ('RMobile' in fieldValues)
            temp.RMobile = number_reged.test(fieldValues.RMobile)? "" : "Minimum 10 numbers required."
        
        
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
           
    

            const response =  axios
             .post("http://localhost:51153/api/AssessmentBooking/AddAssessment", values)

             .then((response)=>{
                 Alert("Captured Successfully")
             })
            .catch((err) => {
                if (err && err.response) alert("err");        
      });
     if (response) {
          
          resetForm()
      }
            
            
        }else
        {
            Alert('error!!!!!!!')

        }

    }


    const Input = styled('input')({
        display: 'none',
      });
    const useStyles = makeStyles(theme => ({
        pageContent: {
            margin: theme.spacing(5),
            padding: theme.spacing(3)
        }
    }))
    const classes = useStyles();
    return (
        
       <main>
           
        <Paper className={classes.pageContent}>
       <Form onSubmit={handleSubmit}>
           <PageHeader
        title="Schedule"
        subTitle="Provide Candidate Details"
        icon={<PeopleOutlineTwoToneIcon fontSize="large" />}/>
            <Grid container>
                <Grid item xs={6}>
                    <Controls.Input
                        name="firstName"
                        label="FirstName"
                        value={values.firstName}
                        onChange={handleInputChange}
                        error={errors.firstName}
                    />
                     <Controls.Input
                        name="lastName"
                        label="LastName"
                        value={values.lastName}
                        onChange={handleInputChange}
                        error={errors.lastName}
                    />

                    <Controls.Input
                        label="Email"
                        name="Email"
                        value={values.Email}
                        onChange={handleInputChange}
                        error={errors.Email}
                    />
                    <Controls.Input
                        label="contactNo"
                        name="contactNo"
                        value={values.contactNo}
                        onChange={handleInputChange }
                        error={errors.contactNo}
                    />
                    
                    <Controls.Select
                        name="Province"
                        label="Province"
                        value={values.Province}
                        onChange={handleInputChange}
                        options={employeeService.Province()}
                        error={errors.Province}
                        items={employeeService}
                    />

                </Grid>
                <Grid item xs={6}>

                    <Controls.Input
                        label="Retailer Name"
                        name="RetailerName"
                        value={values.RetailerName}
                        onChange={handleInputChange}
                        error={errors.RetailerName}
                    />


                    <Controls.Input
                        name="BranchName"
                        label="Brand Name"
                        value={values.BranchName}
                        onChange={handleInputChange}
                        error={errors.BranchName}
                   
                    />
                    <Controls.Input
                        name="ShortListedPosition"
                        label="Canditate Position"
                        value={values.ShortListedPosition}
                        onChange={handleInputChange}
                        error={errors.ShortListedPosition}
                    
                    />

                    <Controls.Select
                        name="AssessmentType"
                        label="Assessment Type"
                        value={values.AssessmentType}
                        onChange={handleInputChange}
                        options={employeeService.Assessment()}
                        error={errors.AssessmentType}
                        items={employeeService}
                    />

                    
                     
                    <Controls.DatePicker
                        name="PreferredDate"
                        label="Preferred Date"
                        value={values.PreferredDate}
                        onChange={handleInputChange}
                    />

                    
<Stack direction="row" alignItems="center" spacing={2}>



<input
          type="text"
          onChange={(e) => setSuperHero(e.target.value)}
          placeholder={"Superhero Name"}
        />
        <br />
        <input type="file" accept=".pdf" onChange={(e) => setUploadFile(e.target.files)} />
        <br />
        
		
     
    </Stack>

            

                   

                    
                </Grid>
            </Grid>
       
         <h2 > </h2>
            <Grid container>
                <Grid item xs={6}>
                <PageHeader
        title="Person Responsible for Payment"
        subTitle=""
        icon={<PeopleOutlineTwoToneIcon fontSize="large" />}/>
                    <Controls.Input
                        name="IName"
                        label="Full Name"
                        value={values.IName}
                        onChange={handleInputChange}
                        error={errors.IName}
                    />
                    
                    <Controls.Input
                        label="Email"
                        name="IEmail"
                        value={values.IEmail}
                        onChange={handleInputChange}
                        error={errors.IEmail}
                    />
                    <Controls.Input
                        label="Mobile"
                        name="IMobile"
                        value={values.IMobile}
                        onChange={handleInputChange}
                        error={errors.IMobile}
                    />
            
                    
                    

                </Grid>
                <Grid item xs={6}>
                    <PageHeader
            title="Recieving Results"
            subTitle=""
             icon={<PeopleOutlineTwoToneIcon fontSize="large" />}/>
                    <Controls.Input
                        name="RName"
                        label="Full Name"
                        value={values.RName}
                        onChange={handleInputChange}
                        error={errors.RName}
                    />
                    
                    <Controls.Input
                        label="Email"
                        name="REmail"
                        value={values.REmail}
                        onChange={handleInputChange}
                        error={errors.REmail}
                    />
                    <Controls.Input
                        label="Mobile"
                        name="RMobile"
                        value={values.RMobile}
                        onChange={handleInputChange}
                        error={errors.RMobile}
                    />
                    
                    

                    <div>
                        <Controls.Button
                            type="submit"
                            text="Submit" />
                        <Controls.Button
                            text="Cancel"
                            color="default"
                            onClick={resetForm} />
                    </div>
                </Grid>
            </Grid>
        </Form>
        </Paper>
        </main>
    )
}
