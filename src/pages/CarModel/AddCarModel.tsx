import React, { useEffect, useState } from 'react'
import { RootState } from '../../store/configureStore';
import { addCarModel } from '../../store/slices/carModelSlice';
import { fetchBrands } from '../../store/slices/brandSlice';
import { Button } from "@mui/joy";
import * as Yup from "yup";
import FormikInput from "../../components/FormikInput/FormikInput";
import { Form, Formik } from "formik";
import SideBar from "../../components/Sidebar/SideBar";
import FormikSelect from '../../components/FormikSelect/FormikSelect';
import './CarModel.css'
import { Alert } from "@mui/material";
import { useAppSelector } from '../../store/useAppSelector';
import { useAppDispatch } from '../../store/useAppDispatch';

type Props = {}

const AddCarModel = (props: Props) => {

  const dispatch = useAppDispatch();
  const [selectedValue, setSelectedValue] = useState({});
  const brandState =useAppSelector((state: any) => state.brand);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const errorCustom = useAppSelector((state: RootState) => state.carModel.error);
  
  useEffect(()=>{
    dispatch(fetchBrands())
  },[dispatch])

  const handleAddCarModel =async (values: any) => {
  
      try {
        const response = await dispatch(addCarModel(values));
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
    carModelEntityName: Yup.string()
      .min(2, "Model must be at least 2 characters")
      .required("Enter model"),
    brandEntityId: Yup.number().required('Select brand'),
  });
  const initialValues = {
    brandEntityId: "",
    carModelEntityName:"",
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        setSelectedValue(values);
        handleAddCarModel(values);
      }}
      enableReinitialize={true}
    >
    <SideBar>
        <div className="container-card">
        <div className="form">
          <h2 className="h2-card">Add Model</h2>
          <Form>
            <div className="row-add-carModel">
              <div id="select-block" className="col-md-6" style={{marginTop:'110px'}}>
                <div className="mb-2">
                    <FormikSelect
                      label="Brand"
                      name="brandEntityId"
                      options={brandState.brands.map((brands: any) => ({ value: brands.id, label: brands.name }))}
                    />
                </div>
                <div className="mb-2">
                  <FormikInput
                    name="carModelEntityName"
                    label="Model"
                    placeHolder="Enter model."
                    type="text"
                  />
                </div>
                <Button style={{marginTop:'30px', backgroundColor: "rgb(140,24,24)", color:"white", width:"200px" , borderRadius:"10px", marginLeft:"140px" }} type='submit'>Add</Button>
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

export default AddCarModel