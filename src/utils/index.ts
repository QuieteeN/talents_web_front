import { BusinessTripText, BusinessTripTypes, EducationLevelText, EducationLevelTypes, EmploymentText, EmploymentTypes, ExperienceText, ExperienceTypes, JobSearchText, JobSearchTypes, LanguageLevelText, MovingText, MovingTypes, Salary, SalaryTypes, ScheduleText, ScheduleTypes } from "../components/types";

export const getDate = (value: string) => {

    // Преобразуем строку в объект Date
    const dateObject = new Date(value);

    // Получаем компоненты даты
    const year = dateObject.getFullYear();
    const month = String(dateObject.getMonth() + 1).padStart(2, '0'); // Месяцы начинаются с 0
    const day = String(dateObject.getDate()).padStart(2, '0');

    // Форматируем дату и время
    const date = `${day}.${month}.${year}`;

    return date;
}

export const getTime = (value: string) => {
    // Преобразуем строку в объект Date
    const dateObject = new Date(value);

    // Получаем компоненты времени
    const hours = String(dateObject.getHours()).padStart(2, '0');
    const minutes = String(dateObject.getMinutes()).padStart(2, '0');

    const time = `${hours}:${minutes}`;

    return time;
}

export const getSalaryString = (salary: number | undefined | null): string => {
    const salaryString = String(salary); // Преобразуем число в строку
    const parts: string[] = []; // Массив для хранения частей зарплаты

    // Идем по строке зарплаты справа налево
    for (let i = salaryString.length - 1; i >= 0; i--) {
        const digit = salaryString[i];
        // Добавляем цифру в начало текущей части
        parts.unshift(digit);
        // Если дошли до третьей цифры, добавляем пробел после нее
        if ((salaryString.length - i) % 3 === 0 && i !== 0) {
            parts.unshift(' '); // Добавляем пробел в начало текущей части
        }
    }

    // Объединяем все части и возвращаем результат
    return `${parts.join('')} ₽`
}

export const getStringSalary = (salary: Salary) => {
    if (!!!salary) return "З/П не указана"
    if (salary.salaryFrom && salary.salaryTo) {
        return `${getSalaryString(salary.salaryFrom)} - ${getSalaryString(salary.salaryTo)} ${salary.type === SalaryTypes.BEFORE_TAXES ? 
            'до вычета налогов' : 'на руки'}`
    } else if (salary.salaryFrom) {
        return `от ${getSalaryString(salary.salaryFrom)} ${salary.type === SalaryTypes.BEFORE_TAXES ? 
            'до вычета налогов' : 'на руки'}`
    } else {
        return `до ${getSalaryString(salary.salaryTo)} ${salary.type === SalaryTypes.BEFORE_TAXES? 
            'до вычета налогов' : 'на руки'}`
    }
}

export const calculateAge = (birthday: Date): number => {
    // Получаем текущую дату
    const currentDate = new Date();

    // Получаем годы между текущей датой и датой рождения
    let age = currentDate.getFullYear() - birthday.getFullYear();

    // Проверяем, был ли день рождения в этом году
    const currentMonth = currentDate.getMonth();
    const birthMonth = birthday.getMonth();
    const currentDay = currentDate.getDate();
    const birthDay = birthday.getDate();

    if (currentMonth < birthMonth || (currentMonth === birthMonth && currentDay < birthDay)) {
        age--;
    }

    return age;
}

export const geocode = async (value: string) => {
    try {
        if (value) {
            const res = await fetch(
                `https://geocode-maps.yandex.ru/1.x/?apikey=644bf61c-9afa-4e5f-8e17-c4329f9e3d7f&format=json&geocode=${value}`
            );
            const data = await res.json();
            console.log(data)
            if ('response' in data) {
                return data?.response?.GeoObjectCollection?.featureMember?.[0]?.GeoObject?.Point?.pos;
            }
        }
    } catch (e) {
        console.log(e);
    }
}

export const formatPhoneNumber = (phone: string) => {
    // Убедимся, что номер начинается с +7, если это не так, добавляем +7
    if (phone.startsWith('8')) {
        phone = phone.replace(/^8/, '+7');
    } else if (!phone.startsWith('+7')) {
        phone = '+7' + phone.slice(1);
    }
    
    // Используем регулярное выражение для форматирования номера
    return phone.replace(/(\+7)(\d{3})(\d{3})(\d{2})(\d{2})/, '$1 ($2) $3-$4-$5');
}

export const getExperience = (experience: any) => {
    switch (experience?.code) {
        case ExperienceTypes.HAVENT:
            return ExperienceText.havent;
        case ExperienceTypes.LOWER_ONE:
            return ExperienceText.lower_one;
        case ExperienceTypes.ONE_THREE:
            return ExperienceText.one_three;
        case ExperienceTypes.THREE_SIX:
            return ExperienceText.three_six;
        case ExperienceTypes.UPPER_SIX:
            return ExperienceText.upper_six;
        default:
            return ExperienceText.havent;
    }
}

export const getJobSearchText = (job: string) => {
    switch (job) {
        case JobSearchTypes.ACTIVE_LOOK_JOB:
            return JobSearchText.active_look_job
        case JobSearchTypes.CONSIDER_OFFER:
            return JobSearchText.consider_offer
        case JobSearchTypes.OFFERED_THINK:
            return JobSearchText.offered_think
        case JobSearchTypes.MOVE_NEW_PLACE:
            return JobSearchText.move_new_place
        case JobSearchTypes.NOT_LOOK_JOB:
            return JobSearchText.not_look_job
        default:
            return JobSearchText.active_look_job
    }
}

export const getLanguageLevelText = (languageLevel: string) => {
    switch (languageLevel) {
        case 'beginner_a1':
            return LanguageLevelText.beginner_a1
        case 'beginner_a2':
            return LanguageLevelText.beginner_a2
        case 'intermediate_b1':
            return LanguageLevelText.intermediate_b1
        case 'intermediate_b2':
            return LanguageLevelText.intermediate_b2
        case 'advanced':
            return LanguageLevelText.advanced
        case 'native':
            return LanguageLevelText.native
        default:
            return LanguageLevelText.beginner_a1
    }
}

export const getEducationLevelText = (educationLevel: string) => {
    switch (educationLevel) {
        case EducationLevelTypes.SECONDARY:
            return `${EducationLevelText.secondary} образование`
        case EducationLevelTypes.SECONDARY_HIGH:
            return `${EducationLevelText.secondary_high} образование`
        case EducationLevelTypes.INCOMPLETE_HIGH:
            return `${EducationLevelText.incomplete_high} образование`
        case EducationLevelTypes.HIGH:
            return `${EducationLevelText.high} образование`
        default:
            return EducationLevelText.bachelor
    }
}

export const getEmploymentType = (employmentType: any) => {
    switch (employmentType?.code) {
        case EmploymentTypes.FULL_EMPLOYMENT:
            return EmploymentText.full_employment;
        case EmploymentTypes.PART_TIME_EMPLOYMENT:
            return EmploymentText.part_time_employment;
        case EmploymentTypes.PROJECT_WORK:
            return EmploymentText.project_work;
        case EmploymentTypes.INTERSHIP:
            return EmploymentText.internship;
        default:
            return EmploymentText.no;
    }
}

export const getEmploymentTypeText = (employmentType: string) => {
    switch (employmentType) {
        case EmploymentTypes.FULL_EMPLOYMENT:
            return EmploymentText.full_employment;
        case EmploymentTypes.PART_TIME_EMPLOYMENT:
            return EmploymentText.part_time_employment;
        case EmploymentTypes.PROJECT_WORK:
            return EmploymentText.project_work;
        case EmploymentTypes.INTERSHIP:
            return EmploymentText.internship;
        default:
            return EmploymentText.no;
    }
}

export const getScheduleType = (schedule: any) => {
    switch (schedule?.code) {
        case ScheduleTypes.FULL_DAY:
            return ScheduleText.full_day;
        case ScheduleTypes.SHIFT_WORK:
            return ScheduleText.shift_work;
        case ScheduleTypes.FLEXIBLE_SHEDULE:
            return ScheduleText.flexible_schedule;
        case ScheduleTypes.DISTANT_WORK:
            return ScheduleText.distant_work;
        default:
            return ScheduleText.no
    }
}

export const getScheduleTypeText = (schedule: string) => {
    switch (schedule) {
        case ScheduleTypes.FULL_DAY:
            return ScheduleText.full_day;
        case ScheduleTypes.SHIFT_WORK:
            return ScheduleText.shift_work;
        case ScheduleTypes.FLEXIBLE_SHEDULE:
            return ScheduleText.flexible_schedule;
        case ScheduleTypes.DISTANT_WORK:
            return ScheduleText.distant_work;
        default:
            return ScheduleText.no
    }
}

export const getMovingType = (moving: any) => {
    switch (moving?.code) {
        case MovingTypes.NOT_READY:
            return MovingText.not_ready;
        case MovingTypes.READY:
            return MovingText.ready
        default:
            return MovingText.want
    }
}

export const getBusinessTripType = (businessTripType: any) => {
    switch (businessTripType?.code) {
        case BusinessTripTypes.NEVER:
            return BusinessTripText.never;
        case BusinessTripTypes.READY:
            return BusinessTripText.ready
        default:
            return BusinessTripText.sometimes
    }
}