import React, {useState} from 'react';
import Axios from 'axios';
import Todo from './components/Todo';
import './css/dist/App.css';

function App(){
    //Properties
    const [text, setText] = useState("");
    const [todos, setTodos] = useState([]);
    //Methods
        //Get all Todos from Todo List
    const getTodos = () => {
        Axios.get(`http://localhost:3001/todos`).then((response) => {
            setTodos(response.data);
        });
    }
        //Add Todo to Todo List
    const addTodo = () => {
        document.getElementById("todo-text").value = '';
        Axios.post(`http://localhost:3001/add`, {
            text: text,
            status: 0
        }).then(() => {
            setTodos([
                ...todos,
                {
                    text: text,
                    status: 0
                }
            ]);
        });
    }
        //Delete Todo from Todo List
    const deleteTodo = (id) => {
        Axios.delete(`http://localhost:3001/delete/${id}`).then((response) => {
            setTodos(
                todos.filter((val) => {
                    return val.id != id;
                })
            );
        });
    }
        //Change Status of Todo in Todo List
    const changeStatus = (id, newStatus) => {
        if(newStatus == 1){
            newStatus = 0;
        }else{
            newStatus = 1;
        }
        Axios.put(`http://localhost:3001/update`, {
            id: id,
            status: newStatus,
        });
    }
     //Change Text of Todo in Todo List
    const changeText = (e, id) => {
        if(e.key === 'Enter' && e.target.value != ''){
            const newText = e.target.value;
            
            Axios.put(`http://localhost:3001/change`, {
                id: id,
                text: newText
            });
        }
    }

    getTodos();
    //Return
    return(
    <div id="app-wrapper">
        <div id="todo-wrapper">
            <div id="todo-add">
                <div id="todo-input">
                    <label htmlFor="text">Todo:</label>
                    <input type="text" name="text" id="todo-text" onChange={(e) => {setText(e.target.value)}}/>
                </div>
                <button type="submit" onClick={addTodo}>Add Todo</button>
            </div>
            <div id="todo-list">
                {
                    todos.map((val, key) => { 
                        return(
                            <Todo className='todo-wrapper' changeText={changeText} key={key} val={val} deleteTodo={deleteTodo} changeStatus={changeStatus}/>
                        );
                    })
                }
            </div>
        </div>
    </div>
    );
}

export default App;