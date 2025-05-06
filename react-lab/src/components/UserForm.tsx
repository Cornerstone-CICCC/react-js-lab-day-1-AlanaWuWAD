import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { Users } from '../types/user.types'

type Props = {
    editUser: Users | null
    onAdd: (user: Omit<Users, 'id'>) => void
    onUpdate: (user: Users) => void
}

const UserForm = ({ onAdd, editUser, onUpdate }: Props) => {
    const [formData, setFormData] = useState<Users>({
        id: '',
        fullname: '',
        age: 0,
        education: '',
        gender: '',
        skills: [],
        bio: ''
    })

    useEffect(()=>{
        if(editUser){
            setFormData({
                id: editUser?.id,
                fullname: editUser?.fullname,
                age: editUser?.age,
                education: editUser?.education,
                gender: editUser?.gender,
                skills: editUser?.skills,
                bio: editUser?.bio
            })
        }
    },[editUser])

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = e.target
        setFormData(prevState => {
            const updatedSkills = checked ? [...prevState.skills, value] : prevState.skills.filter(level => level !== value)

            return {
                ...prevState,
                skills: updatedSkills
            }
        })
    }

    const handleAddUser = () => {
        if(editUser){
            onUpdate(formData)
        } else{
            onAdd(formData)
        }
        setFormData({
            id: '',
            fullname: '',
            age: 0,
            education: '',
            gender: '',
            skills: [],
            bio: ''
        })
    }

    const handleClear = () => {
        setFormData({
            id: '',
            fullname: '',
            age: 0,
            education: '',
            gender: '',
            skills: [],
            bio: ''
        })
    }

    return (
        <>
            <h1>UserForm</h1>
            <form >
                <label>Full Name
                    <input type="text" name='fullname' value={formData.fullname} onChange={handleChange} placeholder='Fullname' />
                </label>

                <label>Age
                    <input type="number" name='age' value={formData.age} onChange={handleChange} placeholder='Age' />
                </label>
                <br />
                <label>Education
                    <select name="education" value={formData.education} onChange={handleChange} >
                        <option value="" >Select education</option>
                        <option value="College">College</option>
                        <option value="High school">High school</option>
                        <option value="Grade school">Grade school</option>
                    </select>
                </label>
                <br />
                <label >Gender</label>
                <label >
                    <input type="radio" name='gender' value="Male" checked={formData.gender === "Male"} onChange={handleChange} />Male </label>
                <label ><input type="radio" name='gender' value="Female" checked={formData.gender === "Female"} onChange={handleChange} />Female</label>
                <label ><input type="radio" name='gender' value="Other" checked={formData.gender === "Other"} onChange={handleChange} />Other
                </label>
                <br />
                <label htmlFor="">Skills
                    <input type="checkbox" name='skills' value="TypeScript" checked={formData.skills.includes("TypeScript")} onChange={handleCheckboxChange} />TypeScript
                    <input type="checkbox" name='skills' value="React" checked={formData.skills.includes("React")} onChange={handleCheckboxChange} />React
                    <input type="checkbox" name='skills' value="Node" checked={formData.skills.includes("Node")} onChange={handleCheckboxChange} />Node
                    <input type="checkbox" name='skills' value="NoSQL" checked={formData.skills.includes("NoSQL")} onChange={handleCheckboxChange} />NoSQL
                </label>
                <label>
                    <textarea name="bio" value={formData.bio} onChange={handleChange}></textarea>
                </label>
            </form>
            <button onClick={handleAddUser}>Add User</button>
            <button onClick={handleClear}>Clear</button>

        </>

    )
}

export default UserForm