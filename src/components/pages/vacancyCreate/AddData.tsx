import React, { useState } from "react";
import classes from './style.module.scss'
import { ReactComponent as ArrowIcon } from './../../../images/arrow.svg'
import { EmploymentTypes, Language, ScheduleTypes } from "../../types";
import { useDispatch, useSelector } from "react-redux";
import { setEmploymentType, setLanguages, setLicenseCategories, setSchedule } from "../../../app/futures/createVacancySlice";

const categories = ['A', 'B', 'C', 'D', 'E', 'BE', 'CE', 'DE', 'TM', 'TB'];

const AddData: React.FC = () => {

    const createVacancy = useSelector((state: any) => state.createVacancy);
    const dispatch = useDispatch();
    const [isRotate, setIsRotate] = useState<boolean[]>([]);

    const toggleCategory = (category: string) => {
        const newCategories = createVacancy.licenseCategories.includes(category) ?
            createVacancy.licenseCategories.filter((c: any) => c.name === category) :
            [...createVacancy.licenseCategories, category];
        dispatch(setLicenseCategories({ licenseCategories: newCategories }))
    };

    const handleLanguageChange = (index: number, field: keyof Language, value: string) => {
        const newLanguages: Language[] = createVacancy.languages.map((language: Language, i: number) =>
            i === index ? { ...language, [field]: value } : language
        );

        dispatch(setLanguages({ languages: newLanguages }));
    };

    const handleChangeIsRotate = (index: number) => {
        const newRotate = [...isRotate];
        newRotate[index] = !newRotate[index];
        setIsRotate(newRotate);
    }

    const addLanguageInput = () => {
        dispatch(setLanguages({ languages: [...createVacancy.languages, { name: '', level: 'beginner_a1' }] }));
        setIsRotate([...isRotate, false])
        console.log(createVacancy.languages);
    };

    const handleEmploymentTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setEmploymentType({ employment_type: event.target.value }));
    }

    const handleSheduleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setSchedule({ schedule: event.target.value }));
    }

    return (
        <div className={classes.create_item}>
            <h3>Дополнительно</h3>
            <div className={classes.input_box}>
                <div className={classes.label}>
                    <label>Тип занятости</label>
                </div>
                <div className={classes.input}>
                    <label className={`${classes.radioLabel} ${createVacancy.employment_type === EmploymentTypes.FULL_EMPLOYMENT ? classes.checked : ''}`}>
                        <input
                            type="radio"
                            name="employment_type"
                            value={EmploymentTypes.FULL_EMPLOYMENT}
                            checked={createVacancy.employment_type === EmploymentTypes.FULL_EMPLOYMENT}
                            onChange={handleEmploymentTypeChange}
                        />
                        Полная занятость
                    </label>
                    <label className={`${classes.radioLabel} ${createVacancy.employment_type === EmploymentTypes.PART_TIME_EMPLOYMENT ? classes.checked : ''}`}>
                        <input
                            type="radio"
                            name="employment_type"
                            value={EmploymentTypes.PART_TIME_EMPLOYMENT}
                            checked={createVacancy.employment_type === EmploymentTypes.PART_TIME_EMPLOYMENT}
                            onChange={handleEmploymentTypeChange}
                        />
                        Частичная занятость
                    </label>
                    <label className={`${classes.radioLabel} ${createVacancy.employment_type === EmploymentTypes.PROJECT_WORK ? classes.checked : ''}`}>
                        <input
                            type="radio"
                            name="employment_type"
                            value={EmploymentTypes.PROJECT_WORK}
                            checked={createVacancy.employment_type === EmploymentTypes.PROJECT_WORK}
                            onChange={handleEmploymentTypeChange}
                        />
                        Проектная работа
                    </label>
                    <label className={`${classes.radioLabel} ${createVacancy.employment_type === EmploymentTypes.INTERSHIP ? classes.checked : ''}`}>
                        <input
                            type="radio"
                            name="employment_type"
                            value={EmploymentTypes.INTERSHIP}
                            checked={createVacancy.employment_type === EmploymentTypes.INTERSHIP}
                            onChange={handleEmploymentTypeChange}
                        />
                        Стажировка
                    </label>
                    <label className={`${classes.radioLabel} ${createVacancy.employment_type === EmploymentTypes.NO ? classes.checked : ''}`}>
                        <input
                            type="radio"
                            name="employment_type"
                            value={EmploymentTypes.NO}
                            checked={createVacancy.employment_type === EmploymentTypes.NO}
                            onChange={handleEmploymentTypeChange}
                        />
                        Не имеет значения
                    </label>
                </div>
            </div>
            <div className={classes.input_box}>
                <div className={classes.label}>
                    <label>График работы</label>
                </div>
                <div className={classes.input}>
                    <label className={`${classes.radioLabel} ${createVacancy.schedule === ScheduleTypes.FULL_DAY ? classes.checked : ''}`}>
                        <input
                            type="radio"
                            name="schedule"
                            value={ScheduleTypes.FULL_DAY}
                            checked={createVacancy.schedule === ScheduleTypes.FULL_DAY}
                            onChange={handleSheduleChange}
                        />
                        Полный день
                    </label>
                    <label className={`${classes.radioLabel} ${createVacancy.schedule === ScheduleTypes.SHIFT_WORK ? classes.checked : ''}`}>
                        <input
                            type="radio"
                            name="schedule"
                            value={ScheduleTypes.SHIFT_WORK}
                            checked={createVacancy.schedule === ScheduleTypes.SHIFT_WORK}
                            onChange={handleSheduleChange}
                        />
                        Сменный график
                    </label>
                    <label className={`${classes.radioLabel} ${createVacancy.schedule === ScheduleTypes.FLEXIBLE_SHEDULE ? classes.checked : ''}`}>
                        <input
                            type="radio"
                            name="schedule"
                            value={ScheduleTypes.FLEXIBLE_SHEDULE}
                            checked={createVacancy.schedule === ScheduleTypes.FLEXIBLE_SHEDULE}
                            onChange={handleSheduleChange}
                        />
                        Гибкий график
                    </label>
                    <label className={`${classes.radioLabel} ${createVacancy.schedule === ScheduleTypes.DISTANT_WORK ? classes.checked : ''}`}>
                        <input
                            type="radio"
                            name="schedule"
                            value={ScheduleTypes.DISTANT_WORK}
                            checked={createVacancy.schedule === ScheduleTypes.DISTANT_WORK}
                            onChange={handleSheduleChange}
                        />
                        Удаленная работа
                    </label>
                    <label className={`${classes.radioLabel} ${createVacancy.schedule === ScheduleTypes.NO ? classes.checked : ''}`}>
                        <input
                            type="radio"
                            name="schedule"
                            value={ScheduleTypes.NO}
                            checked={createVacancy.schedule === ScheduleTypes.NO}
                            onChange={handleSheduleChange}
                        />
                        Не указан
                    </label>
                </div>
            </div>
            <div className={classes.input_box}>
                <div className={classes.label}>
                    <label>Языковые навыки</label>
                </div>
                <div className={classes.input}>
                    {createVacancy.languages.map((language: Language, index: number) => (
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
                        </div>
                    ))}
                    <button type="button" onClick={addLanguageInput} className={classes.add_button}>
                        Добавить язык
                    </button>
                </div>
            </div>
            <div className={classes.input_box}>
                <div className={classes.label}>
                    <label>Категории прав</label>
                </div>
                <div className={`${classes.input} ${classes.row}`}>
                    {categories.map(category => (
                        <span
                            key={category}
                            className={`${classes.category} ${createVacancy.licenseCategories.includes(category) ? classes.selected : ''}`}
                            onClick={() => toggleCategory(category)}
                        >
                            {category}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default AddData;