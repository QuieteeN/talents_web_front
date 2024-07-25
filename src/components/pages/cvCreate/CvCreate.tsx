import React, { useState } from "react";
import Header from "../../header/Header";
import ModalMessage from "../../modalMessage/ModalMessage";
import classes from './style.module.scss'
import { BusinessTripTypes, EducationLevelText, EducationLevelTypes, EmploymentTypes, ExperienceTypes, Language, MovingTypes, SalaryTypes, ScheduleTypes } from "../../types";

import { ReactComponent as CloseIcon } from './../../../images/xmark.svg'
import { ReactComponent as ArrowIcon } from './../../../images/arrow.svg'
import { ReactComponent as Checkbox } from './../../../images/check.svg'
import { ReactComponent as FullCheckbox } from './../../../images/fullCheck.svg'
import { useNavigate } from "react-router-dom";
import { useCreateCvMutation } from "../../../app/services/cvApi";
import { useDispatch } from "react-redux";
import { ModalTypes, changeInfo } from "../../../app/futures/user/modalSlice";
import { validateCreateCv } from "../../../validateUtils";

const categories = ['A', 'B', 'C', 'D', 'E', 'BE', 'CE', 'DE', 'TM', 'TB'];

const CvCreate: React.FC = () => {

    const CreateContent: React.FC = () => {
        const [isRotate, setIsRotate] = useState<boolean[]>([]);
        const [isRotateEduc, setIsRotateEduc] = useState<boolean>(false);

        const [name, setName] = useState<string>('');
        const [city, setCity] = useState<string>('');

        const [moving, setMoving] = useState<string>(MovingTypes.NOT_READY);
        const [businessTrip, setBusinessTrip] = useState<string>(BusinessTripTypes.NEVER);
        const [experience, setExperience] = useState<string>(ExperienceTypes.HAVENT);

        const [salaryFrom, setSalaryFrom] = useState<string>('');
        const [salaryTo, setSalaryTo] = useState<string>('');
        const [type, setType] = useState<string>(SalaryTypes.BEFORE_TAXES)

        const [employmentTypes, setEmploymentTypes] = useState<string[]>([]);
        const [schedule, setSchedule] = useState<string[]>([]);
        const [description, setDescription] = useState<string>('')

        const [institute, setInstitute] = useState<string>('');
        const [faculty, setFaculty] = useState<string>('');
        const [specialization, setSpecialization] = useState<string>('');
        const [educationLevel, setEducationLevel] = useState<string>(EducationLevelTypes.SECONDARY);

        const [languages, setLanguages] = useState<Language[]>([]);
        const [skills, setSkills] = useState<string[]>([]);
        const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

        const [createCv] = useCreateCvMutation();

        const navigate = useNavigate();
        const dispatch = useDispatch();

        const handleEducationLevelChange = (value: string) => {
            setEducationLevel(value);
            console.log(value);
        }

        const handleLanguageChange = (index: number, field: keyof Language, value: string) => {
            const newLanguages = [...languages];
            newLanguages[index][field] = value;
            setLanguages(newLanguages);
        };

        const handleChangeIsRotate = (index: number) => {
            const newRotate = [...isRotate];
            newRotate[index] = !newRotate[index];
            setIsRotate(newRotate);
        }

        const addLanguageInput = () => {
            setLanguages([...languages, { name: '', level: 'beginner_a1' }]);
            setIsRotate([...isRotate, false])
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

        const toggleCategory = (category: string) => {
            setSelectedCategories(prevSelected =>
                prevSelected.includes(category)
                    ? prevSelected.filter(c => c !== category)
                    : [...prevSelected, category]
            );
        };

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

        const handleExperienceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            setExperience(event.target.value);
        }

        const handleChangeMoving = (event: React.ChangeEvent<HTMLInputElement>) => {
            setMoving(event.target.value);
        };

        const handleChangeBusinessTrip = (event: React.ChangeEvent<HTMLInputElement>) => {
            setBusinessTrip(event.target.value);
        };

        const handleChangeSalaryType = (event: React.ChangeEvent<HTMLInputElement>) => {
            setType(event.target.value);
        };

        const handleCreateCv = async () => {
            try {
                const data = {
                    name,
                    city,
                    experience,
                    movingType: moving,
                    businessTripType: businessTrip,
                    salary: {
                        salaryFrom,
                        salaryTo,
                        type
                    },
                    employmentTypes,
                    schedules: schedule,
                    description,
                    institute: {
                        instituteName: institute,
                        facultyName: faculty,
                        specialization: specialization,
                        educationLevel: educationLevel
                    },
                    skills,
                    languages,
                    licenseCategories: selectedCategories,
                }

                const message = validateCreateCv(data);

                console.log(data)

                if (message !== '') {
                    dispatch(changeInfo({ type: ModalTypes.ERROR, message: message }));
                    return;
                }

                const res = await createCv(data).unwrap();
                dispatch(changeInfo({ type: ModalTypes.SUCCESS, message: res.message }))

            } catch (error: any) {
                if ('data' in error) {
                    dispatch(changeInfo({ type: ModalTypes.ERROR, message: error.message }))
                }
                console.error('Error creating cv:', error);
            }
        }

        return (
            <div className={classes.create_content}>
                <h1>Создание резюме</h1>
                <div className={classes.br}></div>
                <div className={classes.input_box}>
                    <div className={classes.label}>
                        <label htmlFor='name'>Профессия</label>
                    </div>
                    <p>Кем вы хотите работать?</p>
                    <div className={classes.input}>
                        <input type="text" value={name} id='name' onChange={(e: any) => setName(e.target.value)} autoComplete="off" />
                    </div>
                </div>
                <div className={classes.input_box}>
                    <div className={classes.label}>
                        <label htmlFor="city">Город</label>
                    </div>
                    <p>Где вы хотите работать?</p>
                    <div className={classes.input}>
                        <input type="text" id="city" value={city} onChange={(e: any) => setCity(e.target.value)} autoComplete="off" />
                    </div>
                </div>
                <div className={classes.input_box}>
                    <div className={classes.label}>
                        <label>Готовность к переездам</label>
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
                <div className={classes.input_box}>
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
                <div className={classes.input_box}>
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
                <div className={classes.input_box}>
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
                <div className={classes.input_box}>
                    <div className={classes.label}>
                        <label htmlFor="description">Расскажите о себе</label>
                    </div>
                    <p>Не пишите контактных данных в описании.</p>
                    <p>Не допускайте дискриминации.</p>
                    <div className={classes.input}>
                        <textarea name="description" id="description" value={description} onChange={(e: any) => setDescription(e.target.value)}></textarea>
                    </div>
                </div>
                <div className={classes.input_box}>
                    <div className={classes.label}>
                        <label>Текущее место обучение</label>
                    </div>
                    <p>Образовательное учереждение</p>
                    <div className={classes.input}>
                        <input placeholder="Институт" type="text" id="institute" autoComplete="off" value={institute}
                            onChange={(e: any) => setInstitute(e.target.value)}
                        />
                    </div>
                </div>
                <div className={classes.input_box}>
                    <p>Факультет</p>
                    <div className={classes.input}>
                        <input placeholder="Факультет" type="text" id="faculty" autoComplete="off" value={faculty}
                            onChange={(e: any) => setFaculty(e.target.value)}
                        />
                    </div>
                </div>
                <div className={classes.input_box}>
                    <p>Специализация</p>
                    <div className={classes.input}>
                        <input placeholder="Специализация" type="text" id="specialization" autoComplete="off" value={specialization}
                            onChange={(e: any) => setSpecialization(e.target.value)}
                        />
                    </div>
                </div>
                <div className={classes.input_box}>
                    <p>Уровень образования</p>
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
                    <button
                        className={`${classes.btn} ${classes.first}`}
                        onClick={handleCreateCv}
                    >
                        Создать резюме
                    </button>
                    <button className={classes.btn} onClick={() => navigate('../../../vacancies')}>
                        Отменить
                    </button>
                    <button className={classes.btn}>
                        Сохранить как черновик
                    </button>
                </div>
            </div >
        )
    }

    return (
        <>
            <Header />
            <main className={classes.content}>
                <div className={classes.container}>
                    <CreateContent />
                </div>
            </main>
            <ModalMessage />
        </>
    )
}

export default CvCreate;