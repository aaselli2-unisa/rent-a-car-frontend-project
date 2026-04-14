import React, { useEffect, useState } from "react";
import { Tabs, Tab } from "react-bootstrap";
import "./SelectedCar.css";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/configureStore";
import { addShowRental } from "../../store/slices/showRentalSlice";
import { useLocation } from "react-router";
import ShowRental from "../../components/ShowRental/ShowRental";
import moment from "moment";
import useToken from "../../utils/useToken";
import { AddShowRentalResponse } from "../../models/Responses/Rental/AddShowRentalResponse";
import CarCart from "../../components/CarCart/CarCart";
import { AllGetByDateCarResponse } from "../../models/Responses/Car/AllGetByDateCarResponse";
import Payment from "../../components/Payment/Payment";
import RentalDetail from "../../components/RentalDetail/RentalDetail";
import { Alert } from "@mui/material";

const SelectedCar: React.FC<{
  response: AllGetByDateCarResponse | undefined;
}> = ({ response }) => {
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const carsFromStore = useSelector((state: RootState) => state.car.cars);
  const startDateString = location?.state?.startDate || "";
  const endDateString = location?.state?.endDate || "";

  const { decodedToken } = useToken();
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [rentalResponse, setRentalResponse] = useState<
    AddShowRentalResponse | undefined
  >();
  const [lastAmount, setLastAmount] = useState<number>(0);
  const [showRentalLoading, setShowRentalLoading] = useState(false);
  const [showRentalError, setShowRentalError] = useState<string>("");
  const startDate = moment(startDateString).format("YYYY-MM-DD");
  const endDate = moment(endDateString).format("YYYY-MM-DD");

  const handleCarButtonClick = async (
    discountCode: string,
    carEntityId: number,
    startDate: Date | string,
    endDate: Date | string,
    customerEntityId?: number
  ) => {
    const startDateValue =
      startDate instanceof Date
        ? startDate.toISOString().split("T")[0]
        : startDate;
    const endDateValue =
      endDate instanceof Date ? endDate.toISOString().split("T")[0] : endDate;

    setShowRentalError("");
    setShowRentalLoading(true);
    setActiveTab("tab2");

    const availableCars = response?.response ?? carsFromStore ?? [];
    const selectedCar = availableCars.find((car) => car.id === carEntityId);
    if (selectedCar) {
      setRentalResponse({
        response: {
          customerDTO: {
            id: decodedToken?.id ?? -1,
            phoneNumber: decodedToken?.phoneNumber ?? "",
            drivingLicenseNumber: "",
            drivingLicenseTypeEntityName: "",
            name: decodedToken?.firstname ?? "",
            surname: decodedToken?.lastname ?? "",
            emailAddress: decodedToken?.emailAddress ?? "",
            authorities: decodedToken?.role ?? [],
          },
          carDTO: {
            id: selectedCar.id,
            isLicenseTypeSuitable: selectedCar.isLicenseTypeSuitable,
            carModelEntityBrandEntityName: selectedCar.carModelEntityBrandEntityName,
            carModelEntityName: selectedCar.carModelEntityName,
            colorEntityName: selectedCar.colorEntityName,
            year: selectedCar.year,
            carBodyTypeEntityName: selectedCar.carBodyTypeEntityName,
            fuelTypeEntityName: selectedCar.fuelTypeEntityName,
            shiftTypeEntityName: selectedCar.shiftTypeEntityName,
            seat: selectedCar.seat,
            luggage: selectedCar.luggage,
            details: selectedCar.details,
            rentalPrice: selectedCar.rentalPrice,
            licensePlate: selectedCar.licensePlate,
            kilometer: selectedCar.kilometer,
            imageEntityImageUrl: selectedCar.imagesEntityImagePaths?.[0] || "",
            availabilityDate: new Date(),
            expectedMinDrivingLicenseTypeName: selectedCar.expectedDrivingLicenseTypes?.[0] || "",
            vehicleStatusEntityName: selectedCar.vehicleStatusEntityName,
          },
          startDate: new Date(startDateValue),
          endDate: new Date(endDateValue),
          discountCode,
          amount: selectedCar.rentalPrice,
        },
      });
    }

    try {
      const showRentalPayload: any = {
        discountCode,
        carEntityId,
        startDate: startDateValue,
        endDate: endDateValue,
      };

      if (customerEntityId) {
        showRentalPayload.customerEntityId = customerEntityId;
      }

      const response = await dispatch(
        addShowRental(showRentalPayload)
      );

      if (response.payload) {
        setRentalResponse(response.payload as AddShowRentalResponse);
        setShowRentalError("");
      } else {
        console.warn("Using local rental preview because backend returned no payload.");
      }
    } catch (error) {
      console.error("Error adding show rental:", error);
      setShowRentalError("Unable to load rental information from API. Showing preview instead.");
    } finally {
      setShowRentalLoading(false);
    }
  };

  const handleRentDetailsButtonClick = () => {
    setActiveTab("tab3");
  };

  const handlePaymentProcessButtonClick = () => {
    setActiveTab("tab4");
  };

  useEffect(() => {
    setActiveTab("tab1");
  }, []);
  return (
    <div className="container-card">
    <Tabs
      activeKey={activeTab || undefined}
      className="custom-tabs"
      onSelect={(key) => setActiveTab(key as string)}
    >
      
      <Tab
        eventKey="tab1"
        title={
          <div
            className={
              activeTab === "tab1" ? "tab-title active-tab" : "tab-title"
            }
          >
            Your Vehicle
          </div>
        }
      >
        
        <CarCart
          onButtonClick={(carEntityId) => {
            const formattedStartDate = new Date(`${startDate}T00:00:00.000Z`)
              .toISOString()
              .split("T")[0];
            const formattedEndDate = new Date(`${endDate}T00:00:00.000Z`)
              .toISOString()
              .split("T")[0];

            handleCarButtonClick(
              "",
              carEntityId,
              formattedStartDate,
              formattedEndDate,
              decodedToken?.id
            );
          }}
          startDate={startDate}
          endDate={endDate}
        />
      </Tab>
      {showRentalError && (
        <Alert severity="error" style={{ marginTop: 12 }}>
          {showRentalError}
        </Alert>
      )}

      <Tab
        eventKey="tab2"
        title={
          <div
            className={
              activeTab === "tab2" ? "tab-title active-tab" : "tab-title "
            }
          >
            Rental Details
          </div>
        }
        disabled={activeTab !== "tab2" && activeTab !== "tab3" && activeTab !== "tab4"}
      >
        <div className="tab-content">
          <ShowRental
            key={JSON.stringify(rentalResponse)}
            response={rentalResponse}
            onPaymentProcessClick={handleRentDetailsButtonClick}
            isLoading={showRentalLoading}
          />
        </div>
      </Tab>
      <Tab
        eventKey="tab3"
        title={
          <div
            className={
              activeTab === "tab3" ? "tab-title active-tab" : "tab-title "
            }
          >
            Payment Process
          </div>
        }
        disabled={activeTab !== "tab3" && activeTab !== "tab4"}
      >
        <div className="tab-content">
          <Payment
            response={rentalResponse}
            onPaymentProcessClick={handlePaymentProcessButtonClick}
            startDate={startDate}
            endDate={endDate}
            setLastAmount={setLastAmount}
          />
        </div>
      </Tab>
      <Tab
        eventKey="tab4"
        title={
          <div
            className={
              activeTab === "tab4" ? "tab-title active-tab" : "tab-title"
            }
          >
            Payment Details
          </div>
        }
        disabled={activeTab !== "tab4"}
      >
        <RentalDetail
            key={JSON.stringify(rentalResponse)}
            response={rentalResponse}
            onPaymentProcessClick={handleRentDetailsButtonClick}
            lastAmount={lastAmount}
          />
      </Tab>
    </Tabs>
    </div>
  );
};

export default SelectedCar;
