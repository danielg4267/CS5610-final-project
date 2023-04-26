import {Link} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {getRecommended, getTrending} from "../services/openlib-services";


const COVER_SOURCE = "https://covers.openlibrary.org/b/id"

const Explore = () => {
    const {currentUser} = useSelector(state => state.userData)
    const [recommended, setRecommended] = useState([]);
    const [activeRec, setActiveRec] = useState(null);

    const fetchRecommended = async () => {
        if(currentUser){
            var response = await getRecommended();
            if(response.length === 0){
               response = await getTrending();
            }
            setRecommended(response);
        }
        else{
            const response = await getTrending();
            setRecommended(response);
        }

    }
    useEffect(() => {
        fetchRecommended();
    }, [currentUser, activeRec]);

    return(
        <div className="border-start border-end rounded-top rounded-bottom bg-white p-4">
            {currentUser ? <h2>Recommended Topics</h2> : <h2>Trending Topics</h2>}


            <div className="row m-2">
                <ul className="nav nav-tabs border-top-0 nav-fill">
                    {recommended.map((recList) =>
                        <li className="nav-item">
                            <div onClick={() => setActiveRec(recList.subject)}
                                 className={activeRec === recList.subject ?
                                     "nav-link text-secondary active": "nav-link text-secondary"}>
                                {recList.subject.charAt(0).toUpperCase() + recList.subject.slice(1)}
                            </div>
                        </li>
                    )}
                </ul>
            </div>

            {activeRec &&
                <>

                    {
                        <div className="table-responsive">
                            <table className="table">
                                <tbody>
                                <tr>
                                    {recommended.find(recList => recList.subject === activeRec).books.map((book) =>
                                        <td>
                                            <Link to={`/details${book.key}`} className="text-decoration-none text-dark">
                                                <img className="rounded mx-auto d-block mb-2" src={book.cover_id ? `${COVER_SOURCE}/${book.cover_id}-M.jpg` : "https://openlibrary.org/images/icons/avatar_book.png"}/>
                                                <h3 className="text-center"><i>{book.title}</i></h3>
                                            </Link>
                                        </td>

                                    )}
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    }
                </>

            }



        </div>


    )
}

export default Explore;