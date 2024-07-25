import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const keySkillApi: any = createApi({
    reducerPath: "keySkillApi",
    baseQuery: fetchBaseQuery({ 
        baseUrl: 'http://localhost:5000/api/keySkills',
        credentials: 'include'
    }),
    endpoints: (builder) => ({
        getAllKeySkills: builder.query<any, void>({
            query: () => ({
                url: '/keyskills',
                method: 'GET',
            }),
        }),
    }),
})

export const {
    useGetAllKeySkillsQuery,
} = keySkillApi;