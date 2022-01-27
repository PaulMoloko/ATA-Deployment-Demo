import { Field, useFormik } from "formik";
import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { Alert } from 'react-st-modal';
import routes from "../../routes";
import { Marginer } from "../marginer";
import {
  BoldLink,
  BoxContainer,
  FieldContainer,
  FieldError,
  FormContainer,
  FormError,
  Input,
  MutedLink,
  SubmitButton,
  Input2
} from "./common";
import { AccountContext } from "./accountContext";
import * as yup from "yup";
import axios from "axios";
axios.defaults.withCredentials = true;
//import { Redirect } from "react-router-dom";
//import Main from "../../Assets/main/Main";
//import ForgotForm from "./ForgotForm";

const validationSchema = yup.object({
  email: yup.string().required(),
  password: yup.string().required(),
});


export function Login(props) {
  const { switchToRegister } = useContext(AccountContext);
  const { switchToForgot } = useContext(AccountContext);
  const [error, setError] = useState(null);
  const location = {
    pathname: '/AdminDash',
    state: {fromDashboard: true}
  } 

  const history = useHistory();

  

 // const onSubmit =  (values) => {
    
    //props.history.push(routes.dashboard);
 // };
 /* const response = await axios
      ( values)
      .catch((err) => {
        if (err && err.response) setError(err.response.data.message);
      });
      

    if (response) {
      alert("Welcome back in. Authenticating...") ;
    }
  };*/

  const onSubmit = async (values) => {
    setError(null);
    const response = await axios
      .post("http://localhost:51153/api/Authenticate/login", values, {
        headers: {   
          'content-type': 'application/json',
          'Set-Cookie': 'JWT'
        }})
           
      .catch((err) => {
        if (err && err.response) setError(err.response.data.message);
        alert("Failed to Login")
      });

    if (response) {
     
      Alert("Welcome back in. Authenticating...");
      history.push(location);
     /* await axios.get(
        "https://localhost:44306/api/Authenticate/User",
         {withCredentials:true}
      );*/
      // set the state of the user
      
       
    }

   /* await fetch('https://localhost:440306/api/Authenticate/login', {
      method:'Post',
      headers:{'Content-type': 'application/json'},
      credentials:'include',
      body: JSON.stringify(values)
    })*/
  };

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validateOnBlur: true,
    onSubmit,
    validationSchema: validationSchema,
  });
  return (
    <BoxContainer>
      <FormError>{error ? error : ""}</FormError>
      <FormContainer onSubmit={formik.handleSubmit}>
        <FieldContainer>
          <Input
            name="email"
            placeholder="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {
            <FieldError>
              {formik.touched.email && formik.errors.email
                ? formik.errors.email
                : ""}
            </FieldError>
          }
        </FieldContainer>
        <FieldContainer>
          <Input
            name="password"
            type="password"
            placeholder="Password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {
            <FieldError>
              {formik.touched.password && formik.errors.password
                ? formik.errors.password
                : ""}
            </FieldError>
          }
        </FieldContainer>
        <MutedLink href="#">Forgot Password?
          <BoldLink href="#" onClick={switchToForgot}>
            click here
          </BoldLink>
        </MutedLink>
        <Marginer direction="vertical" margin="1em" />
        <SubmitButton type="submit" disabled={!formik.isValid}>
          Login
        </SubmitButton>
      </FormContainer>
      <Marginer direction="vertical" margin={5} />
      <MutedLink href="#">
        Dont have an Account?
        <BoldLink href="#" onClick={switchToRegister}>
          sign up
        </BoldLink>
      </MutedLink>
    </BoxContainer>
  );
}