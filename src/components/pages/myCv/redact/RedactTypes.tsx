import React, { useEffect, useState } from "react";
import classes from './../style.module.scss'
import { BusinessTripTypes, MovingTypes } from "../../../types";
import { useGetMyCvByIdQuery, useUpdateDataForEmployerMutation } from "../../../../app/services/cvApi";
import { Params, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ModalTypes, changeInfo } from "../../../../app/futures/user/modalSlice";
import ReactLoading from "react-loading";

const RedactTypes: React.FC = () => {

    const params: Readonly<Params<string>> = useParams()

    const [city, setCity] = useState<string>('');
    const [moving, setMoving] = useState<string>(MovingTypes.NOT_READY);
    const [businessTrip, setBusinessTrip] = useState<string>(BusinessTripTypes.NEVER);

    const cv = useGetMyCvByIdQuery({ cvId: params.cvId });

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if ('data' in cv) {
            setCity(cv.data?.cv?.city);
            setMoving(cv.data?.cv?.movingType?.code || MovingTypes.NOT_READY);
            setBusinessTrip(cv.data?.cv?.businessTripType?.code || BusinessTripTypes.NEVER);
        }
    }, [cv]);

    const [updateData] = useUpdateDataForEmployerMutation();

    const handleChangeMoving = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMoving(event.target.value);
    };

    const handleChangeBusinessTrip = (event: React.ChangeEvent<HTMLInputElement>) => {
        setBusinessTrip(event.target.value);
    };

    const handleSubmit = async () => {
        try {
            if (city === '') {
                dispatch(changeInfo({ type: ModalTypes.ERROR, message: 'Введите город' }));
                return;
            }
            const data = {
                city,
                movingType: moving,
                businessTripType: businessTrip,
                cvId: params.cvId,
            }
            const res = await updateData(data);
            console.log(res);
            cv.refetch();
            dispatch(changeInfo({ type: ModalTypes.SUCCESS, message: res.data.message }))
        } catch (error: any) {
            if ('data' in error) {
                dispatch(changeInfo({ type: ModalTypes.ERROR, message: error.data.message }));
            }
            console.error('Error updating company info:', error.data.message);
        }
    }

    return (
        <div className={classes.redact_content}>
            <h1>Информация для работодателя</h1>
            <span className={classes.return} onClick={() => navigate('./../info')}>Вернуться к резюме</span>
            {cv.isLoading ? <ReactLoading type='spinningBubbles' color='#3B26B6' height={'20%'} width={'20%'} /> :
                <div className={classes.form_content}>
                    <div className={classes.form}>
                        <div className={classes.input_box}>
                            <div className={classes.label}>
                                <label htmlFor="city">Город</label>
                            </div>
                            <div className={classes.input}>
                                <input type="text" id="city" value={city} onChange={(e: any) => setCity(e.target.value)} />
                            </div>
                        </div>
                        <div className={`${classes.input_box} ${classes.align_start}`}>
                            <div className={classes.label}>
                                <label htmlFor="city">Переезд</label>
                            </div>
                            <div className={classes.input}>
                                <label className={`${classes.radioLabel} ${moving === MovingTypes.NOT_READY ? classes.checked : ''}`}>
                                    <input
                                        type="radio"
                                        name="experience"
                                        value={MovingTypes.NOT_READY}
                                        checked={moving === MovingTypes.NOT_READY}
                                        onChange={handleChangeMoving}
                                    />
                                    Не готов к переезду
                                </label>
                                <label className={`${classes.radioLabel} ${moving === MovingTypes.READY ? classes.checked : ''}`}>
                                    <input
                                        type="radio"
                                        name="experience"
                                        value={MovingTypes.READY}
                                        checked={moving === MovingTypes.READY}
                                        onChange={handleChangeMoving}
                                    />
                                    Готов к переезду
                                </label>
                                <label className={`${classes.radioLabel} ${moving === MovingTypes.WANT ? classes.checked : ''}`}>
                                    <input
                                        type="radio"
                                        name="experience"
                                        value={MovingTypes.WANT}
                                        checked={moving === MovingTypes.WANT}
                                        onChange={handleChangeMoving}
                                    />
                                    Переезд желателен
                                </label>
                            </div>
                        </div>
                        <div className={`${classes.input_box} ${classes.align_start}`}>
                            <div className={classes.label}>
                                <label>Готовность к командировкам</label>
                            </div>
                            <div className={classes.input}>
                                <label className={`${classes.radioLabel} ${businessTrip === BusinessTripTypes.NEVER ? classes.checked : ''}`}>
                                    <input
                                        type="radio"
                                        name="experience"
                                        value={BusinessTripTypes.NEVER}
                                        checked={businessTrip === BusinessTripTypes.NEVER}
                                        onChange={handleChangeBusinessTrip}
                                    />
                                    Никогда
                                </label>
                                <label className={`${classes.radioLabel} ${businessTrip === BusinessTripTypes.READY ? classes.checked : ''}`}>
                                    <input
                                        type="radio"
                                        name="experience"
                                        value={BusinessTripTypes.READY}
                                        checked={businessTrip === BusinessTripTypes.READY}
                                        onChange={handleChangeBusinessTrip}
                                    />
                                    Готов
                                </label>
                                <label className={`${classes.radioLabel} ${businessTrip === BusinessTripTypes.SOMETIMES ? classes.checked : ''}`}>
                                    <input
                                        type="radio"
                                        name="experience"
                                        value={BusinessTripTypes.SOMETIMES}
                                        checked={businessTrip === BusinessTripTypes.SOMETIMES}
                                        onChange={handleChangeBusinessTrip}
                                    />
                                    Иногда
                                </label>
                            </div>
                        </div>
                        <div className={classes.btn_box}>
                            <button
                                className={`${classes.btn} ${classes.first}`}
                                onClick={handleSubmit}
                            >
                                Сохранить
                            </button>
                            <button className={classes.btn} onClick={() => navigate('./../info')}>
                                Отмена
                            </button>
                        </div>
                    </div>
                    <div className={classes.information}>
                        <p>Укажите ваши настоящие данные.</p>
                    </div>
                </div>
            }
        </div>
    )
}

export default RedactTypes;