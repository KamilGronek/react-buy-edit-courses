import React, {FC, useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import bemCssModules from 'bem-css-modules';
import { default as ContentStyles } from './Course.module.scss';
import { useSettings } from '../../store/StoreProvider';
import request from '../../helpers/request';

const style =  bemCssModules(ContentStyles);

interface CourseProps {
    authors: [],
    id: number
    img: string,
    isUserContext: boolean,
    price: number,
    title: string
}

const Course:FC<CourseProps> = ({authors, id, img, isUserContext, price, title }) => {

    const {user, setUser} = useSettings();

    const navigate = useNavigate();

    const allAuthors = authors.join(', ');

    const isUserLogged = Boolean(user);


    const handleOnClick = async () => {
        try{
            const { data, status } = await request.patch('/users',
              {
               login: user.login,
               courseId: id
              }
            );

            if(status === 202){
               setUser(data.user);
               navigate('/my-courses');
            }

            } catch(error){
                console.warn(error);
            }
    };

    const shouldBeBuyButtonVisible = isUserLogged && !isUserContext;

    return(
        <li>
            <article className={style()}>
                <h3 className={style('title')}>{title}</h3>
                <img src={img}  alt={title} className={style('image')}/>
                <p className={style('price')}>{`Koszt kursu: ${price} zł`}</p>
                <p className={style('authors')}>{`Autorzy kursu: ${allAuthors}`}</p>
                {shouldBeBuyButtonVisible && <button onClick={handleOnClick}>Zakup ten kurs</button>}
            </article>
        </li>
    );
}
export default Course;