import React, { useEffect, useState } from "react";
import { useGetEmployerProfileQuery } from "../../../app/services/profileApi";
import { useUpdateAddressInfoMutation, useUpdateContactInfoMutation, useUpdateMainInfoMutation, useUpdateSocialsMutation } from "../../../app/services/employerInfoApi";
import ReactLoading from "react-loading";
import classes from './style.module.scss'
import { useDispatch } from "react-redux";
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

const RedactContent: React.FC = () => {
    const [companyData, setCompanyData] = useState<any>({});
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const getEmployerProfile = useGetEmployerProfileQuery();
    const [updateMainInfo] = useUpdateMainInfoMutation();
    const [updateContactInfo] = useUpdateContactInfoMutation();
    const [updateSocials] = useUpdateSocialsMutation();
    const [updateAddressInfo] = useUpdateAddressInfoMutation();

    const [companyName, setCompanyName] = useState<string>('');
    const [companyDescription, setCompanyDescription] = useState<string>('');

    const [name, setName] = useState<string>('');
    const [surname, setSurname] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [phone, setPhone] = useState<string>('');

    const [socials, setSocials] = useState<Social[]>([
        { type: 'official', link: '' },
        { type: 'telegram', link: '' },
        { type: 'vk', link: '' },
        { type: 'ok', link: '' },
        { type: 'youtube', link: '' }
    ]);

    const [country, setCountry] = useState('');
    const [state, setState] = useState('');
    const [city, setCity] = useState('');
    const [street, setStreet] = useState('');
    const [houseNumber, setHouseNumber] = useState('');

    const dispatch = useDispatch();

    console.log(getEmployerProfile);

    useEffect(() => {
        if ('data' in getEmployerProfile) {
            setCompanyName(getEmployerProfile.data?.employer?.info?.companyName || '');
            setCompanyDescription(getEmployerProfile.data?.employer?.info?.companyDescription || '');
            setCompanyData(getEmployerProfile.data);
            setName(getEmployerProfile.data?.employer?.name);
            setSurname(getEmployerProfile.data?.employer?.surname);
            setEmail(getEmployerProfile.data?.employer?.email);
            setPhone(getEmployerProfile.data?.employer?.info?.phone || '');
            setCountry(companyData?.employer?.info?.address?.country);
            setState(companyData?.employer?.info?.address?.state);
            setCity(companyData?.employer?.info?.address?.city);
            setStreet(companyData?.employer?.info?.address?.street);
            setHouseNumber(companyData?.employer?.info?.address?.houseNumber);
        }
    }, [companyData?.employer?.info?.address?.city, companyData?.employer?.info?.address?.country, companyData?.employer?.info?.address?.houseNumber, companyData?.employer?.info?.address?.state, companyData?.employer?.info?.address?.street, getEmployerProfile])

    useEffect(() => {
        setIsLoading(getEmployerProfile.isLoading);
    }, [getEmployerProfile.isLoading]);

    useEffect(() => {
        if ('data' in getEmployerProfile) {
            setSocials((prevSocials) =>
                prevSocials.map((social) => {
                    const existingSocial = getEmployerProfile.data?.employer?.info?.socials?.find((s: any) => s.type === social.type);
                    return existingSocial ? { ...social, link: existingSocial.url } : social;
                })
            );
        }
    }, [getEmployerProfile]);

    const handleInputChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
        const newSocials = [...socials];
        newSocials[index].link = event.target.value;
        setSocials(newSocials);
    };

    const handleSubmitMainInfo = async () => {
        try {
            const res = await updateMainInfo({ companyName, companyDescription }).unwrap();
            dispatch(changeInfo({ type: ModalTypes.SUCCESS, message: res.message }))
        } catch (error) {
            dispatch(changeInfo({ type: ModalTypes.ERROR, message: 'Error updating company info' }));
            console.error('Error updating company info:', error);
        }
    }

    const handleClearMainInfo = () => {
        if ('data' in getEmployerProfile) {
            setCompanyName(getEmployerProfile.data?.employer?.info?.companyName || '');
            setCompanyDescription(getEmployerProfile.data?.employer?.info?.companyDescription || '');
        }
    }

    const handleSubmitContactInfo = async () => {
        try {
            if (!validateEmail(email)) {
                dispatch(changeInfo({ type: ModalTypes.ERROR, message: 'Некорректная почта' }));
                return;
            }
            const res = await updateContactInfo({ name, surname, email, phone }).unwrap();
            dispatch(changeInfo({ type: ModalTypes.SUCCESS, message: res.message }))
        } catch (error) {
            dispatch(changeInfo({ type: ModalTypes.ERROR, message: 'Error updating contact info' }));
            console.error('Error updating profile:', error);
        }
    }

    const handleClearContactInfo = () => {
        if ('data' in getEmployerProfile) {
            setName(getEmployerProfile.data?.employer?.name);
            setSurname(getEmployerProfile.data?.employer?.surname);
            setEmail(getEmployerProfile.data?.employer?.email);
            setPhone(getEmployerProfile.data?.employer?.info?.phone || '');
        }
    }

    const handleSubmitSocials = async () => {

        const filteredSocials = socials.filter(social => social.link !== '');

        try {
            const res = await updateSocials({ socials: filteredSocials }).unwrap();
            dispatch(changeInfo({ type: ModalTypes.SUCCESS, message: res.message }))
        } catch (error) {
            console.error('Failed to update socials:', error);
            dispatch(changeInfo({ type: ModalTypes.ERROR, message: 'Error updating socials' }));
        }
    };

    const handleClearSocials = () => {
        if ('data' in getEmployerProfile) {
            setSocials((prevSocials) =>
                prevSocials.map((social) => {
                    const existingSocial = getEmployerProfile.data?.employer?.info?.socials?.find((s: any) => s.type === social.type);
                    return existingSocial ? { ...social, link: existingSocial.url } : { ...social, link: '' };
                })
            );
        }
    }

    const handleSubmitAddress = async () => {
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
        } catch (error) {
            dispatch(changeInfo({ type: ModalTypes.ERROR, message: 'Error updating address info' }));
            console.error('Error updating profile:', error);
        }
    }

    return (
        <div className={classes.redact_content}>
            {isLoading ? <ReactLoading type='spinningBubbles' color='#3B26B6' height={'20%'} width={'20%'} /> : <>
                <div className={classes.redact_header}>
                    <span className={classes.top}>Работодатель</span>
                    <h2>{`${companyData?.employer?.name} ${companyData?.employer?.surname}`}</h2>
                </div>
                <div className={classes.data}>
                    <h3>Основная информация</h3>
                    <div className={classes.input_box}>
                        <input type="text" id="companyName" value={companyName} onChange={(e: any) => setCompanyName(e.target.value)} autoComplete="off" />
                        <label htmlFor="companyName">Название компании</label>
                    </div>
                    <div className={classes.textarea_box}>
                        <textarea name="description" id="description" value={companyDescription} onChange={(e: any) => setCompanyDescription(e.target.value)}></textarea>
                        <label htmlFor="description">Описание компании</label>
                    </div>
                    <div className={classes.buttons_box}>
                        <button onClick={handleSubmitMainInfo}>Сохранить</button>
                        <button onClick={handleClearMainInfo}>Отменить</button>
                    </div>
                </div>
                <div className={classes.data}>
                    <h3>Контактная информация</h3>
                    <div className={classes.input_box}>
                        <input type="text" id="name" value={name} onChange={(e: any) => setName(e.target.value)} autoComplete="off" />
                        <label htmlFor="name" >Имя</label>
                    </div>
                    <div className={classes.input_box}>
                        <input type="text" id="surname" value={surname} onChange={(e: any) => setSurname(e.target.value)} autoComplete="off" />
                        <label htmlFor="surname">Фамилия</label>
                    </div>
                    <div className={classes.input_box}>
                        <input type="email" id="email" value={email} onChange={(e: any) => setEmail(e.target.value)} autoComplete="off" />
                        <label htmlFor="email">Почта</label>
                    </div>
                    <div className={classes.input_box}>
                        <input type="text" id="phone" value={phone} onChange={(e: any) => setPhone(e.target.value)} autoComplete="off" />
                        <label htmlFor="phone">Номер телефон</label>
                    </div>
                    <div className={classes.buttons_box}>
                        <button onClick={handleSubmitContactInfo}>Сохранить</button>
                        <button onClick={handleClearContactInfo}>Отменить</button>
                    </div>
                </div>
                <div className={classes.data}>
                    <h3>Социальные сети</h3>
                    {socials.map((social, index) => (
                        <div className={classes.input_box} key={social.type}>
                            <input
                                type="text"
                                id={social.type}
                                value={social.link}
                                onChange={(e) => handleInputChange(index, e)}
                                autoComplete="off"
                            />
                            <label htmlFor={social.type}>{Socials[social?.type]}</label>
                        </div>
                    ))}
                    <div className={classes.buttons_box}>
                        <button onClick={handleSubmitSocials}>Сохранить</button>
                        <button onClick={handleClearSocials}>Отменить</button>
                    </div>
                </div>
                <div className={classes.data}>
                    <h3>Адрес</h3>
                    <div className={classes.input_box}>
                        <input type="text" id="country" value={country} onChange={(e: any) => setCountry(e.target.value)} autoComplete="off" />
                        <label htmlFor="country">Страна</label>
                    </div>
                    <div className={classes.input_box}>
                        <input type="text" id="state" value={state} onChange={(e: any) => setState(e.target.value)} autoComplete="off" />
                        <label htmlFor="state">Регион</label>
                    </div>
                    <div className={classes.input_box}>
                        <input type="text" id="city" value={city} onChange={(e: any) => setCity(e.target.value)} autoComplete="off" />
                        <label htmlFor="city">Город</label>
                    </div>
                    <div className={classes.input_box}>
                        <input type="text" id="street" value={street} onChange={(e: any) => setStreet(e.target.value)} autoComplete="off" />
                        <label htmlFor="street">Улица</label>
                    </div>
                    <div className={classes.input_box}>
                        <input type="text" id="houseNumber" value={houseNumber} onChange={(e: any) => setHouseNumber(e.target.value)} autoComplete="off" />
                        <label htmlFor="houseNumber">Номер дома</label>
                    </div>
                    <div className={classes.buttons_box}>
                        <button onClick={handleSubmitAddress}>Сохранить</button>
                        <button >Отменить</button>
                    </div>
                </div>
            </>}
        </div>
    )
}

export default RedactContent;