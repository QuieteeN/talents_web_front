import React from "react";
import classes from './style.module.scss';
import { useLogoutMutation } from "../../../app/services/authApi";
import { useDispatch } from "react-redux";
import { Params, useNavigate, useParams } from "react-router-dom";
import { ModalTypes, changeInfo } from "../../../app/futures/user/modalSlice";

import { ReactComponent as GearIcon } from './../../../images/gear.svg'
import { ReactComponent as SecurityIcon } from './../../../images/sheildHalfed.svg';
import { ReactComponent as LogoutIcon } from './../../../images/logout.svg';
import { ReactComponent as UserIcon } from './../../../images/userIcon.svg'
import { afterLogOut } from "../../../app/futures/authInfoSlice";

const RedactMenu: React.FC = () => {
    const [logout] = useLogoutMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const params: Readonly<Params<string>> = useParams()

    const handleLogout = async () => {
        try {
            const res = await logout().unwrap();
            navigate('../../../')
            dispatch(afterLogOut())
            dispatch(changeInfo({ type: ModalTypes.SUCCESS, message: res.message }));
        } catch (error) {
            console.error('Error logout:', error);
            dispatch(changeInfo({ type: ModalTypes.ERROR, message: 'Error logout' }));
        }
    }

    return (
        <nav className={classes.right_menu}>
            <div
                className={`${classes.menu_item} ${params.type === 'info' ? classes.active : ''}`}
                onClick={() => { navigate('./../info') }}
            >
                <span className={classes.icon}>
                    <UserIcon />
                </span>
                <span className={classes.text}>
                    Профиль
                </span>
            </div>
            <div
                className={`${classes.menu_item} ${params.type === 'modify' ? classes.active : ''}`}
                onClick={() => { navigate('./../modify') }}
            >
                <span className={classes.icon}>
                    <GearIcon />
                </span>
                <span className={classes.text}>
                    Редактировать
                </span>
            </div>
            <div
                className={`${classes.menu_item} ${params.type === 'security' ? classes.active : ''}`}
                onClick={() => { navigate('./../security') }}
            >
                <span className={classes.icon}>
                    <SecurityIcon />
                </span>
                <span className={classes.text}>
                    Безопасность
                </span>
            </div>
            <div
                className={`${classes.menu_item} ${classes.logout}`}
                onClick={() => { }}
            >
                <span className={classes.icon}>
                    <LogoutIcon />
                </span>
                <span className={classes.text} onClick={handleLogout}>
                    Выйти
                </span>
            </div>
        </nav>
    )
}

export default RedactMenu;