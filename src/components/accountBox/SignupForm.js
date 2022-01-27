
import { Field, useFormik } from "formik";
import React, { useContext, useState } from "react";
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
} from "./common";
import { AccountContext } from "../accountBox/accountContext";
import * as yup from "yup";
import axios from "axios";
import { Marginer } from "../marginer";
//import ContactNoInput, { isSupportedCountry } from 'react-PhoneNumber-number-input';
import routes from "../../routes";
import { useHistory, Link } from "react-router-dom";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { RadioButtonChecked } from "@material-ui/icons";
import { Alert } from 'react-st-modal';
import Dialog from "@material-ui/core/Dialog";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import  Button  from '../Button';
import Checkbox from "../../controls/Checkbox";







//const Password_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
const Password_REGEX =/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&(){}[]:;<>,.]).{8,32}$/;
const number_reged = /^[0][6-8][0-9]{8}$/im;
const Pwd_number = /^(?=.*[0-9]).$/;
const Pwd_small =/^(?=.*[a-z]).$/;
const Pwd_big =/^(?=.*[A-Z]).$/;
const Pwd_special = /^(?=.*[*.!@#$%^&(){}[]:;<>,.]).{8,32}.$/;
const Name_Regex = /^(?=.*[a-zA-Z]).{3,}$/;
const validationSchema = yup.object({
  FirstName: yup
    .string()
    .min(3, "Please enter you real name")
    .matches(Name_Regex, "Please insert characters only")
    .required("Full name is required!"),
  
  LastName: yup
    .string()
    .matches(Name_Regex, "Please insert characters only")
    .required("Last Name is required"),
  
  PhoneNumber: yup
    .string()
    .matches(number_reged, "Please enter correct number. numbers should start from 06..to 08.. ")
    .required("PhoneNumber number is required"),
  
  Email: yup.string().email("Please enter a valid Email address").required(),
  
  RetailerName: yup
    .string()
    .max(15,"Please enter valid RetailerName")
    .required("Please enter RetailerName"),

  Password: yup
    .string()
    
    
    
    .required(),
  confirmPassword: yup
    .string()
    .required("Please confirm your Password")
    .when("Password", {
      is: (val) => (val && val.length > 0 ? true : false),
      then: yup
        .string()
        .oneOf([yup.ref("Password")], "Password does not match"),
    }),
});

export function SignupForm(props) {
  const { switchToSignin } = useContext(AccountContext);
  const { switchToForgot } = useContext(AccountContext);
  const { switchToSignup } = useContext(AccountContext); 
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const location = {
  switchToSignin
  } 

  const [open, setOpen] = React.useState(true);
  
  const handleClickToOpen = () => {
    setOpen(true);
  };
  
  const handleToClose = () => {
    setOpen(false);
  };
 
  const history = useHistory();
 

  

  /*const onSubmit= (values)=>{
    alert(JSON.stringify(values));
    history.push(location);
  }*/

  //fadsadasdasdsadsafafasfasfsa

  const onSubmit = async (values) => {
  
    const { confirmPassword, ...data } = values;

    const response = await axios
      .post("http://localhost:51153/api/Authenticate/register", data)
      .catch((err) => {
        if (err && err.response) setError(err.response.data.message);
        alert(err.response.data.message);
        setSuccess(null);
      });

    if (response && response.data) {
      setError(null);
      setSuccess(response.data.message);
      Alert('Registration was successful')
      formik.resetForm();
      history.push(location);
      history.push(switchToSignin);

    }
  };

  const formik = useFormik({
    initialValues: {
      FirstName: "",
      LastName:"",
      PhoneNumber:"",
      Email: "",
      RetailerName:'',
     
      Password: "",
      ConfirmPassword: "",
    },
    validateOnBlur: true,
    onSubmit,
    validationSchema: validationSchema,
  });
 
  console.log("Error", error);
  

  return (


    




    <BoxContainer>

<Dialog open={open} onClose={handleToClose}>
        <DialogTitle>{"POPI ACT DISCLAIMER!!"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
                    You hereby declare and confirm that you, as the
                    person/entity/body/individual/company whose is providing
                    information and hereinafter collectively referred to as the
                    “client”, do hereby irrevocably agree and understand that
                    any/all information supplied or given to the service provider,
                    is done so in terms of the below terms and conditions and in
                    terms of this agreement and consent declaration., according to 
                    the personal information act no 4 of 2013 of South Africa.

Click to agree if you want to continue or Cancel.
          </DialogContentText>
        
        </DialogContent>
        <DialogActions>
        <Link to=  '/'>
        <Button onClick={handleToClose} 
                  color="primary" autoFocus>
            Cancel
          </Button>
          </Link>
          <Button onClick={handleToClose} 
                  color="primary" autoFocus>
            AGREE
          </Button>
        </DialogActions>
        
      </Dialog>
      
      {!error && <FormSuccess>{success ? success : ""}</FormSuccess>}
      {!success && <FormError>{error ? error : ""}</FormError>}

      

     



      <FormContainer onSubmit={formik.handleSubmit}>
        <FieldContainer>
          <Input
            name="FirstName"
            placeholder="First Name"
            value={formik.values.FirstName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <FieldError>
            {formik.touched.FirstName && formik.errors.FirstName
              ? formik.errors.FirstName
              : ""}
          </FieldError>
        </FieldContainer>

        <FieldContainer>
          <Input
            name="LastName"
            placeholder="Last Name"
            value={formik.values.LastName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <FieldError>
            {formik.touched.LastName && formik.errors.LastName
              ? formik.errors.LastName
              : ""}
          </FieldError>
        </FieldContainer>
        <FieldContainer>
        <Input
            name="PhoneNumber"
            
            placeholder="Phone Number"
            value={formik.values.PhoneNumber}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <FieldError>
            {formik.touched.PhoneNumber && formik.errors.PhoneNumber
              ? formik.errors.PhoneNumber
              : ""}
          </FieldError>
          
        </FieldContainer>

        <FieldContainer>
          <Input
            name="Email"
            placeholder="Email"
            value={formik.values.Email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <FieldError>
            {formik.touched.Email && formik.errors.Email
              ? formik.errors.Email
              : ""}
          </FieldError>
        </FieldContainer>

         <FieldContainer>
          <Input
            
            name="RetailerName"
            placeholder="RetailerName"
            value={formik.values.RetailerName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <FieldError>
            {formik.touched.RetailerName && formik.errors.RetailerName
              ? formik.errors.RetailerName
              : ""}
          </FieldError>
        </FieldContainer>

        <FieldContainer>
          <Input
            name="Password"
            type="Password"
            placeholder="Password"
            value={formik.values.Password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <FieldError>
            {formik.touched.Password && formik.errors.Password
              ? formik.errors.Password
              : ""}
          </FieldError>
        </FieldContainer>

        <FieldContainer>
          <Input
            name="confirmPassword"
            type="Password"
            placeholder="Confirm Password"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <FieldError>
            {formik.touched.confirmPassword && formik.errors.confirmPassword
              ? formik.errors.confirmPassword
              : ""}
          </FieldError>
        </FieldContainer>

        <Marginer direction="vertical" margin="1em" />
        <SubmitButton type="submit" disabled={!formik.isValid}>
          Signup
        </SubmitButton>
      </FormContainer>
      <Marginer direction="vertical" margin={5} />
      <MutedLink href="#">
        Already have an account?
        <BoldLink href="#" onClick={switchToSignin}>
          sign in
        </BoldLink>
      </MutedLink>
    </BoxContainer>
  );
            }
