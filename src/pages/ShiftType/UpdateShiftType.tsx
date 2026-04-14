import { useEffect, useState } from 'react'
import { useAppDispatch } from '../../store/useAppDispatch';
import { useParams } from 'react-router';
import { ShiftTypeModel } from '../../models/Responses/ShiftTypes/ShiftTypeModel';
import { fetchShiftTypes, getByIdShiftType, updateShiftType } from '../../store/slices/shiftTypeSlice';
import * as Yup from "yup";
import { Form, Formik } from "formik";
import SideBar from '../../components/Sidebar/SideBar';
import FormikInput from '../../components/FormikInput/FormikInput';
import { Button } from "@mui/joy";
import { Alert } from "@mui/material";
import { useAppSelector } from '../../store/useAppSelector';
import { RootState } from '../../store/configureStore';


const UpdateShiftType = () => {
  
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const shiftTypeId = parseInt(id ?? "", 10);
  const [isSubmited, setIsSubmited] = useState<Boolean>(false);
  const [shiftType, setShiftType] = useState<ShiftTypeModel>();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const errorCustom = useAppSelector((state: RootState) => state.shiftType.error);

  useEffect(() => {
    if (isSubmited) {
      fetchData();
      setIsSubmited(false);
    } else fetchData();
  }, [id, isSubmited]);
  const fetchData = async () => {
    try {
      const newResponse = await dispatch(getByIdShiftType({ id: shiftTypeId }));
      setShiftType((newResponse as any)?.payload);

      dispatch(fetchShiftTypes());
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required("Enter shift type.")
      .min(2, 'Shift type must be at least 2 characters')
      .matches(/^[a-zA-Z\s]+$/, 'Shift type can only contain letters')
  });

  const initialValues = {
    id: shiftTypeId,
    name: shiftType?.name,
  };

  const handleUpdateShiftType = async (values: any) => {
    try {
      const response = await dispatch(updateShiftType(values));
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
        <h2 className="h2-card">Update Shift Type</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            handleUpdateShiftType(values);
          }}
          enableReinitialize={true}
        >
          

            <Form>
              <div className="row-update-shiftType">
                <div
                  id="select-block"
                  className="col-md-6"
                  style={{ marginTop: "110px" }}
                >
                  <div className="mb-2">
                    <FormikInput
                      name="name"
                      label="Shift Type"
                      placeHolder="Enter shift type."
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

export default UpdateShiftType