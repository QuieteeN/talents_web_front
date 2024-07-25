import React, { useEffect, useState } from "react";
import { useGetEmployerProfileQuery } from "../../../app/services/profileApi";
import { useNavigate } from "react-router-dom";
import ReactLoading from "react-loading";
import { ReactComponent as TelegramIcon } from './../../../images/telegram.svg';
import { ReactComponent as VkIcon } from './../../../images/vk.svg';
import { ReactComponent as OdnoklasnikiIcon } from './../../../images/odnoklasniki.svg';
import { ReactComponent as YoutubeIcon } from './../../../images/youtube.svg'

import classes from './style.module.scss'
import LocationMap from "../../map/LocationMap";

const Socials: any = {
    official: "Официальный сайт",
    telegram: "Telegram",
    vk: "ВКонтакте",
    ok: "Одноклассники",
    youtube: "YouTube",
}

const ProfileContent: React.FC = () => {
    const [companyData, setCompanyData] = useState<any | null>(null);
    const getEmployerProfile = useGetEmployerProfileQuery();
    const navigate = useNavigate();
    console.log(getEmployerProfile);


    useEffect(() => {
        if ('data' in getEmployerProfile) {
            setCompanyData(getEmployerProfile.data);
        }
    }, [getEmployerProfile])

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

    return (
        <div className={classes.company_content}>
            {getEmployerProfile.isLoading ? <ReactLoading type='spinningBubbles' color='#3B26B6' height={'20%'} width={'20%'} /> : <>
                <div className={classes.company_header}>
                    <span className={classes.top}>Работодатель</span>
                    <h2>{companyData?.employer?.info?.companyName || `${companyData?.employer?.name} ${companyData?.employer?.surname}`}
                        <span className={classes.span_modify} onClick={() => navigate('./../modify')}>Ред.</span>
                    </h2>
                </div>
                <div className={classes.company_description}>
                    <pre>{companyData?.employer?.info?.companyDescription || `Расскажите о себе — кандидаты больше доверяют вакансиям с заполненными страницами компаний`}</pre>
                    {companyData?.employer?.info?.companyDescription ? <></> : <button onClick={() => navigate(`./../modify`)}>Добавить описание</button>}
                </div>
                <div className={classes.data}>
                    <h3>Контактные данные</h3>
                    <div className={classes.data_item}>
                        <span className={classes.label}>Почта</span>
                        <span className={classes.data_content}>{companyData?.employer?.email}</span>
                    </div>
                    {companyData?.employer?.info?.phoneNumber && <div className={classes.data_item}>
                        <span className={classes.label}>Номер телефона</span>
                        <span className={classes.data_content}>{companyData?.employer?.info?.phoneNumber}</span>
                    </div>}
                    {companyData?.employer?.info?.socials.find((social: any) => social.type === 'official') && <>
                        <div className={classes.data_item}>
                            <span className={classes.label}>Cайт компании</span>
                            <span className={classes.data_content}>
                                <a href={companyData?.employer?.info?.socials.find((social: any) => social.type === 'official').url} className={classes.official}>
                                    {Socials[companyData?.employer?.info?.socials.find((social: any) => social.type === 'official').type]}
                                </a>
                            </span>
                        </div>
                    </>}
                    {companyData?.employer?.info?.socials.filter((social: any) => social.type !== 'official') && <>
                        <div className={classes.data_item}>
                            <span className={classes.label}>Социальные сети</span>
                            <span className={`${classes.data_content} ${classes.socials_content}`}>
                                {companyData?.employer?.info?.socials.filter((social: any) => social.type !== 'official').map((social: any) =>
                                    <a href={social.url} title={social.type} key={social.id}>
                                        <Icon type={social.type} />
                                    </a>
                                )}
                            </span>
                        </div>
                    </>}

                </div>
                {companyData?.employer?.info?.address && <div className={classes.data}>
                    <h3>Адрес</h3>
                    <div className={classes.address}>
                        <div className={classes.map_header}>
                            <span>{[
                                companyData?.employer?.info?.address?.country,
                                companyData?.employer?.info?.address?.state,
                                companyData?.employer?.info?.address?.city,
                                companyData?.employer?.info?.address?.street,
                                companyData?.employer?.info?.address?.houseNumber,
                            ].filter(part => part.trim() !== '').join(', ')}</span>
                        </div>
                        <div className={classes.map_container}>
                            <LocationMap coordinates={companyData?.employer?.info?.address?.pos
                                .split(" ")
                                .map(Number)
                                .filter((n: any) => !isNaN(n))
                                .reverse()
                            } />
                        </div>
                    </div>
                </div>}
            </>}
        </div>
    )
}

export default ProfileContent;