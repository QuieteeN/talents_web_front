import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./services/authApi";
import { profileApi } from "./services/profileApi";
import { employerInfoApi } from "./services/employerInfoApi";
import { studentInfoApi } from './services/studentInfoApi';
import { vacancyApi } from './services/vacancyApi';
import { cvApi } from './services/cvApi'
import { searchApi } from './services/searchApi'
import { keySkillApi } from './services/keySkillApi'
import { languageApi } from './services/languageApi'
import { responseApi } from './services/responseApi'
import { favoriteApi } from './services/favoriteApi'
import modalReducer from './futures/user/modalSlice';
import authInfoReducer from './futures/authInfoSlice';
import createVacancyReducer from './futures/createVacancySlice';
import inviteModalReducer from './futures/inviteModalSlice'
import responseModalReducer from './futures/responseModalSlice'

const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        [profileApi.reducerPath]: profileApi.reducer,
        [employerInfoApi.reducerPath]: employerInfoApi.reducer,
        [studentInfoApi.reducerPath]: studentInfoApi.reducer,
        [vacancyApi.reducerPath]: vacancyApi.reducer,
        [cvApi.reducerPath]: cvApi.reducer,
        [searchApi.reducerPath]: searchApi.reducer,
        [keySkillApi.reducerPath]: keySkillApi.reducer,
        [languageApi.reducerPath]: languageApi.reducer,
        [responseApi.reducerPath]: responseApi.reducer,
        [favoriteApi.reducerPath]: favoriteApi.reducer,
        modal: modalReducer,
        authInfo: authInfoReducer,
        createVacancy: createVacancyReducer,
        inviteModal: inviteModalReducer,
        responseModal: responseModalReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(profileApi.middleware)
            .concat(authApi.middleware)
            .concat(employerInfoApi.middleware)
            .concat(studentInfoApi.middleware)
            .concat(vacancyApi.middleware)
            .concat(cvApi.middleware)
            .concat(searchApi.middleware)
            .concat(keySkillApi.middleware)
            .concat(languageApi.middleware)
            .concat(responseApi.middleware)
            .concat(favoriteApi.middleware)
});

export default store;
