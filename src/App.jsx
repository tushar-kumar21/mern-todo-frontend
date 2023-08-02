import { useEffect, useState } from 'react'
import axios from 'axios';
import './App.css'
import { useDispatch, useSelector } from "react-redux";
import { types } from "./redux/reducer"

function App() {  
  const [listItems, setListItems] = useState([]);  
  
  const dispatch = useDispatch();
  const { 
    SET_TITLE, 
    SET_DESCRIPTION, 
    SET_CATEGORY, 
    SET_DUE_DATE,     
    SET_UPDATE, 
    SET_UPDATE_ITEMTEXT, 
    SET_UPDATE_DESCRIPTION, 
    SET_UPDATE_CATEGORY, 
    SET_UPDATE_DUE_DATE 
  } = types;

  const { 
    title, 
    description, 
    category, 
    dueDate,     
    status, 
    isUpdate, 
    updateItemText, 
    updateDescription, 
    updateCategory, 
    updateDueDate 
  } = useSelector(state => state.custom);

  const addItem = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post('http://localhost:8000/api/item', {
        title: title,
        description: description,
        category: category,
        dueDate: dueDate,
        status: status
      })          

      setListItems(prev => [...prev, res.data]);
      dispatch({type: SET_TITLE, payload:''})
      dispatch({type: SET_DESCRIPTION, payload:''})
      dispatch({type: SET_CATEGORY, payload:''})
      dispatch({type: SET_DUE_DATE, payload:''})

    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get('http://localhost:8000/api/items')        
        setListItems(res.data);      
      } catch (err) {
        console.log(err)
      }
    }
    return () => getData()
  }, [])

  const updateItem = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`http://localhost:8000/api/item/${isUpdate}`, {
        title: updateItemText,
        description: updateDescription,
        category: updateCategory,
        dueDate: updateDueDate
      })
      console.log(res.data);
      const updatedItemIndex = listItems.findIndex(item => item._id === isUpdate);      
      const updateItem = listItems[updatedItemIndex].title = updateItemText;
      const updateDesc = listItems[updatedItemIndex].description = updateDescription;
      const updateCat = listItems[updatedItemIndex].category = updateCategory;
      const updateDD = listItems[updatedItemIndex].dueDate = updateDueDate;
      dispatch({type: SET_UPDATE_ITEMTEXT, payload:''})
      dispatch({type: SET_UPDATE, payload:''})      

    } catch (err) {
      console.log(err);
    }
  }

  const deleteItem = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:8000/api/item/${id}`);
      const newListItem = listItems.filter((item) => item._id !== id);      
      setListItems(newListItem);
      console.log(res.data);
    } catch (err) {
      console.log(err)
    }
  }   

  const updateStatus = async (id, status) =>{
    try{
      const res = await axios.put(`http://localhost:8000/api/item/${id}`,{
        status: status === 'COMPLETED' ? 'ACTIVE' : 'COMPLETED'
      });
      const updatedItemIndex = listItems.findIndex(item => item._id === id);    
      // listItems[updatedItemIndex].status = 'COMPLETED' ? 'ACTIVE' : 'COMPLETED'
      console.log(status)      
      console.log(res.data)
    }catch(err){
      console.log(err)
    }
  }  
    
  return (    
    <div>
      <form onSubmit={addItem} className='flex justify-center gap-5 px-6'>
        <div className='flex flex-col'>
          <label htmlFor="">Title</label>
          <input type="text" onChange={(e) =>{dispatch({type:SET_TITLE, payload:e.target.value})}} value={title} className='border-2 border-slate-600 rounded-md outline-none px-2' />
        </div>
        <div className='flex flex-col'>
          <label htmlFor="">Description</label>
          <input type="text" onChange={(e) => dispatch({type:SET_DESCRIPTION, payload:e.target.value})} value={description} className='border-2 border-slate-600 rounded-md outline-none px-2' />
        </div>
        <div className='flex flex-col'>
          <label htmlFor="">Add DueDate</label>
          <input type="text" onChange={(e) => dispatch({type:SET_DUE_DATE, payload:e.target.value})} value={dueDate} className='border-2 border-slate-600 rounded-md outline-none px-2' />
        </div>
        <div className='flex flex-col'>
          <label htmlFor="">Category</label>
          <input type="text" onChange={(e) => dispatch({type:SET_CATEGORY, payload:e.target.value})} value={category} className='border-2 border-slate-600 rounded-md outline-none px-2' />
        </div>
        <button type="submit" className='border-2 border-green-500 my-auto px-6 py-1 rounded-md font-semibold bg-green-500 text-white hover:bg-white transition-all duration-200 hover:text-green-500'>Add</button>
      </form>
      <div className="border-2 border-black rounded-md my-4 p-2 flex flex-wrap gap-2 justify-between">
        {
          listItems.map((lists) => {
            return (
              <div key={lists._id} className='flex grow shrink'>
                {
                  isUpdate === lists._id
                    ?
                    <form className='border-2 border-red-500 flex flex-col p-2 rounded-md gap-2' onSubmit={updateItem}>
                      <input type="text"                        
                        className='border-2 border-slate-500 rounded-md'
                        onChange={(e) => dispatch({type:SET_UPDATE_ITEMTEXT, payload:e.target.value})}
                        value={updateItemText}
                      />
                      <input type="text"
                        className='border-2 border-slate-500 rounded-md'
                        onChange={(e) => dispatch({type: SET_UPDATE_DESCRIPTION, payload:e.target.value})}
                        value={updateDescription}
                      />
                      <input type="text"
                        className='border-2 border-slate-500 rounded-md'
                        onChange={(e) =>  dispatch({type: SET_UPDATE_CATEGORY, payload:e.target.value})}
                        value={updateCategory}
                      />
                      <input type="text"
                        className='border-2 border-slate-500 rounded-md'
                        onChange={(e) => dispatch({type: SET_UPDATE_DUE_DATE, payload:e.target.value}) }
                        value={updateDueDate}
                      />

                      <button className='border-2 border-yellow-500 my-auto px-6 py-1 rounded-md font-semibold bg-yellow-500 text-white hover:bg-white transition-all duration-200 hover:text-yellow-500'>Update</button>
                    </form>
                    :
                    <aside className='border-2 border-green-600 h-48 w-fit flex flex-col items-center p-2 justify-center gap-1 rounded-md relative grow shrink'>
                      <span className ={lists.status === 'ACTIVE' ? 'absolute top-1 right-4 text-green-500 text-xs font-semibold cursor-pointer' :'absolute top-1 right-4 text-red-500 text-xs font-semibold cursor-pointer'} onClick={()=>updateStatus(lists._id, lists.status)}>{lists.status}</span>
                    
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
                      <button onClick={() => dispatch({type:SET_UPDATE, payload:lists._id})} className='border-2 border-yellow-500 my-auto px-6 py-1 rounded-md font-semibold bg-yellow-500 text-white hover:bg-white transition-all duration-200 hover:text-yellow-500'>update</button>
                      <button onClick={() => deleteItem(lists._id)} className='border-2 border-red-500 my-auto px-6 py-1 rounded-md font-semibold bg-red-500 text-white hover:bg-white transition-all duration-200 hover:text-red-500'>delete</button>
                      </div>
                    </aside>
                }
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default App
