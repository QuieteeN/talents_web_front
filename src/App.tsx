import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignIn from './components/pages/sign/SignIn';
import SignUp from './components/pages/sign/SignUp';
import Home from './components/pages/home/Home';
import { routes } from './routes/Route';
import EmployerProfile from './components/pages/employerProfile';
import StudentProfile from './components/pages/studentProfile';
import VacancyCreate from './components/pages/vacancyCreate/VacancyCreate';
import MyVacancies from './components/pages/myVacancies/MyVacancies';
import MyVacancy from './components/pages/myVacancy/MyVacancy';
import EmployerForVisitor from './components/pages/employerProfile/employerForVisitor/EmployerForVisitor';
import VacancyPage from './components/pages/myVacancy/vacancyForStudents/VacancyPage';
import CvCreate from './components/pages/cvCreate/CvCreate';
import Vacancies from './components/pages/vacancy/Vacancies';
import MyCvies from './components/pages/myCvies/MyCvies';
import MyCv from './components/pages/myCv/MyCv';
import CvPage from './components/pages/myCv/cvForEmployers/CvPage';
import Cvies from './components/pages/cv/Cvies';
import ChatPage from './components/pages/chat/ChatPage';
import LikedPage from './components/pages/liked/LikedPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={routes.home.path} element={<Home />} />
        <Route path={routes.sign_in.path} element={<SignIn />} />
        <Route path={routes.sign_up.path} element={<SignUp />} />
        <Route path={routes.vacancy.path} element={<VacancyPage />} />
        <Route path={routes.vacancies.path} element={<Vacancies />} />
        <Route path={routes.cvies.path} element={<Cvies />} />
        <Route path={routes.company.path} element={<EmployerForVisitor />} />
        <Route path={routes.cv.path} element={<CvPage />} />
        <Route path={routes.employer_profile.path} element={<EmployerProfile />} />
        <Route path={routes.student_profile.path} element={<StudentProfile />} />
        <Route path={routes.create_vacancy.path} element={<VacancyCreate />} />
        <Route path={routes.my_vacancies.path} element={<MyVacancies />} />
        <Route path={routes.my_vacancy.path} element={<MyVacancy />} />
        <Route path={routes.create_cv.path} element={<CvCreate />} />
        <Route path={routes.my_cvies.path} element={<MyCvies />} />
        <Route path={routes.my_cv.path} element={<MyCv />} />
        <Route path={routes.employer_chats.path} element={<ChatPage />} />
        <Route path={routes.employer_chat.path} element={<ChatPage />} />
        <Route path={routes.favorite.path} element={<LikedPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
