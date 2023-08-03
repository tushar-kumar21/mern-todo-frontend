import { useEffect, useState } from 'react'
import axios from 'axios';
// import './MernComp.css'
import { useDispatch, useSelector } from "react-redux";
import { types } from "./redux/reducer"
import Items from './components/Items';

const styles = {
  addBtn: 'border-2 border-green-500 my-auto px-6 py-1 rounded-md font-semibold bg-green-500 text-white hover:bg-white transition-all duration-200 hover:text-green-500',
  input: 'border-2 border-slate-600 rounded-md outline-none px-2',
  select: 'border-2 border-black py-1 px-3 rounded-md mt-4 cursor-pointer mx-auto block'
}

function MernComp() {
  const [listItems, setListItems] = useState([]);

  const dispatch = useDispatch();

  const {
    SET_TITLE,
    SET_DESCRIPTION,
    SET_CATEGORY,
    SET_DUE_DATE,
    SET_UPDATE,
    SET_UPDATE_ITEMTEXT,
    SET_OPTIONS,
    SET_OPTIONS_CATEGORY,
    SET_OPTIONS_DUEDATE,
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
    updateDueDate,
    options,
    optionsCategory,
    optionsDueDate
  } = useSelector(state => state.custom);

  const addItem = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post('https://mern-todo-pge5.onrender.com/api/item', {
        title: title,
        description: description,
        category: category,
        dueDate: dueDate,
        status: status
      })

      setListItems(prev => [...prev, res.data]);
      dispatch({ type: SET_TITLE, payload: '' })
      dispatch({ type: SET_DESCRIPTION, payload: '' })
      dispatch({ type: SET_CATEGORY, payload: '' })
      dispatch({ type: SET_DUE_DATE, payload: '' })

    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get('https://mern-todo-pge5.onrender.com/api/items')
        setListItems(res.data);
      } catch (err) {
        console.log(err)
      }
    }
    console.log('yes')
    getData()
  }, [])

  const updateItem = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`https://mern-todo-pge5.onrender.com/api/item/${isUpdate}`, {
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
      dispatch({ type: SET_UPDATE_ITEMTEXT, payload: '' })
      dispatch({ type: SET_UPDATE, payload: '' })

    } catch (err) {
      console.log(err);
    }
  }

  const deleteItem = async (id) => {
    try {
      const res = await axios.delete(`https://mern-todo-pge5.onrender.com/api/item/${id}`);
      const newListItem = listItems.filter((item) => item._id !== id);
      setListItems(newListItem);
      console.log(res.data);
    } catch (err) {
      console.log(err)
    }
  }

  const updateStatus = async (id, status) => {
    try {
      const res = await axios.put(`https://mern-todo-pge5.onrender.com/api/item/${id}`, {
        status: status === 'COMPLETED' ? 'ACTIVE' : 'COMPLETED'
      });
      const updatedItemIndex = listItems.findIndex(item => item._id === id);
      const dd = listItems[updatedItemIndex].status = 'COMPLETED' ? 'ACTIVE' : 'COMPLETED'
      console.log(status)
      console.log(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className='p-2 py-4'>
      <form onSubmit={addItem} className='flex justify-center gap-5 px-6 items-center flex-wrap'>
        <div className='flex flex-col'>
          <label htmlFor="">Title</label>
          <input type="text" onChange={(e) => { dispatch({ type: SET_TITLE, payload: e.target.value }) }} value={title} className='border-2 border-slate-600 rounded-md outline-none px-2' />
        </div>
        <div className='flex flex-col'>
          <label htmlFor="">Description</label>
          <input type="text" onChange={(e) => dispatch({ type: SET_DESCRIPTION, payload: e.target.value })} value={description} className={styles.input} />
        </div>
        <div className='flex flex-col'>
          <label htmlFor="">Add DueDate</label>
          <input type="text" onChange={(e) => dispatch({ type: SET_DUE_DATE, payload: e.target.value })} value={dueDate} className={styles.input} />
        </div>
        <div className='flex flex-col'>
          <label htmlFor="">Category</label>
          <input type="text" onChange={(e) => dispatch({ type: SET_CATEGORY, payload: e.target.value })} value={category} className={styles.input} />
        </div>
        <button type="submit" className={styles.addBtn}>Add</button>
      </form>

      <div className='flex py-2 items-center px-8'>
        <label>STATUS</label>
        <select className={styles.select}
          onChange={(e) => dispatch({ type: SET_OPTIONS, payload: e.target.value })}>
          <option>ALL</option>
          <option>COMPLETED</option>
          <option>ACTIVE</option>
        </select>
        <label>CATEGORY</label>
        <select className={styles.select}
          onChange={(e) => dispatch({ type: SET_OPTIONS_CATEGORY, payload: e.target.value })}>
          <option>ALL</option>
          {
            listItems && listItems.map((val) => <option key={val._id}>{val.category}</option>)
          }
        </select>
        <label>DUEDATE</label>
        <select className={styles.select}
          onChange={(e) => dispatch({ type: SET_OPTIONS_DUEDATE, payload: e.target.value })}>
          <option>ALL</option>
          {
            listItems && listItems.map((val) => <option key={val._id}>{val.dueDate}</option>)
          }
        </select>
      </div>

      <div className="border-2 border-black rounded-md my-4 p-2 flex flex-wrap gap-2 justify-between">
        {
          listItems ? listItems.map((lists) => {
            return (
              (options === 'ALL' || lists.status === options) &&
                (optionsCategory === 'ALL' || lists.category === optionsCategory) &&
                (optionsDueDate === 'ALL' || lists.dueDate === optionsDueDate) ?
                <Items lists={lists} updateItem={updateItem} updateStatus={updateStatus} deleteItem={deleteItem} key={lists._id} listItems={listItems} />
                :
                options === 'ALL' &&
                <Items lists={lists} updateItem={updateItem} updateStatus={updateStatus} deleteItem={deleteItem} key={lists._id} listItems={listItems} />
            )
          })
          :
          <div className='border-2 border-red-500 w-[200px] h-[100px]'>Loading....</div>
        }
      </div>
    </div>
  )
}

export default MernComp;
