import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../store/configureStore";
import { addDrivingLicenseType } from "../../store/slices/drivingLicenseTypeSlice";
import * as Yup from "yup";
import FormikInput from "../../components/FormikInput/FormikInput";
import { Form, Formik } from "formik";
import SideBar from "../../components/Sidebar/SideBar";
import { Button } from "@mui/joy";
import { useAppDispatch } from "../../store/useAppDispatch";
import { useAppSelector } from "../../store/useAppSelector";
import { Alert } from "@mui/material";

type Props = {};

const AddDrivingLicenseType = (props: Props) => {
  const dispatch = useAppDispatch();
  const errorCustom = useAppSelector((state: RootState) => state.drivingLicenseType.error);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleAddDrivingLicenseType = (values: any) => {
    try{
    dispatch(addDrivingLicenseType(values));
    setSuccessMessage("Operation completed successfully");
    } catch (error) {
      console.error("Error updating shift type: ", error);
      // In case of error
      setErrorMessage("An error occurred during the operation");
    }
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .matches(/^[A-Z]{1,3}$/, "Invalid driving license type")
      .required("Driving license type is required"),
    description: Yup.string()
      .max(30, "You can enter at most 30 characters")
      .required("Description is required"),
    licenseLevel: Yup.number()
      .min(0, "License level must be at least 0")
      .required("License level is required"),
  });

  const initialValues = {
    name: "",
    description: "",
    licenseLevel: 0,
  };

  return (
    <SideBar>
    <div className="container-card">
      <div className="form">
        <h2 className="h2-card">Add Driving License Type</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            handleAddDrivingLicenseType(values);
          }}
          enableReinitialize={true}
        >
          
            <Form>
              <div className="row-add-carModel">
                <div id="select-block" className="col-md-6" style={{ marginTop: '110px' }}>
                  <div className="mb-2">
                    <FormikInput
                      name="name"
                      label="Driving License Type"
                      placeHolder="Enter driving license type."
                      type="text"
                    />
                    <FormikInput
                      name="description"
                      label="Description"
                      placeHolder="Enter description."
                      type="text"
                    />
                    <FormikInput
                      name="licenseLevel"
                      label="Level"
                      placeHolder="Enter level."
                      type="number"
                    />
                    <Button style={{ marginTop: '30px', backgroundColor: "rgb(140,24,24)", color: "white", width: "200px", borderRadius: "10px", marginLeft: "140px" }} type='submit'>Add</Button>
                  </div>
                </div>
              </div>
            </Form>
            {errorCustom && <Alert severity="error">{errorCustom}</Alert>}
        {!errorCustom && successMessage && (
          <Alert severity="success">{successMessage}</Alert>
        )}
          
        </Formik>
      </div>
    </div>
    </SideBar>
  );
};
export default AddDrivingLicenseType;
