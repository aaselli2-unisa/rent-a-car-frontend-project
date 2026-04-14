import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { UpdatePaymentTypeModel } from "../../models/Requests/PaymentType/UpdatePaymentTypeModel";
import paymentTypeService from "../../services/paymentTypeService";

export const fetchPaymentTypes = createAsyncThunk(
    "paymentTypes/fetchPaymentTypes",
    async (_, thunkAPI) => {
        try {
            const allPaymentTypes = await paymentTypeService.getAll();
            const responseData = allPaymentTypes.data?.response;

            if (Array.isArray(responseData)) {
                return responseData;
            }

            if (Array.isArray((responseData as any)?.items)) {
                return (responseData as any).items;
            }

            return [];

        } catch (error) {
            console.error("Error fetching payment type:", error);
            return thunkAPI.rejectWithValue("Unable to load payment methods.");
        }
    }
);

export const updatePaymentType = createAsyncThunk(
    "paymentTypes/updatePaymentType",
    async (updatedPaymentTypeData: UpdatePaymentTypeModel) => {
        try {
            const updatedPaymentType = await paymentTypeService.update(updatedPaymentTypeData);
            if (updatedPaymentType.data) {
                return updatedPaymentType.data.response;
            }
            else {
                console.warn("Server response does not contain data.");
                return null;
            }
        } catch (error: any) {
            
            if (error && error.response && error.response.data.response.errorCode === 3000) {
               throw error.response.data.response.details[0];
            }
            throw error;
          }
    }
);

export const getByIdPaymentType = createAsyncThunk(
    "paymentTypes/getByIdPaymentTypes",
    async ({ id }: { id: number; }) => {
      try {
        const getByIded = await paymentTypeService.getById(id);
        return getByIded.data.response;
  
      } catch (error) {
        console.error("Error adding getByIded:", error);
        throw error;
      }
    }
  );

const paymentTypeSlice = createSlice({
    name: "paymentType",
    initialState: { paymentTypes: [] as any[], error: null as string | null },
    reducers: {},
    extraReducers: (builder) => {

        builder.addCase(fetchPaymentTypes.pending, (state) => {
            state.error = null;
        });
        builder.addCase(fetchPaymentTypes.fulfilled, (state, action) => {
            state.paymentTypes = action.payload;
            state.error = null;
        });
        builder.addCase(fetchPaymentTypes.rejected, (state, action) => {
            state.error = (action.payload as string) || action.error.message || "Unable to load payment methods.";
        });


        builder.addCase(updatePaymentType.pending, () => { });
        builder.addCase(updatePaymentType.fulfilled, (state) => {
            state.error = null;
            state.paymentTypes = [];
        });
        builder.addCase(updatePaymentType.rejected, (state, action) => {
            state.error = action.error.message || "An error occurred.";
        });

    }
});

export const paymentTypeReducer = paymentTypeSlice.reducer;
export const { } = paymentTypeSlice.actions;