import React,{createContext,FC,useEffect,useState,useContext} from 'react';
import request from '../helpers/request';

export const StoreContext = createContext<SettingsContextData | null>(null);

export const StoreProvider:FC = ({children}:any) => {

    const value = useProviderSettings();

    return(
        <StoreContext.Provider value={value}>
            {children}
        </StoreContext.Provider>
    );
};

const useProviderSettings = () =>{
    const [courses, setCourses] = useState([]);
    const [user, setUser] = useState(null);

    const fetchData = async () => {
        const {data} = await request.get('/courses');
        console.log(data.courses)
        console.log(user)
        setCourses(data.courses);
    };
    
    useEffect(()=> {
        fetchData();
    },[])


    return{
        courses,
        setCourses,
        user,
        setUser
    }
};


type SettingsContextData = ReturnType<typeof useProviderSettings>;

export const useSettings = () => {
    const settings = useContext(StoreContext);

    if(!settings){
       throw new Error('useSettings must be used inside SettingsProvider');
    }

    return settings;
}