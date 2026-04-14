import { useState } from "react";
import { addBrand } from "../../store/slices/brandSlice";
import { RootState } from "../../store/configureStore";
import SideBar from "../../components/Sidebar/SideBar";
import { Form, Formik } from "formik";
import FormikInput from "../../components/FormikInput/FormikInput";
import { Alert, Button } from "@mui/material";
import * as Yup from "yup";
import "./AddBrand.css";
import { useAppDispatch } from "../../store/useAppDispatch";
import { useAppSelector } from "../../store/useAppSelector";
import { addBrandImages } from "../../store/slices/imageSlice";

type Props = {};

const AddBrand = (props: Props) => {
  const dispatch = useAppDispatch();
  const [file, setFile] = useState<File | undefined>();
  const errorCustom = useAppSelector((state: RootState) => state.brand.error);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [imageError, setImageError] = useState("");
  const handleAddBrand = async (values: any) => {
    if (typeof file === "undefined") {
      setImageError("Please select an image");
      return;
    }

    const formData = new FormData();
    try {
      formData.append("image", file);
      const thunkParams = {
        image: formData,
        brandName: values.name,
      };
      const imageResponse = await dispatch(addBrandImages(thunkParams));
      if (imageResponse) {
        const brandImageEntityId = imageResponse.payload;
        const updatedValues = { ...values, brandImageEntityId };
        const response = await dispatch(addBrand(updatedValues));
        setSuccessMessage("Operation completed successfully");
      }
    } catch (error) {
      console.error("Error : ", error);
      // In case of error
      setErrorMessage("An error occurred during the operation");
    }
    window.location.href = "/adminPanel/brands";
  };
  const handleOnChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement & { files: FileList };

    const files = target.files;

    if (files) {
      setFile(target.files[0]);
      setImageError("");
    } else {
      // If no image is selected, set the error message
      setImageError("Please select an image");
    }
  };
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "Brand must be at least 2 characters")
      .matches(
        /^[a-zA-Z\s]+$/,
        "Brand can only contain letters"
      )
      .required("Enter brand"),
  });

  return (
    <Formik
      initialValues={{ name: "", logoImagePath: "" }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        handleAddBrand(values);
      }}
      enableReinitialize={true}
    >
      <SideBar>
        <div className="container-card">
          <div className="form">
            <h2 className="h2-card">Add Brand</h2>
            <Form>
              <div className="row-add-brand">
                <div
                  id="select-block"
                  className="col-md-6"
                  style={{ marginTop: "110px" }}
                >
                  <div className="mb-2">
                    <FormikInput
                      name="name"
                      label="Brand"
                      placeHolder="Enter brand."
                      type="text"
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
                      marginLeft: "140px",
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

export default AddBrand;
