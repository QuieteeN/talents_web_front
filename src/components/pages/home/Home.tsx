import React, { useEffect, useState } from "react";
import Header from "../../header/Header";
import classes from './style.module.scss'
import CardList from "../../card/CardList";
import CVList from "../../cv/CVList";
import ModalMessage from "../../modalMessage/ModalMessage";
import { useGetVacanciesQuery } from "../../../app/services/vacancyApi";
import ReactLoading from "react-loading";
import { useGetMyAllCviesQuery } from "../../../app/services/cvApi";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { UserTypes } from "../../../app/futures/authInfoSlice";

const Home: React.FC = () => {
    const authInfo = useSelector((state: any) => state.authInfo);
    const navigate = useNavigate()

    useEffect(() => {
        navigate(redirectUser())
    }, [navigate])

    const redirectUser = () => {
        switch (authInfo.type) {
            case UserTypes.EMPLOYER:
                return '/cvies';
            case UserTypes.STUDENT:
                return '/vacancies'
            default:
                return '/vacancies'
        }
    }

    return null
}

export default Home;