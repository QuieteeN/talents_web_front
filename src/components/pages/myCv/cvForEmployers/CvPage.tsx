import React from "react";
import classes from "./../style.module.scss"
import Header from "../../../header/Header";
import CvContent from "./CvContent";
import ModalInvite from "../../../modalInvite/ModalInvite";
import { Params, useParams } from "react-router-dom";
import ModalMessage from "../../../modalMessage/ModalMessage";

const CvPage: React.FC = () => {

    const params: Readonly<Params<string>> = useParams();

    return (
        <>
            <Header />
            <main className={classes.content}>
                <div className={classes.container}>
                    <CvContent />
                </div>
            </main>
            <ModalInvite index={params.cvId || ''} />
            <ModalMessage />
        </>
    )
}

export default CvPage;