import React from 'react'
import {FaTrashAlt, FaEdit} from 'react-icons/fa'
import { useGlobalContext } from './context';

const SingleItem = ({task}) => {
    const {deleteTask, checkTask, startEditTask} = useGlobalContext();
    const {name, completed, id} = task;
  
  return (
    <div className='single-item'>
      <input type="checkbox" checked={completed} onChange={() => checkTask(id)}/>
      <p style={{textTransform: 'capitalize', textDecoration: completed && 'line-through'}}>{name}</p>
      <div className="btn-container">
        <button className='btn edit-btn' onClick={() => startEditTask(id)}><FaEdit /></button>
        <button className='btn delete-btn' onClick={() => deleteTask(id)}><FaTrashAlt /></button>
      </div>
    </div>
  )
}

export default SingleItem