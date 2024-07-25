import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const searchApi: any = createApi({
    reducerPath: "searchApi",
    baseQuery: fetchBaseQuery({ 
        baseUrl: 'http://localhost:5000/api/search',
        credentials: 'include'
    }),
    endpoints: (builder) => ({
        getVacancies: builder.query({
            query: (filters) => {
                const params = new URLSearchParams();
                Object.keys(filters).forEach((key) => {
                    if (filters[key]) {
                        params.append(key, filters[key]);
                    }
                });
                return `/search-vacancies?${params.toString()}`;
            },
        }),
        getCVs: builder.query({
            query: (filters) => {
                const params = new URLSearchParams();
                Object.keys(filters).forEach((key) => {
                    if (filters[key]) {
                        params.append(key, filters[key]);
                    }
                });
                return `/search-cvs?${params.toString()}`;
            },
        }),
    }),
})

export const {
    useGetVacanciesQuery,
    useGetCVsQuery,
    useLazyGetAllVacanciesQuery,
} = searchApi;