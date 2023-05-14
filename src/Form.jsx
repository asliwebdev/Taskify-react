import React from 'react'
import { useGlobalContext } from './context'
import { toast } from 'react-toastify';

const Form = () => {
    const {setTask, task, addTask, IsEditing, saveEditedTask, setIsEditing} = useGlobalContext();

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!task) {
            toast.error("Please provide task first");
            return
        }
        if(!IsEditing) {
            addTask(task);
            setTask({
              name: '',
              completed: false
            });
        }
       setIsEditing(false);
    }

    const handleChange = (e) => {
        const value = e.target.value;
        setTask(prevTask => {
          return  {...prevTask, name: value}
        })
    }

  return (
        <form onSubmit={handleSubmit}>
            <h4>Make It Done!</h4>
            <div className="form-control">
              <input type="text" className='form-input' placeholder='e.g. coding' onChange={handleChange} value={task.name}/>
              {IsEditing ? <button className='form-btn' onClick={() => saveEditedTask(task.id)}>Edit Task</button> : <button className='form-btn'>Add Task</button>}
            </div>
        </form>
  )
}

export default Form