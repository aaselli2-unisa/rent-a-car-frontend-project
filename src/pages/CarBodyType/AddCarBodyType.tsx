import React, { useState } from "react";
import {  RootState } from "../../store/configureStore";
import { addCarBodyType } from "../../store/slices/carBodyTypeSlice";
import { Button } from "@mui/joy";
import * as Yup from "yup";
import FormikInput from "../../components/FormikInput/FormikInput";
import { Form, Formik } from "formik";
import SideBar from "../../components/Sidebar/SideBar";
import { useAppSelector } from "../../store/useAppSelector";
import { useAppDispatch } from "../../store/useAppDispatch";
import { Alert } from "@mui/material";
type Props = {};

const AddCarBodyType = (props: Props) => {
  const dispatch = useAppDispatch();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const errorCustom = useAppSelector((state: RootState) => state.carBodyType.error);

  const handleAddCarBodyType = async (values: any) => {
    try {
      const response = await dispatch(addCarBodyType(values));
      // On successful operation
      setSuccessMessage("Operation completed successfully");
      window.location.reload();
    } catch (error) {
      console.error("Error updating shift type: ", error);
      // In case of error
      setErrorMessage("An error occurred during the operation");
    }
    
  };
  const validationSchema = Yup.object().shape({
    carBodyTypeEntityName: Yup.string()
      .min(2, "Body type must be at least 2 characters")
      .matches(/^[a-zA-Z\s]+$/, "Body type can only contain letters")
      .required("Enter body type"),
  });
  const initialValues = {
    carBodyTypeEntityName: "",
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        handleAddCarBodyType(values);
      }}
      enableReinitialize={true}
    >
      <SideBar>
        <div className="container-card">
        <div className="form">
          <h2 className="h2-card">Add Body Type</h2>
          <Form>
            <div className="row-add-carModel">
              <div id="select-block" className="col-md-6" style={{marginTop:'110px'}}>
                <div className="mb-2">
                  <FormikInput
                    name="carBodyTypeEntityName"
                    label="Body Type"
                    placeHolder="Enter body type."
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
  );
};

export default AddCarBodyType;
