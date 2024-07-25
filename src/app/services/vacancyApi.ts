import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { EmploymentTypes, ExperienceTypes, Language, SalaryTypes, ScheduleTypes, Vacancy } from "../../components/types";

export const vacancyApi: any = createApi({
    reducerPath: "vacancyApi",
    baseQuery: fetchBaseQuery({ 
        baseUrl: 'http://localhost:5000/api/vacancy',
        credentials: 'include'
    }),
    endpoints: (builder) => ({
        createVacancy: builder.mutation<any, Vacancy>({
            query: (body) => ({
                url: '/create-vacancy',
                method: 'POST',
                body: body,
            }),
        }),
        getAllVacancies: builder.query<any, void>({
            query: () => ({
                url: '/vacancies',
                method: 'GET',
            }),
        }),
        getVacancies: builder.query<any, void>({
            query: () => ({
                url: '/all-vacancies',
                method: 'GET',
            }),
        }),
        getMyVacancy: builder.query<any, {vacancyId: number}>({
            query: (data: {vacancyId: number}) => ({
                url: `/vacancies/${data.vacancyId}`,
                method: 'GET',
            }),
        }),
        getVacancyById: builder.query<any, {vacancyId: number}>({
            query: (data: {vacancyId: number}) => ({
                url: `/vacancies/${data.vacancyId}/visitor`,
                method: 'GET',
            }),
        }),
        updateMainInfoVacancy: builder.mutation<any, {name: string, specialization: string, city: string, vacancyId: number}>({
            query: (data: {name: string, specialization: string, city: string, vacancyId: number}) => ({
                url: `/vacancies/${data.vacancyId}/update-main-info`,
                method: 'PUT',
                body: data,
            }),
        }),
        updateSalaryVacancy: builder.mutation<any, {salaryFrom: string, salaryTo: string, type: SalaryTypes, vacancyId: number}>({
            query: (data: {salaryFrom: string, salaryTo: string, type: SalaryTypes, vacancyId: number}) => ({
                url: `/vacancies/${data.vacancyId}/update-salary`,
                method: 'PUT',
                body: data,
            }),
        }),
        updateDescriptionVacancy: builder.mutation<any, {description: string, vacancyId: number}>({
            query: (data: {description: string, vacancyId: number}) => ({
                url: `/vacancies/${data.vacancyId}/update-description`,
                method: 'PUT',
                body: data,
            }),
        }),
        updateAddressVacancy: builder.mutation<any, {country: string, state: string, city: string, street: string, houseNumber: string, pos: string, vacancyId: number}>({
            query: (data: {country: string, state: string, city: string, street: string, houseNumber: string, pos: string, vacancyId: number}) => ({
                url: `/vacancies/${data.vacancyId}/update-address`,
                method: 'PUT',
                body: data,
            }),
        }),
        updateExperienceVacancy: builder.mutation<any, {experience: ExperienceTypes, vacancyId: number}>({
            query: (data: {experience: ExperienceTypes, vacancyId: number}) => ({
                url: `/vacancies/${data.vacancyId}/update-experience`,
                method: 'PUT',
                body: data,
            }),
        }),
        updateSkillsVacancy: builder.mutation<any, {skills: string[], vacancyId: number}>({
            query: (data: {skills: string[], vacancyId: number}) => ({
                url: `/vacancies/${data.vacancyId}/update-skills`,
                method: 'PUT',
                body: data,
            }),
        }),
        updateVisibleContactsVacancy: builder.mutation<any, {isVisibleContacts: boolean, vacancyId: number}>({
            query: (data: {isVisibleContacts: boolean, vacancyId: number}) => ({
                url: `/vacancies/${data.vacancyId}/update-visible-contacts`,
                method: 'PUT',
                body: data,
            }),
        }),
        updateEmploymentTypeVacancy: builder.mutation<any, {employmentType: EmploymentTypes, vacancyId: number}>({
            query: (data: {employmentType: EmploymentTypes, vacancyId: number}) => ({
                url: `/vacancies/${data.vacancyId}/update-employment-type`,
                method: 'PUT',
                body: data,
            }),
        }),
        updateScheduleVacancy: builder.mutation<any, {schedule: ScheduleTypes, vacancyId: number}>({
            query: (data: {schedule: ScheduleTypes, vacancyId: number}) => ({
                url: `/vacancies/${data.vacancyId}/update-schedule`,
                method: 'PUT',
                body: data,
            }),
        }),
        updateLanguagesVacancy: builder.mutation<any, {languages: Language[], vacancyId: number}>({
            query: (data: {languages: Language[], vacancyId: number}) => ({
                url: `/vacancies/${data.vacancyId}/update-languages`,
                method: 'PUT',
                body: data,
            }),
        }),
        updateLicenseCategoriesVacancy: builder.mutation<any, {selectedCategories: string[], vacancyId: number}>({
            query: (data: {selectedCategories: string[], vacancyId: number}) => ({
                url: `/vacancies/${data.vacancyId}/update-license-categories`,
                method: 'PUT',
                body: data,
            }),
        }),
    }),
})

export const {
    useCreateVacancyMutation,
    useGetAllVacanciesQuery,
    useGetVacanciesQuery,
    useGetMyVacancyQuery,
    useGetVacancyByIdQuery,
    useUpdateMainInfoVacancyMutation,
    useUpdateSalaryVacancyMutation,
    useUpdateDescriptionVacancyMutation,
    useUpdateAddressVacancyMutation,
    useUpdateExperienceVacancyMutation,
    useUpdateSkillsVacancyMutation,
    useUpdateVisibleContactsVacancyMutation,
    useUpdateEmploymentTypeVacancyMutation,
    useUpdateScheduleVacancyMutation,
    useUpdateLanguagesVacancyMutation,
    useUpdateLicenseCategoriesVacancyMutation,
} = vacancyApi;