import React, {useEffect, useState} from "react";
import {getAuthorDetailsByID, getBookDetailsByID, searchByTitle} from "../services/openlib-services.js";

const AuthorComponent = (authorObj) => {

    const [author, setAuthor] = useState({});

    const fetchAuthorDetails = async () => {
        const authorKey = authorObj["author"]["author"]["key"].split('/')[2];
        const response = await getAuthorDetailsByID(authorKey);
        setAuthor(response);
    }
    useEffect(() => {
        fetchAuthorDetails();
    }, []);

    return(
        <h5>
            {author.name}
        </h5>
    )

}

export default AuthorComponent;