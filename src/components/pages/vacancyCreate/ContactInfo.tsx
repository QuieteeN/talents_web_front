import React from "react";
import classes from './style.module.scss'
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setIsVisibleContacts } from "../../../app/futures/createVacancySlice";

const ContactInfo: React.FC = () => {
    const createVacancy = useSelector((state: any) => state.createVacancy);
    const dispatch = useDispatch();

    const handleContactVisibleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.value === 'yes') {
            dispatch(setIsVisibleContacts({ isVisibleContacts: true }));
        } else {
            dispatch(setIsVisibleContacts({ isVisibleContacts: false }));
        }
    }

    return (
        <div className={classes.create_item}>
            <h3>Контактная информация</h3>
            <div className={classes.input_box}>
                <div className={classes.label}>
                    <label>Контактная информация</label>
                </div>
                <div className={classes.input}>
                    <label className={`${classes.radioLabel} ${createVacancy.isVisibleContacts ? classes.checked : ''}`}>
                        <input
                            type="radio"
                            name="contactVisible"
                            value="yes"
                            checked={createVacancy.isVisibleContacts}
                            onChange={handleContactVisibleChange}
                        />
                        Показывать в вакансии
                    </label>
                    <label className={`${classes.radioLabel} ${!createVacancy.isVisibleContacts ? classes.checked : ''}`}>
                        <input
                            type="radio"
                            name="contactVisible"
                            value="no"
                            checked={!createVacancy.isVisibleContacts}
                            onChange={handleContactVisibleChange}
                        />
                        Не показывать в вакансии
                    </label>
                </div>
            </div>
        </div>
    )
}

export default ContactInfo;