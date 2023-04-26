import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, Link} from "react-router-dom"
import {logoutThunk} from "../services/users-thunks";

const Navigation = () => {
    const {currentUser} = useSelector(state => state.userData)
    const [search, setSearch] = useState("");

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const searchOpenLib = async () => {
        navigate(`/search/${search}`)
    }
    const logout = () => {
        dispatch(logoutThunk())
    }

    return(
        <div className="row flex-container border-bottom m-4">

            <nav className="navbar border-bottom navbar-expand-lg navbar-light rounded bg-light ms-4">
                <Link className="col-2" to={"/"}>
                    <img width={96} height={96}
                         className="float-end rounded-circle"
                         src="/images/logoPic.jpg"/>
                </Link>
                <div className="d-none d-md-inline col-md-2"></div>
                <div className="col-3">

                    <div className="row">
                        <div className="col-2">
                            <select className="border-0 bg-light text-secondary h-100" name="category" id="category">
                                <option value="title">Title</option>
                                <option value="author">Author</option>
                                <option value="subject">Subject</option>
                            </select>
                        </div>
                        <div className="col-7 ms-2">
                            <input className="form-control" value={search}
                                   onChange={(e) => setSearch(e.target.value)}
                                   type="search" placeholder="Search" aria-label="Search"/>
                        </div>
                        <div className="col-2">
                            <button onClick={() => searchOpenLib(search)} className="btn btn-outline-success my-2 my-sm-0">Search</button>
                        </div>
                    </div>
                </div>
                <div className="col-3">
                    <div className="float-end">
                        {currentUser ? <>
                                <Link to={`/profile`}>
                                    <img src={`${currentUser.profilePic}`} width={64} height={64}
                                        className="rounded-circle p-1 me-4 border-secondary"
                                        style={{"border": "2px solid"}}/>
                                </Link>
                                        <button className="btn btn-outline-danger my-2 my-sm-0" onClick={() => logout()}>Logout</button></> :
                                       <button className="btn btn-outline-primary my-2 my-sm-0" onClick={() => navigate(`/login`)}>Login</button>}

                    </div>
                </div>
            </nav>

        </div>
    )
}

export default Navigation;