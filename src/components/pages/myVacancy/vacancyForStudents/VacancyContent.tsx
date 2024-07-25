import React, { useState } from "react"
import ReactLoading from "react-loading"
import classes from './../style.module.scss'
import { Params, useParams } from "react-router-dom"
import { ReactComponent as LikeIcon } from './../../../../images/likeIcon.svg'
import { ReactComponent as DownloadIcon } from './../../../../images/download.svg'
import { ReactComponent as FullLikeIcon } from './../../../../images/fullLike.svg'
import { ReactComponent as TelegramIcon } from './../../../../images/telegram.svg';
import { ReactComponent as VkIcon } from './../../../../images/vk.svg';
import { ReactComponent as OdnoklasnikiIcon } from './../../../../images/odnoklasniki.svg';
import { ReactComponent as YoutubeIcon } from './../../../../images/youtube.svg'
import { useGetVacancyByIdQuery } from "../../../../app/services/vacancyApi"
import { getEmploymentType, getExperience, getLanguageLevelText, getScheduleType, getStringSalary } from "../../../../utils"
import LocationMap from "../../../map/LocationMap"
import { useDispatch } from "react-redux"
import { visibleResponseModal } from "../../../../app/futures/responseModalSlice"


const Icon: React.FC<{ type: string }> = ({ type }: { type: string }) => {
    switch (type) {
        case 'telegram':
            return <TelegramIcon />
        case 'vk':
            return <VkIcon />
        case 'ok':
            return <OdnoklasnikiIcon />
        default:
            return <YoutubeIcon />
    }
}

const VacancyContent: React.FC = () => {
    const params: Readonly<Params<string>> = useParams()
    const [isLiked, setIsLiked] = useState<boolean>(false);

    const vacancy = useGetVacancyByIdQuery({ vacancyId: params.vacancyId });

    const dispatch = useDispatch()

    return (
        <>
            {vacancy.isLoading ? <ReactLoading type='spinningBubbles' color='#3B26B6' height={'20%'} width={'20%'} /> :
                <div className={classes.vacancy}>
                    <div className={classes.vacancy_info}>
                        <div className={classes.vacancy_top}>
                            <h2>{vacancy.data.vacancy.name}</h2>
                            <div className={classes.salary}>{getStringSalary(vacancy.data?.vacancy?.salary)}</div>
                            <div className={classes.add_data}>
                                <p>{`Требуемый опыт работы: ${getExperience(vacancy.data?.vacancy?.experience)}`}</p>
                                <p>{`Тип занятости: ${getEmploymentType(vacancy.data?.vacancy?.employmentType)}`}</p>
                                <p>{`График работы: ${getScheduleType(vacancy.data?.vacancy?.schedule)}`}</p>
                            </div>
                            <div className={classes.searchCity}>{vacancy.data?.vacancy?.city}</div>
                            <div className={classes.btn_box}>
                                <button className={classes.btn_tall} onClick={() => dispatch(visibleResponseModal())}>
                                    Откликнуться
                                </button>
                                <button className={classes.btn} onClick={() => setIsLiked((prev) => !prev)}>
                                    <span>
                                        {isLiked ? <FullLikeIcon /> : <LikeIcon />}
                                    </span>
                                </button>
                                <button className={classes.btn}>
                                    <span>
                                        <DownloadIcon />
                                    </span>
                                </button>
                            </div>
                        </div>
                        <div className={classes.vacancy_content}>
                            <div className={classes.content_item}>
                                <h2>{vacancy.data?.vacancy?.specialization}</h2>
                                <pre>{vacancy.data?.vacancy?.description}</pre>
                            </div>
                            {(vacancy.data?.vacancy?.keySkills.length > 0 || vacancy.data?.vacancy?.languages.length > 0) &&
                                <div className={classes.content_item}>
                                    <h2>Ключевые навыки</h2>
                                    <div className={classes.skills_container}>
                                        {vacancy.data?.vacancy?.keySkills.map((skill: any) => (
                                            <div className={classes.skills_item} key={skill.id}>
                                                {skill.name}
                                            </div>
                                        ))}
                                        {vacancy.data?.vacancy?.languages.map((language: any) => (
                                            <div className={classes.skills_item} key={language.id}>
                                                {`${language.name} - ${getLanguageLevelText(language.level)}`}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            }
                            {vacancy.data?.vacancy?.licenseCategories.length > 0 &&
                                <div className={classes.content_item}>
                                    <h2>Категории прав</h2>
                                    <div className={classes.skills_container}>
                                        {vacancy.data?.vacancy?.licenseCategories.map((skill: any) => (
                                            <div className={classes.license_item} key={skill.id}>
                                                {skill.code}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            }
                            {vacancy.data?.vacancy?.isVisibleContacts &&
                                <div className={classes.content_item}>
                                    <h2>Контактная информация</h2>
                                    <div className={classes.contact}>
                                        <div className={classes.label}>Почта</div>
                                        <div className={classes.contact_info}>
                                            <a href={`mailto:${vacancy.data?.vacancy?.employer?.email}`}>
                                                {vacancy.data?.vacancy?.employer?.email}
                                            </a>
                                        </div>
                                    </div>
                                    {vacancy.data?.vacancy?.employer?.info?.phoneNumber && <div className={classes.contact}>
                                        <div className={classes.label}>Телефон</div>
                                        <div className={classes.contact_info}>{vacancy.data?.vacancy?.employer?.info?.phoneNumber}</div>
                                    </div>}
                                    {vacancy.data?.vacancy?.employer?.info?.socials.length > 0 && <div className={classes.contact}>
                                        <div className={classes.label}>Социальные сети</div>
                                        <div className={classes.contact_info}>{vacancy.data?.vacancy?.employer?.info?.socials.filter((social: any) => social.type !== 'official').map((social: any) =>
                                            <a href={social.url} title={social.type} key={social.id}>
                                                <Icon type={social.type} />
                                            </a>
                                        )}</div>
                                    </div>}
                                </div>
                            }
                            {vacancy.data?.vacancy?.address &&
                                <div className={classes.content_item}>
                                    <h2>Адрес</h2>
                                    <div className={classes.address}>
                                        <div className={classes.map_header}>
                                            <span>{[
                                                vacancy.data?.vacancy?.address?.country,
                                                vacancy.data?.vacancy?.address?.state,
                                                vacancy.data?.vacancy?.address?.city,
                                                vacancy.data?.vacancy?.address?.street,
                                                vacancy.data?.vacancy?.address?.houseNumber,
                                            ].filter(part => part.trim() !== '').join(', ')}</span>
                                        </div>
                                        <div className={classes.map_container}>
                                            <LocationMap coordinates={vacancy.data?.vacancy?.address?.pos
                                                .split(" ")
                                                .map(Number)
                                                .filter((n: any) => !isNaN(n))
                                                .reverse()
                                            } />
                                        </div>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                    <div className={classes.company_info}>
                        {vacancy?.data?.vacancy?.employer?.info?.logoUrl !== '' && <>
                            <div className={classes.company_logo}>
                                <img src={`http://localhost:5000${vacancy?.data?.vacancy?.employer?.info?.logoUrl}`} alt="Logo" />
                            </div>
                            <a href={`/company/${vacancy?.data?.vacancy?.employer?.id}`}>{vacancy?.data?.vacancy?.employer?.info?.companyName || `${vacancy?.data?.vacancy?.employer?.name} ${vacancy?.data?.vacancy?.employer?.surname}`}</a>
                            <p className={classes.address}>
                                {[
                                    vacancy.data?.vacancy?.employer?.info?.address?.country,
                                    vacancy.data?.vacancy?.employer?.info?.address?.state,
                                    vacancy.data?.vacancy?.employer?.info?.address?.city,
                                    vacancy.data?.vacancy?.employer?.info?.address?.street,
                                    vacancy.data?.vacancy?.employer?.info?.address?.houseNumber,
                                ].filter((part: string | null | undefined) => part && part.trim() !== '').join(', ')}
                            </p>
                        </>}
                    </div>
                </div>
            }
        </>
    )
}

export default VacancyContent;