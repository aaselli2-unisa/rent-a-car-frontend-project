import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchRentals, returnRental } from "../../store/slices/rentalSlice";
import "./ReturnRental.css";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "../../store/useAppDispatch";

type Props = {}

const ReturnRental = (props: Props) => {


  const dispatch = useAppDispatch();
  const rentalState = useSelector((state: any) => state.rental);

  const { id } = useParams();
  const rentalId = parseInt(id || '');
  
  const [endDate, setEndDate] = useState("");
  const [endKilometer, setEndKilometer] = useState(0);

  useEffect(() => {
    dispatch(fetchRentals())
  }, [dispatch])

  const handlePaymentTypeUpdateSuccess = () => {
      dispatch(returnRental({ returnDate: endDate, id: rentalId, endKilometer: endKilometer }));
      handleCancelUpdate();
      window.location.href = "/adminPanel/rentals";
    }



  const handleCancelUpdate = () => {
    setEndDate("");
    setEndKilometer(0);
    dispatch(fetchRentals());
  }

  return (
    <div className="container-card return-rental-container">
        <div className="form return-rental-form">
        <h2 className="h2-card">Complete Rental</h2>
        <div className="returnRental">
            <p style={{textAlign:'center', marginTop:'100px'}}><label htmlFor="endDate">End Date:</label></p>
            <input
                type="date"
                id="endDate"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
            />
            </div>
        
        
        <div className="returnRental">
        <p style={{textAlign:'center', marginTop:'20px'}}><label htmlFor="endKilometer">Current km:</label></p>
            <input
                type="number"
                id="endKilometer"
                value={endKilometer}
                onChange={(e) => setEndKilometer(parseInt(e.target.value))}
            />
        </div>
        <div className="form-actions return-rental-action">
        <button className='return-button' onClick={handlePaymentTypeUpdateSuccess}>Finish Rental</button>
        <button className='return-button' onClick={handleCancelUpdate}>Cancel</button>
        </div>
        </div>
    </div>
);
}

export default ReturnRental