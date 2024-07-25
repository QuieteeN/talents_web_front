import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const profileApi = createApi({
    reducerPath: "profileApi",
    baseQuery: fetchBaseQuery({ 
        baseUrl: 'http://localhost:5000/api/profile',
        prepareHeaders: (headers) => {
            headers.set('Content-Type', `application/json`);
            return headers;
        },
        credentials: 'include'
    }),
    endpoints: (builder) => ({
        getStudentProfile: builder.query<any, void>({
            query: () => ({
                url: '/student',
                method: "GET",
            })
        }),
        getEmployerProfile: builder.query<any, void>({
            query: () => ({
                url: '/employer',
                method: "GET",
            })
        }),
        getEmployerProfileById: builder.query<any, {employerId: number}>({
            query: (data: {employerId: number}) => ({
                url: `/employer/${data.employerId}`,
                method: "GET",
            })
        }),
    })
})

export const {
    useGetStudentProfileQuery,
    useGetEmployerProfileQuery,
    useGetEmployerProfileByIdQuery,
} = profileApi;