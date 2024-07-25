import React, { useEffect, useState } from "react";
import Header from "../../header/Header";
import classes from "./style.module.scss"
import ModalMessage from "../../modalMessage/ModalMessage";
import ReactLoading from "react-loading";
import CVList from "../../cv/CVList";

import { ReactComponent as ArrowIcon } from './../../../images/arrow.svg'
import { ReactComponent as FullCheckbox } from './../../../images/fullCheck.svg'
import { ReactComponent as Checkbox } from './../../../images/check.svg'
import { useGetAllKeySkillsQuery } from "../../../app/services/keySkillApi";
import { useGetAllLanguagesQuery } from "../../../app/services/languageApi";
import { BusinessTripTypes, EmploymentTypes, ExperienceTypes, MovingTypes, ScheduleTypes } from "../../types";
import { getEmploymentTypeText, getScheduleTypeText } from "../../../utils";
import { useLocation, useNavigate } from "react-router-dom";
import { useGetCVsQuery } from "../../../app/services/searchApi";

const OrderValues: Record<string, string> = {
    same: 'По соответствию',
    date: 'По дате',
    salaryAsc: 'По возрастанию зарплат',
    salaryDesc: 'По убыванию зарплат'
};

const categories = ['A', 'B', 'C', 'D', 'E', 'BE', 'CE', 'DE', 'TM', 'TB'];

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
};

const Cvies: React.FC = () => {

    const CviesContent: React.FC = () => {
        const query = useQuery();
        const filters = {
            description: query.get('description') || '',
            city: query.get('city') || '',
            specialization: query.get('specialization') || '',
            employmentType: query.get('employmentType') || '',
            schedule: query.get('schedule') || '',
            keySkills: query.get('keySkills') || '',
            licenses: query.get('licenses') || '',
            languages: query.get('languages') || '',
            orderBy: query.get('orderBy') || '',
            moving: query.get('moving') || '',
            businessTrip: query.get('businessTrip') || '',
            experience: query.get('experience') || '',
        };
        const { data: cvies, isLoading } = useGetCVsQuery(filters);

        console.log(cvies)

        const [isVisibleAllOrders, setIsVisibleAllOrders] = useState<boolean>(false)
        const [description, setDescription] = useState<string>('');
        const [orderBy, setOrderBy] = useState<string>('same');
        const [city, setCity] = useState<string>('');
        const [specialization, setSpecialization] = useState<string>('');
        const [skillsFilter, setSkillsFilter] = useState<string[]>([]);
        const [languagesFilter, setLanguagesFilter] = useState<string[]>([]);
        const [liceseCategoriesFilter, setLicenseCategoriesFilter] = useState<string[]>([]);
        const [moving, setMoving] = useState<string[]>([]);
        const [businessTrip, setBusinessTrip] = useState<string[]>([]);
        const [experience, setExperience] = useState<string[]>([]);
        const [employmentType, setEmploymentType] = useState<string[]>([]);
        const [schedule, setSchedule] = useState<string[]>([]);

        const keySkills = useGetAllKeySkillsQuery();
        const languages = useGetAllLanguagesQuery();

        const navigate = useNavigate();

        useEffect(() => {
            setDescription(filters.description)
            setCity(filters.city);
            setSpecialization(filters.specialization);
            const employments = filters.employmentType.split(',');
            setEmploymentType(employments);
            const schedule = filters.schedule.split(',');
            setSchedule(schedule);
            const skills = filters.keySkills.split(',');
            setSkillsFilter(skills);
            const licenses = filters.licenses.split(',');
            setLicenseCategoriesFilter(licenses);
            const languages = filters.languages.split(',');
            setLanguagesFilter(languages);
            const experience = filters.experience.split(',')
            setExperience(experience);
            const moving = filters.moving.split(',');
            setMoving(moving);
            const bisunessTrip = filters.businessTrip.split(',');
            setBusinessTrip(bisunessTrip);
            setOrderBy(filters.orderBy || 'same')

        }, [filters.businessTrip, filters.city, filters.description, filters.employmentType, filters.experience, filters.keySkills, filters.languages, filters.licenses, filters.moving, filters.orderBy, filters.schedule, filters.specialization]);


        const handleChangeOrderType = (order: string) => {
            setOrderBy(order);
        };

        const handleChangeEmploymentType = (event: any) => {
            const { value, checked } = event.target;
            if (checked) {
                setEmploymentType((prev: string[]) => [...prev, value]);
            } else {
                setEmploymentType((prev: string[]) => prev.filter((type: string) => type !== value));
            }
        }

        const handleChangeSchedule = (event: any) => {
            const { value, checked } = event.target;
            if (checked) {
                setSchedule((prev: string[]) => [...prev, value]);
            } else {
                setSchedule((prev: string[]) => prev.filter((type: string) => type !== value));
            }
        }

        const handleExperienceChange = (event: any) => {
            const { value, checked } = event.target;
            if (checked) {
                setExperience((prev: string[]) => [...prev, value]);
            } else {
                setExperience((prev: string[]) => prev.filter((type: string) => type !== value));
            }
        };

        const handleChangeBusinessTrip = (event: any) => {
            const { value, checked } = event.target;
            if (checked) {
                setBusinessTrip((prev: string[]) => [...prev, value]);
            } else {
                setBusinessTrip((prev: string[]) => prev.filter((type: string) => type !== value));
            }
        };

        const handleChangeMoving = (event: any) => {
            const { value, checked } = event.target;
            if (checked) {
                setMoving((prev: string[]) => [...prev, value]);
            } else {
                setMoving((prev: string[]) => prev.filter((type: string) => type !== value));
            }
        };

        const handleChangeSkillsFilter = (event: any) => {
            const { value, checked } = event.target;
            if (checked) {
                setSkillsFilter((prev: string[]) => [...prev, value]);
            } else {
                setSkillsFilter((prev: string[]) => prev.filter((type: string) => type !== value));
            }
        };

        const handleChangeLicenseCategoriesFilter = (event: any) => {
            const { value, checked } = event.target;
            if (checked) {
                setLicenseCategoriesFilter((prev: string[]) => [...prev, value]);
            } else {
                setLicenseCategoriesFilter((prev: string[]) => prev.filter((type: string) => type !== value));
            }
        };

        const handleChangeLanguagesFilter = (event: any) => {
            const { value, checked } = event.target;
            if (checked) {
                setLanguagesFilter((prev: string[]) => [...prev, value]);
            } else {
                setLanguagesFilter((prev: string[]) => prev.filter((type: string) => type !== value));
            }
        };

        const handleReset = () => {
            const params = new URLSearchParams();

            navigate(`/cvies?${params.toString()}`);
        };

        const handleSearch = () => {
            const params = new URLSearchParams();
            if (description) params.append('description', description);
            if (city) params.append('city', city);
            if (specialization) params.append('specialization', specialization);
            if (employmentType) params.append('employmentType', employmentType.join(','));
            if (schedule) params.append('schedule', schedule.join(','));
            if (skillsFilter.length) params.append('keySkills', skillsFilter.join(','));
            if (moving) params.append('moving', moving.join(','));
            if (businessTrip) params.append('businessTrip', businessTrip.join(','));
            if (experience.length) params.append('experience', experience.join(','));
            if (liceseCategoriesFilter.length) params.append('licenses', liceseCategoriesFilter.join(','));
            if (languagesFilter.length) params.append('languages', languagesFilter.join(','));
            if (orderBy) params.append('orderBy', orderBy);

            navigate(`/cvies?${params.toString()}`);
        };

        return (
            <div className={classes.cvies_content} onClick={() => setIsVisibleAllOrders(false)}>
                <div className={classes.search}>
                    <input placeholder="Поиск по резюме" type="text" id="search" autoComplete="off" className={classes.search_input} value={description} onChange={(e: any) => setDescription(e.target.value)} />
                    <button className={classes.search_btn} onClick={handleSearch}>Найти</button>
                </div>
                <div className={classes.results}>
                    <div className={classes.results_header}>
                        <h3>{`Найдено ${cvies?.cvs?.length} резюме`}</h3>
                        <div className={classes.orders}>
                            <div className={classes.select_input} onClick={(e: any) => {
                                e.stopPropagation();
                                setIsVisibleAllOrders((prev: boolean) => !prev)
                            }}>
                                <span className={classes.order}>{OrderValues[orderBy]}</span>
                                <span className={classes.icon}>
                                    <ArrowIcon />
                                </span>
                            </div>
                            <div className={`${classes.all_orders} ${isVisibleAllOrders ? classes.active : ''}`}>
                                {Object.entries(OrderValues).map(([orderKey, orderValue]) => (
                                    <div
                                        className={`${classes.order_item} ${orderBy === orderKey ? classes.active : ''}`}
                                        key={orderKey}
                                        onClick={() => {
                                            handleChangeOrderType(orderKey)
                                        }}
                                    >
                                        {orderValue}
                                    </div>
                                ))}
                            </div>
                            <button onClick={handleSearch}>Применить</button>
                        </div>
                    </div>
                    <div className={classes.cvies_data}>
                        {isLoading ?
                            <div className={classes.loading_box}>
                                <ReactLoading type='spinningBubbles' color='#3B26B6' height={'10%'} width={'10%'} />
                            </div> :
                            <CVList cards={cvies?.cvs} type='all' />
                        }
                        <div className={classes.filters}>
                            <div className={classes.filter_box}>
                                <div className={classes.label}>Город</div>
                                <div className={`${classes.input}`}>
                                    <input placeholder="Город" type="text" id="city" autoComplete="off" value={city}
                                        onChange={(e: any) => setCity(e.target.value)} />
                                </div>
                            </div>
                            <div className={classes.filter_box}>
                                <div className={classes.label}>Специализация</div>
                                <div className={`${classes.input}`}>
                                    <input placeholder="Специализация" type="text" id="specialization" autoComplete="off" value={specialization}
                                        onChange={(e: any) => setSpecialization(e.target.value)} />
                                </div>
                            </div>
                            <div className={classes.filter_box}>
                                <div className={classes.label}>
                                    <label>Готовность к переездам</label>
                                </div>
                                <div className={classes.input}>
                                    <label className={`${classes.checkboxLabel} ${moving.includes(MovingTypes.NOT_READY) ? classes.checked : ''}`}>
                                        <input
                                            type="checkbox"
                                            name="moving"
                                            value={MovingTypes.NOT_READY}
                                            checked={moving.includes(MovingTypes.NOT_READY)}
                                            onChange={handleChangeMoving}
                                        />
                                        Не готов к переезду
                                        <span className={classes.icon}>
                                            {moving.includes(MovingTypes.NOT_READY) ? <FullCheckbox /> : <Checkbox />}
                                        </span>
                                    </label>
                                    <label className={`${classes.checkboxLabel} ${moving.includes(MovingTypes.READY) ? classes.checked : ''}`}>
                                        <input
                                            type="checkbox"
                                            name="moving"
                                            value={MovingTypes.READY}
                                            checked={moving.includes(MovingTypes.READY)}
                                            onChange={handleChangeMoving}
                                        />
                                        Готов к переезду
                                        <span className={classes.icon}>
                                            {moving.includes(MovingTypes.READY) ? <FullCheckbox /> : <Checkbox />}
                                        </span>
                                    </label>
                                    <label className={`${classes.checkboxLabel} ${moving.includes(MovingTypes.WANT) ? classes.checked : ''}`}>
                                        <input
                                            type="checkbox"
                                            name="experience"
                                            value={MovingTypes.WANT}
                                            checked={moving.includes(MovingTypes.WANT)}
                                            onChange={handleChangeMoving}
                                        />
                                        Переезд желателен
                                        <span className={classes.icon}>
                                            {moving.includes(MovingTypes.WANT) ? <FullCheckbox /> : <Checkbox />}
                                        </span>
                                    </label>
                                </div>
                            </div>
                            <div className={classes.filter_box}>
                                <div className={classes.label}>
                                    <label>Готовность к командировкам</label>
                                </div>
                                <div className={classes.input}>
                                    <label className={`${classes.checkboxLabel} ${businessTrip.includes(BusinessTripTypes.NEVER) ? classes.checked : ''}`}>
                                        <input
                                            type="checkbox"
                                            name="businessTrip"
                                            value={BusinessTripTypes.NEVER}
                                            checked={businessTrip.includes(BusinessTripTypes.NEVER)}
                                            onChange={handleChangeBusinessTrip}
                                        />
                                        Никогда
                                        <span className={classes.icon}>
                                            {businessTrip.includes(BusinessTripTypes.NEVER) ? <FullCheckbox /> : <Checkbox />}
                                        </span>
                                    </label>
                                    <label className={`${classes.checkboxLabel} ${businessTrip.includes(BusinessTripTypes.READY) ? classes.checked : ''}`}>
                                        <input
                                            type="checkbox"
                                            name="businessTrip"
                                            value={BusinessTripTypes.READY}
                                            checked={businessTrip.includes(BusinessTripTypes.READY)}
                                            onChange={handleChangeBusinessTrip}
                                        />
                                        Готов
                                        <span className={classes.icon}>
                                            {businessTrip.includes(BusinessTripTypes.READY) ? <FullCheckbox /> : <Checkbox />}
                                        </span>
                                    </label>
                                    <label className={`${classes.checkboxLabel} ${businessTrip.includes(BusinessTripTypes.SOMETIMES) ? classes.checked : ''}`}>
                                        <input
                                            type="checkbox"
                                            name="businessTrip"
                                            value={BusinessTripTypes.SOMETIMES}
                                            checked={businessTrip.includes(BusinessTripTypes.SOMETIMES)}
                                            onChange={handleChangeBusinessTrip}
                                        />
                                        Иногда
                                        <span className={classes.icon}>
                                            {businessTrip.includes(BusinessTripTypes.SOMETIMES) ? <FullCheckbox /> : <Checkbox />}
                                        </span>
                                    </label>
                                </div>
                            </div>
                            <div className={classes.filter_box}>
                                <div className={classes.label}>
                                    <label>Опыт работы</label>
                                </div>
                                <div className={classes.input}>
                                    <label className={`${classes.checkboxLabel} ${experience.includes(ExperienceTypes.HAVENT) ? classes.checked : ''}`}>
                                        <input
                                            type="checkbox"
                                            name="experience"
                                            value={ExperienceTypes.HAVENT}
                                            checked={experience.includes(ExperienceTypes.HAVENT)}
                                            onChange={handleExperienceChange}
                                        />
                                        Без опыта
                                        <span className={classes.icon}>
                                            {experience.includes(ExperienceTypes.HAVENT) ? <FullCheckbox /> : <Checkbox />}
                                        </span>
                                    </label>
                                    <label className={`${classes.checkboxLabel} ${experience.includes(ExperienceTypes.LOWER_ONE) ? classes.checked : ''}`}>
                                        <input
                                            type="checkbox"
                                            name="experience"
                                            value={ExperienceTypes.LOWER_ONE}
                                            checked={experience.includes(ExperienceTypes.LOWER_ONE)}
                                            onChange={handleExperienceChange}
                                        />
                                        Менее 1 года
                                        <span className={classes.icon}>
                                            {experience.includes(ExperienceTypes.LOWER_ONE) ? <FullCheckbox /> : <Checkbox />}
                                        </span>
                                    </label>
                                    <label className={`${classes.checkboxLabel} ${experience.includes(ExperienceTypes.ONE_THREE) ? classes.checked : ''}`}>
                                        <input
                                            type="checkbox"
                                            name="experience"
                                            value={ExperienceTypes.ONE_THREE}
                                            checked={experience.includes(ExperienceTypes.ONE_THREE)}
                                            onChange={handleExperienceChange}
                                        />
                                        От 1 года до 3 лет
                                        <span className={classes.icon}>
                                            {experience.includes(ExperienceTypes.ONE_THREE) ? <FullCheckbox /> : <Checkbox />}
                                        </span>
                                    </label>
                                    <label className={`${classes.checkboxLabel} ${experience.includes(ExperienceTypes.THREE_SIX) ? classes.checked : ''}`}>
                                        <input
                                            type="checkbox"
                                            name="experience"
                                            value={ExperienceTypes.THREE_SIX}
                                            checked={experience.includes(ExperienceTypes.THREE_SIX)}
                                            onChange={handleExperienceChange}
                                        />
                                        От 3 до 6 лет
                                        <span className={classes.icon}>
                                            {experience.includes(ExperienceTypes.THREE_SIX) ? <FullCheckbox /> : <Checkbox />}
                                        </span>
                                    </label>
                                    <label className={`${classes.checkboxLabel} ${experience.includes(ExperienceTypes.UPPER_SIX) ? classes.checked : ''}`}>
                                        <input
                                            type="checkbox"
                                            name="experience"
                                            value={ExperienceTypes.UPPER_SIX}
                                            checked={experience.includes(ExperienceTypes.UPPER_SIX)}
                                            onChange={handleExperienceChange}
                                        />
                                        Более 6 лет
                                        <span className={classes.icon}>
                                            {experience.includes(ExperienceTypes.UPPER_SIX) ? <FullCheckbox /> : <Checkbox />}
                                        </span>
                                    </label>
                                </div>
                            </div>
                            <div className={classes.filter_box}>
                                <div className={classes.label}>
                                    <label>Типы занятости</label>
                                </div>
                                <div className={`${classes.input} ${classes.row_wrap}`}>
                                    {Object.entries(EmploymentTypes).map(([key, employmentTypeValue]: [key: string, employmentTypeValue: string]) => (
                                        <label className={`${classes.checkboxLabel} ${employmentType.includes(employmentTypeValue) ? classes.checked : ''}`}>
                                            <input
                                                type="checkbox"
                                                name="employmentType"
                                                value={employmentTypeValue}
                                                checked={employmentType.includes(employmentTypeValue)}
                                                onChange={handleChangeEmploymentType}
                                            />
                                            {getEmploymentTypeText(employmentTypeValue)}
                                            <span className={classes.icon}>
                                                {employmentType.includes(employmentTypeValue) ? <FullCheckbox /> : <Checkbox />}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                            <div className={classes.filter_box}>
                                <div className={classes.label}>
                                    <label>График работы</label>
                                </div>
                                <div className={`${classes.input} ${classes.row_wrap}`}>
                                    {Object.entries(ScheduleTypes).map(([key, scheduleTypeValue]: [key: string, employmentTypeValue: string]) => (
                                        <label className={`${classes.checkboxLabel} ${schedule.includes(scheduleTypeValue) ? classes.checked : ''}`}>
                                            <input
                                                type="checkbox"
                                                name="scheduleTypeValue"
                                                value={scheduleTypeValue}
                                                checked={schedule.includes(scheduleTypeValue)}
                                                onChange={handleChangeSchedule}
                                            />
                                            {getScheduleTypeText(scheduleTypeValue)}
                                            <span className={classes.icon}>
                                                {schedule.includes(scheduleTypeValue) ? <FullCheckbox /> : <Checkbox />}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                            <div className={classes.filter_box}>
                                <div className={classes.label}>
                                    <label>Ключевые навыки</label>
                                </div>
                                <div className={`${classes.input} ${classes.row_wrap}`}>
                                    {keySkills?.data?.keySkills?.map((skill: any) =>
                                        skill.name !== '' &&
                                        <label className={`${classes.checkboxLabel} ${skillsFilter.includes(skill.name) ? classes.checked : ''}`}>
                                            <input
                                                type="checkbox"
                                                name="skill"
                                                value={skill.name}
                                                checked={skillsFilter.includes(skill.name)}
                                                onChange={handleChangeSkillsFilter}
                                            />
                                            {skill.name}
                                            <span className={classes.icon}>
                                                {skillsFilter.includes(skill.name) ? <FullCheckbox /> : <Checkbox />}
                                            </span>
                                        </label>

                                    )}
                                </div>
                            </div>
                            <div className={classes.filter_box}>
                                <div className={classes.label}>
                                    <label>Категории прав</label>
                                </div>
                                <div className={`${classes.input} ${classes.row_wrap}`}>
                                    {categories.map((licenseCategory: string, index: number) =>
                                        <label className={`${classes.checkboxLabel} ${liceseCategoriesFilter.includes(licenseCategory) ? classes.checked : ''}`}>
                                            <input
                                                type="checkbox"
                                                name="skill"
                                                value={licenseCategory}
                                                checked={liceseCategoriesFilter.includes(licenseCategory)}
                                                onChange={handleChangeLicenseCategoriesFilter}
                                            />
                                            {licenseCategory}
                                            <span className={classes.icon}>
                                                {liceseCategoriesFilter.includes(licenseCategory) ? <FullCheckbox /> : <Checkbox />}
                                            </span>
                                        </label>
                                    )}
                                </div>
                            </div>
                            <div className={classes.filter_box}>
                                <div className={classes.label}>
                                    <label>Языки</label>
                                </div>
                                <div className={`${classes.input} ${classes.row_wrap}`}>
                                    {languages?.data?.languages.map((language: any) =>
                                        <label className={`${classes.checkboxLabel} ${languagesFilter.includes(language.name) ? classes.checked : ''}`}>
                                            <input
                                                type="checkbox"
                                                name="language"
                                                value={language.name}
                                                checked={languagesFilter.includes(language.name)}
                                                onChange={handleChangeLanguagesFilter}
                                            />
                                            {language.name}
                                            <span className={classes.icon}>
                                                {languagesFilter.includes(language.name) ? <FullCheckbox /> : <Checkbox />}
                                            </span>
                                        </label>
                                    )}
                                </div>
                            </div>
                            <div className={classes.btn_box}>
                                <button onClick={handleSearch}>Применить</button>
                                <button onClick={handleReset}>Сбросить</button>
                            </div>
                        </div>

                    </div>
                </div>
            </div >
        )
    }

    return (
        <>
            <Header />
            <main className={classes.content}>
                <div className={classes.container}>
                    <CviesContent />
                </div>
            </main>
            <ModalMessage />
        </>
    )
}

export default Cvies;