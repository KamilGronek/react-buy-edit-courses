import React, { useRef,useEffect, FC} from 'react';
import ReactDOM from 'react-dom';
import bemCssModules from 'bem-css-modules';
import { default as ModalStyles } from './Modal.module.scss'

const style = bemCssModules(ModalStyles);

interface ModalProps {
    children: any,
    handleOnClose(): void,
    isOpen: boolean,
    shouldBeCloseOnOutsideClick: boolean,
  }



const Modal:FC<ModalProps> = ({children, handleOnClose, isOpen, shouldBeCloseOnOutsideClick }) => {

const modalRef = useRef<any>(null);
const previousActiveElement = useRef<any>(null);


useEffect(()=>{
    if(!modalRef.current){
        return;
    }

    const {current: modal} = modalRef;

    // const current = modalRef.modal;

    if(isOpen){
        previousActiveElement.current = document.activeElement
        modal.showModal();
    }else if(previousActiveElement.current){
        modal.close();
        previousActiveElement.current.focus();
    }
},[isOpen])

useEffect(()=>{
    const { current: modal } = modalRef;

    const handleCancel = (e:any) =>{
        e.preventDefault();
        handleOnClose();
    };

    modal.addEventListener('cancel', handleCancel);

    return() => {
        modal.removeEventListener('cancel', handleCancel);
    }
},[handleOnClose]);


const handleOutsideClick = ({target}:any) => {
    const { current } = modalRef;

    if(shouldBeCloseOnOutsideClick && target === current){
        handleOnClose();
    }
} 


    return ReactDOM.createPortal((
        <dialog className={style()} ref={modalRef} onClick={handleOutsideClick}>
          {children}
        </dialog>
    ),document.body);
}

export default Modal;