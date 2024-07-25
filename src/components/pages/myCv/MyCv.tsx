import React from "react";
import classes from './style.module.scss'
import Header from "../../header/Header";
import ModalMessage from "../../modalMessage/ModalMessage";
import { Params, useParams } from "react-router-dom";
import CvContent from "./CvContent";
import RedactTypes from "./redact/RedactTypes";
import RedactMainInfo from "./redact/RedactMainInfo";
import RedactSkills from "./redact/RedactSkills";
import RedactLiscense from "./redact/RedactLicense";
import RedactDescription from "./redact/RedactDescription";
import RedactInstitute from "./redact/RedactInstitute";
import RedactLanguges from "./redact/RedactLanguages";

const MyCv: React.FC = () => {

    const params: Readonly<Params<string>> = useParams()

    const Content: React.FC<{ type: string }> = ({ type }: { type: string }) => {
        switch (type) {
            case 'modifyTypes':
                return <RedactTypes />
            case 'modifyMainInfo':
                return <RedactMainInfo />
            case 'modifySkills':
                return <RedactSkills />
            case 'modifyLicense':
                return <RedactLiscense />
            case 'modifyDescription':
                return <RedactDescription />
            case 'modifyEducation':
                return <RedactInstitute />
            case 'modifyLanguages':
                return <RedactLanguges />
            default:
                return <CvContent />
        }
    }

    return (
        <>
            <Header />
            <main className={classes.content}>
                <div className={classes.container}>
                    <Content type={params.type || ''} />
                </div>
            </main>
            <ModalMessage />
        </>
    )
}

export default MyCv;