import React, { useEffect, useState } from "react";
import classes from './../style.module.scss'
import { Params, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useGetMyCvByIdQuery, useUpdateLanguagesMutation } from "../../../../app/services/cvApi";
import { Language } from "../../../types";
import { ModalTypes, changeInfo } from "../../../../app/futures/user/modalSlice";
import ReactLoading from "react-loading";

import { ReactComponent as ArrowIcon } from './../../../../images/arrow.svg'
import { ReactComponent as CloseIcon } from './../../../../images/xmark.svg'

const RedactLanguges: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const params: Readonly<Params<string>> = useParams()

    const cv = useGetMyCvByIdQuery({ cvId: params.cvId });
    const [updateData] = useUpdateLanguagesMutation();

    const [languages, setLanguages] = useState<Language[]>([]);
    const [isRotate, setIsRotate] = useState<boolean[]>([]);

    const handleLanguageChange = (index: number, field: keyof Language, value: string) => {
        const newLanguages = [...languages];
        newLanguages[index][field] = value;
        setLanguages(newLanguages);
    };

    const addLanguageInput = () => {
        setLanguages([...languages, { name: '', level: 'beginner_a1' }]);
        setIsRotate([...isRotate, false])
    };

    const handleDeleteLanguage = (index: number) => {
        const newLanguages = [...languages];
        newLanguages.splice(index, 1);
        setLanguages(newLanguages);
    }

    const handleChangeIsRotate = (index: number) => {
        const newRotate = [...isRotate];
        newRotate[index] = !newRotate[index];
        setIsRotate(newRotate);
    }

    useEffect(() => {
        if ('data' in cv) {
            const simplifiedLanguages = cv.data?.cv?.languages.map(({ name, level }: { name: string, level: string }) => ({ name, level }));
            setLanguages(simplifiedLanguages || []);
        }
    }, [cv]);

    const handleSubmit = async () => {
        try {
            const data = {
                languages: languages,
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
            <h1>Знание языков</h1>
            <span className={classes.return} onClick={() => navigate('./../info')}>Вернуться к резюме</span>
            {cv.isLoading ? <ReactLoading type='spinningBubbles' color='#3B26B6' height={'20%'} width={'20%'} /> :
                <div className={classes.form_content}>
                    <div className={classes.form}>
                        <div className={`${classes.input_box} ${classes.align_start} ${classes.skill_input}`}>
                            <div className={`${classes.input} ${classes.language_box}`}>
                                {languages.map((language: Language, index: number) => (
                                    <div key={index} className={classes.language_input}>
                                        <input
                                            type="text"
                                            placeholder="Язык"
                                            value={language.name}
                                            onChange={(e) => handleLanguageChange(index, 'name', e.target.value)}
                                            className={classes.language_name}
                                        />
                                        <select
                                            value={language.level}
                                            onChange={(e) => handleLanguageChange(index, 'level', e.target.value)}
                                            onClick={() => handleChangeIsRotate(index)}
                                            className={classes.language_level}
                                        >
                                            <option value="beginner_a1">А1 - Начальный</option>
                                            <option value="beginner_a2">А2 - Элементарный</option>
                                            <option value="intermediate_b1">B1 - Средний</option>
                                            <option value="intermediate_b2">B2 - Средне-продвинутый</option>
                                            <option value="advanced">С1 - Продвинутый</option>
                                            <option value="native">С2 - Носитель языка</option>
                                        </select>
                                        <span className={`${classes.select_icon} ${isRotate[index] ? classes.rotate : ''}`}>
                                            <ArrowIcon />
                                        </span>
                                        <span className={classes.delete_icon} onClick={() => { handleDeleteLanguage(index) }}>
                                            <CloseIcon />
                                        </span>
                                    </div>

                                ))}
                                <button type="button" onClick={addLanguageInput} className={classes.add_button}>
                                    Добавить язык
                                </button>
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

export default RedactLanguges;