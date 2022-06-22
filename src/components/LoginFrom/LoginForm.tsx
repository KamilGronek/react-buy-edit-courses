import React,{useState, useContext,useEffect, FC} from 'react';
import bemCssModules from 'bem-css-modules';
import Modal from '../Modal/Modal';
import { default as LoginFormStyles } from './LoginForm.module.scss';
import { useSettings } from '../../store/StoreProvider'
import request from '../../helpers/request';

const style =  bemCssModules(LoginFormStyles);


interface LoginFormProps {
    handleOnClose(): void,
    isModalOpen: boolean
}


  const LoginForm:FC<LoginFormProps> = ({handleOnClose, isModalOpen}) => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [validateMessage, setValidateMessage] = useState('');

    const {setUser} = useSettings();

    const handleOnChangeLogin = (e :any) => {
        setLogin(e.target.value);
    }

    const handleOnChangePassword = (e: any) => {
        setPassword(e.target.value);
    }

    const handleOnCloseModal = (e:any) => {
        e.preventDefault();
        handleOnClose();
    }


    const resetStateOfInputs = () => {
        setLogin('');
        setPassword('');
        setValidateMessage('');
    };

    const handleOnSubmit = async (e:any) => {
        e.preventDefault();
        const { data, status } = await request.post(
            '/users',
            { login, password } //body
        );
        if(status === 200){
            setUser(data.user);
            console.log(data)
            resetStateOfInputs();
            handleOnClose();
        }else{
          console.log(data)
            setValidateMessage(data.message);
        }         
    }

    useEffect(()=> {
      if(isModalOpen){
        resetStateOfInputs();
      }
    },[isModalOpen])

    const validateMessageComponent = validateMessage.length 
    ? <p className={style('validate_message')}>{validateMessage}</p>
    : null;

    return(
        <Modal handleOnClose={handleOnClose} isOpen={isModalOpen} shouldBeCloseOnOutsideClick={true}>
            {validateMessageComponent}
            <form className={style()} method="post" onSubmit={handleOnSubmit}>
              <div className={style('row')}>
                <label>
                  <input 
                    onChange={handleOnChangeLogin}
                    type="text" value ={login} />
                </label>
              </div>
              <div className={style('row')}>
                <label>
                  <input 
                    onChange={handleOnChangePassword}
                    type="password" value ={password}/>
                </label>    
              </div>
              <div className={style('row')}>
                <button type="submit">Zaloguj</button>
                <button onClick={handleOnCloseModal} type="button">Anuluj</button>
              </div>
            </form>
        </Modal>
    )
};

export default LoginForm;