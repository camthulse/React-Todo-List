import React, {useState} from 'react'
import EditableField from './EditableField';
import '../css/dist/Todo.css'

export const Todo = (props) => {
    const value = props.val;
    const todoId = value.id;
    const [active, setActive] = useState(false);
    const todoStatus = value.status;
    const isChecked = value.status ? true : false;

    const changeText = (data) => {
        props.changeText(data, todoId);
        if(data.key === 'Enter'){
            setActive(false);
        }
    }


    return (
        <div className='todo'>
            <div className='todo-status_wrapper'>
                <input className='todo-status' 
                        type="checkbox" 
                        onInputChange
                        checked={isChecked} 
                        onChange={() => {props.changeStatus(todoId, todoStatus)}}/>
            </div>
            <div className='todo-text_wrapper'>
                <EditableField className='todo-text'
                                value={value.text} 
                                textChange = {changeText}
                                doubleClick={() => {setActive(true)}}
                                onBlur={() => {setActive(false)}}
                                active={active}
                                status={isChecked} />
            </div>
            <div className='todo-del_wrapper'>
                <button className='todo-del' 
                        onClick={() => {props.deleteTodo(todoId)}}>X</button>
            </div>
        </div>
    )
}

export default Todo;