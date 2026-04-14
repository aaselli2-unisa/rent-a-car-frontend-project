import React, { useState } from 'react';
import AddCar from '../Cars/AddCar';
import Cars from '../Cars/Cars';
import DeleteCar from '../Cars/DeleteCar';
import Brands from '../Brands/Brands';
import AddBrand from '../Brands/AddBrand';
import DeleteBrand from '../Brands/DeleteBrand';
import AddCarBodyType from '../CarBodyType/AddCarBodyType';
import CarBodyTypes from '../CarBodyType/CarBodyTypes';
import DeleteCarBodyType from '../CarBodyType/DeleteCarBodyType';
import AddCarModel from '../CarModel/AddCarModel';
import DeleteCarModel from '../CarModel/DeleteCarModel';
import CarModels from '../CarModel/CarModels';
import AddColor from '../Color/AddColor';
import Colors from '../Color/Colors';
import DeleteColor from '../Color/DeleteColor';
import AddDiscountCode from '../DiscountCode/AddDiscountCode';
import DiscountCodes from '../DiscountCode/DiscountCodes';
import DeleteDiscountCode from '../DiscountCode/DeleteDiscountCode';
import DeleteDrivingLicenseType from '../DrivingLicenseType/DeleteDrivingLicenseType';
import AddDrivingLicenseType from '../DrivingLicenseType/AddDrivingLicenseType';
import DrivingLicenseTypes from '../DrivingLicenseType/DrivingLicenseTypes';
import AddEmployee from '../Employee/AddEmployee';
import DeleteEmployee from '../Employee/DeleteEmployee';
import Employees from '../Employee/Employees';
import AddFuelType from '../FuelType/AddFuelType';
import FuelTypes from '../FuelType/FuelTypes';
import DeleteFuelType from '../FuelType/DeleteFuelType';
import PaymentTypes from '../PaymentType/PaymentTypes';
import AddShiftType from '../ShiftType/AddShiftType';
import ShiftTypes from '../ShiftType/ShiftTypes';
import DeleteShiftType from '../ShiftType/DeleteShiftType';
import VehicleStatuses from '../VehicleStatus/VehicleStatuses';
import './AdminPanel2.css';

const AdminPanel2: React.FC = () => {
  const [selectedAction, setSelectedAction] = useState<string | null>(null);

  const handleDropdownClick = (index: number) => {
    const dropdowns = document.querySelectorAll('.dropdown-container');
    const dropdownContent = dropdowns[index] as HTMLElement;
    dropdownContent.classList.toggle('active');

    const dropdownIcon = dropdownContent.previousElementSibling?.querySelector('i');
    if (dropdownIcon) {
      dropdownIcon.classList.toggle('fa-caret-up');
    }
  };

  return (

    <div style={{ display: 'flex' }}>
      <div style={{ width: '33%' }}>
      <div className="sidenav">
          <button className="dropdown-btn" onClick={() => handleDropdownClick(0)}>Car
            <i className="fa fa-caret-down"></i>
          </button>
          <div className="dropdown-container">
            <button onClick={() => setSelectedAction('AddCar')}>Add Car</button>
            <button onClick={() => setSelectedAction('UpdateCar')}>Update Car</button>
            <button onClick={() => setSelectedAction('DeleteCar')}>Delete Car</button>
          </div>
          <button className="dropdown-btn" onClick={() => handleDropdownClick(1)}>Brand
            <i className="fa fa-caret-down"></i>
          </button>
          <div className="dropdown-container">
            <button onClick={() => setSelectedAction('AddBrand')}>Add Brand</button>
            <button onClick={() => setSelectedAction('UpdateBrand')}>Update Brand</button>
            <button onClick={() => setSelectedAction('DeleteBrand')}>Delete Brand</button>
          </div>
        </div>
        


        {/* <li>
            <button onClick={() => setSelectedAction('AddCar')}>Add Car</button>
            <button onClick={() => setSelectedAction('UpdateCar')}>Update Car</button>
            <button onClick={() => setSelectedAction('DeleteCar')}>Delete Car</button>
          </li>
          <li>
            <button onClick={() => setSelectedAction('AddBrand')}>Add Brand</button>
            <button onClick={() => setSelectedAction('UpdateBrand')}>Update Brand</button>
            <button onClick={() => setSelectedAction('DeleteBrand')}>Delete Brand</button>
          </li>
          <li>
            <button onClick={() => setSelectedAction('AddCarBodyType')}>Add Car Type</button>
            <button onClick={() => setSelectedAction('UpdateCarBodyType')}>Update Car Type</button>
            <button onClick={() => setSelectedAction('DeleteCarBodyType')}>Delete Car Type</button>
          </li>
          <li>
            <button onClick={() => setSelectedAction('AddCarModel')}>Add Model</button>
            <button onClick={() => setSelectedAction('UpdateCarModel')}>Update Model</button>
            <button onClick={() => setSelectedAction('DeleteCarModel')}>Delete Model</button>
          </li>
          <li>
            <button onClick={() => setSelectedAction('AddColor')}>Add Color</button>
            <button onClick={() => setSelectedAction('UpdateColor')}>Update Color</button>
            <button onClick={() => setSelectedAction('DeleteColor')}>Delete Color</button>
          </li>
          <li>
            <button onClick={() => setSelectedAction('AddDiscountCode')}>Add Discount Code</button>
            <button onClick={() => setSelectedAction('UpdateDiscountCode')}>Update Discount Code</button>
            <button onClick={() => setSelectedAction('DeleteDiscountCode')}>Delete Discount Code</button>
          </li>
          <li>
            <button onClick={() => setSelectedAction('AddDrivingLicenseType')}>Add Driving License Type</button>
            <button onClick={() => setSelectedAction('UpdateDrivingLicenseType')}>Update Driving License Type</button>
            <button onClick={() => setSelectedAction('DeleteDrivingLicenseType')}>Delete Driving License Type</button>
          </li>
          <li>
            <button onClick={() => setSelectedAction('AddEmployee')}>Add Employee</button>
            <button onClick={() => setSelectedAction('UpdateEmployee')}>Update Employee</button>
            <button onClick={() => setSelectedAction('DeleteEmployee')}>Delete Employee</button>
          </li>
          <li>
            <button onClick={() => setSelectedAction('AddFuelType')}>Add Fuel Type</button>
            <button onClick={() => setSelectedAction('UpdateFuelType')}>Update Fuel Type</button>
            <button onClick={() => setSelectedAction('DeleteFuelType')}>Delete Fuel Type</button>
          </li>
          <li>
            <button onClick={() => setSelectedAction('UpdatePaymentType')}>Update Payment Type</button>
          </li>
          <li>
            <button onClick={() => setSelectedAction('AddShiftType')}>Add Shift Type</button>
            <button onClick={() => setSelectedAction('UpdateShiftType')}>Update Shift Type</button>
            <button onClick={() => setSelectedAction('DeleteShiftType')}>Delete Shift Type</button>
          </li>
          <li>
            <button onClick={() => setSelectedAction('UpdateVehicleStatus')}>Update Vehicle Status</button>
          </li>
           */}

      </div>

      <div style={{ width: '67%' }}>
        {selectedAction === 'AddCar' && <AddCar />}
        {selectedAction === 'UpdateCar' && <Cars />}
        {selectedAction === 'DeleteCar' && <DeleteCar />}

        {selectedAction === 'AddBrand' && <AddBrand />}
        {selectedAction === 'UpdateBrand' && <Brands />}
        {selectedAction === 'DeleteBrand' && <DeleteBrand />}

        {selectedAction === 'AddCarBodyType' && <AddCarBodyType />}
        {selectedAction === 'UpdateCarBodyType' && <CarBodyTypes />}
        {selectedAction === 'DeleteCarBodyType' && <DeleteCarBodyType />}

        {selectedAction === 'AddCarModel' && <AddCarModel />}
        {selectedAction === 'UpdateCarModel' && <CarModels />}
        {selectedAction === 'DeleteCarModel' && <DeleteCarModel />}

        {selectedAction === 'AddColor' && <AddColor />}
        {selectedAction === 'UpdateColor' && <Colors />}
        {selectedAction === 'DeleteColor' && <DeleteColor />}

        {selectedAction === 'AddDiscountCode' && <AddDiscountCode />}
        {selectedAction === 'UpdateDiscountCode' && <DiscountCodes />}
        {selectedAction === 'DeleteDiscountCode' && <DeleteDiscountCode />}

        {selectedAction === 'AddDrivingLicenseType' && <AddDrivingLicenseType />}
        {selectedAction === 'UpdateDrivingLicenseType' && <DrivingLicenseTypes />}
        {selectedAction === 'DeleteDrivingLicenseType' && <DeleteDrivingLicenseType />}

        {selectedAction === 'AddEmployee' && <AddEmployee />}
        {selectedAction === 'UpdateEmployee' && <Employees />}
        {selectedAction === 'DeleteEmployee' && <DeleteEmployee />}

        {selectedAction === 'AddFuelType' && <AddFuelType />}
        {selectedAction === 'UpdateFuelType' && <FuelTypes />}
        {selectedAction === 'DeleteFuelType' && <DeleteFuelType />}

        {selectedAction === 'UpdatePaymentType' && <PaymentTypes />}

        {selectedAction === 'AddShiftType' && <AddShiftType />}
        {selectedAction === 'UpdateShiftType' && <ShiftTypes />}
        {selectedAction === 'DeleteShiftType' && <DeleteShiftType />}

        {selectedAction === 'UpdateVehicleStatus' && <VehicleStatuses />}

      </div>
    </div>
  );
};

export default AdminPanel2;
