

export default function ToDo({ userData,onEdit,onDelete }) {

    return (
        <>
            <div className="user_data" style={{display:'grid',gridTemplateColumns:"repeat(4,1fr)",gap:"10px",textAlign:"center"}}>

                {
                    userData.length > 0 ? (
                        userData.map((eachVal) => {
                            const { id, newTaskName, newTaskStatus,taskStartDate,taskEndDate } = eachVal
                            return (
                                <div key={id} className="card p-2 my-2">
                                    
                                    <h5>{newTaskName}</h5>

                                    <p>{newTaskStatus}</p>
                                    <span>{taskEndDate}</span>
                                    <div className="my-2">
                                        <button className="btn btn-info text-white" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight" onClick={() =>onEdit(id)}>Edit</button> &nbsp;
                                        <button className="btn btn-danger" onClick={() => onDelete(id)}>Delete</button>
                                    </div>
                                    <span style={{background:newTaskStatus === "Completed" ? "lightgreen" : "orange",color:"white"}}>{taskStartDate}</span>
                                </div>
                            )
                        })
                    ) : "No Data Found"
                }
            </div>
        </>
    )
}