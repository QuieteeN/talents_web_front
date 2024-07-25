export interface IVacancy {
    id: number,
    name: string,
    description: string,
    salary?: number,
    address?: IAddress,
    company: ICompany,
    educations: EducationType[],
    experience: ExperienceType,
    type: EmploymentType[],
    shedule: SheduleType[],
    partTime?: PartTimeType[],
    skills: SkillType[],
}

export interface ICv {
    id: number,
    name: string,
    surname: string,
    cvName: string,
    birthDate: Date,
    salary?: number,
    telephonNumber: string,
    skills: SkillType[],
    educations: EducationType[],
    city: string,
    status?: CvStatusType,
    experience: ExperienceType, 
}

export interface IAddress {
    id: number,
    country: string,
    city: string,
    street: string,
    houseNumber: string,
    apartment?: number,
    flatNumber?: number,
    postCode?: number,
}

export interface ICompany {
    id: number,
    name: string,
    about: string,
    city?: string,
    site?: string,
}

export enum CvStatusType {
    CONSIDERING = "Рассматривает предложения",
    ACTIVE = "Активно ищет работу",
    NOT_LOOKING = "Не ищет работу",
    OFFERED = "Предложили работу",
    NEW_PLACE = "Вышел на новое место работы",
}

export enum SkillType {
    JavaScript = "JavaScript",
    TypeScript = "TypeScript",
    HTML = "HTML",
    CSS = "CSS",
    React = "React",
    Vue = "Vue",
    Angular = "Angular",
    Node = "Node",
    Python = "Python",
    C = "C",
    CPlusPlus = "C++",
    CSharp = "C#",
    Java = "Java",
    PHP = "PHP",
    Ruby = "Ruby",
    Swift = "Swift",
    Kotlin = "Kotlin",
    Dart = "Dart",
    Go = "Go",
    Scala = "Scala",
    Rust = "Rust",
    SQL = "SQL",
    MongoDB = "MongoDB",
    MySQL = "MySQL",
    PostgreSQL = "PostgreSQL",
    Oracle = "Oracle",
    SQLite = "SQLite",
    Redis = "Redis",
    Git = "Git",
    Linux = "Linux",
    Docker = "Docker",
    AWS = "AWS",
    Azure = "Azure",
    GCP = "GCP",
    Web = "Web",
    Mobile = "Mobile",
    Desktop = "Desktop",
    Webpack = "Webpack",
    Babel = "Babel",
    Jest = "Jest",
    Cypress = "Cypress",
    Selenium = "Selenium",
    Postman = "Postman",
}

export enum PartTimeType {
    PARTIAL_DAY = 'Неполный день',
    WEEKEND = 'Выходные',
    EVENING = 'Вечерняя работа'
}

export enum SheduleType {
    FULL_TIME = 'Полная смена',
    SHIFT_WORK = 'Сменный график',
    FLEXIBLE = 'Гибкий график',
    DISTANT = 'Удаленная работа'
}

export enum EmploymentType {
    FULL_TIME = 'Полная занятость',
    PART_TIME = 'Частичная занятость',
    CONTRACT = 'Работа по согласованию',
    FREELANCE = 'Фриланс',
    INTERSHIP = 'Стажировка',
    PROJECT_WORK = 'Проектная работа',
} 

export enum EducationType {
    NOT_REQURED = 'Юез образования',
    PRIMARY_SCHOOL = 'Основное',
    SECONDARY_SCHOOL = 'Среднее',
    BACHELOR = 'Бакалавр',
    MAGISTER = 'Магистр',
    DOCTOR = 'Доктор',
}

export enum ExperienceType {
    NOT_REQURED = 'Без опыта',
    ONE_YEAR = 'Один год',
    ONE_YEAR_THREE_YEARS = 'От 1 до 3 лет',
    THREE_YEARS_FIVE_YEARS = 'От 3 до 5 лет',
    FIVE_YEARS_MORE = 'Более 5 лет',
}