import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AddDrivingLicenseTypeModel } from "../../models/Requests/DrivingLicenseType/AddDrivingLicenseTypeModel";
import DrivingLicenseTypeModelService from "../../services/drivingLicenseTypeService";
import { UpdateDrivingLicenseTypeModel } from "../../models/Requests/DrivingLicenseType/UpdateDrivingLicenseTypeModel";
import drivingLicenseTypeService from "../../services/drivingLicenseTypeService";

export const fetchDrivingLicenseTypes = createAsyncThunk(
    "drivingLicenseTypes/fetchDrivingLicenseTypes",
    async (_, thunkAPI) => {
        try {
            const allDrivingLicenseTypes = await drivingLicenseTypeService.getAll();
            const responseData = allDrivingLicenseTypes.data?.response;

            if (Array.isArray(responseData)) {
                return responseData;
            }

            if (Array.isArray((responseData as any)?.items)) {
                return (responseData as any).items;
            }

            return [];

        } catch (error) {
            console.error("Error fetching allDrivingLicenseTypes:", error);
            throw error;
        }
    }
);

export const getByIdDrivingLicenseType = createAsyncThunk(
    "drivingLicenseTypes/getByIdDrivingLicenseTypes",
    async ({ id }: { id: number; }, thunkAPI) => {
        try {
            const getByIded = await drivingLicenseTypeService.getById(id);
            return getByIded.data.response;

        } catch (error) {
            console.error("Error adding getByIded:", error);
            throw error;
        }
    }
);

export const addDrivingLicenseType = createAsyncThunk(
    "drivingLicenseTypes/addDrivingLicenseType",
    async (newDrivingLicenseTypeData: AddDrivingLicenseTypeModel, thunkAPI) => {
        try {
            const addedDrivingLicenseType = await drivingLicenseTypeService.add(newDrivingLicenseTypeData);

            return addedDrivingLicenseType.data;

        } catch (error : any) {
            if (error.response && error.response.data && error.response.data.response && error.response.data.response.errorCode === 3000) {
                const details = error.response.data.response.details[0];
                throw details;
              } 
        }
    }
);

export const updateDrivingLicenseType = createAsyncThunk(
    "drivingLicenseTypes/updateDrivingLicenseType",
    async (updatedDrivingLicenseTypeData: UpdateDrivingLicenseTypeModel, thunkAPI) => {
        try {
            const updatedDrivingLicenseType = await drivingLicenseTypeService.update(updatedDrivingLicenseTypeData);
            if (updatedDrivingLicenseType.data) {
                return updatedDrivingLicenseType.data.response;
            }
            else {
                console.warn("Server response does not contain data.");
                return null;
            }
        } catch (error : any) {
            if (error && error.response && error.response.data.response.errorCode === 3000) {
                const details = error.response.data.response.details[0];
               throw details;
            }
        }
    }
);

export const deleteDrivingLicenseType = createAsyncThunk(
    "drivingLicenseTypes/deleteDrivingLicenseType",
    async ({ drivingLicenseTypeId }: { drivingLicenseTypeId: number; }, thunkAPI) => {
        try {
            await drivingLicenseTypeService.delete(drivingLicenseTypeId);
            return {
                deletedDrivingLicenseTypeId: drivingLicenseTypeId
            };
        } catch (error) {
            console.error("Error deleting drivingLicenseType:", error);
            throw error;
        }
    }
);


const drivingLicenseTypeSlice = createSlice({
    name: "drivingLicenseType",
    initialState: { drivingLicenseTypes: [] as any[], error: null as string | null, isLoading: false },
    reducers: {},
    extraReducers: (builder) => {

        builder.addCase(fetchDrivingLicenseTypes.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(fetchDrivingLicenseTypes.fulfilled, (state, action) => {
            state.isLoading = false;
            state.drivingLicenseTypes = Array.isArray(action.payload) ? action.payload : [];
        });
        builder.addCase(fetchDrivingLicenseTypes.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message || "Could not load driving license types.";
        });

        /*-----------------*/

        builder.addCase(getByIdDrivingLicenseType.pending, (state) => { });
        builder.addCase(getByIdDrivingLicenseType.fulfilled, (state, action) => {
            state.drivingLicenseTypes = action.payload;
        });
        builder.addCase(getByIdDrivingLicenseType.rejected, (state) => {
        });
        /*-----------------*/

        builder.addCase(addDrivingLicenseType.pending, (state) => { });
        builder.addCase(addDrivingLicenseType.fulfilled, (state, action) => {
            state.error = null;
            state.drivingLicenseTypes.push(action.payload);
        });
        builder.addCase(addDrivingLicenseType.rejected, (state, action) => { 
            state.error = action.error.message || "An error occurred.";
        });

        /*-----------------*/

        builder.addCase(updateDrivingLicenseType.pending, (state) => { });
        builder.addCase(updateDrivingLicenseType.fulfilled, (state, action) => {
            state.error = null;
            state.drivingLicenseTypes = [];
        });
        builder.addCase(updateDrivingLicenseType.rejected, (state, action) => {
            state.error = action.error.message || "An error occurred.";
         });

        /*-----------------*/

        builder.addCase(deleteDrivingLicenseType.pending, (state) => { });
        builder.addCase(deleteDrivingLicenseType.fulfilled, (state, action) => {
            const deletedDrivingLicenseTypeId = action.payload.deletedDrivingLicenseTypeId;
            state.drivingLicenseTypes = state.drivingLicenseTypes.filter(drivingLicenseType => drivingLicenseType.id !== deletedDrivingLicenseTypeId);
        });
        builder.addCase(deleteDrivingLicenseType.rejected, (state) => { });

    }
});
export const drivingLicenseTypeReducer = drivingLicenseTypeSlice.reducer;
export const { } = drivingLicenseTypeSlice.actions;