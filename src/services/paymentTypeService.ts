import { GetAllPaymentTypesModel } from './../models/Responses/PaymentType/GetAllPaymentTypesModel';
import { UpdatePaymentTypeModel } from "../models/Requests/PaymentType/UpdatePaymentTypeModel";
import axiosInstance from "../utils/axiosInterceptors";

 class PaymentTypeService {
    async getAll() {
        try {
            return await axiosInstance.get<GetAllPaymentTypesModel>("paymentTypes");
        } catch {
            return axiosInstance.get<GetAllPaymentTypesModel>("paymentType");
        }
    }

    update(updatedPaymentType: UpdatePaymentTypeModel){
        return axiosInstance.put<GetAllPaymentTypesModel>("paymentTypes", updatedPaymentType)
    }

    getById(id: number){
        return axiosInstance.get<GetAllPaymentTypesModel>(`paymentTypes/${id}`)
    }
}
export default new PaymentTypeService();