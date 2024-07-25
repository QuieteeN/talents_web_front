import React, { useState } from "react";
import Header from "../../header/Header";
import classes from "./style.module.scss";
import { Params, useParams } from "react-router-dom";
import ModalMessage from "../../modalMessage/ModalMessage";
import ProfileContent from "./ProfileContent";
import ModifyContent from "./ModifyContent";
import ProfileHeader from "./ProfileHeader";

import { ReactComponent as EyeIcon } from './../../../images/eye.svg';
import { ReactComponent as EyeSlashIcon } from './../../../images/eye-slash.svg';
import { useChangePasswordMutation } from "../../../app/services/studentInfoApi";
import { validateChangePassword } from "../../../validateUtils";
import { useDispatch } from "react-redux";
import { ModalTypes, changeInfo } from "../../../app/futures/user/modalSlice";

const StudentProfile: React.FC = () => {

    const params: Readonly<Params<string>> = useParams()

    const Content: React.FC<{ type: string }> = ({ type }: { type: string }) => {
        switch (type) {
            case 'modify':
                return <ModifyContent />
            case 'security':
                return <SecurityContent />
            default:
                return <ProfileContent />
        }
    }

    const SecurityContent: React.FC = () => {
        const [oldPassword, setOldPassword] = useState<string>('');
        const [newPassword, setNewPassword] = useState<string>('');

        const [isLookOldPassword, setIsLookOldPassword] = useState<boolean>(false);
        const [isLookNewPassword, setIsLookNewPassword] = useState<boolean>(false);

        const [changePassword] = useChangePasswordMutation();

        const dispatch = useDispatch();

        const handleSubmitNewPassword = async () => {
            try {
                const message = validateChangePassword(newPassword);
                if (message !== '') {
                    dispatch(changeInfo({ type: ModalTypes.ERROR, message: message }));
                    return;
                }
                const res = await changePassword({ oldPassword, newPassword }).unwrap();
                dispatch(changeInfo({ type: ModalTypes.SUCCESS, message: res.message }));
            } catch (error: any) {
                if ('data' in error) {
                    dispatch(changeInfo({ type: ModalTypes.ERROR, message: error?.data?.message }));
                }
                console.error('Error updating password:', error);
            }
        }

        const handleClear = () => {
            setOldPassword('');
            setNewPassword('');
        }

        return (
            <div className={classes.modify_content}>
                <div className={classes.modify_item}>
                    <div className={classes.input_box}>
                        <div className={classes.label}>
                            <label htmlFor="oldPassword">Старый пароль</label>
                        </div>
                        <div className={classes.input_info}>
                            <input
                                type={isLookOldPassword ? 'text' : 'password'}
                                id="oldPassword"
                                value={oldPassword}
                                onChange={(e: any) => setOldPassword(e.target.value)}
                                autoComplete="off"
                            />
                            <span className={classes.input_icon} onClick={() => setIsLookOldPassword((prev: boolean) => !prev)}>
                                {isLookOldPassword ? <EyeSlashIcon /> : <EyeIcon />}
                            </span>
                        </div>
                    </div>
                    <div className={classes.input_box}>
                        <div className={classes.label}>
                            <label htmlFor="newPassword">Новый пароль</label>
                        </div>
                        <div className={classes.input_info}>
                            <input
                                type={isLookNewPassword ? 'text' : 'password'}
                                id="newPassword"
                                value={newPassword}
                                onChange={(e: any) => setNewPassword(e.target.value)}
                                autoComplete="off"
                            />
                            <span className={classes.input_icon} onClick={() => setIsLookNewPassword((prev: boolean) => !prev)}>
                                {isLookNewPassword ? <EyeSlashIcon /> : <EyeIcon />}
                            </span>
                        </div>
                    </div>
                    <div className={classes.btn_box}>
                        <button onClick={handleSubmitNewPassword}>Сохранить</button>
                        <button onClick={handleClear}>Отменить</button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <>
            <Header />
            <main className={classes.content}>
                <div className={classes.container}>
                    <ProfileHeader />
                    <Content type={params.type || ''} />
                </div>
            </main>
            <ModalMessage />
        </>
    )
}

export default StudentProfile;