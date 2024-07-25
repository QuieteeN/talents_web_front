import React from "react";
import Header from "../../../header/Header";
import classes from "./../style.module.scss";
import ProfileLogo from "./ProfileLogo";
import { Params, useParams } from "react-router-dom";
import ModalMessage from "../../../modalMessage/ModalMessage";
import Content from "./Content";

const EmployerForVisitor: React.FC = () => {

    const params: Readonly<Params<string>> = useParams()


    return (
        <>
            <Header />
            <main className={classes.content}>
                <div className={classes.container}>
                    <div className={classes.profileLogo}>
                        <ProfileLogo />
                    </div>
                    <Content employerId={Number(params.companyId)} />
                </div>
            </main>
            <ModalMessage />
        </>
    )
}

export default EmployerForVisitor;