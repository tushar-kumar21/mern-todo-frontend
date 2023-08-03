import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { types } from '../redux/reducer';

const Items = ({ lists, updateItem, updateStatus, deleteItem , listItems}) => {

    const dispatch = useDispatch();    

    const {
        SET_UPDATE,
        SET_UPDATE_ITEMTEXT,        
        SET_UPDATE_DESCRIPTION,
        SET_UPDATE_CATEGORY,
        SET_UPDATE_DUE_DATE
    } = types;
    
    const {
        isUpdate,
        updateItemText,
        updateDescription,
        updateCategory,
        updateDueDate,        
    } = useSelector(state => state.custom);

    const updateiInpVal=(id)=>{
        dispatch({ type: SET_UPDATE, payload: id })
        let newEditItem = listItems.find((elem)=>{
            return elem._id === id
        })
        dispatch({ type: SET_UPDATE_ITEMTEXT, payload: newEditItem.title })
        dispatch({ type: SET_UPDATE_DESCRIPTION, payload: newEditItem.description })
        dispatch({ type: SET_UPDATE_CATEGORY, payload: newEditItem.category })
        dispatch({ type: SET_UPDATE_DUE_DATE, payload: newEditItem.dueDate })
    }

    const styles={
        form:'border-2 border-red-500 flex flex-col p-2 rounded-md gap-2 justify-center',
        input:'border-2 border-slate-500 rounded-md',
        formUpdBtn:'border-2 border-yellow-500 my-auto px-6 py-1 rounded-md font-semibold bg-yellow-500 text-white hover:bg-white transition-all duration-200 hover:text-yellow-500',
        cardBox:'border-2 border-green-600 h-48 w-fit flex flex-col items-center p-2 justify-center gap-1 rounded-md relative grow last:max-w-[550px]',
        cardUpdate:'border-2 border-yellow-500 my-auto px-6 py-1 rounded-md font-semibold bg-yellow-500 text-white hover:bg-white transition-all duration-200 hover:text-yellow-500',
        cardDel:'border-2 border-red-500 my-auto px-6 py-1 rounded-md font-semibold bg-red-500 text-white hover:bg-white transition-all duration-200 hover:text-red-500'
    }

    return (
        <div key={lists._id} className='flex grow shrink'>
            {
                isUpdate === lists._id
                    ?
                    (
                        <form className={styles.form} onSubmit={updateItem}>
                            <input type="text"
                                className={styles.input}
                                onChange={(e) => dispatch({ type: SET_UPDATE_ITEMTEXT, payload: e.target.value })}
                                value={updateItemText}
                            />
                            <input type="text"
                                className={styles.input}
                                onChange={(e) => dispatch({ type: SET_UPDATE_DESCRIPTION, payload: e.target.value })}
                                value={updateDescription}
                            />
                            <input type="text"
                                className={styles.input}
                                onChange={(e) => dispatch({ type: SET_UPDATE_CATEGORY, payload: e.target.value })}
                                value={updateCategory}
                            />
                            <input type="text"
                                className={styles.input}
                                onChange={(e) => dispatch({ type: SET_UPDATE_DUE_DATE, payload: e.target.value })}
                                value={updateDueDate}
                            />

                            <button className={styles.formUpdBtn}>Update</button>
                        </form>
                    )
                    :
                    (
                        <aside className={styles.cardBox}>
                            <span 
                            className={lists.status === 'ACTIVE' ? 'absolute top-1 right-4 text-green-500 text-xs font-semibold cursor-pointer' : 'absolute top-1 right-4 text-red-500 text-xs font-semibold cursor-pointer'} 
                            onClick={() => updateStatus(lists._id, lists.status)}>{lists.status}</span>

                            <div className="list-none"><span className='font-semibold'>Title:&nbsp;</span>
                                <span>{lists.title}</span></div>
                            <div>
                                <span className='font-semibold'>Description: </span>
                                <span>{lists.description}</span>
                            </div>
                            <div className="list-none flex justify-start"> <span className='font-semibold'>Category:&nbsp;</span>
                                <span>{lists.category}</span></div>
                            <div className="list-none flex justify-start"> <span className='font-semibold'>Due Date:&nbsp;</span>
                                <span>{lists.dueDate}</span></div>
                            <div className='flex gap-2'>
                                <button onClick={() => updateiInpVal(lists._id)} className={styles.cardUpdate}>update</button>
                                <button onClick={() => deleteItem(lists._id)} className={styles.cardDel}>delete</button>
                            </div>
                        </aside>
                    )
            }
        </div>
    )
}

export default Items;