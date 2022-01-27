import React, { useState } from "react";

import {  Field,useFormik } from "formik";
import { Grid, TextField, Button, Card, CardContent, Typography } from '@material-ui/core';
import * as yup from "yup";
import { Alert } from 'react-st-modal';
import {
  BoldLink,
  BoxContainer,
  FieldContainer,
  FieldError,
  FormContainer, 
  FormSuccess,
  Input,
  MutedLink,
  SubmitButton,
  FormError,
} from "../accountBox/common";
import axios from "axios";

const Name_Regex = /^(?=.*[a-zA-Z]).{3,}$/;
const validationSchema = yup.object({
  FromName: yup
    .string()
    .min(3, "Please enter you real name")
    .matches(Name_Regex, "Please insert characters only")
    .required("Full name is required!"),
  
   EmailBody:yup
  .string()
  .matches(Name_Regex,"Please at least fill in something")
  .required("message is required"),

  FromAddress: yup.string()
  .required("email required"),
  
 
 
});


function ContactUs() {
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const onSubmit = async (values) => {
  
    setError(null);

    const response = await axios
      .post("http://localhost:51153/api/ContactUs", values)
      .then((response)=>{
        Alert("Message sent Successfully");
        formik.resetForm();
    })
    .catch((err) => {
        if (err && err.response) Alert("Failed to send Request");        
    });

    if (response && response.data) {
      setError(null);
      setSuccess(response.data.message);
      Alert('successful')
      
   

    }
  };

  const formik = useFormik({
    initialValues: {
      FromName: "",
      FromAddress: "",
      EmailBody:"",
    },
    validateOnBlur: true,
    onSubmit,
    validationSchema: validationSchema,
  });
 
  console.log("Error", error);
  


  return (
    <div> 
      <Typography gutterBottom variant="h3" align="center">
        Contact Us
       </Typography>
      <Grid>
        <Card style={{ maxWidth: 450, padding: "20px 5px", margin: "0 auto" }}>
          <CardContent>
            <Typography gutterBottom variant="h5">
              Send us a message
          </Typography> 
            <Typography variant="body2" color="textSecondary" component="p" gutterBottom>
              Any question or remarks? just write us a message!
          </Typography>

 {!error && <FormSuccess>{success ? success : ""}</FormSuccess>}
      {!success && <FormError>{error ? error : ""}</FormError>}

      

     



      <FormContainer onSubmit={formik.handleSubmit}>
           
              <Grid container spacing={1}>
                <Grid xs={12} >
                  <FieldContainer>
                  <TextField placeholder="Enter first name" name="FromName" label="First Name" variant="outlined" value={formik.values.FirstName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur} />
            <FieldError>
            {formik.touched.FromName && formik.errors.FromName
              ? formik.errors.FromName
              : ""}
          </FieldError>
          </FieldContainer>
                </Grid>

                <Grid xs={12}>
                  <FieldContainer>
                  <TextField placeholder="Enter Email" name="FromAddress" label="Email" variant="outlined" value={formik.values.FromAddress}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur} />
            <FieldError>
            {formik.touched.FromAddress && formik.errors.FromAddress
              ? formik.errors.FromAddress
              : ""}
          </FieldError>
          </FieldContainer>
                </Grid>
               

                
                
                <Grid item xs={12}>
                  <FieldContainer>
                  <TextField label="Message" multiline rows={4} placeholder="Type your message here" name="EmailBody" variant="outlined" value={formik.values.EmailBody}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur} />
            <FieldError>
            {formik.touched.EmailBody && formik.errors.EmailBody
              ? formik.errors.EmailBody
              : ""}
          </FieldError>
          </FieldContainer>
                </Grid>
                <Grid item xs={12}>
                  <SubmitButton type="submit" variant="contained" color="primary" fullWidth disabled={!formik.isValid}>Submit</SubmitButton>
                </Grid>

              </Grid>
            
            </FormContainer>
          </CardContent>
        </Card>
      </Grid>
    </div>
  );
}

export default ContactUs