import React from "react";
import { Params, useNavigate, useParams } from "react-router-dom";
import classes from './style.module.scss'
import { useLogoutMutation } from "../../../app/services/authApi";
import { useDispatch } from "react-redux";
import { afterLogOut } from "../../../app/futures/authInfoSlice";
import { ModalTypes, changeInfo } from "../../../app/futures/user/modalSlice";

const ProfileHeader: React.FC = () => {
    const navigate = useNavigate();
    const params: Readonly<Params<string>> = useParams()

    const [logout] = useLogoutMutation();

    const dispatch = useDispatch();

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
        <div className={classes.profile_header}>
            <h2>Профиль</h2>
            <nav className={classes.navigation}>
                <span className={`${classes.nav_item} ${params.type === 'info' ? classes.active : ''}`} onClick={() => navigate('./../info')}>Личные данные</span>
                <span className={`${classes.nav_item} ${params.type === 'modify' ? classes.active : ''}`} onClick={() => navigate('./../modify')}>Редактировать</span>
                <span className={`${classes.nav_item} ${params.type === 'security' ? classes.active : ''}`} onClick={() => navigate('./../security')}>Безопасность</span>
                <span className={`${classes.nav_item} ${classes.logout}`} onClick={handleLogout}>Выйти</span>
            </nav>
        </div>
    )
}

export default ProfileHeader;