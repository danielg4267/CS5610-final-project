import {createAsyncThunk}
    from "@reduxjs/toolkit"
import * as service
    from "./users-services.js"

export const loginThunk = createAsyncThunk(
    "user/login", async (credentials) => {
        const user = await service.login(credentials);
        return user;
    }
);

export const updateUserThunk = createAsyncThunk(
    "user/update", async (updateInfo) => {
        const user = await service.updateUser(updateInfo);
        return user;
    }
);



export const logoutThunk = createAsyncThunk(
    "user/logout", async () => {

        const response = await service.logout();
    }
);

export const registerThunk = createAsyncThunk(
    "user/register", async (credentials) => {
        const newUser = await service.register(credentials);
        return newUser;
    }
);

export const findUserByIDThunk = createAsyncThunk(
    "user/findUser", async (uid) => {
        const user = await service.findUserByID(uid);
        return user;
    }
);

export const profileThunk = createAsyncThunk(
    "user/profile", async () => {
        const user = await service.profile();
        return user;
    }
);
