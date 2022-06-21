import React from 'react';
import { Routes, Route,Navigate } from 'react-router-dom';
import Courses from '../Courses/Courses';
import bemCssModules from 'bem-css-modules';
import UserCourses from '../UserCourses/UserCourses';

import { useSettings } from '../../store/StoreProvider';
import { default as ContentStyles } from './Content.module.scss';
import AdminPanel from '../AdminPanel/AdminPanel';


const style =  bemCssModules(ContentStyles);


const ADMIN_TYPE = 1;


const Content = () => {

    const {user} = useSettings();

    console.log(user)

    const isUserLogged = Boolean(user);
    const isAdmin = user?.accessLevel === ADMIN_TYPE;

 return(
    <main className={style()}>
        <Routes>
            <Route path="/" element={<Courses/>} />
            { isUserLogged &&  <Route path="/my-courses" element={<UserCourses/>} />}
            { isAdmin &&  <Route path="/manage-courses" element={<AdminPanel/>} />}
        </Routes>
    </main>
 );
};

export default Content;