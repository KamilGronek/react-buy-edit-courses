import React, {useState,useContext, FC} from 'react';
import bemCssModules from 'bem-css-modules';
import request from '../../../helpers/request'
import { useSettings } from '../../../store/StoreProvider';
import { default as CoursePopupStyles } from './CoursePopup.module.scss';
import Modal from '../../Modal/Modal'

const style =  bemCssModules(CoursePopupStyles);

interface CoursePopupProps {
  hidePopup(): void,
  isEditMode: boolean,
  isOpenPopup: boolean,
  authors: [],
  id: number
  img: string,
  isUserContext: boolean,
  price: number,
  title: string,
}


const CoursePopup:FC<CoursePopupProps> = ({
    authors = [],
    hidePopup,
    isEditMode = true,
    isOpenPopup,
    id,
    img = '',
    price = 0,
    title = '',
}) => {

    const {setCourses} = useSettings();

    const [formAuthors, setFormAuthors] = useState<any[]>(authors); 
    const [formAuthor, setAuthor] = useState('');
    const [formImg, setFormImg] = useState(img);
    const [formPrice, setFormPrice] = useState(price);
    const [formTitle, setFormTitle] = useState(title);

    const handleOnChangePrice = (e:any) => {
      setFormPrice(e.target.value)
    }


    const handleOnSubmit = async (e:any) => {
        e.preventDefault();

        const courseObject = {
            authors: formAuthors,
            id:id,
            img: formImg,
            price: Number(formPrice),
            title: formTitle,    
        };

        if(isEditMode){
          const { data, status } = await request.put('/courses',courseObject);  

          if(status === 202){
            setCourses(data.courses);
          }
        } else {
          const { data, status } = await request.post('/courses',courseObject);
            
          if(status === 201){
            setCourses(data.courses);
          }
        }
        hidePopup();
    };

    const addAuthor = (e:any) => {
        e.preventDefault();

        setFormAuthors(prev => [...prev, formAuthor]);
        setAuthor('');
    };

    const deleteAuthor = (e:any) => {
        const authorToDelete = e.target.dataset.author;
        setFormAuthors(prev => prev.filter(author => author !== authorToDelete));
    }

    const authorsElements = formAuthors.map(author =>(
        <li key={author}>
            <p>{author}</p>
            <button data-author={author} onClick={deleteAuthor}>Usuń </button>
        </li>
    ))

    const correctLabel = isEditMode ? 'Aktualizuj kurs' : 'Utwórz kurs';

 return(
    <Modal handleOnClose={hidePopup} isOpen={isOpenPopup} shouldBeCloseOnOutsideClick={true}>
        <div className={style()}>
          <form className={style('form')} method="submit" onSubmit={handleOnSubmit}>
              <div className={style('form-row')}>
                <label>
                    Autor:
                    <input className={style('input')} type="text" value={formAuthor} onChange={e => setAuthor(e.target.value)} />
                    <button onClick={addAuthor}>Dodaj autora</button>
                </label>
              </div>
              <div className={style('form-row')}>
              <label>
                    Obrazek url:
                    <input className={style('input')}  type="text" value={formImg} onChange={e => setFormImg(e.target.value)} />
                </label>
              </div>
              <div className={style('form-row')}>
              <label>
                    Cena:
                    <input className={style('input')}  type="number" value={formPrice} onChange={handleOnChangePrice} />
                </label>
              </div>
              <div className={style('form-row')}>
              <label>s
                    Tytuł:
                    <input className={style('input')}  type="text" value={formTitle} onChange={ e => setFormTitle(e.target.value)} />
                </label>
              </div>
              <button type="submit">{correctLabel}</button>
              <button onClick={hidePopup} type="button">Anuluj</button>
          </form>
          <p>Lista autorów: </p>
          <ul>
             {authorsElements}
          </ul>
        </div>
    </Modal>
 );
};

export default CoursePopup;