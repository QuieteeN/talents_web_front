export type RoutesType = { [route: string]: { path: string } };

export const routes: RoutesType = {
  home: {
    path: '/',
  },
  sign_in: {
    path: '/sign-in',
  },
  sign_up: {
    path: '/sign-up'
  },
  company: {
    path: '/company/:companyId'
  },
  vacancy: {
    path: '/vacancy/:vacancyId'
  },
  vacancies: {
    path: '/vacancies',
  },
  cvies: {
    path: '/cvies',
  },
  cv: {
    path: '/cv/:cvId'
  },
  employer_profile: {
    path: '/profile/employer/:type'
  },
  student_profile: {
    path: '/profile/student/:type'
  },
  create_cv: {
    path: '/student/cvies/create'
  },
  create_vacancy: {
    path: '/employer/vacancies/create'
  },
  my_vacancies: {
    path: '/employer/vacancies/all'
  },
  my_cvies: {
    path: '/student/cvies/all'
  },
  my_vacancy: {
    path: '/employer/vacancies/:vacancyId/:type'
  },
  my_cv: {
    path: '/student/cvies/:cvId/:type'
  },
  employer_chats: {
    path: '/:userType/chat'
  },
  employer_chat: {
    path: '/:userType/chat/:chatId'
  },
  favorite: {
    path: "/favorite"
  }
};
