import React from 'react'
import { useGlobalContext } from './context'
import SingleItem from './SingleItem';

const Items = () => {
    const {tasks} = useGlobalContext();
  return (
    <div className='items'>
      {tasks.map(task => {
        return <SingleItem key={task.id} task={task}/>
      })}
    </div>
  )
}

export default Items