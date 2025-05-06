import { useState } from "react";
import { Users } from "../types/user.types";

type Props= {
    viewUser: Users
}
const UserProfile = ({viewUser}:Props) => {
        return (
            <p>
                {viewUser.age} yeas old, {viewUser.education}, {viewUser.gender}, {viewUser.skills.join(',')}, Text: {viewUser.bio} 
            </p>
        )
    
}

export default UserProfile