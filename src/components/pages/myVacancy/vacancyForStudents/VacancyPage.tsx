import React from "react";
import classes from "./../style.module.scss"
import Header from "../../../header/Header";
import VacancyContent from "./VacancyContent";
import ModalResponse from "../../../modalResponse/ModalResponse";
import { Params, useParams } from "react-router-dom";
import ModalMessage from "../../../modalMessage/ModalMessage";

const VacancyPage: React.FC = () => {
    const params: Readonly<Params<string>> = useParams()

    return (
        <>
            <Header />
            <main className={classes.content}>
                <div className={classes.container}>
                    <VacancyContent />
                </div>
            </main>
            <ModalResponse index={params.vacancyId || ''} />
            <ModalMessage />
        </>
    )
}

export default VacancyPage;