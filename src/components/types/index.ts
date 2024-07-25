export enum ExperienceTypes {
    HAVENT='havent',
    LOWER_ONE='lower_one',
    ONE_THREE='one_three',
    THREE_SIX='three_six',
    UPPER_SIX='upper_six',
}

export enum MovingTypes {
    NOT_READY='not_ready',
    READY='ready',
    WANT='want'
}

export const MovingText = {
    'not_ready': 'не готов к переездам',
    'ready': 'готов к переезду',
    'want': 'желаю переехать',
}

export enum BusinessTripTypes {
    NEVER='never',
    READY='ready',
    SOMETIMES='sometimes',
}

export const BusinessTripText = {
    'never': 'не готов к командировками',
    'ready': 'готов к командировкам',
    'sometimes': 'иногда готов поехать в командировки',
}

export enum JobSearchTypes {
    ACTIVE_LOOK_JOB='active_look_job',
    CONSIDER_OFFER='consider_offer',
    OFFERED_THINK='offered_think',
    MOVE_NEW_PLACE='move_new_place',
    NOT_LOOK_JOB='not_look_job',
}

export const JobSearchText = {
    'active_look_job': 'Активно ищю работу',
    'consider_offer': 'Рассматриваю предложения',
    'offered_think': 'Предложили работу, думаю',
    'move_new_place': 'Вышел на новое место работы',
    'not_look_job': 'Не ищю работу',
}

export enum EducationLevelTypes {
    SECONDARY = 'secondary',
    SECONDARY_HIGH = 'secondary_high',
    INCOMPLETE_HIGH = 'incomplete_high',
    HIGH = 'high',
    BACHELOR = 'bachelor',
}

export const EducationLevelText = {
    'secondary': 'Среднее',
    'secondary_high': 'Среднее высшее',
    'incomplete_high': 'Неоконченное высшее',
    'high': 'Высшее',
    'bachelor': 'Бакалавр',
}

export const ExperienceText = {
    'havent': 'Без опыта',
    'lower_one': 'Менее 1 года',
    'one_three': 'От 1 года до 3 лет',
    'three_six': 'От 3 до 6 лет',
    'upper_six': 'Более 6 лет',
}

export enum EmploymentTypes {
    FULL_EMPLOYMENT='full_employment',
    PART_TIME_EMPLOYMENT='part_time_employment',
    PROJECT_WORK='project_work',
    INTERSHIP='internship',
    NO='no',
}

export const EmploymentText = {
    'full_employment': 'Полная занятость',
    'part_time_employment': 'Частичная занятость',
    'project_work': 'Проектная работа',
    'internship': 'Стажировка',
    'no': 'Не имеет значения',
}

export enum ScheduleTypes {
    FULL_DAY='full_day',
    SHIFT_WORK='shift_work',
    FLEXIBLE_SHEDULE='flexible_schedule',
    DISTANT_WORK='distant_work',
    NO='no',
}

export const ScheduleText = {
    'full_day': 'Полный день',
    'shift_work': 'Сменный график',
    'flexible_schedule': 'Гибкий график',
    'distant_work': 'Удаленная работа',
    'no': 'Не указан',
}

export const LanguageLevelText = {
    'beginner_a1': 'А1 - Начальный',
    'beginner_a2': 'А2 - Элементарный',
    'intermediate_b1': 'B1 - Средний',
    'intermediate_b2': 'B2 - Средне-продвинутый',
    'advanced': 'С1 - Продвинутый',
    'native': 'С2 - Носитель языка',
}

export interface Language {
    name: string;
    level: string;
}

export enum SalaryTypes {
    BEFORE_TAXES='beforeTaxes',
    AFTER_TAXES='afterTaxes',
}

export interface Salary {
    salaryFrom: number | null;
    salaryTo: number | null;
    type: SalaryTypes;
}

export interface Address {
    country: string;
    state: string;
    city: string;
    street: string;
    houseNumber: string;
    pos: string | undefined;
}

export interface Vacancy {
    name: string;
    specialization: string;
    city:string;
    experience: ExperienceTypes;
    description: string;
    isVisibleContacts: boolean
    employment_type: EmploymentTypes
    schedule: ScheduleTypes
    salary: Salary;
    address: Address;
    keySkills: string[];
    languages: Language[];
    licenseCategories: string[];
}

export interface Institute {
    instituteName: string | null;
    facultyName: string | null;
    specialization: string | null;
    educationLevel: EducationLevelTypes;
}

export interface CV {
    name: string;
    city: string;
    experience: ExperienceTypes;
    movingType: MovingTypes;
    businessTripType: BusinessTripTypes;
    salary: Salary;
    employmentTypes: EmploymentTypes[];
    schedules: ScheduleTypes[];
    description: string;
    institute: Institute;
    skills: string[];
    languages: Language[];
    licenseCategories: string[];
}