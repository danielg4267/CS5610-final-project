import React from "react";


const ProfileSideComponent = ({user}) => {



    if(user) {
        return (
            <>
                <div className="card">
                    <img className="w-100 card-img-top" src={user.coverPic}/>

                    <div className="card-body">
                        <div className="position-relative" style={{"bottom": "60px"}}>
                            <img width={96} height={96}
                                 className="rounded-circle"
                                 src={user.profilePic}/>
                            <h3>{user.username}</h3>
                            <p>{user.bio}</p>
                        </div>
                        <i className="bi bi-calendar-event me-2"></i>
                        {
                            new Date(user.joinDate.slice(0, 10)).toLocaleDateString('en-us', {year:"numeric", month:"short", day:"numeric"})
                        }
                    </div>
                </div>
            </>


        )
    }
    else{
        return(
            <>
                <div className="card">
                    <img className="w-100 card-img-top" src="/images/coverPic0.jpg"/>

                    <div className="card-body">
                        <div className="position-relative" style={{"bottom": "60px"}}>
                            <img width={96} height={96}
                                 className="rounded-circle"
                                 src="/images/logoPic.jpg"/>
                            <h3>READDIT!</h3>
                            <p>Welcome to <b>READDIT!</b> Make sure to sign in to get the full experience.</p>
                        </div>
                        <i className="bi bi-calendar-event me-2"></i>
                        {
                            new Date().toLocaleDateString('en-us', {year:"numeric", month:"short", day:"numeric"})
                        }
                    </div>
                </div>
            </>
        )
    }
};
export default ProfileSideComponent;
//new Date(user.joinDate.slice(0, 10)).toLocaleDateString('en-us', {year:"numeric", month:"short", day:"numeric"})
//new Date(user.joinDate.slice(0, 10)).toLocaleDateString('en-us', {year:"numeric", month:"short", day:"numeric"})
