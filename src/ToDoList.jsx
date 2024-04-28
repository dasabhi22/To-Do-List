import React, { useState, useEffect } from "react";

function ToDoList() {
    const [task, setTask] = useState(() => {
        const savedTasks = localStorage.getItem("tasks");
        return savedTasks ? JSON.parse(savedTasks) : [];
    });
    const [newTask, setNewTask] = useState("");
    const [editIndex, setEditIndex] = useState(null); // State to track the index of the task being edited

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(task));
    }, [task]);
   
    function handleInputChange(event) {
        setNewTask(event.target.value);
    }
    
    function addTask() {
        if (newTask.trim() !== "") {
            if (editIndex !== null) {
                // If an edit is in progress, update the task at the editIndex
                const updatedTasks = [...task];
                updatedTasks[editIndex] = newTask;
                setTask(updatedTasks);
                setEditIndex(null); // Reset editIndex after editing
            } else {
                setTask(t => [...t, newTask]);
            }
            setNewTask("");
        }
    }
    
    function deleteTask(index) {
        const updatedTask = task.filter((_, i) => i !== index);
        setTask(updatedTask);
    }
 
    function moveUpTask(index) {
        if (index > 0) {
            const updatedTask = [...task];
            [updatedTask[index], updatedTask[index - 1]] = [updatedTask[index - 1], updatedTask[index]];
            setTask(updatedTask);
        }
    }
    
    function moveDownTask(index) {
        if (index < task.length - 1) {
            const updatedTask = [...task];
            [updatedTask[index], updatedTask[index + 1]] = [updatedTask[index + 1], updatedTask[index]];
            setTask(updatedTask);
        }
    }

    function handleKeyDown(event) {
        if (event.key === "Enter") {
            addTask();
        }
    }

    function editTask(index) {
        // Set the text of the task to the input field when editing
        setNewTask(task[index]);
        setEditIndex(index); // Set the editIndex to indicate an ongoing edit
    }

    return (
        <div className="to-do-list">
            <h1>To-Do-List</h1>
            <div>
                <input type="text" placeholder="Enter a Task...." value={newTask} onChange={handleInputChange} onKeyDown={handleKeyDown}></input>
                {/* Toggle between "Add" and "Edit" buttons based on whether an edit is in progress */}
                <button className="add-button" onClick={addTask} title={editIndex !== null ? "Edit task" : "Add task"}>{editIndex !== null ? "Edit" : "Add"}</button>
            </div>
            <ol>
                {task.map((taskText, index) => 
                    <li key={index}>
                        <span className="text">{taskText}</span>
                        <button className="delete-button" onClick={() => deleteTask(index)} title="Delete"><i className="fa-solid fa-trash"></i></button>
                        <button className="edit-button" onClick={() => editTask(index)} title="Edit"><i className="fa-solid fa-pen-to-square"></i></button>
                        <button className="move-button" onClick={() => moveUpTask(index)} title="Move Up">⬆️</button>
                        <button className="move-button" onClick={() => moveDownTask(index)} title="Move Down">⬇️</button>
                       
                        
                    </li>
                )}
            </ol>
        </div>
    );
}

export default ToDoList;
