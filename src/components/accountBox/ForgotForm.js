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
import * as yup from "yup";
import axios from "axios";
import { Redirect } from "react-router-dom";
import Main from "../../Assets/main/Main";
import { Alert } from 'react-st-modal';
const validationSchema = yup.object({
  email: yup.string().email("Please enter a valid email address").required(),
  
 
});

export function ForgotForm(props) {

  const { switchToSignin } = useContext(AccountContext);
  const {switchToreset} = useContext(AccountContext);
  const [error, setError] = useState(null);
  const location = { switchToreset};
  const history = useHistory();
  

  

  const onSubmit =  (values) => {
   
  //Alert('Email Sent, Check email')
    history.push(location);
  };
 /* const response = await axios
      ( values)
      .catch((err) => {
        if (err && err.response) setError(err.response.data.message);
      });
      

    if (response) {
      alert("Welcome back in. Authenticating...") ;
    }
  };*/

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
        
        
        <Marginer direction="vertical" margin="1em" />
        <SubmitButton type="submit" href="#"  disabled={!formik.isValid}>
          Reset
        </SubmitButton>
      </FormContainer>
    </BoxContainer>
  );
}