import React, { useEffect, useState } from "react";
import classes from './style.module.scss'
import { useGetAllVacanciesQuery } from "../../../app/services/vacancyApi";
import Header from "../../header/Header";
import ModalMessage from "../../modalMessage/ModalMessage";
import CardList from "../../card/CardList";
import ReactLoading from "react-loading";

const MyVacancies: React.FC = () => {
    const [allVacancies, setAllVacancies] = useState<any[]>([]);

    const getAllVacancies = useGetAllVacanciesQuery();

    console.log(getAllVacancies);

    useEffect(() => {
        if ('data' in getAllVacancies) {
            setAllVacancies(getAllVacancies.data?.vacancies);
        }
    }, [getAllVacancies]);

    return (
        <>
            <Header />
            <main className={classes.content}>
                <div className={classes.container}>
                    {getAllVacancies.isLoading ? <ReactLoading type='spinningBubbles' color='#3B26B6' height={'20%'} width={'20%'} /> :
                        <CardList cards={allVacancies} type="self" />
                    }
                </div>
            </main>
            <ModalMessage />
        </>
    )
}

export default MyVacancies;