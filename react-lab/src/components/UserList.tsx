import { useState } from "react";
import { Users } from "../types/user.types";
import { v4 as uuidv4 } from 'uuid'
import UserForm from "./UserForm";
import UserProfile from "./UserProfile";

const UserList = () => {
    const [users, setUsers] = useState<Users[]>([
        { id: uuidv4(), fullname: 'John', age: 22, education: 'College', gender: 'Male', skills: ["Node"], bio:"hello"}
    ])

    const handleAddUser = (user: Omit<Users,'id'>) => {
        setUsers(prevState => 
        [...prevState, {...user,id:uuidv4()}]
        )
    }

    const handleUpdateUser = (editUser:Omit<Users,'id'>) => {
        setUsers( prevState => (
            prevState.map ( user => user.id === userEdit?.id ? {...user, ...editUser} : user
            )
        ))
    }


    const handleDelete = (id:string) => {
        setUsers(prevState => prevState.filter(user => user.id !== id))
    }
    const [userEdit, setUserEdit] = useState<Users|null>(null)
    const handleEdit = (id:string) => {
        const found = users.find(user => user.id === id)
        if(found){
            setUserEdit(found)
        }else {
            setUserEdit(null)
        }
    }

    const [viewId, setViewId] = useState<string|null>(null)
    const handleViewId =(id:string)=>{
        setViewId(id)
    }

    return (
        <div style={{padding:'2rem'}}>
            <fieldset><UserForm onAdd={handleAddUser} editUser={userEdit} onUpdate={handleUpdateUser}/></fieldset>

            <h2>User List</h2>
            { <ul>
                {users.map(user => 
                    <li key={user.id}>
                        {user.id}, {user.fullname}
                        <button onClick={()=> handleViewId(user.id)}>View</button>
                        <button onClick={(()=>handleEdit(user.id))}>Edit</button>
                        <button onClick={(() => handleDelete(user.id))}>Delete</button>
                        
                        {viewId === user.id && <UserProfile viewUser={user} />}
                    </li>
                )}
            </ul> }
        </div>
    )
}

export default UserList
