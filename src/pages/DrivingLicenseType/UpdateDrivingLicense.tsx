import React, { useEffect, useState } from 'react'
import { useAppDispatch } from '../../store/useAppDispatch';
import { useParams } from 'react-router-dom';
import { DrivingLicenseTypeModel } from '../../models/Responses/DrivingLicenseType/DrivingLicenseTypeModel';
import { useAppSelector } from '../../store/useAppSelector';
import { RootState } from '../../store/configureStore';
import { fetchDrivingLicenseTypes, getByIdDrivingLicenseType, updateDrivingLicenseType } from '../../store/slices/drivingLicenseTypeSlice';
import * as Yup from "yup";
import { Form, Formik } from "formik";
import SideBar from '../../components/Sidebar/SideBar';
import FormikInput from '../../components/FormikInput/FormikInput';
import { Button } from "@mui/joy";
import { Alert } from "@mui/material";

const UpdateDrivingLicenseType = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const drivingLicenseTypeId = parseInt(id ?? "", 10);
  const [isSubmited, setIsSubmited] = useState<Boolean>(false);
  const [drivingLicenseType, setDrivingLicenseType] = useState<DrivingLicenseTypeModel>();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const errorCustom = useAppSelector((state: RootState) => state.drivingLicenseType.error);

  useEffect(() => {
    if (isSubmited) {
      fetchData();
      setIsSubmited(false);
    } else fetchData();
  }, [id, isSubmited]);
  const fetchData = async () => {
    try {
      const newResponse = await dispatch(getByIdDrivingLicenseType({ id: drivingLicenseTypeId }));
      setDrivingLicenseType((newResponse as any)?.payload);

      dispatch(fetchDrivingLicenseTypes());
    } catch (error) {
      console.error("Error fetching data: ", error);
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
    id: drivingLicenseTypeId,
    name: drivingLicenseType?.name,
    description: drivingLicenseType?.description,
    licenseLevel: drivingLicenseType?.licenseLevel
  };

  const handleUpdateDrivingLicenseType = async (values: any) => {
    try {
      const response = await dispatch(updateDrivingLicenseType(values));
      // On successful operation
      setSuccessMessage("Operation completed successfully");
    } catch (error) {
      console.error("Error updating shift type: ", error);
      // In case of error
      setErrorMessage("An error occurred during the operation");
    }
  };


  return (
    <SideBar>
    <div className="container-card">
      <div className="form">
        <h2 className="h2-card">Update Driving License Type</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            handleUpdateDrivingLicenseType(values);
          }}
          enableReinitialize={true}
        >
          <Form>
              <div className="row-update-drivingLicenseType">
                <div
                  id="select-block"
                  className="col-md-6"
                  style={{ marginTop: "110px" }}
                >
                  <div className="mb-2">
                    <FormikInput
                      name="name"
                      label="Driving License Type"
                      placeHolder="Enter driving license type."
                      type="text"
                    />
                  </div>
                  <div className="mb-2">
                    <FormikInput
                      name="description"
                      label="Description"
                      placeHolder="Enter description."
                      type="text"
                    />
                  </div>
                  <div className="mb-2">
                    <FormikInput
                      name="licenseLevel"
                      label="Level"
                      placeHolder="Enter level."
                      type="number"
                    />
                  </div>
                  <Button
                    style={{
                      marginTop: "30px",
                      backgroundColor: "rgb(140,24,24)",
                      color: "white",
                      width: "200px",
                      borderRadius: "10px",
                      marginLeft: "140px",
                    }}
                    type="submit"
                  >
                    Update
                  </Button>
                </div>
              </div>
            </Form>
          
        </Formik>
        {errorCustom && <Alert severity="error">{errorCustom}</Alert>}
        {!errorCustom && successMessage && (
          <Alert severity="success">{successMessage}</Alert>
        )}
      </div>
    </div>
    </SideBar>
  )
}

export default UpdateDrivingLicenseType