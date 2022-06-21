import React, {useState,useContext} from 'react';
import bemCssModules from 'bem-css-modules';
import request from '../../../helpers/request'
import { useSettings } from '../../../store/StoreProvider';
import CoursePopup from './CoursePopup';




const CourseDetails = (props) => {
    const [isOpenPopup, setIsOpenPopup] = useState(false);
    
    const {setCourses} = useSettings();
    const { title, id } = props;


    const showPopup = () => setIsOpenPopup(true);

    const hidePopup = (e) => {
        e.preventDefault();

        setIsOpenPopup(false)
    };

    const handleDeleteCourse = async() => {
        try {
            const { status } = await request.delete(`/courses/${id}`);

            if(status === 200){
                setCourses(prev => prev.filter(course => course.id !== id));
            }
        } catch (error) {
            console.warn(console.error())
        }
    }

 return(
    <details>
        <summary>{title}</summary>
        <button onClick={showPopup}>Edytuj</button>
        <button onClick={handleDeleteCourse}>Usuń</button>
        <CoursePopup isOpenPopup={isOpenPopup} hidePopup={hidePopup} {...props}/>
    </details>
 );
};

export default CourseDetails;