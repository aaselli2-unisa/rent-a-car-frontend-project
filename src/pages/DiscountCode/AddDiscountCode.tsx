import React, { useState } from 'react'
import {  RootState } from '../../store/configureStore';
import { addDiscountCode } from '../../store/slices/discountCodeSlice';
import * as Yup from "yup";
import FormikInput from "../../components/FormikInput/FormikInput";
import { Form, Formik } from "formik";
import SideBar from "../../components/Sidebar/SideBar";
import { Button } from "@mui/joy";
import { useAppDispatch } from '../../store/useAppDispatch';
import { useAppSelector } from '../../store/useAppSelector';
import { Alert } from '@mui/material';

type Props = {}

const AddDiscountCode = (props: Props) => {
  const dispatch = useAppDispatch();
  const errorCustom = useAppSelector((state: RootState) => state.discountCode.error);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

 

  const handleAddDiscountCode = (values: any) => {
      dispatch(addDiscountCode(values));
}; 
const validationSchema = Yup.object().shape({
    discountCode: Yup.string()
        .matches(/^[a-zA-Z0-9]+$/, "Must contain only letters and numbers")
        .required("Discount code is required"),
    discountPercentage: Yup.number()
        .min(5, "Discount rate must be at least 5")
        .max(90, "Discount rate must be at most 90")
        .typeError("Only numbers are accepted")
        .required("Discount rate is required")
});
const initialValues = {
  discountCode: "",
  discountPercentage:0,
};


  return (
    <Formik
    initialValues={initialValues}
    validationSchema={validationSchema}
    onSubmit={(values) => {
      handleAddDiscountCode(values);
    }}
    enableReinitialize={true}
  >
    <SideBar>
      <div className="container-card">
      <div className="form">
        <h2 className="h2-card">Add Discount Code</h2>
        <Form>
          <div className="row-add-carModel">
            <div id="select-block" className="col-md-6" style={{marginTop:'110px'}}>
              <div className="mb-2">
                <FormikInput
                  name="discountCode"
                  label="Discount Code"
                  placeHolder="Enter discount code"
                  type="text"
                />
                <FormikInput
                  name="discountPercentage"
                  label="Discount Rate"
                  placeHolder="Enter discount rate."
                  type="number"
                />
                 <Button style={{marginTop:'30px', backgroundColor: "rgb(140,24,24)", color:"white", width:"200px" , borderRadius:"10px", marginLeft:"140px" }} type='submit'>Add</Button>
              </div>
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

export default AddDiscountCode