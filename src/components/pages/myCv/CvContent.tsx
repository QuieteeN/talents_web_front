import React from "react";
import { Params, useNavigate, useParams } from "react-router-dom";
import { useGetMyCvByIdQuery } from "../../../app/services/cvApi";
import classes from './style.module.scss'
import { formatPhoneNumber, getBusinessTripType, getEducationLevelText, getEmploymentType, getLanguageLevelText, getMovingType, getScheduleType, getStringSalary } from "../../../utils";

import { ReactComponent as DownloadIcon } from './../../../images/download.svg'
import { ReactComponent as RemoveIcon } from './../../../images/trash.svg'

const CvContent: React.FC = () => {

    const params: Readonly<Params<string>> = useParams();

    const cv = useGetMyCvByIdQuery({ cvId: params.cvId });
    const navigate = useNavigate();

    console.log(cv);

    return (
        <div className={classes.cv_info}>
            <div className={classes.info_header}>
                <div className={classes.header}>
                    <div className={classes.info_box}>
                        <h1>{`${cv?.data?.cv?.student?.name} ${cv?.data?.cv?.student?.surname}`}</h1>
                        <span className={classes.modify} onClick={() => navigate('./../../../../profile/student/modify')}>Редактировать</span>
                    </div>
                    <div className={classes.info_box}>
                        <p>
                            {
                                `${cv?.data?.cv?.city}${cv?.data?.cv?.movingType && `, ${getMovingType(cv?.data?.cv?.movingType)}`}${cv?.data?.cv?.businessTripType && `, ${getBusinessTripType(cv?.data?.cv?.businessTripType)}`}`
                            }
                        </p>
                        <span className={classes.modify} onClick={() => navigate('./../modifyTypes')}>Редактировать</span>
                    </div>
                    <div className={classes.info_box}>
                        <h3>Контакты</h3>
                        {cv?.data?.cv?.student?.info?.phoneNumber &&
                            <p>{formatPhoneNumber(cv?.data?.cv?.student?.info?.phoneNumber)}</p>
                        }
                        <p>
                            <a href={`mailto:${cv?.data?.cv?.student?.email}`}>{cv?.data?.cv?.student?.email}</a>
                        </p>
                        {cv?.data?.cv?.student?.info?.socials?.length > 0 &&
                            cv?.data?.cv?.student?.info?.socials.map((social: any) =>
                                <p>
                                    <a href={social?.url}>{social?.url}</a>
                                </p>
                            )
                        }
                        <span className={classes.modify} onClick={() => navigate('./../../../../profile/student/modify')}>Редактировать</span>
                    </div>
                </div>
                <div className={classes.cv_btns}>
                    <button className={classes.cv_btn}>
                        <DownloadIcon />
                    </button>
                    <button className={classes.cv_btn}>
                        <RemoveIcon />
                    </button>
                </div>
            </div>
            <div className={classes.info_content}>
                <h2>
                    {cv?.data?.cv?.name}
                    <span className={classes.modify} onClick={() => navigate('./../modifyMainInfo')}>Редактировать</span>
                </h2>
                {cv?.data?.cv?.salary && <h2 className={classes.salary}>{getStringSalary(cv?.data?.cv?.salary)}</h2>}
                <div className={classes.info_box}>
                    {cv?.data?.cv?.employmentTypes?.length > 0 &&
                        <p>Занятость:
                            {cv?.data?.cv?.employmentTypes.map((type: any, index: number) =>
                                <span>{index !== 0 && ','} {getEmploymentType(type)}</span>
                            )}
                        </p>
                    }
                    {cv?.data?.cv?.schedules?.length > 0 &&
                        <p>График работы:
                            {cv?.data?.cv?.schedules.map((type: any, index: number) =>
                                <span>{index !== 0 && ','} {getScheduleType(type)}</span>
                            )}
                        </p>
                    }
                </div>
            </div>
            <div className={classes.info_content}>
                <h2 className={classes.ligher}>
                    Ключевые навыки
                    <span className={classes.modify} onClick={() => navigate('./../modifySkills')}>Редактировать</span>
                </h2>
                {cv?.data?.cv?.keySkills?.length > 0 &&
                    <div className={classes.info_box}>
                        {
                            cv?.data?.cv?.keySkills.map((type: any, index: number) =>
                                <span className={classes.skill}>{type?.name}</span>
                            )
                        }
                    </div>
                }
            </div>
            <div className={classes.info_content}>
                <h2 className={classes.ligher}>
                    Опыт вождения
                    <span className={classes.modify} onClick={() => navigate('./../modifyLicense')}>Редактировать</span>
                </h2>
                {cv?.data?.cv?.licenseCategories?.length > 0 &&
                    <div className={`${classes.info_box} ${classes.license_box}`}>
                        <span>Права категории</span>
                        {
                            cv?.data?.cv?.licenseCategories.map((type: any, index: number) =>
                                <span className={classes.license}>{type?.code}</span>
                            )
                        }
                    </div>
                }
            </div>
            <div className={classes.info_content}>
                <h2 className={classes.ligher}>
                    Обо мне
                    <span className={classes.modify} onClick={() => navigate('./../modifyDescription')}>Редактировать</span>
                </h2>
                <div className={classes.info_box}>
                    <pre>{cv?.data?.cv?.description}</pre>
                </div>
            </div>
            <div className={classes.info_content}>
                <h2 className={classes.ligher}>
                    Образование
                    <span className={classes.modify} onClick={() => navigate('./../modifyEducation')}>Редактировать</span>
                </h2>
                {cv?.data?.cv?.institute &&
                    <div className={classes.info_box}>
                        <h5>{cv?.data?.cv?.institute?.instituteName}</h5>
                        <p>{cv?.data?.cv?.institute?.facultyName}, {cv?.data?.cv?.institute?.specialization}</p>
                        <p>{getEducationLevelText(cv?.data?.cv?.institute?.educationLevel)}</p>
                    </div>
                }
            </div>
            <div className={classes.info_content}>
                <h2 className={classes.ligher}>
                    Знание языков
                    <span className={classes.modify} onClick={() => navigate('./../modifyLanguages')}>Редактировать</span>
                </h2>
                {cv?.data?.cv?.languages?.length > 0 &&
                    <div className={classes.info_box}>
                        {
                            cv?.data?.cv?.languages.map((type: any, index: number) =>
                                <span className={classes.skill}>{type?.name} - {getLanguageLevelText(type?.level)}</span>
                            )
                        }
                    </div>
                }
            </div>
        </div>
    )
}

export default CvContent;