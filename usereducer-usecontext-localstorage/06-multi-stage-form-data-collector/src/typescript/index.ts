export interface FormData {
    personalInfo: {
        firstName: string;
        lastName: string;
        email: string;
        phoneNumber: string;
    }
    addressInfo: {
        address: string;
        city: string;
        pinCode: string;
    }
}



export interface FormContextType {
    state: FormData;
    dispatch: React.Dispatch<FormAction>;
}



export type FormAction =
    | { type: "UPDATE_PERSONAL_INFO"; payload: Partial<FormData["personalInfo"]> }
    | { type: "UPDATE_ADDRESS_INFO"; payload: Partial<FormData["addressInfo"]> }
    | { type: "RESET_FORM" };