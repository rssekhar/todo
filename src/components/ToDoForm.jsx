import { useState } from "react"
import ToDo from "./ToDo"

export default function ToDoForm() {

    // console.log(props);
    // const {isEditing} = props.editStatus;
    const [edit, setEdit] = useState({
        id: "",
        isEditing: false
    })
    const [task, setTask] = useState({
        taskname: '',
        isdone: ''
    })

    const [data, setData] = useState([])

    const [day, month, year] = new Date().toLocaleDateString().split('/')
    const change_date_format = `${year}-${month}-${day}`
    const time = new Date().toLocaleTimeString()
    const timeline = `${change_date_format} - ${time}`

    // Create Functionality
    const handleSubmit = (e) => {
        e.preventDefault()

        const newUser = {
            id: Number(data.length) + 1,
            newTaskName: task.taskname.toLowerCase().split(" ").map((eachWord) => eachWord.charAt(0).toUpperCase() + eachWord.slice(1)).join(" "),
            newTaskStatus: task.isdone,
            taskStartDate : timeline,
            taskEndDate : ''
        }
        setData([...data, newUser])
        setTask({
            taskname: '',
            isdone: ''
        })

    }

    const handleInput = (e) => {
        setTask({ ...task, [e.target.name]: e.target.value })
    }

    // Delete Functionlaity
    const handleDelete = (id) => {
        // console.log('delete', id)
        if (confirm("Are you Sure ?") === true) {
            setData(data.filter((eachVal) => eachVal.id !== id))
        }
        else {
            alert("Delete Cancelled")
        }

    }
    const handleEdit = (id) => {
        // console.log('edit', id)
        const newEdit = data.find((eachVal) => eachVal.id === id)
        if(!newEdit) return;

        setEdit({
            id: newEdit.id,
            isEditing: true
        })

        setTask({
            taskname: newEdit.newTaskName,
            isdone: newEdit.newTaskStatus
        })

    }
    // Update/Edit Functionality
    const handleEditSubmit = (e) => {
        e.preventDefault()
        const newUpdate = data.map((eachVal) => {
            if (eachVal.id === edit.id) {
                return {
                    id: edit.id,
                    newTaskName: task.taskname,
                    newTaskStatus: task.isdone,
                    taskStartDate : eachVal.taskStartDate,
                    taskEndDate: timeline
                }
            }
            else {
                return eachVal
            }
        })

        setData(newUpdate)
        setTask({
            taskname: '',
            isdone: ''
        })
        setEdit({
            id: '',
            isEditing: ''
        })

    }
    // console.log(data)
    return (
        <>

            <div className="container-fluid my-2">
                <div className="d-flex justify-content-between align-center">
                    <div>
                        <h3>ToDo</h3>
                    </div>
                    <button className="btn btn-info text-white" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">Add</button>

                    <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
                        <div className="offcanvas-header">
                            <h5 className="offcanvas-title" id="offcanvasRightLabel">{edit.isEditing ? "Edit Task" : "Add Task"}</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        <div className="offcanvas-body">
                            {
                                edit.isEditing ? (
                                    <form method="post" onSubmit={handleEditSubmit}>
                                        <div className="col my-2">
                                            <label htmlFor="taskname">Task Name</label>
                                            <input className="form-control" type="text" name="taskname" id="taskname" value={task.taskname} onChange={handleInput} placeholder="Task Name..." required />
                                        </div>
                                        <div className="col my-2">
                                            <label htmlFor="isdone">Status</label>
                                            <select className="form-control" name="isdone" id="isdone" value={task.isdone} onChange={handleInput} required>
                                                <option value="">Select</option>
                                                <option value="Completed">Completed</option>
                                                <option value="Not Completed">Not Completed</option>
                                            </select>
                                        </div>
                                        <div>
                                            <button type="submit" className="btn btn-info col my-2">Update</button>
                                        </div>
                                    </form>
                                ) : (
                                    <form method="post" onSubmit={handleSubmit}>
                                        <div className="col my-2">
                                            <label htmlFor="taskname">Task Name</label>
                                            <input className="form-control" type="text" name="taskname" id="taskname" value={task.taskname} onChange={handleInput} placeholder="Task Name..." required />
                                        </div>


                                        <div className="col my-2">
                                            <label htmlFor="isdone">Status</label>
                                            <select className="form-control" name="isdone" id="isdone" value={task.isdone} onChange={handleInput} required>
                                                <option value="">Select</option>
                                                <option value="Completed">Completed</option>
                                                <option value="Not Completed">Not Completed</option>
                                            </select>
                                        </div>
                                        <div>
                                            <button type="submit" className="btn btn-info text-white col my-2">Submit</button>
                                        </div>
                                    </form>
                                )
                            }
                        </div>
                    </div>
                </div>
                <div>
                    <ToDo userData={data} onEdit={handleEdit} onDelete={handleDelete} />
                </div>

            </div>


        </>
    )
}