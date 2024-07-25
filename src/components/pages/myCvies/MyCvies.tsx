import React, { useEffect, useState } from "react";
import classes from './style.module.scss'
import Header from "../../header/Header";
import ModalMessage from "../../modalMessage/ModalMessage";
import ReactLoading from "react-loading";
import { useGetMyAllCviesQuery } from "../../../app/services/cvApi";
import CVList from "../../cv/CVList";
import { useNavigate } from "react-router-dom";

const MyCvies: React.FC = () => {
    const [allCvies, setAllCvies] = useState<any[]>([]);

    const myAllCvies = useGetMyAllCviesQuery();

    const navigate = useNavigate();

    console.log(myAllCvies);

    useEffect(() => {
        if ('data' in myAllCvies) {
            setAllCvies(myAllCvies.data?.cvies);
        }
    }, [myAllCvies]);

    return (
        <>
            <Header />
            <main className={classes.content}>
                <div className={classes.container}>
                    {myAllCvies.isLoading ? <ReactLoading type='spinningBubbles' color='#3B26B6' height={'20%'} width={'20%'} /> :
                        allCvies?.length > 0 ? <CVList cards={allCvies} type="self" /> :
                            <div className={classes.info}>
                                <h1>У вас пока нету резюме</h1>
                                <p>Вы можете создать себе первое резюме</p>
                                <button onClick={() => navigate('./../create')}>Создать резюме</button>
                            </div>
                    }
                </div>
            </main>
            <ModalMessage />
        </>
    )
}

export default MyCvies;