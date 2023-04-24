import {createAsyncThunk}
    from "@reduxjs/toolkit"
import * as service
    from "./openlib-services.js"

export const searchTitleThunk = createAsyncThunk(
    "openlib/search/title", async (title) => {
        const results = await service.searchByTitle(title);
        return results;
    }
);