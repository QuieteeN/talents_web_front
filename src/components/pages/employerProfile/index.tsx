import React from "react";
import Header from "../../header/Header";
import classes from "./style.module.scss";
import ProfileLogo from "./ProfileLogo";
import { Params, useParams } from "react-router-dom";
import ModalMessage from "../../modalMessage/ModalMessage";
import RedactMenu from "./RedactMenu";
import RedactContent from "./RedactContent";
import SecurityContent from "./SecurityContent";
import ProfileContent from "./ProfileContent";

const EmployerProfile: React.FC = () => {

    const params: Readonly<Params<string>> = useParams()

    const Content: React.FC<{ type: string }> = ({ type }: { type: string }) => {
        switch (type) {
            case 'modify':
                return <RedactContent />
            case 'security':
                return <SecurityContent />
            default:
                return <ProfileContent />
        }
    }


    return (
        <>
            <Header />
            <main className={classes.content}>
                <div className={classes.container}>
                    <div className={classes.profileLogo}>
                        <ProfileLogo />
                        {params.type !== 'info' ? <></> :
                            <div className={classes.link_button}>
                                <a href="./modify">Редактировать</a>
                            </div>
                        }
                    </div>
                    <Content type={params.type || ''} />
                    <RedactMenu />
                </div>
            </main>
            <ModalMessage />
        </>
    )
}

export default EmployerProfile;