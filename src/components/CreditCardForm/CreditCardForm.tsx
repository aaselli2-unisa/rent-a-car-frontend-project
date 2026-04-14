import React, { useState } from "react";
import Cards from "react-credit-cards-2";
import { Focused } from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";

import "./CreditCardForm.css";

interface CreditCardChangeHandler {
  (creditCardInfo: any): void;
}

const CreditCardForm = ({
  onCreditCardChange,
}: {
  onCreditCardChange: CreditCardChangeHandler;
}) => {
  const [state, setState] = useState({
    cardNumber: "",
    cardOwnerName: "",
    cardOwnerSurname: "",
    expirationDate: "",
    cvc: "",
    focus: "",
  });

  const [expirationMonth, setExpirationMonth] = useState("");
  const [expirationYear, setExpirationYear] = useState("");

  const monthOptions = [
    { value: "01", label: "January" },
    { value: "02", label: "February" },
    { value: "03", label: "March" },
    { value: "04", label: "April" },
    { value: "05", label: "May" },
    { value: "06", label: "June" },
    { value: "07", label: "July" },
    { value: "08", label: "August" },
    { value: "09", label: "September" },
    { value: "10", label: "October" },
    { value: "11", label: "November" },
    { value: "12", label: "December" },
  ];

  // Create a dynamic list of years for selection
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => currentYear + i);
  const yearOptions = years.map((year) => ({
    value: year.toString(),
    label: year.toString(),
  }));

  const updateCardState = (nextState: Partial<typeof state>) => {
    setState((prevState) => {
      const updatedState = { ...prevState, ...nextState };
      onCreditCardChange(updatedState);
      return updatedState;
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "cardNumber") {
      const formattedValue = value.replace(/\D/g, "");
      const updatedValue = formattedValue.slice(0, 16);
      let formattedCardNumber = "";
      for (let i = 0; i < updatedValue.length; i++) {
        if (i > 0 && i % 4 === 0) {
          formattedCardNumber += " ";
        }
        formattedCardNumber += updatedValue[i];
      }
      updateCardState({ [name]: formattedCardNumber });
    } else if (name === "cvc" && /^\d{0,3}$/.test(value)) {
      if (/^\d*$/.test(value)) {
        updateCardState({ [name]: value });
      }
    } else {
      updateCardState({ [name]: value });
    }
  };

  const handleInputFocus = (
    e: React.FocusEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    setState((prev) => ({ ...prev, focus: e.target.name }));
  };

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedMonth = e.target.value;
    setExpirationMonth(selectedMonth);
    const formattedExpirationDate = `${expirationYear}-${selectedMonth}-01`;
    updateCardState({ expirationDate: formattedExpirationDate });
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedYear = e.target.value;
    setExpirationYear(selectedYear);
    const formattedExpirationDate = `${selectedYear}-${expirationMonth}-01`;
    updateCardState({ expirationDate: formattedExpirationDate });
  };

  return (
    <div className="credit-card-form">
      <Cards
        name={`${state.cardOwnerName} ${state.cardOwnerSurname}`.trim()}
        number={state.cardNumber}
        expiry={
          expirationMonth && expirationYear
            ? `${expirationMonth}/${expirationYear.slice(-2)}`
            : ""
        }
        cvc={state.cvc}
        focused={state.focus as Focused}
      />
      <div className="mt-3">
        <form>
          <div className="row g-3">
            <div className="col-12">
              <input
                type="text"
                name="cardNumber"
                className="card-control"
                placeholder="Card Number"
                value={state.cardNumber}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                required
              />
            </div>
            <div className="col-md-6 col-12">
              <input
                type="text"
                name="cardOwnerName"
                className="card-control"
                placeholder="First Name"
                value={state.cardOwnerName}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                required
              />
            </div>
            <div className="col-md-6 col-12">
              <input
                type="text"
                name="cardOwnerSurname"
                className="card-control"
                placeholder="Last Name"
                value={state.cardOwnerSurname}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                required
              />
            </div>
            <div className="col-md-4 col-12">
              <select
                name="expirationMonth"
                className="card-control"
                value={expirationMonth}
                onChange={handleMonthChange}
                onFocus={handleInputFocus}
                required
              >
                <option value="">Month</option>
                {monthOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-4 col-12">
              <select
                name="expirationYear"
                className="card-control"
                value={expirationYear}
                onChange={handleYearChange}
                onFocus={handleInputFocus}
                required
              >
                <option value="">Year</option>
                {yearOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-4 col-12">
              <input
                type="text"
                name="cvc"
                className="card-control"
                placeholder="CVC"
                maxLength={3}
                inputMode="numeric"
                value={state.cvc}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                required
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreditCardForm;
