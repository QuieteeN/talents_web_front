import React, { useEffect, useState } from "react";
import { IVacancy } from "../../types/dbTypes";
import classes from "./style.module.scss"
import { vacancies } from "../../database/vacancies";
import { ReactComponent as LikeIcon } from "../../images/likeIcon.svg"
import { getSalaryString } from "../../utils";
import LocationMap from "../map/LocationMap";

interface IProps {
    vacancyId: number;
}

function getVacancyData(vacancy: IVacancy | null): string {
    if (!!!vacancy) return ""

    let res = `${vacancy.type}, ${vacancy.shedule}`
    const partTime = vacancy.partTime ? `, ${vacancy.partTime}` : ""
    res += partTime

    return res
}


const VacancyItem: React.FC<IProps> = ({ vacancyId }: IProps) => {

    const [vacancyData, setVacancData] = useState<IVacancy | null>(null)

    useEffect(() => {
        setVacancData(vacancies[vacancyId]);
    }, [vacancyId])


    return (
        <div className={classes.vacancy_container}>
            <div className={classes.vacancy}>
                <div className={classes.vacancy__header_container}>
                    <div className={classes.vacancy__title}>
                        {vacancyData?.name}
                    </div>
                    <div className={classes.vacancy__salary_container}>
                        {getSalaryString(vacancyData?.salary)}
                    </div>
                    <div className={classes.vacany__requirements_container}>
                        <div className={classes.vacancy__requirements}>
                            Требуемый опыт работы: {vacancyData?.experience}
                        </div>
                        <div className={classes.vacancy__requirements}>
                            {getVacancyData(vacancyData)}
                        </div>
                    </div>
                    <div className={classes.vacancy__btn_container}>
                        <button className={`${classes.vacancy__btn} ${classes.btn_main}`}>Откликнуться</button>
                        <button className={`${classes.vacancy__btn} ${classes.btn_secondary}`}>
                            <LikeIcon />
                        </button>
                    </div>
                </div>

                {/* <div className={classes.vacancy__company_container}>
                    <a className={classes.company__title} href={vacancyData?.company.site}>
                        {vacancyData?.company.name}
                    </a>
                    <div className={classes.company__additional_info}>
                        {vacancyData?.company.city}
                    </div>
                </div> */}
                <div className={classes.vacancy__main_container}>
                    <div className={classes.vacancy__description}>
                        {vacancyData?.description}
                    </div>
                </div>

                <div className={classes.vacancy__skills_container}>
                    <span className={classes.vacancy__inner_title}>
                        Ключевые навыки
                    </span>
                    <div className={classes.vacancy__skills__items_container}>
                        {vacancyData?.skills.map((skill) => (
                            <div className={classes.vacancy__skills__item}>
                                {skill}
                            </div>
                        ))}
                    </div>
                </div>

                <div className={classes.vacancy__map_section_container}>
                    <div className={classes.vacancy__inner_title}>
                        Адрес
                    </div>
                    <div className={classes.vacncy__map_location}>
                        {/* {getAdresString(vacancyData?.address)} */}
                    </div>
                    <div className={classes.vacancy__map_container}>
                        <LocationMap coordinates={[55.76, 37.64]} />
                    </div>
                </div>

                <div className={classes.vacancy__end_btn_container}>
                    <button className={`${classes.vacancy__btn} ${classes.btn_main}`}>Откликнуться</button>
                </div>


                <div className={classes.footer}>
                </div>
            </div>

            {/* <div className={classes.vacancy__main_container}>
                <div className={classes.vacancy__description}>
                    {vacancyData?.description}
                </div>
            </div> */}
            <div className={classes.vacancy__company_container}>
                <a className={classes.company__title} href={vacancyData?.company.site}>
                    {vacancyData?.company.name}
                </a>
                <div className={classes.company__additional_info}>
                    {vacancyData?.company.city}
                </div>
            </div>
        </div>
    )
}

export default VacancyItem
