import React, { useEffect } from "react";
import { useAppSelector } from "../../store/useAppSelector";
import { RootState } from "../../store/configureStore";
import { getByIdRental } from "../../store/slices/rentalSlice";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "../../store/useAppDispatch";

const PastRentalDetail = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const rentalId = parseInt(id || '');
  
  // Get data from Redux store
  const rentalResponse = useAppSelector((state: RootState) => state.rental.getByIdRental);

  // Fetch data with useEffect
  useEffect(() => {
    if (rentalId) {
      dispatch(getByIdRental({ id: rentalId }));
    } 
  }, [dispatch, rentalId]);

  // Show loading message if rentalResponse is not ready or empty
  if (!rentalResponse || rentalResponse.length === 0) {
    return <div>Loading...</div>;
  }

  // Get first item from rentalResponse array
  const rentalData = rentalResponse[0].response;

  // Build UI using data from rentalData object
  return (
    <div className="container-card">
      <div className="form">
        <h2 className="h2-card">My Rental History Details</h2>
        <ul>
          <li>
            <strong>ID:</strong> {rentalData.id}<br/>
            <strong>Customer Name:</strong> {rentalData.customerEntityName} {rentalData.customerEntitySurname}<br/>
            <strong>Brand:</strong> {rentalData.carEntityBrandEntityName}<br/>
            <strong>Model:</strong> {rentalData.carEntityModelEntityName}<br/>
            <strong>Color:</strong> {rentalData.carEntityColorEntityName}<br/>
            <strong>Body Type:</strong> {rentalData.carBodyTypeEntityName}<br/>
            <strong>Year:</strong> {rentalData.carEntityYear}<br/>
            <strong>Rental Price:</strong> {rentalData.carEntityRentalPrice}<br/>
            <strong>License Plate:</strong> {rentalData.carEntityLicensePlate}<br/>
            <strong>Start Date:</strong> {rentalData.startDate.toString()}<br/>
            <strong>End Date:</strong> {rentalData.endDate.toString()}<br/>
            <strong>Return Date:</strong> {rentalData.returnDate.toString()}<br/>
            <strong>Payment Amount:</strong> {rentalData.paymentDetailsEntityAmount}<br/>
            <strong>Payment Type:</strong> {rentalData.paymentDetailsEntityPaymentTypeEntityPaymentTypeName}<br/>
            <strong>Rental Status:</strong> {rentalData.rentalStatusEntityName}<br/>
            <strong>Discount Code:</strong> {rentalData.discountEntityDiscountCode}<br/>
            <strong>Active:</strong> {rentalData.active ? 'Yes' : 'No'}<br/>
            <strong>Deleted:</strong> {rentalData.deleted ? 'Yes' : 'No'}<br/>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default PastRentalDetail;
