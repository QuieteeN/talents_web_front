import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const responseApi: any = createApi({
    reducerPath: "responseApi",
    baseQuery: fetchBaseQuery({ 
        baseUrl: 'http://localhost:5000/api/response',
        credentials: 'include'
    }),
    endpoints: (builder) => ({
        createResponseByEmployer: builder.mutation<any, {vacancyId: number, cvId: number, content: string}>({
            query: (data: {vacancyId: number, cvId: number, content: string}) => ({
                url: '/response-invite',
                method: 'POST',
                body: data,
            }),
        }),
        createResponseByStudent: builder.mutation<any, {vacancyId: number, cvId: number, content: string}>({
            query: (data: {vacancyId: number, cvId: number, content: string}) => ({
                url: '/response',
                method: 'POST',
                body: data,
            }),
        }),
        getResponsesForEmployer: builder.query<any, void>({
            query: () => ({
                url: '/get-employer-responses',
                method: 'GET',
            }),
        }),
        getMessages: builder.query<any, {responseId: number}>({
            query: (data: {responseId: number}) => ({
                url: `/get-messages/${data.responseId}`,
                method: 'GET',
            }),
        }),
        createMessage: builder.mutation<any, {content: string, responseId: number}>({
            query: (data: {content: string, responseId: number}) => ({
                url: `/create-message`,
                method: 'POST',
                body: data,
            }),
        }),
        createMessageEmployer: builder.mutation<any, {content: string, responseId: number, status: string}>({
            query: (data: {content: string, responseId: number, status: string}) => ({
                url: `/create-invation`,
                method: 'POST',
                body: data,
            }),
        }),
        getResponsesForStudent: builder.query<any, void>({
            query: () => ({
                url: '/get-student-responses',
                method: 'GET',
            }),
        }),
        getMessagesStudent: builder.query<any, {responseId: number}>({
            query: (data: {responseId: number}) => ({
                url: `/get-student-messages/${data.responseId}`,
                method: 'GET',
            }),
        }),
        markMessagesAsRead: builder.mutation<any, {responseId: number}>({
            query: (data: {responseId: number}) => ({
                url: `/messages/read/${data.responseId}`,
                method: 'PUT',
            }),
        }),
    }),
})

export const {
    useCreateResponseByEmployerMutation,
    useCreateResponseByStudentMutation,
    useGetResponsesForEmployerQuery,
    useGetMessagesQuery,
    useCreateMessageMutation,
    useCreateMessageEmployerMutation,
    useGetResponsesForStudentQuery,
    useGetMessagesStudentQuery,
    useMarkMessagesAsReadMutation,
} = responseApi;