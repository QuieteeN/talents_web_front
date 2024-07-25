import React, { useEffect, useState } from "react";
import { useGetMyCvByIdQuery, useUpdateDescriptionMutation } from "../../../../app/services/cvApi";
import { Params, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ModalTypes, changeInfo } from "../../../../app/futures/user/modalSlice";

import classes from './../style.module.scss'
import ReactLoading from "react-loading";

const RedactDescription: React.FC = () => {
    const params: Readonly<Params<string>> = useParams()
    const cv = useGetMyCvByIdQuery({ cvId: params.cvId });

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [description, setDescription] = useState<string>('');
    const [updateData] = useUpdateDescriptionMutation();

    useEffect(() => {
        if ('data' in cv) {
            setDescription(cv.data?.cv?.description);
        }
    }, [cv]);

    const handleSubmit = async () => {
        try {
            if (description === '') {
                dispatch(changeInfo({ type: ModalTypes.ERROR, message: 'Введите город' }));
                return;
            }
            const data = {
                description,
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
            <h1>Обо мне</h1>
            <span className={classes.return} onClick={() => navigate('./../info')}>Вернуться к резюме</span>
            {cv.isLoading ? <ReactLoading type='spinningBubbles' color='#3B26B6' height={'20%'} width={'20%'} /> :
                <div className={classes.form_content}>
                    <div className={classes.form}>
                        <div className={`${classes.input_box} ${classes.align_start}`}>
                            <div className={classes.label}>
                                <label htmlFor="city">Город</label>
                            </div>
                            <div className={`${classes.input} ${classes.description}`}>
                                <textarea name="description" id="description" value={description} onChange={(e: any) => setDescription(e.target.value)} ></textarea>
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
                        <p>Ваше хобби, личные качества, любая дополнительная информация</p>
                    </div>
                </div>
            }
        </div>
    )
}

export default RedactDescription;