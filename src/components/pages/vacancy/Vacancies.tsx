import React, { useEffect, useState } from "react";
import Header from "../../header/Header";
import classes from './style.module.scss'
import CardList from "../../card/CardList";
import ModalMessage from "../../modalMessage/ModalMessage";
import ReactLoading from "react-loading";
import { EmploymentTypes, ScheduleTypes } from "../../types";

import { ReactComponent as FullCheckbox } from './../../../images/fullCheck.svg'
import { ReactComponent as Checkbox } from './../../../images/check.svg'
import { ReactComponent as ArrowIcon } from './../../../images/arrow.svg'
import { useLocation, useNavigate } from "react-router-dom";
import { useGetVacanciesQuery } from "../../../app/services/searchApi";
import { useGetAllKeySkillsQuery } from "../../../app/services/keySkillApi";
import { useGetAllLanguagesQuery } from "../../../app/services/languageApi";

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

const Vacancies: React.FC = () => {


    const VacanciesContent: React.FC = () => {
        const query = useQuery();
        const filters = {
            name: query.get('name') || '',
            city: query.get('city') || '',
            specialization: query.get('specialization') || '',
            salaryFrom: query.get('salaryFrom') || '',
            employmentType: query.get('employmentType') || '',
            schedule: query.get('schedule') || '',
            keySkills: query.get('keySkills') || '',
            licenses: query.get('licenses') || '',
            languages: query.get('languages') || '',
            orderBy: query.get('orderBy') || '',
        };

        const { data: vacancies, isLoading } = useGetVacanciesQuery(filters);

        const [name, setName] = useState<string>('')
        const [salaryFrom, setSalaryFrom] = useState('');
        const [city, setCity] = useState('');
        const [specialization, setSpecialization] = useState('');
        const [employmentType, setEmploymentType] = useState<string>(EmploymentTypes.NO);
        const [schedule, setSchedule] = useState<string>(ScheduleTypes.NO);
        const [skillsFilter, setSkillsFilter] = useState<string[]>([]);
        const [liceseCategoriesFilter, setLicenseCategoriesFilter] = useState<string[]>([]);
        const [languagesFilter, setLanguagesFilter] = useState<string[]>([]);
        const [isVisibleAllOrders, setIsVisibleAllOrders] = useState<boolean>(false);
        const [orderBy, setOrderBy] = useState<string>('same');

        const navigate = useNavigate();

        const keySkills = useGetAllKeySkillsQuery();
        const languages = useGetAllLanguagesQuery();
        console.log(languages)

        useEffect(() => {
            setName(filters.name);
            setSalaryFrom(filters.salaryFrom);
            setCity(filters.city);
            setSpecialization(filters.specialization);
            setEmploymentType(filters.employmentType || EmploymentTypes.NO);
            setSchedule(filters.schedule || ScheduleTypes.NO);
            const skills = filters.keySkills.split(',');
            setSkillsFilter(skills);
            const licenses = filters.licenses.split(',');
            setLicenseCategoriesFilter(licenses);
            const languages = filters.languages.split(',');
            setLanguagesFilter(languages);
            setOrderBy(filters.orderBy || 'same')

        }, [filters.city, filters.employmentType, filters.keySkills, filters.languages, filters.licenses, filters.name, filters.orderBy, filters.salaryFrom, filters.schedule, filters.specialization]);

        const handleChangeOrderType = (order: string) => {
            setOrderBy(order);
        };

        const handleEmploymentTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            setEmploymentType(event.target.value);
        }

        const handleSheduleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            setSchedule(event.target.value);
        }

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

            navigate(`/vacancies?${params.toString()}`);
        }

        const handleSearch = () => {
            const params = new URLSearchParams();
            if (name) params.append('name', name);
            if (city) params.append('city', city);
            if (specialization) params.append('specialization', specialization);
            if (salaryFrom) params.append('salaryFrom', salaryFrom);
            if (employmentType) params.append('employmentType', employmentType);
            if (schedule) params.append('schedule', schedule);
            if (skillsFilter.length) params.append('keySkills', skillsFilter.join(','));
            if (liceseCategoriesFilter.length) params.append('licenses', liceseCategoriesFilter.join(','));
            if (languagesFilter.length) params.append('languages', languagesFilter.join(','));
            if (orderBy) params.append('orderBy', orderBy);

            navigate(`/vacancies?${params.toString()}`);
        };

        return (
            <div className={classes.vacancies_content} onClick={() => setIsVisibleAllOrders(false)}>
                <div className={classes.search}>
                    <input placeholder="Профессия" type="text" id="search" autoComplete="off" className={classes.search_input} value={name} onChange={(e: any) => setName(e.target.value)} />
                    <button className={classes.search_btn} onClick={handleSearch}>Найти</button>
                </div>
                <div className={classes.results}>
                    <div className={classes.results_header}>
                        <h3>{`Найдено ${vacancies?.vacancies?.length} ${vacancies?.vacancies?.length === 1 ? 'вакансия' : vacancies?.vacancies?.length < 5 ? 'вакансии' : 'вакансий'}`}</h3>
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
                                            handleSearch();
                                        }}
                                    >
                                        {orderValue}
                                    </div>
                                ))}
                            </div>
                            <button onClick={handleSearch}>Применить</button>
                        </div>
                    </div>
                    <div className={classes.vacancies_data}>
                        <div className={classes.filters}>
                            <div className={classes.filter_box}>
                                <div className={classes.label}>Уровень дохода</div>
                                <div className={`${classes.input}`}>
                                    <input placeholder="От" type="text" id="salaryFrom" autoComplete="off" value={salaryFrom}
                                        onChange={(e: any) => setSalaryFrom(e.target.value)} />
                                </div>
                            </div>
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
                                    <label>Тип занятости</label>
                                </div>
                                <div className={classes.input}>
                                    <label className={`${classes.radioLabel} ${employmentType === EmploymentTypes.FULL_EMPLOYMENT ? classes.checked : ''}`}>
                                        <input
                                            type="radio"
                                            name="employment_type"
                                            value={EmploymentTypes.FULL_EMPLOYMENT}
                                            checked={employmentType === EmploymentTypes.FULL_EMPLOYMENT}
                                            onChange={handleEmploymentTypeChange}
                                        />
                                        Полная занятость
                                    </label>
                                    <label className={`${classes.radioLabel} ${employmentType === EmploymentTypes.PART_TIME_EMPLOYMENT ? classes.checked : ''}`}>
                                        <input
                                            type="radio"
                                            name="employment_type"
                                            value={EmploymentTypes.PART_TIME_EMPLOYMENT}
                                            checked={employmentType === EmploymentTypes.PART_TIME_EMPLOYMENT}
                                            onChange={handleEmploymentTypeChange}
                                        />
                                        Частичная занятость
                                    </label>
                                    <label className={`${classes.radioLabel} ${employmentType === EmploymentTypes.PROJECT_WORK ? classes.checked : ''}`}>
                                        <input
                                            type="radio"
                                            name="employment_type"
                                            value={EmploymentTypes.PROJECT_WORK}
                                            checked={employmentType === EmploymentTypes.PROJECT_WORK}
                                            onChange={handleEmploymentTypeChange}
                                        />
                                        Проектная работа
                                    </label>
                                    <label className={`${classes.radioLabel} ${employmentType === EmploymentTypes.INTERSHIP ? classes.checked : ''}`}>
                                        <input
                                            type="radio"
                                            name="employment_type"
                                            value={EmploymentTypes.INTERSHIP}
                                            checked={employmentType === EmploymentTypes.INTERSHIP}
                                            onChange={handleEmploymentTypeChange}
                                        />
                                        Стажировка
                                    </label>
                                    <label className={`${classes.radioLabel} ${employmentType === EmploymentTypes.NO ? classes.checked : ''}`}>
                                        <input
                                            type="radio"
                                            name="employment_type"
                                            value={EmploymentTypes.NO}
                                            checked={employmentType === EmploymentTypes.NO}
                                            onChange={handleEmploymentTypeChange}
                                        />
                                        Не имеет значения
                                    </label>
                                </div>
                            </div>
                            <div className={classes.filter_box}>
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
                                            onChange={handleSheduleChange}
                                        />
                                        Полный день
                                    </label>
                                    <label className={`${classes.radioLabel} ${schedule === ScheduleTypes.SHIFT_WORK ? classes.checked : ''}`}>
                                        <input
                                            type="radio"
                                            name="schedule"
                                            value={ScheduleTypes.SHIFT_WORK}
                                            checked={schedule === ScheduleTypes.SHIFT_WORK}
                                            onChange={handleSheduleChange}
                                        />
                                        Сменный график
                                    </label>
                                    <label className={`${classes.radioLabel} ${schedule === ScheduleTypes.FLEXIBLE_SHEDULE ? classes.checked : ''}`}>
                                        <input
                                            type="radio"
                                            name="schedule"
                                            value={ScheduleTypes.FLEXIBLE_SHEDULE}
                                            checked={schedule === ScheduleTypes.FLEXIBLE_SHEDULE}
                                            onChange={handleSheduleChange}
                                        />
                                        Гибкий график
                                    </label>
                                    <label className={`${classes.radioLabel} ${schedule === ScheduleTypes.DISTANT_WORK ? classes.checked : ''}`}>
                                        <input
                                            type="radio"
                                            name="schedule"
                                            value={ScheduleTypes.DISTANT_WORK}
                                            checked={schedule === ScheduleTypes.DISTANT_WORK}
                                            onChange={handleSheduleChange}
                                        />
                                        Удаленная работа
                                    </label>
                                    <label className={`${classes.radioLabel} ${schedule === ScheduleTypes.NO ? classes.checked : ''}`}>
                                        <input
                                            type="radio"
                                            name="schedule"
                                            value={ScheduleTypes.NO}
                                            checked={schedule === ScheduleTypes.NO}
                                            onChange={handleSheduleChange}
                                        />
                                        Не указан
                                    </label>
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
                        {isLoading ?
                            <div className={classes.loading_box}>
                                <ReactLoading type='spinningBubbles' color='#3B26B6' height={'10%'} width={'10%'} />
                            </div> :
                            <CardList cards={vacancies?.vacancies} type='all' />
                        }

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
                    <VacanciesContent />
                </div>
            </main>
            <ModalMessage />
        </>
    )
}

export default Vacancies;