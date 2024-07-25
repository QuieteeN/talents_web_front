import React, { useEffect, useState } from 'react';
import classes from './../style.module.scss'
import { Params, useNavigate, useParams } from 'react-router-dom';
import { EmploymentTypes, ExperienceTypes, SalaryTypes, ScheduleTypes } from '../../../types';
import { useGetMyCvByIdQuery, useUpdateMainInfoMutation } from '../../../../app/services/cvApi';
import { useDispatch } from 'react-redux';
import { ModalTypes, changeInfo } from '../../../../app/futures/user/modalSlice';
import ReactLoading from 'react-loading';

import { ReactComponent as Checkbox } from './../../../../images/check.svg'
import { ReactComponent as FullCheckbox } from './../../../../images/fullCheck.svg'

const RedactMainInfo: React.FC = () => {

    const params: Readonly<Params<string>> = useParams()

    const [name, setName] = useState<string>('');
    const [salaryFrom, setSalaryFrom] = useState<string>('');
    const [salaryTo, setSalaryTo] = useState<string>('');
    const [experience, setExperience] = useState<string>(ExperienceTypes.HAVENT);
    const [type, setType] = useState<string>(SalaryTypes.BEFORE_TAXES)
    const [employmentTypes, setEmploymentTypes] = useState<string[]>([]);
    const [schedule, setSchedule] = useState<string[]>([]);

    const cv = useGetMyCvByIdQuery({ cvId: params.cvId });

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if ('data' in cv) {
            setName(cv.data?.cv?.name);
            setSalaryFrom(cv.data?.cv?.salary?.salaryFrom);
            setExperience(cv.data?.cv?.experience?.code || ExperienceTypes.HAVENT);
            const employmentTypess = cv.data?.cv?.employmentTypes.map((employmentType: any) => employmentType.code);
            const schedules = cv.data?.cv?.schedules.map((schedule: any) => schedule.code);
            setEmploymentTypes(employmentTypess || []);
            setSchedule(schedules || []);
        }
    }, [cv]);

    const [updateData] = useUpdateMainInfoMutation();

    const handleChangeSalaryType = (event: React.ChangeEvent<HTMLInputElement>) => {
        setType(event.target.value);
    };

    const handleExperienceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setExperience(event.target.value);
    }

    const handleChangeEmploymentType = (event: any) => {
        const { value, checked } = event.target;
        if (checked) {
            setEmploymentTypes((prev: string[]) => [...prev, value]);
        } else {
            setEmploymentTypes((prev: string[]) => prev.filter((type: string) => type !== value));
        }
    };

    const handleChangeSchedule = (event: any) => {
        const { value, checked } = event.target;
        if (checked) {
            setSchedule((prev: string[]) => [...prev, value]);
        } else {
            setSchedule((prev: string[]) => prev.filter((type: string) => type !== value));
        }
    };


    const handleSubmit = async () => {
        try {
            if (name === '') {
                dispatch(changeInfo({ type: ModalTypes.ERROR, message: 'Введите город' }));
                return;
            }
            const data = {
                name,
                salary: {
                    salaryFrom: salaryFrom,
                    salaryTo: salaryTo,
                    type: type,
                },
                experience,
                employmentTypes,
                schedules: schedule,
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
            <h1>Желаемая должность и зарплата</h1>
            <span className={classes.return} onClick={() => navigate('./../info')}>Вернуться к резюме</span>
            {cv.isLoading ? <ReactLoading type='spinningBubbles' color='#3B26B6' height={'20%'} width={'20%'} /> :
                <div className={classes.form_content}>
                    <div className={classes.form}>
                        <div className={classes.input_box}>
                            <div className={classes.label}>
                                <label htmlFor="city">Должность</label>
                            </div>
                            <div className={classes.input}>
                                <input type="text" id="city" value={name} onChange={(e: any) => setName(e.target.value)} />
                            </div>
                        </div>
                        <div className={`${classes.input_box} ${classes.align_start}`}>
                            <div className={classes.label}>
                                <label htmlFor="salaryFrom">Желаемый доход</label>
                            </div>
                            <div className={`${classes.input} ${classes.row}`}>
                                <input placeholder="От" type="text" id="salaryFrom" autoComplete="off" value={salaryFrom}
                                    onChange={(e: any) => setSalaryFrom(e.target.value)} />
                                <input placeholder="До" type="text" id="salaryTo" autoComplete="off" value={salaryTo}
                                    onChange={(e: any) => setSalaryTo(e.target.value)} />
                            </div>
                            <div className={`${classes.add_input}`}>
                                <label className={`${classes.radioLabel} ${type === SalaryTypes.BEFORE_TAXES ? classes.checked : ''}`}>
                                    <input
                                        type="radio"
                                        name="taxOption"
                                        value={SalaryTypes.BEFORE_TAXES}
                                        checked={type === SalaryTypes.BEFORE_TAXES}
                                        onChange={handleChangeSalaryType}
                                    />
                                    До вычета налогов
                                </label>
                                <label className={`${classes.radioLabel} ${type === SalaryTypes.AFTER_TAXES ? classes.checked : ''}`}>
                                    <input
                                        type="radio"
                                        name="taxOption"
                                        value={SalaryTypes.AFTER_TAXES}
                                        checked={type === SalaryTypes.AFTER_TAXES}
                                        onChange={handleChangeSalaryType}
                                    />
                                    На руки
                                </label>
                            </div>
                        </div>
                        <div className={`${classes.input_box} ${classes.align_start}`}>
                            <div className={classes.label}>
                                <label>Опыт работы</label>
                            </div>
                            <div className={classes.input}>
                                <label className={`${classes.radioLabel} ${experience === ExperienceTypes.HAVENT ? classes.checked : ''}`}>
                                    <input
                                        type="radio"
                                        name="experience"
                                        value={ExperienceTypes.HAVENT}
                                        checked={experience === ExperienceTypes.HAVENT}
                                        onChange={handleExperienceChange}
                                    />
                                    Без опыта
                                </label>
                                <label className={`${classes.radioLabel} ${experience === ExperienceTypes.LOWER_ONE ? classes.checked : ''}`}>
                                    <input
                                        type="radio"
                                        name="experience"
                                        value={ExperienceTypes.LOWER_ONE}
                                        checked={experience === ExperienceTypes.LOWER_ONE}
                                        onChange={handleExperienceChange}
                                    />
                                    Менее 1 года
                                </label>
                                <label className={`${classes.radioLabel} ${experience === ExperienceTypes.ONE_THREE ? classes.checked : ''}`}>
                                    <input
                                        type="radio"
                                        name="experience"
                                        value={ExperienceTypes.ONE_THREE}
                                        checked={experience === ExperienceTypes.ONE_THREE}
                                        onChange={handleExperienceChange}
                                    />
                                    От 1 года до 3 лет
                                </label>
                                <label className={`${classes.radioLabel} ${experience === ExperienceTypes.THREE_SIX ? classes.checked : ''}`}>
                                    <input
                                        type="radio"
                                        name="experience"
                                        value={ExperienceTypes.THREE_SIX}
                                        checked={experience === ExperienceTypes.THREE_SIX}
                                        onChange={handleExperienceChange}
                                    />
                                    От 3 до 6 лет
                                </label>
                                <label className={`${classes.radioLabel} ${experience === ExperienceTypes.UPPER_SIX ? classes.checked : ''}`}>
                                    <input
                                        type="radio"
                                        name="experience"
                                        value={ExperienceTypes.UPPER_SIX}
                                        checked={experience === ExperienceTypes.UPPER_SIX}
                                        onChange={handleExperienceChange}
                                    />
                                    Более 6 лет
                                </label>
                            </div>
                        </div>
                        <div className={`${classes.input_box} ${classes.align_start}`}>
                            <div className={classes.label}>
                                <label>Тип занятости</label>
                            </div>
                            <div className={`${classes.input} ${classes.row_wrap}`}>
                                <label className={`${classes.checkboxLabel} ${employmentTypes.includes(EmploymentTypes.FULL_EMPLOYMENT) ? classes.checked : ''}`}>
                                    <input
                                        type="checkbox"
                                        name="employment_type"
                                        value={EmploymentTypes.FULL_EMPLOYMENT}
                                        checked={employmentTypes.includes(EmploymentTypes.FULL_EMPLOYMENT)}
                                        onChange={handleChangeEmploymentType}
                                    />
                                    Полная занятость
                                    <span className={classes.icon}>
                                        {employmentTypes.includes(EmploymentTypes.FULL_EMPLOYMENT) ? <FullCheckbox /> : <Checkbox />}
                                    </span>
                                </label>
                                <label className={`${classes.checkboxLabel} ${employmentTypes.includes(EmploymentTypes.PART_TIME_EMPLOYMENT) ? classes.checked : ''}`}>
                                    <input
                                        type="checkbox"
                                        name="employment_type"
                                        value={EmploymentTypes.PART_TIME_EMPLOYMENT}
                                        checked={employmentTypes.includes(EmploymentTypes.PART_TIME_EMPLOYMENT)}
                                        onChange={handleChangeEmploymentType}
                                    />
                                    Частичная занятость
                                    <span className={classes.icon}>
                                        {employmentTypes.includes(EmploymentTypes.PART_TIME_EMPLOYMENT) ? <FullCheckbox /> : <Checkbox />}
                                    </span>
                                </label>
                                <label className={`${classes.checkboxLabel} ${employmentTypes.includes(EmploymentTypes.PROJECT_WORK) ? classes.checked : ''}`}>
                                    <input
                                        type="checkbox"
                                        name="employment_type"
                                        value={EmploymentTypes.PROJECT_WORK}
                                        checked={employmentTypes.includes(EmploymentTypes.PROJECT_WORK)}
                                        onChange={handleChangeEmploymentType}
                                    />
                                    Проектная работа
                                    <span className={classes.icon}>
                                        {employmentTypes.includes(EmploymentTypes.PROJECT_WORK) ? <FullCheckbox /> : <Checkbox />}
                                    </span>
                                </label>
                                <label className={`${classes.checkboxLabel} ${employmentTypes.includes(EmploymentTypes.INTERSHIP) ? classes.checked : ''}`}>
                                    <input
                                        type="checkbox"
                                        name="employment_type"
                                        value={EmploymentTypes.INTERSHIP}
                                        checked={employmentTypes.includes(EmploymentTypes.INTERSHIP)}
                                        onChange={handleChangeEmploymentType}
                                    />
                                    Стажировка
                                    <span className={classes.icon}>
                                        {employmentTypes.includes(EmploymentTypes.INTERSHIP) ? <FullCheckbox /> : <Checkbox />}
                                    </span>
                                </label>
                            </div>
                        </div>
                        <div className={`${classes.input_box} ${classes.align_start}`}>
                            <div className={classes.label}>
                                <label>График работы</label>
                            </div>
                            <div className={`${classes.input} ${classes.row_wrap}`}>
                                <label className={`${classes.checkboxLabel} ${schedule.includes(ScheduleTypes.FULL_DAY) ? classes.checked : ''}`}>
                                    <input
                                        type="checkbox"
                                        name="schedule"
                                        value={ScheduleTypes.FULL_DAY}
                                        checked={schedule.includes(ScheduleTypes.FULL_DAY)}
                                        onChange={handleChangeSchedule}
                                    />
                                    Полный день
                                    <span className={classes.icon}>
                                        {schedule.includes(ScheduleTypes.FULL_DAY) ? <FullCheckbox /> : <Checkbox />}
                                    </span>
                                </label>
                                <label className={`${classes.checkboxLabel} ${schedule.includes(ScheduleTypes.SHIFT_WORK) ? classes.checked : ''}`}>
                                    <input
                                        type="checkbox"
                                        name="schedule"
                                        value={ScheduleTypes.SHIFT_WORK}
                                        checked={schedule.includes(ScheduleTypes.SHIFT_WORK)}
                                        onChange={handleChangeSchedule}
                                    />
                                    Сменный график
                                    <span className={classes.icon}>
                                        {schedule.includes(ScheduleTypes.SHIFT_WORK) ? <FullCheckbox /> : <Checkbox />}
                                    </span>
                                </label>
                                <label className={`${classes.checkboxLabel} ${schedule.includes(ScheduleTypes.FLEXIBLE_SHEDULE) ? classes.checked : ''}`}>
                                    <input
                                        type="checkbox"
                                        name="schedule"
                                        value={ScheduleTypes.FLEXIBLE_SHEDULE}
                                        checked={schedule.includes(ScheduleTypes.FLEXIBLE_SHEDULE)}
                                        onChange={handleChangeSchedule}
                                    />
                                    Гибкий график
                                    <span className={classes.icon}>
                                        {schedule.includes(ScheduleTypes.FLEXIBLE_SHEDULE) ? <FullCheckbox /> : <Checkbox />}
                                    </span>
                                </label>
                                <label className={`${classes.checkboxLabel} ${schedule.includes(ScheduleTypes.DISTANT_WORK) ? classes.checked : ''}`}>
                                    <input
                                        type="checkbox"
                                        name="schedule"
                                        value={ScheduleTypes.DISTANT_WORK}
                                        checked={schedule.includes(ScheduleTypes.DISTANT_WORK)}
                                        onChange={handleChangeSchedule}
                                    />
                                    Удаленная работа
                                    <span className={classes.icon}>
                                        {schedule.includes(ScheduleTypes.DISTANT_WORK) ? <FullCheckbox /> : <Checkbox />}
                                    </span>
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
                        <p>Укажите, на какой должности вы хотите работать. Если вы готовы работать на разных должностях, создайте для каждой из них отдельное резюме.</p>
                    </div>
                </div>
            }
        </div>
    )
}

export default RedactMainInfo;