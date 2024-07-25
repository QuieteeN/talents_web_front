import React, { useEffect, useState } from "react";
import classes from "./style.module.scss"
import { ReactComponent as Logo } from '../../images/logo.svg'
import { ReactComponent as LogInIcon } from '../../images/logInIcon.svg'
import { ReactComponent as LogInActionIcon } from '../../images/logInActionIcon.svg'
import { ReactComponent as LikeIcon } from '../../images/likeIcon.svg'
import { ReactComponent as ChatIcon } from '../../images/chatIcon.svg'
import { ReactComponent as UserIcon } from '../../images/userIcon.svg'
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { UserTypes, afterLogOut } from "../../app/futures/authInfoSlice";
import { useGetEmployerProfileQuery, useGetStudentProfileQuery } from "../../app/services/profileApi";

const Header: React.FC = () => {
    const authInfo = useSelector((state: any) => state.authInfo);

    const navigate = useNavigate();

    const CheckStudent: React.FC = () => {

        const { error, isError } = useGetStudentProfileQuery();
        const [url, setUrl] = useState<string>(`/profile/student/info`)
        const dispatch = useDispatch();

        useEffect(() => {
            if (isError) {
                // Проверка типа ошибки или статуса HTTP
                if ('status' in error) {
                    if (error?.status === 401) {
                        // Токен недействителен, перенаправляем на страницу входа
                        setUrl('/sign-in')
                        dispatch(afterLogOut());
                    }
                }
            }
        }, [isError, error, dispatch]);

        return (
            <>
                <button className={classes.tools_item} onClick={() => navigate("/favorite")}>
                    <LikeIcon />
                </button>
                <button className={classes.tools_item} onClick={() => navigate('/student/chat')}>
                    <ChatIcon />
                </button>
                {
                    authInfo.isAuth ?
                        <button className={classes.tools_item} onClick={() => navigate(url)}>
                            <UserIcon />
                        </button>
                        :
                        <button className={classes.tools_item} onClick={() => navigate(url)}>
                            <div className={`${classes.in_elem} ${classes.main}`}>
                                <LogInIcon />
                            </div>
                            <div className={`${classes.in_elem} ${classes.hovered}`}>
                                <LogInActionIcon />
                            </div>
                        </button>
                }
            </>
        )

    }

    const CheckEmployer: React.FC = () => {

        const { error, isError } = useGetEmployerProfileQuery();
        const [url, setUrl] = useState<string>(`/profile/employer/info`)
        const dispatch = useDispatch();

        useEffect(() => {
            if (isError) {
                // Проверка типа ошибки или статуса HTTP
                if ('status' in error) {
                    if (error?.status === 401) {
                        // Токен недействителен, перенаправляем на страницу входа
                        setUrl('/sign-in')
                        dispatch(afterLogOut());
                    }
                }
            }
        }, [isError, error, dispatch]);

        return (
            <>
                <button className={classes.tools_item} onClick={() => navigate("/favorite")}>
                    <LikeIcon />
                </button>
                <button className={classes.tools_item} onClick={() => navigate('/employer/chat')}>
                    <ChatIcon />
                </button>
                {
                    authInfo.isAuth ?
                        <button className={classes.tools_item} onClick={() => navigate(url)}>
                            <UserIcon />
                        </button>
                        :
                        <button className={classes.tools_item} onClick={() => navigate(url)}>
                            <div className={`${classes.in_elem} ${classes.main}`}>
                                <LogInIcon />
                            </div>
                            <div className={`${classes.in_elem} ${classes.hovered}`}>
                                <LogInActionIcon />
                            </div>
                        </button>
                }
            </>
        )

    }

    const Visitor: React.FC = () => {
        const dispatch = useDispatch();

        useEffect(() => {
            dispatch(afterLogOut());
        }, [dispatch]);

        return (
            <>
                <button className={classes.tools_item} onClick={() => navigate('/sign-in')}>
                    <LikeIcon />
                </button>
                <button className={classes.tools_item} onClick={() => navigate('/sign-in')}>
                    <ChatIcon />
                </button>
                <button className={classes.tools_item} onClick={() => navigate('/sign-in')}>
                    <div className={`${classes.in_elem} ${classes.main}`}>
                        <LogInIcon />
                    </div>
                    <div className={`${classes.in_elem} ${classes.hovered}`}>
                        <LogInActionIcon />
                    </div>
                </button>
            </>
        )

    }

    const Content: React.FC<{ type: string }> = ({ type }) => {
        switch (type) {
            case 'employer':
                return <CheckEmployer />
            case 'student':
                return <CheckStudent />
            default:
                return <Visitor />
        }
    }

    const HeaderNavigate: React.FC = () => {

        const navigate = useNavigate();

        switch (authInfo.type) {
            case UserTypes.EMPLOYER:
                return (
                    <div className={classes.sections_wrapper}>
                        <span className={classes.header_item} onClick={() => navigate(`/employer/vacancies/all`)} >
                            <span>Мои вакансии</span>
                        </span>
                        <span className={classes.header_item} onClick={() => navigate(`/employer/vacancies/create`)} >
                            <span>Создать вакансию</span>
                        </span>
                        <span className={classes.header_item} onClick={() => navigate(`/cvies`)} >
                            <span>Кандидаты</span>
                        </span>
                    </div>
                )
            case UserTypes.STUDENT:
                return (
                    <div className={classes.sections_wrapper}>
                        <span className={classes.header_item} onClick={() => navigate(`/student/cvies/all`)} >
                            <span>Мои резюме</span>
                        </span>
                        <span className={classes.header_item} onClick={() => navigate(`/student/cvies/create`)} >
                            <span>Создать резюме</span>
                        </span>
                        <span className={classes.header_item} onClick={() => navigate(`/vacancies`)} >
                            <span>Найти работу</span>
                        </span>
                    </div>
                )
            default:
                return (
                    <div className={classes.sections_wrapper}>
                        <span className={classes.header_item} onClick={() => navigate(`/vacancies`)} >
                            <span>Для студента</span>
                        </span>
                        <span className={classes.header_item} onClick={() => navigate(`/cvies`)} >
                            <span>Для работодаля</span>
                        </span>
                    </div>
                )
        }
    }

    return (
        <div className={classes.header_wrapper}>
            <div className={classes.header_flex_wrapper}>
                <div className={classes.navigation_wrapper}>
                    <a className={classes.logo_wrapper} href="/">
                        <Logo />
                    </a>
                    <HeaderNavigate />
                </div>
                <div className={classes.tools_wrapper}>
                    <Content type={authInfo.type} />

                </div>
            </div>
        </div>
    )

}

export default Header
