
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
import { AccountContext } from "./accountContext";
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







const Password_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;


const validationSchema = yup.object({
  
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

export function Resetform(props) {
  const { switchToSignin } = useContext(AccountContext);
  const { switchToForgot } = useContext(AccountContext); 
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const location = {
    switchToSignin
  } 

  const history = useHistory();

 

  

  /*const onSubmit= (values)=>{
    alert(JSON.stringify(values));
    history.push(location);
  }*/

  //fadsadasdasdsadsafafasfasfsa

  const onSubmit = async (values) => {
  
    const { confirmPassword, ...data } = values;

    const response = await axios
      .put("http://localhost:51153/api/Authenticate/registe", data)
      .catch((err) => {
        if (err && err.response) setError(err.response.data.message);
        alert(err.response.data.message);
        setSuccess(null);
      });

    if (response && response.data) {
      setError(null);
      setSuccess(response.data.message);
      Alert('You have resetted your Password')
      formik.resetForm();
      history.push(location);
    }
  };

  const formik = useFormik({
    initialValues: {
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
          Reset
        </SubmitButton>
      </FormContainer>
      <Marginer direction="vertical" margin={5} />
     
    </BoxContainer>
  );
            }
