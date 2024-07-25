import React from "react";
import Header from "../../header/Header";
import classes from './style.module.scss';
import ModalMessage from "../../modalMessage/ModalMessage";
import AddData from "./AddData";
import MainInfo from "./MainInfo";
import ContactInfo from "./ContactInfo";
import { useCreateVacancyMutation } from "../../../app/services/vacancyApi";
import { useDispatch, useSelector } from "react-redux";
import { Vacancy } from "../../types";
import { ModalTypes, changeInfo } from "../../../app/futures/user/modalSlice";
import { validateCreateVacancy } from "../../../validateUtils";

const VacancyCreate: React.FC = () => {

    const CreateContent: React.FC = () => {

        const createVacancyData = useSelector((state: any) => state.createVacancy);
        const dispatch = useDispatch();

        const [createVacancy] = useCreateVacancyMutation();

        const handleSubmit = async () => {
            const data: Vacancy = createVacancyData;
            const message = validateCreateVacancy(createVacancyData);

            if (message !== '') {
                dispatch(changeInfo({ type: ModalTypes.ERROR, message: message }));
                return;
            }

            try {
                const res = await createVacancy(data).unwrap();
                dispatch(changeInfo({ type: ModalTypes.SUCCESS, message: res.message }))
            } catch (error: any) {
                if ('data' in error) {
                    dispatch(changeInfo({ type: ModalTypes.ERROR, message: error?.data?.message }));
                }
                console.error('Error updating company info:', error);
            }
        }

        return (
            <>
                <div className={classes.create_header}>
                    <h2>Создание вакансии</h2>
                </div>
                <section className={classes.create_forms}>
                    <MainInfo />
                    <ContactInfo />
                    <AddData />
                    <div className={classes.btn_box}>
                        <button
                            className={`${classes.btn} ${classes.first}`}
                            onClick={handleSubmit}
                        >
                            Создать вакансию
                        </button>
                        <button className={classes.btn}>
                            Отменить
                        </button>
                        <button className={classes.btn}>
                            Сохранить как черновик
                        </button>
                    </div>
                </section>
            </>
        )
    }

    return (
        <>
            <Header />
            <main className={classes.content}>
                <div className={classes.container}>
                    <CreateContent />
                </div>
            </main>
            <ModalMessage />
        </>
    )
}

export default VacancyCreate
