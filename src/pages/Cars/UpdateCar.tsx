import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import FormikInput from "../../components/FormikInput/FormikInput";
import { Form, Formik } from "formik";
import SideBar from "../../components/Sidebar/SideBar";
import { Button } from "@mui/joy";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/configureStore";
import { useParams } from "react-router-dom";
import { getByCarId, updateCar } from "../../store/slices/carSlice";
import { fetchBrands } from "../../store/slices/brandSlice";
import { fetchCarModels } from "../../store/slices/carModelSlice";
import { fetchCarBodyTypes } from "../../store/slices/carBodyTypeSlice";
import { fetchColors } from "../../store/slices/colorSlice";
import { fetchVehicleStatus } from "../../store/slices/vehicleStatusSlice";
import { fetchShiftTypes } from "../../store/slices/shiftTypeSlice";
import { fetchFuelType } from "../../store/slices/fuelTypeSlice";
import { fetchDrivingLicenseTypes } from "../../store/slices/drivingLicenseTypeSlice";
import { fetchCarSegments } from "../../store/slices/carSegmentSlice";
import { CarModel } from "../../models/Responses/Car/CarModel";
import FormikSelect from "../../components/FormikSelect/FormikSelect";
import { addCarImages } from "../../store/slices/imageSlice";
import "./UpdateCar.css";
import { Alert } from "@mui/material";
import { useAppSelector } from "../../store/useAppSelector";
import { useAppDispatch } from "../../store/useAppDispatch";
type Props = {};

const UpdateCar = (props: Props) => {
  const { id } = useParams();
  const carId = parseInt(id || "");
  const [isSubmited, setIsSubmited] = useState<Boolean>(false);
  const [file, setFile] = useState<File | undefined>();
  const [car, setCar] = useState<CarModel>();
  const dispatch = useAppDispatch();
  const [selectedValue, setSelectedValue] = useState({});
  const brandState = useSelector((state: any) => state.brand);
  const carModelState = useSelector((state: any) => state.carModel);
  const carBodyTypeState = useSelector((state: any) => state.carBodyType);
  const colorState = useSelector((state: any) => state.color);
  const vehicleStatusState = useSelector((state: any) => state.vehicleStatus);
  const shiftTypeState = useSelector((state: any) => state.shiftType);
  const fuelTypeState = useSelector((state: any) => state.fuelType);
  const segmentState = useSelector((state: any) => state.carSegment);
  const expectedMinDrivingLicenseTypeState = useSelector(
    (state: any) => state.drivingLicenseType
  );

  const [errorMessage, setErrorMessage] = useState<string>("");
  const [imageError, setImageError] = useState("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const errorCustom = useAppSelector(
    (state: RootState) => state.imageLoad.error
  );
  useEffect(() => {
    if (isSubmited) {
      fetchData();
      setIsSubmited(false);
    } else fetchData();
  }, [id, isSubmited]);

  const fetchData = async () => {
    try {
      const newAmountResponse = await dispatch(getByCarId({ carId }));
      setCar((newAmountResponse as any)?.payload?.response);

      dispatch(fetchBrands());
      dispatch(fetchCarModels());
      dispatch(fetchCarBodyTypes());
      dispatch(fetchColors());
      dispatch(fetchVehicleStatus());
      dispatch(fetchShiftTypes());
      dispatch(fetchFuelType());
      dispatch(fetchDrivingLicenseTypes());
      dispatch(fetchCarSegments());
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const validationSchema = Yup.object().shape({
    year: Yup.number()
      .min(2005, "Year must be at least 2005")
      .max(2024, "Year must be at most 2024")
      .required("Enter year"),
    details: Yup.string()
      .max(500, "Description can be at most 500 characters")
      .required("Enter details"),
    rentalPrice: Yup.number()
      .min(110, "Rental price must be at least 110")
      .required("Enter vehicle price"),
    licensePlate: Yup.string()
      .matches(
        /^(\d{2}[ ]?[A-Za-z]{1,3}[ ]?\d{2}|\d{2}[ ]?[A-Za-z]{2}[ ]?\d{3})$/,
        "Enter a valid license plate"
      )
      .required("Enter license plate"),
    kilometer: Yup.number()
      .min(1, "Kilometer must be at least 1")
      .required("Enter kilometer"),
    seat: Yup.number()
      .min(1, "Seat count must be at least 1")
      .max(15, "Seat count must be at most 15")
      .required("Enter seat count"),
    luggage: Yup.number()
      .min(1, "Luggage count must be at least 1")
      .max(15, "Luggage count must be at most 15")
      .required("Enter luggage count"),
    brandEntityId: Yup.number().required("Select brand"),
    carModelEntityId: Yup.number().required("Select car model"),
    carBodyTypeEntityId: Yup.number().required("Select body type"),
    colorEntityId: Yup.number().required("Select color"),
    vehicleStatusEntityId: Yup.number().required("Select vehicle status"),
    shiftTypeEntityId: Yup.number().required("Select shift type"),
    fuelTypeEntityId: Yup.number().required("Select fuel type"),
    expectedMinDrivingLicenseTypeId: Yup.number().required(
      "Select driving license type"
    ),
    carSegmentEntityId: Yup.number().required("Select segment"),
  });

  const initialValues = {
    id: carId,
    year: car?.year,
    details: car?.details,
    rentalPrice: car?.rentalPrice,
    licensePlate: car?.licensePlate,
    kilometer: car?.kilometer,
    seat: car?.seat,
    luggage: car?.luggage,
    colorEntityId: car?.colorEntityId,
    brandEntityId: car?.carModelEntityBrandEntityId,
    carModelEntityId: car?.carModelEntityId,
    carBodyTypeEntityId: car?.carBodyTypeEntityId,
    vehicleStatusEntityId: car?.vehicleStatusEntityId,
    shiftTypeEntityId: car?.shiftTypeEntityId,
    fuelTypeEntityId: car?.fuelTypeEntityId,
    carSegmentEntityId: car?.carSegmentEntityId,
    expectedMinDrivingLicenseTypeId: car?.expectedMinDrivingLicenseTypeId,
    vehicleType: "CAR",
    carImageEntityId: car?.carImageEntityId,
  };
  const handleUpdateCar = async (values: any) => {
    try {
      if (typeof file === "undefined") {
        const updatedValues = { ...values };
        const response = await dispatch(updateCar(updatedValues));
        setSuccessMessage("Operation completed successfully");
      } else {
        const formData = new FormData();

        formData.append("image", file);
        const thunkParams = {
          image: formData,
          licensePlate: values.licensePlate,
        };
        const imageResponse = await dispatch(addCarImages(thunkParams));
        if (imageResponse) {
          const carImageEntityId = imageResponse.payload;
          const updatedValues = { ...values, carImageEntityId };
          const response = await dispatch(updateCar(updatedValues));
          setSuccessMessage("Operation completed successfully");
        }
      }
    } catch (error) {
      console.error("Error : ", error);
      // In case of error
      setErrorMessage("An error occurred during the operation");
    }
    window.location.href = "/adminPanel/cars";
  };
  const handleOnChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement & { files: FileList };

    const files = target.files;

    if (files) {
      setFile(target.files[0]);
      setImageError("");
    }
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        setSelectedValue(values);
        handleUpdateCar(values);
      }}
      enableReinitialize={true}
    >
      <SideBar>
        <div className="container-card">
          <div className="form">
            <h2 className="h2-card">Update Car</h2>
            <Form>
              <div className="row space">
                <div id="select-block" className="col-md-6">
                  <div className="mb-2">
                    <FormikSelect
                      label="Brand"
                      name="brandEntityId"
                      options={brandState.brands.map((brands: any) => ({
                        value: brands.id,
                        label: brands.name,
                      }))}
                    />
                  </div>

                  <div className="mb-2">
                    <FormikSelect
                      label="Car Model"
                      name="carModelEntityId"
                      options={carModelState.carModel.map((carModel: any) => ({
                        value: carModel.id,
                        label: carModel.name,
                      }))}
                    />
                  </div>

                  <div className="mb-2">
                    <FormikSelect
                      label="Body Type"
                      name="carBodyTypeEntityId"
                      options={carBodyTypeState.carBodyTypes.map(
                        (carBodyType: any) => ({
                          value: carBodyType.id,
                          label: carBodyType.name,
                        })
                      )}
                    />
                  </div>
                  <div className="mb-2">
                    <FormikSelect
                      label="Color"
                      name="colorEntityId"
                      options={colorState.colors.map((color: any) => ({
                        value: color.id,
                        label: color.name,
                      }))}
                    />
                  </div>
                  <div className="mb-2">
                    <FormikSelect
                      label="Vehicle Status"
                      name="vehicleStatusEntityId"
                      options={vehicleStatusState.vehicleStatuses.map(
                        (vehicleStatus: any) => ({
                          value: vehicleStatus.id,
                          label: vehicleStatus.name,
                        })
                      )}
                    />
                  </div>
                  <div className="mb-2">
                    <FormikSelect
                      label="Shift Type"
                      name="shiftTypeEntityId"
                      options={shiftTypeState.shiftTypes.map(
                        (shiftType: any) => ({
                          value: shiftType.id,
                          label: shiftType.name,
                        })
                      )}
                    />
                  </div>
                  <div className="mb-2">
                    <FormikSelect
                      label="Fuel Type"
                      name="fuelTypeEntityId"
                      options={fuelTypeState.fuelTypes.map((fuelType: any) => ({
                        value: fuelType.id,
                        label: fuelType.name,
                      }))}
                    />
                  </div>
                  <div className="mb-2">
                    <FormikSelect
                      label="Driving License Type"
                      name="expectedMinDrivingLicenseTypeId"
                      options={expectedMinDrivingLicenseTypeState.drivingLicenseTypes.map(
                        (drivingLicenseType: any) => ({
                          value: drivingLicenseType.id,
                          label: drivingLicenseType.name,
                        })
                      )}
                    />
                  </div>
                  <div className="mb-2">
                    <FormikSelect
                      label="Segment"
                      name="carSegmentEntityId"
                      options={segmentState.carSegments.map(
                        (carSegment: any) => ({
                          value: carSegment.id,
                          label: carSegment.name,
                        })
                      )}
                    />
                  </div>
                </div>
                <div id="input-block" className="col-md-6">
                  <div className="mb-2">
                    <FormikInput
                      name="year"
                      label="Year"
                      placeHolder="Enter year."
                      type="number"
                    />
                  </div>
                  <div className="mb-2">
                    <FormikInput
                      name="details"
                      label="Details"
                      placeHolder="Enter details."
                      type="text"
                    />
                  </div>
                  <div className="mb-2">
                    <FormikInput
                      name="rentalPrice"
                      label="Vehicle Price"
                      placeHolder="Enter vehicle price."
                      type="number"
                    />
                  </div>
                  <div className="mb-2">
                    <FormikInput
                      name="licensePlate"
                      label="License Plate"
                      placeHolder="Enter license plate."
                      type="text"
                    />
                  </div>
                  <div className="mb-2">
                    <FormikInput
                      name="kilometer"
                      label="Kilometer"
                      placeHolder="Enter kilometer."
                      type="number"
                    />
                  </div>
                  <div className="mb-2">
                    <FormikInput
                      name="seat"
                      label="Seat Count"
                      placeHolder="Enter seat count."
                      type="number"
                    />
                  </div>
                  <div className="mb-2">
                    <FormikInput
                      name="luggage"
                      label="Luggage Count"
                      placeHolder="Enter luggage count."
                      type="number"
                    />
                  </div>
                  <div className="mb-2">
                    <input type="file" name="image" onChange={handleOnChange} />
                    <img src={car?.imageEntityImageUrl} alt="Car Logo" />
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
                    {" "}
                    Update
                  </Button>
                  {errorCustom && <Alert severity="error">{errorCustom}</Alert>}
                  {!errorCustom && successMessage && (
                    <Alert severity="success">{successMessage}</Alert>
                  )}
                </div>
              </div>
            </Form>
          </div>
        </div>
      </SideBar>
    </Formik>
  );
};

export default UpdateCar;
