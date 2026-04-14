import React, { useEffect, useState } from "react";
import {  RootState } from "../../store/configureStore";
import { useParams } from "react-router-dom";
import {
  fetchCarBodyTypes,
  getByIdCarBodyType,
  updateCarBodyType,
} from "../../store/slices/carBodyTypeSlice";
import { Button } from "@mui/joy";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import SideBar from "../../components/Sidebar/SideBar";
import FormikInput from "../../components/FormikInput/FormikInput";
import FormikSelect from "../../components/FormikSelect/FormikSelect";
import { GetByIdCarBodyType } from "../../models/Responses/CarBodyType/GetByIdCarBodyType";
import { useAppDispatch } from "../../store/useAppDispatch";
import { useAppSelector } from "../../store/useAppSelector";
import { Alert } from "@mui/material";
type Props = {};

const UpdateCarBodyType = (props: Props) => {
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const carBodyTypeId = parseInt(id ?? "", 10);
  const [isSubmited, setIsSubmited] = useState<Boolean>(false);
  const [carBodyType, setCarBodyType] = useState<GetByIdCarBodyType>();
  const carBodyTypeState = useAppSelector((state: any) => state.carBodyType);
  const [selectedValue, setSelectedValue] = useState({});
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const errorCustom = useAppSelector((state: RootState) => state.carBodyType.error);
  useEffect(() => {
    if (isSubmited) {
      fetchData();
      setIsSubmited(false);
    } else fetchData();
  }, [id, isSubmited]);
  const fetchData = async () => {
    try {
      const newResponse = await dispatch(
        getByIdCarBodyType({ id: carBodyTypeId })
      );
      setCarBodyType((newResponse as any)?.payload);
      console.log(newResponse);

      dispatch(fetchCarBodyTypes());
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };
  const validationSchema = Yup.object().shape({
    id: Yup.number().required("Select body type"),
    name: Yup.string()
      .min(2, "Body type must be at least 2 characters")
      .matches(/^[a-zA-Z\s]+$/, "Body type can only contain letters")
      .required("Enter body type"),
  });
  const initialValues = {
    id: carBodyType?.id,
    name: carBodyType?.name,
  };

  const handleUpdateCarModel = async (values: any) => {
    try {
      const response = await dispatch(updateCarBodyType(values));
      // On successful operation
      setSuccessMessage("Operation completed successfully");
      window.location.reload();
    } catch (error) {
      console.error("Error updating shift type: ", error);
      // In case of error
      setErrorMessage("An error occurred during the operation");
    }
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        setSelectedValue(values);
        handleUpdateCarModel(values);
      }}
      enableReinitialize={true}
    >
      <SideBar>
        <div className="container-card">
          <div className="form">
            <h2 className="h2-card">Update Body Type</h2>
            <Form>
              <div className="row-add-carModel">
                <div
                  id="select-block"
                  className="col-md-6"
                  style={{ marginTop: "110px" }}
                >
                  <div className="mb-2">
                    <FormikSelect
                      label="Select Body Type"
                      name="id"
                      options={carBodyTypeState.carBodyTypes.map(
                        (carBodyType: any) => ({
                          value: carBodyType.id,
                          label: carBodyType.name,
                        })
                      )}
                    />
                  </div>
                  <div className="mb-2">
                    <FormikInput
                      name="name"
                      label="Body Type"
                      placeHolder="Enter body type."
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

export default UpdateCarBodyType;
