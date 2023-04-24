import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {loginThunk, registerThunk, updateUserThunk} from "../services/users-thunks";
import {register} from "../services/users-services";
import {useNavigate} from "react-router-dom";

const EditProfileDetailsComponent = () => {

    const {currentUser} = useSelector(state => state.userData);

    const [username, setUsername] = useState("");
    const [validUsername, setValidUsername] = useState("");
    const [invalidUsernameFeedback, setInvalidUsernameFeedback] = useState("Required.");

    const [password, setPassword] = useState("");
    const [validPassword, setValidPassword] = useState("");

    const [phone, setPhone] = useState("");
    const [validPhone, setValidPhone] = useState("");

    const [email, setEmail] = useState("");
    const [validEmail, setValidEmail] = useState("");

    const [birthday, setBirthday] = useState("2021-12-31");

    const [bio, setBio] = useState("");
    const [extendedBio, setExtendedBio] = useState("");

    const [profilePic, setProfilePic] = useState("/images/noProfPic.png");
    const [coverPic, setCoverPic] = useState("/images/noCoverPic.jpg");


    const dispatch = useDispatch();
    const navigate = useNavigate();


    const updateUsername = (input) =>{
        setUsername(input);
        if(input.length === 0){
            setValidUsername("is-invalid");
            setInvalidUsernameFeedback("Required.");
        }
        else{setValidUsername("is-valid");}
    }
    const updatePassword = (input) =>{
        setPassword(input);
        var pattern = /^(?=.{5,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[\W])/;
        if(input.match(pattern)){
            setValidPassword("is-valid")
        }
        else{
            setValidPassword("is-invalid")
        }
    }

    const updatePhone = (input) =>{
        setPhone(input);
        var pattern = /^\d{3}-\d{3}-\d{4}$/;
        if(input.match(pattern)){
            setValidPhone("is-valid")
        }
        else{
            setValidPhone("is-invalid")
        }
    }
    const updateEmail = (input) =>{
        var pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
        setEmail(input);
        if(input.match(pattern)){
            setValidEmail("is-valid");
        }
        else{
            setValidEmail("is-invalid");
        }
    }

    const submit = async () => {
        if(currentUser){
            updateUser();
        }
        else{
            registerUser();
        }
    }

    const updateUser = async () => {

        if (validUsername && validPassword && validPhone && validEmail) {
            const user = {
                username: username,
                password: password,
                phone: phone,
                email: email,
                birthday: birthday,
                bio: bio,
                extendedBio: extendedBio,
                profilePic: profilePic,
                coverPic: coverPic
            }
            const response = await dispatch(updateUserThunk(user))
            if (!response.payload) {
                console.log(response);
            } else {
                navigate("/profile");
            }

        }
    }
    const registerUser = async () => {

        if(validUsername && validPassword && validPhone && validEmail){
            const user = {
                username: username,
                password: password,
                phone: phone,
                email: email,
                birthday: birthday,
                bio: bio,
                extendedBio: extendedBio,
                profilePic: profilePic,
                coverPic: coverPic
            }
            const response = await dispatch(registerThunk(user))

            if(!response.payload){
                setValidUsername("is-invalid");
                setInvalidUsernameFeedback("Username taken.");
            }
            else{
                navigate("/");
            }

        }
    }

    useEffect(() => {
        if(currentUser){
            updateUsername(currentUser.username)
            updatePassword(currentUser.password)
            updatePhone(currentUser.phone);
            updateEmail(currentUser.email);
            setBirthday(currentUser.birthday);
            setBio(currentUser.bio);
            setExtendedBio(currentUser.extendedBio);
            setProfilePic(currentUser.profilePic);
            setCoverPic(currentUser.coverPic);
        }
    }, [currentUser])

    return(
        <>
            {currentUser ? <h3>Edit Profile</h3> : <h3>Register</h3> }
            <form>
                <div className="form-row">
                    <div className="col-4 mb-3">
                        <label htmlFor="username">Username</label>
                        {currentUser ?
                            <input type="text" className={`form-control ${validUsername}`} id="username"
                                              placeholder="Username" value={username} onChange={(e) => updateUsername(e.target.value) } readOnly/>
                        :
                            <input type="text" className={`form-control ${validUsername}`} id="username"
                                   placeholder="Username" value={username} onChange={(e) => updateUsername(e.target.value) } required/>}
                            <div className="invalid-feedback">
                                {invalidUsernameFeedback}
                            </div>
                    </div>
                    <div className="col-4 mb-3">
                        <label htmlFor="password">Password</label>
                        <input type="password" className={`form-control ${validPassword}`} id="password"
                               placeholder="Password" value={password} onChange={(e) => updatePassword(e.target.value)} required/>
                            <div className="valid-feedback">
                                Looks good!
                            </div>
                        <div className="invalid-feedback">
                            Password should be at least 5 characters long and contain one uppercase letter, lowercase letter, digit, and special character.
                        </div>
                    </div>
                    <div className="col-4 mb-3">
                        <label htmlFor="phone">Phone Number</label>
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="inputGroupPrepend3">+1</span>
                            </div>
                            <input type="text" className={`form-control ${validPhone}`} value={phone} id="phone"
                                   placeholder="xxx-xxx-xxxx" aria-describedby="inputGroupPrepend3" onChange={(e) => updatePhone(e.target.value)} required/>
                                <div className="invalid-feedback">
                                    Please enter a valid phone number.
                                </div>
                        </div>
                    </div>
                </div>
                <div className="form-row">
                    <div className="col-6 mb-3">
                        <label htmlFor="email">Email</label>
                        <input type="email" className={`form-control ${validEmail}`} value={email} id="email"
                               placeholder="email@domain.com" onChange={(e) => updateEmail(e.target.value)} required/>
                            <div className="invalid-feedback">
                                Please provide a valid email.
                            </div>
                    </div>
                    <div className="col-3 mb-3">
                        <label htmlFor="birthday">Birthday</label>
                        {
                            currentUser ?
                            <input type="date" className="form-control" id="birthday"
                                   max={"2021-12-31"}
                                   value={(new Date(currentUser.joinDate.slice(0, 10))).toISOString().split('T')[0]}
                                   onChange={(e) => setBirthday(e.target.value)} readOnly/>
                                :
                                <input type="date" className="form-control" id="birthday"
                                       max={"2021-12-31"} value={birthday} onChange={(e) => setBirthday(e.target.value)} required/>
                        }

                    </div>
                    <div className="col-6 mb-3">
                        <label htmlFor="blurb">Blurb</label>
                        <textarea rows={3} cols={1} value={bio} maxLength={256} className="form-control" id="blurb"
                                  onChange={(e) => setBio(e.target.value)}
                                  placeholder='A short snippet about yourself. Not required for registration.'/>
                    </div>
                    <div className="col-8 mb-3">
                        <label htmlFor="bio">About You</label>
                        <textarea rows={5} cols={1} value={extendedBio} maxLength={1024} className="form-control" id="bio"
                                  onChange={(e) => setExtendedBio(e.target.value)}
                                  placeholder='A longer bio about yourself. A good place to list your favorite books! Not required for registration.'/>
                    </div>
                    <div className="col-8 mb-3">
                        <label htmlFor="profilePic">Profile Picture</label><br/>
                        <input type="file" onChange={(e) => setProfilePic(e.target.value)} className="form-control-file" id="profilePic"/>
                    </div>
                    <div className="col-8 mb-4">
                        <label htmlFor="coverPic">Banner Picture</label><br/>
                        <input type="file" onChange={(e) => setCoverPic(e.target.value)} className="form-control-file" id="coverPic"/>
                    </div>
                </div>
            </form>
            <button className="btn btn-outline-primary my-2 my-sm-0" onClick={() => submit()}>{currentUser ? "Update" : "Register"}</button>
        </>
    )
}

export default EditProfileDetailsComponent;