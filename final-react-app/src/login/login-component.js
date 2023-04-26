import {loginThunk} from "../services/users-thunks";
import React, {useState} from "react";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";


const LoginComponent = () => {
    const {currentUser} = useSelector((state) => state.userData);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const login = (username, password) => {
        dispatch(loginThunk({username, password}))
        setUsername("");
        setPassword("");

    }

        return (
            <>{!currentUser ?
                <>
                    <h3>Login</h3>
                    <form>
                        <div className="row mb-2">
                            <div className="form-group col-7">
                                <label htmlFor="username">Username</label>
                                <input type="text" className="form-control"
                                       id="username"
                                       value={username}
                                       onChange={(e) => setUsername(e.target.value)}
                                       aria-describedby="username" placeholder="Enter username"/>
                                <small id="username" className="form-text text-muted">Case sensitive</small>
                            </div>
                        </div>
                        <div className="row">
                            <div className="form-group mb-2 col-7">
                                <label htmlFor="password">Password</label>
                                <input className="form-control"
                                       id="password"
                                       type="password"
                                       value={password}
                                       onChange={(e) => setPassword(e.target.value)}
                                       placeholder="Password"/>
                            </div>
                            <div className="col-3 mt-4">
                                <div className="float-end">
                                    <button type="button" className="btn btn-outline-primary my-2 my-sm-0" onClick={() => login(username, password)}>Login</button>
                                </div>
                            </div>
                        </div>
                    </form>
                    <div>
                        <div className="mt-2"><b>New user? Sign up <Link to={"/register"}>here</Link></b></div>
                    </div>
                </>
                :
                <>
                    <div className="card">
                        <img className="w-100 card-img-top" src="/images/coverPic0.jpg"/>

                        <div className="card-body">
                            <div className="position-relative" style={{"bottom": "60px"}}>
                                <img width={96} height={96}
                                     className="rounded-circle"
                                     src="/images/logoPic.jpg"/>
                                <h3>READDIT!</h3>
                                <p>Welcome to <b>READDIT!</b> Navigate <Link to="/" className="text-decoration-none text-dark"><b>home</b></Link> to see your recommended books, or to <Link to="/profile" className="text-decoration-none text-dark"><b>your profile.</b></Link></p>
                            </div>
                            <i className="bi bi-calendar-event me-2"></i>
                            {
                                new Date().toLocaleDateString('en-us', {year:"numeric", month:"short", day:"numeric"})
                            }
                        </div>
                    </div>
                </>
            }</>


        )
}

export default LoginComponent;