import React, { useEffect, useState } from "react";
import classes from './style.module.scss'
import Header from "../../header/Header";
import ModalMessage from "../../modalMessage/ModalMessage";
import { Params, useNavigate, useParams } from "react-router-dom";

import VacancyContent from "./VacancyContent";
import { useGetMyVacancyQuery, useUpdateAddressVacancyMutation, useUpdateDescriptionVacancyMutation, useUpdateEmploymentTypeVacancyMutation, useUpdateExperienceVacancyMutation, useUpdateLanguagesVacancyMutation, useUpdateLicenseCategoriesVacancyMutation, useUpdateMainInfoVacancyMutation, useUpdateSalaryVacancyMutation, useUpdateScheduleVacancyMutation, useUpdateSkillsVacancyMutation, useUpdateVisibleContactsVacancyMutation } from "../../../app/services/vacancyApi";
import ReactLoading from "react-loading";
import { EmploymentTypes, ExperienceTypes, Language, SalaryTypes, ScheduleTypes } from "../../types";

import { ReactComponent as ArrowIcon } from './../../../images/arrow.svg'
import { ReactComponent as CloseIcon } from './../../../images/xmark.svg'
import { useDispatch } from "react-redux";
import { ModalTypes, changeInfo } from "../../../app/futures/user/modalSlice";
import { geocode } from "../../../utils";

const categories = ['A', 'B', 'C', 'D', 'E', 'BE', 'CE', 'DE', 'TM', 'TB'];

const MyVacancy: React.FC = () => {

    const Content: React.FC<{ type: string }> = ({ type }: { type: string }) => {
        switch (type) {
            case 'modify':
                return <RedactContent />
            default:
                return <VacancyContent />
        }
    }

    const params: Readonly<Params<string>> = useParams()

    const RedactContent: React.FC = () => {
        const navigate = useNavigate();
        const vacancy = useGetMyVacancyQuery({ vacancyId: params.vacancyId });
        const [isRotate, setIsRotate] = useState<boolean>(false);

        const [name, setName] = useState<string>('')
        const [specialization, setSpecialization] = useState<string>('')
        const [searchCity, setSearchCity] = useState<string>('')

        const [salaryFrom, setSalaryFrom] = useState<string>('')
        const [salaryTo, setSalaryTo] = useState<string>('')
        const [type, setType] = useState<string>(SalaryTypes.BEFORE_TAXES);

        const [description, setDescription] = useState<string>('')

        const [country, setCountry] = useState<string>('');
        const [state, setState] = useState<string>('');
        const [city, setCity] = useState<string>('');
        const [street, setStreet] = useState<string>('');
        const [houseNumber, setHouseNumber] = useState<string>('');

        const [experience, setExperience] = useState<string>(ExperienceTypes.HAVENT);

        const [skills, setSkills] = useState<string[]>([]);

        const [isVisibleContacts, setIsVisibleContacts] = useState<boolean>(true);

        const [employmentType, setEmploymentType] = useState<string>(EmploymentTypes.NO);
        const [schedule, setSchedule] = useState<string>(ScheduleTypes.NO);

        const [languages, setLanguages] = useState<Language[]>([]);
        const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

        const [updateMainInfo] = useUpdateMainInfoVacancyMutation();
        const [updateSalary] = useUpdateSalaryVacancyMutation();
        const [updateDescription] = useUpdateDescriptionVacancyMutation();
        const [updateAddress] = useUpdateAddressVacancyMutation();
        const [updateExperience] = useUpdateExperienceVacancyMutation();
        const [updateSkills] = useUpdateSkillsVacancyMutation();
        const [updateVisibleContacts] = useUpdateVisibleContactsVacancyMutation();
        const [updateEmploymentType] = useUpdateEmploymentTypeVacancyMutation();
        const [updateSchedule] = useUpdateScheduleVacancyMutation();
        const [updateLanguages] = useUpdateLanguagesVacancyMutation();
        const [updateLicenseCategories] = useUpdateLicenseCategoriesVacancyMutation();

        const dispatch = useDispatch()

        console.log(vacancy);

        useEffect(() => {
            if ('data' in vacancy) {
                setName(vacancy.data?.vacancy?.name);
                setSpecialization(vacancy.data?.vacancy?.specialization);
                setSearchCity(vacancy.data?.vacancy?.city);
                setSalaryFrom(vacancy.data?.vacancy?.salary?.salaryFrom || '');
                setSalaryTo(vacancy.data?.vacancy?.salary?.salaryTo || '');
                setType(vacancy.data?.vacancy?.salary?.type || SalaryTypes.BEFORE_TAXES);
                setDescription(vacancy.data?.vacancy?.description);
                setCountry(vacancy.data?.vacancy?.address?.country || '');
                setState(vacancy.data?.vacancy?.address?.state || '');
                setCity(vacancy.data?.vacancy?.address?.city || '');
                setStreet(vacancy.data?.vacancy?.address?.street || '');
                setHouseNumber(vacancy.data?.vacancy?.address?.houseNumber || '');
                setExperience(vacancy.data?.vacancy?.experience?.code);

                const skillNames = vacancy.data?.vacancy?.keySkills.map((skill: any) => skill.name);
                const licenseCategories = vacancy.data?.vacancy?.licenseCategories.map((licenseCategory: any) => licenseCategory.code);
                const simplifiedLanguages = vacancy.data?.vacancy?.languages.map(({ name, level }: { name: string, level: string }) => ({ name, level }));
                setSkills(skillNames || []);
                setIsVisibleContacts(vacancy.data?.vacancy?.isVisibleContacts);
                setEmploymentType(vacancy.data?.vacancy?.employmentType?.code);
                setSchedule(vacancy.data?.vacancy?.schedule?.code);
                setLanguages(simplifiedLanguages || []);
                setSelectedCategories(licenseCategories || []);
            }
        }, [vacancy]);

        const toggleCategory = (category: string) => {
            setSelectedCategories(prevSelected =>
                prevSelected.includes(category)
                    ? prevSelected.filter(c => c !== category)
                    : [...prevSelected, category]
            );
        };

        const handleLanguageChange = (index: number, field: keyof Language, value: string) => {
            const newLanguages = [...languages];
            newLanguages[index][field] = value;
            setLanguages(newLanguages);
        };

        const addLanguageInput = () => {
            setLanguages([...languages, { name: '', level: 'beginner_a1' }]);
        };

        const handleDeleteLanguage = (index: number) => {
            const newLanguages = [...languages];
            newLanguages.splice(index, 1);
            setLanguages(newLanguages);
        }


        // Обработчик изменения значения поля ввода
        const handleInputChange = (index: number, value: string) => {
            const newSkills = [...skills];
            newSkills[index] = value;
            setSkills(newSkills);
        };

        const handleDeleteSkills = (index: number) => {
            const newSkills = [...skills];
            newSkills.splice(index, 1);
            setSkills(newSkills);
        }

        // Функция для добавления нового поля ввода
        const addSkillInput = () => {
            setSkills([...skills, '']);
        };


        const handleChangeSalaryType = (event: React.ChangeEvent<HTMLInputElement>) => {
            setType(event.target.value);
        };

        const handleChangeExperience = (event: React.ChangeEvent<HTMLInputElement>) => {
            setExperience(event.target.value);
        };

        const handleChangeEmploymentType = (event: React.ChangeEvent<HTMLInputElement>) => {
            setEmploymentType(event.target.value);
        };

        const handleChangeSchedule = (event: React.ChangeEvent<HTMLInputElement>) => {
            setSchedule(event.target.value);
        };

        const handleContactVisibleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            if (event.target.value === 'yes') {
                setIsVisibleContacts(true);
            } else if (event.target.value === 'no') {
                setIsVisibleContacts(false);
            }
        };

        const handleSubmitUpdateMainInfo = async () => {
            try {
                if (name === '') {
                    dispatch(changeInfo({ type: ModalTypes.ERROR, message: 'Название не должно быть пустым' }))
                    return
                }
                if (specialization === '') {
                    dispatch(changeInfo({ type: ModalTypes.ERROR, message: 'Специализация не должна быть пустой' }))
                    return
                }
                if (searchCity === '') {
                    dispatch(changeInfo({ type: ModalTypes.ERROR, message: 'Город не должен быть пустым' }))
                    return
                }
                const data = {
                    name,
                    specialization,
                    city: searchCity,
                    vacancyId: params.vacancyId,
                }

                const res = await updateMainInfo(data).unwrap();
                dispatch(changeInfo({ type: ModalTypes.SUCCESS, message: res.message }))
                await vacancy.refetch();
            } catch (error: any) {
                if ('data' in error) {
                    dispatch(changeInfo({ type: ModalTypes.ERROR, message: error?.data?.message }));
                }
                console.error('Error updating company info:', error);
            }
        }

        const handleClearMainInfo = () => {
            if ('data' in vacancy) {
                setName(vacancy.data?.vacancy?.name);
                setSpecialization(vacancy.data?.vacancy?.specialization);
                setSearchCity(vacancy.data?.vacancy?.city);
            }
        }

        const handleSubmitUpdateSalary = async () => {
            try {
                const data = {
                    salaryFrom,
                    salaryTo,
                    type,
                    vacancyId: params.vacancyId,
                }
                const res = await updateSalary(data).unwrap();
                dispatch(changeInfo({ type: ModalTypes.SUCCESS, message: res.message }))
                await vacancy.refetch();
            } catch (error: any) {
                if ('data' in error) {
                    dispatch(changeInfo({ type: ModalTypes.ERROR, message: error?.data?.message }));
                }
                console.error('Error updating company info:', error);
            }
        }

        const handleClearSalary = () => {
            if ('data' in vacancy) {
                setSalaryFrom(vacancy.data?.vacancy?.salary?.salaryFrom || '');
                setSalaryTo(vacancy.data?.vacancy?.salary?.salaryTo || '');
                setType(vacancy.data?.vacancy?.salary?.type || SalaryTypes.BEFORE_TAXES);
            }
        }

        const handleSubmitUpdateDescription = async () => {
            try {
                if (description === '') {
                    dispatch(changeInfo({ type: ModalTypes.ERROR, message: 'Описание не должно быть пустым' }))
                    return
                }
                const data = {
                    description,
                    vacancyId: params.vacancyId,
                }
                const res = await updateDescription(data).unwrap();
                dispatch(changeInfo({ type: ModalTypes.SUCCESS, message: res.message }))
                await vacancy.refetch();
            } catch (error: any) {
                if ('data' in error) {
                    dispatch(changeInfo({ type: ModalTypes.ERROR, message: error?.data?.message }));
                }
                console.error('Error updating company info:', error);
            }
        }

        const handleClearDescription = () => {
            if ('data' in vacancy) {
                setDescription(vacancy.data?.vacancy?.description);
            }
        }

        const handleSubmitUpdateAddress = async () => {
            const addressParts = [
                country,
                state,
                city,
                street,
                houseNumber,
            ].filter(part => part.trim() !== '').join(', ');
            const pos = await geocode(addressParts);
            try {

                const data = {
                    country,
                    state,
                    city,
                    street,
                    houseNumber,
                    pos,
                    vacancyId: params.vacancyId,
                }
                const res = await updateAddress(data).unwrap();
                dispatch(changeInfo({ type: ModalTypes.SUCCESS, message: res.message }))
                await vacancy.refetch();
            } catch (error: any) {
                if ('data' in error) {
                    dispatch(changeInfo({ type: ModalTypes.ERROR, message: error?.data?.message }));
                }
                console.error('Error updating company info:', error);
            }
        }

        const handleClearAddress = () => {
            if ('data' in vacancy) {
                setCountry(vacancy.data?.vacancy?.address?.country || '');
                setState(vacancy.data?.vacancy?.address?.state || '');
                setCity(vacancy.data?.vacancy?.address?.city || '');
                setStreet(vacancy.data?.vacancy?.address?.street || '');
                setHouseNumber(vacancy.data?.vacancy?.address?.houseNumber || '');
            }
        }

        const handleSubmitUpdateExperience = async () => {
            try {
                const data = {
                    experience,
                    vacancyId: params.vacancyId,
                }
                const res = await updateExperience(data).unwrap();
                dispatch(changeInfo({ type: ModalTypes.SUCCESS, message: res.message }))
                await vacancy.refetch();
            } catch (error: any) {
                if ('data' in error) {
                    dispatch(changeInfo({ type: ModalTypes.ERROR, message: error?.data?.message }));
                }
                console.error('Error updating company info:', error);
            }
        }

        const handleClearExperience = () => {
            if ('data' in vacancy) {
                setExperience(vacancy.data?.vacancy?.experience?.code);
            }
        }

        const handleSubmitUpdateSkills = async () => {
            try {
                const data = {
                    skills: skills,
                    vacancyId: params.vacancyId,
                }
                const res = await updateSkills(data).unwrap();
                dispatch(changeInfo({ type: ModalTypes.SUCCESS, message: res.message }))
                await vacancy.refetch();
            } catch (error: any) {
                if ('data' in error) {
                    dispatch(changeInfo({ type: ModalTypes.ERROR, message: error?.data?.message }));
                }
                console.error('Error updating company info:', error);
            }
        }

        const handleClearSkills = () => {
            if ('data' in vacancy) {
                const skillNames = vacancy.data?.vacancy?.keySkills.map((skill: any) => skill.name);
                setSkills(skillNames || []);
            }
        }

        const handleSubmitUpdateVisibleContacts = async () => {
            try {
                const data = {
                    isVisibleContacts,
                    vacancyId: params.vacancyId,
                }
                const res = await updateVisibleContacts(data).unwrap();
                dispatch(changeInfo({ type: ModalTypes.SUCCESS, message: res.message }))
                await vacancy.refetch();
            } catch (error: any) {
                if ('data' in error) {
                    dispatch(changeInfo({ type: ModalTypes.ERROR, message: error?.data?.message }));
                }
                console.error('Error updating company info:', error);
            }
        }

        const handleClearVisibleContacts = () => {
            if ('data' in vacancy) {
                setIsVisibleContacts(vacancy.data?.vacancy?.isVisibleContacts);
            }
        }

        const handleSubmitUpdateEmploymentType = async () => {
            try {
                const data = {
                    employmentType,
                    vacancyId: params.vacancyId,
                }
                const res = await updateEmploymentType(data).unwrap();
                dispatch(changeInfo({ type: ModalTypes.SUCCESS, message: res.message }))
                await vacancy.refetch();
            } catch (error: any) {
                if ('data' in error) {
                    dispatch(changeInfo({ type: ModalTypes.ERROR, message: error?.data?.message }));
                }
                console.error('Error updating company info:', error);
            }
        }

        const handleClearEmploymentType = () => {
            if ('data' in vacancy) {
                setEmploymentType(vacancy.data?.vacancy?.employmentType?.code);
            }
        }

        const handleSubmitUpdateSchedule = async () => {
            try {
                const data = {
                    schedule,
                    vacancyId: params.vacancyId,
                }
                const res = await updateSchedule(data).unwrap();
                dispatch(changeInfo({ type: ModalTypes.SUCCESS, message: res.message }))
                await vacancy.refetch();
            } catch (error: any) {
                if ('data' in error) {
                    dispatch(changeInfo({ type: ModalTypes.ERROR, message: error?.data?.message }));
                }
                console.error('Error updating company info:', error);
            }
        }

        const handleClearSchedule = () => {
            if ('data' in vacancy) {
                setSchedule(vacancy.data?.vacancy?.schedule?.code);
            }
        }

        const handleSubmitUpdateLanguages = async () => {
            try {
                const data = {
                    languages: languages,
                    vacancyId: params.vacancyId,
                }
                const res = await updateLanguages(data).unwrap();
                dispatch(changeInfo({ type: ModalTypes.SUCCESS, message: res.message }))
                await vacancy.refetch();
            } catch (error: any) {
                if ('data' in error) {
                    dispatch(changeInfo({ type: ModalTypes.ERROR, message: error?.data?.message }));
                }
                console.error('Error updating company info:', error);
            }
        }

        const handleClearLanguages = () => {
            if ('data' in vacancy) {
                const simplifiedLanguages = vacancy.data?.vacancy?.languages.map(({ name, level }: { name: string, level: string }) => ({ name, level }));
                setLanguages(simplifiedLanguages || []);
            }
        }

        const handleSubmitUpdateLicenseCategories = async () => {
            try {
                const data = {
                    selectedCategories: selectedCategories,
                    vacancyId: params.vacancyId,
                }
                const res = await updateLicenseCategories(data).unwrap();
                dispatch(changeInfo({ type: ModalTypes.SUCCESS, message: res.message }))
                await vacancy.refetch();
            } catch (error: any) {
                if ('data' in error) {
                    dispatch(changeInfo({ type: ModalTypes.ERROR, message: error?.data?.message }));
                }
                console.error('Error updating company info:', error);
            }
        }

        const handleClearSelectedCategories = () => {
            if ('data' in vacancy) {
                const licenseCategories = vacancy.data?.vacancy?.licenseCategories.map((licenseCategory: any) => licenseCategory.code);
                setSelectedCategories(licenseCategories || []);
            }
        }

        return (
            <>
                <div className={classes.menu}>
                    <h2>Вакансия</h2>
                    <nav className={classes.navigation}>
                        <span className={`${classes.nav_item} ${params.type === 'info' ? classes.active : ''}`} onClick={() => navigate('./../info')}>Информация</span>
                        <span className={`${classes.nav_item} ${params.type === 'modify' ? classes.active : ''}`} onClick={() => navigate('./../modify')}>Редактировать</span>
                    </nav>
                </div>
                {vacancy.isLoading ? <ReactLoading type='spinningBubbles' color='#3B26B6' height={'20%'} width={'20%'} /> : <>
                    <div className={classes.data}>
                        <h3>Основная информация</h3>
                        <div className={classes.input_box}>
                            <div className={classes.label}>
                                <label htmlFor="name">Название вакансии</label>
                            </div>
                            <div className={classes.input}>
                                <input placeholder='Вакансия' type="text" id="name" autoComplete="off" value={name} onChange={(e: any) => (setName(e.target.value))} />
                            </div>
                        </div>
                        <div className={classes.input_box}>
                            <div className={classes.label}>
                                <label htmlFor="specialization">Специализация</label>
                            </div>
                            <div className={classes.input}>
                                <input placeholder="Специализация" type="text" id="specialization" autoComplete="off" value={specialization}
                                    onChange={(e: any) => setSpecialization(e.target.value)} />
                            </div>
                        </div>
                        <div className={classes.input_box}>
                            <div className={classes.label}>
                                <label htmlFor="searchCity">Где искать сотрудника</label>
                            </div>
                            <p>По указанному городу будет происходить поиск кандидатов</p>
                            <div className={classes.input}>
                                <input placeholder="Город" type="text" id="searchCity" autoComplete="off" value={searchCity}
                                    onChange={(e: any) => setSearchCity(e.target.value)} />
                            </div>
                        </div>
                        <div className={classes.btn_box}>
                            <button onClick={handleSubmitUpdateMainInfo}>Сохранить</button>
                            <button onClick={handleClearMainInfo}>Отменить</button>
                        </div>
                    </div>
                    <div className={classes.data}>
                        <div className={classes.input_box}>
                            <div className={classes.label}>
                                <label htmlFor="salaryFrom">Предполагаемый уровень дохода в месяц или за объем работ</label>
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
                        <div className={classes.btn_box}>
                            <button onClick={handleSubmitUpdateSalary}>Сохранить</button>
                            <button onClick={handleClearSalary}>Отменить</button>
                        </div>
                    </div>
                    <div className={classes.data}>
                        <div className={classes.input_box}>
                            <div className={classes.label}>
                                <label htmlFor="description">Расскажите про вакансию</label>
                            </div>
                            <p>Не пишите контактных данных в описании.</p>
                            <p>Не допускайте дискриминации кандидатов по причинам, не связанным с деловыми качествами работника.</p>
                            <div className={classes.input}>
                                <textarea name="description" id="description" value={description} onChange={(e: any) => setDescription(e.target.value)}></textarea>
                            </div>
                        </div>
                        <div className={classes.btn_box}>
                            <button onClick={handleSubmitUpdateDescription}>Сохранить</button>
                            <button onClick={handleClearDescription}>Отменить</button>
                        </div>
                    </div>
                    <div className={classes.data}>
                        <div className={classes.input_box}>
                            <div className={classes.label}>
                                <label htmlFor="country">Где будет работать сотрудник</label>
                            </div>
                            <p>Страна</p>
                            <div className={classes.input}>
                                <input placeholder="Страна" type="text" id="country" autoComplete="off" value={country}
                                    onChange={(e: any) => setCountry(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className={classes.input_box}>
                            <p>Регион</p>
                            <div className={classes.input}>
                                <input placeholder="Регион" type="text" id="state" autoComplete="off" value={state}
                                    onChange={(e: any) => setState(e.target.value)} />
                            </div>
                        </div>
                        <div className={classes.input_box}>
                            <p>Город</p>
                            <div className={classes.input}>
                                <input placeholder="Город" type="text" id="city" autoComplete="off" value={city}
                                    onChange={(e: any) => setCity(e.target.value)} />
                            </div>
                        </div>
                        <div className={classes.input_box}>
                            <p>Улица</p>
                            <div className={classes.input}>
                                <input placeholder="Улица" type="text" id="street" autoComplete="off" value={street}
                                    onChange={(e: any) => setStreet(e.target.value)} />
                            </div>
                        </div>
                        <div className={classes.input_box}>
                            <p>Номер дома</p>
                            <div className={classes.input}>
                                <input placeholder="Номер дома" type="text" id="houseNumber" autoComplete="off" value={houseNumber}
                                    onChange={(e: any) => setHouseNumber(e.target.value)} />
                            </div>
                        </div>
                        <div className={classes.btn_box}>
                            <button onClick={handleSubmitUpdateAddress}>Сохранить</button>
                            <button onClick={handleClearAddress}>Отменить</button>
                        </div>
                    </div>
                    <div className={classes.data}>
                        <div className={classes.input_box}>
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
                                        onChange={handleChangeExperience}
                                    />
                                    Без опыта
                                </label>
                                <label className={`${classes.radioLabel} ${experience === ExperienceTypes.LOWER_ONE ? classes.checked : ''}`}>
                                    <input
                                        type="radio"
                                        name="experience"
                                        value={ExperienceTypes.LOWER_ONE}
                                        checked={experience === ExperienceTypes.LOWER_ONE}
                                        onChange={handleChangeExperience}
                                    />
                                    Менее 1 года
                                </label>
                                <label className={`${classes.radioLabel} ${experience === ExperienceTypes.ONE_THREE ? classes.checked : ''}`}>
                                    <input
                                        type="radio"
                                        name="experience"
                                        value={ExperienceTypes.ONE_THREE}
                                        checked={experience === ExperienceTypes.ONE_THREE}
                                        onChange={handleChangeExperience}
                                    />
                                    От 1 года до 3 лет
                                </label>
                                <label className={`${classes.radioLabel} ${experience === ExperienceTypes.THREE_SIX ? classes.checked : ''}`}>
                                    <input
                                        type="radio"
                                        name="experience"
                                        value={ExperienceTypes.THREE_SIX}
                                        checked={experience === ExperienceTypes.THREE_SIX}
                                        onChange={handleChangeExperience}
                                    />
                                    От 3 до 6 лет
                                </label>
                                <label className={`${classes.radioLabel} ${experience === ExperienceTypes.UPPER_SIX ? classes.checked : ''}`}>
                                    <input
                                        type="radio"
                                        name="experience"
                                        value={ExperienceTypes.UPPER_SIX}
                                        checked={experience === ExperienceTypes.UPPER_SIX}
                                        onChange={handleChangeExperience}
                                    />
                                    Более 6 лет
                                </label>
                            </div>
                        </div>
                        <div className={classes.btn_box}>
                            <button onClick={handleSubmitUpdateExperience}>Сохранить</button>
                            <button onClick={handleClearExperience}>Отменить</button>
                        </div>
                    </div>
                    <div className={classes.data}>
                        <div className={classes.input_box}>
                            <div className={classes.label}>
                                <label htmlFor="skills">Ключевые навыки</label>
                            </div>
                            <div className={classes.input}>
                                {skills.map((skill: string, index: number) => (
                                    <div key={index} className={classes.skill_input}>
                                        <input
                                            type="text"
                                            id={`skill-${index}`}
                                            autoComplete="off"
                                            value={skill}
                                            onChange={(e) => handleInputChange(index, e.target.value)}
                                        />
                                        <span className={classes.delete_icon} onClick={() => { handleDeleteSkills(index) }}>
                                            <CloseIcon />
                                        </span>
                                    </div>
                                ))}
                                <button type="button" onClick={addSkillInput} className={classes.add_button}>
                                    Добавить навык
                                </button>
                            </div>
                        </div>
                        <div className={classes.btn_box}>
                            <button onClick={handleSubmitUpdateSkills}>Сохранить</button>
                            <button onClick={handleClearSkills}>Отменить</button>
                        </div>
                    </div>
                    <div className={classes.data}>
                        <div className={classes.input_box}>
                            <div className={classes.label}>
                                <label>Контактная информация</label>
                            </div>
                            <div className={classes.input}>
                                <label className={`${classes.radioLabel} ${isVisibleContacts ? classes.checked : ''}`}>
                                    <input
                                        type="radio"
                                        name="contactVisible"
                                        value="yes"
                                        checked={isVisibleContacts}
                                        onChange={handleContactVisibleChange}
                                    />
                                    Показывать в вакансии
                                </label>
                                <label className={`${classes.radioLabel} ${!isVisibleContacts ? classes.checked : ''}`}>
                                    <input
                                        type="radio"
                                        name="contactVisible"
                                        value="no"
                                        checked={!isVisibleContacts}
                                        onChange={handleContactVisibleChange}
                                    />
                                    Не показывать в вакансии
                                </label>
                            </div>
                        </div>
                        <div className={classes.btn_box}>
                            <button onClick={handleSubmitUpdateVisibleContacts}>Сохранить</button>
                            <button onClick={handleClearVisibleContacts}>Отменить</button>
                        </div>
                    </div>
                    <div className={classes.data}>
                        <div className={classes.input_box}>
                            <div className={classes.label}>
                                <label>Тип занятости</label>
                            </div>
                            <div className={classes.input}>
                                <label className={`${classes.radioLabel} ${employmentType === EmploymentTypes.FULL_EMPLOYMENT ? classes.checked : ''}`}>
                                    <input
                                        type="radio"
                                        name="employment_type"
                                        value={EmploymentTypes.FULL_EMPLOYMENT}
                                        checked={employmentType === EmploymentTypes.FULL_EMPLOYMENT}
                                        onChange={handleChangeEmploymentType}
                                    />
                                    Полная занятость
                                </label>
                                <label className={`${classes.radioLabel} ${employmentType === EmploymentTypes.PART_TIME_EMPLOYMENT ? classes.checked : ''}`}>
                                    <input
                                        type="radio"
                                        name="employment_type"
                                        value={EmploymentTypes.PART_TIME_EMPLOYMENT}
                                        checked={employmentType === EmploymentTypes.PART_TIME_EMPLOYMENT}
                                        onChange={handleChangeEmploymentType}
                                    />
                                    Частичная занятость
                                </label>
                                <label className={`${classes.radioLabel} ${employmentType === EmploymentTypes.PROJECT_WORK ? classes.checked : ''}`}>
                                    <input
                                        type="radio"
                                        name="employment_type"
                                        value={EmploymentTypes.PROJECT_WORK}
                                        checked={employmentType === EmploymentTypes.PROJECT_WORK}
                                        onChange={handleChangeEmploymentType}
                                    />
                                    Проектная работа
                                </label>
                                <label className={`${classes.radioLabel} ${employmentType === EmploymentTypes.INTERSHIP ? classes.checked : ''}`}>
                                    <input
                                        type="radio"
                                        name="employment_type"
                                        value={EmploymentTypes.INTERSHIP}
                                        checked={employmentType === EmploymentTypes.INTERSHIP}
                                        onChange={handleChangeEmploymentType}
                                    />
                                    Стажировка
                                </label>
                                <label className={`${classes.radioLabel} ${employmentType === EmploymentTypes.NO ? classes.checked : ''}`}>
                                    <input
                                        type="radio"
                                        name="employment_type"
                                        value={EmploymentTypes.NO}
                                        checked={employmentType === EmploymentTypes.NO}
                                        onChange={handleChangeEmploymentType}
                                    />
                                    Не имеет значения
                                </label>
                            </div>
                        </div>
                        <div className={classes.btn_box}>
                            <button onClick={handleSubmitUpdateEmploymentType}>Сохранить</button>
                            <button onClick={handleClearEmploymentType}>Отменить</button>
                        </div>
                    </div>
                    <div className={classes.data}>
                        <div className={classes.input_box}>
                            <div className={classes.label}>
                                <label>График работы</label>
                            </div>
                            <div className={classes.input}>
                                <label className={`${classes.radioLabel} ${schedule === ScheduleTypes.FULL_DAY ? classes.checked : ''}`}>
                                    <input
                                        type="radio"
                                        name="schedule"
                                        value={ScheduleTypes.FULL_DAY}
                                        checked={schedule === ScheduleTypes.FULL_DAY}
                                        onChange={handleChangeSchedule}
                                    />
                                    Полный день
                                </label>
                                <label className={`${classes.radioLabel} ${schedule === ScheduleTypes.SHIFT_WORK ? classes.checked : ''}`}>
                                    <input
                                        type="radio"
                                        name="schedule"
                                        value={ScheduleTypes.SHIFT_WORK}
                                        checked={schedule === ScheduleTypes.SHIFT_WORK}
                                        onChange={handleChangeSchedule}
                                    />
                                    Сменный график
                                </label>
                                <label className={`${classes.radioLabel} ${schedule === ScheduleTypes.FLEXIBLE_SHEDULE ? classes.checked : ''}`}>
                                    <input
                                        type="radio"
                                        name="schedule"
                                        value={ScheduleTypes.FLEXIBLE_SHEDULE}
                                        checked={schedule === ScheduleTypes.FLEXIBLE_SHEDULE}
                                        onChange={handleChangeSchedule}
                                    />
                                    Гибкий график
                                </label>
                                <label className={`${classes.radioLabel} ${schedule === ScheduleTypes.DISTANT_WORK ? classes.checked : ''}`}>
                                    <input
                                        type="radio"
                                        name="schedule"
                                        value={ScheduleTypes.DISTANT_WORK}
                                        checked={schedule === ScheduleTypes.DISTANT_WORK}
                                        onChange={handleChangeSchedule}
                                    />
                                    Удаленная работа
                                </label>
                                <label className={`${classes.radioLabel} ${schedule === ScheduleTypes.NO ? classes.checked : ''}`}>
                                    <input
                                        type="radio"
                                        name="schedule"
                                        value={ScheduleTypes.NO}
                                        checked={schedule === ScheduleTypes.NO}
                                        onChange={handleChangeSchedule}
                                    />
                                    Не указан
                                </label>
                            </div>
                        </div>
                        <div className={classes.btn_box}>
                            <button onClick={handleSubmitUpdateSchedule}>Сохранить</button>
                            <button onClick={handleClearSchedule}>Отменить</button>
                        </div>
                    </div>
                    <div className={classes.data}>
                        <div className={classes.input_box}>
                            <div className={classes.label}>
                                <label>Языковые навыки</label>
                            </div>
                            <div className={classes.input}>
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
                                            onClick={() => setIsRotate((prev: any) => !prev)}
                                            className={classes.language_level}
                                        >
                                            <option value="beginner_a1">А1 - Начальный</option>
                                            <option value="beginner_a2">А2 - Элементарный</option>
                                            <option value="intermediate_b1">B1 - Средний</option>
                                            <option value="intermediate_b2">B2 - Средне-продвинутый</option>
                                            <option value="advanced">С1 - Продвинутый</option>
                                            <option value="native">С2 - Носитель языка</option>
                                        </select>
                                        <span className={`${classes.select_icon} ${isRotate ? classes.rotate : ''}`}>
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
                            <button onClick={handleSubmitUpdateLanguages}>Сохранить</button>
                            <button onClick={handleClearLanguages}>Отменить</button>
                        </div>
                    </div>
                    <div className={classes.data}>
                        <div className={classes.input_box}>
                            <div className={classes.label}>
                                <label>Категории прав</label>
                            </div>
                            <div className={`${classes.input} ${classes.row}`}>
                                {categories.map(category => (
                                    <span
                                        key={category}
                                        className={`${classes.category} ${selectedCategories.includes(category) ? classes.selected : ''}`}
                                        onClick={() => toggleCategory(category)}
                                    >
                                        {category}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className={classes.btn_box}>
                            <button onClick={handleSubmitUpdateLicenseCategories}>Сохранить</button>
                            <button onClick={handleClearSelectedCategories}>Отменить</button>
                        </div>
                    </div>
                </>}
            </>
        )
    }

    return (
        <>
            <Header />
            <main className={classes.content}>
                <div className={classes.container}>
                    <Content type={params.type || ''} />
                </div>
            </main>
            <ModalMessage />
        </>
    )
}

export default MyVacancy;