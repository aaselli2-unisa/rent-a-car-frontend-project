import React, { useState } from 'react'
import {  RootState } from '../../store/configureStore'
import { addColor } from '../../store/slices/colorSlice'
import * as Yup from "yup";
import FormikInput from "../../components/FormikInput/FormikInput";
import { Form, Formik } from "formik";
import SideBar from "../../components/Sidebar/SideBar";
import { Button } from "@mui/joy";
import { useAppDispatch } from '../../store/useAppDispatch';
import { useAppSelector } from '../../store/useAppSelector';
import { Alert } from '@mui/material';

type Props = {}

const AddColor = (props: Props) => {
  const dispatch = useAppDispatch();
  const errorCustom = useAppSelector((state: RootState) => state.color.error);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");


  const handleAddColor= (values: any) => {
    try{
      dispatch(addColor(values));
      setSuccessMessage("Operation completed successfully");
    } catch (error) {
      console.error("Error updating color: ", error);
      // In case of error
      setErrorMessage("An error occurred during the operation");
    }
     
  };
  const validationSchema = Yup.object().shape({
    colorEntityName: Yup.string()
      .min(2, "Color must be at least 2 characters")
      .matches(/^[a-zA-Z\s]+$/, "Color can only contain letters")
      .required("Enter color"),
  });
  const initialValues = {
    colorEntityName: "",
  };
  return (
    <Formik
    initialValues={initialValues}
    validationSchema={validationSchema}
    onSubmit={(values) => {
      handleAddColor(values);
    }}
  >
    <SideBar>
      <div className="container-card">
      <div className="form">
        <h2 className="h2-card">Add Color</h2>
        <Form>
          <div className="row">
            <div id="select-block" className="col-md-6" style={{marginTop:'110px'}}>
              <div className="mb-2">
                <FormikInput
                  name="colorEntityName"
                  label="Color"
                  placeHolder="Enter color."
                  type="text"
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

export default AddColor





