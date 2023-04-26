import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {searchByTitle} from "../services/openlib-services";
import ResultBasic from "./result-basic";

const Search = () => {
    const {search} = useParams();
    const [results, setResults] = useState([]);
    const fetchResults = async () => {
        const response = await searchByTitle(search);
        setResults(response);

    }
    useEffect(() => {
        fetchResults();
    }, [search]);
    return (
        <>
            <h4>Search "{search}"</h4>
            <div className="list-group">
                {
                    results &&
                    results.map(work =>
                        <ResultBasic work={work}/>
                    )
                }
            </div>
        </>
    )
}

export default Search;