import React, { useEffect, useState, Dispatch, SetStateAction } from "react";
import { AddShowRentalResponse } from "../../models/Responses/Rental/AddShowRentalResponse";
import { useDispatch, useSelector } from "react-redux";
import { Container, TextField, Grid, Button } from "@mui/material";
import CreditCardForm from "../CreditCardForm/CreditCardForm";
import { AppDispatch } from "../../store/configureStore";
import { addRental } from "../../store/slices/showRentalSlice";
import { fetchPaymentTypes } from "../../store/slices/paymentTypeSlice";
import './Payment.css';
interface CreditCardInfo {
  cardNumber: string;
  cardOwnerName: string;
  cardOwnerSurname: string;
  expirationDate: Date;
  cvc: string;
}

const Payment: React.FC<{
  startDate: Date | string;
  endDate: Date | string;
  response: AddShowRentalResponse | undefined;
  onPaymentProcessClick: () => void;
  setLastAmount: Dispatch<SetStateAction<number>>;
}> = ({
  startDate,
  endDate,
  response,
  onPaymentProcessClick,
  setLastAmount,
}) => {
  const [lastAmount, setLastAmountLocal] = useState<number>(0);
  const carsState = useSelector((state: any) => state.showRental.showRental);
  const dispatch = useDispatch<AppDispatch>();
  const paymentTypeState = useSelector((state: any) => state.paymentType);
  const [paymentResponse, setPaymentResponse] = useState<number | undefined>();
  const [selectedPaymentType, setSelectedPaymentType] = useState<number>(0);
  const availablePaymentTypes =
    paymentTypeState.paymentTypes.length > 0
      ? paymentTypeState.paymentTypes
      : [{ id: 1, name: "Credit Card" }];
  const [creditCardInfo, setCreditCardInfo] = useState<CreditCardInfo>({
    cardNumber: "",
    cardOwnerName: "",
    cardOwnerSurname: "",
    expirationDate: new Date(),
    cvc: "",
  });

  useEffect(() => {
    dispatch(fetchPaymentTypes());
    setLastAmountLocal(carsState[carsState.length - 1]?.response?.amount || 0);
  }, [carsState]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleCreditCardChange = (creditCardInfo: CreditCardInfo) => {
    setCreditCardInfo(creditCardInfo);
  };

  const selectedPaymentTypeModel = paymentTypeState.paymentTypes.find(
    (paymentType: any) => paymentType.id === selectedPaymentType
  );
  const isCreditCardSelected =
    selectedPaymentType === 1 ||
    selectedPaymentTypeModel?.name?.toLowerCase().includes("credit");

  const handleCalculateClick = async () => {
    const formattedStartDate =
      typeof startDate === "string"
        ? startDate
        : startDate.toISOString().split("T")[0];
    const formattedEndDate =
      typeof endDate === "string"
        ? endDate
        : endDate.toISOString().split("T")[0];
    const customerEntityId = response?.response.customerDTO.id;
    const carEntityId = response?.response.carDTO.id;

    if (customerEntityId !== undefined && carEntityId !== undefined) {
      const addRentalRequest = await dispatch(
        addRental({
          customerEntityId,
          carEntityId,
          startDate: formattedStartDate,
          endDate: formattedEndDate,
          paymentTypeId: selectedPaymentType,
          amount: lastAmount,
          discountCode: response?.response.discountCode,
          creditCardInformation: creditCardInfo,
        })
      );

      setPaymentResponse(lastAmount);
      setLastAmountLocal(lastAmount);

      onPaymentProcessClick();
    } else {
      console.error("Invalid customer or car ID.");
    }
  };

  const handleConfirmButtonClick = () => {
    handleCalculateClick();
    onPaymentProcessClick();
    setLastAmount(lastAmount);
  };
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const paymentTypeId = parseInt(e.target.value, 10);
    setSelectedPaymentType(paymentTypeId);
  };

  return (
    <div className="form">
      <div className="credit-cart-form">
        <div className="py-4">
          <h2>Price: {lastAmount}</h2>
        </div>
        <label htmlFor="paymentTypeSelect" className="form-label">
          Payment Method
        </label>
        <select
          id="paymentTypeSelect"
          className="credit-input"
          value={selectedPaymentType === 0 ? "" : selectedPaymentType}
          onChange={handleSelectChange}
        >
          <option value="" disabled>
            Select
          </option>
          {availablePaymentTypes.map((paymentType: any) => (
            <option key={paymentType.id} value={paymentType.id}>
              {paymentType.name}
            </option>
          ))}
        </select>
        {paymentTypeState.error ? (
          <p className="text-warning mt-2">
            {paymentTypeState.error} Using the default credit card option.
          </p>
        ) : null}
        {isCreditCardSelected && (
          <CreditCardForm onCreditCardChange={handleCreditCardChange} />
        )}

        <div className="d-grid" style={{ justifyItems: "end" }}>
          <button
            className="btn btn-dark"
            onClick={handleConfirmButtonClick}
            disabled={!isCreditCardSelected}
          >
            Pay
          </button>
        </div>
        {selectedPaymentType !== 0 && !isCreditCardSelected ? (
          <p className="text-danger">
            Payment can only be made by credit card.
          </p>
        ) : null}
      </div>
    </div>
  );
};

export default Payment;
