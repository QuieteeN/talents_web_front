import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

type SignIn = {
    email: string,
    password: string
}

type SignUp = {
    name: string,
    surname: string,
    email: string,
    password: string,
}

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/auth', credentials: 'include' }),
    endpoints: (builder) => ({
        loginStudent: builder.mutation<any, SignIn>({
            query: (data: SignIn) => ({
                url: '/login/student',
                method: "POST",
                body: data,
            }),
        }),
        loginEmployer: builder.mutation<any, SignIn>({
            query: (data: SignIn) => ({
                url: '/login/employer',
                method: "POST",
                body: data,
            })
        }),
        logout: builder.mutation<any, void>({
            query: (data: void) => ({
                url: '/logout',
                method: "POST",
            })
        }),
        signUpStudent: builder.mutation<any, SignUp>({
            query: (data: SignUp) => ({
                url: '/register/student',
                method: "POST",
                body: data,
            })
        }),
        signUpEmployer: builder.mutation<any, SignUp>({
            query: (data: SignUp) => ({
                url: '/register/employer',
                method: "POST",
                body: data,
            })
        }),
    })
})

export const {
    useLoginStudentMutation,
    useLoginEmployerMutation,
    useLogoutMutation,
    useSignUpStudentMutation,
    useSignUpEmployerMutation,
} = authApi;