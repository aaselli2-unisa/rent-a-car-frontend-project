import React ,{ useEffect, useState } from 'react'
import { Button } from "@mui/joy";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import FormikInput from "../../components/FormikInput/FormikInput";
import FormikSelect from "../../components/FormikSelect/FormikSelect";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store/configureStore';
import { useParams } from 'react-router-dom';
import { GetByIdCustomerModel } from '../../models/Responses/Customer/GetByIdCustomerModel';
import { fetchCustomers, getByIdCustomer, updateCustomer } from '../../store/slices/customerSlice';
import { fetchDrivingLicenseTypes } from '../../store/slices/drivingLicenseTypeSlice';
import Divider from '@mui/material/Divider';
import { isUserTrue } from '../../store/slices/signInSlice';
import { changePassword } from '../../store/slices/userSlice';
import './UpdateCustomer.css';
import walpaper from '../../assets/wall9.jpg'
type Props = {}

const UpdateCustomer = (props: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams<{ id: string }>();
  console.log(id);
  
  const customerId = parseInt(id ?? "", 10);
  const [file, setFile] = useState<File | undefined>();
  const [isSubmited, setIsSubmited] = useState<Boolean>(false);
  const [customer, setCustomer] = useState<GetByIdCustomerModel>(); 
  const customerState = useSelector((state: any) => state.customer);
  const [selectedValue, setSelectedValue] = useState({});
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const expectedMinDrivingLicenseTypeState = useSelector(
    (state: any) => state.drivingLicenseType
  );
  
  useEffect(() => {
    if (isSubmited) {
      fetchData();
      setIsSubmited(false);
    } else fetchData();
  }, [id, isSubmited]);
  const fetchData = async () => {
    try {
      const newResponse = await dispatch(getByIdCustomer({ id: customerId }));
      setCustomer((newResponse as any)?.payload); 
      console.log(newResponse);
      
      dispatch(fetchCustomers());
      dispatch(fetchDrivingLicenseTypes());
     
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .matches(/^[a-zA-Z\s]+$/, 'Name can only contain letters')
      .required('Name'),
    surname: Yup.string()
      .matches(/^[a-zA-Z\s]+$/, 'Surname can only contain letters')
      .required('Surname'),
    emailAddress: Yup.string().required('Email Address'),
    password: Yup.string().required('Password'),
    phoneNumber: Yup.string()
      .matches(/^[0-9]+$/, 'Phone number can only contain digits')
      .min(10, 'Phone number must be 10 digits')
      .max(10, 'Phone number must be 10 digits')
      .required('Phone number'),
    drivingLicenseNumber: Yup.number()
      .required('Driving license number'),
    expectedMinDrivingLicenseTypeId:Yup.number().required('Driving license type'),
  })

  const initialValues = {
    name:customer?.name,
    surname:customer?.surname,
    emailAddress:customer?.emailAddress,
    phoneNumber:customer?.phoneNumber,
    drivingLicenseNumber: customer?.drivingLicenseNumber,
    status:customer?.status,
    authority:customer?.authority,
    drivingLicenseTypeEntityId:customer?.drivingLicenseTypeId,
  }
  
  const handleUpdateCustomer = async (values: any) => {
    dispatch(updateCustomer(values));
    window.location.reload();

  };
  const handleClick =async () => {
    if (!mail || !password || !newPassword) {
      setErrorMessage('Please fill in all fields.');
    } else if (password === newPassword) {
      setErrorMessage('New password cannot be the same as the old password.');
    } else {
      const isUser = await dispatch(isUserTrue({email:mail,password:password}));
      if(isUser){
        try {
          const changePass = await dispatch(changePassword({ id: customerId, password: newPassword }));
          // If request succeeds
          console.log(changePass); // You can use the change details here
          // Set success message
          setSuccessMessage('Your password has been updated successfully.');
          window.location.reload();
          
        } catch (error) {
          // If request fails
          console.error('Password change failed:', error);
          // Set error message
          setErrorMessage('Password change failed.');
        }
      
      }
      setErrorMessage('');
    }
  };
  return (
    <Formik
    initialValues={initialValues}
    validationSchema={validationSchema}
    onSubmit={(values) => {
 
      setSelectedValue(values);
      handleUpdateCustomer(values);
          

    }}
    enableReinitialize={true}
  >

      <div className="container-card">{/* <img src={walpaper} alt="Logo"/> */}
        <div className='form'>
          <h2 className="h2-card">My Information</h2>
          <Form style={{float:'inline-start',padding:"50px",borderRadius:"10px"}}>
            <div className="row">
                <div id="select-block" className="col-md-6">
                  <div className="mb-2">
                    <FormikInput
                      name="name"
                      label="Name"
                      placeHolder="Name"
                      type='text'
                    />
                  </div>
                  <div className="mb-2">
                    <FormikInput
                      name="surname"
                      label="Surname"
                      placeHolder="Surname"
                      type='text'
                    />
                  </div>
                  <div className="mb-2">
                    <FormikInput
                      name="emailAddress"
                      label="Email Address"
                      placeHolder="Email Address"
                      type='text'
                    />
                  </div>
                  <div className="mb-2">
                    <FormikInput
                      name="phoneNumber"
                      label="Phone Number"
                      placeHolder="Phone Number"
                      type='text'
                    />
                  </div>
                  <div className="mb-2">
                    <FormikInput
                      name="drivingLicenseNumber"
                      label="Driving License Number"
                      placeHolder="Driving License Number"
                      type='text'
                    />
                  </div>
                  <div className="mb-2">
                    <FormikSelect
                      label="Select Driving License Type"
                      name="drivingLicenseTypeEntityId"
                      options={expectedMinDrivingLicenseTypeState.drivingLicenseTypes.map(
                        (drivingLicenseType: any) => ({
                          value: drivingLicenseType.id,
                          label: drivingLicenseType.name,
                        })
                      )}
                    />
                  </div>
                </div>
              
            </div>
            <Button type="submit" className="btn btn-primary">
              Update
            </Button>
          </Form>
          
          <Form style={{float:'inline-end',padding:"50px",borderRadius:"10px"}}>
            <div className="row">
                
                <div id="select-block" className="col-md-6">
                
                  <div className="mb-2">
                  <label className="form-label">Email </label>
                  <input
                      className='info'
                      type="text"
                      value={mail}
                      onChange={(e) => setMail(e.target.value)}
                      placeholder="Email Address "
                    />
                  </div>
                  <div className="mb-2">
                  <label className="form-label">Old Password </label>
                    <input
                      className='info'
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Current Password"
                    />
                  </div> 
                  <div className="mb-2">
                  <label className="form-label">New Password </label>
                    <input
                      className='info'
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="New Password"
                    />
                  </div> 
                </div>
            </div>
            <Button onClick={handleClick}>Update</Button>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
          </Form>
        </div>
      </div>
 
  </Formik>
  )
}

export default UpdateCustomer