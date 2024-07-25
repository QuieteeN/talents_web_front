import React, { memo, useRef, useState } from "react";
import classes from './styles.module.scss'
import { ReactComponent as EmailIcon } from '../../../images/email.svg'
import { ReactComponent as EyeIcon } from '../../../images/eye.svg'
import { ReactComponent as EyeSlashIcon } from '../../../images/eye-slash.svg'
import { valideSignInForm } from "../../../validateUtils";
import { useLoginEmployerMutation, useLoginStudentMutation } from "../../../app/services/authApi";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { UserTypes, authInfo } from "../../../app/futures/authInfoSlice";
import ModalMessage from "../../modalMessage/ModalMessage";

const SignIn: React.FC = memo(() => {
    const [showPassword, setShowPassword] = useState(false)
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [isStudent, setIsStudent] = useState<boolean>(true);

    const dispatch = useDispatch();

    const [loginStudent] = useLoginStudentMutation();
    const [loginEmployer] = useLoginEmployerMutation();

    const navigate = useNavigate();

    const errorRef = useRef<HTMLDivElement>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let errorText = valideSignInForm(email, password);

        if (errorText !== '' && errorRef.current) {
            errorRef.current.textContent = errorText;
            errorRef.current.classList.add(classes.show);
            return;
        }

        const data = {
            email,
            password
        }

        try {
            if (isStudent) {
                const res = await loginStudent(data);

                dispatch(authInfo({ type: UserTypes.STUDENT }))

                if ('data' in res) {
                    if (res.data.status === 200) {
                        navigate('/');
                    }
                }
            } else {
                const res = await loginEmployer(data);
                console.log(res);
                dispatch(authInfo({ type: UserTypes.EMPLOYER }))

                if ('data' in res) {
                    if (res.data.status === 200) {
                        navigate('/');
                    }
                }
            }
        } catch (err) {
            console.log(err)
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.name === 'email') {
            setEmail(e.target.value)
        } else if (e.target.name === 'password') {
            setPassword(e.target.value)
        }
        errorRef.current?.classList.remove(classes.show);
    }

    console.log('draw')


    return (
        <>
            <div className={classes.outer}>
                <div className={classes.inner}>
                    <h1>Войти</h1>
                    <div className={classes.userType}>
                        <span
                            className={`${classes.type} ${isStudent ? classes.active : ''}`}
                            onClick={() => setIsStudent(true)}
                        >Студент</span>
                        <span
                            className={`${classes.type} ${isStudent ? '' : classes.active}`}
                            onClick={() => setIsStudent(false)}
                        >Работодатель</span>
                    </div>
                    <div className={classes.divider}>
                        <div className={classes.line}></div>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="email">Почта:</label>
                        <div className={classes.input_box}>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                placeholder="Почта"
                                autoComplete="off"
                                value={email}
                                onChange={(e) => handleChange(e)}
                            />
                            <span className={classes.icon}>
                                <EmailIcon />
                            </span>
                        </div>
                        <label htmlFor="password">Пароль:</label>
                        <div className={classes.input_box}>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                id="password"
                                placeholder="Пароль"
                                autoComplete="off"
                                value={password}
                                onChange={(e) => handleChange(e)}
                            />
                            <span
                                className={classes.icon}
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <EyeIcon /> : <EyeSlashIcon />}
                            </span>
                        </div>
                        <div ref={errorRef} className={classes.error}></div>
                        <button name="SignIn" className={classes.btn}>Войти</button>
                        <div className={classes.links}>
                            <a href="/restore-password">Забыли пароль?</a>
                            <a href="/sign-up">Зарегистрироваться</a>
                        </div>
                    </form>
                </div>
            </div>
            <ModalMessage />
        </>
    )
})

export default SignIn;