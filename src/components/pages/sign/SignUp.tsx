import React, { useRef, useState } from "react";
import classes from './styles.module.scss'
import {ReactComponent as EmailIcon} from '../../../images/email.svg'
import {ReactComponent as EyeIcon} from '../../../images/eye.svg'
import {ReactComponent as EyeSlashIcon} from '../../../images/eye-slash.svg'
import { valideSignUpForm } from "../../../validateUtils";
import { useSignUpEmployerMutation, useSignUpStudentMutation } from "../../../app/services/authApi";
import { useNavigate } from "react-router-dom";

const SignUp: React.FC = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [name, setName] = useState<string>('');
    const [surname, setSurname] = useState<string>('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isStudent, setIsStudent] = useState<boolean>(true);

    const [signUpStudent] = useSignUpStudentMutation();
    const [signUpEmployer] = useSignUpEmployerMutation();

    const errorRef = useRef<HTMLDivElement>(null);

    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        switch (name) {
            case 'name':
                setName(value);
                break;
            case'surname':
                setSurname(value);
                break;
            case 'email':
                setEmail(value);
                break;
            case 'password':
                setPassword(value);
                break;
            case 'confirmPassword':
                setConfirmPassword(value);
                break;
            default:
                break;
        }
        errorRef.current?.classList.remove(classes.show);
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const text = valideSignUpForm(email, password, confirmPassword);

        if (text !== '' && errorRef.current) {
            errorRef.current.textContent = text;
            errorRef.current.classList.add(classes.show);
            return;
        }

        const data = {
            name,
            surname,
            email,
            password,
        }

        try {
            if (isStudent) {
                const res = await signUpStudent(data);
                console.log(res);

                if ('data' in res) {
                    if (res.data.status === 201) {
                        navigate('/sign-in')
                    }
                }
            } else {
                const res = await signUpEmployer(data);
                console.log(res);

                if ('data' in res) {
                    if (res.data.status === 201) {
                        navigate('/sign-in')
                    }
                }
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className={classes.outer}>
            <div className={classes.inner}>
                <h1>Регистрация</h1>
                <div className={classes.userType}>
                    <span 
                        className={`${classes.type} ${isStudent ? classes.active : ''}`} 
                        onClick={() => setIsStudent(true)}
                    >Студент</span>
                    <span 
                        className={`${classes.type} ${isStudent ? '': classes.active}`} 
                        onClick={() => setIsStudent(false)}
                    >Работодатель</span>
                </div>
                <div className={classes.divider}>
                    <div className={classes.line}></div>
                </div>
                <form onSubmit={handleSubmit} >
                    <label htmlFor="name">Имя:</label>
                    <div className={classes.input_box}>
                        <input 
                            type="text" 
                            name="name" 
                            id="name" 
                            placeholder="Имя" 
                            autoComplete="off"
                            value={name}
                            onChange={handleChange}
                        />
                        <span className={classes.icon}>
                            <EmailIcon />
                        </span>
                    </div>
                    <label htmlFor="surname">Фамилия:</label>
                    <div className={classes.input_box}>
                        <input 
                            type="text" 
                            name="surname" 
                            id="surname" 
                            placeholder="Фамилия" 
                            autoComplete="off"
                            value={surname}
                            onChange={handleChange}
                        />
                        <span className={classes.icon}>
                            <EmailIcon />
                        </span>
                    </div>
                    <label htmlFor="email">Почта:</label>
                    <div className={classes.input_box}>
                        <input 
                            type="email" 
                            name="email" 
                            id="email" 
                            placeholder="Почта" 
                            autoComplete="off"
                            value={email}
                            onChange={handleChange}
                        />
                        <span className={classes.icon}>
                            <EmailIcon />
                        </span>
                    </div>
                    <label htmlFor="password">Пароль:</label>
                    <div className={classes.input_box}>
                        <input 
                            type={showPassword? 'text' : 'password'}  
                            name="password" 
                            id="password" 
                            placeholder="Пароль" 
                            autoComplete="off"
                            value={password}
                            onChange={handleChange}
                        />
                        <span 
                            className={classes.icon}
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword? <EyeIcon /> : <EyeSlashIcon />}
                        </span>
                    </div>
                    <label htmlFor="confirmPassword">Повторите пароль:</label>
                    <div className={classes.input_box}>
                        <input 
                            type={showConfirmPassword? 'text' : 'password'}  
                            name="confirmPassword" 
                            id="confirmPassword" 
                            placeholder="Повторите пароль" 
                            autoComplete="off" 
                            value={confirmPassword}
                            onChange={handleChange}   
                        />
                        <span 
                            className={classes.icon}
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                            {showConfirmPassword ? <EyeIcon /> : <EyeSlashIcon />}
                        </span>
                    </div>
                    <div className={classes.error} ref={errorRef}></div>
                    <button 
                        name="SignIn" 
                        className={classes.btn}
                    >Зарегистрироваться</button>
                    <div className={classes.links}>
                        <a href="/sign-in">Уже есть аккаунт?</a>
                        <a href="/sign-in">Авторизоваться</a>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignUp;