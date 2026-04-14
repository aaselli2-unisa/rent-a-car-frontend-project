import React, { useState } from "react";
import { RootState } from "../../store/configureStore";
import { addEmployee } from "../../store/slices/employeeSlice";
import * as Yup from "yup";
import FormikInput from "../../components/FormikInput/FormikInput";
import { Form, Formik } from "formik";
import SideBar from "../../components/Sidebar/SideBar";
import { Button } from "@mui/joy";
import "./Employee.css";
import { useAppDispatch } from "../../store/useAppDispatch";
import { useAppSelector } from "../../store/useAppSelector";
import { Alert } from "@mui/material";
import { addUserImages } from "../../store/slices/imageSlice";
type Props = {};

const AddEmployee = (props: Props) => {
  const dispatch = useAppDispatch();
  const errorCustom = useAppSelector(
    (state: RootState) => state.employee.error
  );
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [imageError, setImageError] = useState("");
  const [file, setFile] = useState<File | undefined>();
  const handleAddEmployee = async (values: any) => {
    if (typeof file === "undefined") {
      setImageError("Please select an image");
      return;
    }

    const formData = new FormData();
    try {
      formData.append("image", file);
      const thunkParams = {
        image: formData,
        emailAddress: values.emailAddress,
      };
      const imageResponse = await dispatch(addUserImages(thunkParams));
      if (imageResponse) {
        const userImageEntityId = imageResponse.payload;
        const updatedValues = { ...values, userImageEntityId };
        const response = await dispatch(addEmployee(updatedValues));
        setSuccessMessage("Operation completed successfully");
      }
    } catch (error) {
      console.error("Error : ", error);
      // In case of error
      setErrorMessage("An error occurred during the operation");
    }
    window.location.href = "/adminPanel/employees";
  };
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .matches(
        /^[a-zA-Z\s]+$/,
        "Name can only contain letters"
      )
      .required("Enter name"),
    surname: Yup.string()
      .matches(
        /^[a-zA-Z\s]+$/,
        "Surname can only contain letters"
      )
      .required("Enter surname"),
    emailAddress: Yup.string().required("Enter email address"),
    password: Yup.string()
      .required("Enter password")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character"
      ),
    phoneNumber: Yup.string()
      .matches(/^[0-9]+$/, "Phone number can only contain digits")
      .min(10, "Phone number must be 10 digits")
      .max(10, "Phone number must be 10 digits")
      .required("Enter phone number"),
    salary: Yup.number()
      .min(0, "Salary must be at least 0")
      .required("Enter salary"),
  });
  const initialValues = {
    name: "",
    surname: "",
    emailAddress: "",
    password: "",
    phoneNumber: "",
    salary: 0
  };
  const handleOnChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement & { files: FileList };

    const files = target.files;

    if (files) {
      setFile(target.files[0]);
      setImageError("");
    } else {
      // Set an error message if image is not selected
      setImageError("Please select an image");
    }
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        handleAddEmployee(values);
      }}
      enableReinitialize={true}
    >
      <SideBar>
        <div className="container-card">
          <div className="form">
            <h2 className="h2-card">Add Employee</h2>
            <Form>
              <div className="row-add-employee">
                <div
                  id="select-block"
                  className="col-md-6"
                  style={{ marginTop: "110px" }}
                >
                  <div className="mb-2">
                    <FormikInput
                      name="name"
                      label="Name"
                      placeHolder="Enter name."
                      type="text"
                    />
                  </div>
                  <div className="mb-2">
                    <FormikInput
                      name="surname"
                      label="Surname"
                      placeHolder="Enter surname."
                      type="text"
                    />
                  </div>
                  <div className="mb-2">
                    <FormikInput
                      name="emailAddress"
                      label="Email Address"
                      placeHolder="Enter email address."
                      type="text"
                    />
                  </div>
                  <div className="mb-2">
                    <FormikInput
                      name="password"
                      label="Password"
                      placeHolder="Enter password."
                      type="text"
                    />
                  </div>
                </div>
                <div
                  id="input-block"
                  className="col-md-6"
                  style={{ marginTop: "110px" }}
                >
                  <div className="mb-2">
                    <FormikInput
                      name="phoneNumber"
                      label="Phone Number"
                      placeHolder="Enter phone number."
                      type="text"
                    />
                  </div>
                  <div className="mb-2">
                    <FormikInput
                      name="salary"
                      label="Salary"
                      placeHolder="Enter salary."
                      type="number"
                    />
                  </div>
                  
                  <div className="mb-2">
                    <input type="file" name="image" onChange={handleOnChange} />
                    {imageError && <Alert severity="error">{imageError}</Alert>}
                  </div>
                  <Button
                    style={{
                      marginTop: "30px",
                      backgroundColor: "rgb(140,24,24)",
                      color: "white",
                      width: "200px",
                      borderRadius: "10px",
                      marginLeft: "40px",
                    }}
                    type="submit"
                  >
                    Add
                  </Button>
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

export default AddEmployee;
