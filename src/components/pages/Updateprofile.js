import React, { useContext, useState } from "react";
import styled from "styled-components";

import { motion } from "framer-motion";
import { Field, useFormik } from "formik";
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
  Button,
  FormError,
} from "../../components/accountBox/common";
//import { AccountContext } from "../accountBox/accountContext";
import * as yup from "yup";
import { AccountContext } from "../accountBox/accountContext";
import axios from "axios";
import { Marginer } from "../marginer";
//import ContactNoInput, { isSupportedCountry } from 'react-PhoneNumber-number-input';
import routes from "../../routes";
import { useHistory, Link } from "react-router-dom";
import RadioGroup from '@material-ui/core/RadioGroup';
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { RadioButtonChecked } from "@material-ui/icons";
import { Alert } from 'react-st-modal';




const Password_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
const Name_Regex = /^(?=.*[a-zA-Z]).{3,}$/;
const number_reged = /^[0][6-8][0-9]{8}$/im;


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
  
  Email: yup
  .string().email("Please enter a valid Email address").required(),
  
 

  Password: yup
    .string()
    .matches(Password_REGEX, "Please enter a strong Password")
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

 function UserProfile(props) {
  
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [userid, setuserid] =useState(null);

 

  

  /*const onSubmit= (values)=>{
    alert(JSON.stringify(values));
    history.push(location);
  }*/

  //fadsadasdasdsadsafafasfasfsa

  React.useEffect( () => 
  {
      axios.get("http://localhost:51153/api/Authenticate/User").then((response) => {
        
        formik.setValues(response.data);
          setuserid(response.data);
          console.log(response.data)
        
      });
    }, []);


  const onSubmit = async (values) => {
  
    const { confirmPassword, ...data } = values;

    const url ="http://localhost:51153/api/user/"
    const response = await axios
    .put(url+userid.Id, data)
    .then((response)=>{
      Alert("Updated Successfully");
      
  })
    .catch((err) => {
      if (err && err.response) setError(err.response.data.message);
      alert(err.response.data.message);
      setSuccess(null);
    });

  if (response && response.data) {
    setError(null);
    console.log(userid)
    setSuccess(response.data.message);
    Alert('successful')
    
    formik.resetForm();
    }
  };

  const formik = useFormik({
    initialValues: {
      FirstName: "",
      LastName:"",
      PhoneNumber:"",
      Email: "",
     
     
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
            
            placeholder="PhoneNumber"
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
          Save
        </SubmitButton>
        <Marginer direction="vertical" margin="1em" />
        <Button  type="button" onClick={routes.dashboard}>
          Cancel
        </Button>
      </FormContainer>
    
    </BoxContainer>
  );
            }

            const Container = styled.div`
            width: 600px;
            min-height: 350px;
            display: flex;
            flex-direction: column;
            border-radius: 50px;
            background-color: #fff;
            box-shadow:inset 0px 0px 0 #fff, 0px 0px 0 rgba(128, 83, 35, 0.2);
            border:1px solid #000;
            position: relative;
            overflow: hidden;
          `;
          

          
          const TopContainer = styled.div`
            width: 100%;
            height: 250px;
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            padding: 0 1.8em;
            padding-bottom: 5em;
          `;

          
          const BackDrop = styled(motion.div)`
            width: 210%;
            height: 360px;
            position: absolute;
            display: flex;
            flex-direction: column;
            border-radius: 50%;
            transform: rotate(60deg);
            top: -390px;
            left: -300px;
            background:  rgb(15, 97, 98);
            );
          `;
          
          const HeaderContainer = styled.div`
            width: 100%;
            display: flex;
            flex-direction: column;
          `;
          
          const HeaderText = styled.h2`
            font-size: 30px;
            font-weight: 600;
            line-height: 1.00;
            color: #fff;
            z-index: 10;
            margin: 0;
          `;
          
          const SmallText = styled.h5`
            color: #fff;
            font-weight: 500;
            line-height: 5.24;
            font-size: 11px;
            z-index: 10;
            margin: 0;
            margin-top: 20px;
          `;
          
          const InnerContainer = styled.div`
            width: 100%;
            display: flex;
            flex-direction: column;
            padding: 0 1.8em;
          `;
          
          const backdropVariants = {
            expanded: {
              width: "233%",
              height: "1050px",
              borderRadius: "20%",
              transform: "rotate(60deg)",
            },
            collapsed: {
              width: "160%",
              height: "550px",
              borderRadius: "50%",
              transform: "rotate(60deg)",
            },
          };
          
          const expandingTransition = {
            type: "spring",
            duration: 2.3,
            stiffness: 30,
          };

export default function Updateprofile(props) {
  const [isExpanded, setExpanded] = useState(false);
  const [active, setActive] = useState("Profile");

  const playExpandingAnimation = () => {
    setExpanded(true);
    setTimeout(() => {
      setExpanded(false);
    }, expandingTransition.duration * 1000 - 1500);
  };

  const switchToProfile = () => {
    playExpandingAnimation();
    setTimeout(() => {
      setActive("Profile");
    }, 400);
  };

  

 

  const contextValue = { switchToProfile};

  return (
    <Grid
    container
    spacing={0}
    direction="column"
    alignItems="center"
    justify="center"
    style={{ minHeight: '100vh' }}
   >
    <AccountContext.Provider value={contextValue}>
      <Container>
        <TopContainer>
          <BackDrop
            initial={false}
            animate={isExpanded ? "expanded" : "collapsed"}
            variants={backdropVariants}
            transition={expandingTransition}
          />
          {active === "Profile" && (
            <HeaderContainer>
              <HeaderText>User Profile</HeaderText>
              <HeaderText>Update User Details</HeaderText>
              <SmallText>Please Click on Save or Cancel</SmallText>
            </HeaderContainer>
          )}
       
       
        
        </TopContainer>
        <InnerContainer>
          {active === "Profile" && <UserProfile/>}
          
        </InnerContainer>
      </Container>
    </AccountContext.Provider>
    </Grid>
  );
}