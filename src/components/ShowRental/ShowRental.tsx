import React, { useState } from "react";
import { AddShowRentalResponse } from "../../models/Responses/Rental/AddShowRentalResponse";
import { addShowRental } from "../../store/slices/showRentalSlice";
import { AppDispatch } from "../../store/configureStore";
import { useDispatch } from "react-redux";
import "./ShowRental.css";
import "./DiscountInput.css";
import ShowCarCard from "./CarCard/ShowCarCard";
const ShowRental: React.FC<{
  response: AddShowRentalResponse | undefined;
  onPaymentProcessClick: () => void;
  isLoading?: boolean;
}> = ({ response, onPaymentProcessClick, isLoading }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [discountCodeInput, setDiscountCodeInput] = useState("");
  const [calculatedAmount, setCalculatedAmount] = useState<number | undefined>(
    undefined
  );


  if (!response) {
    return <div>{isLoading ? "Loading rental information..." : "No rental information available."}</div>;
  }
  /* format date */
  const formatDate = (tarih: Date | string) => {
    const dateObject = new Date(tarih);
    if (!isNaN(dateObject.getTime())) {
      const gun = dateObject.getDate().toString().padStart(2, "0");
      const ay = (dateObject.getMonth() + 1).toString().padStart(2, "0");
      const yil = dateObject.getFullYear().toString();
      return `${gun}.${ay}.${yil}`;
    } else {
      return "Invalid Date";
    }
  };

  const calculateTotalDays = (startDate: Date, endDate: Date): number => {
    const oneDay = 24 * 60 * 60 * 1000;
    const start = new Date(startDate);
    const end = new Date(endDate);

    const startTime = Date.UTC(
      start.getFullYear(),
      start.getMonth(),
      start.getDate()
    );
    const endTime = Date.UTC(end.getFullYear(), end.getMonth(), end.getDate());

    return Math.round(Math.abs((startTime - endTime) / oneDay));
  };

  const { customerDTO, carDTO, startDate, endDate, amount } =
    response.response;

  const handleCalculateClick = async () => {
    const newAmountResponse = await dispatch(
      addShowRental({
        discountCode: discountCodeInput,
        carEntityId: carDTO.id,
        startDate: startDate,
        endDate: endDate,
        customerEntityId: customerDTO.id,
      })
    );

    if (newAmountResponse.payload) {
      setCalculatedAmount((newAmountResponse.payload as AddShowRentalResponse)?.response.amount);
    }
  };

  /* const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  }; */

  return (
    <div className="show-rental-container mt-4">
      <div className="text-white firstHeaderText">
        <h3>Rental Details</h3>
      </div>
      <div className="line"></div>

      <div className="row">
        {/* CarCard */}
        <div className="col-md-6">
          <div>
            {response && response.response.carDTO && (
              <ShowCarCard carDTO={response.response.carDTO} />
            )}
          </div>
        </div>

        {/* Rental Details */}
        <div className="col-md-6">
          <div className="text-white">
            <h5 className="second-header">Customer Information:</h5>
            <div className="customer-info-container">
              <div className="label-value-pair">
                <div>
                  <p>Name:</p>
                  <p>Surname:</p>
                  <p>Email Address:</p>
                  <p>Contact Number:</p>
                  <p>License Type:</p>
                </div>
              </div>
              <div className="customer-values text-grey">
                <div>
                  <p>{customerDTO.name}</p>
                  <p>{customerDTO.surname}</p>
                  <p>{customerDTO.emailAddress}</p>
                  <p>{customerDTO.phoneNumber}</p>
                  <p>{customerDTO.drivingLicenseTypeEntityName}</p>
                </div>
              </div>
            </div>

            <h5 className="second-header">Vehicle Information:</h5>
            <div className="car-info-container">
              <div className="label-value-pair text-grey">
                <p>Brand:</p>
                <p>Model:</p>
                <p>Color:</p>
                <p>Year:</p>
              </div>
              <div className="car-info-values">
                <div>
                  <p>{carDTO.carModelEntityBrandEntityName}</p>
                  <p>{carDTO.carModelEntityName}</p>
                  <p>{carDTO.colorEntityName}</p>
                  <p>{carDTO.year}</p>
                </div>
              </div>
            </div>

            <h4 className="second-header-center">Rental Dates</h4>
            <div className="rental-dates-container">
              <div className="rental-date-values">
                {formatDate(startDate)} - {formatDate(endDate)}
              </div>
            </div>
          </div>

          {/* Discount code and calculate button */}
          <div className="mb-3 asd">
            {/* Price*/}
            <div style={{ float: "left", marginTop:'auto'}}>
              <p style={{ color: "white" }}>
                <strong
                  style={{
                    alignSelf: "flex-start",
                    color: "white",
                    alignItems: "center",
                  }}
                >
                  {calculateTotalDays(startDate, endDate)}
                </strong>{" "}
                Daily price:
                <strong style={{ color: "white" , fontSize:'20px'}}>
                  {" "}
                  {calculatedAmount !== undefined
                    ? calculatedAmount
                    : amount}{" "}
                  TL
                </strong>
              </p>
            </div>

            <div>
            <div className="input-container">
              <input
                value={discountCodeInput}
                onChange={(e) =>
                  setDiscountCodeInput(e.target.value.toUpperCase().trim())
                }
                className="custom-input"
                placeholder="discount code"
                style={{ width: "210px", height: "50px" }}
              ></input>
              <button onClick={handleCalculateClick} className="discountButton">Apply</button>
            </div>
          </div>
          </div>

          {/* checkbboxes */}
          <div>
            <div className="checkbox-container">
              <input
                type="checkbox"
                id="termsCheckbox"
                /* checked={isChecked}
        onChange={handleCheckboxChange} */
                className="checkbox-input"
              />
                <label htmlFor="termsCheckbox" className="checkbox-label">
                ExtendRent
                <a
                  href="/link/to/terms"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {" "}
                  terms of use
                </a>{" "}
                I have read, understood, and accept.
              </label>
            </div>

            <div className="checkbox-container">
              <input
                type="checkbox"
                id="termsCheckbox"
                /* checked={isChecked}
        onChange={handleCheckboxChange} */
                className="checkbox-input"
              />
              <label htmlFor="termsCheckbox" className="checkbox-label">
                <a
                  href="/link/to/terms"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Rental terms
                </a>{" "}
                I have read, understood, and accept.
              </label>
            </div>
          </div>
        </div>
        <button onClick={onPaymentProcessClick} className="mt-2 pay-button">
          Proceed to Payment
        </button>
      </div>
    </div>
  );
};

export default ShowRental;
