import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { EmploymentTypes, ExperienceTypes, Language, SalaryTypes, ScheduleTypes, Vacancy } from "../../components/types";

const initialState: Vacancy = {
    name: '',
    specialization: '',
    city: '',
    experience: ExperienceTypes.HAVENT,
    description: '',
    isVisibleContacts: true,
    employment_type: EmploymentTypes.NO,
    schedule: ScheduleTypes.NO,
    salary: {
        salaryFrom: null,
        salaryTo: null,
        type: SalaryTypes.BEFORE_TAXES
    },
    address: {
        country: '',
        state: '',
        city: '',
        street: '',
        houseNumber: '',
        pos: '',
    },
    keySkills: [],
    languages: [],
    licenseCategories: [],
}

export const createVacancySlice = createSlice({
    name: 'createVacancy',
    initialState,
    reducers: {
        setName: (state: Vacancy, action: PayloadAction<{name: string}>) => {
            state.name = action.payload.name;
        },
        setSpecialization: (state: Vacancy, action: PayloadAction<{specialization: string}>) => {
            state.specialization = action.payload.specialization;
        },
        setCity: (state: Vacancy, action: PayloadAction<{city: string}>) => {
            state.city = action.payload.city;
        },
        setExperience: (state: Vacancy, action: PayloadAction<{experience: string}>) => {
            switch (action.payload.experience) {
                case ExperienceTypes.HAVENT:
                    state.experience = ExperienceTypes.HAVENT;
                    break;
                case ExperienceTypes.LOWER_ONE:
                    state.experience = ExperienceTypes.LOWER_ONE;
                    break;
                case ExperienceTypes.ONE_THREE:
                    state.experience = ExperienceTypes.ONE_THREE;
                    break;
                case ExperienceTypes.THREE_SIX:
                    state.experience = ExperienceTypes.THREE_SIX;
                    break;
                case ExperienceTypes.UPPER_SIX:
                    state.experience = ExperienceTypes.UPPER_SIX;
                    break;
                default:
                    state.experience = ExperienceTypes.HAVENT;
                    break;
            }
        },
        setDescription: (state: Vacancy, action: PayloadAction<{description: string}>) => {
            state.description = action.payload.description;
        },
        setIsVisibleContacts: (state: Vacancy, action: PayloadAction<{isVisibleContacts: boolean}>) => {
            state.isVisibleContacts = action.payload.isVisibleContacts;
        },
        setEmploymentType: (state: Vacancy, action: PayloadAction<{employment_type: string}>) => {
            switch (action.payload.employment_type) {
                case EmploymentTypes.FULL_EMPLOYMENT:
                    state.employment_type = EmploymentTypes.FULL_EMPLOYMENT;
                    break;
                case EmploymentTypes.PART_TIME_EMPLOYMENT:
                    state.employment_type = EmploymentTypes.PART_TIME_EMPLOYMENT;
                    break;
                case EmploymentTypes.PROJECT_WORK:
                    state.employment_type = EmploymentTypes.PROJECT_WORK;
                    break;
                case EmploymentTypes.INTERSHIP:
                    state.employment_type = EmploymentTypes.INTERSHIP;
                    break;
                default:
                    state.employment_type = EmploymentTypes.NO;
                    break;
            }
        },
        setSchedule: (state: Vacancy, action: PayloadAction<{schedule: string}>) => {
            switch (action.payload.schedule) {
                case ScheduleTypes.FULL_DAY:
                    state.schedule = ScheduleTypes.FULL_DAY;
                    break;
                case ScheduleTypes.SHIFT_WORK:
                    state.schedule = ScheduleTypes.SHIFT_WORK;
                    break;
                case ScheduleTypes.FLEXIBLE_SHEDULE:
                    state.schedule = ScheduleTypes.FLEXIBLE_SHEDULE;
                    break;
                case ScheduleTypes.DISTANT_WORK:
                    state.schedule = ScheduleTypes.DISTANT_WORK;
                    break;
                default:
                    state.schedule = ScheduleTypes.NO;
                    break;
            }
        },
        setSalaryFrom: (state: Vacancy, action: PayloadAction<{salaryFrom: number}>) => {
            state.salary.salaryFrom = action.payload.salaryFrom;
        },
        setSalaryTo: (state: Vacancy, action: PayloadAction<{salaryTo: number}>) => {
            state.salary.salaryTo = action.payload.salaryTo;
        },
        setSalaryType: (state: Vacancy, action: PayloadAction<{ salaryType: string }>) => {
            switch (action.payload.salaryType) {
                case SalaryTypes.AFTER_TAXES:
                    state.salary.type = SalaryTypes.AFTER_TAXES;
                    break;
                default:
                    state.salary.type = SalaryTypes.BEFORE_TAXES;
                    break;
            }
        },
        setCountry: (state: Vacancy, action: PayloadAction<{country: string}>) => {
            state.address = {...state.address, country: action.payload.country};
        },
        setAddressState: (state: Vacancy, action: PayloadAction<{state: string}>) => {
            state.address = {...state.address, state: action.payload.state};
        },
        setAddressCity: (state: Vacancy, action: PayloadAction<{city: string}>) => {
            state.address = {...state.address, city: action.payload.city};
        },
        setAddressStreet: (state: Vacancy, action: PayloadAction<{street: string}>) => {
            state.address = {...state.address, street: action.payload.street};
        },
        setAddressHouseNumber: (state: Vacancy, action: PayloadAction<{houseNumber: string}>) => {
            state.address = {...state.address, houseNumber: action.payload.houseNumber};
        },
        setAddressPos: (state: Vacancy, action: PayloadAction<{pos: string | undefined}>) => {
            state.address = {...state.address, pos: action.payload.pos};
        },
        setKeySkills: (state: Vacancy, action: PayloadAction<{keySkills: string[]}>) => {
            state.keySkills = action.payload.keySkills;
        },
        setLanguages: (state: Vacancy, action: PayloadAction<{languages: Language[]}>) => {
            state.languages = action.payload.languages;
        },
        setLicenseCategories: (state: Vacancy, action: PayloadAction<{licenseCategories: string[]}>) => {
            state.licenseCategories = action.payload.licenseCategories;
        },
    }
});

// Action creators are generated for each case reducer function
export const { 
    setName,
    setSpecialization,
    setCity,
    setExperience,
    setDescription,
    setIsVisibleContacts,
    setEmploymentType,
    setSchedule,
    setSalaryFrom,
    setSalaryTo,
    setSalaryType,
    setCountry,
    setAddressState,
    setAddressCity,
    setAddressStreet,
    setAddressHouseNumber,
    setAddressPos,
    setKeySkills,
    setLanguages,
    setLicenseCategories,
} = createVacancySlice.actions

export default createVacancySlice.reducer;
