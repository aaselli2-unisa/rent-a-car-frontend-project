import React, { useState, useEffect } from "react";
import { CircularProgress, Typography, IconButton } from "@mui/material";
import MUIDataTable, {
    MUIDataTableColumn,
    FilterType,
    Responsive,
} from "mui-datatables";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store/configureStore";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import { fetchPaymentTypes } from "../../store/slices/paymentTypeSlice";
import "../Color/ColorTable.css";

const PaymentTypeTable: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const paymentTypeState = useSelector((state: any) => state.paymentType);
    const [data, setData] = useState<any[][]>([["Loading Data..."]]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [count, setCount] = useState<number>(0);
    const [page, setPage] = useState<number>(0);
    const [rowsPerPage, setRowsPerPage] = useState<number>(5);
    const [sortOrder, setSortOrder] = useState<{
        name: string; direction: "asc" | "desc"
    }>({
        name: "", direction: "asc"
    });
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchPaymentTypes());
    }, [page, rowsPerPage]);

    useEffect(() => {
        // Check whether paymentTypeState is an array
        const tableData = paymentTypeState.paymentTypes.map((paymentType: any) => [
            paymentType.id,
            paymentType.name,
            paymentType.active,
            <IconButton onClick={() => handleUpdate(paymentType.id)}><EditIcon /></IconButton>,
        ]);

        setData(tableData);
        setCount(paymentTypeState.length);

    }, [paymentTypeState]);

    const handleUpdate = (id: number) => {
        console.log("Deleted ID:", id);
        navigate(`/adminPanel/updatePaymentType/${id}`);
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
            case "active":
                columnName = "active";
                break;
            default:
                break;
        }

        // Sorting operations are performed here
        // Example sorting logic:
        const sortedData = paymentTypeState.paymentTypes.slice().sort((a: any, b: any) => {
            if (sortOrder.direction === "asc") {
                // Sort directly with string comparison operators
                return a[columnName] > b[columnName] ? 1 : -1;
            } else {
                // Sort directly with string comparison operators
                return b[columnName] > a[columnName] ? 1 : -1;
            }
        });

        // Update sorted data
        setData(sortedData.map((paymentType: any) => [paymentType.id, paymentType.name, paymentType.active]));
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
            const originalData = paymentTypeState.paymentTypes.map((paymentType: any) => [paymentType.id, paymentType.name, paymentType.active]);
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
                    const filteredData = paymentTypeState.paymentTypes.filter((paymentType: any) => {
                        return (
                            paymentType.id.toString().includes(filterList[0][0] || "") &&
                            paymentType.name.toString().includes(filterList[1][0] || "") &&
                            (filterList[2][0] === "" || paymentType.active === (filterList[2][0] === "true")));
                    }).map((paymentType: any) => [paymentType.id, paymentType.name, paymentType.active]);
                    setData(filteredData);
                    break;
                case 'search':
                    const { searchText } = tableState;
                    if (searchText) {
                        const searchData = paymentTypeState.paymentTypes.filter((paymentType: any) => {
                            return (
                                paymentType.name.toLowerCase().includes(searchText.toLowerCase()) ||
                                (paymentType.active && "true".includes(searchText.toLowerCase())) ||
                                (!paymentType.active && "false".includes(searchText.toLowerCase()))
                            );
                        }).map((paymentType: any) => [paymentType.id, paymentType.name, paymentType.active]);
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
        <h2 className="h2-card">PAYMENT TYPE</h2>
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
                                <th style={{ textAlign: "center", borderBottom: "1px solid rgba(224, 224, 224, 1)" }}>{columnMeta.label}</th>
                            ),
                            customBodyRender: (value: any) => (
                                <div style={{ textAlign: "center" }}>{value}</div>
                            ),
                        },
                    },
                    {
                        name: "name",
                        label: "PAYMENT TYPE",
                        options: {
                            customHeadRender: (columnMeta: MUIDataTableColumn) => (
                                <th style={{ textAlign: "center", borderBottom: "1px solid rgba(224, 224, 224, 1)" }}>{columnMeta.label}</th>
                            ),
                            customBodyRender: (value: any) => (
                                <div style={{ textAlign: "center" }}>{value}</div>
                            ),
                        },
                    },
                    {
                        name: "active",
                        label: "ACTIVE",
                        options: {
                            customHeadRender: (columnMeta: MUIDataTableColumn) => (
                                <th style={{ textAlign: "center", borderBottom: "1px solid rgba(224, 224, 224, 1)" }}>{columnMeta.label}</th>
                            ),
                            customBodyRender: (value: boolean) => (
                                <div style={{ textAlign: "center" }}>{value === true ? "true" : "false"}</div>
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
                                <div style={{ textAlign: "center", float: "inline-end" }}>
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
                                <div style={{ textAlign: "center", float: "inline-start" }}>
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

export default PaymentTypeTable;

