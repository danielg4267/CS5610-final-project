import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom"


const SearchBarComponent = () => {
    const [search, setSearch] = useState("");
    const navigate = useNavigate();
    const searchOpenLib = async () => {
        //const response = await searchByTitle(search)
        navigate(`/search/${search}`)
    }

    return(
        <div className="search">
            <input type="text"
                   value={search}
                   onChange={(e) => setSearch(e.target.value)}/>
            <button onClick={() => searchOpenLib(search)}>Search</button>
        </div>
    )
}

export default SearchBarComponent;