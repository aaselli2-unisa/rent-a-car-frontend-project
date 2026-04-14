import { useEffect, useState } from 'react'
import { useAppDispatch } from '../../store/useAppDispatch';
import { useParams } from 'react-router';
import * as Yup from "yup";
import { Form, Formik } from "formik";
import SideBar from '../../components/Sidebar/SideBar';
import FormikInput from '../../components/FormikInput/FormikInput';
import { Button } from "@mui/joy";
import { Alert } from "@mui/material";
import { useAppSelector } from '../../store/useAppSelector';
import { RootState } from '../../store/configureStore';
import { DiscountCodeModel } from '../../models/Responses/DiscountCode/DiscountCodeModel';
import { fetchDiscountCodes, getByIdDiscountCode, updateDiscountCode } from '../../store/slices/discountCodeSlice';


const UpdateDiscountCode = () => {
  
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const discountCodeId = parseInt(id ?? "", 10);
  const [isSubmited, setIsSubmited] = useState<Boolean>(false);
  const [discountCode, setDiscountCode] = useState<DiscountCodeModel>();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const errorCustom = useAppSelector((state: RootState) => state.discountCode.error);

  useEffect(() => {
    if (isSubmited) {
      fetchData();
      setIsSubmited(false);
    } else fetchData();
  }, [id, isSubmited]);
  const fetchData = async () => {
    try {
      const newResponse = await dispatch(getByIdDiscountCode({ id: discountCodeId }));
      setDiscountCode((newResponse as any)?.payload);

      dispatch(fetchDiscountCodes());
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const validationSchema = Yup.object().shape({
    discountCode: Yup.string()
        .matches(/^[a-zA-Z0-9]+$/, "Must contain only letters and numbers")
        .required("Discount code is required"),
    discountPercentage: Yup.number()
        .min(5, "Discount rate must be at least 5")
        .max(90, "Discount rate must be at most 90")
        .typeError("Only numbers are accepted")
        .required("Discount rate is required")
});

const initialValues = {
  id: discountCodeId,
  discountCode: discountCode?.discountCode,
  discountPercentage:discountCode?.discountPercentage,
};
  const handleUpdateDiscountCode = async (values: any) => {
    try {
      const response = await dispatch(updateDiscountCode(values));
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
        <h2 className="h2-card">Update Discount Code</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            handleUpdateDiscountCode(values);
          }}
          enableReinitialize={true}
        >
          

            <Form>
              <div className="row-update-discountCode">
                <div
                  id="select-block"
                  className="col-md-6"
                  style={{ marginTop: "110px" }}
                >
                  <div className="mb-2">
                    <FormikInput
                      name="discountCode"
                      label="Discount Code"
                      placeHolder="Enter discount code."
                      type="text"
                    />
                  </div>
                  <div className="mb-2">
                    <FormikInput
                      name="discountPercentage"
                      label="Discount Percentage"
                      placeHolder="Enter discount percentage"
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

export default UpdateDiscountCode