import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const languageApi: any = createApi({
    reducerPath: "languageApi",
    baseQuery: fetchBaseQuery({ 
        baseUrl: 'http://localhost:5000/api/languages',
        credentials: 'include'
    }),
    endpoints: (builder) => ({
        getAllLanguages: builder.query<any, void>({
            query: () => ({
                url: '/languages',
                method: 'GET',
            }),
        }),
    }),
})

export const {
    useGetAllLanguagesQuery,
} = languageApi;