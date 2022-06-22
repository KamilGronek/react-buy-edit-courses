import React, { useContext,useState} from 'react';
import { useSettings } from '../../store/StoreProvider';
import CourseDetails from './subomponents/CourseDetails';
import CoursePopup from './subomponents/CoursePopup';




const AdminPanel = () => {
    const [isOpenPopup, setIsOpenPopup] = useState(false);
    
    const {courses} = useSettings();

    const showPopup = () => setIsOpenPopup(true);

    const hidePopup = (e:any) => {
        if(e){
          e.preventDefault();
        }
        setIsOpenPopup(false)
    };

    const coursesElements = courses.map((course:any) => <CourseDetails key={course.id} {...course} />);


 return(
    <section>
     {coursesElements}
     <button onClick={showPopup}>Dodaj nowy kurs</button>
     <CoursePopup 
     isEditMode={false} 
     isOpenPopup={isOpenPopup} 
     hidePopup={hidePopup}
        />
    </section>
 );
};

export default AdminPanel;