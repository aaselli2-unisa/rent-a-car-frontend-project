import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch, RootState } from '../../store/configureStore'
import { addAdmin } from '../../store/slices/adminSlice'
import { Form, Formik } from 'formik'
import * as Yup from 'yup';
import FormikInput from '../../components/FormikInput/FormikInput'
import SideBar from '../../components/Sidebar/SideBar'
import {Alert, Button } from '@mui/material';
import '../Employee/Employee.css'
import { useAppDispatch } from '../../store/useAppDispatch'
import { useAppSelector } from '../../store/useAppSelector'
type Props = {}

const AddAdmin = (props: Props) => {

  const dispatch = useAppDispatch();
  const [selectedValue, setSelectedValue] = useState({});
  const errorCustom = useAppSelector((state: RootState) => state.employee.error);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
 
  const handleAddAdmin = (values: any) => {
      dispatch(addAdmin(values));
  }

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .matches(/^[a-zA-Z\s]+$/, 'Name can only contain letters')
      .required('Enter name'),
    surname: Yup.string()
      .matches(/^[a-zA-Z\s]+$/, 'Surname can only contain letters')
      .required('Enter surname'),
    emailAddress: Yup.string().required('Enter email address'),
    password: Yup.string().required('Enter password')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      'Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character'),
    phoneNumber: Yup.string()
      .matches(/^[0-9]+$/, 'Phone number can only contain digits')
      .min(10, 'Phone number must be 10 digits')
      .max(10, 'Phone number must be 10 digits')
      .required('Enter phone number'),
    salary: Yup.number()
      .min(0, 'Salary must be at least 0')
      .required('Enter salary'),
    imagePath: Yup.string().required('Enter photo'),
    authority: Yup.string().required('Enter authority'),
  })
  const initialValues = {
    name:'',
    surname:'',
    emailAddress:'',
    password:'',
    phoneNumber:'',
    salary: 0,
    imagePath:'',
    authority:'',
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        setSelectedValue(values);
        handleAddAdmin(values);
      }}
      enableReinitialize={true}
    >
    <SideBar>
      <div className="container-card">
      <div className="form">
        <h2 className='h2-card'>Add Admin</h2>
          <Form>
            <div className="row-add-employee">
              <div id='select-block' className="col-md-6" style={{marginTop:'110px'}}>
                <div className="mb-2">
                  <FormikInput
                    name="name"
                    label="Name"
                    placeHolder="Enter name."
                    type='text'
                  />
                </div>
                <div className="mb-2">
                  <FormikInput
                    name="surname"
                    label="Surname"
                    placeHolder="Enter surname."
                    type='text'
                  />
                </div>
                <div className="mb-2">
                  <FormikInput
                    name="emailAddress"
                    label="Email Address"
                    placeHolder="Enter email address."
                    type='text'
                  />
                </div>
                <div className="mb-2">
                  <FormikInput
                    name="password"
                    label="Password"
                    placeHolder="Enter password."
                    type='text'
                  />
                </div>
              </div>
              <div id='input-block' className="col-md-6" style={{marginTop:'110px'}}>
                <div className="mb-2">
                  <FormikInput
                    name="phoneNumber"
                    label="Phone Number"
                    placeHolder="Enter phone number."
                    type='text'
                  />
                </div>
                <div className="mb-2">
                  <FormikInput
                    name="salary"
                    label="Salary"
                    placeHolder="Enter salary."
                    type='number'
                  />
                </div>
                <div className="mb-2">
                  <FormikInput
                    name="imagePath"
                    label="Image"
                    placeHolder="Enter image."
                    type='text'
                  />
                </div>
                <div className="mb-2">
                  <FormikInput
                    name="authority"
                    label="Authority"
                    placeHolder="Enter authority."
                  />
                </div>
              <Button style={{marginTop:'30px', backgroundColor: "rgb(140,24,24)", color:"white", width:"200px" , borderRadius:"10px" }} type='submit'>Add</Button>
              </div>
            </div>
        </Form>
        {errorCustom && <Alert severity="error">{errorCustom}</Alert>}
        {!errorCustom && successMessage && (
        <Alert severity="success">{successMessage}</Alert>
          )}
        </div>
        </div>
      </SideBar>
    </Formik>
  )
}

export default AddAdmin