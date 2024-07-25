import { Vacancy } from "./components/types";

export const validateCreateCv = (data: any): string => {
    if (data.name === '') {
        return "Название не должно быть пустым";
    }
    if (data.city === '') {
        return "Город не должен быть пустым";
    }
    if (data.experience === undefined) {
        return "Опыт не должен быть пустым";
    }
    if (data.description === '') {
        return "Описание не должно быть пустым";
    }
    if (data.movingType === undefined) {
        return "Переезд не должен быть пустым";
    }
    if (data.businessTripType === undefined) {
        return "Командировка не должен быть пустым";
    }
    return '';
}

export const validateCreateVacancy = (data: Vacancy) : string => {
    if (data.name === '') {
        return "Название не должно быть пустым";
    }
    if (data.specialization === '') {
        return "Специализация не должна быть пустой";
    }
    if (data.city === '') {
        return "Город не должен быть пустым";
    }
    if (data.experience === undefined) {
        return "Опыт не должен быть пустым";
    }
    if (data.description === '') {
        return "Описание не должно быть пустым";
    }
    if (data.employment_type === undefined) {
        return "Тип занятости не должен быть пустым";
    }
    if (data.schedule === undefined) {
        return "График работы не должен быть пустым";
    }
    return '';
}

export const valideSignInForm = (email: string, password: string) : string => {
    if (email.length === 0) {
        return "Введите email";
    }
    if (password.length === 0) {
        return "Введите пароль";
    }
    if (!validateEmail(email)) {
        return 'Введите корректный email';
    }
    if (!validatePasswordUppercase(password)) {
        return 'Пароль должен содержать хотя бы одну заглавную букву';
    }
    if (!validatePasswordLowercase(password)) {
        return 'Пароль должен содержать хотя бы одну строчную букву';
    }
    if (!validatePasswordNumber(password)) {
        return 'Пароль должен содержать хотя бы одну цифру';
    }
    if (!validataPasswordSymbol(password)) {
        return 'Пароль должен содержать хотя бы один специальный символ';
    }
    if (!validatePasswordLength(password)) {
        return 'Пароль должен содержать не менее 8 символов';
    }
    if (!validatePassword(password)) {
        return 'Введите корректный пароль';
    }
    return '';
}

export const valideSignUpForm = (email: string, password: string, passwordConfirm: string) : string => {
    if (email.length === 0) {
        return "Введите email";
    }
    if (password.length === 0) {
        return "Введите пароль";
    }
    if (!validateEmail(email)) {
        return 'Введите корректный email';
    }
    if (!validatePasswordUppercase(password)) {
        return 'Пароль должен содержать хотя бы одну заглавную букву';
    }
    if (!validatePasswordLowercase(password)) {
        return 'Пароль должен содержать хотя бы одну строчную букву';
    }
    if (!validatePasswordNumber(password)) {
        return 'Пароль должен содержать хотя бы одну цифру';
    }
    if (!validataPasswordSymbol(password)) {
        return 'Пароль должен содержать хотя бы один специальный символ';
    }
    if (!validatePasswordLength(password)) {
        return 'Пароль должен содержать не менее 8 символов';
    }
    if (!validatePassword(password)) {
        return 'Введите корректный пароль';
    }
    if (!validatePasswordConfirm(password, passwordConfirm)) {
        return 'Пароли не совпадают';
    }
    return '';
}

export const validateChangePassword = (password: string) => {
    if (!validatePasswordUppercase(password)) {
        return 'Пароль должен содержать хотя бы одну заглавную букву';
    }
    if (!validatePasswordLowercase(password)) {
        return 'Пароль должен содержать хотя бы одну строчную букву';
    }
    if (!validatePasswordNumber(password)) {
        return 'Пароль должен содержать хотя бы одну цифру';
    }
    if (!validataPasswordSymbol(password)) {
        return 'Пароль должен содержать хотя бы один специальный символ';
    }
    if (!validatePasswordLength(password)) {
        return 'Пароль должен содержать не менее 8 символов';
    }
    if (!validatePassword(password)) {
        return 'Введите корректный пароль';
    }
    return '';
}

export const validateEmail = (email: string): boolean => {
    const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

const validatePassword = (password: string): boolean => {
    const passwordRegex: RegExp = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+{}|:"<>?[\]\\/,.`~])[0-9a-zA-Z!@#$%^&*()_+{}|:"<>?[\]\\/,.`~]{8,}$/;
    return passwordRegex.test(password)
}

const validatePasswordConfirm = (password: string, passwordConfirm: string): boolean => {
    return password === passwordConfirm;
}

const validatePasswordUppercase = (password: string): boolean => {
    const passwordRegex: RegExp = /^(?=.*[A-Z]).+$/;
    return passwordRegex.test(password);
}

const validatePasswordLowercase = (password: string): boolean => {
    const passwordRegex: RegExp = /^(?=.*[a-z]).+$/;
    return passwordRegex.test(password);
}

const validatePasswordNumber = (password: string): boolean => {
    const passwordRegex: RegExp = /^(?=.*\d).+$/;
    return passwordRegex.test(password);
}

const validataPasswordSymbol = (password: string): boolean => {
    const passwordRegex: RegExp = /^(?=.*[!@#$%^&*()_+{}|:"<>?[\]\\/,.`~]).+$/;
    return passwordRegex.test(password); 
}

const validatePasswordLength = (password: string): boolean => {
    const passwordRegex: RegExp = /^.{8,}$/;
    return passwordRegex.test(password);
}