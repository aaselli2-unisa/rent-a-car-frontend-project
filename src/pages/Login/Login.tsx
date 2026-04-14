import React, { FormEvent, useEffect, useState } from "react";
import { Container, Grid, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../store/configureStore";
import { useNavigate } from "react-router-dom";
import { addSignIn } from "../../store/slices/signInSlice";
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
  FieldInputProps,
  FormikProps,
} from "formik";
import * as Yup from "yup";
import { Autocomplete, PasswordInput } from "@mantine/core";
import { Alert } from "@mui/material";
import { ErrorResponse } from "../../services/signInService";
import { unwrapResult } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import "./Login.css";
import { useAppDispatch } from "../../store/useAppDispatch";
import { useAppSelector } from "../../store/useAppSelector";


const Login: React.FC = () => {


  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const errorCustom = useAppSelector((state: RootState) => state.signIn.error);
  useEffect(() => {
    if (errorCustom) {
      setErrorMessage(errorCustom);
    }
  }, [errorCustom]);

  /* const isLogged = useAppSelector((state:RootState) => state.auth.isAuthenticated);

  if (isLogged) {
    window.location.href = "/";
  } */
  const handleSubmit =  (values: { email: string; password: string }) => {
    
    try {
      dispatch(
        addSignIn({ email: values.email, password: values.password })
      );
      navigate('/');
    } catch (error) {
      // Catch errors when login fails
      console.error("Login failed: ", error);
      // Set error message
      setErrorMessage("Login failed. Please check your credentials.");
    }
  };

  const data = ["gmail.com", "outlook.com", "yahoo.com"];

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Enter a valid email address")
      .required("Email address is required"),
    password: Yup.string().required("Password is required"),
    /* .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      'Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character'
    ), */
  });

  const initialValues = {
    email: "",
    password: "",
  };

  return (
    <div className="container-card">
      <div className="form-login">
        <div className="login-card">
          <Container maxWidth="sm">
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <h2 className="h2-card">Login</h2>
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={(values, { resetForm }) => {
                    handleSubmit(values);
                    resetForm();
                  }}
                >
                  {({ values, setFieldValue }) => (
                    <Form>
                      <Autocomplete
                        label=""
                        placeholder="Your email address"
                        value={values.email}
                        onChange={(value) =>
                          setFieldValue("email", value || "")
                        }
                        data={data.map(
                          (provider) => `${values.email}@${provider}`
                        )}
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="text-danger"
                      />
                      <Field name="password">
                        {({
                          field,
                          form,
                        }: {
                          field: FieldInputProps<string>;
                          form: FormikProps<any>;
                        }) => (
                          <div>
                            <PasswordInput
                              placeholder="Password"
                              label=""
                              value={field.value}
                              onChange={(event) => {
                                form.setFieldValue(
                                  "password",
                                  event.target.value
                                );
                              }}
                            />
                            <ErrorMessage name="password">
                              {(message) => (
                                <div className="text-danger">{message}</div>
                              )}
                            </ErrorMessage>
                          </div>
                        )}
                      </Field>
                      <button type="submit" className="button3">
                        Login
                      </button>
                    </Form>
                  )}
                </Formik>
                {errorCustom && <Alert severity="error">{errorCustom}</Alert>}
                {!errorCustom && successMessage && (
                  <Alert severity="success">{successMessage}</Alert>
                )}
              </Grid>
            </Grid>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default Login;
