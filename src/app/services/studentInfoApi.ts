import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// interface UploadPhotoResponse {
//     message: string;
//     filePath: string;
// }
  
// interface UploadPhotoArgs {
//     file: File;
// }

export const studentInfoApi: any = createApi({
    reducerPath: "studentInfoApi",
    baseQuery: fetchBaseQuery({ 
        baseUrl: 'http://localhost:5000/api/studentInfo',
        credentials: 'include'
    }),
    endpoints: (builder) => ({
        // uploadPhoto: builder.mutation<UploadPhotoResponse, UploadPhotoArgs>({
        //     query: ({ file }) => {
        //       const formData = new FormData();
        //       formData.append('photo', file);
              
        //       return {
        //         url: `/upload-photo/`,
        //         method: 'POST',
        //         body: formData,
        //       };
        //     },
        // }),
        // deletePhoto: builder.mutation<any, any>({
        //     query: () => {
        //         return {
        //             url: `/delete-photo/`,
        //             method: 'DELETE',
        //         }
        //     }
        // }),
        updateSocials: builder.mutation<void, { socials: { type: string, url: string }[] }>({
            query: (body) => ({
                url: '/update-socials',
                method: 'POST',
                body,
            }),
        }),
        updateMainInfo: builder.mutation<void, { name: string, surname: string }>({
            query: (body: { name: string, surname: string }) => ({
                url: '/update-main-info',
                method: 'PUT',
                body,
            }),
        }),
        updateContactInfo: builder.mutation<void, { email: string, phoneNumber: string }>({
            query: (body: { email: string, phoneNumber: string}) => ({
                url: '/update-contact-info',
                method: 'PUT',
                body,
            }),
        }),
        changePassword: builder.mutation<void, { oldPassword: string, newPassword: string }>({
            query: (body) => ({
                url: '/change-password',
                method: 'PUT',
                body,
            }),
        }),
        updateAddressInfo: builder.mutation<any, {country: string, state: string, city: string, street: string, houseNumber: string, pos: string}>({
            query: (addressData) => ({
                url: '/update-address-info',
                method: 'POST',
                body: addressData,
            }),
        }),
    }),
})

export const {
    // useUploadPhotoMutation,
    // useDeletePhotoMutation,
    useUpdateSocialsMutation,
    useUpdateMainInfoMutation,
    useUpdateContactInfoMutation,
    useChangePasswordMutation,
    useUpdateAddressInfoMutation,
} = studentInfoApi;