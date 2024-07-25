import { EducationType, EmploymentType, ExperienceType, IVacancy, PartTimeType, SheduleType, SkillType } from "../types/dbTypes";

export const vacancies: IVacancy[] = [
    {
        id: 1,
        name: "Front-end developer",
        description: `

        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed egestas urna ac risus sodales tincidunt. Nullam posuere sollicitudin lorem, et semper risus hendrerit nec. Aliquam dapibus iaculis lacinia. Suspendisse in diam interdum ante auctor pretium vitae at ipsum. Nunc vitae risus venenatis, varius risus eu, iaculis felis. Donec sit amet eros in quam commodo dapibus non ut justo. Curabitur eget congue magna, non iaculis libero. Nunc metus diam, finibus id pretium in, sagittis id sem. Nunc a malesuada risus. Nam iaculis efficitur nisi, ut laoreet massa eleifend a. Donec fermentum orci vitae est tempus, nec laoreet massa tristique. Pellentesque ex nibh, aliquet ac euismod nec, faucibus nec libero.
        
        Praesent malesuada consequat lectus id dignissim. Etiam suscipit purus eu odio rhoncus feugiat. Sed tincidunt varius ex ac efficitur. Aliquam erat volutpat. Etiam at orci consequat, vehicula tortor sit amet, consequat mi. Nam ullamcorper hendrerit pretium. Nunc scelerisque, nunc ut porttitor dapibus, dolor quam faucibus orci, ac egestas enim sem et ex. Fusce at ante sed risus efficitur sodales. Curabitur augue nibh, porta euismod augue non, porttitor pretium velit. Fusce odio dui, efficitur non hendrerit condimentum, varius nec enim.
        
        Mauris pretium feugiat hendrerit. Cras commodo risus id nisl ultricies, sit amet gravida velit posuere. Duis sodales nibh ut felis posuere, vitae placerat risus scelerisque. Morbi ac tincidunt ligula. Vestibulum ut sagittis eros. Phasellus non posuere sapien, eget volutpat urna. In sollicitudin risus ac nibh tempus, at lobortis eros consectetur. Nulla iaculis quam id libero volutpat, vitae laoreet felis varius. Nulla dignissim aliquam venenatis. Suspendisse faucibus, leo eu porta semper, orci orci dictum leo, sed porta sapien urna sed nisl. Aliquam sagittis porta enim sit amet malesuada. Aliquam bibendum convallis sapien, et egestas orci feugiat pretium. Phasellus ut leo lectus. Vestibulum tristique tortor sit amet velit rhoncus, ut gravida est auctor. Suspendisse potenti. Maecenas ex neque, bibendum non euismod vitae, pellentesque nec risus.
        
        Duis viverra egestas neque at pellentesque. Fusce nunc nisi, elementum id est sed, vehicula rutrum dolor. Fusce vestibulum sem nec erat fermentum, tempus sodales ex commodo. Suspendisse rhoncus laoreet quam, rutrum euismod ex scelerisque quis. Quisque orci metus, hendrerit ut scelerisque mollis, porta id ex. Sed vitae pretium arcu, non placerat leo. Etiam metus nunc, volutpat ac nibh eu, pellentesque venenatis ipsum. Phasellus rhoncus libero dolor. Sed rutrum est commodo leo feugiat accumsan. Pellentesque vestibulum magna sem. Fusce eu tortor interdum lacus vehicula volutpat non ut justo. Sed ante massa, hendrerit nec leo in, dictum fermentum neque.
        
        In ac maximus mauris. Vivamus sed nisl at nibh tempor euismod. Vivamus tempor purus lectus, at auctor erat consequat sed. Aliquam sodales, orci et malesuada sodales, tellus dolor sodales sem, eu blandit risus nisi id turpis. Quisque lacinia mi dapibus ligula dapibus, ut pretium leo consectetur. Ut maximus purus ultricies, vestibulum sem in, molestie sapien. Donec condimentum orci purus, ut molestie diam eleifend at. `,
        salary: 10000,
        address: {
            id: 1,
            country: "Russia",
            city: "Moscow",
            street: "Lenina",
            houseNumber: "1",
            apartment: 1,
        },
        company: {
            id: 1,
            name: "Frontenders",
            about: "Frontenders",
            city: "Moscow",
            site: "site://Frontedeners.com",
        },
        educations: [EducationType.BACHELOR],
        experience: ExperienceType.NOT_REQURED,
        type: [EmploymentType.FULL_TIME],
        shedule: [SheduleType.FULL_TIME],
        skills: [SkillType.JavaScript, SkillType.TypeScript, SkillType.React, SkillType.TypeScript, SkillType.React, SkillType.TypeScript, SkillType.React, SkillType.TypeScript, SkillType.React, SkillType.TypeScript, SkillType.React],
    },
    {
        id: 2,
        name: "Back-end developer",
        description: "Back-end developer description",
        salary: 10000,
        address: {
            id: 2,
            country: "Russia",
            city: "Moscow",
            street: "Lenina",
            houseNumber: "1",
            apartment: 1,
        },
        company: {
            id: 2,
            name: "Backenders",
            about: "Backenders",
            city: "Moscow",
            site: "site://Backedeners.com",
        },
        educations: [EducationType.BACHELOR],
        experience: ExperienceType.NOT_REQURED,
        type: [EmploymentType.FULL_TIME],
        shedule: [SheduleType.FULL_TIME],
        skills: [SkillType.JavaScript, SkillType.TypeScript, SkillType.Node],
    },
    {
        id: 3,
        name: "Full-stack developer",
        description: "Full-stack developer description",
        salary: 10000,
        address: {
            id: 3,
            country: "Russia",
            city: "Moscow",
            street: "Lenina",
            houseNumber: "1",
            apartment: 1,
        },
        company: {
            id: 3,
            name: "Fullstackers",
            about: "Fullstackers",
            city: "Moscow",
            site: "site://Fullstackeners.com",
        },
        educations: [EducationType.BACHELOR],
        experience: ExperienceType.NOT_REQURED,
        type: [EmploymentType.FULL_TIME],
        shedule: [SheduleType.FULL_TIME],
        skills: [SkillType.JavaScript, SkillType.TypeScript, SkillType.React, SkillType.Node],
    },
    {
        id: 4,
        name: "Mobile developer",
        description: "Mobile developer description",
        salary: 10000,
        address: {
            id: 4,
            country: "Russia",
            city: "Moscow",
            street: "Lenina",
            houseNumber: "1",
            apartment: 1,
        },
        company: {
            id: 4,
            name: "Mobileers",
            about: "Mobileers",
            city: "Moscow",
            site: "site://Mobileeners.com",
        },
        educations: [EducationType.BACHELOR],
        experience: ExperienceType.NOT_REQURED,
        type: [EmploymentType.FULL_TIME],
        shedule: [SheduleType.FULL_TIME],
        skills: [SkillType.JavaScript, SkillType.TypeScript, SkillType.React, SkillType.Node, SkillType.Mobile],
    },
    {
        id: 5,
        name: "Desktop developer",
        description: "Desktop developer description",
        salary: 10000,
        address: {
            id: 5,
            country: "Russia",
            city: "Moscow",
            street: "Lenina",
            houseNumber: "1",
            apartment: 1,
        },
        company: {
            id: 5,
            name: "Desktopers",
            about: "Desktopers",
            city: "Moscow",
            site: "site://Desktopeners.com",
        },
        educations: [EducationType.BACHELOR],
        experience: ExperienceType.NOT_REQURED,
        type: [EmploymentType.FULL_TIME],
        shedule: [SheduleType.FULL_TIME],
        skills: [SkillType.Java, SkillType.Mobile, SkillType.React, SkillType.Node],
    },
    {
        id: 6,
        name: "DevOps",
        description: "DevOps",
        salary: 10000,
        address: {
            id: 6,
            country: "Russia",
            city: "Moscow",
            street: "Lenina",
            houseNumber: "1",
            apartment: 1,
        },
        company: {
            id: 6,
            name: "DevOpsers",
            about: "DevOpsers",
            city: "Moscow",
            site: "site://DevOpseners.com",
        },
        educations: [EducationType.BACHELOR],
        experience: ExperienceType.NOT_REQURED,
        type: [EmploymentType.FULL_TIME],
        shedule: [SheduleType.FULL_TIME],
        skills: [SkillType.JavaScript, SkillType.TypeScript, SkillType.React, SkillType.Node, SkillType.AWS, SkillType.Linux, SkillType.Docker],
    },
    {
        id: 7,
        name: "QA",
        description: "QA description",
        salary: 10000,
        address: {
            id: 7,
            country: "Russia",
            city: "Moscow",
            street: "Lenina",
            houseNumber: "1",
            apartment: 1,
        },
        company: {
            id: 7,
            name: "QAs",
            about: "QAs",
            city: "Moscow",
            site: "site://QAs.com",
        },
        educations: [EducationType.BACHELOR],
        experience: ExperienceType.NOT_REQURED,
        type: [EmploymentType.PART_TIME],
        shedule: [SheduleType.SHIFT_WORK],
        skills: [SkillType.JavaScript, SkillType.TypeScript, SkillType.React, SkillType.Node, SkillType.AWS, SkillType.Linux, SkillType.Docker],
        partTime: [PartTimeType.PARTIAL_DAY],
    },
    {
        id: 8,
        name: "Testing",
        description: "Testing description",
        salary: 10000,
        address: {
            id: 8,
            country: "Russia",
            city: "Moscow",
            street: "Lenina",
            houseNumber: "1",
            apartment: 1,
        },
        company: {
            id: 8,
            name: "Testers",
            about: "Testers",
            city: "Moscow",
            site: "site://Testers.com",
        },
        educations: [EducationType.BACHELOR],
        experience: ExperienceType.NOT_REQURED,
        type: [EmploymentType.PART_TIME],
        shedule: [SheduleType.SHIFT_WORK],
        skills: [SkillType.JavaScript, SkillType.TypeScript, SkillType.React, SkillType.Node, SkillType.AWS, SkillType.Linux, SkillType.Docker],
    },
    {
        id: 9,
        name: "Frontend developer",
        description: "Frontend developer description",
        salary: 10000,
        address: {
            id: 9,
            country: "Russia",
            city: "Moscow",
            street: "Lenina",
            houseNumber: "1",
            apartment: 1,
        },
        company: {
            id: 9,
            name: "Frontenders",
            about: "Frontenders",
            city: "Moscow",
            site: "site://Frontendeners.com",
        },
        educations: [EducationType.BACHELOR],
        experience: ExperienceType.NOT_REQURED,
        type: [EmploymentType.FULL_TIME],
        shedule: [SheduleType.FULL_TIME],
        skills: [SkillType.JavaScript, SkillType.TypeScript, SkillType.React, SkillType.Node, SkillType.AWS, SkillType.Linux, SkillType.Docker]
    },
    {
        id: 10,
        name: "Backend developer",
        description: "Backend developer description",
        salary: 10000,
        address: {
            id: 10,
            country: "Russia",
            city: "Moscow",
            street: "Lenina",
            houseNumber: "1",
            apartment: 1,
        },
        company: {
            id: 10,
            name: "Backenders",
            about: "Backenders",
            city: "Moscow",
            site: "site://Backendeners.com",
        },
        educations: [EducationType.BACHELOR],
        experience: ExperienceType.NOT_REQURED,
        type: [EmploymentType.FULL_TIME],
        shedule: [SheduleType.FULL_TIME],
        skills: [SkillType.JavaScript, SkillType.TypeScript, SkillType.React, SkillType.Node, SkillType.AWS, SkillType.Linux, SkillType.Docker]
    }
]