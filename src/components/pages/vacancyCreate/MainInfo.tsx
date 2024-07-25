import React from "react";
import classes from './style.module.scss'
import { ExperienceTypes, SalaryTypes } from "../../types";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
    setAddressCity,
    setAddressHouseNumber,
    setAddressPos,
    setAddressState,
    setAddressStreet,
    setCity,
    setCountry,
    setDescription,
    setExperience,
    setKeySkills,
    setName,
    setSalaryFrom,
    setSalaryTo,
    setSalaryType,
    setSpecialization
} from "../../../app/futures/createVacancySlice";
import { geocode } from "../../../utils";

const MainInfo: React.FC = () => {

    const createVacancy = useSelector((state: any) => state.createVacancy);
    const dispatch = useDispatch();


    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setSalaryType({ salaryType: event.target.value }));
    };

    const handleExperienceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setExperience({ experience: event.target.value }));
    }

    // Обработчик изменения значения поля ввода
    const handleInputChange = (index: number, value: string) => {
        const newSkills: string[] = [...createVacancy.keySkills];
        newSkills[index] = value;
        dispatch(setKeySkills({ keySkills: newSkills }));
    };

    // Функция для добавления нового поля ввода
    const addSkillInput = () => {
        dispatch(setKeySkills({ keySkills: [...createVacancy.keySkills, ''] }));
    };

    const updatePos = async () => {
        const safeTrim = (value: string | null | undefined): string => {
            return value?.trim() || '';
        };

        const addressParts = [
            createVacancy.address.country,
            createVacancy.address.state,
            createVacancy.address.city,
            createVacancy.address.street,
            createVacancy.address.houseNumber,
        ].filter(part => safeTrim(part) !== '').join(', ');

        const pos = await geocode(addressParts);
        dispatch(setAddressPos({ pos: pos }));
    }

    return (
        <div className={classes.create_item}>
            <h3>Основная информация</h3>
            <div className={classes.input_box}>
                <div className={classes.label}>
                    <label htmlFor="name">Название вакансии</label>
                </div>
                <div className={classes.input}>
                    <input placeholder='Вакансия' type="text" id="name" autoComplete="off" value={createVacancy.name} onChange={(e: any) => dispatch(setName({ name: e.target.value }))} />
                </div>
            </div>
            <div className={classes.input_box}>
                <div className={classes.label}>
                    <label htmlFor="specialization">Специализация</label>
                </div>
                <div className={classes.input}>
                    <input placeholder="Специализация" type="text" id="specialization" autoComplete="off" value={createVacancy.specialization}
                        onChange={(e: any) => dispatch(setSpecialization({ specialization: e.target.value }))} />
                </div>
            </div>
            <div className={classes.input_box}>
                <div className={classes.label}>
                    <label htmlFor="searchCity">Где искать сотрудника</label>
                </div>
                <p>По указанному городу будет происходить поиск кандидатов</p>
                <div className={classes.input}>
                    <input placeholder="Город" type="text" id="searchCity" autoComplete="off" value={createVacancy.city}
                        onChange={(e: any) => dispatch(setCity({ city: e.target.value }))} />
                </div>
            </div>
            <div className={classes.input_box}>
                <div className={classes.label}>
                    <label htmlFor="salaryFrom">Предполагаемый уровень дохода в месяц или за объем работ</label>
                </div>
                <div className={`${classes.input} ${classes.row}`}>
                    <input placeholder="От" type="text" id="salaryFrom" autoComplete="off" value={createVacancy.salary.salaryFrom}
                        onChange={(e: any) => dispatch(setSalaryFrom({ salaryFrom: e.target.value }))} />
                    <input placeholder="До" type="text" id="salaryTo" autoComplete="off" value={createVacancy.salary.salaryTo}
                        onChange={(e: any) => dispatch(setSalaryTo({ salaryTo: e.target.value }))} />
                </div>
                <div className={`${classes.add_input}`}>
                    <label className={`${classes.radioLabel} ${createVacancy.salary.type === SalaryTypes.BEFORE_TAXES ? classes.checked : ''}`}>
                        <input
                            type="radio"
                            name="taxOption"
                            value={SalaryTypes.BEFORE_TAXES}
                            checked={createVacancy.salary.type === SalaryTypes.BEFORE_TAXES}
                            onChange={handleChange}
                        />
                        До вычета налогов
                    </label>
                    <label className={`${classes.radioLabel} ${createVacancy.salary.type === SalaryTypes.AFTER_TAXES ? classes.checked : ''}`}>
                        <input
                            type="radio"
                            name="taxOption"
                            value={SalaryTypes.AFTER_TAXES}
                            checked={createVacancy.salary.type === SalaryTypes.AFTER_TAXES}
                            onChange={handleChange}
                        />
                        На руки
                    </label>
                </div>
            </div>
            <div className={classes.input_box}>
                <div className={classes.label}>
                    <label htmlFor="country">Где будет работать сотрудник</label>
                </div>
                <p>Страна</p>
                <div className={classes.input}>
                    <input placeholder="Страна" type="text" id="country" autoComplete="off" value={createVacancy.address.country}
                        onChange={(e: any) => {
                            dispatch(setCountry({ country: e.target.value }))
                            updatePos();
                        }}
                    />
                </div>
            </div>
            <div className={classes.input_box}>
                <p>Регион</p>
                <div className={classes.input}>
                    <input placeholder="Регион" type="text" id="state" autoComplete="off" value={createVacancy.address.state}
                        onChange={(e: any) => {
                            dispatch(setAddressState({ state: e.target.value }))
                            updatePos()
                        }} />
                </div>
            </div>
            <div className={classes.input_box}>
                <p>Город</p>
                <div className={classes.input}>
                    <input placeholder="Город" type="text" id="city" autoComplete="off" value={createVacancy.address.city}
                        onChange={(e: any) => {
                            dispatch(setAddressCity({ city: e.target.value }))
                            updatePos()
                        }} />
                </div>
            </div>
            <div className={classes.input_box}>
                <p>Улица</p>
                <div className={classes.input}>
                    <input placeholder="Улица" type="text" id="street" autoComplete="off" value={createVacancy.address.street}
                        onChange={(e: any) => {
                            dispatch(setAddressStreet({ street: e.target.value }))
                            updatePos()
                        }} />
                </div>
            </div>
            <div className={classes.input_box}>
                <p>Номер дома</p>
                <div className={classes.input}>
                    <input placeholder="Номер дома" type="text" id="houseNumber" autoComplete="off" value={createVacancy.address.houseNumber}
                        onChange={(e: any) => {
                            dispatch(setAddressHouseNumber({ houseNumber: e.target.value }))
                            updatePos()
                            console.log(createVacancy.address.pos)
                        }} />
                </div>
            </div>
            <div className={classes.input_box}>
                <div className={classes.label}>
                    <label>Опыт работы</label>
                </div>
                <div className={classes.input}>
                    <label className={`${classes.radioLabel} ${createVacancy.experience === ExperienceTypes.HAVENT ? classes.checked : ''}`}>
                        <input
                            type="radio"
                            name="experience"
                            value={ExperienceTypes.HAVENT}
                            checked={createVacancy.experience === ExperienceTypes.HAVENT}
                            onChange={handleExperienceChange}
                        />
                        Без опыта
                    </label>
                    <label className={`${classes.radioLabel} ${createVacancy.experience === ExperienceTypes.LOWER_ONE ? classes.checked : ''}`}>
                        <input
                            type="radio"
                            name="experience"
                            value={ExperienceTypes.LOWER_ONE}
                            checked={createVacancy.experience === ExperienceTypes.LOWER_ONE}
                            onChange={handleExperienceChange}
                        />
                        Менее 1 года
                    </label>
                    <label className={`${classes.radioLabel} ${createVacancy.experience === ExperienceTypes.ONE_THREE ? classes.checked : ''}`}>
                        <input
                            type="radio"
                            name="experience"
                            value={ExperienceTypes.ONE_THREE}
                            checked={createVacancy.experience === ExperienceTypes.ONE_THREE}
                            onChange={handleExperienceChange}
                        />
                        От 1 года до 3 лет
                    </label>
                    <label className={`${classes.radioLabel} ${createVacancy.experience === ExperienceTypes.THREE_SIX ? classes.checked : ''}`}>
                        <input
                            type="radio"
                            name="experience"
                            value={ExperienceTypes.THREE_SIX}
                            checked={createVacancy.experience === ExperienceTypes.THREE_SIX}
                            onChange={handleExperienceChange}
                        />
                        От 3 до 6 лет
                    </label>
                    <label className={`${classes.radioLabel} ${createVacancy.experience === ExperienceTypes.UPPER_SIX ? classes.checked : ''}`}>
                        <input
                            type="radio"
                            name="experience"
                            value={ExperienceTypes.UPPER_SIX}
                            checked={createVacancy.experience === ExperienceTypes.UPPER_SIX}
                            onChange={handleExperienceChange}
                        />
                        Более 6 лет
                    </label>
                </div>
            </div>
            <div className={classes.input_box}>
                <div className={classes.label}>
                    <label htmlFor="description">Расскажите про вакансию</label>
                </div>
                <p>Не пишите контактных данных в описании.</p>
                <p>Не допускайте дискриминации кандидатов по причинам, не связанным с деловыми качествами работника.</p>
                <div className={classes.input}>
                    <textarea name="description" id="description" value={createVacancy.description} onChange={(e: any) => dispatch(setDescription({ description: e.target.value }))}></textarea>
                </div>
            </div>
            <div className={classes.input_box}>
                <div className={classes.label}>
                    <label htmlFor="skills">Ключевые навыки</label>
                </div>
                <div className={classes.input}>
                    {createVacancy.keySkills.map((skill: string, index: number) => (
                        <div key={index} className={classes.skill_input}>
                            <input
                                type="text"
                                id={`skill-${index}`}
                                autoComplete="off"
                                value={skill}
                                onChange={(e) => handleInputChange(index, e.target.value)}
                            />
                        </div>
                    ))}
                    <button type="button" onClick={addSkillInput} className={classes.add_button}>
                        Добавить навык
                    </button>
                </div>
            </div>
        </div>
    )
}

export default MainInfo;