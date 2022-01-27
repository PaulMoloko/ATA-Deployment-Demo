import { Field, useFormik } from "formik";
import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
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
import { AccountContext } from "../accountBox/accountContext";
import { Alert } from 'react-st-modal';
import * as yup from "yup";
import axios from "axios";
import { Redirect } from "react-router-dom";
import Main from "../../Assets/main/Main";
import ForgotForm from "./ForgotForm";
axios.defaults.withCredentials=true

const validationSchema = yup.object({
  email: yup.string().required(),
  password: yup.string().required(),
});

export function LoginForm(props) {
  const { switchToSignup } = useContext(AccountContext);
  const { switchToForgot } = useContext(AccountContext);
  const [error, setError] = useState(null);
  const [User, setUser] =useState(null);
  const location = {
    pathname: '/dashboard',
    state: {fromDashboard: true}
  } 

  const Adminlocation = {
    pathname: '/AdminDash',
    state: {fromDashboard: true}
  } 




  const history = useHistory();

  

  const onSubmit = async (values) => {
    setError(null);

   /* const response = await axios.post(
      "https://localhost:44365/api/Authenticate/login",
      values, {withCredentials:true}
    );
    // set the state of the user
    setUser(response.data)
    // store the user in localStorage
    localStorage.setItem('values', response.data)
    if (response) {
      localStorage.setItem('values', response.data)
      alert("Welcome back in. Authenticating...");
      history.push(location);
      
       
    }
    console.log(response.data)*/

    const response = await axios
      .post("http://localhost:51153/api/Authenticate/login", values, {
        headers: {   
          'content-type': 'application/json',
          'Set-Cookie': 'JWT'
        }})
           
      .catch((err) => {
        if (err && err.response) setError(err.response.data.message);
        alert("Failed to Login")
      }).then((response)=>{

 localStorage.setItem('values', response.data)
      Alert("Welcome back in. Authenticating...");
     
      axios.get(
        "http://localhost:51153/api/Authenticate/User",{withCredentials:true})
 setUser(response.data);

history.push(location);


      });

         
/*if(User.UserType===1)
{
   
}
else{
 
  history.push(Adminlocation);
}*/

        
      // set the state of the user
      
       
    
    

     /* await fetch('https://localhost:44306/api/Authenticate/login', {
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
        <BoldLink href="#" onClick={switchToSignup}>
          sign up
        </BoldLink>
      </MutedLink>
    </BoxContainer>
  );
}