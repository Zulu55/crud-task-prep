import React, { useState, useEffect } from 'react'
import { isEmpty } from 'lodash'
import { getCollection, addDocument, updateDocument, deleteDocument } from './actions'

const App = () => {
    const [task, setTask] = useState("")
    const [tasks, setTasks] = useState([])
    const [editMode, setEditMode] = useState(false)
    const [id, setId] = useState("")
    const [error, setError] = useState(null)

    useEffect(() => {
        (async() => {
            const result = await getCollection("tasks")
            if (result.statusResponse) {
                setTasks(result.data)
            }
        })()
    }, [])

    const addTask = async(e) => {
        e.preventDefault()

        if (!validateData()) {
            return
        }

        const result = await addDocument("tasks", { task })
        if (!result.statusResponse) {
            setError(result.error)
            return
        }

        setTasks([...tasks, { id: result.data.id, task }])
        setTask("")
    }

    const saveTask = async(e) => {
        e.preventDefault()

        if (!validateData()) {
            return
        }

        const result = await updateDocument("tasks", id, { task })
        if (!result.statusResponse) {
            setError(result.error)
            return
        }

        const editedTasks = tasks.map(item => item.id === id ? { id, task} : item)
        setTasks(editedTasks)
        setEditMode(false)
        setTask("")
    }

    const validateData = () => {
        setError(null)
        if (isEmpty(task)) {
            setError("Debes ingresar una tarea.")
            return false
        }
        return true
    }

    const removeTask = async(id) => {
        const result = await deleteDocument("tasks", id)
        if (!result.statusResponse) {
            setError(result.error)
            return
        }

        const filteredTask = tasks.filter(task => task.id !== id)
        setTasks(filteredTask)
    }

    const editTask = (task) => {
        setEditMode(true)
        setTask(task.task)
        setId(task.id)
    }

    return (
        <div className="container mt-5">
            <h1 className="text-center">Tareas</h1>
            <hr/>
            <div className="row">
                <div className="col-8">
                    <h4 className="text-center">Lista de tareas</h4>
                    <ul className="list-group">
                        {
                            isEmpty(tasks) ? (
                                <li className="list-group-item">No hay tareas</li>
                            ) : (
                                tasks.map((task) => (
                                    <li className="list-group-item" key={task.id}>
                                        <span className="lead">{task.task}</span>
                                        <button 
                                            className="btn btn-danger btn-sm float-right mx-2"
                                            onClick={() => removeTask(task.id)}
                                        >
                                            Eliminar
                                        </button>
                                        <button 
                                            className="btn btn-warning btn-sm float-right"
                                            onClick={() => editTask(task)}
                                        >
                                            Editar
                                        </button>
                                    </li>
                                ))
                            )
                        }
                    </ul>
                </div>
                <div className="col-4">
                    <h4 className="text-center">
                        {
                            editMode ? "Editar Tarea" : "Crear Tarea"
                        }
                    </h4>
                    <form onSubmit=
                        {
                            editMode ? saveTask : addTask
                        }
                    >
                        {
                            error && <span className="text-danger">{error}</span>
                        }
                        <input 
                            type="text" 
                            className="form-control mb-2"
                            placeholder="Ingrese tarea..."
                            onChange={(e) => setTask(e.target.value)}
                            value={task}
                        />
                        <button 
                            className={
                                editMode 
                                    ? "btn btn-warning btn-block" 
                                    : "btn btn-dark btn-block"
                            }
                            type="submit"
                        >
                            {
                                editMode ? "Guardar": "Agregar"
                            }
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default App