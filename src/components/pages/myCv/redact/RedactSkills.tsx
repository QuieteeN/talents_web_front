import React, { useEffect, useState } from "react";
import { Params, useNavigate, useParams } from "react-router-dom";
import { useGetMyCvByIdQuery, useUpdateKeySkillsMutation } from "../../../../app/services/cvApi";
import { useDispatch } from "react-redux";
import { ModalTypes, changeInfo } from "../../../../app/futures/user/modalSlice";

import { ReactComponent as TrashIcon } from './../../../../images/trash.svg'
import { ReactComponent as CheckIcon } from './../../../../images/checkSecond.svg'

import classes from './../style.module.scss'
import ReactLoading from "react-loading";

const RedactSkills: React.FC = () => {

    const params: Readonly<Params<string>> = useParams()

    const [skills, setSkills] = useState<string[]>([]);
    const [skill, setSkill] = useState<string>('');

    const cv = useGetMyCvByIdQuery({ cvId: params.cvId });

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if ('data' in cv) {
            const keySkills = cv.data?.cv?.keySkills.map((skill: any) => skill.name);
            console.log(keySkills)
            setSkills(keySkills || []);
        }
    }, [cv]);

    const handleAddChange = () => {
        const newSkills = [...skills];
        newSkills.push(skill);
        setSkill('');
        setSkills(newSkills);
    };

    const handleDeleteSkill = (index: number) => {
        const newSkills = [...skills];
        newSkills.splice(index, 1);
        setSkills(newSkills);
    }

    const [updateData] = useUpdateKeySkillsMutation()

    const handleSubmit = async () => {
        try {
            const data = {
                keySkills: skills,
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
            <h1>Ключевые навыки</h1>
            <span className={classes.return} onClick={() => navigate('./../info')}>Вернуться к резюме</span>
            {cv.isLoading ? <ReactLoading type='spinningBubbles' color='#3B26B6' height={'20%'} width={'20%'} /> :
                <div className={classes.form_content}>
                    <div className={classes.form}>
                        <div className={classes.info_box}>
                            {
                                skills.map((name: string, index: number) =>
                                    <div className={classes.skill_box}>
                                        <span className={classes.skill}>{name}</span>
                                        <span className={classes.remove} onClick={() => handleDeleteSkill(index)}>
                                            <TrashIcon />
                                        </span>
                                    </div>
                                )
                            }
                        </div>
                        <div className={`${classes.input_box} ${classes.skill_input}`}>
                            <div className={classes.input}>
                                <input type="text" id="skill" value={skill} onChange={(e: any) => setSkill(e.target.value)} />
                                <span className={classes.check} onClick={() => handleAddChange()}>
                                    <CheckIcon />
                                </span>
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

export default RedactSkills;