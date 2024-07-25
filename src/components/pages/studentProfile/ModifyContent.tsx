import React, { useEffect, useState } from "react";
import { useUpdateAddressInfoMutation, useUpdateContactInfoMutation, useUpdateMainInfoMutation, useUpdateSocialsMutation } from "../../../app/services/studentInfoApi";
import { useGetStudentProfileQuery } from "../../../app/services/profileApi";
import { useDispatch } from "react-redux";

import classes from './style.module.scss'
import { ModalTypes, changeInfo } from "../../../app/futures/user/modalSlice";
import { validateEmail } from "../../../validateUtils";
import { geocode } from "../../../utils";

const Socials: any = {
    official: "Официальный сайт",
    telegram: "Telegram",
    vk: "ВКонтакте",
    ok: "Одноклассники",
    youtube: "YouTube",
}

interface Social {
    type: string;
    link: string;
}

const ModifyContent: React.FC = () => {
    const [name, setName] = useState<string>('');
    const [surname, setSurname] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [country, setCountry] = useState<string>('');
    const [state, setState] = useState<string>('');
    const [city, setCity] = useState<string>('');
    const [street, setStreet] = useState<string>('');
    const [houseNumber, setHouseNumber] = useState<string>('');

    const [updateMainInfo] = useUpdateMainInfoMutation();
    const [updateContactInfo] = useUpdateContactInfoMutation();
    const [updateAddressInfo] = useUpdateAddressInfoMutation();
    const [updateSocials] = useUpdateSocialsMutation();

    const getProfile = useGetStudentProfileQuery();

    const [socials, setSocials] = useState<Social[]>([
        { type: 'official', link: '' },
        { type: 'telegram', link: '' },
        { type: 'vk', link: '' },
        { type: 'ok', link: '' },
        { type: 'youtube', link: '' }
    ]);

    const dispatch = useDispatch();

    useEffect(() => {
        if ('data' in getProfile) {
            setName(getProfile.data?.student?.name);
            setSurname(getProfile.data?.student?.surname);
            setEmail(getProfile.data?.student?.email);
            setPhone(getProfile.data?.student?.info?.phoneNumber || '');
            setCountry(getProfile.data?.student?.info?.address?.country || '');
            setState(getProfile.data?.student?.info?.address?.state || '');
            setCity(getProfile.data?.student?.info?.address?.city || '');
            setStreet(getProfile.data?.student?.info?.address?.street || '');
            setHouseNumber(getProfile.data?.student?.info?.address?.houseNumber || '');
            setSocials((prevSocials) =>
                prevSocials.map((social) => {
                    const existingSocial = getProfile.data?.student?.info?.socials?.find((s: any) => s.type === social.type);
                    return existingSocial ? { ...social, link: existingSocial.url } : social;
                })
            );
        }
    }, [getProfile]);

    const handleInputChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
        const newSocials = [...socials];
        newSocials[index].link = event.target.value;
        setSocials(newSocials);
    };

    const handleSubmitMainInfo = async () => {
        try {
            const res = await updateMainInfo({ name, surname }).unwrap();
            dispatch(changeInfo({ type: ModalTypes.SUCCESS, message: res.message }))
        } catch (error: any) {
            if ('data' in error) {
                dispatch(changeInfo({ type: ModalTypes.ERROR, message: error?.data?.message }));
            }
            console.error('Error updating company info:', error);
        }
    }

    const handleClearMainInfo = () => {
        if ('data' in getProfile) {
            setName(getProfile?.data?.student?.name);
            setSurname(getProfile?.data?.student?.surname);
        }
    }

    const handleSubmitContactInfo = async () => {
        try {
            if (!validateEmail(email)) {
                dispatch(changeInfo({ type: ModalTypes.ERROR, message: 'Некорректный email' }));
                return;
            }
            const res = await updateContactInfo({ email, phoneNumber: phone }).unwrap();
            console.log(phone)
            dispatch(changeInfo({ type: ModalTypes.SUCCESS, message: res.message }))
            console.log(res)
        } catch (error: any) {
            if ('data' in error) {
                dispatch(changeInfo({ type: ModalTypes.ERROR, message: error?.data?.message }));
            }
            console.error('Error updating company info:', error);
        }
    }

    const handleClearContactInfo = () => {
        if ('data' in getProfile) {
            setEmail(getProfile?.data?.student?.email);
            setPhone(getProfile?.data?.student?.info?.phoneNumber || '');
        }
    }

    const handleSubmitAddressInfo = async () => {
        const addressParts = [
            country,
            state,
            city,
            street,
            houseNumber,
        ].filter(part => part.trim() !== '').join(', ');
        const pos = await geocode(addressParts);
        console.log(pos);

        try {
            const res = await updateAddressInfo({
                country,
                state,
                city,
                street,
                houseNumber,
                pos
            }).unwrap();
            dispatch(changeInfo({ type: ModalTypes.SUCCESS, message: res.message }))
        } catch (error: any) {
            if ('data' in error) {
                dispatch(changeInfo({ type: ModalTypes.ERROR, message: error?.data?.message }));
            }
            console.error('Error updating profile:', error);
        }
    }

    const handleClearAddressInfo = () => {
        if ('data' in getProfile) {
            setCountry(getProfile?.data?.student?.info?.address?.country || '');
            setState(getProfile?.data?.student?.info?.address?.state || '');
            setCity(getProfile?.data?.student?.info?.address?.city || '');
            setStreet(getProfile?.data?.student?.info?.address?.street || '');
            setHouseNumber(getProfile?.data?.student?.info?.address?.houseNumber || '');
        }
    }

    const handleSubmitSocials = async () => {

        const filteredSocials = socials.filter(social => social.link !== '');

        try {
            const res = await updateSocials({ socials: filteredSocials }).unwrap();
            dispatch(changeInfo({ type: ModalTypes.SUCCESS, message: res.message }))
        } catch (error: any) {
            if ('data' in error) {
                dispatch(changeInfo({ type: ModalTypes.ERROR, message: error?.data?.message }));
            }
            console.error('Failed to update socials:', error);
        }
    };

    const handleClearSocials = () => {
        if ('data' in getProfile) {
            setSocials((prevSocials) =>
                prevSocials.map((social) => {
                    const existingSocial = getProfile.data?.student?.info?.socials?.find((s: any) => s.type === social.type);
                    return existingSocial ? { ...social, link: existingSocial.url } : { ...social, link: '' };
                })
            );
        }
    }

    return (
        <div className={classes.modify_content}>
            <div className={classes.modify_item}>
                <div className={classes.input_box}>
                    <div className={classes.label}>
                        <label htmlFor="name">Имя</label>
                    </div>
                    <div className={classes.input_info}>
                        <input type="text" id="name" value={name} onChange={(e: any) => setName(e.target.value)} autoComplete="off" />
                    </div>
                </div>
                <div className={classes.input_box}>
                    <div className={classes.label}>
                        <label htmlFor="surname">Фамилия</label>
                    </div>
                    <div className={classes.input_info}>
                        <input type="text" id="surname" value={surname} onChange={(e: any) => setSurname(e.target.value)} autoComplete="off" />
                    </div>
                </div>
                <div className={classes.btn_box}>
                    <button onClick={handleSubmitMainInfo}>Сохранить</button>
                    <button onClick={handleClearMainInfo}>Отменить</button>
                </div>
            </div>

            <div className={classes.modify_item}>
                <div className={classes.input_box}>
                    <div className={classes.label}>
                        <label htmlFor="email">Почта</label>
                    </div>
                    <div className={classes.input_info}>
                        <input type="email" id="email" value={email} onChange={(e: any) => setEmail(e.target.value)} autoComplete="off" />
                    </div>
                </div>
                <div className={classes.input_box}>
                    <div className={classes.label}>
                        <label htmlFor="phone">Номер телефона</label>
                    </div>
                    <div className={classes.input_info}>
                        <input type="text" id="phone" value={phone} onChange={(e: any) => setPhone(e.target.value)} autoComplete="off" />
                    </div>
                </div>
                <div className={classes.btn_box}>
                    <button onClick={handleSubmitContactInfo}>Сохранить</button>
                    <button onClick={handleClearContactInfo}>Отменить</button>
                </div>
            </div>
            <div className={classes.modify_item}>
                <div className={classes.input_box}>
                    <div className={classes.label}>
                        <label htmlFor="country">Страна</label>
                    </div>
                    <div className={classes.input_info}>
                        <input type="text" id="country" value={country} onChange={(e: any) => setCountry(e.target.value)} autoComplete="off" />
                    </div>
                </div>
                <div className={classes.input_box}>
                    <div className={classes.label}>
                        <label htmlFor="state">Регион</label>
                    </div>
                    <div className={classes.input_info}>
                        <input type="text" id="state" value={state} onChange={(e: any) => setState(e.target.value)} autoComplete="off" />
                    </div>
                </div>
                <div className={classes.input_box}>
                    <div className={classes.label}>
                        <label htmlFor="city">Город</label>
                    </div>
                    <div className={classes.input_info}>
                        <input type="text" id="city" value={city} onChange={(e: any) => setCity(e.target.value)} autoComplete="off" />
                    </div>
                </div>
                <div className={classes.input_box}>
                    <div className={classes.label}>
                        <label htmlFor="street">Улица</label>
                    </div>
                    <div className={classes.input_info}>
                        <input type="text" id="street" value={street} onChange={(e: any) => setStreet(e.target.value)} autoComplete="off" />
                    </div>
                </div>
                <div className={classes.input_box}>
                    <div className={classes.label}>
                        <label htmlFor="houseNumber">Номер дома</label>
                    </div>
                    <div className={classes.input_info}>
                        <input type="text" id="houseNumber" value={houseNumber} onChange={(e: any) => setHouseNumber(e.target.value)} autoComplete="off" />
                    </div>
                </div>
                <div className={classes.btn_box}>
                    <button onClick={handleSubmitAddressInfo}>Сохранить</button>
                    <button onClick={handleClearAddressInfo}>Отменить</button>
                </div>
            </div>
            <div className={classes.modify_item}>
                {socials.map((social, index) => (
                    <div className={classes.input_box} key={social.type}>
                        <div className={classes.label}>
                            <label htmlFor={social.type}>{Socials[social?.type]}</label>
                        </div>
                        <div className={classes.input_info}>
                            <input
                                type="text"
                                id={social.type}
                                value={social.link}
                                onChange={(e) => handleInputChange(index, e)}
                                autoComplete="off"
                            />
                        </div>
                    </div>
                ))}
                <div className={classes.btn_box}>
                    <button onClick={handleSubmitSocials}>Сохранить</button>
                    <button onClick={handleClearSocials}>Отменить</button>
                </div>
            </div>
        </div>
    )
}

export default ModifyContent;
