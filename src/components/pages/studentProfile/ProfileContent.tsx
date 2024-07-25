import React, { useEffect, useState } from "react";
import { useGetStudentProfileQuery } from "../../../app/services/profileApi";
import { useNavigate } from "react-router-dom";
import classes from './style.module.scss'

import { ReactComponent as TelegramIcon } from './../../../images/telegram.svg';
import { ReactComponent as VkIcon } from './../../../images/vk.svg';
import { ReactComponent as OdnoklasnikiIcon } from './../../../images/odnoklasniki.svg';
import { ReactComponent as YoutubeIcon } from './../../../images/youtube.svg'

const ProfileContent: React.FC = () => {
    const [profileData, setProfileData] = useState<any | null>(null);

    const getProfile = useGetStudentProfileQuery();

    const navigate = useNavigate();

    useEffect(() => {
        if ('data' in getProfile) {
            setProfileData(getProfile.data);
        }
    }, [getProfile]);

    console.log(profileData);

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
        <div className={classes.profile_info}>
            <div className={`${classes.info_item} ${classes.first}`}>
                <div className={classes.info_type}>
                    <span>Имя</span>
                </div>
                <div className={classes.info}>{profileData?.student?.name}</div>
                <span className={classes.modify_btn} onClick={() => navigate('./../modify')}>Изменить</span>
            </div>
            <div className={classes.info_item}>
                <div className={classes.info_type}>
                    <span>Фамилия</span>
                </div>
                <div className={classes.info}>{profileData?.student?.surname}</div>
                <span className={classes.modify_btn} onClick={() => navigate('./../modify')}>Изменить</span>
            </div>
            <div className={classes.info_item}>
                <div className={classes.info_type}>
                    <span>Почта</span>
                </div>
                <div className={classes.info}>{profileData?.student?.email}</div>
                <span className={classes.modify_btn} onClick={() => navigate('./../modify')}>Изменить</span>
            </div>
            <div className={classes.info_item}>
                <div className={classes.info_type}>
                    <span>Номер телефона</span>
                </div>
                <div className={classes.info}>{profileData?.student?.info?.phoneNumber || 'Не указан'}</div>
                <span className={classes.modify_btn} onClick={() => navigate('./../modify')}>Изменить</span>
            </div>
            <div className={classes.info_item}>
                <div className={classes.info_type}>
                    <span>Место жительства</span>
                </div>
                <div className={classes.info}>{profileData?.student?.info?.address ? <>
                    {[
                        profileData?.student?.info?.address?.country,
                        profileData?.student?.info?.address?.state,
                        profileData?.student?.info?.address?.city,
                        profileData?.student?.info?.address?.street,
                        profileData?.student?.info?.address?.houseNumber,
                    ].filter(part => part.trim() !== '').join(', ')}
                </> : <>
                    Не указан
                </>}</div>
                <span className={classes.modify_btn}>Изменить</span>
            </div>
            <div className={classes.info_item}>
                <div className={classes.info_type}>
                    <span>Социальные сети</span>
                </div>
                <div className={classes.info}>{
                    profileData?.student?.info?.socials.length > 0 ? <>
                        {profileData?.student?.info?.socials.map((social: any) =>
                            <a key={social.id} href={social.url} title={social.type} target="_blank" rel="noreferrer">
                                <Icon type={social.type} />
                            </a>
                        )}
                    </> : <>
                        Не указаны
                    </>
                }</div>
                <span className={classes.modify_btn}>Изменить</span>
            </div>
        </div>
    )
}

export default ProfileContent;