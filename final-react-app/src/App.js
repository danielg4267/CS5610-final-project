import React from "react";

import {Routes, Route} from "react-router";


import { configureStore }
  from '@reduxjs/toolkit';
import {Provider} from "react-redux";
import usersReducer from "./reducers/users-reducer";
import Explore from "./explore";
import {BrowserRouter} from "react-router-dom";
import Navigation from "./navigation";
import ProfileBasicSelf from "./profile/profile-basic-self.js";
import ProfileBasicOther from "./profile/profile-basic-other.js";
import Search from "./search";
import ResultDetailed from "./search/result-detailed.js";
import LoadProfile from "./profile/load-profile";
import ProfileDetailedSelf from "./profile/profile-detailed-self";
import ProfileDetailedOther from "./profile/profile-detailed-other";
import LoginComponent from "./login/login-component";
import Highlight from "./highlight";
import RegisterComponent from "./login/register-component";
import EditProfile from "./profile/edit-profile";


const store = configureStore({
  reducer: {userData: usersReducer}});


function ReaddIt() {
  return (
      <div className="bg-light pb-5">



        <BrowserRouter>
          <Provider store={store}>
              <LoadProfile>
                  <div className="row">
                          <Navigation/>

                  </div>
                <div className="m-4 row">
                    <div className="d-none d-lg-inline col-lg-1"></div>
                  <div className="d-none d-lg-inline col-lg-2">
                    <Routes>
                        <Route index path="/*" element={<ProfileBasicSelf/>}/>
                        <Route path="/profile/edit" element={<></>}/>
                        <Route path="/profile/:uid" element={<ProfileBasicOther/>}/>
                    </Routes>
                  </div>
                  <div className="col-md-8 col-lg-5">
                      <Routes>
                          <Route index path="/*" element={<Explore/>}/>
                          <Route path="/login" element={<LoginComponent/>}/>
                          <Route path="/register" element={<RegisterComponent/>}/>
                          <Route path="/profile" element={<ProfileDetailedSelf/>}/>
                          <Route path="/profile/edit" element={<EditProfile/>}/>
                          <Route path="profile/:uid" element={<ProfileDetailedOther/>}/>
                          <Route path="/search/:search" element ={<Search/>}/>
                          <Route path="/details/works/:key" element={<ResultDetailed/>}/>
                      </Routes>
                  </div>
                  <div className="d-none d-md-inline col-md-3">
                      <Routes>
                          <Route path="/*" element={<Highlight/>}/>
                      </Routes>
                  </div>
                </div>
              </LoadProfile>
          </Provider>
        </BrowserRouter>

      </div>



  );

}

export default ReaddIt;