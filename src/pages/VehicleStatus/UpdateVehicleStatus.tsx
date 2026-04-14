import { useEffect, useState } from 'react'
import * as Yup from "yup";
import { Form, Formik } from "formik";
import { useAppDispatch } from '../../store/useAppDispatch';
import { useParams } from 'react-router';
import { VehicleStatusModel } from '../../models/Responses/VehicleStatus/VehicleStatusModel';
import {
  fetchVehicleStatus,
  getByIdVehicleStatus,
  updateVehicleStatus
} from '../../store/slices/vehicleStatusSlice';
import { Button } from "@mui/joy";
import FormikInput from '../../components/FormikInput/FormikInput';
import SideBar from '../../components/Sidebar/SideBar';
import { Alert } from "@mui/material";
import { RootState } from '../../store/configureStore';
import { useAppSelector } from '../../store/useAppSelector';


const UpdateVehicleStatus = () => {

  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const vehicleStatusId = parseInt(id ?? "", 10);
  const [isSubmited, setIsSubmited] = useState<Boolean>(false);
  const [vehicleStatus, setVehicleStatus] = useState<VehicleStatusModel>();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const errorCustom = useAppSelector((state: RootState) => state.vehicleStatus.error);

  useEffect(() => {
    if (isSubmited) {
      fetchData();
      setIsSubmited(false);
    } else fetchData();
  }, [id, isSubmited]);
  const fetchData = async () => {
    try {
      const newResponse = await dispatch(getByIdVehicleStatus({ id: vehicleStatusId }));
      setVehicleStatus((newResponse as any)?.payload);

      dispatch(fetchVehicleStatus());
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required("Enter vehicle status.")
      .min(2, 'Vehicle status must be at least 2 characters')
      .matches(/^[a-zA-Z\s]+$/, 'Vehicle status can only contain letters'),
  });

  const initialValues = {
    id: vehicleStatusId,
    name: vehicleStatus?.name,
  };

  const handleUpdateVehicleStatus = async (values: any) => {
    try {
    const response = await dispatch(updateVehicleStatus(values))
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
        <h2 className="h2-card">Update Vehicle Status</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            handleUpdateVehicleStatus(values);
          }}
          enableReinitialize={true}
        >
          
            <Form>
              <div className="row-update-vehicleStatus">
                <div
                  id="select-block"
                  className="col-md-6"
                  style={{ marginTop: "110px" }}
                >
                  <div className="mb-2">
                    <FormikInput
                      name="name"
                      label="Vehicle Status"
                      placeHolder="Enter vehicle status."
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

export default UpdateVehicleStatus