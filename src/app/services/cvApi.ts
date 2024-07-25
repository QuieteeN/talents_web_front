import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BusinessTripTypes, CV, EducationLevelTypes, Language, MovingTypes, Salary, ScheduleTypes } from "../../components/types";
import { EmploymentType, ExperienceType } from "../../types/dbTypes";

export const cvApi: any = createApi({
    reducerPath: "cvApi",
    baseQuery: fetchBaseQuery({ 
        baseUrl: 'http://localhost:5000/api/cv',
        credentials: 'include'
    }),
    endpoints: (builder) => ({
        createCv: builder.mutation<any, CV>({
            query: (body) => ({
                url: '/create-cv',
                method: 'POST',
                body: body,
            }),
        }),
        getMyAllCvies: builder.query<any, void>({
            query: () => ({
                url: '/get-my-all-cvies',
                method: 'GET',
            }),
        }),
        getAllCvies: builder.query<any, void>({
            query: () => ({
                url: '/get-all-cvies',
                method: 'GET',
            }),
        }),
        getMyCvById: builder.query<any, {cvId: string}>({
            query: (data: {cvId: string}) => ({
                url: `/get-my-cv/${data.cvId}`,
                method: 'GET',
            }),
        }),
        getCvById: builder.query<any, {cvId: string}>({
            query: (data: {cvId: string}) => ({
                url: `/get-cv/${data.cvId}`,
                method: 'GET',
            }),
        }),
        updateDataForEmployer: builder.mutation<any, {city: string, movingType: MovingTypes, businessTripType: BusinessTripTypes, cvId: string}>({
            query: (data: {city: string, movingType: MovingTypes, businessTripType: BusinessTripTypes, cvId: string}) => ({
                url: `/update-data-for-employer/${data.cvId}`,
                method: 'put',
                body: data,
            }),
        }),
        updateMainInfo: builder.mutation<any, {name: string, experience: ExperienceType, salary: Salary, employmentTypes: EmploymentType[], schedules: ScheduleTypes[], cvId: string}>({
            query: (data: {name: string, experience: ExperienceType, salary: Salary, employmentTypes: EmploymentType[], schedules: ScheduleTypes[], cvId: string}) => ({
                url: `/update-main-info/${data.cvId}`,
                method: 'put',
                body: data,
            }),
        }),
        updateKeySkills: builder.mutation<any, {keySkills: string[], cvId: string}>({
            query: (data: {keySkills: string[], cvId: string}) => ({
                url: `/update-skills/${data.cvId}`,
                method: 'put',
                body: data,
            }),
        }),
        updateLicenseCategories: builder.mutation<any, {selectedCategories: string[], cvId: string}>({
            query: (data: {selectedCategories: string[], cvId: string}) => ({
                url: `/update-license-categories/${data.cvId}`,
                method: 'put',
                body: data,
            }),
        }),
        updateDescription: builder.mutation<any, {description: string, cvId: string}>({
            query: (data: {description: string, cvId: string}) => ({
                url: `/update-description/${data.cvId}`,
                method: 'put',
                body: data,
            }),
        }),
        updateInstitute: builder.mutation<any, {instituteName: string, facultyName: string, specialization: string, educationLevel: EducationLevelTypes, cvId: string}>({
            query: (data: {instituteName: string, facultyName: string, specialization: string, educationLevel: EducationLevelTypes, cvId: string}) => ({
                url: `/update-institute/${data.cvId}`,
                method: 'put',
                body: data,
            }),
        }),
        updateLanguages: builder.mutation<any, {languages: Language[], cvId: string}>({
            query: (data: {languages: Language[], cvId: string}) => ({
                url: `/update-languages/${data.cvId}`,
                method: 'put',
                body: data,
            }),
        }),
    }),
})

export const {
    useCreateCvMutation,
    useGetMyAllCviesQuery,
    useGetAllCviesQuery,
    useGetMyCvByIdQuery,
    useGetCvByIdQuery,
    useUpdateDataForEmployerMutation,
    useUpdateMainInfoMutation,
    useUpdateKeySkillsMutation,
    useUpdateLicenseCategoriesMutation,
    useUpdateDescriptionMutation,
    useUpdateInstituteMutation,
    useUpdateLanguagesMutation,
} = cvApi;