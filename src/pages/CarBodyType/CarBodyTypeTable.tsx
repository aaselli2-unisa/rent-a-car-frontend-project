import React, { useState, useEffect } from "react";
import { CircularProgress, Typography,IconButton  } from "@mui/material";
import MUIDataTable, {
  MUIDataTableColumn,
  FilterType,
  Responsive,
} from "mui-datatables";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store/configureStore";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteCarBodyType, fetchCarBodyTypes } from "../../store/slices/carBodyTypeSlice";
import "../Color/ColorTable.css";

const CarBodyTypeTable: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const carBodyTypeState = useSelector((state: any) => state.carBodyType);
  const [data, setData] = useState<any[][]>([["Loading Data..."]]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [count, setCount] = useState<number>(0);
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [sortOrder, setSortOrder] = useState<{ name: string; direction: "asc" | "desc" }>({ name: "", direction: "asc" });
  const navigate  = useNavigate();
  useEffect(() => {
    dispatch(fetchCarBodyTypes());
  }, [page, rowsPerPage]);

  useEffect(() => {
     const tableData = carBodyTypeState.carBodyTypes.map((carBodyType: any) => [
        carBodyType.id,
        carBodyType.name,
      <IconButton onClick={() => handleUpdate(carBodyType.id)}><EditIcon /></IconButton>,
      <IconButton onClick={() => handleDelete(carBodyType.id)}><DeleteIcon /></IconButton>,
    ]);
      
      setData(tableData);
      setCount(carBodyTypeState.length);
   
  }, [carBodyTypeState]);
  const handleDelete = (id: number) => {
    console.log("Deleted ID:", id);
    dispatch(deleteCarBodyType({ carBodyTypeId: id }));
  };
  const handleUpdate = (id: number) => {
    console.log("Deleted ID:", id);
    navigate(`/adminPanel/updateCarBodyType/${id}`);
  };
  const changePage = (page: number, sortOrder: { name: string; direction: "asc" | "desc" }) => {
    setIsLoading(true);
    setPage(page); 
    setIsLoading(false);
  };
  const changeRowsPerPage = (rowsPerPage: number, page: number) => { // Added function to change row count
    setRowsPerPage(rowsPerPage);
    setPage(page);
  };

  const sort = (page: number, sortOrder: { name: string; direction: "asc" | "desc" }) => {
    setIsLoading(true);
    // Determine sorting based on clicked column
    let columnName: string = "";
    switch (sortOrder.name) {
      case "id":
        columnName = "id";
        break;
      case "name":
        columnName = "name";
        break;
      default:
        break;
    }
  
    // Sorting operations are performed here
    // Example sorting logic:
    const sortedData = carBodyTypeState.carBodyTypes.slice().sort((a: any, b: any) => {
      if (sortOrder.direction === "asc") {
        // Sort directly with string comparison operators
        return a[columnName] > b[columnName] ? 1 : -1;
      } else {
        // Sort directly with string comparison operators
        return b[columnName] > a[columnName] ? 1 : -1;
      }
    });
  
    // Update sorted data
    setData(sortedData.map((carBodyType: any) => [carBodyType.id, carBodyType.name]));
    // Set isLoading to false
    setIsLoading(false);
  };
  const handleRowSelectionChange = (currentRowsSelected: any[]) => {
    if (currentRowsSelected.length > 0) {
      const selectedRow = data[currentRowsSelected[0].index]; // Get selected row data
      const selectedId = selectedRow[0]; // ID is assumed to be in the first column
      //console.log("Selected row ID: ", selectedId);
      //dispatch(deleteBrand({ brandId: selectedId }))
    }
  };

  const options = {
    customTableBodyWidth: "100%",
    onRowSelectionChange: handleRowSelectionChange,
    filter: true,
    filterType: 'dropdown' as FilterType,
    responsive: 'vertical' as Responsive,
    serverSide: true,
    count: count,
    rowsPerPage: rowsPerPage,
    rowsPerPageOptions: [2, 10, 15],
    page: page,
    sortOrder: sortOrder,
    search: true,
    filterList: [],
    onFilterReset: () => {
      const originalData = carBodyTypeState.carBodyTypes.map((carBodyType: any) => [carBodyType.id, carBodyType.name]);
      setData(originalData);
    },
    onTableChange: (action: string, tableState: any) => {
      switch (action) {
        case 'changePage':
          changePage(tableState.page, tableState.sortOrder);
          break;
        case 'changeRowsPerPage': // Added case to handle new page size
          changeRowsPerPage(tableState.rowsPerPage, tableState.page);
          break;
        case 'sort':
          sort(tableState.page, tableState.sortOrder);
          break;
        case 'filterChange':
          const { filterList } = tableState;
          const filteredData = carBodyTypeState.carBodyTypes.filter((carBodyType: any) => {
            return (
                carBodyType.id.toString().includes(filterList[0][0] || "") &&
                carBodyType.name.toLowerCase().includes(filterList[1][0] || ""));
          }).map((carBodyType: any) => [carBodyType.id, carBodyType.name]);
          setData(filteredData);
          break;
        case 'search':
          const { searchText } = tableState;
          if (searchText) {
            const searchData = carBodyTypeState.carBodyTypes.filter((carBodyType: any) => {
              return (
                carBodyType.name.toLowerCase().includes(searchText.toLowerCase()));
            }).map((carBodyType: any) => [carBodyType.id, carBodyType.name]);
            setData(searchData);
          }
          break;
        default:
          console.log("Unhandled action:", action);
      }
    },
  };

  return (
    <div className="container-card">
    <h2 className="h2-card">CAR BODY TYPE</h2>
    <div className="form">
      <MUIDataTable
        title={
          <Typography variant="h6"> 
            {isLoading && (
              <CircularProgress
                size={24}
                style={{ marginLeft: 15, position: "relative", top: 4 }}
              />
            )}
          </Typography>
        }
        data={data}
        columns={[
          {
            name: "id",
            label: "ID",
            options: {
              customHeadRender: (columnMeta: MUIDataTableColumn) => (
                <th style={{ textAlign: "center",borderBottom:"1px solid rgba(224, 224, 224, 1)" }}>{columnMeta.label}</th>
              ),
              customBodyRender: (value: any) => (
                <div style={{ textAlign: "center" }}>{value}</div>
              ),
            },
          },
          {
            name: "name",
            label: "BODY TYPE",
            options: {
              customHeadRender: (columnMeta: MUIDataTableColumn) => (
                <th style={{ textAlign: "center",borderBottom:"1px solid rgba(224, 224, 224, 1)" }}>{columnMeta.label}</th>
              ),
              customBodyRender: (value: any) => (
                <div style={{ textAlign: "center" }}>{value}</div>
              ),
            },
          },
          {
            name: "",
            label: "",
            options: {
              filter: false,
              customHeadRender: (columnMeta: MUIDataTableColumn) => (
                <th style={{ textAlign: "center", borderBottom: "1px solid rgba(224, 224, 224, 1)" }}>{columnMeta.label}</th>
              ),
              customBodyRender: (value: any, tableMeta: { rowData: any[] }) => (
                <div style={{ textAlign: "center" ,float: "inline-end"}}>
                  {value}
                </div>
              ),
            },
          },
          {
            name: "",
            label: "",
            options: {
              filter: false,
              customHeadRender: (columnMeta: MUIDataTableColumn) => (
                <th style={{ textAlign: "center", borderBottom: "1px solid rgba(224, 224, 224, 1)" }}>{columnMeta.label}</th>
              ),
              customBodyRender: (value: any, tableMeta: { rowData: any[] }) => (
                <div style={{ textAlign: "center" , float: "inline-start"}}>
                  {value}
                </div>
              ),
            },
          },
        ]}
        options={{
          ...options,
          setRowProps: () => ({
            className: 'custom-row'
          }),
          setTableProps: () => ({
            style: {
              className: 'custom-mui-table'
            },
          }),
        }}
      />
      </div>
    </div>
  );
};

export default CarBodyTypeTable;

