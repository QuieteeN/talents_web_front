import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

type LikeVacancy = {
    vacancyId: number;
}

type LikeCv = {
    cvId: number;
}

export const favoriteApi = createApi({
    reducerPath: "favoriteApi",
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/favorite', credentials: 'include' }),
    endpoints: (builder) => ({
        toggleLikeVacancy: builder.mutation<any, LikeVacancy>({
            query: (data: LikeVacancy) => ({
                url: '/vacancy',
                method: "POST",
                body: data,
            }),
        }),
        toggleLikeCv: builder.mutation<any, LikeCv>({
            query: (data: LikeCv) => ({
                url: '/cv',
                method: "POST",
                body: data,
            })
        }),
        getAllLikedVacancies: builder.query<any, void>({
            query: () => ({
                url: "/vacancy/all",
                method: "GET",
            })
        }),
        getAllLikedCvs: builder.query<any, void>({
            query: () => ({
                url: "/cv/all",
                method: "GET",
            })
        })

    })
})

export const {
    useToggleLikeCvMutation,
    useToggleLikeVacancyMutation,
    useGetAllLikedVacanciesQuery,
    useGetAllLikedCvsQuery,
} = favoriteApi;