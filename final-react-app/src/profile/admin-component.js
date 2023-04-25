import {useSelector} from "react-redux";
import React, {useState, useEffect} from "react";
import {updateUserPrivileges} from "../services/users-services";

const AdminComponent = ({user}) => {

    const {currentUser} = useSelector((state) => state.userData);
    const [role, setRole] = useState(user.role);
    const [isBuyer, setIsBuyer] = useState(user.isBuyer);
    const [isAdmin, setIsAdmin] = useState(user.isAdmin);
    const [isEditing, setIsEditing] = useState(false);
    const submit = async (isSaved) => {
        var updatedUser = user;

        if(isSaved){

            var admin = isAdmin;
            if(role === 'admin'){admin = true;}
            else{admin = false;}
            setIsAdmin(admin);

            const updatedPrivileges = {role: role,
                                        isBuyer: isBuyer,
                                        isAdmin: admin,
                                        }

            const update = await updateUserPrivileges(updatedPrivileges, user._id);
            if(update){
                updatedUser = update;
            }
        }
        setIsEditing(false);
        setRole(updatedUser.role);
        setIsBuyer(updatedUser.isBuyer);
        setIsAdmin(updatedUser.isAdmin);
    }

    useEffect(()=>{
        setRole(user.role);
        setIsBuyer(user.isBuyer);
        setIsAdmin(user.isAdmin)
    }, [user])

    //todo: that select<> if-else statement is terrible, plz fix it lol. defaultValue attr would probs work

    return(
        <>
            <h2>User Information</h2>

            {isEditing ?
                <>
                <div className="mb-4">
                    <h5>Role</h5>
                    <select onChange={(e) => setIsBuyer(e.target.value === 'true')} className="rounded bg-light text-secondary" name="role" id="role">
                        {isBuyer ?
                            <>
                            <option selected value="true">Buyer</option>
                            <option value="false">Seller</option>
                            </>:
                            <>
                            <option value="true">Buyer</option>
                            <option selected value="false">Seller</option>
                            </>
                        }
                    </select>
                </div>
                <div className="mb-4">
                    <h5>Privilege</h5>
                    <select onChange={(e) => setRole(e.target.value)} className="rounded bg-light text-secondary" name="role" id="role">
                        {role === 'guest' &&
                            <>
                                <option selected value="guest">GUEST</option>
                                <option value="user">USER</option>
                                <option value="admin">ADMIN</option>
                            </>
                        }
                        {role === 'user' &&
                            <>
                                <option value="guest">GUEST</option>
                                <option selected value="user">USER</option>
                                <option value="admin">ADMIN</option>
                            </>
                        }
                        {role === 'admin' &&
                            <>
                                <option value="guest">GUEST</option>
                                <option value="user">USER</option>
                                <option selected value="admin">ADMIN</option>
                            </>
                        }
                    </select>
                </div>

                <button className="btn btn-outline-primary" onClick={() => submit(true)}>Save</button>
                <button className="btn btn-outline-danger ms-4" onClick={() => submit(false)}>Cancel</button>
                </>
                :
                <>
                    <h5>Role</h5>
                    <div className="mb-3">{isBuyer ? "Buyer" : "Seller"}</div>
                    <h5>Privilege</h5>
                    <div className="mb-3">{role.toUpperCase()}</div>
                    <>{!isAdmin &&
                        <button className="btn btn-outline-success" onClick={() => setIsEditing(true)}>Edit</button>}</>
                </>
            }

        </>
    )

}

export default AdminComponent;