
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
import PhoneInput from 'react-phone-number-input';
import routes from "../../routes";
import { useHistory } from "react-router-dom";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';





const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

const validationSchema = yup.object({
  firstName: yup
    .string()
    .min(3, "Please enter you real name")
    .required("Full name is required!"),
  
  lastName: yup
    .string()
    .required("Last Name is required"),
  
  phone: yup
    .string()
    .required("Phone number is required"),
  
  email: yup.string().email("Please enter a valid email address").required(),
  
  retailer: yup
    .string()
    .max(15,"Please enter valid retailer")
    .required("Please enter retailer"),

  password: yup
    .string()
    .matches(PASSWORD_REGEX, "Please enter a strong password")
    .required(),
  confirmPassword: yup
    .string()
    .required("Please confirm your password")
    .when("password", {
      is: (val) => (val && val.length > 0 ? true : false),
      then: yup
        .string()
        .oneOf([yup.ref("password")], "Password does not match"),
    }),
});

export function UpdateInfo(props) {
  const { switchToSignin } = useContext(AccountContext);
  const { switchToForgot } = useContext(AccountContext); 
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const location = {
    pathname: '/Dashboard',
    state: {fromDashboard: true}
  } 

  const history = useHistory();

  const [value, setValue] = React.useState('female');//radio buttons

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const onSubmit= (values)=>{
    alert(JSON.stringify(values));
    history.push(location);
  }

 /* const onSubmit = async (values) => {
    const { confirmPassword, ...data } = values;

    const response = await axios
      .post("http://localhost:5000/api/v1/register", data)
      .catch((err) => {
        if (err && err.response) setError(err.response.data.message);
        setSuccess(null);
      });

    if (response && response.data) {
      setError(null);
      setSuccess(response.data.message);
      formik.resetForm();
    }
  };*/

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName:"",
      phone:"",
      email: "",
      retailer:'',
      password: "",
      confirmPassword: "",
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

      <FormControl component="fieldset">
      <FormLabel component="legend">User</FormLabel>
      <RadioGroup aria-label="Admin" name="Client" value={value} onChange={handleChange}>
        <FormControlLabel value="Admin"  control={<Radio />} label="Admin" />
        <FormControlLabel value="Client" control={<Radio />} label="Client" />
       
      </RadioGroup>
    </FormControl>



      <FormContainer onSubmit={formik.handleSubmit}>
        <FieldContainer>
          <Input
            name="firstName"
            placeholder="Full Name"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <FieldError>
            {formik.touched.firstName && formik.errors.firstName
              ? formik.errors.firstName
              : ""}
          </FieldError>
        </FieldContainer>

        <FieldContainer>
          <Input
            name="lastName"
            placeholder="last Name"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <FieldError>
            {formik.touched.lastName && formik.errors.lastName
              ? formik.errors.lastName
              : ""}
          </FieldError>
        </FieldContainer>
        <FieldContainer>
        <Input
            name="phone"
            type="number"
            placeholder="Phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </FieldContainer>

        <FieldContainer>
          <Input
            name="email"
            placeholder="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <FieldError>
            {formik.touched.email && formik.errors.email
              ? formik.errors.email
              : ""}
          </FieldError>
        </FieldContainer>

        <FieldContainer>
          <Input
            name="retailer"
            placeholder="Retailer"
            value={formik.values.retailer}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <FieldError>
            {formik.touched.retailer && formik.errors.retailer
              ? formik.errors.retailer
              : ""}
          </FieldError>
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
          <FieldError>
            {formik.touched.password && formik.errors.password
              ? formik.errors.password
              : ""}
          </FieldError>
        </FieldContainer>

        <FieldContainer>
          <Input
            name="confirmPassword"
            type="password"
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
        <SubmitButton type="submit" href="#" onClick={ switchToSignin} disabled={!formik.isValid}>
          Update
        </SubmitButton>
      </FormContainer>
    </BoxContainer>
  );
}