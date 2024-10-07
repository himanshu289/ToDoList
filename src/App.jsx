import React, { useState } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [deadline, setDeadline] = useState('');

  const addTask = () => {
    if (inputValue.trim() === '') return;
    const newTask = {
      text: inputValue,
      time: new Date().toLocaleString(),
      deadline: deadline ? new Date(deadline).toLocaleString() : null,
      isCompleted: false
    };
    setTasks([...tasks, newTask]);
    setInputValue('');
    setDeadline('');
  };

  const removeTask = (indexToRemove) => {
    const newTasks = tasks.filter((_, index) => index !== indexToRemove);
    setTasks(newTasks);
  };

  const completeTask = (indexToComplete) => {
    const taskToComplete = tasks[indexToComplete];
    taskToComplete.isCompleted = true;

    setCompletedTasks([...completedTasks, taskToComplete]);
    removeTask(indexToComplete);
  };

  const deleteCompletedTask = (indexToDelete) => {
    const newCompletedTasks = completedTasks.filter((_, index) => index !== indexToDelete);
    setCompletedTasks(newCompletedTasks);
  };

  return (
    <div className="todo-container">
      <h1>To-do List</h1>
      <div className="input-container">
        <input
          className='addTask'
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Add task..."
        />
        <input
          className='dateTime'
          type="datetime-local"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          placeholder="Set deadline..."
        />
        <button className="add"onClick={addTask}>Add</button>
      </div>
      <h2>Active Tasks</h2>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            <div>
              <span>{task.text}</span>
              <br />
              <small>Created: {task.time}</small>
              {task.deadline && (
                <>
                  <br />
                  <small>Deadline: {task.deadline}</small>
                </>
              )}
            </div>
            <div className="task-buttons">
              <button onClick={() => completeTask(index)}>Complete</button>
              <button onClick={() => removeTask(index)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>

      {completedTasks.length > 0 && (
        <>
          <h2>Completed Tasks</h2>
          <ul>
            {completedTasks.map((task, index) => (
              <li key={index} className="completed-task">
                <div>
                  <span>{task.text}</span>
                  <br />
                  <small>Completed on: {task.time}</small>
                </div>
                <button onClick={() => deleteCompletedTask(index)}>Delete</button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default App;
