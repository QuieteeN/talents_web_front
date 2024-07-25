import React, { useEffect, useState } from "react";
import classes from './../style.module.scss'
import { Params, useNavigate, useParams } from "react-router-dom";
import { EducationLevelText, EducationLevelTypes } from "../../../types";
import { useGetMyCvByIdQuery, useUpdateInstituteMutation } from "../../../../app/services/cvApi";
import { useDispatch } from "react-redux";
import { ModalTypes, changeInfo } from "../../../../app/futures/user/modalSlice";
import ReactLoading from "react-loading";

import { ReactComponent as ArrowIcon } from './../../../../images/arrow.svg'

const RedactInstitute: React.FC = () => {
    const navigate = useNavigate();
    const [institute, setInstitute] = useState<string>('');
    const [faculty, setFaculty] = useState<string>('');
    const [specialization, setSpecialization] = useState<string>('');
    const [educationLevel, setEducationLevel] = useState<string>(EducationLevelTypes.SECONDARY);
    const [isRotateEduc, setIsRotateEduc] = useState<boolean>(false);

    const params: Readonly<Params<string>> = useParams()

    const cv = useGetMyCvByIdQuery({ cvId: params.cvId });
    const dispatch = useDispatch();

    const [updateData] = useUpdateInstituteMutation();

    const handleEducationLevelChange = (value: string) => {
        setEducationLevel(value);
        console.log(value);
    }

    useEffect(() => {
        if ('data' in cv) {
            setInstitute(cv.data?.cv?.institute?.instituteName || '');
            setFaculty(cv.data?.cv?.institute?.facultyName || '');
            setSpecialization(cv.data?.cv?.institute?.specialization || '');
            setEducationLevel(cv.data?.cv?.institute?.educationLevel || '');
        }
    }, [cv]);

    const handleSubmit = async () => {
        try {
            const data = {
                instituteName: institute,
                facultyName: faculty,
                specialization: specialization,
                educationLevel: educationLevel,
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
            <h1>Образование</h1>
            <span className={classes.return} onClick={() => navigate('./../info')}>Вернуться к резюме</span>
            {cv.isLoading ? <ReactLoading type='spinningBubbles' color='#3B26B6' height={'20%'} width={'20%'} /> :
                <div className={classes.form_content}>
                    <div className={classes.form}>
                        <div className={classes.input_box}>
                            <div className={classes.label}>
                                <label>Образовательное учереждение</label>
                            </div>
                            <div className={classes.input}>
                                <input placeholder="Институт" type="text" id="institute" autoComplete="off" value={institute}
                                    onChange={(e: any) => setInstitute(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className={classes.input_box}>
                            <div className={classes.label}>
                                <label>Факультет</label>
                            </div>
                            <div className={classes.input}>
                                <input placeholder="Факультет" type="text" id="faculty" autoComplete="off" value={faculty}
                                    onChange={(e: any) => setFaculty(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className={classes.input_box}>
                            <div className={classes.label}>
                                <label>Специализация</label>
                            </div>
                            <div className={classes.input}>
                                <input placeholder="Специализация" type="text" id="specialization" autoComplete="off" value={specialization}
                                    onChange={(e: any) => setSpecialization(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className={classes.input_box}>
                            <div className={classes.label}>
                                <label>Уровень образования</label>
                            </div>
                            <div className={classes.input}>
                                <div className={classes.education_level_input}>
                                    <select
                                        value={educationLevel}
                                        onChange={(e) => handleEducationLevelChange(e.target.value)}
                                        onClick={() => setIsRotateEduc((prev: any) => !prev)}
                                        className={classes.language_level}
                                    >
                                        {Object.entries(EducationLevelText).map(([key, label]) => (
                                            <option value={key} key={key}>{label}</option>
                                        ))}
                                    </select>
                                    <span className={`${classes.select_icon} ${isRotateEduc ? classes.rotate : ''}`}>
                                        <ArrowIcon />
                                    </span>
                                </div>
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

export default RedactInstitute;