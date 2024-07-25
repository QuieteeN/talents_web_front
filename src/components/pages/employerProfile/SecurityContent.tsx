import React, { useEffect, useState } from "react";
import { useGetEmployerProfileQuery } from "../../../app/services/profileApi";
import { useChangePasswordMutation } from "../../../app/services/employerInfoApi";
import { useDispatch } from "react-redux";
import { validateChangePassword } from "../../../validateUtils";
import { ModalTypes, changeInfo } from "../../../app/futures/user/modalSlice";

import { ReactComponent as EyeIcon } from './../../../images/eye.svg'
import { ReactComponent as EyeSlahIcon } from './../../../images/eye-slash.svg'

import classes from './style.module.scss'
import ReactLoading from "react-loading";

const SecurityContent: React.FC = () => {
    const [companyData, setCompanyData] = useState<any | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const [isLookOldPassword, setIsLookOldPassword] = useState<boolean>(false);
    const [isLookNewPassword, setIsLookNewPassword] = useState<boolean>(false);

    const getEmployerProfile = useGetEmployerProfileQuery();
    const [changePassword] = useChangePasswordMutation();

    const dispatch = useDispatch();

    console.log(getEmployerProfile);

    useEffect(() => {
        if ('data' in getEmployerProfile) {
            setCompanyData(getEmployerProfile.data);
        }
    }, [getEmployerProfile])

    useEffect(() => {
        setIsLoading(getEmployerProfile.isLoading);
    }, [getEmployerProfile.isLoading]);

    const handleSubmitNewPassword = async () => {
        try {
            const message = validateChangePassword(newPassword);
            if (message !== '') {
                dispatch(changeInfo({ type: ModalTypes.ERROR, message: message }));
                return;
            }
            const res = await changePassword({ oldPassword, newPassword }).unwrap();
            dispatch(changeInfo({ type: ModalTypes.SUCCESS, message: res.message }));
        } catch (error) {
            console.error('Error updating password:', error);
            dispatch(changeInfo({ type: ModalTypes.ERROR, message: 'Error updating password' }));
        }
    }

    const handleClear = () => {
        setOldPassword('');
        setNewPassword('');
    }

    return (
        <div className={classes.redact_content}>
            {isLoading ? <ReactLoading type='spinningBubbles' color='#3B26B6' height={'20%'} width={'20%'} /> : <>
                <div className={classes.redact_header}>
                    <span className={classes.top}>Работодатель</span>
                    <h2>{`${companyData?.employer?.name} ${companyData?.employer?.surname}`}</h2>
                </div>
                <div className={classes.data}>
                    <h3>Изменение пароля</h3>
                    <div className={classes.input_box}>
                        <span className={classes.input}>
                            <input type={isLookOldPassword ? 'text' : 'password'} id="oldPassword" value={oldPassword} onChange={(e: any) => setOldPassword(e.target.value)} />
                            <span className={classes.icon} onClick={() => { setIsLookOldPassword((prev) => !prev) }}>
                                {isLookOldPassword ? <EyeIcon /> : <EyeSlahIcon />}
                            </span>
                        </span>
                        <label htmlFor="oldPassword">Старый пароль</label>
                    </div>
                    <div className={classes.input_box}>
                        <span className={classes.input}>
                            <input type={isLookNewPassword ? 'text' : 'password'} id="newPassword" value={newPassword} onChange={(e: any) => setNewPassword(e.target.value)} />
                            <span className={classes.icon} onClick={() => { setIsLookNewPassword((prev) => !prev) }}>
                                {isLookNewPassword ? <EyeIcon /> : <EyeSlahIcon />}
                            </span>
                        </span>
                        <label htmlFor="newPassword">Новый пароль</label>
                    </div>
                    <div className={classes.buttons_box}>
                        <button onClick={handleSubmitNewPassword}>Изменить</button>
                        <button onClick={handleClear}>Отменить</button>
                    </div>
                </div>
            </>}
        </div>
    )
}

export default SecurityContent;