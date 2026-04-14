import React, { useEffect, useState } from 'react'
import { useAppDispatch } from '../../store/useAppDispatch';
import { useParams } from 'react-router';
import * as Yup from "yup";
import { Form, Formik } from "formik";
import SideBar from '../../components/Sidebar/SideBar';
import FormikInput from '../../components/FormikInput/FormikInput';
import { EmployeeModel } from '../../models/Responses/Employee/EmployeeModel';
import { useAppSelector } from '../../store/useAppSelector';
import { RootState } from '../../store/configureStore';
import { fetchEmployees, getByIdEmployee, updateEmployee } from '../../store/slices/employeeSlice';
import { Button } from "@mui/joy";
import { Alert } from "@mui/material";

type Props = {}

const UpdateEmployee = (props: Props) => {
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const employeeId = parseInt(id ?? "", 10);
  const [isSubmited, setIsSubmited] = useState<Boolean>(false);
  const [employee, setEmployee] = useState<EmployeeModel>();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const errorCustom = useAppSelector((state: RootState) => state.employee.error);

  useEffect(() => {
    if (isSubmited) {
      fetchData();
      setIsSubmited(false);
    } else fetchData();
  }, [id, isSubmited]);
  const fetchData = async () => {
    try {
      const newResponse = await dispatch(getByIdEmployee({ id: employeeId }));
      setEmployee((newResponse as any)?.payload);

      dispatch(fetchEmployees());
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
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
    imagePath: Yup.string().required("Enter photo"),
    authority: Yup.string().required("Enter authority"),
  });
  const initialValues = {
    id:employeeId,
    name:employee?.name ,
    surname: employee?.surname,
    emailAddress: employee?.email,
    password: "",
    phoneNumber: "",
    salary: employee?.salary,
    imagePath: "",
    authority: employee?.authority,
  };

  const handleUpdateEmployee = async (values: any) => {
    try {
      const response = await dispatch(updateEmployee(values));
      setSuccessMessage("Operation completed successfully");
    } catch (error) {
      console.error("Error updating discount code: ", error);
      setErrorMessage("An error occurred during the operation");
    }
  };



  return (
    <SideBar>
    <div className="container-card">
      <div className="form">
        <h2 className="h2-card">Update Employee</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            handleUpdateEmployee(values);
          }}
          enableReinitialize={true}
        >
          

            <Form>
              <div className="row-update-employee">
                <div
                  id="select-block"
                  className="col-md-6"
                  style={{ marginTop: "110px" }}
                >
                  <div className="mb-2">
                    <FormikInput
                      name="name"
                      label="Name"
                      placeHolder="Enter employee name."
                      type="text"
                    />
                  </div>
                  <div className="mb-2">
                    <FormikInput
                      name="surname"
                      label="Surname"
                      placeHolder="Enter surname"
                      type="text"
                    />
                  </div>
                  <div className="mb-2">
                    <FormikInput
                      name="emailAddress"
                      label="Email"
                      placeHolder="Enter email address"
                      type="text"
                    />
                  </div>
                  <div className="mb-2">
                    <FormikInput
                      name="password"
                      label="Password"
                      placeHolder="Enter password"
                      type="text"
                    />
                  </div>
                  <div className="mb-2">
                    <FormikInput
                      name="phoneNumber"
                      label="Phone"
                      placeHolder="Enter phone number"
                      type="text"
                    />
                  </div>
                  <div className="mb-2">
                    <FormikInput
                      name="salary"
                      label="Salary"
                      placeHolder="Enter salary"
                      type="number"
                    />
                  </div>
                  <div className="mb-2">
                    <FormikInput
                      name="authority"
                      label="Authority"
                      placeHolder="Enter authority"
                      type="text"
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

export default UpdateEmployee