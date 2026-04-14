import { Container, FormLabel, Grid, FormControl } from "@mui/joy";
import React, { useEffect, useRef, useState } from "react";
import Sheet from "@mui/joy/Sheet";
import Stack from "@mui/joy/Stack";
import Box from "@mui/joy/Box";
import { styled } from "@mui/joy/styles";
import { AutocompleteLoading } from "../../components/AutocompleteLoading/AutocompleteLoading";
import PasswordStrength from "../../components/PasswordStrength/PasswordStrength";
import { InputMask } from "@react-input/mask";
import { Autocomplete, Button, PasswordInput, TextInput } from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store/configureStore";
import { addCustomer } from "../../store/slices/customerSlice";
import { useNavigate } from "react-router-dom";
import "./SignUp.css";
import { fetchDrivingLicenseTypes } from "../../store/slices/drivingLicenseTypeSlice";
import { Alert } from "@mui/material";
import { RootState } from "../../store/configureStore";

const DEFAULT_DRIVING_LICENSE_TYPES = [
  { id: 1, name: "A1" },
  { id: 2, name: "A2" },
  { id: 3, name: "B" },
  { id: 4, name: "BE" },
  { id: 5, name: "C" },
  { id: 6, name: "CE" },
  { id: 7, name: "D" },
  { id: 8, name: "DE" },
];

const Item = styled(Sheet)(({ theme }) => ({
  ...theme.typography["body-sm"],
  textAlign: "center",
  fontWeight: theme.fontWeight.md,
  color: theme.vars.palette.text.secondary,
  border: "1px solid",
  borderColor: theme.palette.divider,
  padding: theme.spacing(1),
  borderRadius: theme.radius.md,
}));

type Props = {};

export default function SignUp({}: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const drivingLicenseNumber = phoneNumber;
  const [drivingLicenseTypeEntityId, setDrivingLicenseTypeEntityId] = useState<
    number | undefined
  >(undefined);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const drivingLicenseTypeState = useSelector(
    (state: RootState) => state.drivingLicenseType
  );
  const apiDrivingLicenseTypeOptions = Array.isArray(
    drivingLicenseTypeState.drivingLicenseTypes
  )
    ? drivingLicenseTypeState.drivingLicenseTypes
    : [];
  const drivingLicenseTypeOptions =
    apiDrivingLicenseTypeOptions.length > 0
      ? apiDrivingLicenseTypeOptions
      : DEFAULT_DRIVING_LICENSE_TYPES;
  const handleSignUp = async () => {
    if (name && surname && emailAddress && phoneNumber && password) {
        if (phoneNumber.length !== 10) {
          setErrorMessage("Please enter a valid mobile phone number.");
          return;
        }

        if (!drivingLicenseTypeEntityId) {
          setErrorMessage("Please select a driving license type.");
          return;
        }

        try {
            const response = await dispatch(
                addCustomer({
                name,
                surname,
                emailAddress,
                password,
                phoneNumber,
                drivingLicenseNumber,
                drivingLicenseTypeEntityId,
                userImageEntityId:4
                })
            );

            if (addCustomer.rejected.match(response)) {
                const backendMessage = typeof response.payload === "string"
                  ? response.payload
                  : response.error.message;
                setErrorMessage(backendMessage || "Sign up failed. Please try again.");
                console.log(response);
            } else {
                setSuccessMessage("Welcome! Sign up successful.");
                setTimeout(() => {
                setSuccessMessage("");
                window.location.reload();
                //navigate("/");
                window.location.href = "/";
                }, 2000); 
            }
        }
        catch (error) {
            console.error("Redux action dispatch error:", error);
            setErrorMessage("Operation failed. Please try again.");
        }
      }

      
      
    else {
      // Warn the user if required information is missing
      alert("Please fill in all fields.");
    }
  };
  const data =
    emailAddress.trim().length > 0 && !emailAddress.includes("@")
      ? ["gmail.com", "outlook.com", "yahoo.com"].map(
          (provider) => `${emailAddress}@${provider}`
        )
      : [];
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDrivingLicenseTypeEntityId(parseInt(e.target.value, 10));
    setErrorMessage("");
  };
  useEffect(() => {
    dispatch(fetchDrivingLicenseTypes());
  }, [dispatch]);
  return (
    <div className="container-card">
      <div className="form">
        <h2 className="h2-card">Sign Up</h2>
        <Box sx={{ width: "100%", marginTop: 10 }}>
          <Grid container spacing={2} sx={{ flexGrow: 1 }}>
            <Grid
              xs={6}
              sx={{
                borderRightStyle: "solid",
                borderWidth: 1.1,
                borderColor: "#E1DED9",
                paddingLeft: 10,
              }}
            >
              <Stack
                direction="column"
                justifyContent="center"
                alignItems="center"
                spacing={2}
              >
                <FormControl>
                  <TextInput
                    style={{ marginBottom: 20 }}
                    placeholder="Your name"
                    label="Your name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <Autocomplete
                    value={emailAddress}
                    onChange={setEmailAddress}
                    label="Your email address"
                    placeholder="Your email address"
                    data={data}
                  />

                  <FormLabel sx={{ marginBottom: 1, color: "white" }}>
                    Mobile phone *
                  </FormLabel>
                  <InputMask
                    style={{
                      borderColor: "#f1f3f5",
                      borderRadius: "6px",
                      height: "50px",
                      fontSize: "15px",
                      color: "black",
                      padding: "0 12px",
                      width:'100%',
                      backgroundColor:'white'
                    }}
                    placeholder="Mobile phone"
                    mask="+90 (___) ___-__-__"
                    replacement={{ _: /\d/ }}
                    onChange={(e) => {
                      const value = e.target.value;
                      const numericValue = value
                        .substring(3)
                        .replace(/\D/g, "");
                      setPhoneNumber(numericValue);
                    }}
                  />
                </FormControl>
              </Stack>
            </Grid>

            <Grid xs={6} sx={{ paddingRight: 10 }}>
              <Stack
                direction="column"
                justifyContent="center"
                alignItems="center"
                spacing={2}
                bgcolor={""}
              >
                <FormControl>
                  <TextInput
                    style={{ marginBottom: 20 }}
                    placeholder="Your surname"
                    label="Your surname"
                    required
                    value={surname}
                    onChange={(e) => setSurname(e.target.value)}
                  />
                  {/* <PasswordStrength /> */}
                  <PasswordInput
                    placeholder="Password"
                    label="Password"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <label style={{color: "white" }}>
                    Driving License Type *
                  </label>
                  <select
                    value={drivingLicenseTypeEntityId || ""}
                    onChange={handleSelectChange}
                    disabled={drivingLicenseTypeState.isLoading}
                    style={{ height: "51px", borderRadius: "5px", width: "100%" }}
                    >
                    <option value="" disabled>
                      {drivingLicenseTypeState.isLoading
                        ? "Loading driving license types..."
                        : "Select driving license type"}
                    </option>
                    {drivingLicenseTypeOptions.map(
                      (drivingLicenseType: any) => (
                        <option
                          key={drivingLicenseType.id}
                          value={drivingLicenseType.id}
                        >
                          {drivingLicenseType.name}
                        </option>
                      )
                    )}
                  </select>
                </FormControl>
              </Stack>
            </Grid>
            <Grid xs={12}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginTop: 10,
                  marginRight: 20,
                }}
              >
                <button
                  type="submit"
                  className="button3"
                  onClick={handleSignUp}
                >
                  Sign Up
                </button>
              </Box>
              
                    {errorMessage && <Alert severity="error" style={{width:"430px"}}>{errorMessage}</Alert>}
                    {successMessage && (
                    <Alert severity="success">{successMessage}</Alert>
                    )}
                
            </Grid>
          </Grid>
        </Box>
      </div>
    </div>
  );
}
