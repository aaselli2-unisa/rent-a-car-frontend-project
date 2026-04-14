import React, { useState } from "react";
import { RootState } from "../../store/configureStore";
import { addFuelType } from "../../store/slices/fuelTypeSlice";
import * as Yup from "yup";
import FormikInput from "../../components/FormikInput/FormikInput";
import { Form, Formik } from "formik";
import SideBar from "../../components/Sidebar/SideBar";
import { Button } from "@mui/joy";
import { useAppDispatch } from "../../store/useAppDispatch";
import { useAppSelector } from "../../store/useAppSelector";
import { Alert } from "@mui/material";

type Props = {};

const AddFuelType = (props: Props) => {
  const dispatch = useAppDispatch();
  const errorCustom = useAppSelector((state: RootState) => state.fuelType.error);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleAddFuelType = (values: any) => {
    try{
      dispatch(addFuelType(values));
      setSuccessMessage("Operation completed successfully");
    } catch (error) {
      console.error("Error updating fuelType: ", error);
      // In case of error
      setErrorMessage("An error occurred during the operation");
    }
    
  };
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "Fuel type must be at least 2 characters")
      .matches(
        /^[a-zA-Z\s]+$/,
        "Fuel type can only contain letters"
      )
      .required("Enter fuel type"),
  });
  const initialValues = {
    name: "",
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        handleAddFuelType(values);
      }}
      enableReinitialize={true}
    >
      <SideBar>
        <div className="container-card">
        <div className="form">
          <h2 className="h2-card">Add Fuel Type</h2>
          <Form>
            <div className="row-add-carModel">
              <div id="select-block" className="col-md-6" style={{marginTop:'110px'}}>
                <div className="mb-2">
                  <FormikInput
                    name="name"
                    label="Fuel Type"
                    placeHolder="Enter fuel type."
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

export default AddFuelType;
