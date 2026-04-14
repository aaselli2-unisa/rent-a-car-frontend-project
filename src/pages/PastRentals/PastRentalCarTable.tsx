import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./PastRentalCarTable.css";
import { AppDispatch } from "../../store/configureStore";
import { useDispatch } from "react-redux";
import { getRentalsByCustomer } from "../../store/slices/customerSlice";
import { useParams } from "react-router-dom";
import { GetAllCustomerModel } from "../../models/Responses/Customer/GetAllCustomerModel";
import { CustomerModel } from "../../models/Responses/Customer/CustomerModel";
import { RentalModel } from "../../models/Responses/Rental/RentalModel";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import { useNavigate } from "react-router-dom";
import { GetAllRentalsModel } from "../../models/Responses/Rental/GetAllRentalsModel";
type Props = {};
const PastRentalCarTable = (props: Props) => {
  const { id } = useParams();
  const rentalId = parseInt(id || "");
  const [rental, setRental] = useState<RentalModel[]>([]);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  useEffect(() => {
    fetchData();
  }, [id]);
  const fetchData = async () => {
    const customerRental = await dispatch(
      getRentalsByCustomer({ customerId: rentalId })
    );
    setRental((customerRental as any)?.payload);
    console.log(rental);
  };
  const handleUpdate = (id: number) => {
    navigate(`/myRentalDetails/${id}`);
  };
  const formatDate = (date: string | Date | undefined): string => {
    if (!date) return ""; // Return empty string if date is missing
    if (typeof date === "string") {
      // Convert string dates to Date objects
      date = new Date(date);
    }
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    }).format(date);
  };

  return (
    <TableContainer
      component={Paper}
      sx={{ backgroundColor: "transparent" }}
      className="custom-table-container"
    >
      <h2 className="h2-card">My Rental History</h2>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead sx={{backgroundColor: "#f5f5dc29"}}>
          <TableRow>
            <TableCell align="left" sx={{ color: "#ffc107", padding: "0px 50px 0px 50px" }}>
                FULL NAME
            </TableCell>
            <TableCell align="left" sx={{ color: "#ffc107", padding: "0px 50px 0px 50px" }}>
                START DATE
            </TableCell>
            <TableCell align="left" sx={{ color: "#ffc107", padding: "0px 50px 0px 50px" }}>
                END DATE
            </TableCell>
            <TableCell align="left" sx={{ color: "#ffc107", padding: "0px 50px 0px 50px" }}>
                RETURN DATE
            </TableCell>
            <TableCell align="left" sx={{ color: "#ffc107", padding: "0px 50px 0px 50px" }}>
                STATUS
            </TableCell>
            <TableCell align="left" sx={{ color: "#ffc107", padding: "0px 50px 0px 50px" }}>
                AMOUNT
            </TableCell>
            <TableCell
              align="left"
              sx={{ color: "#ffc107", padding: "0px 50px 0px 50px" }}>DETAIL</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rental &&
            rental.map((item, index) => (
              <TableRow
                key={item.response.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell
                  component="th"
                  scope="row"
                  sx={{ padding: "50px" }}
                  align="left"
                >
                  <span className="table-data">
                    {item.response.customerEntityName}
                    {item.response.customerEntitySurname}
                  </span>
                </TableCell>
                <TableCell align="left" sx={{ padding: "50px" }}>
                  <span className="table-data">
                    {formatDate(item.response.startDate) ?? ""}
                  </span>
                </TableCell>
                <TableCell align="left" sx={{ padding: "50px" }}>
                  <span className="table-data">
                    {formatDate(item.response.endDate) ?? ""}
                  </span>
                </TableCell>
                <TableCell align="left" sx={{ padding: "50px" }}>
                  <span className="table-data">
                    {formatDate(item.response.returnDate) ?? ""}
                  </span>
                </TableCell>
                <TableCell align="left" sx={{ padding: "50px" }}>
                  <span className="table-data">
                    {item.response.rentalStatusEntityName}
                  </span>
                </TableCell>
                <TableCell align="left" sx={{ padding: "50px" }}>
                  <span className="table-data">
                    {item.response.paymentDetailsEntityAmount}
                  </span>
                </TableCell>
                <TableCell align="left" sx={{ padding: "50px" }}>
                  <IconButton onClick={() => handleUpdate(item.response.id)}><ArticleOutlinedIcon /></IconButton>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PastRentalCarTable;
